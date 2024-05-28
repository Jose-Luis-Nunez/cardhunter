class Shop {
    constructor(name) {
        this.name = name;
        this.cards = [];
        this.totalPrice = 0;
        this.uniqueCardNames = new Set();
    }

    addCard(card) {
        this.cards.push(card);
        this.totalPrice += card.price;
        this.uniqueCardNames.add(card.name);
    }

    getAvailableCards() {
        return this.cards.length;
    }

    getTotalCardNamesSize() {
        return this.uniqueCardNames.size;
    }
}

module.exports = Shop;
