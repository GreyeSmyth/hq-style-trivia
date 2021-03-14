const uuid = require('uuid/v4');


function createNewRound({ question, correct_answer, incorrect_answers }) {
	const correctAnswerID = uuid();
	const answers = {
		[correctAnswerID]: correct_answer,
		...incorrect_answers
			.reduce((incorrectAnswers, answer) => {
				incorrectAnswers[uuid()] = answer;
				return incorrectAnswers;
			}, {}),
	}
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
