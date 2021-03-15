import { types, getEnv } from 'mobx-state-tree';

import MATCH_STATE from '../definitions/enums/matchState';

import Player from './Player';
import Round from './Round';


const Match = types
	.model('Match', {
		id: types.identifier,
		player: Player,
		matchState: types.optional(
			types.enumeration(Object.values(MATCH_STATE)),
			MATCH_STATE.AWAITING_PLAYERS,
		),

		playersRequred: types.integer,
		matchStartsAt: types.Date,

		currentRound: types.maybe(Round),
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
		updatePlayers(playersRequred) {
			self.playersRequred = playersRequred;
		},
		startMatch(startsAt) {
			self.matchState = MATCH_STATE.STARTING;
			self.matchStartsAt = startsAt;
		},
		startRound(number) {
			self.matchState = MATCH_STATE.ACTIVE;
			self.currentRound = Round.create({ number });
		},
		selectAnswer(answer) {
			self.currentRound.setSelectedAnswer(answer);
			self.requestService.submitAnswer(self.id, self.player.id, answer.id);
		},
		setWon() {
			self.matchState = MATCH_STATE.WON;
		},
	}));

export default Match;
