class ShopPurchaseOption {
    static generateProductOptions(cardData) {
        return cardData.map(product => {
            return product.shops.map(shop => ({
                cardName: product.cardName,
                sellerName: shop.sellerName,
                price: shop.price
            }));
        });
    }

    static findOptimalCombinations(productOptions, topN = 4) {
        let bestCombinations = [];
        let bestCosts = [];

        function backtrack(index, currentCombination, currentCost, shopCounts) {
            if (index === productOptions.length) {
                const totalCostWithDelivery = currentCost + (shopCounts.size * 3);
                if (bestCombinations.length < topN || totalCostWithDelivery < bestCosts[bestCosts.length - 1]) {
                    bestCombinations.push([...currentCombination]);
                    bestCosts.push(totalCostWithDelivery);

                    const sortedIndices = bestCosts.map((cost, i) => i).sort((a, b) => bestCosts[a] - bestCosts[b]);
                    bestCombinations = sortedIndices.map(i => bestCombinations[i]);
                    bestCosts = sortedIndices.map(i => bestCosts[i]);

                    if (bestCombinations.length > topN) {
                        bestCombinations.pop();
                        bestCosts.pop();
                    }
                }
                return;
            }

            for (const option of productOptions[index]) {
                currentCombination.push(option);
                const newShopCounts = new Map(shopCounts);
                newShopCounts.set(option.sellerName, (newShopCounts.get(option.sellerName) || 0) + 1);
                backtrack(index + 1, currentCombination, currentCost + option.price, newShopCounts);
                currentCombination.pop();
            }
        }

        backtrack(0, [], 0, new Map());
        return bestCombinations;
    }
}
module.exports = ShopPurchaseOption;
