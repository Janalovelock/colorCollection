// models/paletteModel.js
const { getDb } = require('../db/connect');
const { ObjectId } = require("mongodb");

function createPalette(palette) {
    console.log("Accessing collection: palettes");
    return getDb().collection('palettes').insertOne(palette);
}

function getPalettes() {
    console.log("Accessing collection: palettes");
    return getDb().collection('palettes').find().toArray();
}

function getPaletteById(id) {
    console.log("Accessing collection: palettes");
    return getDb().collection('palettes').findOne({ _id: new ObjectId(id) });
}

function updatePalette(id, palette) {
    console.log("Accessing collection: palettes");
    return getDb().collection('palettes').updateOne(
        { _id: new ObjectId(id) },
        { $set: palette }
    );
}

function deletePalette(id) {
    console.log("Accessing collection: palettes");
    return getDb().collection('palettes').deleteOne({ _id: new ObjectId(id) });
}

module.exports = { createPalette, getPalettes, getPaletteById, updatePalette, deletePalette };
