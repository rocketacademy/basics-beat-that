'use strict';

// DOM variables
const btnRollDice = document.querySelector('.roll-dice');
const btnDice1 = document.querySelector('.select-dice-1');
const btnDice2 = document.querySelector('.select-dice-2');
const inputEl = document.querySelector('#input-field');
const outputEl = document.querySelector('#output-div');
const instructionsEl = document.getElementById('instructions');
const imgDice1 = document.querySelector('.dice1');
const imgDice2 = document.querySelector('.dice2');
const currentScoreEl0 = document.getElementById('current-0');
const currentScoreEl1 = document.getElementById('current-1');
const playerScoreEl0 = document.querySelector('.score-0');
const playerScoreEl1 = document.querySelector('.score-1');
const btnReverse = document.querySelector('#btn-reverse');
const btnNewGame = document.querySelector('#btn-new-game');

// global variables
let dice1,
  dice2,
  player0Score = 0,
  player1Score = 0,
  activePlayer = 0;
let currentRoll = [];
let nameOfPlayers = ['Player 1', 'Player 2'];

let player0Rolls = []; // for use in leaderboard
let player1Rolls = []; // for use in leaderboard
let normalMode = true;

// Starting instructions
instructionsEl.textContent = `${nameOfPlayers[activePlayer]}, please roll dice to start the game! 🎲`;

// lowest number mode
btnReverse.addEventListener('click', function () {
  activePlayer = 0;
  currentRoll = [];
  currentScoreEl0.textContent = 0;
  currentScoreEl1.textContent = 0;
  // revert instructions to starter
  instructionsEl.textContent = `Player 1, Roll dice to start the game! 🎲`;
  // dice reset
  imgDice1.src = 'dice-1.png';
  imgDice2.src = 'dice-1.png';
  document.querySelector('.container').classList.toggle('reverse');
  // change mode to false
  normalMode = normalMode === true ? false : true;
  normalMode === true
    ? (document.querySelector(
        '#instructions'
      ).textContent = `${nameOfPlayers[activePlayer]}, please roll dice to start the game! 🎲`)
    : (document.querySelector(
        '#instructions'
      ).textContent = `${nameOfPlayers[activePlayer]}, please roll dice to start the game! 🎲 (reverse)`);
});

// determines winner based on the current scores
const determineWinner = function () {
  if (normalMode) {
    if (currentRoll[0] === currentRoll[1]) {
      player0Score += 0;
      player1Score += 0;
    } else if (currentRoll[0] > currentRoll[1]) {
      // console.log(`player 1 won`);
      player0Score += 1;
    } else {
      // console.log(`player 2 won`);
      player1Score += 1;
    }
  } else {
    if (currentRoll[0] === currentRoll[1]) {
      player0Score += 0;
      player1Score += 0;
    } else if (currentRoll[0] < currentRoll[1]) {
      // console.log(`player 1 won`);
      player0Score += 1;
    } else {
      // console.log(`player 2 won`);
      player1Score += 1;
    }
  }
  currentRoll = [];

  // scoreboard
  playerScoreEl0.textContent = player0Score;
  playerScoreEl1.textContent = player1Score;

  // displays leaderboard in descending order
  leaderboard();
  document.querySelector('.player-0-descending').textContent = [
    ...player0Rolls,
  ];
  document.querySelector('.player-1-descending').textContent = [
    ...player1Rolls,
  ];
};

// FUNCTIONS FOR BUTTON PRESSES IN HTML
// roll dice
const rollDice = function () {
  // resets current rolls text if player 1 rolls dice
  if (activePlayer === 0) {
    currentScoreEl0.textContent = 0;
    currentScoreEl1.textContent = 0;
  }
  dice1 = randomNumberGenerator();
  dice2 = randomNumberGenerator();
  outputEl.textContent = `${nameOfPlayers[activePlayer]} rolled ${dice1} and ${dice2}
  `;
  imgDice1.src = `dice-${dice1}.png`;
  imgDice2.src = `dice-${dice2}.png`;
  // hide rollDice button
  btnRollDice.classList.add('hidden');
  // show choices button
  btnDice1.classList.remove('hidden');
  btnDice2.classList.remove('hidden');
  instructionsEl.textContent = `${nameOfPlayers[activePlayer]}, please choose the order of the dice. 🤹`;
};

