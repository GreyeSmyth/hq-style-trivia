import { types, getEnv } from 'mobx-state-tree';

import Match from '../models/Match';


const ModelStore = types
	.model('ModelStore', {
		match: types.maybe(Match),
	})
	.views(self => ({
		get context() {
			return getEnv(self);
		},
		get requestService() {
			return self.context.wsRequestService;
		},
	}))
	.actions(self => ({
		createMatch(matchCode) {
			if (!self.match) {
				self.requestService.createMatch(matchCode);
			}
		},
		joinMatch(matchCode) {
			if (!self.match) {
				self.requestService.joinMatch(matchCode);
			}
		},
		leaveMatch() {
			self.match = null;
		},
		initMatch(matchCode, playerID, playersRequred, matchStartsAt) {
			self.match = Match.create({
				id: matchCode,
				player: { id: playerID },
				playersRequred,
			}, self.context);
			
			if (matchStartsAt) {
				self.match.startMatch(matchStartsAt);
			}
		},
	}));

export default ModelStore;
