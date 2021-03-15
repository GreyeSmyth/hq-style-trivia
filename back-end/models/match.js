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
        return Object.values(playerObjects);
    }
    function playersRequired() {
        return listPlayers().length - config.minPlayers;
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
                delete player;
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
	    get currentState() {
            return {
                playersRequired: playersRequired(),
                matchStartsAt,
            };
        },
        addPlayer(notifyClient) {
            const player = createNewPlayer(notifyClient);
            const playerID = uuid();

            playerObjects[playerID] = player;

            broadcast({
                method: 'updatePlayers',
                playersRequired: playersRequired(),
            });
            if (playersRequired() <= 0 && !matchStartsAt) {
                scheduleMatchStart();
            }

            return playerID;
        },
        getPlayer(playerID) {
            return playerObjects[playerID];
        },
        removePlayer(playerID) {
            if (players[playerID]) {
                delete players[playerID];
                broadcast({
                    method: 'updatePlayers',
                    playersRequired: playersRequired(),
                });
            }
        },
    };
}

module.exports = createNewMatch;
