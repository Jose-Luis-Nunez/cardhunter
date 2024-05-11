import df from "/Users/josenunez/Documents/repo/cardhunter/src/utils/DataFormatter.js";
import fs from "fs";

function offlineHunt() {
    const data = JSON.parse(fs.readFileSync("./tests/fixtures/mock_data.json", "utf8"));

    const a = df.findShopMostCards(data);

    const output = JSON.stringify(a, null, 2);
    console.log(output);
}

offlineHunt()
