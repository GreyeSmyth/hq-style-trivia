const matchNotFoundError = require('../errors/matchNotFoundError');
const matchAlreadyStartingError = require('../errors/matchAlreadyStartingError');


function leaveMatch({ matchCode, playerID }, context) {
    const match = context.getMatch(matchCode);
    if (!match) {
        return matchNotFoundError;
    }

    if (match.currentState.matchStartsAt) {
        return matchAlreadyStartingError;
    }
    
    const playerID = match.removePlayer(playerID);
    return { method: 'playerRemoved' };
}

module.exports = leaveMatch;
