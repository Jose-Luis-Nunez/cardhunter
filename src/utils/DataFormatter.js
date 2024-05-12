class DataFormatter {
    static formatCardData(cardName, sellerNames, sellerPriceFormatted) {
        return {
            cardName,
            shops: sellerNames.map((seller, index) => ({
                sellerName: seller,
                price: parseFloat(sellerPriceFormatted[index].replace(',', '.'))
            }))
        };
    }

    static findShopMostCards(cards) {
        const shopObj = this.buildShopObj(cards);
        const allCardNames = new Set(cards.map(card => card.cardName));
        const sortedShops = this.sortShopsByCardCount(shopObj);
        return sortedShops.map(([shopName, shopData]) =>
            this.formatShopSummary(shopName, shopData, allCardNames)
        );
    }

    static buildShopObj(cards) {
        const shopObj = {};
        cards.forEach(card => {
            card.shops.forEach(shop => {
                this.addOrUpdateShopEntry(shopObj, shop.sellerName, card.cardName, shop.price);
            });
        });
        return shopObj;
    }

    static addOrUpdateShopEntry(shopObj, shopName, cardName, price) {
        if (!shopObj[shopName]) {
            shopObj[shopName] = { totalPrice: 0, cards: {} };
        }

        const shopEntry = shopObj[shopName];
        const existingCard = shopEntry.cards[cardName];
        const oldPrice = existingCard ? existingCard.price : 0;

        shopEntry.totalPrice += price - oldPrice;
        shopEntry.cards[cardName] = { cardName, price };
    }

    static formatShopSummary(shopName, shopData, allCardNames) {
        const longestCardNameLength = Math.max(...Object.keys(shopData.cards).map(name => name.length));

        const formattedItems = Object.entries(shopData.cards)
            .map(([cardName, { price }]) => `| ${cardName.padEnd(longestCardNameLength)} | ${price.toFixed(2)}€`)
            .join('\n');

        const summary = `🛒 Shop: ${shopName} | 💰 Price: ${shopData.totalPrice.toFixed(2)}€ | ✅ Available: ${Object.keys(shopData.cards).length}/${allCardNames.size} Cards`;
        const missingCards = [...allCardNames].filter(cardName => !shopData.cards.hasOwnProperty(cardName));
        const missingCount = missingCards.length;
        const missingText = missingCount > 0 ? `🚩 Missing Cards  (${missingCount}):` : '';

        console.log(`============================\n${summary}\n\n`);
        console.log("💳 Card Overview:\n--------------------------------");
        console.log(`${formattedItems}\n--------------------------------\n`);
        console.log(missingText);
        console.log(`${missingCards}\n\n`);
    }

    static sortShopsByCardCount(shopObj) {
        const shopsArray = Object.entries(shopObj);
        shopsArray.sort((a, b) => {
            const cardCountDiff = Object.keys(b[1].cards).length - Object.keys(a[1].cards).length;
            if (cardCountDiff !== 0) {
                return cardCountDiff;
            }
            return a[1].totalPrice - b[1].totalPrice;
        });
        return shopsArray;
    }
}

export default DataFormatter;
