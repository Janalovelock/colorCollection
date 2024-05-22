// models/paletteModel.js
const { getDatabase } = require('../db/connect');

function createPalette(palette) {
    return getDatabase().collection('palettes').insertOne(palette);
}

function getPalettes() {
    return getDatabase().collection('palettes').find().toArray();
}

module.exports = { createPalette, getPalettes };