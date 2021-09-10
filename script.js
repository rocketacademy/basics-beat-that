var numOfPlayers = 5;
var numOfDice = 2;
var currPlayer = 1;
var currGameMode = "roll dice";
var dice1 = "";
var dice2 = "";
var playerNumbers = [];
var winnersArr = [];

// helper functions
// generate dice number and convert to string
var generateDiceNumber = function () {
  var diceNumber = Math.ceil(Math.random() * 6);
  return diceNumber.toString();
};

// check if dice 1 and dice 2 are of the same value
var areDicesSame = function () {
  if (dice1 == dice2) {
    return true;
  }
  return false;
};

// combine numbers based on player's choice
var combineNumber = function (userChoice) {
  if (userChoice == 1) {
    return dice1 + dice2;
  }
  return dice2 + dice1;
};

// reset game
var resetGame = function () {
  currGameMode = "roll dice";
  currPlayer = 1;
  playerNumbers = [];
  winnersArr = [];
};

// main function
var main = function (input) {
  var myOutputValue = "";

  // if current game mode is "roll dice"
  if (currGameMode == "roll dice") {
    // if input isn't empty, output error message
    if (input != "") {
      return `Please roll the dice by clicking 'Submit'.`;
    }
    // else, roll 2 dice
    dice1 = generateDiceNumber();
    dice2 = generateDiceNumber();
    // dice1 = "3";
    // dice2 = "3";
    console.log("dice 1: " + dice1);
    console.log("dice 2: " + dice2);
  }

  // output: player playing, dice rolls for player
  myOutputValue = `<b>🎲  WELCOME, PLAYER ${currPlayer}  🎲</b><br><br>
  You rolled ${dice1} for dice one and ${dice2} for dice two. <br><br>`;

  // if dices are the same, automatically combine values and store in array.
  if (areDicesSame()) {
    playerNumbers.push(dice1 + dice2);
    console.log("player numbers array: " + playerNumbers);
    myOutputValue += `Your number is ${playerNumbers[currPlayer - 1]}.<br><br>`;
  }
  // else, change game mode to "choose order"
  else {
    currGameMode = "choose order";
    console.log("game mode: " + currGameMode);
  }

  // if game mode is "choose order"
  if (currGameMode == "choose order") {
    // if input is valid, combine dice values based on user choice.
    if (input == 1 || input == 2) {
      playerNumbers.push(combineNumber(input));
      console.log("player numbers array: " + playerNumbers);
      myOutputValue = `<b>🎲  PLAYER ${currPlayer}  🎲</b><br><br>
      You chose Dice ${input} first. Your number is ${
        playerNumbers[currPlayer - 1]
      }. <br><br>`;
    }
    // else, add-on output msg: choose order of dice
    else {
      myOutputValue += `Choose the order of the dice by entering "1" or "2".`;
      return myOutputValue;
    }
  }

  // if current player is less than number of players playing, add-on output msg: it is (player + 1)'s turn.
  if (currPlayer < numOfPlayers) {
    currGameMode = "roll dice";
    myOutputValue += `It is now Player ${(currPlayer += 1)}'s turn.`;
  }

  // else (current player is last player), evaluate the players' numbers and select winner.
  else {
    // get highest score from player numbers array
    var highScore = Math.max(...playerNumbers);
    console.log("higher score: " + highScore);

    // check player numbers array if there's any draws and push to new array
    for (var i = 0; i < playerNumbers.length; i++) {
      if (playerNumbers[i] == highScore) {
        winnersArr.push(" " + (i + 1));
      }
    }
    console.log("winners: " + winnersArr);

    // if everyone drew the same number, output draw msg.
    if (winnersArr.length == numOfPlayers) {
      myOutputValue += `<hr><br><b>You guys drew. Play again?</b><br><br>`;
    } else if (winnersArr.length > 1) {
      // if there is more than 1 winner, output multiple winner msg.
      myOutputValue += `<hr><br><b>The winner(s) are Players${winnersArr}.</b><br><br>`;
    }
    // if there is only 1 winner, output winner msg.
    if (winnersArr.length == 1) {
      // var winner = playerNumbers.indexOf(highScore.toString()) + 1;
      // console.log("winner: " + winner);
      myOutputValue += `<hr><br><b>The winner is Player${winnersArr}.</b><br><br>`;
    }

    myOutputValue += `Press 'Submit' to play again.`;
    // reset game
    resetGame();
  }

  return myOutputValue;
};
