//Create a version of the Beat That dice game, where players create the largest number they can by concatenating random dice roll digits.

/* 
Rules:

1) There are 2 players and players take turns.

2) When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.

3) The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.

4) After both players have rolled and chosen dice order, the player with the higher combined number wins.
*/

//Create global variables that stores whether the players have rolled
var hasPlayer1Rolled = 0;
var hasPlayer2Rolled = 0;

//Create a global variable that is an array that will store the players' rolled numbers. It is empty at first but when the numbers are pushed in it will be in the following format ideally: [player1Dice1, player1Dice2] [player2Dice1, player2Dice2]
var player1DiceRolls = [];
var player2DiceRolls = [];

//Create global variables for the players' concatenated numbers
var player1ConcatenatedNumber = 0;
var player2ConcatenatedNumber = 0;

//Create a global variable to store the reset mode
var timeToReset = 0;

//Create a function that capitalizes the first letter of a string
var capitalizer = function (userInput) {
  return userInput[0].toUpperCase() + userInput.substring(1);
};

//Create the dice roll function
var randomDiceNumberGenerator = function () {
  return Math.floor(Math.random() * 6) + 1;
};

//Create a function to roll the players' dices, depending on whether its player 1 turn or player 2 turn
var rollTheDice = function () {
  //If Player 1 has not rolled (hasPlayer1Rolled = 0), roll the dice twice and push the numbers to the player1DiceRolls array. If Player 1 has rolled (hasPlayer1Rolled = 1), then check if player 2 has not rolled (hasPlayer2Rolled = 0), roll the dice twice and push the numbers to the player2DiceRolls array.
  if (hasPlayer1Rolled == 0) {
    //Push two dice rolls into Player 1 Dice Roll's array, player1DiceRolls, using a for loop
    for (var counter = 0; counter < 2; counter += 1) {
      player1DiceRolls.push(randomDiceNumberGenerator());
    }
    console.log(
      "Player 1 Dice 1: ",
      player1DiceRolls[0],
      "Player 1 Dice 2: ",
      player1DiceRolls[1]
    );

    //Change the global variable hasPlayer1Rolled to 1 to show that Player 1 has rolled
    hasPlayer1Rolled = 1;
  } else if (hasPlayer1Rolled == 1 && hasPlayer2Rolled == 0) {
    //Push two dice rolls into Player 2 Dice Roll's array, player1DiceRolls, using a for loop
    for (var counter = 0; counter < 2; counter += 1) {
      player2DiceRolls.push(randomDiceNumberGenerator());
    }
    console.log(
      "Player 2 Dice 1: ",
      player2DiceRolls[0],
      "Player 2 Dice 2: ",
      player2DiceRolls[1]
    );
    //Change the global variable hasPlayer1Rolled to 1 to show that Player 1 has rolled
    hasPlayer2Rolled = 1;
  }
};

//Create a function that concatenates the players' two dice numbers
var concatenator = function (userInput) {
  //Check if player 1 has rolled and player 2 has not
  if (hasPlayer1Rolled == 1 && hasPlayer2Rolled == 0) {
    //Check if player 1 types in dice 1 or dice 2
    if (userInput == "dice 1") {
      player1ConcatenatedNumber = Number(
        String(player1DiceRolls[0]) + String(player1DiceRolls[1])
      );
      console.log(
        "Player 1's concatenated number is: ",
        player1ConcatenatedNumber
      );
    } else if (userInput == "dice 2") {
      player1ConcatenatedNumber = Number(
        String(player1DiceRolls[1]) + String(player1DiceRolls[0])
      );
      console.log(
        "Player 1's concatenated number is: ",
        player1ConcatenatedNumber
      );
    }
  }

  //Check if player 1 has rolled and player 2 has rolled
  if (hasPlayer1Rolled == 1 && hasPlayer2Rolled == 1) {
    //Check if player 2 types in dice 1 or dice 2
    if (userInput == "dice 1") {
      player2ConcatenatedNumber = Number(
        String(player2DiceRolls[0]) + String(player2DiceRolls[1])
      );
      console.log(
        "Player 2's concatenated number is: ",
        player2ConcatenatedNumber
      );
    } else if (userInput == "dice 2") {
      player2ConcatenatedNumber = Number(
        String(player2DiceRolls[1]) + String(player2DiceRolls[0])
      );
      console.log(
        "Player 2's concatenated number is: ",
        player2ConcatenatedNumber
      );
    }
  }
};

//Create a function that outputs the notification statement after the players' have rolled the dice on what their dice number is.
var statementForDiceRolled = function () {
  //Check if only player 1 has rolled
  if (hasPlayer1Rolled == 1 && hasPlayer2Rolled == 0) {
    return `Welcome Player 1. <br><br>You rolled ${player1DiceRolls[0]} for Dice 1 and ${player1DiceRolls[1]} for Dice 2. <br><br>Choose the order of the dice. <br>Input "dice 1" if you wish for Dice 1's number to be in front of Dice 2's number. <br>Input "dice 2" if you wish for Dice 2's number to be in front of Dice 1's number.`;
  }

  //Check if player 2 has rolled, after player 1 has rolled
  if (hasPlayer1Rolled == 1 && hasPlayer2Rolled == 1) {
    return `Welcome Player 2. <br><br>You rolled ${player2DiceRolls[0]} for Dice 1 and ${player2DiceRolls[1]} for Dice 2. <br><br>Choose the order of the dice. <br>Input "dice 1" if you wish for Dice 1's number to be in front of Dice 2's number. <br>Input "dice 2" if you wish for Dice 2's number to be in front of Dice 1's number.`;
  }
};

