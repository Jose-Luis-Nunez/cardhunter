const CardDataService  = require("./services/cardsrecommendation/CardDataService.js");
const ShopPurchaseOptionsService  = require("./services/cardsrecommendation/ShopPurchaseOptionsService.js");
const CostCalculationService  = require("./services/cardsrecommendation/CostCalculatorService.js");
const ShopOutputService = require("./services/cardsrecommendation/ShopOutputService.js");

async function offlineHunt(filePath) {
    try {
        const cardData = CardDataService.readCardDataFromFile(filePath);
        const productOptions = ShopPurchaseOptionsService.generateProductOptions(cardData);
        const optimalCombinations = ShopPurchaseOptionsService.findOptimalCombinations(productOptions, 4);
        const costs = CostCalculationService.calculateCosts(optimalCombinations);
        return ShopOutputService.printTopCombinations(costs);
    } catch (error) {
        console.error("Error during offline hunt:", error);
    }
}

module.exports = offlineHunt;
