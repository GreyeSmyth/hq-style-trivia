const matchCodeInUseError = require('../errors/matchCodeInUseError');
const createNewMatch = require('../models/match');


function createMatch({ matchCode, userName }, context) {
    if (context.getMatch(matchCode)) {
        return matchCodeInUseError;
    }

    const match = context.addMatch(
        createNewMatch(() => context.removeMatch(matchCode)),
        matchCode,
    );
    const playerID = match.addPlayer(userName, context.notifyClient, context.disconnect);
    return {
        code: 'match-created',
        playerID,
    };
}

module.exports = createMatch;
