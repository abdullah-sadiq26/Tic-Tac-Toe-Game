const textInfo = document.querySelector(".choose-text");
const allboxes = document.querySelectorAll(".boxes");
const resetBtn = document.querySelector(".reset");
const backBtn = document.querySelector(".back");

let gameStart = true;
let player1 = "X";
let player2 = "O";
let currentPlayer = Math.random() < 0.5 ? player1 : player2;
let isWinner = false;
let isDraw = false;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

resetBtn.style.display = "none";
backBtn.style.display = "none";

textInfo.textContent = `Player ${currentPlayer} Turn`;
allboxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (!gameStart) return;

    if (box.textContent === "") {
      box.textContent = currentPlayer;
      box.classList.add(currentPlayer.toLocaleLowerCase());

      checkWinner();
      if (isWinner) {
        gameStart = false;
        textInfo.textContent = `Player ${currentPlayer} Win`;
        resetBtn.style.display = "block";
        backBtn.style.display = "block";
        return;
      }

      checkDraw();
      if (isDraw) {
        gameStart = false;
        textInfo.textContent = "Game Draw";
        resetBtn.style.display = "block";
        backBtn.style.display = "block";
        return;
      }

      currentPlayer = currentPlayer === player1 ? player2 : player1;
      textInfo.textContent = `Player ${currentPlayer} Turn`;
    }
  });
});

const checkWinner = () => {
  isWinner = false;
  for (pattern of winPatterns) {
    let pos1 = allboxes[pattern[0]].textContent;
    let pos2 = allboxes[pattern[1]].textContent;
    let pos3 = allboxes[pattern[2]].textContent;

    if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
      isWinner = true;
      allboxes[pattern[0]].classList.add("win");
      allboxes[pattern[1]].classList.add("win");
      allboxes[pattern[2]].classList.add("win");
      break;
    }
  }
};

const checkDraw = () => {
  isDraw = true;

  for (let i = 0; i < allboxes.length; i++) {
    if (allboxes[i].textContent === "") {
      isDraw = false;
      break;
    }
  }
};

resetBtn.addEventListener("click", () => {
  allboxes.forEach((box) => {
    box.textContent = "";
    box.classList.remove("x", "o", "win");
  });
  isDraw = false;
  isWinner = false;
  gameStart = true;

  currentPlayer = Math.random() < 0.5 ? player1 : player2;
  textInfo.textContent = `Player ${currentPlayer} Turn`;
  resetBtn.style.display = "none";
  backBtn.style.display = "none";
});

const loaderContainer = document.querySelector(".loader-container");
window.addEventListener("load", () => {
  loaderContainer.classList.add("hide");
});

backBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});
