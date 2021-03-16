const matchCodeInUseError = require('../errors/matchCodeInUseError');
const createNewMatch = require('../models/match');


function createMatch({ matchCode }, context) {
    if (context.getMatch(matchCode)) {
        return matchCodeInUseError;
    }

    const match = createNewMatch(
        () => context.removeMatch(matchCode)
    );
    context.addMatch(match, matchCode);

    const playerID = match.addPlayer(context.notifyClient);
    return {
        method: 'matchJoined',
        matchCode,
        playerID,
        ...match.lobbyState,
    };
}

module.exports = createMatch;
