import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

function AnswerChoice({ isSelected, isCorrect, isIncorrect, ...rest }) {
	return <StyledChoice
		isSelected={isSelected}
		isCorrect={isCorrect}
		isIncorrect={isIncorrect}
		{...rest }
	/>;
}

function LabeledRadio({ id, text, tally, isSelected, isCorrect, isIncorrect, select, disabled, ...rest }) {
	return <div {...rest}>
		<label htmlFor={id}>
			<input
				id={id}
				type="radio"
				name="answer"
				onClick={() => !disabled && select()}
				disabled={disabled}
			/>
			{`${text}${tally ? ` - ${tally}` : ''}`}
		</label>
	</div>;
}

const StyledChoice = styled(LabeledRadio)`
	${({ isSelected }) => isSelected && `color: gray;`}
	${({ isCorrect }) => isCorrect && `color: green;`}
	${({ isIncorrect, isSelected }) => isIncorrect && isSelected && `color: red;`}
`;

export default observer(AnswerChoice);
