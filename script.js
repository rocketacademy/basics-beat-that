// 2 Players - game mode player 1 and game mode player 2
// player 1 click submit - roll 2 dice.
// player choose first dice  - first + second dice = final number. Eg. 3 + 1 => 31
// player 2 turn
// compare both dice and determine winner

// Modes: DICE_ROLL, DICE_ORDER_SELECTION, COMPARE_FINAL_DICES
var gamemode = "DICE_ROLL";
// currentPlayer: 1 or 2
var currentPlayer = 1;

// Keeps track of different player final dice
var playerDiceRolls = [];
var playerDiceScore = [0, 0, 0];

// Refactor this
var currentPlayerFinalDice = "";

var main = function (input) {
  if (gamemode == "DICE_ROLL") {
    getTwoRandomDice();
    console.log(`Control Flow: Dice roll is ${playerDiceRolls}`);
    return `Player ${currentPlayer} choose which order: first or second`;
  }

  if (gamemode == "DICE_ORDER_SELECTION") {
    // diceOutput gives the combined value
    var diceOutput = selectDiceOrder(input);
    console.log(`Current leaderboard : ${playerDiceScore}`);
    // reset dice roll for next player
    playerDiceRolls = [];
    console.log(playerDiceScore);
    console.log(`Current game mode is ${gamemode}`);
    return checkRemainingPlayers(diceOutput);
  }
  if (gamemode == "COMPARE_FINAL_DICES") {
    reset();
    return compareDiceNumber(playerDiceScore[1], playerDiceScore[2]);
  }
};

// check if all players have roll their dices
var checkRemainingPlayers = function (diceOutput) {
  if (currentPlayer < 2) {
    var output = `Player ${currentPlayer} dice is ${diceOutput}. Next player turn!`;
    gamemode = "DICE_ROLL";
    currentPlayer += 1;
    return output;
  } else {
    gamemode = "COMPARE_FINAL_DICES";
    return `Player ${currentPlayer} dice is ${diceOutput}. Comparing results...`;
  }
};

// reset game
var reset = function () {
  gamemode = "DICE_ROLL";
  currentPlayer = 1;
  playerDiceRolls = [];
};

// generate random dice
var getRandomDice = function () {
  return Math.floor(Math.random() * 6) + 1;
};

// refactor for DICE_ROLL gamestate
var getTwoRandomDice = function () {
  playerDiceRolls.push(getRandomDice());
  playerDiceRolls.push(getRandomDice());
  gamemode = "DICE_ORDER_SELECTION";
  return playerDiceRolls;
};

// refactor for DICE_ORDER_SELECTION
var selectDiceOrder = function (input) {
  if (input == "first") {
    currentPlayerFinalDice = Number(
      String(playerDiceRolls[0]) + String(playerDiceRolls[1])
    );
    console.log(`Player 1 final dice is ${currentPlayerFinalDice}`);
    playerDiceScore[currentPlayer] += currentPlayerFinalDice;
    return currentPlayerFinalDice;
  } else if (input == "second") {
    currentPlayerFinalDice = Number(
      String(playerDiceRolls[1]) + String(playerDiceRolls[0])
    );
    console.log(`Player 1 final dice is ${currentPlayerFinalDice}`);
    playerDiceScore[currentPlayer] += currentPlayerFinalDice;
    return currentPlayerFinalDice;
  }
};

// Compare 2 players dice and determine the winner.
// 3 possible outcomes
var compareDiceNumber = function (dice1, dice2) {
  if (dice1 > dice2) {
    return `Player 1 Wins! Player 1 has ${dice1} and Player 2 has ${dice2}`;
  } else if (dice1 < dice2) {
    return `Player 2 Wins! Player 1 has ${dice1} and Player 2 has ${dice2}`;
  } else {
    return `Draw! Player 1 has ${dice1} and Player 2 has ${dice2}`;
  }
};
