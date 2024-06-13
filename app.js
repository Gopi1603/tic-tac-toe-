const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('reset-btn');
let currentPlayer = 'X';
let gameState = Array(9).fill('');
let gameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);

function handleCellClick(event) {
  const cell = event.target;
  const cellIndex = cell.getAttribute('data-index');

  if (gameState[cellIndex] !== '' || !gameActive) {
    return;
  }

  gameState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer === 'X' ? '❌' : '🔵';
  cell.classList.add(currentPlayer);

  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} wins! 🎉`;
    statusText.classList.add('win');
    gameActive = false;
    highlightWinningCells();
    return;
  }

  if (gameState.every(cell => cell !== '')) {
    statusText.textContent = 'Draw! 😐';
    statusText.classList.add('draw');
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s turn`;

  if (currentPlayer === 'O') {
    computerPlay();
  }
}

function checkWin() {
  return winningConditions.some(condition => {
    const [a, b, c] = condition;
    return gameState[a] !== '' && gameState[a] === gameState[b] && gameState[a] === gameState[c];
  });
}

function highlightWinningCells() {
  winningConditions.forEach(condition => {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      cells[a].classList.add('win');
      cells[b].classList.add('win');
      cells[c].classList.add('win');
    }
  });
}

function resetGame() {
  gameState = Array(9).fill('');
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('X', 'O', 'win');
  });
  currentPlayer = 'X';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  statusText.classList.remove('win', 'draw');
  gameActive = true;
}

function computerPlay() {
  setTimeout(() => {
    const emptyCells = gameState.map((value, index) => value === '' ? index : null).filter(value => value !== null);
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    gameState[randomIndex] = currentPlayer;
    cells[randomIndex].textContent = '🔵';
    cells[randomIndex].classList.add('O');

    if (checkWin()) {
      statusText.textContent = `Player ${currentPlayer} wins! 🎉`;
      statusText.classList.add('win');
      gameActive = false;
      highlightWinningCells();
      return;
    }

    if (gameState.every(cell => cell !== '')) {
      statusText.textContent = 'Draw! 😐';
      statusText.classList.add('draw');
      gameActive = false;
      return;
    }

    currentPlayer = 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }, 500);
}
