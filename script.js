'use strict';

const inputEl = document.querySelector('#input-field');
const btnSubmit = document.getElementById('submit-button');
const outputEl = document.getElementById('output-div');

// global variables

// output
btnSubmit.addEventListener('click', function () {
  let input = inputEl.value;
  outputEl.textContent = input;
  rollDice();
});

// enter functionality
inputEl.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    btnSubmit.click();
  }
});

const randomNumberGenerator = function () {
  return Math.trunc(Math.random() * 6 + 1);
};

// roll dice
const rollDice = function () {
  const dice1 = randomNumberGenerator();
  const dice2 = randomNumberGenerator();
  outputEl.textContent = `You rolled ${dice1} and ${dice2}`;
};
