document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell");
  const statusText = document.getElementById("status");
  const restartButton = document.getElementById("restart");
  let currentPlayer = "X";
  let board = ["", "", "", "", "", "", "", "", ""];
  let gameActive = true;

  const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6] 
  ];

  function checkWinner() {
      for (let pattern of winPatterns) {
          const [a, b, c] = pattern;
          if (board[a] && board[a] === board[b] && board[a] === board[c]) {
              gameActive = false;
              statusText.textContent = `Player ${board[a]} wins! 🎉`;
              cells[a].style.background = cells[b].style.background = cells[c].style.background = "#90ee90";
              return true;
          }
      }
      if (!board.includes("")) {
          gameActive = false;
          statusText.textContent = "It's a draw! 🤝";
          return true;
      }
      return false;
  }

  function handleClick(event) {
      const index = event.target.dataset.index;
      if (!gameActive || board[index] !== "") return;
      
      board[index] = currentPlayer;
      event.target.textContent = currentPlayer;
      event.target.style.color = currentPlayer === "X" ? "#ff6f61" : "#4fa3d1"; 
      
      if (!checkWinner()) {
          currentPlayer = currentPlayer === "X" ? "O" : "X";
          statusText.textContent = `Player ${currentPlayer}'s turn`;
      }
  }

  function restartGame() {
      board.fill("");
      gameActive = true;
      currentPlayer = "X";
      statusText.textContent = "Player X's turn";
      cells.forEach(cell => {
          cell.textContent = "";
          cell.style.background = "";
      });
  }

  cells.forEach(cell => cell.addEventListener("click", handleClick));
  restartButton.addEventListener("click", restartGame);
  statusText.textContent = "Player X's turn";
});
