const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [{
        question: 'What is 2 + 2?',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false }
        ]
    },
    {
        question: 'Who is the best YouTuber?',
        answers: [
            { text: 'Mr Densetsu', correct: true },
            { text: 'Pewdipie', correct: false },
            { text: 'Mr beast', correct: false },
            { text: 'Sidemen', correct: false }
        ]
    },
    {
        question: 'Is web development fun?',
        answers: [
            { text: 'Might Be', correct: false },
            { text: 'SURELY!!', correct: true },
            { text: 'NAH', correct: false },
            { text: "Don't ask it again", correct: false }
        ]
    },
    {
        question: 'Imagine you are in a boat and surrounded by sharks around the boat; how can you save yourself?',
        answers: [
            { text: 'Call the mother Shark', correct: false },
            { text: 'Wait for the Shark To Eat You', correct: false },
            { text: 'Stop Imagining', correct: true },
            { text: 'Search for Mr. Densetsu on Youtube', correct: false }

        ]
    },
    {
        question: 'If you divide 30 by half and add ten, what do you get?',
        answers: [
            { text: '25', correct: false },
            { text: '70', correct: true },
            { text: '33', correct: false },
            { text: '10', correct: false },

        ]
    },
    {
        question: 'Where is an ocean with no water?',
        answers: [
            { text: 'Rajasthan', correct: false },
            { text: 'sahara', correct: false },
            { text: 'On a Map', correct: true },
            { text: 'Area 51', correct: false },

        ]
    },
    {
        question: 'What two words, when combined, hold the most letters?',
        answers: [
            { text: 'Whats app', correct: false },
            { text: 'E Mail', correct: false },
            { text: 'G Mail', correct: false },
            { text: 'Post Office', correct: true },

        ]
    }
]