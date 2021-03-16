import React from 'react'
import { observer } from 'mobx-react'

import MenuButton from './MenuButton';
import CodeInput from './CodeInput';


function MainMenu({ viewModel }) {
	const {
		matchCode,

		shouldDisplayMenuOptions,
		shouldDisplayCreateMatch,

		displayMatchCreate,
		displayMatchJoin,
		returnToMainMenu,

		updateCode,
		submitCode,
	} = viewModel;

	return shouldDisplayMenuOptions
		? <>
			<p>Welcome to GS Trivia!</p>
			<MenuButton onClick={displayMatchCreate}>
				Create match
			</MenuButton>
			<MenuButton onClick={displayMatchJoin}>
				Join match
			</MenuButton>
		</>
		: <>
			<p>{
				shouldDisplayCreateMatch
					? 'Please enter a code other players can use to join'
					: 'Please enter the code shared by the match\'s creator'
			}</p>
			<CodeInput
				value={matchCode}
				onChange={e => updateCode(e.target.value)}
			/>
			<MenuButton onClick={submitCode}>
				Submit
			</MenuButton>
			<MenuButton onClick={returnToMainMenu}>
				Return to menu
			</MenuButton>
		</>;
}

export default observer(MainMenu);
