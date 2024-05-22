const CardDataService  = require("../src/services/cardsrecommendation/CardDataService.js");
const ShopPurchaseOptionsService  = require("../src/services/cardsrecommendation/ShopPurchaseOptionsService.js");
const CostCalculationService  = require("../src/services/cardsrecommendation/CostCalculatorService.js");
const ShopOutputService = require("../src/services/cardsrecommendation/ShopOutputService.js");

async function offlineHunt() {
    try {
        const cardData = CardDataService.readCardDataFromFile("./tests/fixtures/mock_data_c_2_y.json");
        const productOptions = ShopPurchaseOptionsService.generateProductOptions(cardData);
        const optimalCombinations = ShopPurchaseOptionsService.findOptimalCombinations(productOptions, 4); // Get top 4 combinations
        const costs = CostCalculationService.calculateCosts(optimalCombinations);
        ShopOutputService.printTopCombinations(costs);
    } catch (error) {
        console.error("Error during offline hunt:", error);
    }
}

offlineHunt();
