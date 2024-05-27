const offlineHunter = require("/Users/josenunez/Documents/repo/cardhunter/src/offlinehunter.js");
const {complete} = require("../utils/expectedResults/expectedResults_c4p.js");

describe('test purchase 4 Item Combination considering price and delivery fee', () => {
    const filePath = "./tests/fixtures/mock_data_c4p.json";

    it('should process complete file for buying 4 cards and return the expected output', async () => {
        const output = await offlineHunter(filePath);

        expect(output.trim()).toBe(complete);
    });
});