// executes on 'click 1' press
btnDice1.addEventListener('click', function () {
  if (currentRoll.length < 2) {
    // console.log(Number('' + dice1 + dice2));
    let concatOfDice = Number('' + dice1 + dice2);
    recordActivePlayerRolls(concatOfDice);
  }
});

// executes on 'click 2' press
btnDice2.addEventListener('click', function () {
  if (currentRoll.length < 2) {
    // console.log(Number('' + dice1 + dice2));
    let concatOfDice = Number('' + dice2 + dice1);
    recordActivePlayerRolls(concatOfDice);
  }
});

// FUNCTIONS THAT SUPPORT THE MAIN CODE
// roll dice
btnRollDice.addEventListener('click', function () {
  // let input = inputEl.value;
  // outputEl.textContent = input;
  rollDice();
});

// change player in the game
const changePlayer = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  instructionsEl.textContent = `${nameOfPlayers[activePlayer]}, please roll dice to start the game! 🎲`;
};

// get a random number
const randomNumberGenerator = function () {
  return Math.trunc(Math.random() * 6 + 1);
};

// determines what happens when buttons are pressed and to change player after 1 turn is over.
const gameLogic = function () {
  // show current score for active player
  document.getElementById(`current-${activePlayer}`).textContent =
    currentRoll[activePlayer];
  // unhide rollDice button
  btnRollDice.classList.remove('hidden');
  btnDice1.classList.add('hidden');
  btnDice2.classList.add('hidden');
  // change player
  changePlayer();
};

// sorts rolled dice scores in descending order
const leaderboard = function () {
  player0Rolls.sort(function (a, b) {
    return b - a;
  });
  player1Rolls.sort(function (a, b) {
    return b - a;
  });
};

btnNewGame.addEventListener('click', function () {
  init();
});

const init = function () {
  // TODO
  dice1,
    dice2,
    (player0Score = 0),
    (player1Score = 0),
    (activePlayer = 0),
    (currentRoll = []),
    (player0Rolls = []),
    (player1Rolls = []);

  // leaderboard back to 0
  document.querySelector('.player-0-descending').textContent = [0];
  document.querySelector('.player-1-descending').textContent = [0];
  // player 1 / 2 score back to 0
  playerScoreEl0.textContent = 0;
  playerScoreEl1.textContent = 0;
  // current roll 1 / 2 back to 0
  currentScoreEl0.textContent = 0;
  currentScoreEl1.textContent = 0;
  // dice back to 1 and 1
  imgDice1.src = 'dice-1.png';
  imgDice2.src = 'dice-1.png';
  // lowest number wins off
  document.querySelector('.container').classList.remove('reverse');
  // revert back to 'Roll Dice' button
  btnRollDice.classList.remove('hidden');
  btnDice1.classList.add('hidden');
  btnDice2.classList.add('hidden');
  // revert instructions to starter
  instructionsEl.textContent = `Player 1, Roll dice to start the game! 🎲`;
  // revert to normal mode
  normalMode = true;
};

const recordActivePlayerRolls = function (concatOfDice) {
  // add current roll to active player
  currentRoll[activePlayer] = concatOfDice;
  // records active player's rolls
  activePlayer === 0 && player0Rolls.push(concatOfDice);
  activePlayer === 1 && player1Rolls.push(concatOfDice);
  imgDice1.src = `dice-1.png`;
  imgDice2.src = `dice-1.png`;
  gameLogic();
  if (currentRoll.length >= 2) {
    imgDice1.src = `dice-1.png`;
    imgDice2.src = `dice-1.png`;
    determineWinner();
  }
};
