export class ShopReportService {
    static formatShopSummary(shop) {
        const longestCardNameLength = Math.max(...shop.cards.map(card => card.name.length));

        const availableCards = shop.cards
            .map(card => `| ${card.name.padEnd(longestCardNameLength)} | ${card.price}€`)
            .join('\n');

        const summary = `🛒 Shop: ${shop.name} | 💰 Price: ${shop.totalPrice}€ | ✅ Available cards: ${shop.getAvailableCards()} of ${shop.getTotalCardNamesSize()}`;
        const missingCardsCount = shop.missingCards.length;
        const missingText = missingCardsCount > 0 ? `${shop.missingCards.join('\n')}` : '';

        const result = [
            "============================",
            summary,
            "",
            "💳 Card Overview:",
            "--------------------------------",
            availableCards,
            "--------------------------------",
            "🚩 Missing Cards " + (missingCardsCount) + ":",
            missingText,
            "",
        ].join('\n');

        console.log(result);
    }
}
