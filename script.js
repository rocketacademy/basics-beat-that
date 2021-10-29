// There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.

//Player 1 clicks submit to generate 2 random dice rolls
//Output the numbers of the 2 random dice rolls and get user to choose either the first or second dice as the first number
//Concatenate the final number and store it as Player's 1 number
//Player 2 clicks submit to generate 2 random dice rolls
//Output the numbers of the 2 random dice rolls and get user to choose either the first or second dice as the first number
//Concatenate the final number and store it as Player's 2 number
//Compare both player's number and output the larger number as the player that won.

var myOutputValue = "";
var playerNumbers = [];
var player2FinalNumber;
var playerFinalNumber;
var gameMode = "start";
var player1Order;
var player1FinalNumber;

//Generate random number from 1-6
var rollDice = function () {
  var randomNumber = Math.floor(Math.random() * 6) + 1;
  return randomNumber;
};

//Generate player's 2 random dice throws numbers
var playerRollDice = function (input) {
  if (input == "") {
    playerNumbers = [rollDice(), rollDice()];
    return `${gameMode}, you rolled ${playerNumbers[0]} and ${playerNumbers[1]}! <br> <br> To choose ${playerNumbers[0]} as your first number, type "1" <br> To choose ${playerNumbers[1]} as your first number, type "2"`;
  }
};

//Generate player's final number based on the order that they have chosen
var connectPlayerNumbersFunction = function (input) {
  if (input == "1") {
    playerFinalNumber = String(playerNumbers[0]).concat(
      String(playerNumbers[1])
    );
  } else if (input == "2") {
    playerFinalNumber = String(playerNumbers[1]).concat(
      String(playerNumbers[0])
    );
  }
  return `${gameMode}, your final number chosen is ${playerFinalNumber}!`;
};

//Generate final number for Player 1
var player1FinalNumberFunction = function (input) {
  connectPlayerNumbersFunction(input);
  //Store player 1's final number as a variable
  player1FinalNumber = playerFinalNumber;
  return connectPlayerNumbersFunction(input);
};

//Generate final number for Player 2
var player2FinalNumberFunction = function (input) {
  connectPlayerNumbersFunction(input);
  //Store player 2's final number as a variable
  player2FinalNumber = playerFinalNumber;
  return connectPlayerNumbersFunction(input);
};

var main = function (input) {
  if (gameMode == "start") {
    if (!input) {
      return `Please enter start to begin the game.`;
    }
  }

  if (input == "start") {
    //Player 1 Mode
    gameMode = "Player 1";
    return ` Hi Player 1, please press submit to roll your 2 dices.`;
  }
  //Generate Player 1's random 2 dice numbers
  if (gameMode == "Player 1") {
    myOutputValue = playerRollDice(input);

    //Generate Player 1's final chosen number
    if (input == "1" || input == "2") {
      myOutputValue = ` ${player1FinalNumberFunction(
        input
      )} <br> <br> It is Player 2's turn. Please press submit to continue.`;
      gameMode = "Player 2";
      console.log("player1FinalNumber-->");
      console.log(player1FinalNumber);
    }
    return myOutputValue;
  }

  //Player 2 Mode

  //Generate Player 2's 2 random dice throw numbers
  if (gameMode == "Player 2") {
    myOutputValue = playerRollDice(input);

    //Generate Player 2's final chosen number
    if (input == "1" || input == "2") {
      myOutputValue = `${player2FinalNumberFunction(
        input
      )} <br> <br>  Please press submit to calculate the winner.`;
      console.log("player2FinalNumber-->");
      console.log(player2FinalNumber);
      gameMode = "calculate result";
    }
    return myOutputValue;
  }

  //Calculate Result
  if (gameMode == "calculate result") {
    if (player1FinalNumber < player2FinalNumber) {
      gameMode = "start";
      return `Player 2 won! <br> <br> Player 1 rolled ${player1FinalNumber} while Player 2 rolled ${player2FinalNumber}`;
    } else if (player1FinalNumber == player2FinalNumber) {
      gameMode = "start";
      return `It's a draw. <br> <br> Both players rolled ${player1FinalNumber}.`;
    } else {
      gameMode = "start";
      return `Player 1 won! <br> <br> Player 1 rolled ${player1FinalNumber} while Player 2 rolled ${player2FinalNumber}.`;
    }
  }
};
