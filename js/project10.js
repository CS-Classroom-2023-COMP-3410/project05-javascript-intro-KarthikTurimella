const targetTextElement = document.getElementById("target-text");
const inputTextElement = document.getElementById("input-text");
const resultsElement = document.getElementById("results");
const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
const difficultySelect = document.getElementById("difficulty");

let targetText = "";
let startTime;
let timerRunning = false;

const phrases = {
  easy: [
    "The quick brown fox",
    "Jumped over the lazy dog",
    "Typing is fun",
    "Hello world",
  ],
  medium: [
    "Practice makes perfect",
    "Keyboard trainers are helpful",
    "Improve your typing skills",
    "Accuracy is key to success",
  ],
  hard: [
    "JavaScript is awesome!",
    "Coding requires focus & patience",
    "Master the keyboard@2023",
    "Speed+Accuracy = Perfection",
  ],
};

// Generate random phrase
function getRandomPhrase(difficulty) {
  const options = phrases[difficulty];
  return options[Math.floor(Math.random() * options.length)];
}

// Start typing trainer
function startTrainer() {
  const difficulty = difficultySelect.value;
  targetText = getRandomPhrase(difficulty);
  targetTextElement.textContent = targetText;
  inputTextElement.value = "";
  resultsElement.textContent = "";
  restartButton.style.display = "none";
  inputTextElement.disabled = false;
  inputTextElement.focus();
  timerRunning = true;
  startTime = new Date();
}

// Highlight errors in real time
function highlightErrors() {
  const inputText = inputTextElement.value;
  let highlightedText = "";

  for (let i = 0; i < targetText.length; i++) {
    if (i < inputText.length) {
      if (targetText[i] === inputText[i]) {
        highlightedText += `<span class="correct">${targetText[i]}</span>`;
      } else {
        highlightedText += `<span class="error">${targetText[i]}</span>`;
      }
    } else {
      highlightedText += targetText[i];
    }
  }

  targetTextElement.innerHTML = highlightedText;

  if (inputText === targetText) {
    calculateResults();
  }
}

// Calculate results
function calculateResults() {
  if (!timerRunning) return;

  const inputText = inputTextElement.value;
  const timeElapsed = (new Date() - startTime) / 1000; // in seconds
  const wordsPerMinute = Math.round((inputText.split(" ").length / timeElapsed) * 60);
  const accuracy = calculateAccuracy(targetText, inputText);

  resultsElement.innerHTML = `
    <strong>Results:</strong><br>
    Time: ${timeElapsed.toFixed(2)} seconds<br>
    WPM: ${wordsPerMinute}<br>
    Accuracy: ${accuracy.toFixed(2)}%
  `;
  timerRunning = false;
  restartButton.style.display = "block";
  inputTextElement.disabled = true;
}

// Calculate accuracy
function calculateAccuracy(target, input) {
  let correctChars = 0;
  for (let i = 0; i < target.length; i++) {
    if (target[i] === input[i]) {
      correctChars++;
    }
  }
  return (correctChars / target.length) * 100;
}

// Event listeners
startButton.addEventListener("click", startTrainer);
restartButton.addEventListener("click", startTrainer);
inputTextElement.addEventListener("input", highlightErrors);
