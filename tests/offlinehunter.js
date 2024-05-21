import CardDataService from "../src/services/cardsrecommendation/CardDataService.js";
import ShopPurchaseOptionsService from "../src/services/cardsrecommendation/ShopPurchaseOptionsService.js";
import CostCalculationService from "../src/services/cardsrecommendation/CostCalculatorService.js";
import ShopOutputService from "../src/services/cardsrecommendation/ShopOutputService.js";

async function offlineHunt() {
    try {
        const cardData = CardDataService.readCardDataFromFile("./tests/fixtures/mock_data_ec_0.json");
        const productOptions = ShopPurchaseOptionsService.generateProductOptions(cardData);
        const optimalCombinations = ShopPurchaseOptionsService.findOptimalCombinations(productOptions, 4); // Get top 4 combinations
        const costs = CostCalculationService.calculateCosts(optimalCombinations);
        ShopOutputService.printTopCombinations(costs);
    } catch (error) {
        console.error("Error during offline hunt:", error);
    }
}

offlineHunt();
