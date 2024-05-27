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
        let allCombinations = [];

        function calculateCombinationCost(combination) {
            const shopCounts = new Map();
            let totalCost = 0;

            combination.forEach(item => {
                totalCost += item.price;
                shopCounts.set(item.sellerName, (shopCounts.get(item.sellerName) || 0) + 1);
            });

            const deliveryCost = shopCounts.size * 3;
            return totalCost + deliveryCost;
        }

        function combine(currentCombination, options, index) {
            if (index === options.length) {
                const totalCost = calculateCombinationCost(currentCombination);
                allCombinations.push({ combination: [...currentCombination], totalCost });
                return;
            }

            for (let option of options[index]) {
                currentCombination.push(option);
                combine(currentCombination, options, index + 1);
                currentCombination.pop();
            }
        }

        combine([], productOptions, 0);
        allCombinations.sort((a, b) => a.totalCost - b.totalCost);

        return allCombinations.slice(0, topN).map(comb => comb.combination);
    }
}

module.exports = ShopPurchaseOption;
