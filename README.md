# MSPbots Skill Repository

## Overview

This repository provides dataset skills for MSPbots, designed to extend AI workflows with prebuilt skills and datasets.

## Skills

**mspbots-dataset**: This skill is used to `search`, `create`, and `preview` datasets on the MSPbots platform. It supports:
- Natural language search for datasets
- Automatic dataset creation via chat instructions
- Data preview to inspect dataset contents

## Installation
Installing mspbots-dataset Skill in Your AI IDE.

### **Cursor**
Run the command in the project directory:

<details open>
<summary>Powershell</summary>

```powershell
# Step 1: Check if .cursor/skills directory exists
$dir = ".cursor\skills"
if (-Not (Test-Path $dir)) {
    Write-Host "Creating directory $dir ..."
    New-Item -ItemType Directory -Path $dir | Out-Null
} else {
    Write-Host "Directory $dir already exists."
}
# Step 2: Clone the repository branch
Write-Host "Cloning skills/mspbots-dataset branch..."
git clone -b skills/mspbots-dataset https://gitlab.mspbots.ai/owl/skills_repository.git ".cursor\skills\mspbots-dataset"
Write-Host "MSPbots Dataset Skill installation is complete."
```
</details>

<details>
<summary>cmd</summary>

```cmd
@echo off
REM Step 1: Check if .cursor/skills directory exists
if not exist ".cursor\skills" (
    echo Creating directory .cursor\skills ...
    mkdir ".cursor\skills"
) else (
    echo Directory .cursor\skills already exists.
)
REM Step 2: Clone the repository branch
echo Cloning skills/mspbots-dataset branch...
git clone -b skills/mspbots-dataset https://gitlab.mspbots.ai/owl/skills_repository.git ".cursor\skills\mspbots-dataset"
echo Done.
pause
```
</details>

<details>
<summary>Shell</summary>

```shell
#!/bin/bash
# Step 1: Check if .cursor/skills directory exists
DIR=".cursor/skills"
if [ ! -d "$DIR" ]; then
echo "Creating directory $DIR ..."
mkdir -p "$DIR"
else
echo "Directory $DIR already exists."
fi
# Step 2: Clone the repository branch
TARGET_DIR=".cursor/skills/mspbots-dataset"
echo "Cloning skills/mspbots-dataset branch..."
git clone -b skills/mspbots-dataset https://gitlab.mspbots.ai/owl/skills_repository.git "$TARGET_DIR"
echo "MSPbots Dataset Skill installation is complete."
```
</details>

### **Claude Code** 
Run the command in the project directory:

<details  open>
<summary>Powershell</summary>

```powershell
# Step 1: Check if .claude/skills directory exists
$dir = ".claude\skills"
if (-Not (Test-Path $dir)) {
    Write-Host "Creating directory $dir ..."
    New-Item -ItemType Directory -Path $dir | Out-Null
} else {
    Write-Host "Directory $dir already exists."
}
# Step 2: Clone the repository branch
Write-Host "Cloning skills/mspbots-dataset branch..."
git clone -b skills/mspbots-dataset https://gitlab.mspbots.ai/owl/skills_repository.git ".claude\skills\mspbots-dataset"
Write-Host "MSPbots Dataset Skill installation is complete."
```
</details>

<details>
<summary>cmd</summary>

```cmd
@echo off

REM Step 1: Check if .claude/skills directory exists
if not exist ".claude\skills" (
    echo Creating directory .claude\skills ...
    mkdir ".claude\skills"
) else (
    echo Directory .claude\skills already exists.
)

REM Step 2: Clone the repository branch
echo Cloning skills/mspbots-dataset branch...

git clone -b skills/mspbots-dataset https://gitlab.mspbots.ai/owl/skills_repository.git ".claude\skills\mspbots-dataset"

echo "MSPbots Dataset Skill installation is complete."
pause
```
</details>

<details>
<summary>shell</summary>

