const express = require("express");
const router = express.Router();

const paletteController = require("../controllers/paletteController"); 

router.get("/", paletteController.getAll)
router.get("/:id", paletteController.Single)

router.post("/", paletteController.create);

module.exports = router;