# Web Scraper for Football Matches

This project is a web scraper that fetches football match data from a specific website and writes the data to a JSON file.

## Description

The main script (`main.js`) uses the Playwright library to navigate to a specific URL, waits for specific elements to load, and then reads the text content of these elements. The text content is then processed and transformed into a JSON object, which is written to a file named `matches.json`.

## Installation

1. Clone this repository.
2. Run `npm install` to install the dependencies.
3. Run `npx playwright install` to download the browser binaries that Playwright will use.

## Usage

Run `node main.js` to execute the script. The script will navigate to the website, scrape the data, and write it to `matches.json`.

## Dependencies

- [Playwright](https://playwright.dev/): A Node.js library to automate Chromium, Firefox and WebKit with a single API. Playwright is used to navigate to the website and scrape the data.
- Browser Engine: The browser engine used by Playwright can be Chromium, Firefox, or WebKit. The specific engine used depends on the configuration in the script.

## Contributing

If you want to contribute to this project, please submit a pull request.

## License

This project is licensed under the MIT License.