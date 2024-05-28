const fs = require("fs");

class CardDataService {
    static readCardDataFromFile(filePath) {
        try {
            const fileContent = fs.readFileSync(filePath, "utf8");
            return JSON.parse(fileContent);
        } catch (error) {
            console.error("Failed to read or parse file:", error);
            throw error;
        }
    }
}

module.exports = CardDataService;
