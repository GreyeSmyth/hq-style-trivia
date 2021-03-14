function createNewPlayer(userName, notifyClient, disconnect) {
	let currentAnswerID;

	return {
		get playerName() {
			return userName;
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
		disconnect() {
			disconnect();
		}
	};
}

module.exports = createNewPlayer;
