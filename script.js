var numberofDice = 2;
var player1Array = [];
var player2Array = [];
var roundCounter = 0;
var player1RoundCounter = 0;
var player2RoundCounter = 0;
var player1;
var player1CombinedNumber = 0;
var player2CombinedNumber = 0;
var myOutputValue = "";
var player1TotalScore = 0;
var player2TotalScore = 0;

// generate 1 dice roll (1<x<6) - T
var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var randomNumber = randomInteger + 1;
  return randomNumber;
};

// generate the dice rolls for each player and create an array - T
var createDiceRollArray = function (numberofDice) {
  var diceRollArray = [];
  var diceRollCounter = 0;
  while (diceRollCounter < numberofDice) {
    diceRollArray.push(diceRoll());
    diceRollCounter += 1;
  }
  return diceRollArray;
};

var concatenate2Numbers = function (num1, num2) {
  return Number(String(num1) + String(num2));
};

var main = function (input) {
  //when player 1 clicks submit, display the results of dice roll
  //if player 1 and player 2 have both gone, then start from player 1 again
  if (input == "" && player1RoundCounter == player2RoundCounter) {
    player1Array = createDiceRollArray(numberofDice);
    var player1ArrayLength = player1Array.length;
    myOutputValue = "Welcome Player 1. <br> You Rolled";
    var displayCounter1 = 0;
    while (displayCounter1 < numberofDice - 1) {
      myOutputValue =
        myOutputValue +
        " " +
        player1Array[displayCounter1] +
        " for Dice " +
        (displayCounter1 + 1) +
        ", ";
      displayCounter1 += 1;
    }
    myOutputValue =
      myOutputValue +
      " and " +
      player1Array[player1ArrayLength - 1] +
      " for Dice " +
      player1ArrayLength +
      ". <br> Choose the order of the dice.";
    return myOutputValue;
  }
  //when player 1 chooses which dice, create the player's combined number
  if (input == 1 && player1RoundCounter == player2RoundCounter) {
    player1CombinedNumber = concatenate2Numbers(
      player1Array[0],
      player1Array[1]
    );
    player1RoundCounter += 1;
    console.log("Player 1 round counter: " + player1RoundCounter);
    return (
      "Player 1's number is " +
      player1CombinedNumber +
      "<br> It is now Player 2's turn."
    );
  }

  if (input == 2 && player1RoundCounter == player2RoundCounter) {
    player1CombinedNumber = concatenate2Numbers(
      player1Array[1],
      player1Array[0]
    );
    player1RoundCounter += 1;
    console.log("Player 1 round counter: " + player1RoundCounter);
    return (
      "Player 1's number is " +
      player1CombinedNumber +
      "<br> It is now Player 2's turn."
    );
  }

  //if player 1 has gone, then now its player 2's turn to roll the dice
  if ((input == "") & (player1RoundCounter > player2RoundCounter)) {
    player2Array = createDiceRollArray(numberofDice);
    var player2ArrayLength = player2Array.length;
    myOutputValue = "Welcome Player 2. <br> You Rolled";
    var displayCounter2 = 0;
    while (displayCounter2 < numberofDice - 1) {
      myOutputValue =
        myOutputValue +
        " " +
        player2Array[displayCounter2] +
        " for Dice " +
        (displayCounter2 + 1) +
        ", ";
      displayCounter2 += 1;
    }
    myOutputValue =
      myOutputValue +
      " and " +
      player2Array[player2ArrayLength - 1] +
      " for Dice " +
      player2ArrayLength +
      ". <br> Choose the order of the dice.";
    return myOutputValue;
  }

  //when player 2 chooses which dice, create the player's combined number
  //determine who won the game
  if (input == 1 && player1RoundCounter > player2RoundCounter) {
    player2CombinedNumber = concatenate2Numbers(
      player2Array[0],
      player2Array[1]
    );
    player2RoundCounter += 1;
    console.log("Player 2 round counter: " + player2RoundCounter);
    myOutputValue =
      "Player 2's number is " +
      player2CombinedNumber +
      "<br> Player 1's Number was " +
      player1CombinedNumber;
    if (player1CombinedNumber > player2CombinedNumber) {
      myOutputValue = myOutputValue + "<br> Player 1 won!";
    } else {
      myOutputValue = myOutputValue + "<br> Player 2 won!";
    }
    roundCounter += 1;
    console.log("Round Count: " + roundCounter);
    player1TotalScore = player1TotalScore + player1CombinedNumber;
    player2TotalScore = player2TotalScore + player2CombinedNumber;
    myOutputValue =
      myOutputValue +
      "<br><br> Player 1's total score: " +
      player1TotalScore +
      "<br> Player 2's total score: " +
      player2TotalScore;
    return myOutputValue;
  }

  if (input == 2 && player1RoundCounter > player2RoundCounter) {
    player2CombinedNumber = concatenate2Numbers(
      player2Array[1],
      player2Array[0]
    );
    player2RoundCounter += 1;
    console.log("Player 2 round counter: " + player2RoundCounter);
    myOutputValue =
      "Player 2's number is " +
      player2CombinedNumber +
      "<br> Player 1's Number was " +
      player1CombinedNumber;
    if (player1CombinedNumber > player2CombinedNumber) {
      myOutputValue = myOutputValue + "<br> Player 1 won!";
    } else {
      myOutputValue = myOutputValue + "<br> Player 2 won!";
    }
    roundCounter += 1;
    console.log("Round Count: " + roundCounter);
    player1TotalScore = player1TotalScore + player1CombinedNumber;
    player2TotalScore = player2TotalScore + player2CombinedNumber;
    myOutputValue =
      myOutputValue +
      "<br><br> Player 1's total score: " +
      player1TotalScore +
      "<br> Player 2's total score: " +
      player2TotalScore;
    return myOutputValue;
  }
};
