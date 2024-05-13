import {Shop} from "../models/Shop.js";
import {Card} from "../models/Card.js";

class DataFormatter {
    static buildShopObj(cards) {
        const shopObj = {};

        cards.forEach(card => {
            card.shops.forEach(shop => {
                if (!shopObj[shop.sellerName]) {
                    shopObj[shop.sellerName] = new Shop(shop.sellerName);
                }

                const cardObj = new Card(card.cardName, shop.price);
                shopObj[shop.sellerName].addOrUpdateCard(cardObj);            });
        });

        return shopObj;
    }


    static formatCardData(cardName, shopName, sellerPriceFormatted) {
        return {
            cardName,
            shops: shopName.map((seller, index) => ({
                sellerName: seller,
                price: parseFloat(sellerPriceFormatted[index].replace(',', '.'))
            }))
        };
    }

    static findShopMostCards(cards) {
        const shopObj = this.buildShopObj(cards);
        const allCardNames = new Set(cards.map(card => card.cardName));
        const sortedShops = Object.values(shopObj).sort((a, b) => {
            const cardCountDiff = Object.keys(b.cards).length - Object.keys(a.cards).length;
            if (cardCountDiff !== 0) {
                return cardCountDiff;
            }
            return a.totalPrice - b.totalPrice;
        });

        return sortedShops.map(shop => shop.formatShopSummary(allCardNames));
    }
}

export default DataFormatter;
