import Card from "../models/Card.js";
import Shop from "../models/Shop.js";

class ShopManagerService {

    static createShopsFromCardData(cardData) {
        const shops = {};
        const allCardNames = this.getAllUniqueCardNames(cardData);

        this.mapCardsToShops(shops, cardData, allCardNames);
        this.calculateMissingCardsForShops(shops, allCardNames);

        return Object.values(shops);
    }

    static getAllUniqueCardNames(cardData) {
        return new Set(cardData.flatMap(card => card.cardName));
    }

    static mapCardsToShops(shops, cardData, allCardNames) {
        cardData.forEach(({cardName, shops: shopList}) => {
            shopList.forEach(({sellerName, price}) => {
                if (!shops[sellerName]) {
                    shops[sellerName] = this.initializeShop(sellerName, allCardNames);
                }
                shops[sellerName].addCard(new Card(cardName, price));
            });
        });
    }

    static initializeShop(sellerName, allCardNames) {
        const shop = new Shop(sellerName);
        shop.uniqueCardNames = new Set(allCardNames);
        shop.cards = [];
        return shop;
    }

    static calculateMissingCardsForShops(shops, allCardNames) {
        Object.values(shops).forEach(shop => {
            shop.missingCards = [...allCardNames].filter(
                cardName => !shop.cards.some(card => card.name === cardName)
            );
        });
    }
}

export default ShopManagerService;
