const express = require('express');

const getMatch = require('../middlewares/getMatch');
const requireMatch = require('../middlewares/requireMatch');
const requirePlayer = require('../middlewares/requirePlayer');
const createNewMatch = require('../models/match');


const router = express.Router();

// Create a new trivia match using a code that can be shared with other players
router.post('/create', getMatch, (req, res) => {
    const { userName, matchCode } = req.body;
    if (!req.match) {
        const match = createNewMatch();
        const playerID = match.addPlayer(userName);

        req.app.local.matches[matchCode] = match;
        res.json({ playerID });
    } else {
        res.status(422).json({
            code: 'match-exists',
            message: 'A match with the requested code already exists',
        });
    }
});

// Join an existing match using a code provided by its creator
router.post('/join', getMatch, requireMatch, (req, res) => {
    const { userName } = req.body;
    if (!req.match.hasUserName(userName)) {
        const playerID = req.match.addPlayer(userName);
        res.json({
            playerID,
            lobbyState: req.match.lobbyState,
        });
    } else {
        res.status(422).json({
            code: 'username-exists',
            message: 'A player with the requested username already exists',
        });
    }
});

// Rejoin an existing match in case of disconnection
router.post('/rejoin', getMatch, requireMatch, requirePlayer, req (req, res) => {
    res.json(req.match.matchState(req.user));
});

module.exports = router;
