import { types, getEnv } from 'mobx-state-tree';

import MATCH_STATE from '../definitions/enums/matchState';

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
			if (self.match) {
				if (self.match.matchState === MATCH_STATE.AWAITING_PLAYERS) {
					self.requestService.leaveMatch(self.match.id, self.match.player.id);
				}
				self.match = undefined;
			}
		},
		initMatch(matchCode, playerID, playersRequired, matchStartsAt) {
			self.match = Match.create({
				id: matchCode,
				player: { id: playerID },
				playersRequired,
			}, self.context);
			
			if (matchStartsAt) {
				self.match.startMatch(matchStartsAt);
			}
		},
	}));

export default ModelStore;
