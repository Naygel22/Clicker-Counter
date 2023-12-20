const buttonStartGame = document.querySelector('.buttonStartGame');
const startScreen = document.querySelector('.startScreen');
const circlesContainer = document.querySelector('.circlesContainer');
const currentScoreBoard = document.querySelector('.currentScoreBoard');
const countBar = document.querySelector('.countBar');
let circlesLevel1;
let count = 1;
let countScoreElement; // Nowy element do wyświetlania liczby

currentScoreBoard.classList.add('hidden');

buttonStartGame.addEventListener('click', () => {
  startScreen.classList.add('hidden');
  currentScoreBoard.classList.remove('hidden');
  createCirclesLevel1();
});

function createCirclesLevel1() {
  circlesLevel1 = document.createElement('div');
  circlesLevel1.classList.add('circlesLevel1');
  circlesContainer.appendChild(circlesLevel1);
  circlesLevel1.style.backgroundColor = generateRandomColor();

  // Po kliknięciu tworzy nowy circle
  circlesLevel1.addEventListener('click', () => {
    circlesLevel1.classList.add('hidden');
    createCirclesLevel1();
    countScore();
  });

  setRandomCirclePosition();
}

function generateRandomColor() {
  let maxVal = 0xFFFFFF;
  let randomNumber = Math.floor(Math.random() * maxVal);
  let randomColor = '#' + randomNumber.toString(16).toUpperCase().padStart(6, '0');
  return randomColor;
}

function setRandomCirclePosition() {
  const randomTop = Math.floor(Math.random() * window.innerHeight);
  const randomLeft = Math.floor(Math.random() * window.innerWidth);

  // Apply the random position to the circlesLevel1
  circlesLevel1.style.top = `${randomTop}px`;
  circlesLevel1.style.left = `${randomLeft}px`;
}

function countScore() {
  // Jeżeli element countScoreElement jeszcze nie istnieje, to go tworzymy
  if (!countScoreElement) {
    countScoreElement = document.createElement('p');
    countScoreElement.classList.add('countScore');
    countBar.appendChild(countScoreElement);
  }
  countScoreElement.textContent = count;
  count++;
}
