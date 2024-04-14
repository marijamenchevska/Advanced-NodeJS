import fs from 'fs/promises';

export class DataService {
    static async readData(dbPath) {
        return JSON.parse(await fs.readFile(dbPath));
    }

    static async writeData(dbPath, data) {
        return fs.writeFile(dbPath, JSON.stringify(data, null, 2));
    }

    static async appendData(dbPath, data) {
        return fs.appendFile(dbPath, data);
    }
}