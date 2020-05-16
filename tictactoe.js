const xTurn = 'x';
const circlesTurn = 'circle';
let circleturn;
const grid = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessage = document.querySelector('[data-winning-message-text]');
const winningMessageElement = document.getElementById('winningmessage');
const restartButton = document.getElementById('restart');
const player1Indicator = document.getElementById('player1');
const player2Indicator = document.getElementById('player2');
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

startGame();
restartButton.addEventListener('click', startGame);

function startGame(params) {
  circleturn = false;
  grid.forEach(element => {
    element.removeEventListener('click', handleclick);
    element.classList.remove(xTurn);
    element.classList.remove(circlesTurn);
    element.addEventListener('click', handleclick, {
      once: true
    })
  });
  swapBoardhover();
  winningMessageElement.classList.remove('show');
}

function handleclick(e) {
  const currentClass = circleturn ? circlesTurn : xTurn;
  const currentGrid = e.target;

  showClick(currentClass, currentGrid);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    swapBoardhover();
  }

}

function isDraw() {
  return [...grid].every(element => {
    return element.classList.contains(xTurn) ||
      element.classList.contains(circlesTurn);
  })
}

function endGame(draw) {
  if (draw) {
    winningMessage.innerHTML = 'Draw';
  } else {
    winningMessage.innerHTML = `${circleturn ? "O":"X"} Wins!`
  }
  winningMessageElement.classList.add('show');
}

function checkWin(currentClass) {
  return winningCombinations.some(element => {
    return element.every(index => {
      return grid[index].classList.contains(currentClass);
    })
  })
}
const showClick = (currentClass, currentgrid) => {
  currentgrid.classList.add(currentClass);
}

const swapTurns = () => {
  circleturn = !circleturn;
}

function swapBoardhover(currentClass) {
  board.classList.remove('x');
  board.classList.remove('circle');
  player2Indicator.classList.remove('activep2');
  player1Indicator.classList.remove('activep1');
  if (circleturn === true) {
    board.classList.add('circle');
    player2Indicator.classList.add('activep2');
  } else {
    board.classList.add('x');
    player1Indicator.classList.add('activep1');
  }

}