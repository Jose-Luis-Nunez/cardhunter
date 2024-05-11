class DataFormatter {
    static formatCardData(cardName, sellerNames, sellerPriceFormatted) {
        return {
            cardName: cardName,
            shops: sellerNames.map((seller, index) => ({
                sellerName: seller,
                price: parseFloat(sellerPriceFormatted[index].replace(',', '.'))
            }))
        };
    }

    static findShopMostCards(cards) {
        const shopMap = new Map();

        cards.forEach(card => {
            card.shops.forEach(shop => {
                const shopName = shop.sellerName;
                const price = shop.price;

                if (!shopMap.has(shopName)) {
                    shopMap.set(shopName, {totalPrice: 0, cards: []});
                }

                shopMap.get(shopName).totalPrice += price;
                shopMap.get(shopName).cards.push({cardName: card.cardName, price: price});
            });
        });

        // Sort shops by the number of cards they have in descending order
        const sortedShops = [...shopMap.entries()].sort((a, b) => b[1].cards.length - a[1].cards.length);

        // Create the shop summaries
        const shopSummaries = sortedShops.map(([shopName, shopData]) => {
            // Create a new array of cards, sorted by price
            const sortedCards = shopData.cards.map(item => ({cardName: item.cardName, price: Number(item.price)}));

            // Create a string of the formatted items
            const formattedItems = sortedCards.map(item => `[${item.cardName} | ${item.price.toFixed(2)}]`).join('; ');

            return `${shopName} → ${shopData.totalPrice.toFixed(2)}€ ${formattedItems}`;
        });

        return shopSummaries;
    }
}

export default DataFormatter;
