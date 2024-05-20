import CardDataService from "../src/services/CardDataService.js";
import ShopPurchaseOptionsService from "../src/services/ShopPurchaseOptionsService.js";
import ShopOutputService from "../src/services/ShopOutputService.js";
import CostCalculationService from "../src/services/CostCalculatorService.js";

async function offlineHunt() {
    const cardData = CardDataService.readCardDataFromFile("./tests/fixtures/mock_data_ec_1.json");

    const productOptions = ShopPurchaseOptionsService.generateProductOptions(cardData);

    const combinations = ShopPurchaseOptionsService.generateAllShopPurchaseOptions(productOptions);

    const costs = CostCalculationService.calculateCosts(combinations);

    const bestCombinations = CostCalculationService.getTopFourCostEffectiveOptions(costs,4);

    ShopOutputService.printTopCombinations(bestCombinations);
}

offlineHunt();
