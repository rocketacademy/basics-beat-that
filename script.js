//all these are still global variables that we want to call throughout the program
var GAME_STATE_DICE_ROLL = "GAME_STATE_DICE_ROLL";
var GAME_STATE_CHOOSE_DICE_ORDER = "GAME_STATE_CHOOSE_DICE_ORDER";
var GAME_STATE_COMPARE_SCORES = "GAME_STATE_COMPARE_SCORES";

var gameState = GAME_STATE_DICE_ROLL;

//let the game always start with player one

var currentPlayerRolls = [];

var currentPlayer = 1;
var allPlayersScore = [];

var rollDice = function () {
  //generate random number between 1 and 6
  var randomDecimal = Math.random() * 6;
  var randomNumber = Math.floor(randomDecimal) + 1;
  console.log("the result of the dice roll is " + randomNumber);
  return randomNumber;
};

var rollDiceForPlayer = function () {
  console.log("Control flow: start of rollDiceForPlayer()");
  var counter = 0;
  while (counter < 2) {
    currentPlayerRolls.push(rollDice());
    counter = counter + 1;
  }
  console.log(
    "rollDiceForPlayer changes, currentPlayerRolls: ",
    currentPlayerRolls
  );
  return (
    "Welcome, Player " +
    currentPlayer +
    "! You rolled: <br> Dice 1: " +
    currentPlayerRolls[0] +
    " | Dice 2: " +
    currentPlayerRolls[1] +
    " <br><br>Now, please choose '1' or '2' to see which dice you want to be the first digit of your final score."
  );
};

var getPlayerScore = function (playerInput) {
  var playerScore;
  // //input validation
  // if (playerInput != 1 && playerInput != 2) {
  //   return (
  //     "Error! Please only input '1' or '2' to choose which dice to use as your first digit. Your dice rolls are: <br>Dice 1: " +
  //     currentPlayerRolls[0] +
  //     " | Dice 2: " +
  //     currentPlayerRolls[1] +
  //     "."
  //   );
  // }
  //input == 1

  if (playerInput == 1) {
    var playerScore = Number(
      String(currentPlayerRolls[0]) + String(currentPlayerRolls[1])
    );
    allPlayersScore.push(playerScore);
    currentPlayerRolls = [];
    return "Your chosen value is: " + playerScore + "! ";
  }
  //input == 2
  if (playerInput == 2) {
    var playerScore = Number(
      String(currentPlayerRolls[1]) + String(currentPlayerRolls[0])
    );
    allPlayersScore.push(playerScore);
    currentPlayerRolls = [];
    return (
      "Player " +
      currentPlayer +
      ", your chosen value is: " +
      playerScore +
      ". "
    );
  }
  //input validation
  if (playerInput != 1 && playerInput != 2) {
    return (
      "Error! Please only input '1' or '2' to choose which dice to use as your first digit. Your dice rolls are: <br>Dice 1: " +
      currentPlayerRolls[0] +
      " | Dice 2: " +
      currentPlayerRolls[1] +
      "."
    );
  }
};

var main = function (input) {
  console.log("checking game state on submit click: ", gameState);
  console.log("checking currentPlayer on submit click: ", currentPlayer);
  var outputMessage = "";

  if (gameState == GAME_STATE_DICE_ROLL) {
    console.log("Control flow: gameState == GAME_STATE_DICE_ROLL");

    //display dice rolled as output message
    outputMessage = rollDiceForPlayer();

    // change the game state;
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
    console.log("the new gameState is now " + gameState);
    return outputMessage;
  }

  if (gameState == GAME_STATE_CHOOSE_DICE_ORDER) {
    console.log("Control flow: gamestate == GAME_STATE_CHOOSE_DICE_ORDER");
    //call player score function
    outputMessage = getPlayerScore(input);

    if (currentPlayer == 1) {
      currentPlayer = 2;
      gameState = GAME_STATE_DICE_ROLL;
      return (
        outputMessage +
        " It is now Player 2's turn. <br><br>Hit the submit button again to roll the dice for Player 2."
      );
    }

    if (currentPlayer == 2) {
      console.log("end of player 1's turn, it is now player 2's turn.");

      gameState = GAME_STATE_COMPARE_SCORES;

      return outputMessage + " Hit submit again to compare your scores!";
    }
  }
  if (gameState == GAME_STATE_COMPARE_SCORES) {
    outputMessage =
      "Player's 1 score is: " +
      allPlayersScore[0] +
      " and Player 2's score is: " +
      allPlayersScore[1] +
      "! <br><br>";

    //player 1 wins

    if (allPlayersScore[0] > allPlayersScore[1]) {
      outputMessage = outputMessage + "Congrats Player 1, you win!";
    }
    //player 2 wins

    if (allPlayersScore[0] < allPlayersScore[1]) {
      outputMessage = outputMessage + "Congrats Player 2, you win!";
    }
    if (allPlayersScore[0] == allPlayersScore[1]) {
      outputMessage = outputMessage + "It's a tie, play again!";
    }
    return outputMessage;
  }
};

//     //input validation
//     if (input != 1 && input != 2) {
//       return (
//         "Error! Please only input '1' or '2' to choose which dice to use as your first digit. Your dice rolls are: <br>Dice 1: " +
//         playerRolls[0] +
//         " | Dice 2: " +
//         playerRolls[1] +
//         "."
//       );
//     }
//     //input == 1

//     if (input == 1) {
//       var playerScore = Number(String(playerRolls[0]) + String(playerRolls[1]));
//       return "Your chosen value is: " + playerScore;
//     }
//     //input == 2
//     if (input == 2) {
//       var playerScore = Number(String(playerRolls[1]) + String(playerRolls[0]));
//       return "Your chosen value is: " + playerScore;
//     }
