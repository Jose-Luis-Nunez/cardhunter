import CardDataService from "../src/services/cardsrecommendation/CardDataService.js";
import ShopPurchaseOptionsService from "../src/services/cardsrecommendation/ShopPurchaseOptionsService.js";
import CostCalculationService from "../src/services/cardsrecommendation/CostCalculatorService.js";
import ShopOutputService from "../src/services/cardsrecommendation/ShopOutputService.js";

// Hauptfunktion zum Ausführen des Offline-Kaufs
async function offlineHunt() {
    try {
        // JSON-Daten aus der Datei lesen
        const cardData = CardDataService.readCardDataFromFile("./tests/fixtures/mock_data_ec_0.json");

        // Daten in ein Format umwandeln, das für die Kombinationserzeugung geeignet ist
        const productOptions = ShopPurchaseOptionsService.generateProductOptions(cardData);

        // Optimale Kombinationen der Shops mit dynamischer Programmierung ermitteln
        const optimalCombinations = ShopPurchaseOptionsService.generateOptimalShopCombinations(productOptions);

        // Gesamtkosten für jede Kombination berechnen, einschließlich fester Versandkosten
        const costs = CostCalculationService.calculateCosts(optimalCombinations);

        // Nach Gesamtkosten sortieren und die vier günstigsten Optionen auswählen
        const topFour = CostCalculationService.getTopFourCostEffectiveOptions(costs);

        // Ergebnisse mit dem ShopOutputService ausgeben
        ShopOutputService.printTopCombinations(topFour);
    } catch (error) {
        console.error("Error during offline hunt:", error);
    }
}

offlineHunt();
