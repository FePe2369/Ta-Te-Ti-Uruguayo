let board = Array(9).fill(null);
let currentPlayer = "X";
let isGameOver = false;

// Initialize game when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeGame();
});

function initializeGame() {
  // Add click listeners to all cells
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
  });

  // Add click listener to reset button
  document.getElementById("reset").addEventListener("click", resetGame);
}

function handleCellClick(event) {
  const cell = event.target;
  const index = parseInt(cell.getAttribute("data-index"));

  handleClick(index);
}

function handleClick(index) {
  if (board[index] || isGameOver) return;

  const cell = document.querySelector(`[data-index="${index}"]`);
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("taken");
  cell.setAttribute("data-player", currentPlayer);

  if (checkWinner()) {
    document.getElementById(
      "winner"
    ).textContent = `¡${currentPlayer} ganó! 🏆⚽`;
    highlightWinner();
    isGameOver = true;
    document.getElementById("current-turn").style.opacity = "0.5";
    return;
  }

  if (board.every((cell) => cell)) {
    document.getElementById("winner").textContent = "¡Empate! 🧉";
    isGameOver = true;
    document.getElementById("current-turn").style.opacity = "0.5";
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateTurnIndicator();
}

function updateTurnIndicator() {
  const indicator = document.getElementById("turn-indicator");
  indicator.textContent = currentPlayer;
  indicator.setAttribute("data-player", currentPlayer);
}

function checkWinner() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  for (const condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return condition;
    }
  }

  return null;
}

function highlightWinner() {
  const winnerCells = checkWinner();
  if (!winnerCells) return;

  for (const index of winnerCells) {
    document.querySelector(`[data-index="${index}"]`).classList.add("winner");
  }
}

function resetGame() {
  board = Array(9).fill(null);
  currentPlayer = "X";
  isGameOver = false;
  document.getElementById("winner").textContent = "";
  document.getElementById("current-turn").style.opacity = "1";

  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.className = "cell";
    cell.removeAttribute("data-player");
  });

  updateTurnIndicator();
}
