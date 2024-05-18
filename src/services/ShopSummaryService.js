class ShopSummaryService {

    static printShop(bestCombination) {
        if (bestCombination) {
            console.log("Beste Kombination:");
            const boughtCards = new Set();
            let totalCost = 0; // Gesamtkosten initialisieren

            for (const shop of bestCombination) {
                const cardsToBuy = shop.cards.filter(card => !boughtCards.has(card.name) && shop.uniqueCardNames.has(card.name));

                console.log(`\n${shop.name}:`);
                console.log("Karten:");

                for (const card of cardsToBuy) {
                    console.log(`${card.name}: ${card.price.toFixed(2)}€`);
                    boughtCards.add(card.name);
                    totalCost += card.price; // Preis zur Gesamtsumme hinzufügen
                }
            }

            console.log(`\nGesamtkosten: ${totalCost.toFixed(2)}€`); // Gesamtkosten ausgeben
        } else {
            console.log("Keine Kombination gefunden, die alle Karten enthält.");
        }
    }
}

export default ShopSummaryService
