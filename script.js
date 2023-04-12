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

let gameSate = `GAME_STATE_DICE_ROLL`;

let playerRolls = [];

// ==== HELPER FUNCTION ==== //

// random dice number from 1-6
let randomDiceRoll = function () {
  let randomNum = Math.random() * 6;
  let randomInteger = Math.floor(randomNum);
  let diceNum = randomInteger + 1;
  console.log(`randomDiceRoll output:`, diceNum);
  return diceNum;
};

// ==== MAIN FUNCTION ==== //
let main = function (input) {
  let output = ``;
  if (gameSate == `GAME_STATE_DICE_ROLL`) {
  }
};
