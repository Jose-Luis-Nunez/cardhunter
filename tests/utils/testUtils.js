function convertToJson(output) {
    const combinations = output.split('╔══════════════════════════════════╗')
        .filter(part => part.trim())
        .map(part => {
            const [header, ...rest] = part.split('\n').map(line => line.trim()).filter(line => line);
            const combinationNumber = parseInt(header.match(/Combination: (\d+)/)[1]);
            const totalCardCostMatch = rest.find(line => line.startsWith('💰 Total card cost:')).match(/💰 Total card cost: €([\d.]+) with delivery: €([\d.]+)/);
            const totalCardCost = parseFloat(totalCardCostMatch[1]);
            const totalCostWithDelivery = parseFloat(totalCardCostMatch[2]);

            const shops = [];
            let currentShop = null;
            for (let i = 0; i < rest.length; i++) {
                const line = rest[i];
                if (line.startsWith('🛒')) {
                    if (currentShop) {
                        shops.push(currentShop);
                    }
                    const shopNameMatch = line.match(/🛒 (.+) \((\d+) items?\):/);
                    currentShop = {
                        name: shopNameMatch[1],
                        items: []
                    };
                } else if (line.startsWith('➤')) {
                    const itemMatch = line.match(/➤ (.+): €([\d.]+)/);
                    currentShop.items.push({
                        name: itemMatch[1],
                        price: parseFloat(itemMatch[2])
                    });
                }
            }
            if (currentShop) {
                shops.push(currentShop);
            }

            return {
                combination: combinationNumber,
                totalCardCost,
                totalCostWithDelivery,
                shops
            };
        });

    return combinations;
}

module.exports = {
    convertToJson,
};
