const MATCH_STATE = require('../enums/matchState');
const matchNotFoundError = require('../errors/matchNotFoundError');
const userNameInUseError = require('../errors/userNameInUseError');
const notAcceptingPlayersError = require('../errors/notAcceptingPlayersError');


function joinMatch({ matchCode, userName }, context) {
    const match = context.getMatch(matchCode);
    if (!match) {
        return matchNotFoundError;
    }
    
    if (match.hasUserName(userName)) {
        return userNameInUseError;
    }

    if (match.currentState.matchState !== MATCH_STATE.ACCEPTING_PLAYERS) {
        return notAcceptingPlayersError;
    }
    
    const playerID = match.addPlayer(userName, context.notifyClient, context.disconnect);
    return {
        code: 'match-joined',
        playerID,
        currentState: match.currentState,
    };
}

module.exports = joinMatch;
