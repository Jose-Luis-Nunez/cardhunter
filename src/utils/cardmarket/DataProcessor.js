class DataProcessor {
    static extractShopName(elements) {
        return elements.map(element => element.replace('\n', '').slice(element.lastIndexOf('\n')));
    }
}

export default DataProcessor;
