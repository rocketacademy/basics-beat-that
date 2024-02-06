// ===== REQUIREMENTS ===== //
// There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.

// problem brakdown and planning //
// ver 1. rolls 2 dice and turns the output for player 1. Player 1 chooses the dice order and get the correct return output.
// ver 2. refectored code to include player 2
//      - global variables for currentPlayer; allPlayerScore
//      - refactor outputMessages to interract with each player, 1 and 2
//      - write logic for player 1 to go first then player 2, and finally point towards comparing score

// ver 3. implement comparing dice scores and declare winner
// ver 4. reset the game so the players can play continually without refreshing the page

// global variables
var gameMode1 = "p1 roll dice";
var gameMode2 = "p2 roll dice";
var gameMode3 = "p1 choose order";
var gameMode4 = "p2 choose order";
var gameMode5 = "Compare largest number";
var currentGameMode = gameMode1;
var p1DiceRolls;
var p2DiceRolls;
var diceRollArraysP1 = [];
var diceRollArraysP2 = [];
var player1selection = [];
var player2selection = [];
var player1score = [];
var player2score = [];

// main
var main = function (input) {
  var myOutputValue = "";
  // p1 rolls the dice
  if (currentGameMode == gameMode1) {
    console.log("p1 rolls dice");
    p1DiceRolls = player1DiceRoll();
    myOutputValue =
      "Player 1: " +
      p1DiceRolls +
      ". <br>Input 1 to keep dice order or 2 to invert it.";
    currentGameMode = gameMode3;
    //p1 choose dice order
  } else if (currentGameMode == gameMode3) {
    console.log("p1 choose order");
    if (input == 1) {
      // store p1 selection
      player1selection = Number(
        String(diceRollArraysP1[0]) + String(diceRollArraysP1[1])
      );
      myOutputValue =
        "Player 1: You selected " +
        diceRollArraysP1[0] +
        diceRollArraysP1[1] +
        "<br>Please type 'p2' for Player 2 dice rolls.";
    }
    if (input == 2) {
      // store p1 selection
      player1selection = Number(
        String(diceRollArraysP1[1]) + String(diceRollArraysP1[0])
      );
      myOutputValue =
        "Player 1, you selected " +
        diceRollArraysP1[1] +
        diceRollArraysP1[0] +
        "<br>Please type 'p2' for Player 2 dice rolls.";
    }
  }
  // initiate p2 dice roll by making p1 type p2
  if (input == "p2") {
    currentGameMode = gameMode2;
  } //p2 rolls dice
  if (currentGameMode == gameMode2) {
    console.log("p2 rolls dice");
    p2DiceRolls = player2DiceRoll();
    myOutputValue =
      "Player 2: " +
      p2DiceRolls +
      ". <br><br>Input 1 to keep dice order or 2 to invert it." +
      "<br><br> Player 1 selection: " +
      player1selection;
    //switch mode for p2 to choose dice order
    currentGameMode = gameMode4;
    console.log("p2 choose order");
  } else if (currentGameMode == gameMode4) {
    if (input == 1) {
      // store p2 selection
      player2selection = Number(
        String(diceRollArraysP2[0]) + String(diceRollArraysP2[1])
      );
      myOutputValue =
        "Player 2, you selected " +
        diceRollArraysP2[0] +
        diceRollArraysP2[1] +
        "<br>Click submit to see results ~" +
        "<br><br> Player 1 selection: " +
        player1selection;
    }
    if (input == 2) {
      // store p2 selection
      player2selection = Number(
        String(diceRollArraysP2[1]) + String(diceRollArraysP2[0])
      );
      myOutputValue =
        "Player 2, you selected " +
        diceRollArraysP2[1] +
        diceRollArraysP2[0] +
        "<br>Click submit to see results ~";
      +"<br><br> Player 1 selection: " + player1selection;
    }
    if (input == "" || isNaN(input) == true) {
      myOutputValue = 'Sorry, please enter "1" or "2".';
    }
    // switch to last game mode to determine winner
    if (input == "") {
      currentGameMode = gameMode5;
    }
  }

  if (currentGameMode == gameMode5) {
    var scoreboard = getScoreBoard();
    console.log("determine current round winner");
    // p1 win
    if (player1selection > player2selection) {
      myOutputValue =
        "Player 1 wins! <br><br> Player 1 entry: " +
        player1selection +
        "<br> Player 2 entry: " +
        player2selection +
        "<br><br> Click submit to play again!" +
        scoreboard;
    }
    // p2 win
    if (player1selection < player2selection) {
      myOutputValue =
        "Player 2 wins! <br><br> Player 1 entry: " +
        player1selection +
        "<br> Player 2 entry: " +
        player2selection +
        "<br><br> Click submit to play again!" +
        scoreboard;
    }
    // tie result
    if (player1selection == player2selection) {
      myOutputValue =
        "Its a tie!<br><br> Player 1 entry: " +
        player1selection +
        "<br> Player 2 entry: " +
        player2selection +
        "<br><br> Click submit to play again!" +
        scoreboard;
    }
    // restart game without refreshing
    currentGameMode = gameMode1;
    if (input == "") {
      currentGameMode = gameMode1;
      if (currentGameMode == gameMode1) {
        diceRollArraysP1 = [];
        diceRollArraysP2 = [];
        player1selection = [];
        player2selection = [];
      }
    }
  }

  return myOutputValue;
};

var randomDiceRoll = function () {
  var diceRoll = Math.floor(Math.random() * 6) + 1;
  return diceRoll;
};

var player1DiceRoll = function () {
  var counter = 0;
  var diceRoll = randomDiceRoll;
  while (counter < 2) {
    diceRollArraysP1.push(diceRoll());
    counter += 1;
  }
  return (
    "Your dice rolls are " +
    '"' +
    diceRollArraysP1[0] +
    '"' +
    " and " +
    '"' +
    diceRollArraysP1[1] +
    '"'
  );
};

var player2DiceRoll = function () {
  var counter = 0;
  var diceRoll = randomDiceRoll;
  while (counter < 2) {
    diceRollArraysP2.push(diceRoll());
    counter += 1;
  }
  return (
    "Your dice rolls are " +
    '"' +
    diceRollArraysP2[0] +
    '"' +
    " and " +
    '"' +
    diceRollArraysP2[1] +
    '"'
  );
};

// Scoreboard
var getScoreBoard = function () {
  var myOutputValue = "";
  if (player1score > player2score) {
    myOutputValue =
      "<br><br>Scoreboard: " +
      "<br> Player 1 -> " +
      player1score +
      "<br> Player 2 -> " +
      player2score;
  }
  if (player2score > player1score) {
    myOutputValue =
      "<br><br>Scoreboard: " +
      "<br> Player 2 -> " +
      player2score +
      "<br> Player 1 -> " +
      player1score;
  }
  if (player2score == player1score) {
    myOutputValue =
      "<br><br>Scoreboard: " +
      "It's a draw!" +
      "<br> Player 1 and Player 2 score: " +
      player1score;
  }
  return myOutputValue;
};
