import { types } from 'mobx-state-tree';
import he from 'he';

import Answer from './Answer';


const Round = types
	.model('Round', {
		number: types.integer,

		question: types.maybe(types.string),
		answers: types.maybe(types.array(Answer)),
		endsAt: types.maybe(types.Date),

		selectedAnswer: types.maybe(types.reference(Answer)),
		correctAnswer: types.maybe(types.reference(Answer)),
	})
	.actions(self => ({
		setQuestion(question, answersObject, endsAt) {
			self.question = he.decode(question);
			self.answers = Object.entries(answersObject)
				.map(([ id, text ]) => Answer.create({
					id,
					text: he.decode(text)
				}));
			self.endsAt = endsAt
		},
		selectAnswer(selectedAnswer) {
			self.selectedAnswer = selectedAnswer;
		},
		setResults(correctAnswer, resultsTally) {
			self.correctAnswer = correctAnswer;
			Object.entries(resultsTally)
				.forEach(([ tallyID, tally ]) =>
					self.answers.find(({ id }) => id === tallyID).setTally(tally));
		},
	}));

export default Round;
