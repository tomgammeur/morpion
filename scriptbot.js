const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('resetButton');
let currentPlayer = 'X';
let gameOver = false;
let gameBoard = ['', '', '', '', '', '', '', '', ''];

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function checkWinner() {
  for (const condition of winConditions) {
    const [a, b, c] = condition;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      gameOver = true;
      message.textContent = `${currentPlayer} a gagné !`;
      return;
    }
  }
  if (!gameBoard.includes('')) {
    gameOver = true;
    message.textContent = 'Match nul !';
  }
}

function botPlay() {
  const availableMoves = gameBoard.map((val, index) => val === '' ? index : null).filter(val => val !== null);
  if (availableMoves.length > 0) {
    const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    gameBoard[randomMove] = 'O';
    cells[randomMove].textContent = 'O';
    checkWinner();
    currentPlayer = 'X';
  }
}

function handleClick(event) {
  const index = event.target.getAttribute('data-index');
  if (gameBoard[index] || gameOver || currentPlayer === 'O') return;

  gameBoard[index] = currentPlayer;
  event.target.textContent = currentPlayer;
  checkWinner();
  if (!gameOver) {
    currentPlayer = 'O';
    botPlay();
  }
}

function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameOver = false;
  currentPlayer = 'X';
  message.textContent = '';
  cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
