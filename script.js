// 1. start the game
var gameMode = "start";

// 2. store player 1 and player 2 rolls in the array
var player1Rolls = [];
var player2Rolls = [];

// 3. store the choice for player 1
var player1Choice = undefined;

//4.Roll the dice
var rollDice = function () {
  return Math.floor(Math.random() * 6) + 1;
};

//5. Get the dice rolls from player
var getPlayerRolls = function () {
  return [rollDice(), rollDice()];
};

//6. to Store Player 1 and Player 2 Rolls
var player1Rolls = getPlayerRolls();
var player2Rolls = getPlayerRolls();

//7. To return player 1 choice
var getPlayer1Choice = function (input) {
  if (input == 1) {
    player1Choice = Number(
      player1Rolls[0].toString() + player1Rolls[1].toString()
    );
    // to activate the storing of choice of player 1
    return player1Choice;
  } else if (input == 2) {
    player1Choice = Number(
      player1Rolls[1].toString() + player1Rolls[0].toString()
    );
    return player1Choice;
  } else {
    return `Please key the correct dice Numbers:1 or 2.`;
  }
};

//8. To return player 2 choice
var getPlayer2Choice = function (input) {
  if (input == 1) {
    return Number(player2Rolls[0].toString() + player2Rolls[1].toString());
  } else if (input == 2) {
    return Number(player2Rolls[1].toString() + player2Rolls[0].toString());
  }
};

var main = function (input) {
  if (gameMode == "start") {
    // to initiate the next game mode if the current mode is fulfilled
    gameMode = "player1rolls";
    return `Welcome to Beat That! 
  <br> Player 1, please cilck roll to start the game.`;
  } else if (gameMode == `player1rolls`) {
    gameMode = "player1Choice";
    return `Player 1, you have rolled ${player1Rolls[0]} for Dice 1 and ${player1Rolls[1]} for Dice 2.
    <br> Please choose Dice 1 or Dice 2 as the first numeral of the combined number.`;
  } else if (gameMode == `player1Choice`) {
    if (input != 1 && input != 2) {
      return `Please key the correct dice numbers - 1 or 2. `;
    } else getPlayer1Choice(input);
    // after player 1 choice, move on to the next game mode
    gameMode = "player2Rolls";
    return `You chose ${input} and your number is ${player1Choice}. 
    <br>Player 2, it is your turn to roll.`;
  } else if (gameMode == "player2Rolls") {
    gameMode = "player2Choice";
    return `Player 2, you have rolled ${player2Rolls[0]} for Dice 1 and ${player2Rolls[1]} for Dice 2.
    <br> Please choose Dice 1 or Dice 2 as the first numeral of the combined number.`;
  } else if (gameMode == `player2Choice`) {
    if (input != 1 && input != 2) {
      return `Please key the correct dice numbers - 1 or 2. `;
    } else gameMode = "start";
    var player2Choice = getPlayer2Choice(input);
    if (player1Choice > player2Choice) {
      return `Player 1, your number is ${player1Choice}. Player 2, your number is ${player2Choice}.
    <br> Player 1 has won!!
    <br><br>Please click roll to restart game.`;
    } else
      return `Player 1, your number is ${player1Choice}. Player 2, your number is ${player2Choice}.
  <br> Player 2 has won!!
  <br><br>Please click roll to restart game.`;
  }
};
