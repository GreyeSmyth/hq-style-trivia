const matchNotFoundError = require('../errors/matchNotFoundError');
const matchAlreadyStartingError = require('../errors/matchAlreadyStartingError');


function leaveMatch({ matchCode, playerID }, context) {
    const match = context.getMatch(matchCode);
    if (!match) {
        return matchNotFoundError;
    }

    if (match.lobbyState.matchStartsAt) {
        return matchAlreadyStartingError;
    }
    
    match.removePlayer(playerID);
    return { method: 'matchLeft' };
}

module.exports = leaveMatch;
