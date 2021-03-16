import { types, getEnv } from 'mobx-state-tree';


const WsRequestService = types
	.model('WsRequestService')
	.views(self => ({
		get context() {
			return getEnv(self);
		},
		get webSocket() {
			return self.context.webSocket;
		}
	}))
	.actions(self => ({
		_sendToWebSocket(messageJSON) {
			try {
				const message = JSON.stringify(messageJSON);
				self.webSocket.send(message);
			} catch(e) {
				console.error('Unable to encode message to server', e);
			}
		},

		createMatch(matchCode) {
			self._sendToWebSocket({
				method: 'createMatch',
				matchCode,
			});
		},

		joinMatch(matchCode) {
			self._sendToWebSocket({
				method: 'joinMatch',
				matchCode,
			});
		},

		leaveMatch(matchCode, playerID) {
			self._sendToWebSocket({
				method: 'leaveMatch',
				matchCode,
				playerID,
			});
		},

		submitAnswer(matchCode, playerID, answerID) {
			self._sendToWebSocket({
				method: 'submitAnswer',
				matchCode,
				playerID,
				answerID,
			});
		},
	}));

export default WsRequestService;
