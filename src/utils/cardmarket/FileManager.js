import fs from 'fs';

class FileManager {
    static readCardLinksFromFile(fileName) {
        return fs.readFileSync(fileName, "utf8").split("\n");
    }
}

export default FileManager;
