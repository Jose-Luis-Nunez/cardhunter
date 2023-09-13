import fs from "fs";

class Utils {
    constructor(page) {
        this.page = page;
        this.loadMoreButton = "#loadMore";
        this.sellerNames = ".seller-name";
        this.sellerPrices = ".price-container";
        this.cardTitle = ".breadcrumb-item:last-child"
    }

    async getShopNamesFromLink() {
        const sellerInformation = await this.getElements(this.sellerNames)
        const sellerPriceInformation = await this.getElements(this.sellerPrices)

        const cardName = await this.page.locator(this.cardTitle).textContent();
        const sellerNames = await this.getSellerNames(sellerInformation);
        const sellerPriceFormatted = await this.removeEuroSign(sellerPriceInformation)

        return this.formatCardData(cardName, sellerNames, sellerPriceFormatted);
    }

    async getElements(selector) {
        return await this.page.evaluate((selector) => {
            return Array.from(document.querySelectorAll(selector))
                .map(element => element.innerText);
        }, selector);
    }

    async getSellerNames(elements) {
        return elements.map(element => {
            return element.replace('\n', '').slice(element.lastIndexOf('\n'));
        });
    }

    async removeEuroSign(prices) {
        return prices.map((price) => price.replace("€", "").trim());
    }

    async formatCardData(cardName, sellerNames, sellerPriceFormatted) {
        const formattedData = {
            cardName: cardName,
            shops: sellerNames.map((seller, index) => ({
                sellerName: seller,
                price: parseFloat(sellerPriceFormatted[index].replace(',', '.'))
            }))
        };
        return formattedData;
    }

    async findShopMostCards(cards) {
        const shopMap = new Map();

        cards.forEach(card => {
            card.shops.forEach(shop => {
                const shopName = shop.sellerName;
                const price = shop.price;

                if (!shopMap.has(shopName)) {
                    shopMap.set(shopName, {totalPrice: 0, cards: []});
                }

                shopMap.get(shopName).totalPrice += price;
                shopMap.get(shopName).cards.push({cardName: card.cardName, price: price});
            });
        });

        // Sort shops by the number of cards they have in descending order
        const sortedShops = [...shopMap.entries()].sort((a, b) => b[1].cards.length - a[1].cards.length);

        // Create the shop summaries
        const shopSummaries = sortedShops.map(([shopName, shopData]) => {
            // Create a new array of cards, sorted by price
            const sortedCards = shopData.cards.map(item => ({cardName: item.cardName, price: Number(item.price)}));

            // Create a string of the formatted items
            const formattedItems = sortedCards.map(item => `[${item.cardName} | ${item.price.toFixed(2)}]`).join('; ');

            return `${shopName} → ${shopData.totalPrice.toFixed(2)}€ ${formattedItems}`;
        });

        return shopSummaries;
    }

    async clickLoadMoreButton(maxClicks) {
        for (let i = 0; i < maxClicks; i++) {
            const isVisible = await this.loadMoreButton.isVisible();
            if (isVisible) {
                await this.loadMoreButton.click();
                await this.page.waitForTimeout(2000);
            }
        }
    }

    async getLinksFromFile(fileName) {
        const fs = require("fs");
        const links = fs.readFileSync(fileName, "utf8").split("\n");
        return links;
    }
}

export default Utils;
