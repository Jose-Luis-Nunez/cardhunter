class Utils {
    constructor() {
        this.loadMoreButton = "#loadMore";
        this.sellerNames = ".seller-name";
        this.urlPage1 = "https://www.cardmarket.com/de/YuGiOh/Products/Singles/2022-Tin-of-the-Pharaohs-Gods/Anchamoufrite?sellerCountry=7";
        this.urlPage2 = "https://www.cardmarket.com/de/YuGiOh/Products/Singles/OTS-Tournament-Pack-16/Royal-Magical-Library?sellerCountry=7";
    }

    async getElements(page, selector) {
        return await page.evaluate((selector) => {
            return Array.from(document.querySelectorAll(selector))
                .map(element => element.innerText);
        }, selector);
    }

    async getSellerNames(elements) {
        return elements.map(element => {
            return element.replace('\n', '').slice(element.lastIndexOf('\n'));
        });
    }

    async clickLoadMoreButton(loadMoreButton, maxClicks, page) {
        for (let i = 0; i < maxClicks; i++) {
            const isVisible = await loadMoreButton.isVisible();
            if (isVisible) {
                await loadMoreButton.click();
                await page.waitForTimeout(2000);
            }
        }
    }

    async getShopsWithMostCards(array1, array2) {
        const frequencyMap = new Map();

        // Populate the frequency map for array1 and array2 simultaneously
        for (const element of [...array1, ...array2]) {
            frequencyMap.set(element, (frequencyMap.get(element) || 0) + 1);
        }

        // Find common elements
        const commonElements = Array.from(frequencyMap.keys()).filter((element) => frequencyMap.get(element) === 2);

        return commonElements;
    }
}
export default Utils;
