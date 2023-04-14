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

/*
step 1: create a dice roll function (output only 2 number)
step 2: create a select number function (input the result into an array to compare with next player's choice)
step 3: create a second player game mode
step 4: create a game result function (compare both player's results, the number with the bigger value wins)
step 5: create a reset game mode

*/

// ==== GLOBAL VARIABLE ==== //

let diceRollData = [];
let playersChosenNumber = [];

// game modes
let GAME_STATE_DICE_ROLL = `player rolls dice`;
let GAME_STATE_CHOOSE_NUMBER = `player chooses number`;
let gameState = GAME_STATE_DICE_ROLL;
let PLAYER_1 = `player 1 turn`;
let PLAYER_2 = `player 2 turn`;
let currentPlayer = PLAYER_1;

// ==== HELPER FUNCTION ==== //

// random dice number from 1-6 twice
let randomDiceRoll = function () {
  let output = ``;

  // counter to run dice roll twice
  for (let i = 0; i < 2; i = i += 1) {
    // dice roll function
    let randomNum = Math.random() * 6;
    let randomInteger = Math.floor(randomNum);
    let diceNum = randomInteger + 1;

    console.log(`Dice roll function result:`, diceNum);

    // add dice roll results into dice roll data array
    diceRollData.push(diceNum);

    console.log(`dice roll date:`, diceRollData);
    output = diceNum;
  }
  let diceNum1 = diceRollData[0];
  let diceNum2 = diceRollData[1];
  return `Hey Player 1! 👋<br /><br />Here are the numbers you got!<br /><br />🎲 Dice 1 = ${diceNum1}<br />🎲 Dice 2 = ${diceNum2}<br /><br />Choose which dice to form the first number "1" or "2".<br />Remember, you want to have the biggest value possible! 💪`;
};

// player chosen number

let playersSelectedNum = function (playersInput) {
  let playersNumber = ``;

  if (playersInput == 1) {
    playersNumber = Number(String(diceRollData[0]) + String(diceRollData[1]));
  }
  if (playersInput == 2) {
    playersNumber = Number(String(diceRollData[1]) + String(diceRollData[0]));
  }
  playersChosenNumber.push(playersNumber);
  diceRollData = [];
  return playersNumber;
};

// compare players chosen number

// ==== MAIN FUNCTION ==== //

let main = function (input) {
  let output = ``;
  if (gameState == GAME_STATE_DICE_ROLL) {
    // run dice roll twice
    output = randomDiceRoll();
    gameState = GAME_STATE_CHOOSE_NUMBER;
    return output;
  } else if (gameState == GAME_STATE_CHOOSE_NUMBER) {
    // if player does not enter the right input
    if (input != 1 && input != 2) {
      return `Please enter either "1" or "2" to decide which dice number comes first.`;
    } else {
      let playersChoice = playersSelectedNum(input);
      output = `Interesting... 👀 <br /><br />Player 1, you have chosen to form the number: ${playersChoice}`;

      console.log(`chosen number order:`, playersChoice);
    }
  }
  return output;
};
