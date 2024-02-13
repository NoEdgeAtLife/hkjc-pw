const { chromium } = require("playwright");

function splitMatchText(matchText) {
  const matchArray = matchText.split("\t");
  details = matchArray[3]; // 'Jeonbuk Motors[0/-0.5] vs Pohang Steelers[0/+0.5]',
  const homeTeam = details.split(" vs ")[0].split("[")[0];
  const awayTeam = details.split(" vs ")[1].split("[")[0];
  const handicap = details.split(" vs ")[0].split("[")[1].split("]")[0];
  const match = {
    time: matchArray[0],
    id: matchArray[1],
    homeTeam: homeTeam,
    awayTeam: awayTeam,
    handicap: handicap,
    homeOdds: matchArray[6],
    awayOdds: matchArray[7],
  };
  return match;
}

async function readDivElement() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto("https://bet.hkjc.com/football/odds/odds_hdc.aspx?lang=en");
    await page.waitForSelector("#tgCou1");
    await page.waitForSelector("#tgCou2");
    await page.waitForSelector(".tgCou1");
    await page.waitForSelector(".tgCou2");

    const date1 = await page.locator("#tgCou1").textContent();
    const matches1 = await page.locator(".tgCou1").allInnerTexts();
    const tempMatches1 = matches1.map((match) => splitMatchText(match));

    const date2 = await page.locator("#tgCou2").textContent();
    const matches2 = await page.locator(".tgCou2").allInnerTexts();
    const tempMatches2 = matches2.map((match) => splitMatchText(match));

    const allMatches = {};
    allMatches[date1] = tempMatches1;
    allMatches[date2] = tempMatches2;

    return JSON.stringify(allMatches);
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await browser.close();
  }
}

const fs = require("fs");
async function main() {
  matches = await readDivElement();

  fs.writeFile("matches.json", matches, (err) => {
    if (err) throw err;
    console.log("Data has been written to matches.json");
  });
}

main();
