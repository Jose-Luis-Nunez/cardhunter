import ShopPurchaseOption from "../../utils/ShopPurchaseOption.js";

class ShopPurchaseOptionsService {
    static generateProductOptions(cardData) {
        return ShopPurchaseOption.generateProductOptions(cardData);
    }

    static findOptimalCombinations(productOptions, topN = 4) {
        return ShopPurchaseOption.findOptimalCombinations(productOptions, topN);
    }
}

export default ShopPurchaseOptionsService;
