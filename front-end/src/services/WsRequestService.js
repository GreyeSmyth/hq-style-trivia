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
		createMatch(matchCode) {},
		joinMatch(matchCode) {},
		submitAnswer(matchCode, playerID, answerID) {},
	}));

export default WsRequestService;
