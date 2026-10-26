const xBox = document.querySelector(".x-box");
const oBox = document.querySelector(".o-box");
const textInfo = document.querySelector(".choose-text");
const allboxes = document.querySelectorAll(".boxes");
const resetBtn = document.querySelector(".reset");
const backBtn = document.querySelector(".back");

let gameStart = false;
let isWinner = false;
let isDraw = false;
let currentPlayer = "X";
let canChoose = true;
let human = "X";
let robot = "O";
resetBtn.style.display = "none";
backBtn.style.display = "none";

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

allboxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (!gameStart) {
      if (canChoose) {
        textInfo.textContent = "Choose X or O first!";
        textInfo.style.color = "#ff4757";
        return;
      }
    }

    if (box.textContent === "" && gameStart && currentPlayer === human) {
      canChoose = false;
      box.textContent = human;
      box.classList.add(human.toLocaleLowerCase());

      textInfo.style.color = "";
      textInfo.textContent = "Robot Turn";
      currentPlayer = robot;

      checkWinner();
      if (isWinner) {
        textInfo.textContent = "You Win";
        resetBtn.style.display = "block";
        backBtn.style.display = "block";

        gameStart = false;
        return;
      }

      checkDraw();
      if (isDraw) {
        textInfo.textContent = "Game Draw";
        resetBtn.style.display = "block";
        backBtn.style.display = "block";
        gameStart = false;
        return;
      }

      setTimeout(() => {
        makeMove();
      }, 1000);
    }
  });
});

const makeMove = () => {
  if (!gameStart) return;

  let emptyBoxes = [];

  for (let i = 0; i < allboxes.length; i++) {
    if (allboxes[i].textContent === "") {
      emptyBoxes.push(i);
    }
  }

  if (emptyBoxes.length > 0) {
    let randomIndex = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    allboxes[randomIndex].textContent = robot;
    allboxes[randomIndex].classList.add(robot.toLocaleLowerCase());

    textInfo.textContent = "Your Turn";
    currentPlayer = human;

    checkWinner();
    if (isWinner) {
      // gameStart = false;
      textInfo.textContent = "Robot Win";
      resetBtn.style.display = "block";
      backBtn.style.display = "block";
      return;
    }

    checkDraw();
    if (isDraw) {
      // gameStart = false;
      textInfo.textContent = "Game Draw";
      resetBtn.style.display = "block";
      backBtn.style.display = "block";
      return;
    }
  }
};

const checkWinner = () => {
  isWinner = false;
  for (let pattern of winPatterns) {
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

xBox.addEventListener("click", () => {
  if (!canChoose) return;

  human = "X";
  robot = "O";
  resetGame();

  xBox.classList.add("active");
  oBox.classList.remove("active");
  gameStart = true;
  canChoose = false;
  textInfo.style.color = "";

  let randomPick = Math.random() < 0.5 ? human : robot;
  currentPlayer = randomPick;
  textInfo.textContent = currentPlayer === human ? "Your Turn" : "Robot Turn";

  if (currentPlayer === robot) {
    setTimeout(() => {
      makeMove();
    }, 1000);
  }
});

oBox.addEventListener("click", () => {
  if (!canChoose) return;

  human = "X";
  robot = "O";
  resetGame();

  xBox.classList.remove("active");
  oBox.classList.add("active");
  gameStart = true;
  canChoose = false;
  textInfo.style.color = "";

  let randomPick = Math.random() < 0.5 ? human : robot;
  currentPlayer = randomPick;
  textInfo.textContent = currentPlayer === human ? "Your Turn" : "Robot Turn";

  if (currentPlayer === robot) {
    setTimeout(() => {
      makeMove();
    }, 1000);
  }
});

const resetGame = () => {
  allboxes.forEach((box) => {
    box.textContent = "";
    box.classList.remove("o", "x", "win");
  });
  isWinner = false;
  isDraw = false;
};
resetBtn.addEventListener("click", () => {
  resetGame();
  gameStart = false;
  currentPlayer = "X";
  canChoose = true;
  xBox.classList.remove("active");
  oBox.classList.remove("active");
  textInfo.textContent = "Choose";
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
