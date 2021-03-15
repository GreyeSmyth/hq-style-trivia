const MATCH_STATE = require('../definitions/enums/matchState');
const matchNotFoundError = require('../errors/matchNotFoundError');
const playerNotFoundError = require('../errors/playerNotFoundError');
const notAcceptingAnswersError = require('../errors/notAcceptingAnswersError');


function submitAnswer({ matchCode, playerID, answerID }, context) {
    const match = context.getMatch(matchCode);
    if (!match) {
        return matchNotFoundError;
    }
    
    const player = match.getPlayer(playerID);
    if (!player) {
        return playerNotFoundError;
    }

    if (match.currentState.matchState !== MATCH_STATE.ACCEPTING_ANSWERS) {
        return notAcceptingAnswersError;
    }

    player.selectAnswer(answerID);
    return { code: 'answerSubmitted' };
}

module.exports = submitAnswer;
