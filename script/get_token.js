#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { exec } = require("child_process");

const AUTH_PAGE_URL_TEMPLATE = "https://app.mspbots.ai/datacli-auth?code={code}";
const TOKEN_URL_TEMPLATE = "https://owlstg.mspbots.ai//owl-agent/api/v1/auth_token/{code}";
const MAX_RETRIES = 60;
const POLL_INTERVAL_MS = 1000;
const CONFIG_PATH = path.resolve(__dirname, "..", "config", "config.yml");

function generateCode() {
  return crypto.randomUUID().replace(/-/g, "");
}

function openAuthPage(code) {
  const authUrl = AUTH_PAGE_URL_TEMPLATE.replace("{code}", code);
  const escapedUrl = `"${authUrl.replace(/"/g, '\\"')}"`;

  let cmd;
  if (process.platform === "win32") {
    cmd = `start "" ${escapedUrl}`;
  } else if (process.platform === "darwin") {
    cmd = `open ${escapedUrl}`;
  } else {
    cmd = `xdg-open ${escapedUrl}`;
  }

  exec(cmd, (error) => {
    if (error) {
      console.warn(`Failed to open browser automatically: ${error.message}`);
      console.warn(`Please open this URL manually: ${authUrl}`);
    }
  });

  return authUrl;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function pollAuthToken(code, maxRetries = MAX_RETRIES, intervalMs = POLL_INTERVAL_MS) {
  const tokenUrl = TOKEN_URL_TEMPLATE.replace("{code}", code);

  for (let attempt = 1; attempt <= maxRetries; attempt += 1) {
    try {
      const response = await fetch(tokenUrl, { method: "GET" });
      if (response.status === 200) {
        return await response.text();
      }
    } catch (_) {
      // Ignore transient network errors and retry.
    }

    if (attempt < maxRetries) {
      await sleep(intervalMs);
    }
  }

  throw new Error(`Polling failed: no successful response (200) within ${maxRetries} attempts.`);
}

function yamlScalar(value) {
  if (value === null || value === undefined) {
    return "null";
  }
  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }
  if (typeof value === "number") {
    return String(value);
  }
  return JSON.stringify(String(value));
}

function toYamlLines(data, indent = 0) {
  const lines = [];
  for (const [key, value] of Object.entries(data)) {
    const prefix = " ".repeat(indent);
    if (value && typeof value === "object" && !Array.isArray(value)) {
      lines.push(`${prefix}${key}:`);
      lines.push(...toYamlLines(value, indent + 2));
    } else {
      lines.push(`${prefix}${key}: ${yamlScalar(value)}`);
    }
  }
  return lines;
}

function updateConfig(token, userInfo) {
  const configData = {
    mspbots: {
      token,
      user_info: userInfo,
    },
  };
  const yamlText = `${toYamlLines(configData).join("\n")}\n`;
  fs.writeFileSync(CONFIG_PATH, yamlText, "utf8");
}

async function main() {
  const code = generateCode();
  const authUrl = openAuthPage(code);
  console.log(`Browser opened. Please complete authorization: ${authUrl}`);

  try {
    const result = await pollAuthToken(code);
    let payload;
    try {
      payload = JSON.parse(result);
      console.log(JSON.stringify(payload, null, 2));
    } catch (_) {
      console.log(result);
      throw new Error("Invalid response: expected a JSON payload.");
    }

    if (!payload.ok) {
      throw new Error(`Authorization failed: ${payload.message || "unknown error"}`);
    }

    const token = payload.token;
    const userInfo = payload.user_info;
    if (!token || !userInfo || typeof userInfo !== "object" || Array.isArray(userInfo)) {
      throw new Error("Invalid response: missing token or user_info.");
    }

    updateConfig(token, userInfo);
    console.log(`Config updated: ${CONFIG_PATH}`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

main();
