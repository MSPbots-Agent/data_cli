# MSPbots Skill Repository

## Overview

This repository contains skills and datasets for MSPbots, designed to extend and automate workflows using custom skill scripts and assets.

## Usage

Explore the `skills/` directory for available skills and datasets. Refer to the documentation in `skills/mspbots_dataset/references/ApiDocument.md` for API usage and integration details.

### Installing Skill in **Cursor**

Run the following cmd command in your project to install the mspbots-dataset skill.

```cmd
@echo off

REM Step 1: Check if .angets/skills directory exists
if not exist ".angets\skills" (
    echo Creating directory .angets\skills ...
    mkdir ".angets\skills"
) else (
    echo Directory .angets\skills already exists.
)

REM Step 2: Clone the repository branch
echo Cloning skills/mspbots-dataset branch...

git clone -b skills/mspbots-dataset https://gitlab.mspbots.ai/owl/skills_repository.git ".angets\skills\mspbots_dataset"

echo Done.
pause
```

### Installing Skill in **Claude Code**

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

git clone -b skills/mspbots-dataset https://gitlab.mspbots.ai/owl/skills_repository.git ".claude\skills\mspbots_dataset"

echo Done.
pause
```

### Installing Skill in **Trae**

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

git clone -b skills/mspbots-dataset https://gitlab.mspbots.ai/owl/skills_repository.git ".trae\skills\mspbots_dataset"

echo Done.
pause
```

## Dependencies & Configuration

- Requires MSPbots platform tenant\_code and token (see [user\_token.yaml](assets/user_token.yaml) example):
  ```yaml
  mspbots:
      tenant_code: "your tenant_code"
      token: "your mspbots token"
  ```

## Folder Structure

```
├── README.md
└── skills/
	 └── mspbots_dataset/
		  ├── SKILL.md
		  ├── assets/
		  │   └── user_token.yaml
		  └── references/
				└── ApiDocument.md
```
