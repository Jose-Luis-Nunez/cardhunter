class DataProcessor {
    static getSellerNames(elements) {
        return elements.map(element => element.replace('\n', '').slice(element.lastIndexOf('\n')));
    }

    static removeEuroSign(prices) {
        return prices.map(price => price.replace("€", "").trim());
    }
}

export default DataProcessor;
