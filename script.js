var numOfPlayers = 2;
var numOfDice = 2;
var currPlayer = 1;
var currGameMode = "roll dice";
var dice1 = "";
var dice2 = "";
var playerNumbers = [];

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
};

// main function
var main = function (input) {
  var myOutputValue = "";
  // if input isn't empty, output error message
  if (currGameMode == "roll dice") {
    if (input != "") {
      return `Please roll the dice by clicking 'Submit'.`;
    }
    // roll 2 dice
    dice1 = generateDiceNumber();
    dice2 = generateDiceNumber();
    // dice1 = "3";
    // dice2 = "3";
    console.log("dice 1: " + dice1);
    console.log("dice 2: " + dice2);
  }

  // output: player playing, dice rolls for player
  myOutputValue = `Welcome, Player ${currPlayer}. <br>
   You rolled ${dice1} for Dice 1 and ${dice2} for Dice 2. <br>`;
  // if dices are the same, automatically combine values and store in array.
  if (areDicesSame()) {
    playerNumbers.push(dice1 + dice2);
    console.log("player numbers array: " + playerNumbers);
    myOutputValue += `Your number is ${
      playerNumbers[currPlayer - 1]
    }. <br><br>`;
  }
  // else, change game mode to "choose order"
  else {
    currGameMode = "choose order";
    console.log("game mode: " + currGameMode);
  }

  if (currGameMode == "choose order") {
    if (input == 1 || input == 2) {
      playerNumbers.push(combineNumber(input));
      console.log("player numbers array: " + playerNumbers);
      myOutputValue = `Player ${currPlayer}, you chose Dice ${input} first. <br>
        Your number is ${playerNumbers[currPlayer - 1]}. <br><br>`;
    } else {
      myOutputValue += `Choose the order of the dice by entering "1" or "2".`;
      return myOutputValue;
    }
  }

  if (currPlayer < numOfPlayers) {
    currGameMode = "roll dice";
    myOutputValue += `It is now Player ${(currPlayer += 1)}'s turn.`;
  } else {
    var higherScore = Math.max(...playerNumbers);
    console.log("higher score: " + higherScore);
    var winner = playerNumbers.indexOf(higherScore.toString()) + 1;
    console.log("winner: " + winner);
    // console.log("which player won: " + playerWon);
    myOutputValue += `The winner is Player ${winner}. <br><br>
    Press 'Submit' to play again.`;
    resetGame();
  }

  return myOutputValue;
};
