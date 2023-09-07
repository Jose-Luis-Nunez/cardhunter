import { test } from '@playwright/test';
import Utils from "./utils/Utils";

test('get namens from shop', async ({ page }) => {
    const utils = new Utils();
    const loadMoreButton = await page.locator(utils.loadMoreButton);

    //get Data first Page
    await page.goto(utils.urlPage1, { waitUntil: 'networkidle' });
    await utils.clickLoadMoreButton(loadMoreButton, 2, page);

    const sellerInformation = await utils.getElements(page,utils.sellerNames);
    const sellerNames = await utils.getSellerNames(sellerInformation)
    console.log("Size of sellerNames:", sellerNames.length);
    console.log(sellerNames);

    //get Data second Page
    await page.goto(utils.urlPage2, { waitUntil: 'networkidle' });
    await utils.clickLoadMoreButton(loadMoreButton, 2, page);

    const sellerInformation2 = await utils.getElements(page,utils.sellerNames);
    const sellerNames2 = await utils.getSellerNames(sellerInformation2)

    console.log("Size of sellerNames:", sellerNames2.length);
    console.log(sellerNames2);
});
