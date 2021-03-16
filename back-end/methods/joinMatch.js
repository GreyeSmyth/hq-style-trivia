const MATCH_STATE = require('../definitions/enums/matchState');
const matchNotFoundError = require('../errors/matchNotFoundError');
const notAcceptingPlayersError = require('../errors/notAcceptingPlayersError');


function joinMatch({ matchCode }, context) {
    const match = context.getMatch(matchCode);
    if (!match) {
        return matchNotFoundError;
    }

    if (match.matchState !== MATCH_STATE.ACCEPTING_PLAYERS) {
        return notAcceptingPlayersError;
    }
    
    const playerID = match.addPlayer(context.notifyClient);
    return {
        method: 'matchJoined',
        matchCode,
        playerID,
        ...match.lobbyState,
    };
}

module.exports = joinMatch;
