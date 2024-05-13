export class Shop {
    constructor(name) {
        this.name = name;
        this.totalPrice = 0;
        this.cards = {};
    }

    addOrUpdateCard(card) {
        const oldPrice = this.cards[card.name] ? this.cards[card.name].price : 0;
        this.totalPrice += card.price - oldPrice;
        this.cards[card.name] = card;
    }

    formatShopSummary(allCardNames) {
        const longestCardNameLength = Math.max(...Object.keys(this.cards).map(name => name.length));
        const cardInformation = Object.values(this.cards)
            .map(card => `| ${card.name.padEnd(longestCardNameLength)} | ${card.price.toFixed(2)}€`)
            .join('\n');

        const summary = `🛒 Shop: ${this.name} | 💰 Price: ${this.totalPrice.toFixed(2)}€ | ✅ Available: ${Object.keys(this.cards).length}/${allCardNames.size} Cards`;
        const missingCards = [...allCardNames].filter(cardName => !this.cards.hasOwnProperty(cardName));
        const missingText = missingCards.length > 0 ? `🚩 Missing Cards (${missingCards.length}):` : '';

        console.log(`============================\n${summary}\n\n`);
        console.log("💳 Card Overview:\n--------------------------------");
        console.log(`${cardInformation}\n--------------------------------\n`);
        console.log(missingText);
        console.log(`${missingCards}\n\n`);
    }
}
