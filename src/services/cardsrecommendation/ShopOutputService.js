class ShopOutputService {
    static printTopCombinations(results) {
        let output = '';
        results.forEach((result, index) => {
            output += '╔══════════════════════════════════╗\n';
            output += `║ Combination: ${index + 1}                   ║\n`;
            output += '╚══════════════════════════════════╝\n';
            output += `💰 Total card cost: €${result.totalProductCost.toFixed(2)} with delivery: €${result.totalCostWithDelivery.toFixed(2)}\n\n`;

            result.detail.forEach(shop => {
                output += `🛒 ${shop.name} (${shop.cards.length} items):\n`;
                shop.cards.forEach(card => {
                    output += `  ➤ ${card.name}: €${card.price.toFixed(2)}\n`;
                });
                output += '\n';
            });
        });
        return output;
    }
}

module.exports = ShopOutputService;
