/* 
Player 1 rolls two dice. 
Store both dice to a list. 

Ask player for input: first or second number. 
if first: 
  Number(String(list[0]) + String(list[1]))
if second: 
  Number(String(list[1]) + String(list[0]))

Save number. 

Player 2 rolls two dice. 
Store both dice to a list. 

Ask player for input: first or second number. 
if first: 
  Number(String(list[0]) + String(list[1]))
if second: 
  Number(String(list[1]) + String(list[0]))

Save number. 

Compare the two numbers. 
Bigger number wins. 

*/

// game states for rolling dice.
let P1_ROLL = "P1 ROLL";
let P2_ROLL = "P2 ROLL";

// can I make this a counter for user number instead?
// and ask the user for the number of players (>2, <5 maybe?)
let numOfPlayers = 2;
let playerTurn = 1;
// can increment player turn one by one?
// so that I don't have to write the same function numOfPlayers times to change the number of players in the game.

// game states for picking number order.
let P1_CHOOSE = "P1 CHOOSE";
let P2_CHOOSE = "P2 CHOOSE";

// game state to return result and winner.
let GAME_RESULT = "RESULT";

// initialised game state.
var gameState = P1_ROLL;

// variables to store player numbers
let p1Dice = [];
let p2Dice = [];

let p1Number = "";
let p2Number = "";

// dice rolling function. rounds up to the nearest integer.
var rollDice = function () {
  var output = Math.ceil(Math.random() * 6);
  console.log(output);
  return output;
};

// function to convert two separate numbers into single number.
var joinNumber = function (array, index) {
  var output = "";
  if (index == 1) {
    // convert each number in the array to a string
    // then concatenate them and turn the resulting
    // string back into a number.
    output = Number(String(array[0]) + String(array[1]));
    return output;
  }

  if (index == 2) {
    output = Number(String(array[1]) + String(array[0]));
    return output;
  }
};

// comparison function to see if player 1 is bigger than player 2.
var compareNumbers = function (number1, number2) {
  return number1 > number2;
};

// main function for game to play
var main = function (input) {
  let output = "";

  // states for rolling dice, and presenting dice.
  if (gameState == P1_ROLL) {
    // roll two dice, and push them to the p1Dice array.
    let firstDie = rollDice();
    p1Dice.push(firstDie);
    console.log(firstDie);
    let secondDie = rollDice();
    p1Dice.push(secondDie);
    console.log(secondDie);

    // switch modes for player 1 choose the order.
    gameState = P1_CHOOSE;

    // inform player of the two numbers, and ask for order.
    output = `Player 1, you rolled ${firstDie} and ${secondDie}. Please type in '1' or '2' to indicate which number you want to be the first.`;

    return output;
  }

  if (gameState == P2_ROLL) {
    output = "";

    let firstDie = rollDice();
    p2Dice.push(firstDie);
    let secondDie = rollDice();
    p2Dice.push(secondDie);

    gameState = P2_CHOOSE;

    output = `Player 2, you rolled ${firstDie} and ${secondDie}. Please type in '1' or '2' to indicate which number you want to be the first.`;

    return output;
  }

  // states for choosing dice order, and presenting the final number.
  if (gameState == P1_CHOOSE) {
    // input validation to make sure the user only chooses 1 or 2.
    if (input != "1" && input != "2") {
      output = "Please enter either 1 or 2.";
      return output;
    }

    // convert the two numbers into a single number.
    p1Number = joinNumber(p1Dice, input);

    // switch over to player 2.
    gameState = P2_ROLL;

    // ask second player to roll his dice.
    output = `Player 1, you have indicated ${input} as your choice. Your final number is: ${p1Number}. It's Player 2's turn now. Please click submit to roll the dice. `;

    return output;
  }

  if (gameState == P2_CHOOSE) {
    if (input != "1" && input != "2") {
      output = "Please enter either 1 or 2.";
      return output;
    }

    p2Number = joinNumber(p2Dice, input);

    // switch over to final result.
    gameState = GAME_RESULT;

    // ask second player to roll his dice.
    output = `Player 2, you have indicated ${input} as your choice. Your final number is: ${p2Number}. It's time to reveal the winner. Click submit to find out who had the bigger number. `;

    return output;
  }

  // state for comparing numbers and presenting game result.
  if (gameState == GAME_RESULT) {
    // if p1Number > p2Number, this variable will be true.
    let p1Win = compareNumbers(p1Number, p2Number);

    // if p1Win is true, this code runs.
    if (p1Win) {
      output = `Player 1 rolled ${p1Number}, which is bigger than ${p2Number}. Player 1 won! `;

      return output;
    }

    // if p1Win is false, then !false = true, so this code runs.
    if (!p1Win) {
      output = `Player 2 rolled ${p2Number}, which is bigger than ${p1Number}. Player 2 won! `;

      return output;
    }
  }

  return output;
};
