import {
  ANSWERS_LIST_ID,
  NEXT_QUESTION_BUTTON_ID,
  SKIP_QUESTION_BUTTON_ID,
  USER_INTERFACE_ID,
  SCORE_TEXT_ID,
} from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { quizData } from '../data.js';
import { TIMER_ID } from '../constants.js';

let score = 0;
let timer = null;
let timeLeft = 0;
let timerStarted = false;

export const initQuestionPage = () => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  const questionElement = createQuestionElement(currentQuestion.text);
  userInterface.appendChild(questionElement);

  // Start or continue timer
  if (!timerStarted) {
    startTimer();
    timerStarted = true;
  } else {
    // If timer is already running, update the display
    updateTimerDisplay();
  }

  const answersListElement = document.getElementById(ANSWERS_LIST_ID);

  //Update Score Text
  const scoreElement = document.getElementById(SCORE_TEXT_ID);
  scoreElement.innerText = `${score}`;

  for (const [key, answerText] of Object.entries(currentQuestion.answers)) {
    const answerElement = createAnswerElement(key, answerText);
    answersListElement.appendChild(answerElement);
  }
  answersListElement.addEventListener('click', selectAnswer);

  //Update Question Number
  document.getElementById('question-number').innerText = `${quizData.currentQuestionIndex + 1
    }`;

  document
    .getElementById(NEXT_QUESTION_BUTTON_ID)
    .addEventListener('click', nextQuestion);

  document
    .getElementById(SKIP_QUESTION_BUTTON_ID)
    .addEventListener('click', skipQuestion);
};
const nextQuestion = () => {
  if (quizData.currentQuestionIndex + 1 < quizData.questions.length) {
    quizData.currentQuestionIndex++;

    initQuestionPage();
  } else {
    alert('No more qustions!');
  }
};

/*  
Highlights correct and/or wrong answer based on user interaction
Modifies quizData to indicate if the question is answered
*/
const selectAnswer = (e) => {
  const selectedAnswer = e.target;
  const correctAnswer = document.getElementById('correctAnswer');

  if (quizData.questions[quizData.currentQuestionIndex].selected === null) {
    quizData.questions[quizData.currentQuestionIndex].selected = true;

    if (selectedAnswer.id === 'correctAnswer') {
      selectedAnswer.style.backgroundColor = 'green';
      score++;
      document.getElementById(SCORE_TEXT_ID).innerText = `${score}`;
    } else {
      selectedAnswer.style.backgroundColor = 'red';
      correctAnswer.style.backgroundColor = 'green';
    }
  }
};

const skipQuestion = () => {
  quizData.currentQuestionIndex++;
  if (quizData.currentQuestionIndex >= quizData.questions.length) {
    alert('No more questions!');
    return;
  }
  initQuestionPage();
};

// Timer
const updateTimerDisplay = () => {
  const timerDisplay = document.getElementById(TIMER_ID);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const startTimer = () => {
  updateTimerDisplay();

  timer = setInterval(() => {
    if (timeLeft >= 1800) { // Stop at 30 minutes (1800 seconds)
      clearInterval(timer);
      alert('Time is up!');
    } else {
      timeLeft++; // Increment instead of decrement
      updateTimerDisplay();
    }
  }, 1000);
};


