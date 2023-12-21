const buttonStartGame = document.querySelector('.buttonStartGame');
const startScreen = document.querySelector('.startScreen');
const circlesContainer = document.querySelector('.circlesContainer');
const currentScoreBoard = document.querySelector('.currentScoreBoard');
const countBar = document.querySelector('.countBar');
let circlesLevel1;
let circleInterval;
let count = 1;
let countScoreElement; // Nowy element do wyświetlania liczby

currentScoreBoard.classList.add('hidden');



buttonStartGame.addEventListener('click', () => {
  startScreen.classList.add('hidden');
  currentScoreBoard.classList.remove('hidden');
  createCirclesLevel1();
  
});

function createCirclesLevel1() {
  clearInterval(circleInterval);
  circlesLevel1 = document.createElement('div');
  circlesLevel1.classList.add('circlesLevel1');
  circlesContainer.appendChild(circlesLevel1);
  circlesLevel1.style.backgroundColor = generateRandomColor();

  // Po kliknięciu tworzy nowy circle
  circlesLevel1.addEventListener('click', () => {
    //circlesLevel1.classList.add('hidden');
    circlesLevel1.remove();
    createCirclesLevel1();
    countScore();
  });

  setRandomCirclePosition();

  circleInterval = setInterval(()=>{
    circlesLevel1.remove();  //odjac punkty gdy nie kliknie
    createCirclesLevel1();
    },1000)
}

function generateRandomColor() {
  let maxVal = 0xFFFFFF;
  let randomNumber = Math.floor(Math.random() * maxVal);
  let randomColor = '#' + randomNumber.toString(16).toUpperCase().padStart(6, '0');
  return randomColor;
}

function setRandomCirclePosition() {
  const circleDimensions = circlesLevel1.getBoundingClientRect();
  const randomTop = Math.floor(Math.random() * (window.innerHeight - circleDimensions.height));
  const randomLeft = Math.floor(Math.random() * (window.innerWidth - circleDimensions.width));

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
