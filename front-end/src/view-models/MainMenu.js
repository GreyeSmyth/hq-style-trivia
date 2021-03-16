import { types, getEnv } from 'mobx-state-tree';


const MainMenu = types
	.model('MainMenu', {
		isMenuActive: true,
		isCreatingMatch: false,

		matchCode: '',
	})
	.views(self => ({
		get context() {
			return getEnv(self);
		},
		get modelStore() {
			return self.context.modelStore;
		},
		get shouldDisplayMenuOptions() {
			return self.isMenuActive;
		},
		get shouldDisplayCreateMatch() {
			return self.isCreatingMatch;
		},
	}))
	.actions(self => ({
		displayMatchCreate() {
			self.isMenuActive = false;
			self.isCreatingMatch = true;
		},
		displayMatchJoin() {
			self.isMenuActive = false;
			self.isCreatingMatch = false;
		},
		returnToMainMenu() {
			self.isMenuActive = true;
		},
		updateCode(matchCode) {
			self.matchCode = matchCode;
		},
		submitCode() {
			if (self.isCreatingMatch) {
				self.modelStore.createMatch(self.matchCode);
			} else {
				self.modelStore.joinMatch(self.matchCode);
			}
			self.matchCode = '';
			self.isMenuActive = true;
		},
	}));

export default MainMenu;
