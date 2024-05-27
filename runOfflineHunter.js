const offlineHunter = require('./src/offlineHunter.js'); // Verwende den relativen Pfad

const filePath = "./tests/fixtures/mock_data_c2y.json";

async function runOfflineHunter() {
    try {
        const result = await offlineHunter(filePath);
        console.log(result.trim());
    } catch (error) {
        console.error("An error occurred:", error);
    }
}


runOfflineHunter();
