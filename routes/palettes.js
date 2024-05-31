// routes/palettes.js
const express = require("express");
const { body, param } = require("express-validator");
const router = express.Router();
const paletteController = require("../controllers/paletteController");

// Custom validator for hex color
const isHexColor = (color) => /^#([0-9A-F]{3}){1,2}$/i.test(color);

// Validation rules
const paletteValidationRules = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('colors').isArray().withMessage('Colors should be an array')
        .custom(colors => colors.length >= 3 && colors.length <= 5)
        .withMessage('Colors array must contain between 3-5 colors')
        .custom(colors => colors.every(isHexColor))
        .withMessage('Each color must be in hex format'),
    body('tags').optional().isArray().withMessage('Tags should be an array'),
    body('date_created').isISO8601().withMessage('Date created must be a valid date'),
    body('date_modified').isISO8601().withMessage('Date modified must be a valid date'),
    body('favorite').optional().isBoolean().withMessage('Favorite must be a boolean')
];

const idValidationRules = [
    param('id').isMongoId().withMessage('Invalid ID format')
];

router.get("/", paletteController.getAll);
router.get("/:id", idValidationRules, paletteController.getSingle);
router.post("/", paletteValidationRules, paletteController.create);
router.put("/:id", [...idValidationRules, ...paletteValidationRules], paletteController.update);
router.delete("/:id", idValidationRules, paletteController.deletePalette);

module.exports = router;
