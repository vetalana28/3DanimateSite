const quizData = [
    {
        question: "Какой ваш любимый цвет?",
        options: [
            "Желтый", "Фиолетовый", "Розовый", "ВСЕ!"
        ],
        twilghtAnswer: "Фиолетовый",
        rarityAnswer: "Фиолетовый",
        appleAnswer: "Желтый",
        pinkyAnswer: "Розовый",
        flatterAnswer: "Розовый",
        rainbowAnswer: "ВСЕ!"

    },
    {
        question: "Вы бы переспали с 40-летним незнакомцем или знакомым?",
        options: [
            "С незнакомцем 40 лет", "Со знакомым 40 лет", "ВСЕ!"
        ],
        twilghtAnswer: "С незнакомцем 40 лет",
        rarityAnswer: "Со знакомым 40 лет",
        appleAnswer: "С незнакомцем 40 лет",
        pinkyAnswer: "ВСЕ!",
        flatterAnswer: "Со знакомым 40 лет",
        rainbowAnswer: "ВСЕ!"
    },
    {
        question: "Какая у вас мечта?",
        options: [
            "Не сдохнуть на заводе", "Не сдохнуть на учебе", "Сдохнуть"
        ],
        twilghtAnswer: "Не сдохнуть на учебе",
        rarityAnswer: "Не сдохнуть на заводе",
        appleAnswer: "Не сдохнуть на заводе",
        pinkyAnswer: "Сдохнуть",
        flatterAnswer: "Сдохнуть",
        rainbowAnswer: "Не сдохнуть на заводе"
    }
];
// это массив [] из объектов {}

const quizContainer = document.getElementById('quiz');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('nextBtn');
const resultsElement = document.getElementById('results');

let currentQuestionIndex = 0;

let twilghtScore = 0;
let rarityScore = 0;
let appleScore = 0;
let pinkyScore = 0;
let flatterScore = 0;
let rainbowScore = 0;

function loadQuesstion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";
    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener('click', selectOption);
        optionsElement.appendChild(button);
    });
}

function selectOption(event) {

    const clickedButton = event.target;
    const selectedOption = clickedButton.textContent;
    // элемент на который тыкнул пользователь


    const twilghtAnswer = quizData[currentQuestionIndex].twilghtAnswer;
    const rarityAnswer = quizData[currentQuestionIndex].rarityAnswer;
    const appleAnswer = quizData[currentQuestionIndex].appleAnswer;
    const pinkyAnswer = quizData[currentQuestionIndex].pinkyAnswer;
    const flatterAnswer = quizData[currentQuestionIndex].flatterAnswer;
    const rainbowAnswer = quizData[currentQuestionIndex].rainbowAnswer;

        // 1. Снимаем подсветку со всех кнопок
    optionsElement.querySelectorAll('button').forEach(btn => {
        btn.classList.remove('active');
    });

    // 2. Подсвечиваем только нажатую
    clickedButton.classList.add('active');

    if (selectedOption === twilghtAnswer) {
        twilghtScore++;
    }
    else if (selectedOption === rarityAnswer) {
        rarityScore++;
    }
    else if (selectedOption === appleAnswer) {
        appleScore++;
    }
    else if (selectedOption === pinkyAnswer) {
        pinkyScore++;
    }
    else if (selectedOption === flatterAnswer) {
        flatterScore++;
    }
    else if (selectedOption === rainbowAnswer) {
        rainbowScore++;
    }
    optionsElement.querySelectorAll('buttons'.forEach(button =>
    {
        button.removeEventListener('click', selectOption);
        
    }
    ))
}

function nextQuestion()
{
    currentQuestionIndex++;
    if(currentQuestionIndex < quizData.length)
    {
        loadQuesstion();
    }
    else
    {
        showResults();
    }
}

function showResults()
{
    resultsElement.textContent = "Вы - Искорка на " + twilghtScore + ", Рарити на " + rarityScore + ", Эпджек на " + appleScore + ", Пикми на " + pinkyScore + ", Флтршай на " + flatterScore + ", Радужный на " + rainbowScore;
}

nextButton.addEventListener('click', nextQuestion);
loadQuesstion();