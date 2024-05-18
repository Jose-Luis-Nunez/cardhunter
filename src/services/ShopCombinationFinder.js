import Shop from "../models/Shop.js";

class ShopCombinationFinder {
    static findBestShopCombination(shops) {
        const combinations = this.generateShopCombinations(shops);
        return this.selectBestCombination(combinations);
    }

    static selectBestCombination(combinations) {
        let bestCombination = null;
        let lowestPrice = Infinity;

        combinations.forEach(combination => {
            const {totalPrice, missingCards} = this.mergeShopsForEvaluation(combination);
            if (missingCards.length === 0 && (totalPrice < lowestPrice || combination.length < (bestCombination?.length || Infinity))) {
                bestCombination = combination;
                lowestPrice = totalPrice;
            }
        });

        return bestCombination;
    }

    static generateShopCombinations(shops) {
        if (!shops.length) return [];
        const allCardNames = shops[0].uniqueCardNames;
        return this.searchCombinations(shops, allCardNames);
    }

    static searchCombinations(shops, allCardNames, currentCombination = [], index = 0) {
        const combinations = [];
        const dfs = (currentCombination, index) => {
            const currentSet = new Set(currentCombination.flatMap(shop => shop.cards).map(card => card.name));
            if (currentSet.size === allCardNames.size) {
                combinations.push(currentCombination);
                return;
            }

            for (let i = index; i < shops.length; i++) {
                dfs(currentCombination.concat(shops[i]), i + 1);
            }
        };

        dfs(currentCombination, index);
        return combinations;
    }

    static mergeShopsForEvaluation(shops) {
        const combinedShop = new Shop();
        shops.forEach(shop => shop.cards.forEach(card => combinedShop.addCard(card)));
        return combinedShop;
    }
}

export default ShopCombinationFinder;
