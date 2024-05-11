import WebScraper from "../utils/WebScraper.js";
import DataProcessor from "../utils/DataProcessor.js";
import DataFormatter from "../utils/DataFormatter.js";

class CardMarketService {
    constructor(page) {
        this.page = page;
        this.webScraper = new WebScraper(page);
        this.sellerNamesSelector = ".seller-name";
        this.sellerPricesSelector = ".price-container";
        this.cardTitleSelector = ".breadcrumb-item:last-child";
    }

    async getShopNamesFromLink() {
        const sellerInformation = await this.webScraper.getElementTexts(this.sellerNamesSelector, this.page);
        const sellerPriceInformation = await this.webScraper.getElementTexts(this.sellerPricesSelector, this.page);
        const cardName = await this.page.locator(this.cardTitleSelector).textContent();
        const sellerNames = DataProcessor.getSellerNames(sellerInformation);
        const sellerPriceFormatted = DataProcessor.removeEuroSign(sellerPriceInformation);
        return DataFormatter.formatCardData(cardName, sellerNames, sellerPriceFormatted);
    }
}

export default CardMarketService;
