class Palette {
    constructor(db) {
        this.db = db;
        this.collection = this.db.collection('palettes');
    }

    async create(paletteData) {
        try {
            const result = await this.collection.insertOne(paletteData);
            return result.ops[0];
        } catch (error) {
            console.error('Error creating palette:', error);
            throw error;
        }
    }

    // Implement other CRUD methods as needed
}

module.exports = Palette;
