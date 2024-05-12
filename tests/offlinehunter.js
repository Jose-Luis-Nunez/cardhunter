import df from "/Users/josenunez/Documents/repo/cardhunter/src/utils/DataFormatter.js";
import fs from "fs";

function offlineHunt() {
    const data = JSON.parse(fs.readFileSync("./tests/fixtures/mock_data.json", "utf8"));

    df.findShopMostCards(data);
}

offlineHunt()
