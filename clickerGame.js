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
const level3Button = document.querySelector('.level3Button');

let circlesLevel1;
let circlesLevel2;
let circlesLevel3;
let circleInterval;
let count = 0;
let countTime = 15;
let timerInterval;
let endScore;

currentScoreBoard.classList.add('hidden');
endScreen.classList.add('hidden');
level3Button.classList.add('hidden');

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
    level2Button.classList.add('hidden');
    level3Button.classList.remove('hidden');
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
  currentScoreBoard.classList.remove('hidden');
  resetGame(2);
  startTimer();
});

function createCirclesLevel3() {
  if (countTime === 0) {
    clearInterval(timerInterval);
    count = 0;
    level3Button.classList.add('hidden');
    return;
  }
  clearInterval(circleInterval);
  circlesLevel3 = document.createElement('div');
  circlesLevel3.classList.add('circlesLevel3');
  circlesContainer.appendChild(circlesLevel3);
  circlesLevel3.style.backgroundColor = generateRandomColor();

  circlesLevel3.addEventListener('click', () => {
    countScore();
    circlesLevel3.remove();
    createCirclesLevel3();
  });

  setRandomCirclePosition(circlesLevel3);

  circleInterval = setInterval(() => {
    count--;
    circlesLevel3.remove();
    createCirclesLevel3();
    endScore = count;
  }, 1000);

  countText.textContent = count;
}

level3Button.addEventListener('click', () => {
  clearInterval(circleInterval);
  endScreen.classList.add('hidden');
  currentScoreBoard.classList.remove('hidden');
  resetGame(3);
  startTimer();
});



function resetGame(level) {
  count = 0;
  countTime = 15;
  timeText.textContent = countTime;
  countText.textContent = count;

  if (level === 1) {
    createCirclesLevel1();
  } if (level === 2) {
    level2Button.classList.add('hidden');
    level3Button.classList.remove('hidden');
    createCirclesLevel2();
  } if (level === 3) {
    level3Button.classList.add('hidden'); 
    createCirclesLevel3();
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
  countText.textContent = count;
  count++;
  endScore = count;
}

function startTimer() {
  timerInterval = setInterval(() => {
    countTime--;
    timeText.textContent = countTime;

    if (countTime === 0) {
      clearInterval(timerInterval);
      count = 0;
      (circlesLevel1 || circlesLevel2 || circlesLevel3)?.remove();  //Optional Chaining
      showEndScreen();
    }

  }, 1000);
}

function showEndScreen() {
  clearInterval(circleInterval);
  endScreen.classList.remove('hidden');
  currentScoreBoard.classList.add('hidden');
  scoreNumber.textContent = endScore;
  circlesLevel2.remove();
  circlesLevel3.remove();
  

  playAgainButton.addEventListener('click', () => {
    endScreen.classList.add('hidden');
    currentScoreBoard.classList.remove('hidden');
    resetGame(1);
    startTimer();
  });
}
