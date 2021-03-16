const { v4: uuid } = require('uuid');


const config = require('../config');

const MATCH_STATE = require('../definitions/enums/matchState');
const fetchQuestion = require('../data/fetchQuestion');

const createNewPlayer = require('./player');
const createNewRound = require('./round');


function createNewMatch(disposer) {
    const players = {};

    let matchState = MATCH_STATE.ACCEPTING_PLAYERS;
    let matchStartsAt;

    let currentRound = 0;
    let round;

    function listPlayers() {
        return Object.values(players);
    }
    function playersRequired() {
        return config.minPlayers - listPlayers().length;
    }

    function broadcast(message) {
        listPlayers().forEach(({ notify }) => notify(message));
    };

    function scheduleMatchStart() {
        matchStartsAt = Date.now() + config.matchStartDelay;
        broadcast({
            method: 'startMatch',
            matchStartsAt,
        });

        setTimeout(scheduleRoundStart, config.matchStartDelay);
    };

    function scheduleRoundStart() {
        currentRound++;

        matchState = MATCH_STATE.NOT_ACCEPTING_ANSWERS;
        broadcast({
            method: 'startRound',
            currentRound,
        });

        setTimeout(startRound, config.roundStartDelay);
    };

    async function startRound() {
        round = createNewRound(await fetchQuestion());

        matchState = MATCH_STATE.ACCEPTING_ANSWERS;
        broadcast({
            method: 'setQuestion',
            question: round.question,
            answers: round.answers,
            roundEndsAt: Date.now() + config.timeToAnswer,
        });

        setTimeout(displayRoundResults, config.timeToAnswer);
    };

    function displayRoundResults() {
        matchState = MATCH_STATE.NOT_ACCEPTING_ANSWERS;
        listPlayers().forEach(({ selectedAnswer }) => round.tallyPlayerAnswer(selectedAnswer));

        const { answersTally, correctAnswer } = round;
        listPlayers()
            .filter(({ selectedAnswer }) => selectedAnswer !== round.correctAnswer)
            .forEach(player => {
                player.notify({
                    method: 'revealAnswerWrong',
                    correctAnswer,
                    answersTally,
                });
                delete players[player.playerID];
            });

        const matchWillContinue = listPlayers().length > 1;
        broadcast({
            method: matchWillContinue ? 'revealAnswerCorrect' : 'revealMatchWon',
            answersTally,
        });

        if (matchWillContinue) {
            listPlayers().forEach(player => player.selectAnswer());
            setTimeout(scheduleRoundStart, config.roundResultsLength);
        } else {
            disposer();
        }
    };

	return {
        get matchState() {
            return matchState;
        },
	    get lobbyState() {
            return {
                playersRequired: playersRequired(),
                matchStartsAt,
            };
        },
        addPlayer(notifyClient) {
            const player = createNewPlayer(uuid(), notifyClient);
            players[player.playerID] = player;

            broadcast({
                method: 'updatePlayers',
                playersRequired: playersRequired(),
            });
            if (playersRequired() <= 0 && !matchStartsAt) {
                scheduleMatchStart();
            }

            return player.playerID;
        },
        getPlayer(playerID) {
            return players[playerID];
        },
        removePlayer(playerID) {
            if (players[playerID]) {
                delete players[playerID];

                if (listPlayers().length) {
                    broadcast({
                        method: 'updatePlayers',
                        playersRequired: playersRequired(),
                    });
                } else {
                    disposer();
                }
            }
        },
    };
}

module.exports = createNewMatch;
