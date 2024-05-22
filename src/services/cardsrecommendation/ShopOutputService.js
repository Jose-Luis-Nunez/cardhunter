class ShopOutputService {
    static printTopCombinations(topFour) {
        topFour.forEach((option, index) => {
            console.log('╔══════════════════════════════════╗');
            console.log(`║ Combination: ${index + 1}                   ║`);
            console.log('╚══════════════════════════════════╝');
            console.log(`💰 Total card cost: €${option.totalProductCost.toFixed(2)} with delivery: ${option.totalCostWithDelivery.toFixed(2)}`);
            console.log();

            option.detail.forEach(shop => {
                console.log(`🛒 ${shop.name} (${shop.getAvailableCards()} items):`);
                shop.cards.forEach(card => {
                    console.log(`  ➤ ${card.name}: €${card.price.toFixed(2)}`);
                });
                console.log();
            });
        });
    }
}

module.exports = ShopOutputService;
