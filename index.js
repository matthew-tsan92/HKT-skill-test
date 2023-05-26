const questions = [
    {
        ID: 1,
        question: '[JavaScript] How do you write "Hello World" in an alert box?',
        choices: 
        [{ans:'msgBox("Hello World");', correctAns: false}, 
        {ans:'msg("Hello World");', correctAns: false},
        {ans:'alert("Hello World");', correctAns: true},
        {ans:'alertBox("Hello World");', correctAns: false}]
    },
    {
        ID: 2,
        question: 'Is JavaScript case-sensitive?',
        choices: 
        [{ans:'True', correctAns: true}, 
        {ans:'False', correctAns: false},]
    },
    {
        ID: 3,
        question: 'Which HTML attribute is used to define inline styles?',
        choices: 
        [{ans:'font', correctAns: false}, 
        {ans:'Class', correctAns: false},
        {ans:'style', correctAns: true},
        {ans:'None of the above', correctAns: false}]
    },
    {
        ID: 4,
        question: 'Inside which HTML element do we put the JavaScript?',
        choices: 
        [{ans:'scripting', correctAns: false}, 
        {ans:'javascript', correctAns: false},
        {ans:'js', correctAns: false},
        {ans:'None of the above', correctAns: true}]
    },
    {
        ID: 5,
        question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
        choices: 
        [{ans:'script href="xxx.js"', correctAns: false}, 
        {ans:'script src="xxx.js"', correctAns: true},
        {ans:'script name="xxx.js"', correctAns: false},]
    },
    {
        ID: 6,
        question: 'How to write an IF statement in JavaScript',
        choices: 
        [{ans:'if (i == 5)', correctAns: true}, 
        {ans:'if i = 5', correctAns: false},
        {ans:'if i = 5 then', correctAns: false},
        {ans:'if i == 5 then', correctAns: false}]
    },
    {
        ID: 7,
        question: 'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
        choices: 
        [{ans:'if (i <> 5)', correctAns: false}, 
        {ans:'if (i != 5)', correctAns: true},
        {ans:'if i <> 5', correctAns: false},
        {ans:'if i =! 5 then', correctAns: false}]
    },
    {
        ID: 8,
        question: 'How does a FOR loop start?',
        choices: 
        [{ans:'for i = 1 to 5', correctAns: false}, 
        {ans:'for (i = 0; i <= 5; i++)', correctAns: true},
        {ans:'for (i <= 5; i++)', correctAns: false},
        {ans:'for (i = 0; i <= 5)', correctAns: false}]
    },
    ]

const questionEl = document.querySelector('#question')
const answerEl = document.querySelector('#answerList')
const nextQEl = document.querySelector('#nextQBtn')
const timeEl = document.querySelector("#timer")
const finalEl = document.querySelector("#final")

let currentIndex = 0
let score = 0

function shuffleArray(array) {
    const shuffledChoices = array.sort(() => Math.random() - 0.5)
    return shuffledChoices
    }

let timer = setInterval(countTimer, 1000);
let totalSeconds = 0;

function countTimer() {
    ++totalSeconds;
    let hour = Math.floor(totalSeconds / 3600);
    let minute = Math.floor((totalSeconds - hour*3600) / 60);
    let seconds = totalSeconds - (hour*3600 + minute*60);
    if(hour < 10)
        hour = '0' + hour;
    if(minute < 10)
        minute = '0' + minute;
    if(seconds < 10)
        seconds = '0' + seconds;
    timeEl.innerHTML = 'Time used: ' + hour + ":" + minute + ":" + seconds;
}
    

function start() {
    totalSeconds = 0
    currentIndex = 0
    score = 0
    displayQuestions()
    nextQEl.innerHTML = 'Next Question'
    timeEl.style.display = 'block'
}

function displayQuestions() {
    removePrevAns()
    let currentQuestion = questions[currentIndex]
    let currentQuestionNo = currentIndex + 1
    questionEl.innerHTML = currentQuestionNo + ') '+ currentQuestion.question
    if (currentIndex == 2 || currentIndex == 3) {
        currentQuestion.choices.forEach((choice) => {
            const choiceBtn = document.createElement('button')
            choiceBtn.innerHTML = choice.ans
            choiceBtn.classList.add('ansBtn')
            answerEl.appendChild(choiceBtn)
            if (choice.correctAns) {
                choiceBtn.dataset.isCorrect = choice.correctAns
            }
            choiceBtn.addEventListener('click', selectAns)
        })
    }
    else if (!(currentIndex == 2 || currentIndex == 3)) {
        shuffledArray = shuffleArray(currentQuestion.choices)
        shuffledArray.forEach((choice) => {
            const choiceBtn = document.createElement('button')
            choiceBtn.innerHTML = choice.ans
            choiceBtn.classList.add('ansBtn')
            answerEl.appendChild(choiceBtn)
            if (choice.correctAns) {
                choiceBtn.dataset.isCorrect = choice.correctAns
            }
            choiceBtn.addEventListener('click', selectAns)
        })
    }
}

function removePrevAns() {
    while (answerEl.firstChild) {
        answerEl.removeChild(answerEl.firstChild)
    }
}

function selectAns(e) {
    const selectedAns = e.target
    if (selectedAns.dataset.isCorrect) {
        selectedAns.classList.add('isCorrect')
        selectAns.disabled = true
        score++
    } else {
        selectedAns.classList.add('isWrong')
    }
    Array.from(answerEl.children).forEach((choiceBtn) => {
        if (choiceBtn.dataset.isCorrect) {
            choiceBtn.classList.add('isCorrect')
        }
        choiceBtn.disabled = true
    })
    nextQEl.style.display = 'block'
}

function showNextQuestion() {
    currentIndex++
    if (currentIndex < questions.length) {
        displayQuestions()
        console.log('Next?')
    } else {
        scorePage()
    }
}

nextQEl.addEventListener('click', () => {
    if (currentIndex < questions.length) {
        console.log(currentIndex, questions.length)
        showNextQuestion()
    } else {
        start()
    }
})

function scorePage() {
    removePrevAns()
    const accuracy = score/questions.length * 100
    const used_Time = timeEl.innerHTML
    clearInterval(timer)
    const submitted_DateTime = new Date()
    questionEl.innerHTML = `You have ${score} question out of ${questions.length} question correct, accuracy = ${accuracy}%`
    nextQEl.innerHTML = 'AGAIN?'
    const sqlText = document.createElement('h3')
    sqlText.innerHTML = `SQL create table statement: CREATE TABLE demo_table (ID INT NOT NULL AUTO_INCREMENT, ${used_Time} TIME NOT NULL, ${accuracy} DECIMAL(3,2) NOT NULL, \n${submitted_DateTime} DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY ("ID")`
    finalEl.appendChild(sqlText)
}

start()