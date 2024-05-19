class CostCalculator {
    static calculateCosts(combinations) {
        return combinations.map(combo => {
            const shopsUsed = {};
            let detail = {};  // To store the details of what is bought from which shop
            let totalProductCost = 0;

            combo.forEach(item => {
                if (!shopsUsed[item.sellerName]) {
                    shopsUsed[item.sellerName] = 3; // initial shipping cost
                    detail[item.sellerName] = []; // initialize shop detail list
                }
                shopsUsed[item.sellerName] += item.price;
                totalProductCost += item.price;
                detail[item.sellerName].push(`${item.cardName}: €${item.price.toFixed(2)}`);
            });

            const totalCostWithDelivery = Object.values(shopsUsed).reduce((sum, current) => sum + current, 0);
            return {totalCostWithDelivery, totalProductCost, detail};
        });
    }
}

export default CostCalculator;
