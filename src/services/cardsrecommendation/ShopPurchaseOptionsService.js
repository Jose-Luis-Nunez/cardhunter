class ShopPurchaseOptionsService {
    static generateProductOptions(cardData) {
        return cardData.map(product => {
            return product.shops.map(shop => ({
                cardName: product.cardName,
                sellerName: shop.sellerName,
                price: shop.price
            }));
        });
    }

    static generateAllShopPurchaseOptions(...args) {
        return args.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));
    }
}

export default ShopPurchaseOptionsService;
