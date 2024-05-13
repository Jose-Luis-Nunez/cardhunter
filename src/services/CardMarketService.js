import WebScraper from "../utils/WebScraper.js";
import DataProcessor from "../utils/DataProcessor.js";

class CardMarketService {
    constructor(page) {
        this.page = page;
        this.webScraper = new WebScraper(page);
        this.shopNameSelector = ".seller-name";
        this.sellerPricesSelector = ".price-container";
        this.cardPriceSelector = ".breadcrumb-item:last-child";
    }

    async getShopData() {
        const shopInformation = await this.webScraper.getElementTexts(this.shopNameSelector, this.page);

        const cardName = await this.page.locator(this.cardPriceSelector).textContent();
        const shopName = DataProcessor.extractShopName(shopInformation);
        const shopPriceInformation = await this.webScraper.getElementTexts(this.sellerPricesSelector, this.page);

        return this.formatCardData(
            cardName,
            shopName,
            shopPriceInformation);
    }

    formatCardData(cardName, shopName, sellerPriceFormatted) {
        return {
            cardName,
            shops: shopName.map((seller, index) => ({
                sellerName: seller,
                price: parseFloat(sellerPriceFormatted[index].replace(',', '.'))
            }))
        };
    }
}

export default CardMarketService;
