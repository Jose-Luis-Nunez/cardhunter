import {test} from '@playwright/test';
import dataFormatter from "../src/utils/DataFormatter.js";
import fileManager from "../src/utils/FileManager.js";
import CardMarketService from "../src/services/CardMarketService.js";
import {chromium} from "playwright";
import fs from "fs";

test('get best prices for cards', async ({page}) => {
    const cardMarketService = new CardMarketService(page);

    const links = fileManager.readCardLinksFromFile("./src/data/links.txt")

    const formattedJsonArray = [];

    for (const link of links) {
        await page.goto(link);
        const shopData = await cardMarketService.getShopData();
        formattedJsonArray.push(shopData);
    }

    dataFormatter.findShopMostCards(formattedJsonArray);
});

test.skip('run test on cardmarket and set cookies', async ({}) => {
    const browser = await chromium.launch({headless: false});
    const context = await browser.newContext();
    const page = await context.newPage();

    const cookies = JSON.parse(fs.readFileSync('./src/data/cookies.json', 'utf8'));

    await context.addCookies(cookies);

    await page.goto('https://www.cardmarket.com/de/YuGiOh');

    // await new Promise(r => setTimeout(r, 5000));

    await browser.close();
});
