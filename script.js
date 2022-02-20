// Player 1 rolls 2 dice =>
// - game mode in dice roll
// - create 2 random dice roll numbers
// - game mode changes to choose order of dice number
// - output = Dice 1 rolled A and Dice 2 rolled B, please indicate "Dice 1" or "Dice 2" to be the first numeral of the combined number

// Player 1 chooses order of dice number =>
// - game mode is in choose order of dice number
// - input to be "Dice 1" or "Dice 2"
// - output = You have chosen Dice X to be the first numeral of the combined number. Your combined number is XX

// Player 2 repeat steps. Put game logic into a loop

// If Player 1 combined > Player 2 combined, Player 1 wins. If Player 1 combined < Player 2 combined, Player 2 wins. If Player 1 combined = Player 2 combined, they draw. Restart game.

var gameMode = "enter num of players";
var counter = 0;
var playerX = 0;
var innerGameMode = "";
var numOfPlayers = 0;
//var combinedNumArray = [];

var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal) + 1;
  return randomInteger;
};

var playTheGame = function (numOfPlayers) {
  myOutputValue = "hello...";
  innerGameMode = "dice roll";
  console.log(innerGameMode);
  counter = 0;
  playerX = 0;
  while (counter < numOfPlayers) {
    console.log(numOfPlayers);
    if (innerGameMode == "dice roll") {
      var diceRoll1 = diceRoll();
      var diceRoll2 = diceRoll();
      console.log("dice roll 1", diceRoll1);
      console.log("dice roll 2", diceRoll2);
      playerX = playerX + 1;
      console.log("playerX", playerX);
      innerGameMode = "choose order of dice number";
      myOutputValue =
        myOutputValue +
        "Welcome Player " +
        playerX +
        "!<br>" +
        "<br>" +
        "Dice 1 rolled " +
        diceRoll1 +
        ". <br>" +
        "Dice 2 rolled " +
        diceRoll2 +
        ".<br>" +
        "<br>" +
        "Please indicate 'Dice 1' or 'Dice 2' to be the first numeral of the combined number";
    } else if (innerGameMode == "choose order of dice number") {
      console.log("inner game mode", innerGameMode);
      var diceOrderInput = input;
      if (diceOrderInput == "Dice 1") {
        //combinedNumArray.push(combinedNum);x
        myOutputValue =
          "You have chosen " +
          diceOrderInput +
          "to be the first numeral. <br>" +
          "Your combined number is " +
          diceRoll1 +
          diceRoll2 +
          "<br>" +
          "<br>" +
          "Player " +
          playerX +
          "- " +
          diceRoll1 +
          diceRoll2;
      }
      if (diceOrderInput == "Dice 2") {
        //combinedNumArray.push(combinedNum);
        myOutputValue =
          "You have chosen " +
          diceOrderInput +
          " to be the first numeral. <br>" +
          "Your combined number is " +
          diceRoll2 +
          diceRoll1 +
          "<br>" +
          "<br>" +
          "Player " +
          playerX +
          "- " +
          diceRoll2 +
          diceRoll1;
      }
    }
    counter = counter + 1;
    return myOutputValue;
  }
};

var main = function (input) {
  var myOutputValue = "";

  if (gameMode == "enter num of players") {
    numOfPlayers = input;
    gameMode = "play the game";
    myOutputValue =
      "Welcome to the game of Beat That! Player " +
      playerX +
      ". Please click submit to begin rolling the dice!";
  } else if (gameMode == "play the game") {
    myOutputValue = playTheGame(numOfPlayers);
  }
  // if ((Number(combinedNumArray[0])) > (Number(combinedNumArray[1]))){
  //   myOutputValue = "Player " + playerX + " is leading the game!";
  // }

  return myOutputValue;
};
