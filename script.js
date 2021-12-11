// There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.

// Mode switch between two players.
const PLAYER_1 = "player 1";
const PLAYER_2 = "player 2";
const DISPLAY_DICE_MODE = "display dice";
const CHOOSE_DICE_COMBI = "choose dice combination";
const COMPARE_RESULT_MODE = "check who win";
const HIGHEST_COMBI_MODE = "high";
const LOWEST_COMBI_MODE = "low";
let gameMode = DISPLAY_DICE_MODE;
let whosTurn = PLAYER_1;
// temporary holder for the dice rolled each turn.
let tempDiceHolder = [];
//Container for the number combination players chose.
let player1DiceCombi = [];
let player2DiceCombi = [];
// Keep total score for each player.
let player1TotalScore = 0;
let player2TotalScore = 0;

// helper function
const diceRoll = function () {
  // round up to the next largest integer
  let randomDiceNumber = Math.ceil(Math.random() * 6);
  return randomDiceNumber;
};

const displayDice = function () {
  let dice1 = diceRoll();
  let dice2 = diceRoll();
  let message = "";
  tempDiceHolder = [];
  tempDiceHolder.push(dice1, dice2);
  message = `You rolled ${dice1} and ${dice2}`;
  console.log("dice 1");
  console.log(dice1);
  console.log("dice 2");
  console.log(dice2);
  console.log("game mode");
  console.log(gameMode);
  return message;
};

const combineDice = function (mode) {
  let playerNumberComb = "";
  switch (mode) {
    case HIGHEST_COMBI_MODE:
      if (tempDiceHolder[0] > tempDiceHolder[1]) {
        playerNumberComb = tempDiceHolder[0] * 10 + tempDiceHolder[1];
      } else {
        playerNumberComb = tempDiceHolder[1] * 10 + tempDiceHolder[0];
      }
      break;
    case LOWEST_COMBI_MODE:
      if (tempDiceHolder[0] > tempDiceHolder[1]) {
        playerNumberComb = tempDiceHolder[1] * 10 + tempDiceHolder[0];
      } else {
        playerNumberComb = tempDiceHolder[0] * 10 + tempDiceHolder[1];
      }
      break;
  }
  return playerNumberComb;
};

const checkWhoWin = function () {
  let message = "";
  if (player1DiceCombi[0] > player2DiceCombi[0]) {
    message = `Player 1's number is ${player1DiceCombi[0]}. <br> Player 2's number is ${player2DiceCombi[0]}. <br> Player 1 win!`;
  } else {
    message = `Player 1's number is ${player1DiceCombi[0]}. <br> Player 2's number is ${player2DiceCombi[0]}. <br>Player 2 win!`;
  }
  return message;
};

const resetGame = function () {
  //gameMode = DISPLAY_DICE_MODE;
  whosTurn = PLAYER_1;
  player1DiceCombi = [];
  player2DiceCombi = [];
};

const leaderBoard = function (mode) {
  message = "";
  switch (mode) {
    case HIGHEST_COMBI_MODE:
      if (player1TotalScore > player2TotalScore) {
        message = `Leaderboard <br> Player 1 is Leading!🎉 <br> Player 1: ${player1TotalScore} <br> Player 2: ${player2TotalScore} <br> Press submit to continue to play`;
      } else {
        message = `Leaderboard <br> Player 2 is Leading!🎉 <br> Player 2: ${player2TotalScore} <br> Player 1: ${player1TotalScore} <br> Press submit to continue to play`;
      }
      break;
    case LOWEST_COMBI_MODE:
      if (player1TotalScore > player2TotalScore) {
        message = `Leaderboard <br> Player 2 is Leading!🎉 <br> Player 2: ${player2TotalScore} <br> Player 1: ${player1TotalScore} <br> Press submit to continue to play`;
      } else {
        message = `Leaderboard <br> Player 1 is Leading!🎉 <br> Player 1: ${player1TotalScore} <br> Player 2: ${player2TotalScore} <br> Press submit to continue to play`;
      }
      break;
  }
  return message;
};

const switchGameMode = function (userInput) {
  switch (userInput) {
    case "high":
      gameMode = HIGHEST_COMBI_MODE;
      break;
    case "low":
      gameMode = LOWEST_COMBI_MODE;
      break;
  }
};

