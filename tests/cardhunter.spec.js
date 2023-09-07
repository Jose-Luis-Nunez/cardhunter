import { test } from '@playwright/test';
import Utils from "./utils/Utils";

test('get sellerNames', async ({ page }) => {
    const utils = new Utils();
    const loadMoreButton = await page.locator(utils.loadMoreButton);

    //get Data first Page
    await page.goto(utils.urlPage1, { waitUntil: 'networkidle' });
    await utils.clickLoadMoreButton(loadMoreButton, 2, page);
    const sellerInformation = await utils.getElements(page,utils.sellerNames);
    const sellerNames = await utils.getSellerNames(sellerInformation)

    //get Data second Page
    await page.goto(utils.urlPage2, { waitUntil: 'networkidle' });
    await utils.clickLoadMoreButton(loadMoreButton, 2, page);
    const sellerInformation2 = await utils.getElements(page,utils.sellerNames);
    const sellerNames2 = await utils.getSellerNames(sellerInformation2)

    const commonElements = await utils.getShopsWithMostCards(sellerNames, sellerNames2);
    console.log("shops with same cards: ", commonElements.length);
    console.log("shops: ", commonElements);
});
