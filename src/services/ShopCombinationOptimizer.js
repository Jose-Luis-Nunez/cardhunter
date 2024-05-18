import ShopManagerService from "./ShopManagerService.js";
import ShopCombinationFinder from "./ShopCombinationFinder.js";

class ShopCombinationOptimizer {
    static getOptimalShopCombination(cardData) {
        const shops = ShopManagerService.createShopsFromCardData(cardData);
        return ShopCombinationFinder.findBestShopCombination(shops)
    }
}

export default ShopCombinationOptimizer;
