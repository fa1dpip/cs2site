document.addEventListener('DOMContentLoaded', () => {
  const cells = Array.from(document.querySelectorAll('.tic-cell'));
  const message = document.getElementById('tic-message');
  const resetBtn = document.getElementById('tic-reset');
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

  function handleClick(e) {
    const idx = cells.indexOf(e.target);
    if (board[idx] || message.textContent) return;
    board[idx] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add('taken');

    if (checkWin(currentPlayer)) {
      message.textContent = `${currentPlayer} wins!`;
    } else if (checkDraw()) {
      message.textContent = 'Draw!';
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }

  cells.forEach(cell => cell.addEventListener('click', handleClick));

  resetBtn.addEventListener('click', () => {
    board.fill(null);
    cells.forEach(c => {
      c.textContent = '';
      c.classList.remove('taken');
    });
    message.textContent = '';
    currentPlayer = 'X';
  });
});
