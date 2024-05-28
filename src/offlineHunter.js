const CardDataService  = require("./services/cardsrecommendation/CardDataService.js");
const ShopPurchaseOptionsService  = require("./services/cardsrecommendation/ShopPurchaseOptionsService.js");
const CostCalculationService  = require("./services/cardsrecommendation/CostCalculatorService.js");
const ShopOutputService = require("./services/cardsrecommendation/ShopOutputService.js");

async function offlineHunter(filePath, topN = 4) {
    try {
        console.time('Total time');

        console.time('Reading card data');
        const cardData = CardDataService.readCardDataFromFile(filePath);
        console.timeEnd('Reading card data');

        console.time('Generating product options');
        const productOptions = ShopPurchaseOptionsService.generateProductOptions(cardData);
        console.timeEnd('Generating product options');

        console.time('Finding optimal combinations');
        const optimalCombinations = ShopPurchaseOptionsService.findOptimalCombinations(productOptions, topN);
        console.timeEnd('Finding optimal combinations');

        console.time('Calculating costs');
        const costs = CostCalculationService.calculateCosts(optimalCombinations);
        console.timeEnd('Calculating costs');

        console.time('Printing top combinations');
        const result = ShopOutputService.printTopCombinations(costs);
        console.timeEnd('Printing top combinations');

        console.timeEnd('Total time');

        return result;
    } catch (error) {
        console.error("Error during offline hunt:", error);
    }
}


module.exports = offlineHunter;
