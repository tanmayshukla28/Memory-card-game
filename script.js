const emojis = ['🍕', '🍕', '🎈', '🎈', '🐶', '🐶', '🚗', '🚗', '🌟', '🌟', '🍩', '🍩', '🎮', '🎮', '📚', '📚'];
let shuffledEmojis = [];
let flippedCards = [];
let matchedCount = 0;

const gameBoard = document.getElementById('gameBoard');
const statusText = document.getElementById('status');

function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

function createBoard() {
  shuffledEmojis = shuffle([...emojis]);
  shuffledEmojis.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.innerText = '';
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (flippedCards.length === 2 || this.classList.contains('flipped') || this.classList.contains('matched')) {
    return;
  }

  this.classList.add('flipped');
  this.innerText = this.dataset.emoji;
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.emoji === card2.dataset.emoji) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCount += 2;
    flippedCards = [];

    if (matchedCount === emojis.length) {
      statusText.innerText = '🎉 You matched all the emojis!';
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card1.innerText = '';
      card2.innerText = '';
      flippedCards = [];
    }, 1000);
  }
}

// Start the game
createBoard();
