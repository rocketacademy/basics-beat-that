//for the programme to store player 1 dice roll
var player1DICEROLL = [];

//for the programme to store player 2 dice roll
var player2DICEROLL = [];

//game modes
var mode_DICE_ROLL = "mode_DICE_ROLL";
var mode_DICE_ORDER = "mode_CHOOSE_DICE_ORDER";

//initialising game mode
var gameMode = mode_DICE_ROLL;

//to set player number
var currentPlayer;

//initialising game to start with dice roll mode
var gameMode = mode_DICE_ROLL;

//programme to produce random dice numbers
var randomDiceNumber = function () {
  return Math.ceil(Math.random() * 6);
};

//to set current player with Dice Roll
var playerDiceRolls = function () {
  console.log("worked");
  //Assigning dice rolls to player
  //if player = 1
  if (currentPlayer == 1) {
    player1DICEROLL = [randomDiceNumber(), randomDiceNumber()];
    console.log(player1DICEROLL);
  }
  //if player != 1, it is player 2
  else {
    player2DICEROLL = [randomDiceNumber(), randomDiceNumber()];
    console.log(player2DICEROLL);
  }
};

var main = function (input) {
  //if input = start, game mode = mode dice roll
  if (input == "start") {
    gameMode = mode_DICE_ROLL;
    return "Please input '1' if you are Player 1 or '2' if you are Player 2.";
  }

  //if input = 1, game mode = mode dice roll and to start roll dice for player 1
  if (gameMode == mode_DICE_ROLL && input == "1") {
    console.log("1");
    currentPlayer = 1;
    playerDiceRolls();
    gameMode = mode_DICE_ORDER;
    return (
      "Welcome Player " +
      currentPlayer +
      "." +
      "<br> <br>" +
      "You rolled Dice 1: " +
      player1DICEROLL[0] +
      " and Dice 2: " +
      player1DICEROLL[1] +
      "<br> <br>" +
      "Would you like to reorder your Dice Number? (Yes/No)"
    );
  }

  //if input = 2, game mode = mode dice roll and to start roll dice for player 2
  if (gameMode == mode_DICE_ROLL && input == "2") {
    console.log("2");
    currentPlayer = 2;
    playerDiceRolls();
    gameMode = mode_DICE_ORDER;
    return (
      "Welcome Player" +
      currentPlayer +
      "." +
      "<br> <br>" +
      "You rolled Dice 1: " +
      player2DICEROLL[0] +
      " and Dice 2: " +
      player2DICEROLL[1] +
      "<br> <br>" +
      "Would you like to reorder your Dice Number? (Yes/No)"
    );
  }

  //game mode reorder dice
  if (gameMode == mode_DICE_ORDER) {
    gameMode = mode_DICE_ROLL; //to change game mode for player 2 to play

    if (currentPlayer == 1) {
      diceroll = player1DICEROLL; //because its only in this 'if', we dont have to initialise as a global variable //player1DICEROLL to retrieve value from array
    } else if (currentPlayer == 2) {
      diceroll = player2DICEROLL;
    }

    if (input == "Yes") {
      temp = diceroll[0]; //to swap positions of the data inside the array
      diceroll[0] = diceroll[1];
      diceroll[1] = temp;
    }

    if (player1DICEROLL.length > 0 && player2DICEROLL.length > 0) {
      return (
        "your final result is " +
        diceroll[0] +
        diceroll[1] +
        "<br><br>" +
        "press submit to determine the winner"
      );
    } else {
      return (
        "the final result is " +
        diceroll[0] +
        diceroll[1] +
        "<br><br>" +
        "please input the next player number to roll their dice."
      );
    }
  }

  if (
    gameMode == mode_DICE_ROLL &&
    player1DICEROLL.length > 0 &&
    player2DICEROLL.length > 0
  ) {
    //winning variables
    winner = ""; //to intialise empty string

    player1Result = player1DICEROLL.join((seperator = " ")); //to join and remove separator
    player2Result = player2DICEROLL.join((seperator = " "));
    if (player1Result > player2Result) {
      winner = "player 1 wins";
    } else if (player2Result > player1Result) {
      winner = "player 2 wins";
    } else {
      winner = "it's a tie!";
    }

    player1DICEROLL = [];
    player2DICEROLL = [];

    return (
      "Player 1 has rolled " +
      player1Result +
      " Player 2 has rolled " +
      player2Result +
      "<br><br>" +
      winner +
      "<br><br>" +
      "to restart the game again, input again player number."
    );
  }
};
