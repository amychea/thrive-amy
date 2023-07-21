# Thrive Take Home Assignment

This script processes two json files, `users.json` and `companies.json` and creates an `output.txt` file based on specified crtieria.

## Prerequisites

- Node.js installed on your machine

## Installation

1. Clone this repository: `git clone https://github.com/amychea/thrive-amy.git`
2. Navigate to the project folder: `cd thrive-amy`

## Usage

1. Ensure you have the required JSON files (`users.json` and `companies.json`) in the project directory
2. Run the script using the following command: `node challenge.js`
3. After running the command, you should find the `output.txt` file in the project directory containing the processed data

## Notes

- The script filters active users based on the `active_status` field in the `users.json` file
- Users are sorted alphabetically by last name
- Companies are sorted by their company IDs
- If there are no active users in the company, the company will not be shown in the output file
- The "Total amount of top ups" is the difference between the previous token balance and the new token balance, summed from all the users
- If the script encounters any issues while reading or parsing the JSON files, it will log an error message to the console with the specific file and reason for the error. It will continue execution but will return null for the data. 
- If either JSON files are missing or cannot be parsed correctly, the script will throw an error and terminate the process preventing further data processing
