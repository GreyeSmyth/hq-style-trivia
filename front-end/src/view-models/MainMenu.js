import { types, getEnv } from 'mobx-state-tree';


const MainMenu = types
	.model('MainMenu', {
		isMenuActive: true,
		isCreatingMatch: false,
	})
	.views(self => ({
		get context() {
			return getEnv(self);
		},
		get modelStore() {
			return self.context.modelStore;
		},
		get shouldDisplayMainMenu() {
			return self.isMenuActive;
		},
		get shouldDisplayCodeEntry() {
			return !self.isMenuActive;
		},
		get shouldCreateMatch() {
			return self.isCreatingMatch;
		},
		get shouldJoinMatch() {
			return !self.isCreatingMatch;
		}
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
		submitCode(matchCode) {
			if (self.isCreatingMatch) {
				self.modelStore.createMatch(matchCode);
			} else {
				self.modelStore.joinMatch(matchCode);
			}
			self.isMenuActive = true;
		},
	}));

export default MainMenu;
