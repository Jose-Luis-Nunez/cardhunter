class ShopPurchaseOptionsGenerator {
    static generateAllShopPurchaseOptions(...args) {
        return args.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));
    }
}
export default ShopPurchaseOptionsGenerator;