const offlineHunter = require("/Users/josenunez/Documents/repo/cardhunter/src/offlinehunter.js");
const {convertToJson} = require("../utils/testUtils");
const {complete} = require("../utils/expectedResults/expectedResults_c4p.js");

describe('test purchase 4 Item Combination considering price and delivery fee', () => {
    const filePath = "./tests/fixtures/mock_data_c4p.json";

    it('should process complete file for buying 4 cards and return the expected output', async () => {
        const output = await offlineHunter(filePath);

        expect(output.trim()).toBe(complete);
    });

    // it('should consider buying a more expensive card to reduce total costs', async () => {
    //     const output = await offlineHunter(filePath);
    //
    //     expect(output.trim()).toContain(moreExpensiveItemToReduceTotalCost);
    // });
    //
    // it('should show multiple combinations considering the same shops', async () => {
    //     const output = await offlineHunter(filePath);
    //     const outputTrimmed = output.trim();
    //
    //     expect(outputTrimmed).toContain(bestCombinationSameShop);
    //     expect(outputTrimmed).toContain(secondBestCombinationSameShop);
    // });
    //
    // it('should verify 4 number of combinations ordered by price ASC', async () => {
    //     const output = await offlineHunter(filePath);
    //     const recommendationObj = convertToJson(output);
    //
    //     expect(recommendationObj).toHaveLength(4);
    //
    //     const totalCosts = recommendationObj.map(combination => combination.totalCostWithDelivery);
    //     expect(totalCosts).toEqual([...totalCosts].sort((a, b) => a - b));
    // });
});
