const matchCodeInUseError = require('../errors/matchCodeInUseError');
const createNewMatch = require('../models/match');


function createMatch({ matchCode }, context) {
    if (context.getMatch(matchCode)) {
        return matchCodeInUseError;
    }

    const match = context.addMatch(
        createNewMatch(() => context.removeMatch(matchCode)),
        matchCode,
    );
    const playerID = match.addPlayer(context.notifyClient);
    return {
        method: 'matchJoined',
        matchCode,
        playerID,
        ...match.currentState,
    };
}

module.exports = createMatch;
