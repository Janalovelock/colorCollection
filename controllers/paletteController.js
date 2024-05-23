// controllers/paletteController.js
const Palette = require("../models/paletteModel");

const paletteController = {
  getAll: async (req, res) => {
    try {
      const palettes = await Palette.find();
      res.json(palettes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

    Single: async (req, res) => {
    const id = req.params.id;
    try {
      const palette = await Palette.findById(id);
      if (!palette) {
        return res.status(404).json({ message: "Palette not found" });
      }
      res.json(palette);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  create: async (req, res) => {
    const { title, description, colors, tags } = req.body;
    try {
      const palette = new Palette({
        title,
        description,
        colors,
        tags,
        date_created: new Date(),
        date_modified: new Date(),
        favorite: false // Set favorite to false by default
      });
      const newPalette = await palette.save();
      res.status(201).json(newPalette);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

module.exports = paletteController;
