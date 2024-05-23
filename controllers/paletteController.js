// controllers/paletteController.js
const paletteModel = require("../models/paletteModel");

async function getAll(req, res) {
    try {
        const palettes = await paletteModel.getPalettes();
        res.json(palettes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getSingle(req, res) {
    const id = req.params.id;
    try {
        const palette = await paletteModel.getPaletteById(id);
        if (!palette) {
            res.status(404).json({ message: "Palette not found" });
            return;
        }
        res.json(palette);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function create(req, res) {
    const palette = req.body;
    try {
        const createdPalette = await paletteModel.createPalette(palette);
        res.status(201).json(createdPalette.ops[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function update(req, res) {
    const id = req.params.id;
    const palette = req.body;
    try {
        const updatedPalette = await paletteModel.updatePalette(id, palette);
        if (updatedPalette.modifiedCount === 0) {
            res.status(404).json({ message: "Palette not found" });
            return;
        }
        res.json({ message: "Palette updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getAll, getSingle, create, update };
