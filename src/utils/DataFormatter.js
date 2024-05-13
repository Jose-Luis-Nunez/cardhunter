import {Shop} from "../models/Shop.js";
import {Card} from "../models/Card.js";
import {ShopReportService} from "../services/ShopReportService.js";

class DataFormatter {
    static buildShopObj(cards, uniqueCardNames) {
        const shopObj = {};

        cards.forEach(card => {
            card.shops.forEach(shop => {
                if (!shopObj[shop.sellerName]) {
                    shopObj[shop.sellerName] = new Shop(shop.sellerName);
                }

                const cardObj = new Card(card.cardName, shop.price);
                shopObj[shop.sellerName].addCard(cardObj);
            });
        });

        Shop.setTotalCardNamesForAllShops(shopObj, uniqueCardNames);

        return shopObj;
    }

    static findShopMostCards(cards) {
        const uniqueCardNames = new Set(cards.map(card => card.cardName));
        const shopObj = this.buildShopObj(cards,uniqueCardNames);

        const sortedShops = Object
            .values(shopObj)
            .sort((a, b) => {
                const cardCountDiff =b.getAvailableCards() - a.getAvailableCards();
                if (cardCountDiff !== 0) {
                    return cardCountDiff;
                }
                return a.totalPrice - b.totalPrice;
            });

        return sortedShops.map(shop => ShopReportService.formatShopSummary(shop));
    }
}

export default DataFormatter;
