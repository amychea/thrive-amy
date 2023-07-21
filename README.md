# Thrive Take Home Assignment

This script processes two json files, `users.json` and `companies.json` and creates an `output.txt` file based on specified crtieria.

## Prerequisites

- Node.js installed on your machine

## Installation

1. Clone thie repo: `git clone https://github.com/amychea/thrive-amy.git`
2. Open the folder

## Usage

1. Ensure you have the required JSON files (`users.json` and `companies.json`) in the project directory
2. Run the script using the following command: `node challenge.js`
3. After running the command, you should be able to see the `output.txt` file in the project directory

## Notes

- Active users are filtered based on the active_status field in the users.json file
- Users are sorted alphabetically by last name
- Companies are sorted by their company IDs
- If there are no active users in the company, the company will not be shown in the output file
- Total amount of top ups is the difference between the previous token balance and the new token balance, summed from all the users
