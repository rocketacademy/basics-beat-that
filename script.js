//Create game mode for Player 1
var playerMode = "Player 1";

//Create function for random dice roll
var rollDice = function () {
  // return 2;
  var randomFloat = Math.random() * 6;
  var resultInteger = Math.floor(randomFloat) + 1;
  return resultInteger;
};

//Create arrays to hold player's dice rolls
var diceRollArray = function () {
  var generateDiceRoll = [rollDice(), rollDice()];
  if (playerMode === "Player 1") {
    player1DiceRoll = generateDiceRoll;
  } else {
    player2DiceRoll = generateDiceRoll;
  }
  return generateDiceRoll;
};

//Generate a function to combine 2 strings in the array for player 1
var numPlayer1DiceArray = function (playerInput) {
  var player1Array0 = String(player1DiceRoll[0]);
  var player1Array1 = String(player1DiceRoll[1]);
  if (playerInput == 1) {
    player1CombineString = player1Array0 + player1Array1;
  } else {
    player1CombineString = player1Array1 + player1Array0;
  }
  return player1CombineString;
};

//Generate a function to combine 2 strings in the array for player 2
var numPlayer2DiceArray = function (playerInput) {
  var player2Array0 = String(player2DiceRoll[0]);
  var player2Array1 = String(player2DiceRoll[1]);
  if (playerInput == 1) {
    player2CombineString = player2Array0 + player2Array1;
  } else {
    player2CombineString = player2Array1 + player2Array0;
  }
  return player2CombineString;
};

var main = function (playerInput) {
  var myOutputValue = "";
  console.log("Current Game Mode ==", playerMode);

  //if player 1 starts the game, he will roll the dice and generate 2 dice rolls
  if (playerMode == "Player 1") {
    var randomDiceRoll = diceRollArray();
    console.log("Two dices rolled by player 1", randomDiceRoll);
    myOutputValue = `Welcome Player 1. <br> <br> You rolled ${randomDiceRoll[0]} for Dice 1 and ${randomDiceRoll[1]} for Dice 2. <br> <br> Choose the order of the dice.`;

    playerMode = "Choose order for player 1";
    return myOutputValue;
  }

  //after the game goes into choose order mode, if player 1 choose dice 1, it will show array[0] + array[1]
  //if player 1 choose dice 2, it will show array[1] + array[0]
  //the game will go into player 2 mode

  if (playerMode == "Choose order for player 1" && playerInput == 1) {
    var player1ArrayInNumber = Number(numPlayer1DiceArray(1));
    console.log("Player 1 choose dice 1", player1ArrayInNumber);

    myOutputValue = `Player 1, you chose Dice ${playerInput} first. <br> <br> Your number is ${player1ArrayInNumber} <br> <br> It's now Player 2's turn.`;
    playerMode = "Player 2";
    return myOutputValue;
  } else if (playerMode == "Choose order for player 1" && playerInput == 2) {
    var player1ArrayInNumber = Number(numPlayer1DiceArray(2));
    console.log("Player 1 choose dice 2", player1ArrayInNumber);
    myOutputValue = `Player 1, you chose Dice ${playerInput} first. <br> <br> Your number is ${player1ArrayInNumber}.  <br> <br> It's now Player 2's turn.`;
    playerMode = "Player 2";
    return myOutputValue;
  }

  //if it's player 2's turn to play the game, he will roll the dice and generate 2 dice rolls
  if (playerMode == "Player 2") {
    var randomDiceRoll = diceRollArray();
    console.log("Two dices rolled by player 2", randomDiceRoll);
    myOutputValue = `Welcome Player 2. <br> <br> You rolled ${randomDiceRoll[0]} for Dice 1 and ${randomDiceRoll[1]} for Dice 2. <br> <br> Choose the order of the dice.`;

    playerMode = "Choose order for player 2";
    return myOutputValue;
  }

  //after the game goes into choose order mode, if player 2 choose dice 1, it will show array[0] + array[1]
  //the game will show whether player 1 or 2 wins, depends on which number is larger
  //depending on player 1 and 2's number, the larger number wins.
  //game goes back to "Player 1" mode

  if (playerMode == "Choose order for player 2" && playerInput == 1) {
    var player2ArrayInNumber = Number(numPlayer2DiceArray(1));
    console.log("Player 2 choose dice 1", player2ArrayInNumber);
    myOutputValue = `Player 2, you chose Dice ${playerInput} first. <br> <br> Your number is ${player2ArrayInNumber}. `;

    if (
      Number(numPlayer1DiceArray(1)) < Number(numPlayer2DiceArray(1)) ||
      Number(numPlayer1DiceArray(2)) < Number(numPlayer2DiceArray(1))
    ) {
      var message = `You win`;
    } else if (
      Number(numPlayer1DiceArray(1)) > Number(numPlayer2DiceArray(1)) ||
      Number(numPlayer1DiceArray(2)) > Number(numPlayer2DiceArray(1))
    ) {
      message = `You lose`;
    } else {
      message = `It's a draw`;
    }
    playerMode = "Player 1";
    return myOutputValue + message;
  } else if (playerMode == "Choose order for player 2" && playerInput == 2) {
    var player2ArrayInNumber = Number(numPlayer2DiceArray(2));
    console.log("Player 2 choose dice 2", player2ArrayInNumber);
    myOutputValue = `Player 2, you chose Dice ${playerInput} first. <br> <br> Your number is ${player2ArrayInNumber}. `;
    //if player 1's number is smaller than player 2's, then player 2 wins
    if (
      Number(numPlayer1DiceArray(1)) < Number(numPlayer2DiceArray(2)) ||
      Number(numPlayer1DiceArray(2)) < Number(numPlayer2DiceArray(2))
    ) {
      var message = `You win`;
    } else if (
      Number(numPlayer1DiceArray(1)) > Number(numPlayer2DiceArray(2)) ||
      Number(numPlayer1DiceArray(2)) > Number(numPlayer2DiceArray(2))
    ) {
      message = `You lose`;
    } else {
      message = `It's a draw`;
    }
    playerMode = "Player 1";
    return myOutputValue + message;
  }

  return myOutputValue;
};
