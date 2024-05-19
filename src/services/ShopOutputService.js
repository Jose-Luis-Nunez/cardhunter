class ShopOutputService {
    static printTopCombinations(topFour) {
        topFour.forEach((option, index) => {
            console.log('╔══════════════════════════════════╗');
            console.log(`║ Combination: ${index + 1}                   ║`);
            console.log('╚══════════════════════════════════╝');
            console.log(`💰 Total Cost with delivery: €${option.totalCostWithDelivery.toFixed(2)}`);
            console.log(`💸 Total Cost without delivery: €${option.totalProductCost.toFixed(2)}`);
            console.log();

            const shopDetails = Object.keys(option.detail).map(shop => ({
                shopName: shop,
                items: option.detail[shop]
            }));

            shopDetails.forEach(shop => {
                console.log(`🛒 ${shop.shopName} (${shop.items.length} items):`);
                shop.items.forEach(item => {
                    console.log(`  ➤ ${item}`);
                });
                console.log();
            });
        });
    }
}

export default ShopOutputService;
