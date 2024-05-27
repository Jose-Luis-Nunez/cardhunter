const offlineHunter = require('./src/offlineHunter.js'); // Verwende den relativen Pfad

const filePath = "./tests/fixtures/mock_data_c_7p.json";

async function runOfflineHunter(topN) {
    try {
        const result = await offlineHunter(filePath, topN);
        console.log(result.trim());
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

runOfflineHunter(3);
