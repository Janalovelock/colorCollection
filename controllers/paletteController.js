const { validationResult } = require("express-validator");
const paletteModel = require("../models/paletteModel");
const { ObjectId } = require('mongodb');

async function getAll(req, res) {
    try {
        const palettes = await paletteModel.getPalettes();
        res.json(palettes);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function getSingle(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id;
    try {
        const palette = await paletteModel.getPaletteById(id);
        if (!palette) {
            return res.status(404).json({ error: "Palette not found" });
        }
        res.json(palette);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function create(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, colors, tags, date_created, date_modified, favorite } = req.body;
    const palette = { title, colors, date_created, date_modified };

    if (description) palette.description = description;
    if (tags) palette.tags = tags;
    palette.favorite = favorite !== undefined ? favorite : false; 

    try {
        const createdPalette = await paletteModel.createPalette(palette);
        res.status(201).json({ id: createdPalette.insertedId });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function update(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const id = new ObjectId(req.params.id);
        const { title, description, colors, tags, date_created, date_modified, favorite } = req.body;
        const palette = { title, colors, date_created, date_modified };

        if (description) palette.description = description;
        if (tags) palette.tags = tags;
        palette.favorite = favorite !== undefined ? favorite : false;

        const result = await paletteModel.updatePalette(id, palette);
        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: "Palette not found" });
        }

        res.status(200).json({ message: "Palette updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function deletePalette(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id;
    try {
        const result = await paletteModel.deletePalette(id);
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Palette not found" });
        }
        res.json({ message: "Palette deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { getAll, getSingle, create, update, deletePalette };
