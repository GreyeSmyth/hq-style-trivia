import React from 'react';
import { observer } from 'mobx-react';

import AnswerChoice from './AnswerChoice';
import MenuButton from './MenuButton';


function AnswerChoices({ viewModel }) {
	const {
		shouldDisplayRoundIntro,
		roundNumber,

		areAnswersActive,
		question,
		answerOptions,
		countdownValue,

		hasAnsweredQuestion,
		hasLostMatch,
		hasWonMatch,

		shouldAllowReturnToMenu,
		returnToMainMenu,
	} = viewModel;

	let headerText;
	if (areAnswersActive) {
		headerText = `${countdownValue} seconds remaining to answer...`;
	} else if (hasWonMatch) {
		headerText = `Congratulations, you are the winner after ${roundNumber} rounds!`;
	} else if (!hasLostMatch) {
		headerText = 'You picked the correct answer!';
	} else if (hasAnsweredQuestion) {
		headerText = `Sorry, you picked a wrong answer. You were eliminated after ${roundNumber} rounds.`;
	} else {
		headerText = `Sorry, you didn't answer in time. You were eliminated after ${roundNumber} rounds.`;
	}

	return shouldDisplayRoundIntro
		? <p>{`Get ready for round ${roundNumber}!`}</p>
		: <>
			<p>{headerText}</p>
			<p>{question}</p>
			{
				answerOptions.map(answer =>
					<AnswerChoice
						key={answer.id}
						disabled={!areAnswersActive}
						{...answer}
					/>
				)
			}
			{
				shouldAllowReturnToMenu
					? <MenuButton onClick={returnToMainMenu}>
						Return to menu
					</MenuButton>
					: ''
			}
		</>
}



export default observer(AnswerChoices);
