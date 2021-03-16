const { v4: uuid } = require('uuid');


function createNewRound({ question, correctAnswer, incorrectAnswers }) {
	const correctAnswerID = uuid();

	const answersArray = [ [ correctAnswerID, correctAnswer ] ];
	incorrectAnswers
		.map(incorrectAnswer => [ uuid(), incorrectAnswer])
		.forEach(incorrectAnswer => answersArray.push(incorrectAnswer));
	answersArray.sort(([ idA ], [ idB ]) => idA > idB ? 1 : -1);

	const answers = answersArray
		.reduce((answersObject, [ id, answer ]) => {
			answersObject[id] = answer;
			return answersObject;
		}, {});
	const answersTally = {};

	return {
		get question() {
			return question;
		},
		get answers() {
			return answers;
		},
		get correctAnswer() {
			return correctAnswerID;
		},
		get answersTally() {
			return answersTally;
		},
		tallyPlayerAnswer(answerID) {
			if (answerID) {
				const existingTally = answersTally[answerID];
				answersTally[answerID] = existingTally ? existingTally + 1 : 1;
			}
		},
	};
}

module.exports = createNewRound;
