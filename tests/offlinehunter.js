import fs from "fs";
import ShopPurchaseOptionsGenerator from "../src/utils/ShopPurchaseOptionsGenerator.js";
import CostCalculator from "../src/utils/CostCalculator.js";
import ShopOutputService from "../src/services/ShopOutputService.js";


async function offlineHunt() {
    try {

        const cardData = JSON.parse(fs.readFileSync("./tests/fixtures/mock_data_ec_1.json", "utf8"));


        // Map data to a format suitable for generating combinations
        const productOptions = cardData.map(product => {
            return product.shops.map(shop => ({
                cardName: product.cardName,
                sellerName: shop.sellerName,
                price: shop.price
            }));
        });

        // Generate all combinations of shops
        const combinations = ShopPurchaseOptionsGenerator.generateAllShopPurchaseOptions(...productOptions);

        // Calculate the total cost for each combination, including fixed shipping costs
        const costs = CostCalculator.calculateCosts(combinations);

        // Sort by total cost and get the four cheapest options
        costs.sort((a, b) => a.totalCostWithDelivery - b.totalCostWithDelivery);
        const topFour = costs.slice(0, 4);

        // Use the ShopOutputService to print the results
        ShopOutputService.printTopCombinations(topFour);
    } catch (error) {
        console.error("Failed to read or process file:", error);
    }
}

offlineHunt();
