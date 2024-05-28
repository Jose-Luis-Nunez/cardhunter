class WebScraper {
    constructor(page) {
        this.page = page;
        this.loadMoreButton = "#loadMore";
    }

    async getElementTexts(selector) {
        return this.page.evaluate(selector => {
            return Array.from(document.querySelectorAll(selector))
                .map(element => element.innerText);
        }, selector);
    }

    async clickLoadMoreButton(maxClicks) {
        const loadMoreLocator = this.page.locator(this.loadMoreButton);
        for (let i = 0; i < maxClicks; i++) {
            const isVisible = await loadMoreLocator.isVisible();
            if (isVisible) {
                await loadMoreLocator.click();
                await this.page.waitForTimeout(2000);
            }
        }
    }
}

export default WebScraper;
