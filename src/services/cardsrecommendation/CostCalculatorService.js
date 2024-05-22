const CostCalculator = require("../../utils/cardsrecommendation/CostCalculator.js");

class CostCalculationService {
    static calculateCosts(combinations) {
        return CostCalculator.calculateCosts(combinations);
    }
}

module.exports = CostCalculator;
