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
		get shouldDisplayRoundIntro() {
			return !self.question;
		},
		get roundNumber() {
			return self.round.number;
		},
		get countdownValue() {
			return self.round.endsAt && toSecondsCountdown(self.round.endsAt);
		},
		get areAnswersActive() {
			return self.countdownValue && self.countdownValue > 0;
		},
		get question() {
			return self.round.question;
		},
		get answerOptions() {
			const { answers, selectedAnswer, correctAnswer } = self.round;
			return answers
				? answers.map(answer => ({
					id: answer.id,
					text: answer.text,
					tally: answer.tally,
					isSelected: !!selectedAnswer && answer === selectedAnswer,
					isCorrect: !!correctAnswer && answer === correctAnswer,
					isIncorrect: !!correctAnswer && answer !== correctAnswer,
					select: () => self.match.selectAnswer(answer),
				}))
				: [];
		},
		get hasAnsweredQuestion() {
			return !!self.round.selectedAnswer;
		},
		get hasLostMatch() {
			return !!self.round.correctAnswer
				&& self.round.correctAnswer !== self.round.selectedAnswer;
		},
		get hasWonMatch() {
			return self.match.matchState === MATCH_STATE.WON;
		},
		get shouldAllowReturnToMenu() {
			return self.hasLostMatch || self.hasWonMatch;
		},
	}))
	.actions(self => ({
		returnToMainMenu() {
			self.modelStore.leaveMatch();
		},
	}));

export default AnswerChoices;
