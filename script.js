//for the programme to store player 1 dice roll
var player1DICEROLL = [];

//for the programme to store player 2 dice roll
var player2DICEROLL = [];

//programme to produce random dice numbers
var randomDiceNumber = function () {
  return Math.ceil(Math.random() * 6);
};

//game modes
var mode_DICE_ROLL = "mode_DICE_ROLL";
var mode_DICE_ORDER = "mode_CHOOSE_DICE_ORDER";

//to set player number
var currentPlayer = 1;

//initialising game to start with dice roll mode
var gameMode = mode_DICE_ROLL;

//to set current player with Dice Roll
var playerDiceRolls = function () {
  console.log("worked");
  playerDiceRolls = [randomDiceNumber(), randomDiceNumber()];
  //Assigning dice rolls to player
  //if player = 1
  if (currentPlayer == 1) {
    player1DICEROLL.push(playerDiceRolls);
    console.log(player1DICEROLL);
  }
  //if player != 1, it is player 2
  else {
    currentPlayer == 2;
    player2DICEROLL.push(playerDiceRolls);
    console.log(player2DICEROLL);
  }
};

var main = function (input) {
  //if input = start, game mode = mode dice roll
  if (input == "start") {
    var gameMode = mode_DICE_ROLL;
    return "Please input '1' if you are Player 1 or '2' if you are Player 2.";
  }

  //if input = 1, game mode = mode dice roll and to start roll dice for player 1
  if (input == "1") {
    console.log("1");
    currentPlayer == 1;
    var player1DICEROLLGAMEMODE = randomDiceNumber();
    var p1GameMode = playerDiceRolls(player1DICEROLLGAMEMODE);
    return (
      "Welcome Player " +
      currentPlayer +
      "." +
      "<br> <br>" +
      "You rolled Dice 1: " +
      player1DICEROLL[0] +
      " and Dice 2: " +
      player1DICEROLL[1]
    );
  }

  //if input = 2, game mode = mode dice roll and to start roll dice for player 2
  if (input == "2") {
    console.log("2");
    currentPlayer == 2;
    var player2DICEROLLGAMEMODE = randomDiceNumber();
    var p2GameMode = playerDiceRolls(player2DICEROLLGAMEMODE);
    return (
      "Welcome Player" +
      currentPlayer +
      "." +
      "<br> <br>" +
      "You rolled Dice 1: " +
      player2DICEROLL[0] +
      " and Dice 2: " +
      player2DICEROLL[1]
    );
  }
};
