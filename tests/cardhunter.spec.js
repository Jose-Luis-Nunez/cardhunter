import {test} from '@playwright/test';
import fileManager from "../src/utils/cardmarket/FileManager.js";
import CardMarketService from "../src/services/cardmarket/CardMarketService.js";
import {chromium} from "playwright";
import fs from "fs";
import ShopPurchaseOptionsService from "../src/services/cardsrecommendation/ShopPurchaseOptionsService";
import CostCalculationService from "../src/services/cardsrecommendation/CostCalculatorService";
import ShopOutputService from "../src/services/cardsrecommendation/ShopOutputService";

test('get best prices for cards', async ({}) => {
    const browser = await chromium.launch({headless: false});
    const context = await browser.newContext();
    const page = await context.newPage();

    const cookies = JSON.parse(fs.readFileSync('./src/data/cookies.json', 'utf8'));
    await context.addCookies(cookies);

    const cardMarketService = new CardMarketService(page);

    const links = fileManager.readCardLinksFromFile("./src/data/links.txt")

    const cardData = [];

    for (const link of links) {
        await page.goto(link);
        const shopData = await cardMarketService.getShopData();
        cardData.push(shopData);
    }
        // console.log(formattedJsonArray);
    // dataFormatter.findShopMostCards(formattedJsonArray);
    console.log("1")
    const productOptions = ShopPurchaseOptionsService.generateProductOptions(cardData);
    console.log("2")
    const combinations = ShopPurchaseOptionsService.generateAllShopPurchaseOptions(...productOptions);
    console.log("3")
    const costs = CostCalculationService.calculateCosts(combinations);
    console.log("4")
    // const bestCombinations = CostCalculationService.getTopFourCostEffectiveOptions(costs,4);
    console.log("5")
    ShopOutputService.printTopCombinations(bestCombinations);
});

test.skip('run test on cardmarket and set cookies', async ({}) => {
    const browser = await chromium.launch({headless: false});
    const context = await browser.newContext();
    const page = await context.newPage();

    const cookies = JSON.parse(fs.readFileSync('./src/data/cookies.json', 'utf8'));

    await context.addCookies(cookies);

    await page.goto('https://www.cardmarket.com/de/YuGiOh');

    await browser.close();
});
