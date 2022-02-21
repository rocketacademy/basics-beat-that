// Game logic: Player 1 roll dice -> Player 1 choose dice order -> Player 2 roll dice -> Player 2 choose dice order. Store choices and compare to determine winner.

//Game modes: instructions, player 1 generate dice rolls, player 1 choose dice order, player 2 generate dice rolls, player 2 choose dice order, choose winner
//Functions: generate dice rolls, choose dice order, determine winner

//Storing game modes in variables to minimize typo
var gameMode = "choose winning condition";
var CHOOSEWINNINGCONDITION = "choose winning condition";
var PLAYER1DICEROLL = "player 1 dice roll";
var PLAYER2DICEROLL = "player 2 dice roll";
var CHOOSEWINNER = "choose winner";
var SUMMARY = "summary";
var winningCondition = "";
var HIGHERCOMBIWINS = "higher combi wins";
var LOWERCOMBIWINS = "lower combi wins";
var diceRoll1 = 0;
var diceRoll2 = 0;
var gameRound = 0;
var player1CombiArray = [];
var player2CombiArray = [];
var player1Score = 0;
var player2Score = 0;

var generateDiceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal) + 1;
  return randomInteger;
};

//If diceRoll1 > diceRoll2, output = Dice 1 + Dice 2 (string)
//If diceRoll2 > diceRoll1, output = Dice 2 + Dice 1 (string)
var generateHigherDiceOrder = function () {
  if (diceRoll1 >= diceRoll2) {
    var combinedNum = diceRoll1 + "" + diceRoll2;
  }
  if (diceRoll2 >= diceRoll1) {
    var combinedNum = diceRoll2 + "" + diceRoll1;
  }
  return combinedNum;
};

//If diceRoll1 < diceRoll2, output = Dice 1 + Dice 2 (string)
//If diceRoll2 < diceRoll1, output = Dice 2 + Dice 1 (string)
var generateLowerDiceOrder = function () {
  if (diceRoll1 <= diceRoll2) {
    var combinedNum = diceRoll1 + "" + diceRoll2;
  }
  if (diceRoll2 <= diceRoll1) {
    var combinedNum = diceRoll2 + "" + diceRoll1;
  }
  return combinedNum;
};

//If Player 1 > Player 2, Player 1 wins. score +1
//If Player 2 > Player 1, Player 2 wins. score +1
var determineHigherCombiWinner = function () {
  if (
    Number(player1CombiArray[gameRound]) > Number(player2CombiArray[gameRound])
  ) {
    player1Score = player1Score + 1;
    myOutputValue = "Player 1 wins this round!";
    return myOutputValue;
  }
  if (
    Number(player2CombiArray[gameRound]) > Number(player1CombiArray[gameRound])
  ) {
    player2Score = player2Score + 1;
    myOutputValue = "Player 2 wins this round!";
    return myOutputValue;
  }
};

//If Player 1 < Player 2, Player 1 wins. score +1
//If Player 2 < Player 1, Player 2 wins. score +1
var determineLowerCombiWinner = function () {
  if (
    Number(player1CombiArray[gameRound]) < Number(player2CombiArray[gameRound])
  ) {
    player1Score = player1Score + 1;
    myOutputValue = "Player 1 wins this round!";
    return myOutputValue;
  }
  if (
    Number(player2CombiArray[gameRound]) < Number(player1CombiArray[gameRound])
  ) {
    player2Score = player2Score + 1;
    myOutputValue = "Player 2 wins this round!";
    return myOutputValue;
  }
};

//Run all game modes in main function.
//Index shows "Please enter Higher combi or lower combi game mode"
var main = function (input) {
  var myOutputValue = "";

  //Begin with game mode = choose winning condition.
  //No input, Output to inform user of what they chose.
  if (gameMode == CHOOSEWINNINGCONDITION) {
    if (input == HIGHERCOMBIWINS) {
      winningCondition = HIGHERCOMBIWINS;
      myOutputValue =
        "You have chosen for the player with the higher number to win. Click submit to begin rolling the dice.";
    } else if (input == LOWERCOMBIWINS) {
      winningCondition = LOWERCOMBIWINS;
      myOutputValue =
        "You have chosen for the player with the lower number to win. Click submit to begin rolling the dice.";
    }
    gameMode = PLAYER1DICEROLL;

    //Player 1 plays the game (rolls dice, computer auto-generates number according to winning conditions and add to array)
    //No input. Output the dice roll numbers and auto-generated order. CHANGE GAME MODE.
  } else if (gameMode == PLAYER1DICEROLL) {
    diceRoll1 = generateDiceRoll();
    diceRoll2 = generateDiceRoll();
    if (winningCondition == HIGHERCOMBIWINS) {
      var diceOrder = generateHigherDiceOrder();
    } else if (winningCondition == LOWERCOMBIWINS) {
      var diceOrder = generateLowerDiceOrder();
    }
    player1CombiArray.push(diceOrder);
    gameMode = PLAYER2DICEROLL;
    myOutputValue =
      "You have rolled " +
      diceRoll1 +
      " and " +
      diceRoll2 +
      ". <br><br>" +
      "Your lucky number is " +
      diceOrder +
      ". <br><br>" +
      "Player 1: " +
      player1CombiArray +
      "<br>" +
      "Player 2: " +
      player2CombiArray +
      "<br><br>" +
      "Please click submit again for player 2 to roll the dice.";

    //Player 2 plays the game (rolls dice, computer generates number according to winning condition, add to array)
    //Compare Player 1 and Player 2 numbers, determine the winner.
    //No input. Output Player 2 dice roll numbers, auto-generated order and the winner. Change game mode.
  } else if (gameMode == PLAYER2DICEROLL) {
    diceRoll1 = generateDiceRoll();
    diceRoll2 = generateDiceRoll();
    if (winningCondition == HIGHERCOMBIWINS) {
      var diceOrder = generateHigherDiceOrder();
      player2CombiArray.push(diceOrder);
      var winner = determineHigherCombiWinner(gameRound);
    } else if (winningCondition == LOWERCOMBIWINS) {
      var diceOrder = generateLowerDiceOrder();
      player2CombiArray.push(diceOrder);
      var winner = determineLowerCombiWinner(gameRound);
    }
    gameMode = SUMMARY;
    myOutputValue =
      "You have rolled " +
      diceRoll1 +
      " and " +
      diceRoll2 +
      ". <br><br>" +
      "Your lucky number is " +
      diceOrder +
      ". <br><br>" +
      "Player 1: " +
      player1CombiArray +
      "<br>" +
      "Player 2: " +
      player2CombiArray +
      "<br><br>" +
      winner;

    //Summarize the game score and add 1 to game round. Change game mode back to player 1 to keep playing
  } else if (gameMode == SUMMARY) {
    gameRound = gameRound + 1;
    gameMode = PLAYER1DICEROLL;
    myOutputValue =
      "Scores" +
      "<br>" +
      "Player 1: " +
      player1Score +
      "<br>" +
      "Player 2: " +
      player2Score +
      "<br><br>" +
      "Please click Submit again to continue playing.";
  }
  return myOutputValue;
};
