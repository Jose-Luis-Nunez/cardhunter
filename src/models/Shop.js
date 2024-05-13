export class Shop {
    constructor(name) {
        this.name = name;
        this.cards = [];
        this.totalPrice = 0;
        this.missingCards = [];
        this.totalCardNames = new Set();
    }

    addCard(card) {
        this.cards.push(card);
        this.updateTotalPrice();
    }

    updateTotalPrice() {
        this.totalPrice = parseFloat(this.cards.reduce((acc, card) => acc + card.price, 0).toFixed(2));
    }

    static setTotalCardNamesForAllShops(shops, totalCardNames) {
        Object.values(shops).forEach(shop => {
            shop.setTotalCardNames(totalCardNames);
        });
    }

    setTotalCardNames(totalCardNames) {
        this.totalCardNames = totalCardNames;
        this.calculateMissingCards();
    }

    calculateMissingCards() {
        this.missingCards = [...this.totalCardNames].filter(cardName => !this.cards.some(card => card.name === cardName));
    }

    getAvailableCards() {
        return this.cards.length;
    }

    getTotalCardNamesSize() {
        return this.totalCardNames.size;
    }
}
