// function to roll the dice
var rollDice = function () {
  // produce a decimal between 0 and 6
  var randomDecimal = Math.random() * 6;
  // remove the decimal
  var randomInteger = Math.floor(randomDecimal);
  // add 1 to get a number between 1 and 6 inclusive
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

// player roll the dice
var playerRollDice = function () {
  playerNumber.push(rollDice());
  playerNumber.push(rollDice());
  return (
    "Hey player " +
    player +
    ", your rolled dice 1 is " +
    playerNumber[0] +
    ", dice 2 is " +
    playerNumber[1] +
    ". <br> Please input 1 or 2 to generate your score!"
  );
};

// generate the player score
var generateScore = function (input) {
  var playerScore;
  if (input == 1) {
    playerScore = 11;
    playersResults.push(playerScore);
    playerNumber = [];
    return "Dear Player " + player + ", Your score is " + playerScore;
  } else if (input == 2) {
    var playerScore = 222;
    playersResults.push(playerScore);
    playerNumber = [];
    return "Dear Player " + player + ", Your score is " + playerScore;
  } else {
    return "Oooops, your input is invalid. Please input 1 or 2 to continue! ";
  }
};

// define the varilables for player:
var playerNumber = [];
var playerOrder = "";
var playersResults = [];

// define the game mode:
gameModeRollDice = "rollDice";
gameModeChooseOrder = "chooseOrder";
gameModeCompare = "compareResults";
// define the default mode
mode = gameModeRollDice;
// define the player no.
player = 1;

var main = function (input) {
  var output = "";
  //
  if (mode == gameModeRollDice) {
    // player roll the dice and output the dice results:
    output = playerRollDice();
    // change the mode to choose order
    mode = gameModeChooseOrder;
    return output;
  }
  //
  if (mode == gameModeChooseOrder) {
    // generate score for the player
    output = generateScore(input);
    if (player == 1) {
      player = 2;
      mode = gameModeRollDice;
      return output + "<br> Now is the time for Player 2 to play!";
    }
    if (player == 2) {
      mode = gameModeCompare;
      return output + "<br> Please click submit button to compare!";
    }
  }
  //
  if (mode == gameModeCompare) {
    if (playersResults[0] > playersResults[1]) {
      output =
        "Player 1's score is " +
        playersResults[0] +
        " Player 2's score is" +
        playersResults[1] +
        ". <br> Player 1 wins! ";
    } else if (playersResults[0] < playersResults[1]) {
      output =
        "Player 1's score is " +
        playersResults[0] +
        " Player 2's score is" +
        playersResults[1] +
        ". <br> Player 2 wins! ";
    } else {
      output =
        "Player 1's score is " +
        playersResults[0] +
        " Player 2's score is" +
        playersResults[1] +
        ". <br> It is a tie! ";
    }
  }
};
