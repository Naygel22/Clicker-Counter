const buttonStartGame = document.querySelector('.buttonStartGame');
const startScreen = document.querySelector('.startScreen');
const circlesContainer = document.querySelector('.circlesContainer');
const currentScoreBoard = document.querySelector('.currentScoreBoard');
let circlesLevel1;

currentScoreBoard.classList.add('hidden');

buttonStartGame.addEventListener('click', () => {
  startScreen.classList.add('hidden');
  currentScoreBoard.classList.remove('hidden');
  createCirclesLevel1();
})

function createCirclesLevel1(){
  circlesLevel1 = document.createElement('div');
  circlesLevel1.classList.add('circlesLevel1');
  circlesContainer.appendChild(circlesLevel1);
  circlesLevel1.style.backgroundColor = generateRandomColor();
  
  //po kliknieciu tworzy nowy circle
  circlesLevel1.addEventListener('click', () => {
    circlesLevel1.classList.add('hidden');
    createCirclesLevel1();
  })
  setRandomCirclePosition();
}

function generateRandomColor(){
  let maxVal = 0xFFFFFF; 
  let randomNumber = Math.floor(Math.random() * maxVal);
  let randomColor = '#' + randomNumber.toString(16).toUpperCase().padStart(6, '0');
  return randomColor;
}

function setRandomCirclePosition() {
  const randomTop = Math.floor(Math.random() * document.innerHeight);
  const randomLeft = Math.floor(Math.random() * document.innerWidth);

    // Apply the random position to the startScreen
    circlesLevel1.style.top = `${randomTop}px`;
    circlesLevel1.style.left = `${randomLeft}px`;
}