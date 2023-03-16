var startButton
var quizScreen

let duration = 60;
const countdown = document.getElementById('time');

let timer = setInterval(() => {
    countdown.textContent = duration;
    duration--;

    // Check if the timer has expired
    if (duration === 0) {
        clearInterval(timer);
        countdown.innerHTML = "Time's up!";
    }
}, 1000);

const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('#choices'))

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "Commonly used data types DO NOT include:",
        choice1: "strings",
        choice2: "booleans",
        choice3: "alerts",
        choice4: "numbers",
        answer: 3,
    }, {
        question: "The condition in an if/else statement is enclosed witihin _____",
        choice1: "quotes",
        choice2: "curly brackets",
        choice3: "parentheses",
        choice4: "square brackets",
        answer: 2,
    }, {
        question: "Arrays in JavaScript can be used to store _____",
        choice1: "numbers and strings",
        choice2: "other arrays",
        choice3: "booleans",
        choice4: "all of the above",
        answer: 4,
    }, {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        choice1: "quotes",
        choice2: "curly brackets",
        choice3: "commas",
        choice4: "parentheses",
        answer: 1,
    }, {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choice1: "JavaScript",
        choice2: "terminal/bash",
        choice3: "for loops",
        choice4: "console.log",
        answer: 4,
    }
]
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('/end.html')
    }

    questionCounter++

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]

    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListner('click', e => {
        if (!acceptingAnswers) return
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINT)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })

})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()