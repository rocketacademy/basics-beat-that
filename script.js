// 2 player game //
// when player clicks submit, the game rolls 2 dice
// player chooses the order of which number from the rolled dice that will go first
// player with the higher number combination wins

// breakdown //
// roll dice twice and show output to player for them to choose
// output chosen combination number to player
// refactor code to include player 2
// compare both dice value from each player, the higher number wins
// reset the game

// ==== GLOBAL VARIABLE ==== //

let gameState = `player dice roll`;

let currentPlayerRolls = [];

let currentPlayer = 1;
let combinedPlayerNumber = [];

// ==== HELPER FUNCTION ==== //

// random dice number from 1-6
let randomDiceRoll = function () {
  let randomNum = Math.random() * 6;
  let randomInteger = Math.floor(randomNum);
  let diceNum = randomInteger + 1;
  console.log(`DiceRoll outout:`, diceNum);
  return diceNum;
};

// rolled dice twice
let rollDiceTwice = function () {
  for (let i = 0; i < 2; i = i += 1) {
    let DiceNum = randomDiceRoll();
    // push dice numbers in player array
    currentPlayerRolls.push(DiceNum);
  }
  console.log(`player rolls:`, currentPlayerRolls);
  return `✨ Hey Player ${currentPlayer}! Here are the numbers you got! ✨ <br /><br />🎲 Dice 1 = ${currentPlayerRolls[0]} <br />🎲 Dice 2 = ${currentPlayerRolls[1]} <br /><br />Choose which dice to form the first number "1" or "2".`;
};

// player chosen number

let playerChosenNumber = function (playerInput) {
  let playerNumber = ``;
  // if player does not enter the right input
  if (playerInput != 1 && playerInput != 2) {
    return `Please enter either "1" or "2" to decide which dice number comes first.`;
  }
  if (playerInput == 1) {
    playerNumber = Number(
      String(currentPlayerRolls[0]) + String(currentPlayerRolls[1])
    );
  }
  if (playerInput == 2) {
    playerNumber = Number(
      String(currentPlayerRolls[1]) + String(currentPlayerRolls[0])
    );
  }
  combinedPlayerNumber.push(playerNumber);
  currentPlayerRolls = [];
  return `Interesting... 👀 <br /><br />Player ${currentPlayer}, you have chosen to form the number: ${playerNumber}`;
};

// compare players chosen number
let chooseWinner = function () {};

// ==== MAIN FUNCTION ==== //
let main = function (input) {
  let output = ``;
  if (gameState == `player dice roll`) {
    // roll dice twice
    output = rollDiceTwice();

    // change game mode
    if (currentPlayer == 1) {
      gameState = `player 1 choose number`;
    } else {
      gameState = `player 2 choose number`;
    }
    return output;
  }
  if (gameState == `player 1 choose number`) {
    // if input is correct, output player chosen number
    output = playerChosenNumber(input);
    currentPlayer = 2;
    gameState = `player dice roll`;
    return output + `<br /><br />Player 2, you're up next!`;
  }
  if (currentPlayer == 2) {
    gameState = `compare dice number`;
    return `<br /><br /> Who is the winner?`;
  }
};
