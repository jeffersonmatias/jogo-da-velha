const body = document.body;
const currentPlayer = document.querySelector(".currentPlayer");
let message = document.querySelector(".message");
let selected;
let player = "X";
let victoryMusic = new Audio("./assets/sounds/victory.mp3");
let drawMusic = new Audio("./assets/sounds/draw.mp3");

let positions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

function trocartema() {
  body.classList.toggle("dark_mode");
}

function init() {
  selected = [];

  currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;

  document.querySelectorAll(".game button").forEach((item) => {
    item.innerHTML = "";
    item.addEventListener("click", newMove);
  });
}

init();

function newMove(e) {
  const index = e.target.getAttribute("data-i");
  e.target.innerHTML = player;
  e.target.removeEventListener("click", newMove);
  selected[index] = player;

  setTimeout(() => {
    check();
  }, [100]);

  player = player === "X" ? "O" : "X";
  currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;
}

function check() {
  let playerLastMove = player === "X" ? "O" : "X";

  const items = selected
    .map((item, i) => [item, i])
    .filter((item) => item[0] === playerLastMove)
    .map((item) => item[1]);

  for (pos of positions) {
    if (pos.every((item) => items.includes(item))) {
      message.innerHTML = "O JOGADOR '" + playerLastMove + "' GANHOU!";
      message.classList.toggle("green");
      victoryMusic.play();
      setTimeout(() => {
        message.innerHTML = "";
        message.classList.toggle("green");
      }, 3000);

      init();
      return;
    }
  }

  if (selected.filter((item) => item).length === 9) {
    message.innerHTML = "DEU EMPATE !";
    message.classList.toggle("draw");
    drawMusic.play();
    setTimeout(() => {
      message.innerHTML = "";
      message.classList.toggle("draw");
    }, 3000);

    init();
    return;
  }
}
