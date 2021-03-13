const express = require('express');


const router = express.Router();

router.use('/answer', require('./answer'));
router.use('/match', require('./match'));

module.exports = router;
