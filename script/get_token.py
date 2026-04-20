import json
from pathlib import Path
import time
import uuid
import webbrowser
from urllib import error, request


AUTH_PAGE_URL_TEMPLATE = "https://app.mspbots.ai/datacli-auth?code={code}"
TOKEN_URL_TEMPLATE = "https://owlstg.mspbots.ai//owl-agent/api/v1/auth_token/{code}"
MAX_RETRIES = 60
POLL_INTERVAL_SECONDS = 1
CONFIG_PATH = Path(__file__).resolve().parents[1] / "config" / "config.yml"


def generate_code() -> str:
    return uuid.uuid4().hex


def open_auth_page(code: str) -> str:
    auth_url = AUTH_PAGE_URL_TEMPLATE.format(code=code)
    webbrowser.open(auth_url)
    return auth_url


def poll_auth_token(code: str, max_retries: int = MAX_RETRIES, interval: int = POLL_INTERVAL_SECONDS):
    token_url = TOKEN_URL_TEMPLATE.format(code=code)

    for attempt in range(1, max_retries + 1):
        try:
            with request.urlopen(token_url, timeout=10) as resp:
                body = resp.read().decode("utf-8", errors="ignore")
                if resp.status == 200:
                    return body
        except error.HTTPError as exc:
            if exc.code == 200:
                return exc.read().decode("utf-8", errors="ignore")
        except error.URLError:
            pass

        if attempt < max_retries:
            time.sleep(interval)

    raise RuntimeError(f"Polling failed: no successful response (200) within {max_retries} attempts.")


def _yaml_scalar(value):
    if value is None:
        return "null"
    if isinstance(value, bool):
        return "true" if value else "false"
    if isinstance(value, (int, float)):
        return str(value)
    return json.dumps(str(value), ensure_ascii=False)


def _to_yaml_lines(data, indent=0):
    lines = []
    for key, value in data.items():
        prefix = " " * indent
        if isinstance(value, dict):
            lines.append(f"{prefix}{key}:")
            lines.extend(_to_yaml_lines(value, indent + 2))
        else:
            lines.append(f"{prefix}{key}: {_yaml_scalar(value)}")
    return lines


def update_config(token: str, user_info: dict):
    config_data = {
        "mspbots": {
            "token": token,
            "user_info": user_info,
        }
    }
    yaml_text = "\n".join(_to_yaml_lines(config_data)) + "\n"
    CONFIG_PATH.write_text(yaml_text, encoding="utf-8")


def main():
    code = generate_code()
    auth_url = open_auth_page(code)
    print(f"Browser opened. Please complete authorization: {auth_url}")

    try:
        result = poll_auth_token(code)
        try:
            payload = json.loads(result)
            print(json.dumps(payload, ensure_ascii=False, indent=2))
        except json.JSONDecodeError:
            print(result)
            raise RuntimeError("Invalid response: expected a JSON payload.")

        if not payload.get("ok"):
            raise RuntimeError(f"Authorization failed: {payload.get('message', 'unknown error')}")

        token = payload.get("token")
        user_info = payload.get("user_info")
        if not token or not isinstance(user_info, dict):
            raise RuntimeError("Invalid response: missing token or user_info.")

        update_config(token, user_info)
        print(f"Config updated: {CONFIG_PATH}")
    except RuntimeError as exc:
        print(str(exc))
        raise SystemExit(1) from exc


if __name__ == "__main__":
    main()
