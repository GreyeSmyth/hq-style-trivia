const uuid = require('uuid/v4');

const config = require('../config');

const fetchQuestion = require('../data/fetchQuestion');
const MATCH_STATE = require('../enums/matchState');

const createNewPlayer = require('./player');
const createNewRound = require('./round');


function createNewMatch(disposer) {
    const playerIDs = {};
    const playerObjects = {};

    let matchState = MATCH_STATE.ACCEPTING_PLAYERS;
    let matchStartsAt;

    let currentRound = 0;
    let round;

    get players() {
        return Object.values(playerObjects);
    }

    function broadcast(message) {
        players.forEach(({ notify }) => notify(message));
    };

    function scheduleMatchStart() {
        matchStartsAt = Date.now() + config.matchStartDelay;
        broadcast({
            code: 'match-starting',
            matchStartsAt,
        });

        setTimeout(scheduleRoundStart, config.matchStartDelay);
    };

    function scheduleRoundStart() {
        currentRound++;

        matchState = MATCH_STATE.NOT_ACCEPTING_ANSWERS;
        broadcast({
            code: 'round-starting',
            currentRound,
            roundStartsAt: Date.now() + config.roundStartDelay,
        });

        setTimeout(startRound, config.roundStartDelay);
    };

    async function startRound() {
        round = createNewRound(await fetchQuestion());

        matchState = MATCH_STATE.ACCEPTING_ANSWERS;
        broadcast({
            code: 'new-question',
            question: round.question,
            answers: round.answers,
            roundEndsAt: Date.now() + config.timeToAnswer,
        });

        setTimeout(displayRoundResults, config.timeToAnswer);
    };

    function displayRoundResults() {
        matchState = MATCH_STATE.NOT_ACCEPTING_ANSWERS;
        players.forEach(({ selectedAnswer }) => round.tallyPlayerAnswer(selectedAnswer));
        players
            .filter(({ selectedAnswer }) => selectedAnswer !== round.correctAnswer)
            .forEach(player => {
                player.notify({
                    code: 'incorrect-answer',
                    round.answersTally,
                    round.correctAnswer,
                });
                player.disconnect();

                delete playerIDs[player.userName];
                delete player;
            });

        const matchWillContinue = players.length > 1;
        players.forEach(player => {
            player.selectAnswer();
            player.notify({
                code: matchWillContinue ? 'correct-answer' : 'match-won',
                round.answersTally,
                newRoundStartsAt: Date.now() + config.roundResultsLength,
            });

            if (!matchWillContinue) {
                player.disconnect();
            }
        });

        if (matchWillContinue) {
            setTimeout(scheduleRoundStart, config.roundResultsLength);
        } else {
            disposer();
        }
    };

	return {
	    get currentState() {
            return {
                userNames: Object.keys(playerIDs),
                matchState,
                matchStartsAt,
            };
        },
        hasUserName(userName) {
            return !!playerIDs[userName];
        },
        addPlayer(userName, notifyClient, disconnect) {
            const player = createNewPlayer(userName, notifyClient, disconnect);
            const playerID = uuid();

            playerIDs[userName] = playerID;
            playerObjects[playerID] = player;

            broadcast({
                code: 'player-joined',
                userName,
            });
            if (players.length >= config.minPlayers) {
                scheduleMatchStart();
            }

            return playerID;
        },
        getPlayer(playerID) {
            return playerObjects[playerID];
        },
    };
}

module.exports = createNewMatch;
