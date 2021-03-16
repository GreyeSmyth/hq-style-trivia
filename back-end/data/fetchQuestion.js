const fetch = require('node-fetch');
const he = require('he');

const config = require('../config');


async function fetchQuestion() {
    let questionObject = config.fallbackQuestion;

    const response = await fetch(config.questionApiURL);
    try {
        responseBody = await response.json();
        const {
            question,
            correct_answer,
            incorrect_answers,
        } = responseBody.results[0];

        questionObject = {
            question: he.decode(question),
            correctAnswer: he.decode(correct_answer),
            incorrectAnswers: incorrect_answers.map(ans => he.decode(ans)),
        }
    } catch(e) {
		console.error('Error fetching question', e);
    }

	return questionObject;
}

module.exports = fetchQuestion;
