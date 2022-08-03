//rollDice helper function 1 to 6
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};
//global state
var dicesArray1 = [];
var dicesArray2 = [];
var gamemode = "player1RollDice";
var playerResult = [];
var myOutputValue = "";
var playerNumber = 1;

//player1RollDice function
var rollDiceForPlayer = function (rollPlayer) {
  var counter = 0;
  while (counter < 2) {
    rollPlayer.push(rollDice());
    counter = counter + 1;
  }
  var myOutputValue =
    "Welcome Player " +
    playerNumber +
    ". <br> You rolled " +
    rollPlayer[0] +
    " for dice 1 and " +
    rollPlayer[1] +
    " for dice 2. <br> Choose the order of the dices";
  return myOutputValue;
};

//both dices are the same
var rollSameDice = function () {
  if (playerNumber == 1) {
    playerResult[0] = dicesArray1[0] * 10 + dicesArray1[1];
    myOutputValue =
      "Welcome Player " +
      playerNumber +
      ". <br> You rolled " +
      dicesArray1[0] +
      " for dice 1 and " +
      dicesArray1[1] +
      " for dice 2. <br> Your result is " +
      playerResult[0] +
      ". It is now Player's 2 turn. Click submit to roll dices.";
    gamemode = "player2RollDice";
    playerNumber = 2;
  } else if (playerNumber == 2) {
    playerResult[1] = dicesArray2[0] * 10 + dicesArray2[1];
    myOutputValue =
      "Welcome Player " +
      playerNumber +
      ". <br> You rolled " +
      dicesArray2[0] +
      " for dice 1 and " +
      dicesArray2[1] +
      " for dice 2. <br> Your result is " +
      playerResult[1];
  }

  return myOutputValue;
};

//playerSelection function
var runPlayerSelection = function (choose1, choose2) {
  playerResult.push(choose1 * 10 + choose2);
  myOutputValue =
    "Player " +
    playerNumber +
    ", you chose dice " +
    choose1 +
    " first. <br> Your number is " +
    playerResult[playerNumber - 1] +
    ".";
  return myOutputValue;
};

//main function
var main = function (input) {
  //player1 roll dice
  if (gamemode == "player1RollDice") {
    myOutputValue = rollDiceForPlayer(dicesArray1);
    gamemode = "playerChooseDice";
    //if both dices are the same
    if (dicesArray1[0] == dicesArray1[1] && playerNumber == 1) {
      var myOutputValue = rollSameDice();
    }
    return myOutputValue;
  }

  //player1 choose dice
  if (input == 1 && gamemode == "playerChooseDice" && playerNumber == 1) {
    myOutputValue =
      runPlayerSelection(dicesArray1[0], dicesArray1[1]) +
      " It is now Player 2's turn. Click submit to roll dices";
    gamemode = "player2RollDice";
    playerNumber = 2;
  } else if (
    input == 2 &&
    gamemode == "playerChooseDice" &&
    playerNumber == 1
  ) {
    myOutputValue =
      runPlayerSelection(dicesArray1[1], dicesArray1[0]) +
      " It is now Player 2's turn. Click submit to roll dices";
    gamemode = "player2RollDice";
    playerNumber = 2;

    //player2 roll dice
  } else if (gamemode == "player2RollDice" && playerNumber == 2) {
    myOutputValue = rollDiceForPlayer(dicesArray2);
    gamemode = "playerChooseDice";

    //if both dices are the same
    if (dicesArray2[0] == dicesArray2[1] && playerNumber == 2) {
      var myOutputValue = rollSameDice();
      gamemode = "endgame";
      console.log("xx" + myOutputValue);
    }
  }
  //player2 choose dice
  if (input == 1 && gamemode == "playerChooseDice" && playerNumber == 2) {
    myOutputValue = runPlayerSelection(dicesArray2[0], dicesArray2[1]);
    gamemode = "endgame";
  } else if (
    input == 2 &&
    gamemode == "playerChooseDice" &&
    playerNumber == 2
  ) {
    myOutputValue = runPlayerSelection(dicesArray2[1], dicesArray2[0]);
    gamemode = "endgame";
  }
  if (playerResult[0] > playerResult[1] && gamemode == "endgame") {
    myOutputValue =
      myOutputValue +
      " <br> Player 1 score: " +
      playerResult[0] +
      " <br> Player 2 score: " +
      playerResult[1] +
      "<br> Player 1 win!";
    gamemode = "player1RollDice";
    playerNumber = 1;
  } else if (playerResult[1] > playerResult[0] && gamemode == "endgame") {
    myOutputValue =
      myOutputValue +
      " <br> Player 1 score: " +
      playerResult[0] +
      " <br> Player 2 score: " +
      playerResult[1] +
      "<br> Player 2 win!";
    gamemode = "player1RollDice";
    playerNumber = 1;
  } else if (playerResult[1] == playerResult[0] && gamemode == "endgame") {
    var myOutputValue =
      myOutputValue +
      " <br> Player 1 score: " +
      playerResult[0] +
      " <br> Player 2 score: " +
      playerResult[1] +
      "<br> Draw!";
    gamemode = "player1RollDice";
    playerNumber = 1;
    return myOutputValue;
  }

  console.log(dicesArray1);
  console.log(dicesArray2);
  console.log("player1 result" + playerResult[0]);
  console.log("player2 result" + playerResult[1]);
  console.log(gamemode);
  return myOutputValue;
};
