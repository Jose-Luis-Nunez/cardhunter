import ShopPurchaseOptionsGenerator from "../utils/ShopPurchaseOptionsGenerator.js";

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

    static generateAllShopPurchaseOptions(productOptions) {
        return ShopPurchaseOptionsGenerator.generateAllShopPurchaseOptions(...productOptions);
    }
}

export default ShopPurchaseOptionsService;
