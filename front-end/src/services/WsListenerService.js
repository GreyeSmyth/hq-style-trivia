import { types, getEnv } from 'mobx-state-tree';


const WsListenerService = types
	.model('WsListenerService')
	.views(self => ({
		get context() {
			return getEnv(self);
		},
		get webSocket() {
			return self.context.webSocket;
		},
		get modelStore() {
			return self.context.modelStore;
		},
		get match() {
			return self.modelStore.match;
		},
		get round() {
			return self.match && self.match.round;
		},
	}))
	.actions(self => ({
		afterCreate() {
			self.webSocket.addEventListener('message', (event) => {
				try {
					const { method, ...params } = JSON.parse(event);
					if (self[method] instanceof Function) {
						self[method](params);
					} else {
						console.error('Unrecognized method requested');
					}
				} catch (e) {
					console.error('Unable to parse server message');
				}
			})
		},

		matchJoined({ matchCode, playerID, playersRequred, matchStartsAt }) {
			self.modelStore.initMatch(matchCode, playerID, playersRequred, matchStartsAt);
		},
		
		updatePlayers({ playersRequred }) {
			if (self.match) {
				self.match.updatePlayers(playersRequred);
			}
		},
		startMatch({ matchStartsAt }) {
			if (self.match) {
				self.match.startMatch(matchStartsAt);
			}
		},
		startRound({ roundNumber }) {
			if (self.match) {
				self.match.startMatch(roundNumber);
			}
		},

		setQuestion({ question, answers, roundEndsAt }) {
			if (self.round) {
				self.round.setQuestion(question, answers, roundEndsAt);
			}
		},
		answerSubmitted() {
			// Nothing to do
		},
		revealAnswerWrong({ correctAnswer, answersTally }) {
			if (self.round) {
				self.round.setResults(correctAnswer, answersTally);
			}
		},
		revealAnswerCorrect({ answersTally }) {
			if (self.round) {
				self.round.setResults(self.round.selectedAnswer, answersTally);
			}
		},
		revealMatchWon({ answersTally }) {
			if (self.round) {
				self.round.setResults(self.round.selectedAnswer, answersTally);
				self.match.markAsWon();
			}
		},
	}));

export default WsListenerService;
