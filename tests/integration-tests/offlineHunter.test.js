const offlineHunter = require("/Users/josenunez/Documents/repo/cardhunter/src/offlinehunter.js");
const {convertToJson} = require("../utils/testUtils");
const {
    complete,
    more_expensive_to_reduce_cost,
    bestCombinationSameShop,
    secondBestCombinationSameShop
} = require("../utils/expectedResults/expectedResults_c_2y.js");

describe('test to buy 3 cards to find best 4 combinations', () => {

    it('should process complete file for buying 3 cards and return the expected output', async () => {
        const filePath = "./tests/fixtures/mock_data_c_3p.json";

        const output = await offlineHunter(filePath);

        expect(output.trim()).toBe(complete);

    });

    it('should consider buying a more expensive card to reduce total costs', async () => {
        const filePath = "./tests/fixtures/mock_data_c_3p.json";

        const output = await offlineHunter(filePath);

        expect(output.trim()).toContain(more_expensive_to_reduce_cost);
    });

    it('should show multiple combinations considering the same shops', async () => {
        const filePath = "./tests/fixtures/mock_data_c_3p.json";

        const output = await offlineHunter(filePath);
        const outputTrimmed = output.trim();

        expect(outputTrimmed).toContain(bestCombinationSameShop);
        expect(outputTrimmed).toContain(secondBestCombinationSameShop);
    });

    it('should verify 4 number of combinations ordered by price ASC', async () => {
        const filePath = "./tests/fixtures/mock_data_c_3p.json";
        const output = await offlineHunter(filePath);
        const recommendationObj = convertToJson(output);

        expect(recommendationObj).toHaveLength(4);

        const totalCosts = recommendationObj.map(combination => combination.totalCostWithDelivery);
        expect(totalCosts).toEqual([...totalCosts].sort((a, b) => a - b));
    });
});
