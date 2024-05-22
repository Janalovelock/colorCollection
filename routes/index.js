const express = require('express');
const router = express.Router();

router.use("/", require("./swagger"));
//router.use('/login', require('./login'));
router.use('/palettes', require('./palettes'));

module.exports = router;