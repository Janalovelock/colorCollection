const express = require("express");
const router = express.Router();

const paletteController = require("../controllers/paletteController"); 

router.get("/", paletteController.getAll)
router.get("/:id", paletteController.getSingle)

router.post("/", paletteController.create);

module.exports = router;