// requirements
//1. There are 2 players and players take turns.
// 2. When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// 3. The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// 4. After both players have rolled and chosen dice order, the player with the higher combined number wins.

var gameMode1 = "p1 roll dice";
var gameMode2 = "p2 roll dice";
var gameMode3 = "p1 choose order";
var gameMode4 = "p2 choose order";
var gameMode5 = "Compare highest number";
var currentGameMode = gameMode1;
var p1DiceRolls;
var p2DiceRolls;
var diceRollArraysP1 = [];
var diceRollArraysP2 = [];
var player1selection = 0;
var player2selection = 0;
var player1score = 0;
var player2score = 0;

var main = function (input) {
  var myOutputValue = "";
  // p1 rolls the dice
  if (currentGameMode == gameMode1) {
    console.log("p1 rolls dice");
    p1DiceRolls = player1DiceRoll();
    myOutputValue =
      "Player 1: " +
      p1DiceRolls +
      ". <br>Input 1 to maintain dice order or 2 to flip it.";
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
      ". <br><br>Input 1 to maintain dice order or 2 to flip it." +
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
    var scoreboard = getScoreboard();
    console.log("determine current round winner");
    // p1 win
    if (player1selection > player2selection) {
      player1score += 1;
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
      player2score += 1;
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
    if (input == "") {
      currentGameMode = gameMode1;
    } // reset stored dice rolls and player selection
    if (currentGameMode == gameMode1) {
      diceRollArraysP1 = [];
      diceRollArraysP2 = [];
      player1selection = 0;
      player2selection = 0;
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

// scores in decreasing order
var getScoreboard = function () {
  var message = "";
  if (player1score < player2score) {
    message =
      "<br><br>Scoreboard: " +
      "<br> 1: Player 1 - " +
      player1score +
      "<br> 2: Player 2 - " +
      player2score;
  }
  if (player2score < player1score) {
    message =
      "<br><br>Scoreboard: " +
      "<br> 1: Player 2 - " +
      player2score +
      "<br> 2: Player 1 - " +
      player1score;
  }
  if (player1score == player2score) {
    message =
      "<br><br>Scoreboard: " + "<br>Player 1 and 2 both scored " + player1score;
  }
  if (player1score == 0 && player2score == 0) {
    message = "<br>This is the first game. Continue playing to see scoreboard.";
  }
  return message;
};
