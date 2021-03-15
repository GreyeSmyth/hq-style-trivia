import { types, getEnv } from 'mobx-state-tree';

import MATCH_STATE from '../definitions/enums/matchState';

import toSecondsCountdown from '../functions/toSecondsCountdown';


const AnswerChoices = types
	.model('AnswerChoices')
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
		get round() {
			return self.match.round;
		},
		get answerOptions() {
			const { answers, selectedAnswer, correctAnswer } = self.round;
			return answers.map(answer => ({
				id: answer.id,
				text: answer.text,
				tally: answer.tally,
				isSelected: answer === selectedAnswer,
				isCorrect: answer === correctAnswer,
				select: () => self.match.selectAnswer(answer),
			}));
		},
		get areAnswersActive() {
			return self.endsAt && self.endsAt.getTime() > Date.now();
		},
		get shouldDisplayCountdown() {
			return self.areAnswersActive;
		},
		get countdownValue() {
			return self.shouldDisplayCountdown
				&& toSecondsCountdown(self.endsAt);
		},
		get shouldDisplayResults() {
			return !self.areAnswersActive;
		},
		get shouldDisplayAnswerCorrect() {
			return self.round.correctAnswer
				&& self.round.correctAnswer === self.round.selectedAnswer;
		},
		get shouldDisplayAnswerIncorrect() {
			return self.round.correctAnswer
				&& self.round.correctAnswer !== self.round.selectedAnswer;
		},
		get shouldDisplayWonMatch() {
			return self.match.matchState === MATCH_STATE.WON;
		},
		get shouldAllowReturnToMenu() {
			return self.shouldDisplayWonMatch || self.shouldDisplayAnswerIncorrect;
		},
	}))
	.actions(self => ({
		returnToMainMenu() {
			self.modelStore.leaveMatch();
		},
	}));

export default AnswerChoices;
