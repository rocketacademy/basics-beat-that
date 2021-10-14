'use strict';

// DOM variables
const btnRollDice = document.querySelector('.roll-dice');
const btnDice1 = document.querySelector('.select-dice-1');
const btnDice2 = document.querySelector('.select-dice-2');
const inputEl = document.querySelector('#input-field');
const outputEl = document.getElementById('output-div');
const instructionsEl = document.getElementById('instructions');
const imgDice1 = document.querySelector('.dice1');
const imgDice2 = document.querySelector('.dice2');
const currentScoreEl0 = document.getElementById('current-0');
const currentScoreEl1 = document.getElementById('current-1');
const playerScoreEl0 = document.querySelector('.score-0');
const playerScoreEl1 = document.querySelector('.score-1');

// global variables

let dice1,
  dice2,
  player0Score = 0,
  player1Score = 0;
let activePlayer = 0;
let currentRoll = [];
let nameOfPlayers = ['Player 1', 'Player 2'];

// roll dice
btnRollDice.addEventListener('click', function () {
  // let input = inputEl.value;
  // outputEl.textContent = input;
  rollDice();
});

instructionsEl.textContent = `${nameOfPlayers[activePlayer]}, please roll dice to start the game! 🎲`;

// determine winner
const determineWinner = function () {
  if (currentRoll[0] > currentRoll[1]) {
    // console.log(`player 1 won`);
    player0Score += 1;
  } else {
    // console.log(`player 2 won`);
    player1Score += 1;
  }
  currentRoll = [];

  // scoreboard
  playerScoreEl0.textContent = player0Score;
  playerScoreEl1.textContent = player1Score;
};

const changePlayer = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  instructionsEl.textContent = `${nameOfPlayers[activePlayer]}, please roll dice to start the game! 🎲`;
};

const randomNumberGenerator = function () {
  return Math.trunc(Math.random() * 6 + 1);
};

btnDice1.addEventListener('click', function () {
  if (currentRoll.length < 2) {
    // console.log(Number('' + dice1 + dice2));
    let concatOfDice = Number('' + dice1 + dice2);
    currentRoll[`${activePlayer}`] = concatOfDice;
    gameLogic();
    if (currentRoll.length >= 2) {
      determineWinner();
    }
  }
});
btnDice2.addEventListener('click', function () {
  if (currentRoll.length < 2) {
    let concatOfDice = Number('' + dice2 + dice1);
    currentRoll[`${activePlayer}`] = concatOfDice;
    // console.log(Number('' + dice1 + dice2));
    gameLogic();
    if (currentRoll.length >= 2) {
      determineWinner();
    }
  }
});

const gameLogic = function () {
  // let concatOfDice = Number('' + dice1 + dice2);
  // currentRoll[`${activePlayer}`] = concatOfDice;
  // console.log(currentRoll);
  document.getElementById(`current-${activePlayer}`).textContent =
    currentRoll[`${activePlayer}`];
  // hide rollDice button
  btnRollDice.classList.remove('hidden');
  btnDice1.classList.add('hidden');
  btnDice2.classList.add('hidden');
  // add score
  currentRoll[`${activePlayer}`];
  // change player
  changePlayer();
};

// roll dice
const rollDice = function () {
  dice1 = randomNumberGenerator();
  dice2 = randomNumberGenerator();
  outputEl.textContent = `${nameOfPlayers[activePlayer]} rolled ${dice1} and ${dice2}
  `;
  imgDice1.src = `dice-${dice1}.png`;
  imgDice2.src = `dice-${dice2}.png`;
  // hide rollDice button
  btnRollDice.classList.add('hidden');
  btnDice1.classList.remove('hidden');
  btnDice2.classList.remove('hidden');
  instructionsEl.textContent = `${nameOfPlayers[activePlayer]}, please choose the order of the dice. 🤹`;
};
