// ######## MORE COMFORTABLE :  Variable Number of players.


// random number
function rollDice() {
  let randomNum = Math.floor(Math.random() * 6) + 1;
  return randomNum;
}
// keep track of all the randomly rolled numbers. store it in an array.
function storeRolledNumbers(dices) {
  let diceRollArray = [];
  for (let i = 0; i < dices; i++) {
    let roll = rollDice(6);
    diceRollArray.push(roll);
  }
  return diceRollArray;
}

// this function is to generate largest number from random numbers automatically.
function autoGenNumber(rolledNumArray) {
  let array = rolledNumArray;
  let finalNumber = 0;
  let length = array.length;
  for (let i = 0; array.length >= 1; i++) {
    let max = Math.max.apply(null, array);
    finalNumber = finalNumber * 10 + max;
    console.log(finalNumber + ' final number');
    rolledNumArray = array.splice(array.indexOf(max), 1);
    console.log(array + ' array after splice');
  }
  return finalNumber;
}

// dafault mode at the start of the game.
let mode = 'num of players';
let numOfDice;
let rolledNumbers;
let numOfPlayers = 0;
let player1score = 0;
let player2score = 0;
let numOfRounds = 1;
let totalScore = [];
function main(input) {
  let result = 'enter number of dice you want to play with';
  if (mode == 'num of players') {
    numOfPlayers = input;
    mode = 'num of dice';
    return 'number of players set. enter the number of dice.';
  }
  if (mode == 'num of dice') {
    numOfDice = input;
    mode = 'play';
    result = 'number of dice set.';
  }
  if (mode == 'play') {
    rolledNumbers = storeRolledNumbers(numOfDice);
    mode = 'auto order';
    result = ` here is the array of your rolled numbers ${rolledNumbers}`;
    return result + ' hit submit to auto generate THE NUMBER.';
  }
  if (mode == 'auto order') {
    let largestNumInArray = autoGenNumber(rolledNumbers);
    console.log(largestNumInArray + ' largest num in array');
    totalScore.push(largestNumInArray);
    console.log(totalScore);
    console.log(numOfRounds + ' num of rounds');
    console.log(totalScore + ' total score');
    let playerTotalNumber = totalScore[numOfRounds - 1];
    console.log(playerTotalNumber + ' player total number');
    result = `score of last round ${largestNumInArray}. Score of player${numOfRounds} is ${playerTotalNumber}`;
  }
  numOfRounds += 1;
  mode = 'num of dice';
  if (numOfRounds > numOfPlayers) {
    mode = 'num of players';
    result = result + ' GAME OVER. Enter number of players to play again.';
    numOfRounds = 1;
    totalScore = [];
  }
  return result;
}