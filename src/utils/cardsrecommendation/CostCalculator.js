const Card = require('../../models/Card');
const Shop = require('../../models/Shop');

class CostCalculator {
    static calculateCosts(combinations) {
        return combinations.map(combination => {
            const shopMap = new Map();
            let totalProductCost = 0;

            combination.forEach(item => {
                let shop = shopMap.get(item.sellerName);
                if (!shop) {
                    shop = new Shop(item.sellerName);
                    shopMap.set(item.sellerName, shop);
                }
                const card = new Card(item.cardName, item.price);
                shop.addCard(card);
                totalProductCost += card.price;
            });

            const totalCostWithDelivery = totalProductCost + (shopMap.size * 3);
            return {
                totalCostWithDelivery,
                totalProductCost,
                detail: Array.from(shopMap.values())
            };
        });
    }
}
module.exports = CostCalculator;