```shell
#!/bin/bash
# Step 1: Check if .claude/skills directory exists
DIR=".claude/skills"
if [ ! -d "$DIR" ]; then
echo "Creating directory $DIR ..."
mkdir -p "$DIR"
else
echo "Directory $DIR already exists."
fi
# Step 2: Clone the repository branch
TARGET_DIR=".claude/skills/mspbots-dataset"
echo "Cloning skills/mspbots-dataset branch..."
git clone -b skills/mspbots-dataset https://gitlab.mspbots.ai/owl/skills_repository.git "$TARGET_DIR"
echo "MSPbots Dataset Skill installation is complete."
```
</details>

### **Trae**
Run the command in the project directory:

<details open>
<summary>Powershell</summary>

```powershell
# Step 1: Check if .trae/skills directory exists
$dir = ".trae\skills"
if (-Not (Test-Path $dir)) {
    Write-Host "Creating directory $dir ..."
    New-Item -ItemType Directory -Path $dir | Out-Null
} else {
    Write-Host "Directory $dir already exists."
}
# Step 2: Clone the repository branch
Write-Host "Cloning skills/mspbots-dataset branch..."
git clone -b skills/mspbots-dataset https://gitlab.mspbots.ai/owl/skills_repository.git ".trae\skills\mspbots-dataset"
Write-Host "MSPbots Dataset Skill installation is complete."
```
</details>

<details>
<summary>cmd</summary>

```cmd
@echo off

REM Step 1: Check if .trae/skills directory exists
if not exist ".trae\skills" (
    echo Creating directory .trae\skills ...
    mkdir ".trae\skills"
) else (
    echo Directory .trae\skills already exists.
)

REM Step 2: Clone the repository branch
echo Cloning skills/mspbots-dataset branch...

git clone -b skills/mspbots-dataset https://gitlab.mspbots.ai/owl/skills_repository.git ".trae\skills\mspbots-dataset"

echo "MSPbots Dataset Skill installation is complete."
pause
```
</details>

<details>
<summary>shell</summary>

```shell
#!/bin/bash
# Step 1: Check if .trae/skills directory exists
DIR=".trae/skills"
if [ ! -d "$DIR" ]; then
echo "Creating directory $DIR ..."
mkdir -p "$DIR"
else
echo "Directory $DIR already exists."
fi
# Step 2: Clone the repository branch
TARGET_DIR=".trae/skills/mspbots-dataset"
echo "Cloning skills/mspbots-dataset branch..."
git clone -b skills/mspbots-dataset https://gitlab.mspbots.ai/owl/skills_repository.git "$TARGET_DIR"
echo "MSPbots Dataset Skill installation is complete."
```
</details>

### Copilot in Visual Studio Code, Antigravity, CodeX and Others
Run the command in the project directory:

<details open>
<summary>Powershell</summary>

```powershell
# Step 1: Check if .agents/skills directory exists
$dir = ".agents\skills"
if (-Not (Test-Path $dir)) {
    Write-Host "Creating directory $dir ..."
    New-Item -ItemType Directory -Path $dir | Out-Null
} else {
    Write-Host "Directory $dir already exists."
}
# Step 2: Clone the repository branch
Write-Host "Cloning skills/mspbots-dataset branch..."
git clone -b skills/mspbots-dataset https://gitlab.mspbots.ai/owl/skills_repository.git ".agents\skills\mspbots-dataset"
Write-Host "MSPbots Dataset Skill installation is complete."
```
</details>

## Dependencies & Configuration

Requires MSPbots platform credentials (tenant code and token).

Example configuration (user_token.yaml):

```yaml
mspbots:
    tenant_code: "your tenant_code"
    token: "your mspbots token"
```

## MSPbots Dataset Skill Structure

```
├── skills
	 └── mspbots-dataset/
		  ├── SKILL.md
		  ├── assets/
		  │   └── user_token.yaml
		  └── references/
				└── ApiDocument.md
```

## Directory Description:

- SKILL.md – Skill documentation and usage guide.
- assets/user_token.yaml – Configuration file storing your MSPbots tenant code and token.
- references/ApiDocument.md – API reference and integration details.