const PriorityQueue = require('js-priority-queue');

class ShopPurchaseOption {
    static generateProductOptions(cardData) {
        return cardData.map(product => {
            return product.shops.map(shop => ({
                cardName: product.cardName,
                sellerName: shop.sellerName,
                price: shop.price
            }));
        });
    }

    static findOptimalCombinations(productOptions, topN = 3) {
        let bestCombinations = [];
        let bestCost = Infinity;

        function calculateCost(combination) {
            const shopCounts = new Map();
            let totalCost = 0;

            combination.forEach(item => {
                totalCost += item.price;
                shopCounts.set(item.sellerName, (shopCounts.get(item.sellerName) || 0) + 1);
            });

            const deliveryCost = shopCounts.size * 3;
            return totalCost + deliveryCost;
        }

        const pq = new PriorityQueue({ comparator: (a, b) => a.totalCost - b.totalCost });

        function initializePriorityQueue() {
            const initialCombination = [];
            const initialCost = 0;
            const initialIndex = 0;
            pq.queue({ combination: initialCombination, totalCost: initialCost, index: initialIndex });
        }

        function generateCombinations() {
            const visited = new Set();

            while (pq.length > 0 && bestCombinations.length < topN) {
                const { combination, totalCost, index } = pq.dequeue();

                const key = combination.map(item => item.cardName + item.sellerName).join('|');
                if (visited.has(key)) continue;
                visited.add(key);

                if (index === productOptions.length) {
                    if (bestCombinations.length < topN || totalCost < bestCost) {
                        bestCombinations.push({ combination, totalCost });
                        bestCombinations.sort((a, b) => a.totalCost - b.totalCost);
                        if (bestCombinations.length > topN) {
                            bestCombinations.pop();
                        }
                        bestCost = bestCombinations[bestCombinations.length - 1].totalCost;
                    }
                    continue;
                }

                for (let option of productOptions[index]) {
                    const newCombination = combination.concat(option);
                    const newCost = calculateCost(newCombination);
                    if (newCost < bestCost || bestCombinations.length < topN) {
                        pq.queue({ combination: newCombination, totalCost: newCost, index: index + 1 });
                    }
                }

                if (bestCombinations.length >= topN && pq.peek().totalCost >= bestCost) {
                    break;
                }
            }
        }

        initializePriorityQueue();
        generateCombinations();

        return bestCombinations.map(item => item.combination);
    }
}

module.exports = ShopPurchaseOption;
