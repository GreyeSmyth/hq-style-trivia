import { types, getEnv } from 'mobx-state-tree';

import MainMenu from '../view-models/MainMenu';
import Lobby from '../view-models/Lobby';
import AnswerChoices from '../view-models/AnswerChoices';


const ViewStore = types
	.model('ViewStore', {
		mainMenu: MainMenu,
		lobby: Lobby,
		answerChoices: AnswerChoices,
	})
	.views(self => ({
		get context() {
			return getEnv(self);
		},
		get modelStore() {
			return self.context.modelStore;
		},
	}))
	.actions(self => ({
	}));

function createViewStore(context) {
	return ViewStore.create({
		mainMenu: MainMenu.create({}, context),
		lobby: Lobby.create({}, context),
		answerChoices: AnswerChoices.create({}, context),
	}, context);
}

export default createViewStore;
