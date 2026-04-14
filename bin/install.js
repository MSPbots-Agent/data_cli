#!/usr/bin/env node

const fs = require("node:fs/promises");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const PACKAGE_NAME = "mspbots-data-cli";
const SKILL_NAME = "mspbots-dataset";
const DEFAULT_BRANCH = process.env.MSPBOTS_SKILL_BRANCH || "skills/mspbots-dataset";
const DEFAULT_REPO =
  process.env.MSPBOTS_SKILL_REPO ||
  "https://github.com/MSPbots-Agent/data_cli.git";

const TARGETS = {
  cursor: ".cursor/skills",
  claude: ".claude/skills",
  "claude-code": ".claude/skills",
  trae: ".trae/skills",
  others: ".agents/skills",
  agents: ".agents/skills",
  codex: ".agents/skills",
  vscode: ".agents/skills",
  copilot: ".agents/skills",
  antigravity: ".agents/skills"
};

function printUsage() {
  console.log(`
Usage:
  npx ${PACKAGE_NAME} install -cursor [--dir <project-path>]

Targets:
  -cursor       Install to .cursor/skills/${SKILL_NAME}
  -claude       Install to .claude/skills/${SKILL_NAME}
  -trae         Install to .trae/skills/${SKILL_NAME}
  -others       Install to .agents/skills/${SKILL_NAME}

Aliases:
  -claude-code  Same as -claude
  -others       Includes Codex, VS Code, Copilot, Antigravity, and similar IDEs
  -agents, -codex, -vscode, -copilot, -antigravity  Same as -others

Options:
  --dir <path>  Install relative to a custom project directory
  --help        Show this help message
`);
}

function parseArgs(argv) {
  const positional = [];
  let installRoot;

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--help" || arg === "-h") {
      return { help: true };
    }

    if (arg === "--dir") {
      installRoot = argv[index + 1];
      index += 1;
      continue;
    }

    positional.push(arg);
  }

  const command = positional[0];
  const rawTarget = positional[1];

  return {
    help: false,
    command,
    target: rawTarget ? rawTarget.replace(/^-/, "") : undefined,
    installRoot
  };
}

function runGit(args, options = {}) {
  return spawnSync("git", args, {
    stdio: options.stdio || "pipe",
    encoding: "utf8"
  });
}

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const { help, command, target, installRoot } = parseArgs(process.argv.slice(2));

  if (help) {
    printUsage();
    return;
  }

  if (command !== "install") {
    console.error("Missing or unsupported command. Expected: install");
    printUsage();
    process.exitCode = 1;
    return;
  }

  if (!target) {
    console.error("Missing target flag.");
    printUsage();
    process.exitCode = 1;
    return;
  }

  const targetBaseDir = TARGETS[target];

  if (!targetBaseDir) {
    console.error(`Unsupported target: ${target}`);
    printUsage();
    process.exitCode = 1;
    return;
  }

  const gitVersion = runGit(["--version"]);
  if (gitVersion.status !== 0) {
    console.error("Git is required to install this skill. Please install Git and try again.");
    process.exitCode = 1;
    return;
  }

  const projectRoot = path.resolve(installRoot || process.cwd());
  const skillsDir = path.join(projectRoot, targetBaseDir);
  const targetDir = path.join(skillsDir, SKILL_NAME);

  console.log(`Installing ${SKILL_NAME} for ${target}...`);
  console.log(`Project directory: ${projectRoot}`);
  console.log(`Target directory: ${targetDir}`);

  await fs.mkdir(skillsDir, { recursive: true });

  if (await pathExists(targetDir)) {
    console.log(`Removing existing directory: ${targetDir}`);
    await fs.rm(targetDir, { recursive: true, force: true });
  }

  const cloneResult = spawnSync(
    "git",
    ["clone", "--depth", "1", "--branch", DEFAULT_BRANCH, "--single-branch", DEFAULT_REPO, targetDir],
    { stdio: "inherit" }
  );

  if (cloneResult.status !== 0) {
    process.exitCode = cloneResult.status || 1;
    return;
  }

  await fs.rm(path.join(targetDir, ".git"), { recursive: true, force: true });

  const configPath = path.join(targetDir, "config", "config.yml");
  console.log("");
  console.log("Install complete.");
  console.log(`Next step: update ${configPath} with your MSPbots token.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
