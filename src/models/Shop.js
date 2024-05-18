class Shop {
    constructor(name) {
        this.name = name;
        this.cards = [];
        this.totalPrice = 0;
        this.missingCards = [];
        this.uniqueCardNames = new Set();
    }

    addCard(card) {
        const existingCard = this.cards.find(c => c.name === card.name);
        if (existingCard) {
            if (existingCard.price > card.price) {
                existingCard.price = card.price;
            }
        } else {
            this.cards.push(card);
        }
        this.updateTotalPrice();
    }

    updateTotalPrice() {
        this.totalPrice = parseFloat(this.cards
            .reduce((acc, card) => acc + card.price, 0)
            .toFixed(2)
        );
    }

    setUniqueCardNames(uniqueCardNames) {
        this.uniqueCardNames = uniqueCardNames;
        this.calculateMissingCards();
    }

    calculateMissingCards() {
        this.missingCards = [...this.uniqueCardNames]
            .filter(cardName => !this.cards.some(card => card.name === cardName));
    }

    getAvailableCards() {
        return this.cards.length;
    }

    getTotalCardNamesSize() {
        return this.uniqueCardNames.size;
    }
}

export default Shop;
