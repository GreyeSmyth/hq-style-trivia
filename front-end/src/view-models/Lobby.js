import { types, getEnv } from 'mobx-state-tree';

import MATCH_STATE from '../definitions/enums/matchState';

import toSecondsCountdown from '../functions/toSecondsCountdown';


const Lobby = types
	.model('Lobby')
	.views(self => ({
		get context() {
			return getEnv(self);
		},
		get modelStore() {
			return self.context.modelStore;
		},
		get match() {
			return self.modelStore.match;
		},
		get remainingPlayersNeeded() {
			return Math.max(self.match.playersRequired, 0);
		},
		get shouldDisplayRemainingPlayers() {
			return self.match.matchState === MATCH_STATE.AWAITING_PLAYERS;
		},
		get countdownValue() {
			return self.match.matchStartsAt
				&& toSecondsCountdown(self.match.matchStartsAt);
		},
	}))
	.actions(self => ({
		returnToMainMenu() {
			self.modelStore.leaveMatch();
		},
	}));

export default Lobby;
