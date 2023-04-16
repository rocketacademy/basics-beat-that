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
let currentPlayerNumber = [];
let allPlayersNumber = [];

// game modes
let GAME_STATE_DICE_ROLL = `player rolls dice`;
let GAME_STATE_CHOOSE_NUMBER = `player chooses number`;
let GAME_STATE_WINNER = `find the winning number`;
let GAME_STATE_RESET = `game restarts`;
let gameState = GAME_STATE_DICE_ROLL;
let currentPlayer = 1;

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

    // add dice roll results into dice roll data array
    diceRollData.push(diceNum);

    output = diceNum;
  }
  let diceNum1 = diceRollData[0];
  let diceNum2 = diceRollData[1];
  return `Hey Player ${currentPlayer}! 👋<br /><br />Here are the numbers you got!<br /><br />🎲 Dice 1 = ${diceNum1}<br />🎲 Dice 2 = ${diceNum2}<br /><br />Choose which dice to form the first number "1" or "2".<br />Remember, you want to have the biggest value possible! 💪`;
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
  currentPlayerNumber.push(playersNumber);
  allPlayersNumber.push(playersNumber);
  diceRollData = [];
  return `Interesting... 👀 <br /><br />Player ${currentPlayer}, you have chosen to form the number: ${playersNumber}`;
};

// compare players chosen number

let winningNumber = function () {
  if (allPlayersNumber[0] < allPlayersNumber[1]) {
    return `🎆Congratulations Player 2 you won! 🎆 <br /><br />${allPlayersNumber[1]} is bigger than ${allPlayersNumber[0]}.`;
  } else if (allPlayersNumber[0] > allPlayersNumber[1]) {
    return `🎆Congratulations Player 1 you won!🎆 <br /><br />${allPlayersNumber[0]} is bigger than ${allPlayersNumber[1]}.`;
  } else {
    return `Wow this is quite rare... But it's a draw! <br /><br />You both got ${allPlayersNumber[0]}.`;
  }
};

// reset game function

let resetGame = function () {
  gameState = GAME_STATE_DICE_ROLL;
  currentPlayer = 1;
  allPlayersNumber = [];
  return `Welcome to Beat That! 🎮
        <br />
        <br />
        📢 How to play 📢
        <br />
        <br />
        Create a two-digit number by selecting the order of your dice rolls.
        <br />
        The player with the highest number wins. Good luck!
        <br />
        <br />
        Awesome! Click submit to start playing. 🙌`;
};

// ==== MAIN FUNCTION ==== //

let main = function (input) {
  let output = ``;
  if (gameState == GAME_STATE_DICE_ROLL) {
    // run dice roll twice
    output = randomDiceRoll();
    gameState = GAME_STATE_CHOOSE_NUMBER;
    return output;

    // player choose number order
  }
  if (gameState == GAME_STATE_CHOOSE_NUMBER) {
    // if player does not enter the right input
    if (input != 1 && input != 2) {
      return `Please enter either "1" or "2" to decide which dice number comes first.`;
    } else {
      output = playersSelectedNum(input);
      // change player
      if (currentPlayer == 1) {
        currentPlayer = 2;
        gameState = GAME_STATE_DICE_ROLL;
        return output + `<br /><br />Get ready Player 2! It's your turn now.`;
      }

      if (currentPlayer == 2) {
        gameState = GAME_STATE_WINNER;
        return (
          output +
          `<br /><br />Now that you both have your number, click submit to see who is the winner! 👀`
        );
      }
    }
  }
  if (gameState == GAME_STATE_WINNER) {
    output = winningNumber();
    gameState = GAME_STATE_RESET;
    return output + `<br /><br />Press click to restart the game!`;
  }
  if (gameState == GAME_STATE_RESET) {
    output = resetGame();
    return output;
  }
};
