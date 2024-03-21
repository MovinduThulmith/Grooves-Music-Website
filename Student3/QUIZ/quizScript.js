// Define the quiz questions as an array of objects with questions and answers
// Each question object contains a question and an array of answer options
const questions = [
  { //Question 1
    question: "Which influential artist is often referred to as the 'King of Pop'?",
    answers: [
      { text: "Elvis Presley", correct: false },
      { text: "Bob Dylan", correct: false },
      { text: "Michael Jackson", correct: true },
      { text: "Stevie Wonder", correct: false },
    ],
  },
  { //Question 2
    question: "Which iconic rock band is known for hits like 'Stairway to Heaven' and 'Kashmir'?",
    answers: [
      { text: "Led Zeppelin", correct: true },
      { text: "The Rolling Stones", correct: false },
      { text: "The Beatles", correct: false },
      { text: "Pink Floyd", correct: false },
    ],
  },
  { //Question 3
    question: "Which jazz trumpeter is considered one of the most influential figures in the history of jazz music?",
    answers: [
      { text: "Miles Davis", correct: false },
      { text: "Louis Armstrong", correct: true },
      { text: "Dizzy Gillespie", correct: false },
      { text: "Wynton Marsalis", correct: false },
    ],
  },
  { //Question 4
    question: "Which R&B singer-songwriter released the critically acclaimed album 'Lemonade' in 2016?",
    answers: [
      { text: "Alicia Keys", correct: false },
      { text: "Rihanna", correct: false },
      { text: "Mary J. Blige", correct: false },
      { text: "Beyoncé", correct: true },
    ],
  },
  { //Question 5
    question: "Who is the lead vocalist of the band Coldplay?",
    answers: [
      { text: "Chris Martin", correct: true },
      { text: "Bono", correct: false },
      { text: "Thom Yorke", correct: false },
      { text: "Adam Levine", correct: false },
    ],
  },
  { //Question 6
    question: "Which pop sensation had a breakthrough hit with the song 'Baby' in 2010?",
    answers: [
      { text: "Justin Timberlake", correct: false },
      { text: "Justin Bieber", correct: true },
      { text: "Bruno Mars", correct: false },
      { text: "Ed Sheeran", correct: false },
    ],
  },
  { //Question 7
    question: "Which legendary guitarist is known for his iconic rendition of 'The Star-Spangled Banner' at Woodstock in 1969?",
    answers: [
      { text: "Eric Clapton", correct: false },
      { text: "Jimmy Page", correct: false },
      { text: "Keith Richards", correct: false },
      { text: "Jimi Hendrix", correct: true },
    ],
  },
  { //Question 8
    question: "Who released the album 'Thriller,' which became the best-selling album of all time?",
    answers: [
      { text: "Prince", correct: false },
      { text: "Madonna", correct: false },
      { text: "Michael Jackson", correct: true },
      { text: "David Bowie", correct: false },
    ],
  },
  { //Question 9
    question: "Which rock band is famous for their album 'Nevermind,' which popularized the grunge movement in the 1990s?",
    answers: [
      { text: "Nirvana", correct: true },
      { text: "Soundgarden", correct: false },
      { text: "Pearl Jam", correct: false },
      { text: "Alice in Chains", correct: false },
    ],
  },
  { //Question 10
    question: "Which British singer-songwriter is known for her soulful voice and hits like 'Rolling in the Deep' and 'Someone Like You'?",
    answers: [
      { text: "Taylor Swift", correct: false },
      { text: "Adele", correct: true },
      { text: "Katy Perry", correct: false },
      { text: "Sia", correct: false },
    ],
  },
];


// Get references to various HTML elements using querySelector  
const questionElement = document.querySelector(".questionBox");
const optionBox = document.querySelector(".optionBox");
const nextButton = document.querySelector(".nextButton");
const scoreNum = document.querySelector(".scoreNum");
const resultScreen = document.getElementById("resultScreen");
const totalQuestionElement = document.getElementById("totalQuestion");
const attemptQuestionElement = document.getElementById("attemptQuestion");
const correctAnswersElement = document.getElementById("correctAnswers");
const wrongAnswersElement = document.getElementById("wrongAnswers");
const gradeElement = document.getElementById("grade");
const commentSentence = document.getElementById("comment");
const timeTakenElement = document.getElementById("timeTaken");

