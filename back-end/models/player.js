function createNewPlayer(notifyClient) {
	let currentAnswerID;

	return {
		get selectedAnswer() {
			return currentAnswerID;
		},
		selectAnswer(answerID) {
			currentAnswerID = answerID;
		},
		notify(message) {
			notifyClient(message);
		},
	};
}

module.exports = createNewPlayer;
