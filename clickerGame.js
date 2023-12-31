const buttonStartGame = document.querySelector('.buttonStartGame');
const startScreen = document.querySelector('.startScreen');
const circlesContainer = document.querySelector('.circlesContainer');
const currentScoreBoard = document.querySelector('.currentScoreBoard');
const countBar = document.querySelector('.countBar');
const countText = document.querySelector('.countText');
const timeText = document.querySelector('.timeText');
const endScreen = document.querySelector('.endScreen');
const playAgainButton = document.querySelector('.playAgainButton');
const scoreNumber = document.querySelector('.scoreNumber');
const level2Button = document.querySelector('.level2Button');

let circlesLevel1;
let circlesLevel2;
let circleInterval;
let count = 0;
let countTime = 15;
let timerInterval;
let endScore;

currentScoreBoard.classList.add('hidden');
endScreen.classList.add('hidden');

buttonStartGame.addEventListener('click', () => {
  startScreen.classList.add('hidden');
  currentScoreBoard.classList.remove('hidden');
  createCirclesLevel1();
  startTimer();
});

function createCirclesLevel1() {
  if (countTime === 0) {
    clearInterval(timerInterval);
    count = 0;
    return;
  }
  clearInterval(circleInterval);
  circlesLevel1 = document.createElement('div');
  circlesLevel1.classList.add('circlesLevel1');
  circlesContainer.appendChild(circlesLevel1);
  circlesLevel1.style.backgroundColor = generateRandomColor();

  circlesLevel1.addEventListener('click', () => {
    countScore();
    circlesLevel1.remove();
    createCirclesLevel1();
  });

  setRandomCirclePosition(circlesLevel1);

  circleInterval = setInterval(() => {
    count--;
    circlesLevel1.remove();
    createCirclesLevel1();
    endScore = count;
  }, 2000);

  countText.textContent = count;
}

function createCirclesLevel2() {
  if (countTime === 0) {
    clearInterval(timerInterval);
    count = 0;
    return;
  }
  clearInterval(circleInterval);
  circlesLevel2 = document.createElement('div');
  circlesLevel2.classList.add('circlesLevel2');
  circlesContainer.appendChild(circlesLevel2);
  circlesLevel2.style.backgroundColor = generateRandomColor();

  circlesLevel2.addEventListener('click', () => {
    countScore();
    circlesLevel2.remove();
    createCirclesLevel2();
  });

  setRandomCirclePosition(circlesLevel2);

  circleInterval = setInterval(() => {
    count--;
    circlesLevel2.remove();
    createCirclesLevel2();
    endScore = count;
  }, 2000);

  countText.textContent = count;
}

level2Button.addEventListener('click', () => {
  clearInterval(circleInterval);
  endScreen.classList.add('hidden');
  resetGame(2);
  startTimer();
});

function resetGame(level) {
  count = 0;
  countTime = 15;
  timeText.textContent = countTime;
  countText.textContent = count;

  // if (circlesLevel1) {
  //   circlesLevel1.remove();
  // } else if (circlesLevel2) {
  //   circlesLevel2.remove();
  // }

  if (level === 1) {
    circlesLevel1.remove();
    createCirclesLevel1();
  } else if (level === 2) {
    circlesLevel2.remove(); //jak to jest to nie wyswietla circles
    createCirclesLevel2();
  }
}

function generateRandomColor() {
  let maxVal = 0xFFFFFF;
  let randomNumber = Math.floor(Math.random() * maxVal);
  let randomColor = '#' + randomNumber.toString(16).toUpperCase().padStart(6, '0');
  return randomColor;
}

function setRandomCirclePosition(circle) {
  const circleDimensions = circle.getBoundingClientRect();
  const randomTop = Math.floor(Math.random() * (window.innerHeight - circleDimensions.height));
  const randomLeft = Math.floor(Math.random() * (window.innerWidth - circleDimensions.width));

  circle.style.top = `${randomTop}px`;
  circle.style.left = `${randomLeft}px`;
}

function countScore() {
  countText.textContent = 'Count: ' + ++count;
  endScore = count;
}

function startTimer() {
  timerInterval = setInterval(() => {
    countTime--;
    timeText.textContent = countTime;

    if (countTime === 0) {
      clearInterval(timerInterval);
      count = 0;
      (circlesLevel1 || circlesLevel2)?.remove();  //Optional Chaining
      showEndScreen();
    }

  }, 1000);
}

function showEndScreen() {
  clearInterval(circleInterval);
  endScreen.classList.remove('hidden');
  scoreNumber.textContent = endScore;

  playAgainButton.addEventListener('click', () => {
    endScreen.classList.add('hidden');
    resetGame(1);
    startTimer();
  });
}