let currentQuestionIndex = 0;
let score = 0;
let quizEnded = false;
let minutes = 0;
let seconds = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  quizEnded = false;
  showQuestion();
}

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  nextButton.style.display = "none"; // Hide the 'Next' button until an answer is selected

  optionBox.innerHTML = "";   // Clear the answer options container

  // Creating buttons for each answer option and attach event listeners to them
  currentQuestion.answers.forEach((answer, index) => {
    const answerElement = document.createElement("span");    //Inside the loop, a new span element is created for each answer option.
                                                            // This span element will represent the button for the answer option.
    answerElement.textContent = answer.text;
    answerElement.classList.add("btn");
    answerElement.addEventListener("click", () => {
      if (!quizEnded) {
        checkAnswer(answer.correct, answerElement);
      }
    });
    optionBox.appendChild(answerElement);
  });
}

function checkAnswer(correct, answerElement) {
  if (correct) {
    score++;
    scoreNum.textContent = score;
    answerElement.style.backgroundColor = "#4eca4e"; // Green background for correct answer
  } else {
    answerElement.style.backgroundColor = "#c74848"; // Red background for wrong answer
  }

  // Disable pointer events on all answer options to prevent multiple selections
  optionBox.querySelectorAll(".btn").forEach((button) => { //For each button element with the class "btn" found in the optionBox, the code inside the arrow function is executed.
    button.removeEventListener("click", checkAnswer);
    button.style.pointerEvents = "none";
  });

  nextButton.style.display = "block"; // Display the 'Next' button after an answer is selected
}

function showNextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    showQuestion();
    nextButton.style.display = "none";
  } else {
    endQuiz();
  }
}

// Timer Countdown
var countdown;

function startTimer(duration, display) {
  var timer = duration;
  minutes = parseInt(timer / 60, 10);
  seconds = parseInt(timer % 60, 10);

  countdown = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      clearInterval(countdown);
      endQuiz();
    }
  }, 1000);
}

function endQuiz() {
  quizEnded = true;
  clearInterval(countdown);

  // Show the result screen and hide the question screen
  const questionScreen = document.getElementById("questionScreen");
  const resultScreen = document.getElementById("resultScreen");

  questionScreen.style.display = "none";
  resultScreen.style.display = "block";

  totalQuestionElement.textContent = questions.length;
  correctAnswersElement.textContent = score;
  wrongAnswersElement.textContent = questions.length - score;


  const secondsTaken = 60 - seconds; // Calculate the seconds taken
  const totalSecondsTaken = secondsTaken; // Calculate the total seconds taken
  timeTakenElement.textContent = totalSecondsTaken + "s"; // Update the element with the formatted time

  const grade = ((score / questions.length) * 100).toFixed(2); // Calculate the grade and round to 2 decimal points

  gradeElement.textContent = grade + "%"; // Update the element with the formatted grade
  if (grade < 33.33) {
    commentSentence.style.color = "#F00"
    commentSentence.textContent = "Not enough. You need more knowledge on music."
  }
  else if (grade > 70) {
    commentSentence.style.color = "#4eca4e"
    commentSentence.textContent = "Excellent. Keep up the good work."
  }
  else {
    commentSentence.style.color = "#185e18"
    commentSentence.textContent = "Good work. You have some knwoledge about music."
  }
}

// Start the quiz when the window loads
window.onload = function () {
  var oneMinute = 60 * 1,
  display = document.querySelector("#timer");
  startTimer(oneMinute, display);
};

// Event listener for the next button to show the next question
nextButton.addEventListener("click", showNextQuestion);

startQuiz();

//Reference
//https://stackoverflow.com/questions/20618355/how-to-write-a-countdown-timer-in-javascript