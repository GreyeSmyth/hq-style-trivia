function createNewPlayer(playerID, notifyClient) {
	let currentAnswerID;

	return {
		get playerID() {
			return playerID;
		},
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
