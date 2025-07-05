document.addEventListener('DOMContentLoaded', () => {
  const cells = Array.from(document.querySelectorAll('.tic-cell'));
  const message = document.getElementById('tic-message');
  const resetBtn = document.getElementById('tic-reset');
  const choiceBox = document.getElementById('tic-choice');
  const chooseX = document.getElementById('choose-x');
  const chooseO = document.getElementById('choose-o');

  let playerSymbol = null;
  let aiSymbol = null;
  let currentPlayer = 'X';
  const board = Array(9).fill(null);

  const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  function checkWin(player) {
    return wins.some(combo => combo.every(i => board[i] === player));
  }

  function checkDraw() {
    return board.every(Boolean);
  }

  function evaluate() {
    if (checkWin(playerSymbol)) {
      message.textContent = 'You win!';
      return true;
    }
    if (checkWin(aiSymbol)) {
      message.textContent = 'AI wins!';
      return true;
    }
    if (checkDraw()) {
      message.textContent = 'Draw!';
      return true;
    }
    return false;
  }

  function aiMove() {
    const free = board
      .map((v, i) => (v ? null : i))
      .filter(i => i !== null);
    if (free.length === 0) return;
    const idx = free[Math.floor(Math.random() * free.length)];
    board[idx] = aiSymbol;
    cells[idx].textContent = aiSymbol;
    cells[idx].classList.add('taken');
  }

  function handleClick(e) {
    const idx = cells.indexOf(e.target);
    if (
      board[idx] ||
      message.textContent ||
      currentPlayer !== playerSymbol ||
      !playerSymbol
    )
      return;

    board[idx] = playerSymbol;
    e.target.textContent = playerSymbol;
    e.target.classList.add('taken');

    if (evaluate()) return;

    currentPlayer = aiSymbol;
    setTimeout(() => {
      aiMove();
      if (evaluate()) return;
      currentPlayer = playerSymbol;
    }, 300);
  }

  cells.forEach(cell => cell.addEventListener('click', handleClick));

  function startGame(sym) {
    playerSymbol = sym;
    aiSymbol = sym === 'X' ? 'O' : 'X';
    currentPlayer = 'X';
    choiceBox.style.display = 'none';
    message.textContent = '';
    board.fill(null);
    cells.forEach(c => {
      c.textContent = '';
      c.classList.remove('taken');
    });
    if (aiSymbol === 'X') {
      currentPlayer = aiSymbol;
      aiMove();
      evaluate();
      currentPlayer = playerSymbol;
    }
  }

  chooseX.addEventListener('click', () => startGame('X'));
  chooseO.addEventListener('click', () => startGame('O'));

  resetBtn.addEventListener('click', () => {
    choiceBox.style.display = 'block';
    playerSymbol = null;
    aiSymbol = null;
    board.fill(null);
    cells.forEach(c => {
      c.textContent = '';
      c.classList.remove('taken');
    });
    message.textContent = '';
    currentPlayer = 'X';
  });
});
