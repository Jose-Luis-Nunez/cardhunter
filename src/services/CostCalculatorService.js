import CostCalculator from "../utils/CostCalculator.js";

class CostCalculationService {
    static calculateCosts(combinations) {
        return CostCalculator.calculateCosts(combinations);
    }

    static getTopFourCostEffectiveOptions(costs,numberOfOptions) {
        costs.sort((a, b) => a.totalCostWithDelivery - b.totalCostWithDelivery);
        return costs.slice(0, numberOfOptions);
    }
}

export default CostCalculationService;
