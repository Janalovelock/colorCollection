const express = require('express');
const router = express.Router();

router.use("/", require("./swagger"));
router.use('/auth', require('./auth'));
router.use('/palettes', require('./palettes'));

module.exports = router;