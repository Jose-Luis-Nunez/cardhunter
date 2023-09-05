import { expect, test } from '@playwright/test';

async function clickLoadMoreButton(loadMoreButton, maxClicks, page) {
    for (let i = 0; i < maxClicks; i++) {
        const isVisible = await loadMoreButton.isVisible();
        if (isVisible) {
            await loadMoreButton.click();
            await page.waitForTimeout(2000);
        }
    }
}

test('get namens from shop', async ({ page }) => {
    const urlPage = "https://www.cardmarket.com/de/YuGiOh/Products/Singles/2022-Tin-of-the-Pharaohs-Gods/Anchamoufrite?sellerCountry=7";
    await page.goto(urlPage, { waitUntil: 'networkidle' });

    const maxClicks = 2;
    const loadMoreButton = await page.locator("#loadMore");

    await clickLoadMoreButton(loadMoreButton, maxClicks, page);

    const sellerNames = await page.evaluate(async () => {
        const elements = await document.querySelectorAll(".seller-name");
        const sellerNames = Array.from(elements).map(element => element.innerText);
        return sellerNames;
    });

    console.log("Size of sellerNames:", sellerNames.length);
    console.log(sellerNames);
});
