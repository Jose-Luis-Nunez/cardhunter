import CostCalculator from "../../utils/CostCalculator.js";

class CostCalculationService {
    static calculateCosts(combinations) {
        return CostCalculator.calculateCosts(combinations);
    }
}

export default CostCalculationService;
