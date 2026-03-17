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

### **Cursor** (Windows)
Open Command Prompt in your project directory and run:

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

### **Claude Code** (Windows)
Open Command Prompt in your project directory and run:

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

### **Trae** (Windows)
Open Command Prompt in your project directory and run:

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
	 └── mspbots_dataset/
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