var main = function (input) {
  let myOutputValue = "";
  var input = input.toLowerCase().trim();
  //input validation for choosing game mode: "High or Low"
  let correctMode = ["high", "low"];
  if (correctMode.includes(input)) {
    switchGameMode(input);
    console.log("input");
    console.log(input);
    console.log("gamemode");
    console.log(gameMode);
  } else if (gameMode == HIGHEST_COMBI_MODE) {
    if (whosTurn == PLAYER_1) {
      let player1Roll = displayDice();
      player1DiceCombi.push(combineDice(gameMode));
      player1TotalScore += player1DiceCombi[0];
      whosTurn = PLAYER_2;
      myOutputValue = `Welcome Player 1! <br> ${player1Roll}. <br> <br> Your number combination is ${player1DiceCombi}. <br> <br> ${leaderBoard(
        gameMode
      )} <br> It is now Player 2's turn.`;
    } else if (whosTurn == PLAYER_2) {
      let player2Roll = displayDice();
      player2DiceCombi.push(combineDice(gameMode));
      player2TotalScore += player2DiceCombi[0];
      console.log("player 2 dice combi");
      console.log(player2DiceCombi);
      myOutputValue = `Welcome Player 2! <br> ${player2Roll}. <br> <br> Your number combination is ${player2DiceCombi}. <br> <br> ${leaderBoard(
        gameMode
      )} <br> It is now Player 1's turn.`;
      resetGame();
    }
  } else if (gameMode == LOWEST_COMBI_MODE) {
    if (whosTurn == PLAYER_1) {
      let player1Roll = displayDice();
      player1DiceCombi.push(combineDice(gameMode));
      player1TotalScore += player1DiceCombi[0];
      whosTurn = PLAYER_2;
      myOutputValue = `Welcome Player 1! <br> ${player1Roll}. <br> <br> Your number combination is ${player1DiceCombi}. <br> <br> ${leaderBoard(
        gameMode
      )} <br> It is now Player 2's turn.`;
    } else if (whosTurn == PLAYER_2) {
      let player2Roll = displayDice();
      player2DiceCombi.push(combineDice(gameMode));
      player2TotalScore += player2DiceCombi[0];
      console.log("player 2 dice combi");
      console.log(player2DiceCombi);
      myOutputValue = `Welcome Player 2! <br> ${player2Roll}. <br> <br> Your number combination is ${player2DiceCombi}. <br> <br> ${leaderBoard(
        gameMode
      )} <br> It is now Player 1's turn.`;
      resetGame();
    }
  } else {
    return (myOutputValue =
      "Please choose game mode: <br> Highest combined number mode enter: high <br> Lowest combined number mode enter: low");
  }
  // ---- BASE GAME ----
  // if it is player one turn, dice numbers to be displayed and player to choose the dice combination.
  // if (whosTurn == PLAYER_1 && gameMode == DISPLAY_DICE_MODE) {
  //   return (myOutputValue = `Welcome Player 1! <br> ${displayDice()} <br> Choose the order of the dice.`);
  // }
  // if (whosTurn == PLAYER_1 && gameMode == CHOOSE_DICE_COMBI) {
  //   //input validation to ask player to enter either 1 or 2.
  //   const correctInput = ["1", "2"];
  //   if (correctInput.includes(input)) {
  //     player1DiceCombi.push(combineDice(LOWEST_COMBI_MODE));
  //     gameMode = DISPLAY_DICE_MODE;
  //     whosTurn = PLAYER_2;
  //     return (myOutputValue = `Player 1, you chose Dice ${input} first. <br> Your number combination is ${player1DiceCombi}. <br> It is now Player 2's turn.`);
  //   } else {
  //     return (myOutputValue =
  //       "Please choose your number combination by entering 1 for Dice 1 first and 2 for Dice 2 first.");
  //   }
  // }

  // if (whosTurn == PLAYER_2 && gameMode == DISPLAY_DICE_MODE) {
  //   return (myOutputValue = `Welcome Player 2! <br> ${displayDice()} <br> Choose the order of the dice.`);
  // }
  // if (whosTurn == PLAYER_2 && gameMode == CHOOSE_DICE_COMBI) {
  //   const correctInput = ["1", "2"];
  //   if (correctInput.includes(input)) {
  //     player2DiceCombi.push(combineDice(input));
  //     gameMode = COMPARE_RESULT_MODE;
  //     return (myOutputValue = `Player 2, you chose Dice ${input} first. <br> Your number combination is ${player2DiceCombi}. <br> Time to see who win!`);
  //   } else {
  //     return (myOutputValue =
  //       "Please choose your number combination by entering 1 for Dice 1 first and 2 for Dice 2 first.");
  //   }
  // }

  // if (gameMode == COMPARE_RESULT_MODE) {
  //   // add numbers in player dice combination array into total score array.
  //   player1TotalScore += player1DiceCombi[0];
  //   player2TotalScore += player2DiceCombi[0];
  //   // Leaderboard to display

  //   myOutputValue = `${checkWhoWin()} <br> ------------------------------------------ <br> ${leaderBoard()}`;
  //   resetGame();
  // }
  return myOutputValue;
};
