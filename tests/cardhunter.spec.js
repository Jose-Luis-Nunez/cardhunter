import {test} from '@playwright/test';
import Utils from "./utils/Utils";
import fs from 'fs';

test('get sellerNames', async ({page}) => {
    const utils = new Utils(page);

    const links = await utils.getLinksFromFile("./tests/utils/links.txt")
    const formattedJsonArray = [];

    for (const link of links) {
        await page.goto(link);
        const shopData = await utils.getShopNamesFromLink();
        formattedJsonArray.push(shopData);
    }

    const a = await utils.findShopMostCards(formattedJsonArray);

    const output = JSON.stringify(a, null, 2);
    console.log(output);
});