//Create a function that outputs the notification statement after the players' have chosen which dice to concatenate and return the concatenated number
var statementForConcatenation = function (userInput) {
  //Check if only player 1 has rolled
  if (hasPlayer1Rolled == 1 && hasPlayer2Rolled == 0) {
    return `Player 1, you chose ${capitalizer(
      userInput
    )} first. <br>Your number is ${player1ConcatenatedNumber}. <br>It is now Player 2's turn.`;
  }

  //Check if player 2 has rolled, after player 1 has rolled
  if (hasPlayer1Rolled == 1 && hasPlayer2Rolled == 1) {
    return `Player 2, you chose ${capitalizer(
      userInput
    )} first. <br>Your number is ${player2ConcatenatedNumber}. <br>It is now time to see who won! Type in "compare" to see who won.`;
  }
};

//Create a function that compares the two numbers and output a who wins statement.
var comparingWinnerStatement = function () {
  //Create a variable that is a statement to let the players know how to reset the game
  var howToReset = `Please input "reset" if you wish to reset the game and play again.`;

  //Check if there is a tie
  if (player1ConcatenatedNumber == player2ConcatenatedNumber) {
    return `Both of your numbers are ${player1ConcatenatedNumber}. <br><br>It's a tie! <br><br>${howToReset}`;
  }

  //Check if player 1 won
  if (player1ConcatenatedNumber > player2ConcatenatedNumber) {
    return `Player 1's number is ${player1ConcatenatedNumber}. <br>Player 2's number is ${player2ConcatenatedNumber}. <br><br>Player 1 won! <br><br>${howToReset}`;
  }

  //Check if player 2 won
  if (player2ConcatenatedNumber > player1ConcatenatedNumber) {
    return `Player 1's number is ${player1ConcatenatedNumber}. <br>Player 2's number is ${player2ConcatenatedNumber}. <br><br>Player 2 won! <br><br>${howToReset}`;
  }
};

//Create a function that resets the game
var gameReset = function () {
  hasPlayer1Rolled = 0;
  hasPlayer2Rolled = 0;
  player1DiceRolls = [];
  player2DiceRolls = [];
  player1ConcatenatedNumber = 0;
  player2ConcatenatedNumber = 0;
  timeToReset = 0;
  return `The game has been reset! You may play again by pressing the "Submit" button.`;
};

//Create a function that receives the user input and returns the correct output statements
var beatThatGame = function (userInput) {
  //Make the input entirely lowercase
  userInput = userInput.toLowerCase();

  if (
    !(userInput == "dice 1" || userInput == "dice 2") &&
    ((hasPlayer1Rolled == 1 && player1ConcatenatedNumber == 0) ||
      (hasPlayer1Rolled == 1 &&
        hasPlayer2Rolled &&
        player2ConcatenatedNumber == 0))
  ) {
    return;
  }
  if (userInput == "" && !(hasPlayer1Rolled == 1 && hasPlayer2Rolled == 1)) {
    //Check if there is no input, which means the players are rolling the dice. Call the dice rolling functions
    rollTheDice();
    return statementForDiceRolled();
  }

  //Check if input is "dice 1" or "dice 2", which means the players are choosing which dice is the first number and which is the second. Call the concatenating functions
  if (userInput == "dice 1" || userInput == "dice 2") {
    concatenator(userInput);
    return statementForConcatenation(userInput);
  }

  //Check if input is "compare", which means its time to compare the two numbers and see who won
  if (
    userInput == "compare" &&
    hasPlayer1Rolled == 1 &&
    hasPlayer2Rolled == 1
  ) {
    timeToReset = 1;
    return comparingWinnerStatement();
  }

  //Check if input is "reset", which means that it is time to reset the game
  if (userInput == "reset" && timeToReset == 1) {
    return gameReset();
  }
  console.log("Player 1: ", player1DiceRolls, "Player 2: ", player2DiceRolls);
};

//Create a function that takes the user input and outputs the correct instructions if the user types invalid input
var invalidInputChecker = function () {
  //Check if both players have not rolled the dice yet
  if (hasPlayer1Rolled == 0 && hasPlayer2Rolled == 0) {
    return `Please press the "submit" button without typing anything in the input box to start the game for player 1`;
  }

  if (
    hasPlayer1Rolled == 1 &&
    hasPlayer2Rolled == 0 &&
    player1ConcatenatedNumber == 0
  ) {
    return `Player 1, please select which dice you would like to be in front. <br><br>You rolled a ${player1DiceRolls[0]} for Dice 1 and a ${player1DiceRolls[1]} for Dice 2. <br><br> Input "dice 1" for Dice 1 or "dice 2" for Dice 2`;
  }

  if (hasPlayer1Rolled == 1 && hasPlayer2Rolled == 0) {
    return `Please press the "submit" button without typing anything in the input box to start the game for player 2`;
  }

  if (
    hasPlayer1Rolled == 1 &&
    hasPlayer2Rolled == 1 &&
    player2ConcatenatedNumber == 0
  ) {
    return `Player 2, please select which dice you would like to be in front. <br><br>You rolled a ${player2DiceRolls[0]} for Dice 1 and a ${player2DiceRolls[1]} for Dice 2. <br><br> Input "dice 1" for Dice 1 or "dice 2" for Dice 2`;
  }

  if (
    hasPlayer1Rolled == 1 &&
    hasPlayer2Rolled == 1 &&
    !(player1ConcatenatedNumber == 0 && player2ConcatenatedNumber == 0) &&
    timeToReset == 0
  ) {
    return `Please input "Compare" into the input box to see who won!`;
  }

  if (timeToReset == 1) {
    return `${comparingWinnerStatement()}`;
  }
};

var main = function (input) {
  var myOutputValue = beatThatGame(input);

  if (myOutputValue == undefined) {
    myOutputValue = invalidInputChecker();
  }

  return myOutputValue;
};
