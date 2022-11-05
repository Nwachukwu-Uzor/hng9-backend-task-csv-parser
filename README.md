# HNG 9 CSV parser project

A CLI tool that takes a csv file containing NFT meta data and generated a CHIP-007 JSON file for each row for which a hash (sha256 algorithm) is generated and appended to file.

## Dependencies

Ensure you have Nodejs installed your computer

## Usage

- Clone the project from this github repository.
- On the terminal run npm install.
- Rename the csv file to be parse to exactly 'csv_sample.csv'
- Replace the 'csv_sample.csv' in the 'public/data/' folder with your csv file.
- Create a new folder in the
- Open the terminal and run the command

`npm run process-csv`

- Once the execution is completed, check the 'public/data/csv' folder to find the newly generated CSV files with the hash appended to them.
- To find the json files that were hashed, check the 'public/data/json' folder

🚀 Happy Hacking
