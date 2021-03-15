// ######## MORE COMFORTABLE : 1. Variable Number of Dice  2. Score  3. Auto-Choose
// ========project covers questions upto "auto-chose" in more comfortable ======


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
// user inputs string with represent the indices. breakdown the string and form the order
function numberFromIndexes(stringNumber) {
  let arrayOfIndexes = stringNumber.split('').map(Number);
  return arrayOfIndexes;
}

// this function is to generate numbers from choses indexes by player.
function indexesToNumbers(indexes, rolls) {
  let indexesLength = indexes.length;
  let rollslength = rolls.length;
  let numberArray = [];
  let finalNumber = 0;
  for (let i = 0; i < indexesLength; i++) {
    let number = rolls[indexes[i]];
    numberArray.push(number);
    finalNumber += (number * (10 ** (rollslength - 1 - i)));
  }
  return finalNumber;
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
  return finalNumber
  // return Math.max.apply(null, rolledNumArray);
}

// dafault mode at the start of the game.
let mode = 'num of dice';
let numOfDice;
let rolledNumbers;
let player1score = 0;
let player2score = 0;
let playerTurn = 'player1'
function main(input) {
  let result = 'enter number of dice you want to play with';
  if (mode == 'num of dice') {
    numOfDice = input;
    mode = 'play';
    result = 'number of dice set.';
  }
  if (mode == 'play') {
    rolledNumbers = storeRolledNumbers(numOfDice);
    // mode = 'chose order';
    mode = 'auto order';
    result = ` here is the array of your rolled numbers ${rolledNumbers}`;
    // return result + ' Enter the indexes to generate THE NUMBER.';
    return result + ' hit submit to auto generate THE NUMBER.';
  }
  // if (mode == 'chose order') 
  if (mode == 'auto order') {
    let resultOfDiceRoll = rolledNumbers;
    let indexes = numberFromIndexes(input);
    // ** for maual number genenration use score.
    // let score = indexesToNumbers(indexes, resultOfDiceRoll);
    let largestNumInArray = autoGenNumber(rolledNumbers);
    console.log(largestNumInArray + ' largest num in array');
    if (playerTurn == 'player1') {
      // player1score += score;
      player1score += largestNumInArray;
      playerTurn = 'player2';
      // result = `score of last round ${score}. so far player1's total score is: ${player1score}. And player2's total score id: ${player2score}. Now it's player2's turn.`;
      result = `score of last round ${largestNumInArray}. so far player1's total score is: ${player1score}. And player2's total score id: ${player2score}. Now it's player2's turn.`;
    }
    else {
      // player2score += score;
      player2score += largestNumInArray;
      // result = `score of last round ${score}. so far player1's total score is: ${player1score}. And player2's total score id: ${player2score}. Now it's player1's turn.`;
      result = `score of last round ${largestNumInArray}. so far player1's total score is: ${player1score}. And player2's total score id: ${player2score}. Now it's player1's turn.`;
    }
  }
  mode = 'num of dice';
  if (player1score > player2score) { result = result + ' player 1 is leading'; }
  else if (player1score < player2score) { result = result + ' player 2 is leading'; }
  else { result = result + ' No one is leading at the moment'; }
  return result;
}