// routes/palettes.js
const express = require("express");
const router = express.Router();
const paletteController = require("../controllers/paletteController");

router.get("/", paletteController.getAll);
router.get("/:id", paletteController.getSingle);
router.post("/", paletteController.create);
router.put("/:id", paletteController.update);
router.delete("/:id", paletteController.deletePalette); // New route for DELETE

module.exports = router;
