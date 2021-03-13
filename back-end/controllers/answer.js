const express = require('express');

const getMatch = require('../middlewares/getMatch');
const requireMatch = require('../middlewares/requireMatch');
const requirePlayer = require('../middlewares/requirePlayer');


const router = express.Router();

// Submit a player's answer to the current quiz question
router.post('/', getMatch, requireMatch, requirePlayer, (req, res) => {
    const { answerIndex } = req.body;
    const response = req.match.submitAnswer(req.player, answerIndex);

    if (response.code === 'accepted') {
        res.json(response);
    } else {
        res.status(400).json(response);
    }
});

module.exports = router;
