const { getDb } = require('../db/connect');
const { ObjectId } = require("mongodb");

function createPalette(palette) {
    return getDb().collection('palettes').insertOne(palette);
}

function getPalettes() {
    return getDb().collection('palettes').find().toArray();
}

function getPaletteById(id) {
    return getDb().collection('palettes').findOne({ _id: new ObjectId(id) });
}

function updatePalette(id, palette) {
    return getDb().collection('palettes').updateOne(
        { _id: new ObjectId(id) },
        { $set: palette }
    );
}

module.exports = { createPalette, getPalettes, getPaletteById, updatePalette };
