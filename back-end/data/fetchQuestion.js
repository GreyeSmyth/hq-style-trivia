async function fetchQuestion(difficulty) {

	// Fetch question from trivia database
    await Promise.resolve();

	return {
        question: "Why did Constantinople get the works?",
        correct_answer: "That's nobody's business but the Turks",
        incorrect_answers: [
            "Even old New York was once New Amsterdam",
            "Why they changed it, I can't say",
            "People just liked it better that way",
        ],
    }
}