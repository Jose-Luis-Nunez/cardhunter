const offlineHunter = require("/Users/josenunez/Documents/repo/cardhunter/src/offlinehunter.js");
const complete = require("../utils/expectedResults/expectedResults_c2y.js");

describe('test purchase 2 Item Combination considering price and delivery fee', () => {

    it('should process complete file for buying 2 cards and return the expected output', async () => {
        const filePath = "./tests/fixtures/mock_data_c2y.json";

        const output = await offlineHunter(filePath);

        expect(output.trim()).toBe(complete);
    });
});
