/*
Requirements (Base)
1. There are 2 players and players take turns 

2. When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
3. The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
4. After both players have rolled and chosen dice order, the player with the higher combined number wins.


concepts involved
1. Game states
2. Loops
3. Arrays 
4. Loops w Arrays?
5. Can Boolean be used? 


how to 
- must have mechanism to move from player 1 to player 2
- 
*/

// Create variables for the game modes
var player1Roll = "player 1 roll dices";
var player1Select = "player 1 select dice order";

var player2Roll = "player 2 roll dices";
var player2Select = "player 2 select dice order";

var matchPlayer1Player2 = "Check who wins";

var player1FirstRollOutput = 0;
var player1SecondRollOutput = 0;
var player2FirstRollOutput = 0;
var player2SecondRollOutput = 0;

var player1Array = [];
var player2Array = [];

var player1Number = 0;
var player2Number = 0;

// set to true if the game is over
var isTheGameOver = false;

var selectDiceOrderText =
  "Choose the order of the dice. Type '1' for first dice first. Alternatively, type '2' for second dice first.";

// Set current game mode so user will roll dice when click submit
var currentGameMode = player1Roll;

//create function for dice roll
var diceRoll = function () {
  return Math.floor(Math.random() * 6) + 1;
};

//create function emcompassing all game modes & game logic
var beatThatGame = function (input) {
  // game mode: player 1 to roll
  if (currentGameMode == player1Roll) {
    if (input != "") {
      myOutputValue = "Please roll the dice by clicking 'submit'";
      return myOutputValue;
    }
    player1FirstRollOutput = diceRoll();
    player1SecondRollOutput = diceRoll();
    player1Array.push(player1FirstRollOutput);
    console.log("pushed player1firstrolloutput into player1array");

    player1Array.push(player1SecondRollOutput);
    console.log("pushed player1secondrolloutput into player1array");

    console.log(player1Array);

    currentGameMode = player1Select; //change game mode as soon as dices are rolled so it won't re-roll
    console.log("game mode is changed to player1select");

    myOutputValue = `<b>WELCOME PLAYER 1 </b>🎲🎲🎲 <br><br>You rolled ${player1FirstRollOutput} for Dice 1 and ${player1SecondRollOutput} for Dice 2.<br><br>${selectDiceOrderText} `;
    return myOutputValue;
  }

  //game mode: player 1 to select which dice first
  if (currentGameMode == player1Select) {
    // how to collect user choice of which dice goes first? (kiv)
    userInput = Number(input);
    var player2TurnText = "It is now Player 2's turn. Click submit to proceed.";

    //input validation for (1) nan inputs (2) not 1 and not 2

    //for (1) nan inputs
    if (Number.isNaN(userInput) == true) {
      myOutputValue = "sorry, please enter a number.";
      return myOutputValue;
    }

    if (userInput != 1 && userInput != 2) {
      myOutputValue = "Please insert only either '1' or '2'.";
      return myOutputValue;
    }

    if (userInput == 1) {
      //if input is 1, let the first number go first. Else if input is 2, let second number go first

      player1Number = String(player1Array[0]) + String(player1Array[1]);
      myOutputValue = `Player 1, you chose Dice ${userInput} first.<br><br>You rolled ${player1Array}.<br><b>Your number is ${player1Number}.</b><br><br>${player2TurnText}`;
      currentGameMode = player2Roll; // change game mode should be within conditionals
      console.log("game mode is changed to player2roll");
      return myOutputValue;
    } else if (userInput == 2) {
      player1Number = String(player1Array[1]) + String(player1Array[0]);
      myOutputValue = `Player 1, you chose Dice ${userInput} first.<br><br>You rolled ${player1Array}.<br><b>Your number is ${player1Number}.</b><br><br>${player2TurnText} `;
      currentGameMode = player2Roll; // change game mode should be within conditionals
      console.log("game mode is changed to player2roll");

      return myOutputValue;
    }
  }

  //game mode: player 2 to roll
  if (currentGameMode == player2Roll) {
    player2FirstRollOutput = diceRoll();
    player2SecondRollOutput = diceRoll();
    player2Array.push(player2FirstRollOutput);
    player2Array.push(player2SecondRollOutput);

    currentGameMode = player2Select;
    console.log("game mode is changed to player2select");
    myOutputValue = `<b>WELCOME PLAYER 2 </b>🎲🎲🎲<br><br>You rolled ${player2FirstRollOutput} for Dice 1 and ${player2SecondRollOutput} for Dice 2.<br><br>${selectDiceOrderText}`;
    return myOutputValue;
  }
  // game mode: player 2 to select

  userInput = Number(input);
  var textToProceedToCheckWinner = "Click submit to find out who won!🧐🤔";

  if (currentGameMode == player2Select) {
    //input validation for (1) not a number (2) not 1 and not 2

    //for (1)
    if (Number.isNaN(Number(input)) == true) {
      myOutputValue = "sorry please enter a number.";
      return myOutputValue;
    }

    if (userInput != 1 && userInput != 2) {
      myOutputValue = "Please insert only either '1' or '2'.";
      return myOutputValue;
    }

    if (userInput == 1) {
      //if input is 1, let the first number go first. Else if input is 2, let second number go first
      player2Number = String(player2Array[0]) + String(player2Array[1]);
      myOutputValue = `Player 2, you chose Dice ${userInput} first.<br><br>You rolled ${player2Array}.<br><br>Your number is ${player2Number}.</b><br><br>${textToProceedToCheckWinner}`;
      // set to the next game mode
      currentGameMode = matchPlayer1Player2;
      console.log("game mode is changed to matchplayer1player2");
      return myOutputValue;
    } else if (userInput == Number("2")) {
      player2Number = String(player2Array[1]) + String(player2Array[0]);
      myOutputValue = `Player 2, you chose Dice ${userInput} first.<br>You rolled ${player2Array}.<br><b>Your number is ${player2Number}.</b><br><br>${textToProceedToCheckWinner}`;
      // set to the next game mode
      currentGameMode = matchPlayer1Player2;
      console.log("game mode is changed to matchplayer1player2");
      return myOutputValue;
    }
  }

  var outputText = `Player 1 chose ${player1Number} while Player 2 chose ${player2Number}.`;
  // game mode: check who is the winner. Final game mode!
  if (currentGameMode == matchPlayer1Player2) {
    //if game mode is matchplayer1player 2, check if numbers are same (draw), Else if then proceed

    if (Number(player1Number) == Number(player2Number)) {
      myOutputValue = `${outputText}<br>You've gotten a draw. Please try again.`;

      return myOutputValue;
    } else if (Number(player1Number) > Number(player2Number)) {
      myOutputValue = `${outputText}<br><br>Player 1 got a larger number than Player2. <br><br><b>Player 1 wins!</b> 🎉🔥🥳<br><br> Click submit to play again.`;
      isTheGameOver = true; //game is over, hence game is over

      return myOutputValue;
    } else if (Number(player1Number) < Number(player2Number)) {
      myOutputValue = `${outputText}<br><br>Player 2 got a larger number than player 1. 
    <br><br><b>Player 2 wins!</b> 🎉🔥🥳<br><br> Click submit to play again.`;
      isTheGameOver = true;
      return myOutputValue;
    }
  }
};

//crete function that resets game mode by reassigning game mode, array, and reset isTheGameFalse
var resetGame = function () {
  //reset game
  currentGameMode = player1Roll;
  console.log("the game is reset");
  player1Array = [];
  player2Array = [];
  isTheGameOver = false;
};

//main function
var main = function (input) {
  var finalOutput = beatThatGame(input);

  if (isTheGameOver) {
    resetGame();
  }

  return finalOutput;
};
