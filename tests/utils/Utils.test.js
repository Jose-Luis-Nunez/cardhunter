class Utils {
    constructor(page) {
        this.page = page;
    }

    async getCardData() {
        const cardName = await this.page.locator('your-card-locator').textContent();
        // Additional logic to extract card data...
        return {
            cardName,
            shops: [],
        };
    }

    findShopMostCards(cards) {
        // Implement your shop summary logic here...
        return [];
    }
}

module.exports = Utils;
// npx jest tests/utils/Utils.test.js