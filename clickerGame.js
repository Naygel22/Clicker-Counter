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

let circlesLevel1;
let circleInterval;
let count = 0;
let countTime = 15;
let timerInterval;
let endScore;
//let countScoreElement; // Nowy element do wyświetlania liczby

currentScoreBoard.classList.add('hidden');
endScreen.classList.add('hidden');


buttonStartGame.addEventListener('click', () => {
  startScreen.classList.add('hidden');
  currentScoreBoard.classList.remove('hidden');
  createCirclesLevel1();
  startTimer();
});

function createCirclesLevel1() {
  if(countTime === 0){
    clearInterval(timerInterval);
      count = 0;
    return;
  }
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
    count--;
    countText.textContent = count;
    circlesLevel1.remove();  //odjac punkty gdy nie kliknie
    createCirclesLevel1();
    },2000)
}

function generateRandomColor() {
  let maxVal = 0xFFFFFF;
  let randomNumber = Math.floor(Math.random() * maxVal);
  let randomColor = '#' + randomNumber.toString(16).toUpperCase().padStart(6, '0');
  return randomColor;
}

function setRandomCirclePosition() {
  const circleDimensions = circlesLevel1.getBoundingClientRect(); //przypisywanie właściwości circle, czyli jego height, width itd.
  const randomTop = Math.floor(Math.random() * (window.innerHeight - circleDimensions.height));
  const randomLeft = Math.floor(Math.random() * (window.innerWidth - circleDimensions.width));

  // Apply the random position to the circlesLevel1
  circlesLevel1.style.top = `${randomTop}px`;
  circlesLevel1.style.left = `${randomLeft}px`;
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

    if(countTime === 0){
      clearInterval(timerInterval);
      count = 0;
      circlesLevel1.remove();
      showEndScreen();
      //resetGame();
    }

  }, 1000);
  
}
function resetGame() {
    count = 0;
    countTime = 15;
    timeText.textContent = countTime;
    circlesLevel1.remove();
    createCirclesLevel1();
    startTimer();
    return;
}

function showEndScreen() {
  endScreen.classList.remove('hidden');
  scoreNumber.textContent = endScore;

  playAgainButton.addEventListener('click', () => {
    endScreen.classList.add('hidden');
    //currentScoreBoard.classList.add('hidden');
    resetGame();
  })
}
//getBoundingClientRect()
//setInterval()
//clearInterval()

//media queries do tamtego html i css