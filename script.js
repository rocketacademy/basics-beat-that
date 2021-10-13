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

// global variables

let dice1, dice2;
let activePlayer = 0;

// output
btnRollDice.addEventListener('click', function () {
  // let input = inputEl.value;
  // outputEl.textContent = input;
  rollDice();
});

// TODO
// 3. change submit to roll dice
// 4. remove rollDice function after user clicks once.
// 4. user choose 1 or 2

const randomNumberGenerator = function () {
  return Math.trunc(Math.random() * 6 + 1);
};

// roll dice
const rollDice = function () {
  const dice1 = randomNumberGenerator();
  const dice2 = randomNumberGenerator();
  // unhide dice
  imgDice1.classList.remove('hidden');
  imgDice2.classList.remove('hidden');
  outputEl.textContent = `You rolled ${dice1} and ${dice2}
  `;
  imgDice1.src = `dice-${dice1}.png`;
  imgDice2.src = `dice-${dice2}.png`;
  // hide rollDice button
  btnRollDice.classList.add('hidden');
  btnDice1.classList.remove('hidden');
  btnDice2.classList.remove('hidden');
  instructionsEl.textContent = 'Choose the order of the dice. 🤹';
};
