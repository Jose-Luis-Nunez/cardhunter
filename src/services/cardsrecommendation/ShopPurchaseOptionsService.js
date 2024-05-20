class ShopPurchaseOptionsService {
    static generateProductOptions(cardData) {
        return cardData.map(product => {
            return product.shops.map(shop => ({
                cardName: product.cardName,
                sellerName: shop.sellerName,
                price: shop.price
            }));
        });
    }

    static generateOptimalShopCombinations(productOptions, numberOfOptions = 4) {
        let dp = new Map();
        dp.set(0, [{ cost: 0, shippingCost: 0, shops: new Map(), combination: [] }]);

        productOptions.forEach(productOption => {
            let newDp = new Map();

            productOption.forEach(shopOption => {
                dp.forEach((combinations, key) => {
                    combinations.forEach(value => {
                        let newShops = new Map(value.shops);
                        newShops.set(shopOption.sellerName, (newShops.get(shopOption.sellerName) || 0) + 1);
                        let newCost = value.cost + shopOption.price;
                        let newShippingCost = 3 * newShops.size; // fixed shipping cost per unique shop
                        let totalCost = newCost + newShippingCost;
                        let newCombination = {
                            cost: newCost,
                            shippingCost: newShippingCost,
                            totalCost: totalCost,
                            shops: newShops,
                            combination: [...value.combination, shopOption]
                        };

                        if (!newDp.has(key + 1)) {
                            newDp.set(key + 1, []);
                        }
                        newDp.get(key + 1).push(newCombination);

                        // Keep only the best combinations
                        if (newDp.get(key + 1).length > numberOfOptions * 10) {
                            newDp.set(key + 1, newDp.get(key + 1).sort((a, b) => a.totalCost - b.totalCost).slice(0, numberOfOptions * 10));
                        }
                    });
                });
            });

            dp = newDp;
        });

        // Flatten and sort combinations by total cost
        let sortedCombinations = Array.from(dp.values()).flat().sort((a, b) => a.totalCost - b.totalCost);

        // Return the best combinations
        return sortedCombinations.slice(0, numberOfOptions).map(comb => comb.combination);
    }
}

export default ShopPurchaseOptionsService;
