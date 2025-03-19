const wordElement = document.getElementById('word');
const wrongLetteresContainerElement = document.getElementById(
  'wrong-letters-container'
);
const wrongLettersList = document.getElementById('wrong-letters-list');
const playAgainButton = document.getElementById('play-again-btn');
const finishScreen = document.getElementById('finish-screen-container');
const finalMessage = document.getElementById('final-message');
const notification = document.getElementById('notification-container');

const stickmanParts = document.querySelectorAll('.stickman-part');

const correctLetters = new Set();
const wrongLetters = new Set();
let word;

let notificationTimeout;

const words = ['cow', 'user'];

function getRandomWord() {
  fetch('https://random-word-api.herokuapp.com/word')
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      word = data[0];
      displayWord();
    })
    .catch(() => {
      word = STORED_WORDS[Math.floor(Math.random() * STORED_WORDS.length)];
      displayWord();
    });
}

function displayWord() {
  wordElement.innerHTML = `
  ${word
    .split('')
    .map(
      (letter) => `
    <span class="letter">${correctLetters.has(letter) ? letter : ''}</span>
    `
    )
    .join('')}
  `;

  const innerWord = wordElement.innerText.replace(/\n/g, '');

  if (innerWord.toLowerCase() === word) {
    finalMessage.innerText = 'You won!';
    finishScreen.style.display = 'flex';
  }
}

function showNotification() {
  clearTimeout(notificationTimeout);
  notification.classList.add('show');

  notificationTimeout = setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

function updateWrongLetters() {
  if (wrongLetters.size <= 0) return;

  wrongLetteresContainerElement.classList.add('show');
  wrongLettersList.innerHTML = `${Array.from(wrongLetters).map(
    (letter) => `<li>${letter}</;>`
  )}`;

  stickmanParts.forEach((part, index) => {
    const errors = wrongLetters.size;

    if (index < errors) {
      part.style.visibility = 'visible';
    } else {
      part.style.visibility = 'hidden';
    }
  });

  if (wrongLetters.size >= stickmanParts.length) {
    finalMessage.innerText = `You lost. The word was: ${word}`;
    finishScreen.style.display = 'flex';
  }
}

function playAgain() {
  correctLetters.clear();
  wrongLetters.clear();

  wrongLetteresContainerElement.classList.remove('show');
  wrongLettersList.innerHTML = '';

  displayWord();

  stickmanParts.forEach((part) => {
    part.style.visibility = 'hidden';
  });

  finishScreen.style.display = 'none';
  getRandomWord();
}

window.addEventListener('keydown', (e) => {
  if (e.key < 'a' || e.key > 'z') return;

  const letter = e.key;

  if (word.includes(letter)) {
    if (!correctLetters.has(letter)) {
      correctLetters.add(letter);
      displayWord();
    } else {
      showNotification();
    }
  } else {
    if (!wrongLetters.has(letter)) {
      wrongLetters.add(letter);
      updateWrongLetters();
    } else {
      showNotification();
    }
  }
});

playAgainButton.addEventListener('click', playAgain);

getRandomWord();
