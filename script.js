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
  return diceNum;
};

// player chosen number

let playerChosenNumber = function (playerInput) {
  if (playerInput == 1) {
    let playerString1 = String(playerRolls[0]) + String(playerRolls[1]);
    let playerNumber1 = Number(playerString1);
    return `You chose to go with this number combination: ${playerNumber1}`;
  }
  if (playerInput == 2) {
    let playerString2 = String(playerRolls[1]) + String(playerRolls[0]);
    let playerNumber2 = Number(playerString2);
    return `Interesting... 👀 <br /><br />You have chosen to form the number: ${playerNumber2}`;
  }
};

// ==== MAIN FUNCTION ==== //
let main = function (input) {
  let output = ``;
  if (gameSate == `GAME_STATE_DICE_ROLL`) {
    // roll dice twice
    for (let i = 0; i < 2; i = i += 1) {
      let DiceNum1 = randomDiceRoll();
      let DiceNum2 = randomDiceRoll();
      // push dice numbers in player array
      playerRolls.push(DiceNum1, DiceNum2);
    }

    // change game mode
    gameSate = `CHOOSE NUMBER ORDER`;

    return `✨ Here are the numbers you got! ✨ <br /><br />🎲 Dice 1 = ${playerRolls[0]} <br />🎲 Dice 2 = ${playerRolls[1]} <br /><br />Choose which dice to form the first number "1" or "2".`;
  } else if (gameSate == `CHOOSE NUMBER ORDER`) {
    output = playerChosenNumber(input);
    return output;
  }
};
