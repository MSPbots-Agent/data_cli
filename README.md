# MSPbots Skill Repository

## Overview

This repository provides prebuilt dataset skills for MSPbots, enabling you to extend AI workflows with ready-to-use capabilities and structured data integrations.

## Installation

Please provide the following instructions to the IDE's Agent to install and load the DataCli Skill:


```txt
Your task is to install the DataCli Skill into the current project and ensure it can be loaded by the system.

Please follow the steps below strictly:

1. Check whether the `skills` directory exists in the current project.
   - If the `skills` directory does not exist, create it at: [...]/skills
   - [...] represents the IDE’s skill directory placeholder

2. Clone the repository into the specified path:
   Target path: [...]/skills/mspbots-dataset

   Run the following command:
   git clone -b skills/mspbots-dataset https://gitlab.mspbots.ai/owl/data_cli_repository.git [...]/skills/mspbots-dataset

3. If the target directory already exists:
   - Do not clone again
   - Run `git pull` in that directory to update the content

4. After completion, trigger the system to reload skills (choose the appropriate method based on the runtime environment):
   - Restart the Agent, or
   - Execute a skill re-scan operation

Notes:
- Ensure that gitlab.mspbots.ai is accessible
- If Git is not installed or access fails, report the error and stop execution
```