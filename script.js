//Game: Beat That!
//2 players, 2 dices
//2 game modes: Each player rolls once and player picks the order of the numbers rolled to get the biggest value
//Player with higher combined number wins
//Calculate number of wins

//2 players
var player1 = "player1";
var player2 = "player2";
var player1DiceRoll = [];
var player2DiceRoll = [];
var player1Number;
var player2Number;

//2 game modes, start with first player
var modeRollDice = "modeRollDice";
var modeChooseDiceOrder = "modeChooseDiceOrder";
var currentPlayer = "player1";

//Game starts with rolling of dice
var gameMode = modeRollDice;

var rollSingleDice = function () {
  return Math.floor(Math.random() * 6) + 1;
};

var rollDiceAndAssign = function () {
  var getDiceNumber = [rollSingleDice(), rollSingleDice()];

  if (currentPlayer === "player1") {
    player1DiceRoll = getDiceNumber;
  } else {
    player2DiceRoll = getDiceNumber;
  }
  return getDiceNumber;
};
var getDiceNumber = rollDiceAndAssign();
console.log("Player 1's dice numbers are", player1DiceRoll);

//Player picks the order of the numbers rolled (1 for first number first, 2 for second number first)
//orderChosen is the user input (1 or 2)

var getPlayerNumber = function (orderChosen) {
  var diceArray;
  if (currentPlayer === "Player 1") {
    diceArray = player1DiceRoll;
  } else {
    diceArray = player2DiceRoll;
  }

  if (orderChosen === 1) {
    playerNumber = combineNumbers(diceArray[0], diceArray[1]);
  } else {
    playerNumber = combineNumbers(diceArray[1], diceArray[0]);
  }

  if (currentPlayer === 1) {
    player1Number = playerNumber;
  } else {
    player2Number = playerNumber;
  }
  return playerNumber;
};
var orderChosen = 1;
var player1Number = getPlayerNumber(orderChosen);
console.log("Player 1's number:", player1Number);
