const GAME_STATES = [
  "rolling dice",
  "choose order",
  "result",
  "asking-game-state",
];
const GAME_MODES = ["highest-combined", "lowest-combined"];
let results = {
  gameState: GAME_STATES[2],
  1: {
    results: [],
    score: 0,
    combinedNum: 0,
  },
  2: {
    results: [],
    score: 0,
    combinedNum: 0,
  },
};
let currentPlayer = 1;
let gameMode = "";
// 1. get the 2 dices
const randomNumbers = function (numDices) {
  let results = [];
  for (let _ = 0; _ < numDices; _++)
    results.push(Math.floor(Math.random() * 6) + 1);
  return results;
};
// const currentPlayerNumber = function () {
//   return results.isCurrPlayer1 ? 1 : 2;
// };
const rollDiceOutput = function (playerDices) {
  return `
  Welcome Player ${currentPlayer}. <br><br>
  You rolled ${playerDices[0]} for Dice 1 and ${playerDices[1]} for Dice 2. <br><br>
  Choose the order of the dice.
  `;
};
const rollDice = function (numDices) {
  const playerDices = randomNumbers(numDices);
  results[currentPlayer].results = playerDices;
  results.gameState = GAME_STATES[1];
  return rollDiceOutput(playerDices);
};
const specifyDiceOrderOutput = function (currentPlayer, input, combinedNumber) {
  let output = `
  Player ${currentPlayer - 1}, you chose Dice ${input} first. <br><br>
  Your number is ${combinedNumber}. <br><br>
   
  `;
  if (currentPlayer <= 2)
    output += `It is now Player ${currentPlayer}'s turn.<br><br>`;
  output += "Please press submit to proceed.";
  return output;
};
const specifyDiceOrder = function (input) {
  let combinedNumber = 0;
  if (input === 1) {
    combinedNumber = +(
      "" +
      results[currentPlayer].results[0] +
      results[currentPlayer].results[1]
    ); // adding a "" first would concat the numbers, a + at the front of everything forces the type to a number.
  } else {
    combinedNumber = +(
      "" +
      results[currentPlayer].results[1] +
      results[currentPlayer].results[0]
    );
  }
  results[currentPlayer].combinedNum = combinedNumber;
  currentPlayer++;
  results.gameState = GAME_STATES[0]; // switch back to playerDices
  return specifyDiceOrderOutput(currentPlayer, input, combinedNumber);
};
const winnerNumber = function (gameMode) {
  let combinedNumbers = [];
  for (let playerNum = 1; playerNum <= 2; playerNum++) {
    combinedNumbers.push(results[playerNum].combinedNum);
  }
  if (gameMode === GAME_MODES[0])
    return combinedNumbers.indexOf(Math.max(...combinedNumbers)) + 1;
  else return combinedNumbers.indexOf(Math.min(...combinedNumbers)) + 1;
};
const result = function () {
  const winner = winnerNumber();
  results[winner].score += 1;
  results.gameState = GAME_STATES[0]; // reset the game
  currentPlayer = 1; // reset the game
  gameMode = ""; // reset the game
  return `
  Congrats Player ${winner}, you won! <br><br>
  Your combined number was ${results[winner].combinedNum}. <br><br>
  Thank you for playing! <br><br>
  To play again, just press submit again.
  `;
};
const askGameMode = function () {
  gameMode = 0;
  return `
  Welcome! Do you want to play lowest combined number mode or highest combined number mode? <br><br>
  Please type 1 for highest combined number mode or 2 for lowest combined number mode.
  `;
};
const setGameMode = function (input) {
  if (+input === 1) gameMode = GAME_MODES[0];
  else if (+input === 2) gameMode = GAME_MODES[1];
  results.gameState = GAME_STATES[0];
  return "Your game mode has been noted!";
};
// outputing the leaderboard
const outputLeaderBoard = function () {
  let allScores = [];
  for (let playerNum = 1; playerNum <= 2; playerNum++) {
    allScores.push(results[playerNum].score);
  }
  // create as many .score nodes as players
  const scoreNodes = document.querySelectorAll(".score");
  scoreNodes.forEach((score, idx) => {
    score.innerHTML = `Player ${idx + 1}'s score: ${allScores[idx]}`;
  });
};
const main = function (input) {
  outputLeaderBoard();
  if (gameMode === "") return askGameMode();
  // rollDice->specify->rollDice->specify-> result
  while (currentPlayer <= 2) {
    if (results.gameState === GAME_STATES[0]) return rollDice(2);
    else if (results.gameState === GAME_STATES[1])
      return specifyDiceOrder(input);
    else if (results.gameState === GAME_STATES[2]) setGameMode();
  }
  return result();
};
