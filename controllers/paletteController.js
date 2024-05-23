// controllers/paletteController.js
const paletteModel = require("../models/paletteModel");
const { ObjectId } = require('mongodb');

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
    const { title, description, colors, tags, date_created, date_modified, favorite } = req.body;
    if (!title || !description || !colors || !tags || !date_created || !date_modified || favorite === undefined) {
        return res.status(400).json({ message: "All required fields must be provided" });
    }

    const palette = {
        title,
        description,
        colors,
        tags,
        date_created,
        date_modified,
        favorite
    };

    try {
        const createdPalette = await paletteModel.createPalette(palette);
        res.status(201).json({ id: createdPalette.insertedId }); // Access insertedId from createdPalette
    } catch (error) {
        console.error("Error creating palette:", error); // Log detailed error message
        res.status(500).json({ message: "An error occurred while creating the palette" });
    }
}

async function update(req, res) {
    try {
        const id = new ObjectId(req.params.id);
        const { title, description, colors, tags, date_created, date_modified, favorite } = req.body;

        // Validate required fields
        if (!title || !description || !colors || !tags || !date_created || !date_modified || favorite === undefined) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Update palette using paletteModel
        const result = await paletteModel.updatePalette(id, {
            title,
            description,
            colors,
            tags,
            date_created,
            date_modified,
            favorite
        });

        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: "Palette not found" });
        }

        res.status(200).json({ message: "Palette updated successfully" }); 
    } catch (error) {
        console.error("Error updating palette:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
async function deletePalette(req, res) {
    const id = req.params.id;
    try {
        const result = await paletteModel.deletePalette(id);
        if (result.deletedCount === 0) {
            res.status(404).json({ message: "Palette not found" });
            return;
        }
        res.json({ message: "Palette deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getAll, getSingle, create, update, deletePalette };
