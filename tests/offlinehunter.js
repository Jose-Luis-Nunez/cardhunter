import fs from "fs";
import ShopSummaryService from "../src/services/ShopSummaryService.js";
import ShopCombinationOptimizer
    from "/Users/josenunez/Documents/repo/cardhunter/src/services/ShopCombinationOptimizer.js";

function offlineHunt() {
    const cardData = JSON.parse(fs.readFileSync("./tests/fixtures/mock_data_ec_1.json", "utf8"));
    const bestCombination = ShopCombinationOptimizer.getOptimalShopCombination(cardData);
    ShopSummaryService.printShop(bestCombination);

}

offlineHunt()
