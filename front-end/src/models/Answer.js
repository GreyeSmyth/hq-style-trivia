import { types } from 'mobx-state-tree';

const Answer = types
	.model('Answer', {
		id: types.identifier,

		text: types.string,
		tally: types.maybe(types.integer),
	})
	.actions(self => ({
		setTally(tally) {
			self.tally = tally;
		},
	}));

export default Answer;
