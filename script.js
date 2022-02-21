// Game logic: Player 1 roll dice -> Player 1 choose dice order -> Player 2 roll dice -> Player 2 choose dice order. Store choices and compare to determine winner.

//Game modes: instructions, player 1 generate dice rolls, player 1 choose dice order, player 2 generate dice rolls, player 2 choose dice order, choose winner
//Functions: generate dice rolls, choose dice order, determine winner

//Storing game modes in variables to minimize typo
var gameMode = "player 1 dice roll";
var PLAYER1DICEROLL = "player 1 dice roll";
var PLAYER1CHOOSEDICEORDER = "player 1 choose order of dice number";
var PLAYER2DICEROLL = "player 2 dice roll";
var PLAYER2CHOOSEDICEORDER = "player 2 choose order of dice number";
var CHOOSEWINNER = "choose winner";
var SUMMARY = "summary";
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

//If input = Dice 1, output = Dice 1 + Dice 2 (string)
//If input = Dice 2, output = Dice 2 + Dice 1 (string)
var generateDiceOrder = function (input) {
  if (input == "Dice 1") {
    console.log("diceRoll1", diceRoll1);
    console.log("diceRoll2", diceRoll2);
    var combinedNum = diceRoll1 + "" + diceRoll2;
    console.log("combined num", combinedNum);
    return combinedNum;
  }
  if (input == "Dice 2") {
    var combinedNum = diceRoll2 + "" + diceRoll1;
    console.log("combined num", combinedNum);
    return combinedNum;
  }
};

//If Player 1 > Player 2, Player 1 wins. score +1
//If Player 2 > Player 1, Player 2 wins. score +1
var determineWinner = function () {
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

//Run all game modes in main function.
var main = function (input) {
  var myOutputValue = "";

  //Player 1 rolls dice first. Roll the dices, and change game mode. No input. Output the dice roll numbers and ask player to choose order.
  if (gameMode == PLAYER1DICEROLL) {
    diceRoll1 = generateDiceRoll();
    diceRoll2 = generateDiceRoll();
    console.log("diceRoll1", diceRoll1);
    console.log("diceRoll2", diceRoll2);
    gameMode = PLAYER1CHOOSEDICEORDER;
    myOutputValue =
      "You have rolled " +
      diceRoll1 +
      " and " +
      diceRoll2 +
      ". <br><br>" +
      "Please choose 'Dice 1' or 'Dice 2' to be the first numeral of your combined number";

    //Player 1 choose order. Input = Dice 1 / Dice 2, put in array, change game mode. Output the choice and the array.
  } else if (gameMode == PLAYER1CHOOSEDICEORDER) {
    var diceOrder = generateDiceOrder(input);
    player1CombiArray.push(diceOrder);
    gameMode = PLAYER2DICEROLL;
    myOutputValue =
      "You have chosen " +
      input +
      " to be the first numeral. Your combined number is " +
      diceOrder +
      ". <br><br>" +
      "Player 1: " +
      player1CombiArray +
      "<br><br>" +
      "Please click submit again for player 2 to roll the dice.";

    //Repeat for Player 2 roll dices
  } else if (gameMode == PLAYER2DICEROLL) {
    diceRoll1 = generateDiceRoll();
    diceRoll2 = generateDiceRoll();
    console.log("diceRoll1", diceRoll1);
    console.log("diceRoll2", diceRoll2);
    gameMode = PLAYER2CHOOSEDICEORDER;
    myOutputValue =
      "You have rolled " +
      diceRoll1 +
      " and " +
      diceRoll2 +
      ". <br><br>" +
      "Please choose 'Dice 1' or 'Dice 2' to be the first numeral of your combined number";

    //Repeat for Player 2 choose order. But determine the winner here!
  } else if (gameMode == PLAYER2CHOOSEDICEORDER) {
    var diceOrder = generateDiceOrder(input);
    player2CombiArray.push(diceOrder);
    var winner = determineWinner(gameRound);
    gameMode = SUMMARY;
    myOutputValue =
      "You have chosen " +
      input +
      " to be the first numeral. Your combined number is " +
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
