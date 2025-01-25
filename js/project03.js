const gameBoard = document.getElementById('game-board');
const restartButton = document.getElementById('restart');
const movesElement = document.getElementById('moves');
const timeElement = document.getElementById('time');

const icons = ['🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍒', '🍒', '🍍', '🍍', '🍓', '🍓'];
let shuffledIcons = [];
let firstCard = null;
let secondCard = null;
let moves = 0;
let timer = null;
let timeElapsed = 0;
let matchedPairs = 0;

// Shuffle the icons array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Create the game board
function createBoard() {
  gameBoard.innerHTML = '';
  shuffledIcons = shuffle([...icons]);
  shuffledIcons.forEach((icon, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.icon = icon;
    card.dataset.index = index;
    card.innerHTML = `<div class="front"></div><div class="back">${icon}</div>`;
    card.addEventListener('click', handleCardClick);
    gameBoard.appendChild(card);
  });
}

// Handle card click
function handleCardClick(e) {
  const card = e.currentTarget;
  if (card.classList.contains('matched') || card.classList.contains('flipped') || secondCard) {
    return; // Prevent matching already flipped or matched cards
  }

  card.classList.add('flipped');

  if (!firstCard) {
    firstCard = card;
  } else {
    secondCard = card;
    moves++;
    movesElement.textContent = moves;

    if (firstCard.dataset.icon === secondCard.dataset.icon) {
      // Cards match
      firstCard.classList.add('matched');
      secondCard.classList.add('matched');
      firstCard = null;
      secondCard = null;
      matchedPairs++;
      if (matchedPairs === icons.length / 2) {
        clearInterval(timer);
        alert(`Congratulations! You completed the game in ${timeElapsed} seconds and ${moves} moves!`);
      }
    } else {
      // Cards don't match
      setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard = null;
        secondCard = null;
      }, 1000);
    }
  }
}

// Restart the game
function restartGame() {
  moves = 0;
  timeElapsed = 0;
  matchedPairs = 0;
  movesElement.textContent = moves;
  timeElement.textContent = timeElapsed;
  firstCard = null;
  secondCard = null;
  clearInterval(timer);
  startTimer();
  createBoard();
}

// Timer function
function startTimer() {
  timer = setInterval(() => {
    timeElapsed++;
    timeElement.textContent = timeElapsed;
  }, 1000);
}

// Initialize the game
restartButton.addEventListener('click', restartGame);
restartGame();
