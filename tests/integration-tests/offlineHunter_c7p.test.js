const offlineHunter = require("../../src/offlineHunter.js");
const {complete} = require("../fixtures/expectedResults/expectedResults_c7p.js");

describe('test purchase 4 Item Combination considering price and delivery fee', () => {
    const filePath = "./tests/fixtures/mock_data_c7p.json";

    it('should process complete file for buying 7 cards and return the expected output', async () => {
        const output = await offlineHunter(filePath);

        expect(output.trim()).toBe(complete);
    });
});
