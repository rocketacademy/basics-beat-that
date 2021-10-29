//Game Mode
var INPUTMODE = "Input number of players";
var ROLLMODE = "Roll dice";
var ORDERMODE = "Order dice roll";
var COMPAREMODE = "Compare dice roll";
var gameMode = INPUTMODE;

//Global Variable
var numberOfPlayers = "";
var playerCounter = 1;
var myOutputValue = "";
var diceRollOne = "";
var diceRollTwo = "";
var diceRollCombined = "";
var diceRollArray = [0];
var playerScore = [0];

//Message Template
var PLAYMSG =
  "Welcome Player " +
  playerCounter +
  "<br >You rolled " +
  diceRollOne +
  " for Dice 1 and " +
  diceRollTwo +
  " for Dice 2.<br >Choose the order of the dice.";

var main = function (input) {
  //Input
  if (gameMode == INPUTMODE) {
    numberOfPlayers = input;
    var i = 1;
    while (i <= numberOfPlayers) {
      playerScore.push(0);
      i = i + 1;
    }
    gameMode = ROLLMODE;
    return (
      "Number of players input: " +
      numberOfPlayers +
      "<br >Click Submit to begin playing."
    );
  }
  //Roll Order Compare
  else {
    while (playerCounter <= numberOfPlayers) {
      if (gameMode == ROLLMODE) {
        diceRollOne = rollDice();
        diceRollTwo = rollDice();
        gameMode = ORDERMODE;
        return (
          "Welcome Player " +
          playerCounter +
          "<br >You rolled " +
          diceRollOne +
          " for Dice 1 and " +
          diceRollTwo +
          " for Dice 2.<br >Choose the order of the dice."
        );
      } else if (gameMode == ORDERMODE) {
        if (input == 1) {
          diceRollCombined = Number(diceRollOne + "" + diceRollTwo);
        } else {
          diceRollCombined = Number(diceRollTwo + "" + diceRollOne);
        }
        console.log("diceRollCombined: ", diceRollCombined);
        diceRollArray.push(diceRollCombined);
        console.log("diceRollArray: ", diceRollArray);
        myOutputValue =
          "Player " +
          playerCounter +
          ", you chose to order by Dice " +
          input +
          " first. Your final number is: " +
          diceRollCombined +
          ". ";
        if (playerCounter < numberOfPlayers) {
          gameMode = ROLLMODE;
          playerCounter = playerCounter + 1;
          myOutputValue +=
            "<br >It is now Player " +
            playerCounter +
            "'s turn. Press Submit to continue.";
        } else {
          gameMode = COMPAREMODE;
        }
      } else if (gameMode == COMPAREMODE) {
        //Find winner for this round
        i = 0;
        var winningPlayerID = "";
        var max = diceRollArray[0];
        while (i < numberOfPlayers) {
          i = i + 1;
          if (max <= diceRollArray[i]) {
            max = diceRollArray[i];
            winningPlayerID = i;
            console.log("max: ", max);
            console.log("winningPlayerID: ", winningPlayerID);
          }
        }
        playerScore[winningPlayerID] = playerScore[winningPlayerID] + 1;
        console.log("playerScore:", playerScore);
        myOutputValue =
          "Player " +
          winningPlayerID +
          " wins this round with " +
          max +
          "! <br >Click Submit to continue playing.";
        gameMode = ROLLMODE;
        playerCounter = 1;
        max = "";
        winningPlayerID = "";
        diceRollArray = [0];
        return myOutputValue;
      }

      return myOutputValue;
    }
  }
  return myOutputValue;
};

var rollDice = function () {
  // Generate a decimal from 0 through 6, inclusive of 0 and exclusive of 6.
  var randomDecimal = Math.random() * 6;
  // Remove the decimal with the floor operation.
  // This will be an integer from 0 to 5 inclusive.
  var randomInteger = Math.floor(randomDecimal);
  // Add 1 to get valid dice rolls of 1 through 6 inclusive.
  var diceNumber = randomInteger + 1;
  return diceNumber;
};
