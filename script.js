/* Beat That - Base
Requirements
1. There are 2 players and players take turns.
2. When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
3. The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player        
   specifies dice order.
4. After both players have rolled and chosen dice order, the player with the higher combined number wins.

Objectives:
1. 1v1 player vs player dice roll game &&
2. Roll 2 dice and concentate the 2 dice number together &&
3. Players can choose order of dice to concentate (dice 1 + dice 2 || dice 2 + dice 1)

What is required?
1. Dice Roll helper function
2. Global states for different gamemode
3. Game function
4. Instructions for user
*/

//GLOBAL VARIABLES
var currentGameMode = "welcomeToBeatThat"; //Starting Game Mode
var player1 = ""; //Player 1 IGN
var player2 = ""; //Player 2 IGN

var userChosenDiceOrder = ""; //User desired dice order, either 1 or 2 (input = userDiceOrder)

// player 1 dice results, store in array for later use, prevent another diceroll to reset results too.
var player1dice1Arr = [];
var player1dice2Arr = [];
// player 2 dice results, store in array for later use, prevent another diceroll to reset results too.
var player2dice1Arr = [];
var player2dice2Arr = [];

var player1Score = ""; //Player 1 score at the end of turn
var player2Score = ""; //Player 2 score at the end of turn

// Dice Roll helper function
var rollDice = function () {
  // produces a float between 0 and 6
  var randomFloat = Math.random() * 6;
  // take off the decimal
  var resultInteger = Math.floor(randomFloat) + 1;
  console.log(`rollDice function, ${resultInteger}`);
  return resultInteger;
};

// Player 1 Result Function
var player1Result = function (player1, player2, userChosenDiceOrder) {
  var myOutputValue = "";
  if (currentGameMode == "player1Roll") {
    var diceRoll1 = rollDice();
    player1dice1Arr.push(diceRoll1);
    console.log(`dice roll 1 : ${diceRoll1}`);
    console.log(`player 1 dice 1 array, ${player1dice1Arr}`);

    var diceRoll2 = rollDice();
    player1dice2Arr.push(diceRoll2);
    console.log(`dice roll 2 : ${diceRoll2}`);
    console.log(`player 1 dice 2 array, ${player1dice2Arr}`);

    //Summary Result Message + Note on how to choose dice order
    myOutputValue = `Your rolled dice result: <br><br>
  dice 1 : ${player1dice1Arr} <br><br>
  dice 2 : ${player1dice2Arr} <br><br>
  Please choose the order of desired dice result. <br>
  Type 1 and click enter if you wish for dice 1 to be the first number <br>
  Type 2 and click enter if you wish for dice 2 to be the first number`;

    currentGameMode = "player1Choice"; //Change game mode to allow player 1 to decide dice order
    console.log(`diceResult of both dice rolled, ${myOutputValue}`);
  }
  // Chosen dice 1 to be first
  else if (currentGameMode == "player1Choice" && userChosenDiceOrder == 1) {
    myOutputValue = `${player1} have chose dice 1 to be the first in order, your result is ${player1dice1Arr}${player1dice2Arr} <br><br>
     ${player2}, you may now begin to roll the dice by clicking enter.`;

    player1Score = `${player1dice1Arr}${player1dice2Arr}`; // Player 1 score

    console.log(`player 1 score, ${player1Score}`);
    console.log(`user Chosen Dice Order, ${userChosenDiceOrder}`);
    console.log(`Dice 1 as first number results, ${myOutputValue}`);

    currentGameMode = "player2Roll"; //Change game mode to player 2 turn to roll
    console.log(
      `Player 1 turn end, now is player 2 turn. Current mode : ${currentGameMode}`
    );

    return myOutputValue;
  } else if (currentGameMode == "player1Choice" && userChosenDiceOrder == 2) {
    myOutputValue = `${player1} have chose dice 2 to be the first in order, your result is ${player1dice2Arr}${player1dice1Arr} <br><br>
     ${player2}, you may now begin to roll the dice by clicking enter.`;

    player1Score = `${player1dice2Arr}${player1dice1Arr}`; // Player 1 score

    console.log(`player 1 score, ${player1Score}`);
    console.log(`user Chosen Dice Order, ${userChosenDiceOrder}`);
    console.log(`Dice 2 as first number results, ${myOutputValue}`);

    currentGameMode = "player2Roll"; // Change game mode to player 2 turn to roll
    console.log(
      `Player 1 turn end, now is player 2 turn. Current mode : ${currentGameMode}`
    );
  } else if (
    currentGameMode == "player1Choice" &&
    (userChosenDiceOrder !== 2 || userChosenDiceOrder !== 1)
  ) {
    myOutputValue = `You have enter an invalid input for dice order. Pleaser enter either a 1 or 2 to choose your dice order. Thank you! <br><br>
    Your rolled dice result: <br><br>
  dice 1 : ${player1dice1Arr} <br><br>
  dice 2 : ${player1dice2Arr} <br><br>
  Please choose the order of desired dice result. <br>
  Type 1 and click enter if you wish for dice 1 to be the first number <br>
  Type 2 and click enter if you wish for dice 2 to be the first number
    `;

    console.log(
      `Invalid input, current mode should still be player choice : ${currentGameMode}`
    );
    return myOutputValue;
  }
  return myOutputValue;
};
// Player 2 Result Function
var player2Result = function (player2, userChosenDiceOrder) {
  var myOutputValue = "";
  if (currentGameMode == "player2Roll") {
    var diceRoll1 = rollDice();
    player2dice1Arr.push(diceRoll1);
    console.log(`dice roll 1 : ${diceRoll1}`);
    console.log(`dice 1 array, ${player2dice1Arr}`);

    var diceRoll2 = rollDice();
    player2dice2Arr.push(diceRoll2);
    console.log(`dice roll 2 : ${diceRoll2}`);
    console.log(`dice 2 array, ${player2dice2Arr}`);

    //Summary Result Message + Note on how to choose dice order
    myOutputValue = `Your rolled dice result: <br><br>
    dice 1 : ${player2dice1Arr} <br><br>
  dice 2 : ${player2dice2Arr} <br><br>
  Please choose the order of desired dice result. <br>
  Type 1 and click enter if you wish for dice 1 to be the first number <br>
  Type 2 and click enter if you wish for dice 2 to be the first number`;

    currentGameMode = "player2Choice"; //Change game mode to allow player 2 to decide dice order
    console.log(`diceResult of both dice rolled, ${myOutputValue}`);
  }
  // Chosen dice 1 to be first
  else if (currentGameMode == "player2Choice" && userChosenDiceOrder == 1) {
    myOutputValue = `${player2} have chose dice 1 to be the first in order, your result is ${player2dice1Arr}${player2dice2Arr} <br><br>
     Please click enter to view the game outcome.`;

    player2Score = `${player2dice1Arr}${player2dice2Arr}`; // Player 2 score

    console.log(`player 2 score, ${player2Score}`);
    console.log(`user Chosen Dice Order, ${userChosenDiceOrder}`);
    console.log(`Dice 1 as first number results, ${myOutputValue}`);

    currentGameMode = "gameOutcome"; // Change to game outcome mode
    console.log(
      `Both players turn has ended, moving on to game outcome. Current mode : ${currentGameMode}`
    );

    return myOutputValue;
  } else if (currentGameMode == "player2Choice" && userChosenDiceOrder == 2) {
    myOutputValue = `${player2} have chose dice 2 to be the first in order, your result is ${player2dice2Arr}${player2dice1Arr} <br><br>
    Please click enter to view the game outcome.`;

    player2Score = `${player2dice2Arr}${player2dice1Arr}`; // Player 2 score

    console.log(`player 2 score, ${player2Score}`);
    console.log(`user Chosen Dice Order, ${userChosenDiceOrder}`);
    console.log(`Dice 2 as first number results, ${myOutputValue}`);

    currentGameMode = "gameOutcome"; // Change to game outcome mode
    console.log(
      `Both players turn has ended, moving on to game outcome. Current mode : ${currentGameMode}`
    );
    return myOutputValue;
  } else if (
    currentGameMode == "player2Choice" &&
    (userChosenDiceOrder !== 2 || userChosenDiceOrder !== 1)
  ) {
    myOutputValue = `You have enter an invalid input for dice order. Pleaser enter either a 1 or 2 to choose your dice order. Thank you! <br><br>
      Your rolled dice result: <br><br>
    dice 1 : ${player2dice1Arr} <br><br>
    dice 2 : ${player2dice2Arr} <br><br>
    Please choose the order of desired dice result. <br>
    Type 1 and click enter if you wish for dice 1 to be the first number <br>
    Type 2 and click enter if you wish for dice 2 to be the first number
      `;

    console.log(
      `Invalid input, current mode should still be player choice : ${currentGameMode}`
    );
    return myOutputValue;
  }
  return myOutputValue;
};

var gameOutcome = function (player1, player2) {
  myOutputValue = "";
  if (player1Score > player2Score) {
    myOutputValue = `Congratz ${player1} for winning!!! <br><br>
    ${player1} BEATS ${player2} with a score of ${player1Score} against ${player2Score} <br><br>
    Click enter to start another new game`;
    return myOutputValue;
  } else if (player2Score > player1Score) {
    myOutputValue = `Congratz ${player2} for winning!!! <br><br>
     ${player2} BEATS ${player1} with a score of ${player2Score} against ${player1Score}<br><br>
    Click enter to start another new game`;
    return myOutputValue;
  }
};

//Beat That Game Function
var beatThatGame = function () {};

var main = function (input) {
  var myOutputValue = "";

  if (currentGameMode == "welcomeToBeatThat") {
    //Opening message + Instructions
    myOutputValue = `Welcome to BEAT THAT!<br><br>
     BEFORE starting the game, please ENTER desired player 1 In Game Name (IGN) and click ENTER, followed by player 2. <br><br>
      Game Rules: <br>
      1. This is a 2 person, player vs player game. <br>
2. The game will roll 2 dice and show the dice rolls result. For example, dice 1 rolled 3 and dice 2 rolled 4. <br>
3. The player that rolled the dice will pick the order of the dice.(If they wanted the number 43, they would specify that the 2nd dice goes first.) <br>
4. After both players have rolled and chosen their dice order, the player with the higher combined number wins.  `;

    currentGameMode = "enterPlayer1";

    return myOutputValue;
  }
  if (currentGameMode == "enterPlayer1") {
    //Set player 1 IGN
    player1 = input;

    currentGameMode = "enterPlayer2";

    console.log(`currentGameMode, ${currentGameMode}`);
    console.log(`Player 1 IGN, player 1: ${player1}`);

    myOutputValue = `Welcome ${player1}. Player 2, please enter your desired IGN and click enter. `;
  } else if (currentGameMode == "enterPlayer2") {
    //Set player 2 IGN
    player2 = input;

    currentGameMode = "player1Roll"; //Switch to Game Result for player 1

    console.log(`currentGameMode, ${currentGameMode}`);
    console.log(`Player 2 IGN, player 2: ${player2}`);

    myOutputValue = `Welcome ${player2}. <br><br>
    ${player1}, you may begin to start the game by clicking enter.`;
  } else if (
    // Condition for player 1 turn
    //player 1 turn + player 1 result
    currentGameMode == "player1Roll" || //Dice results of player 1
    currentGameMode == "player1Choice" //player 1 desired outcome
  ) {
    userChosenDiceOrder = input;
    myOutputValue = player1Result(player1, player2, userChosenDiceOrder);
    return myOutputValue;
  } else if (
    //player 2 turn + player 2 result
    currentGameMode == "player2Roll" || //Dice results of player 2
    currentGameMode == "player2Choice" //player 2 desired outcome
  ) {
    userChosenDiceOrder = input;
    myOutputValue = player2Result(player2, userChosenDiceOrder);
    return myOutputValue;
  } else if (currentGameMode == "gameOutcome") {
    myOutputValue = gameOutcome(player1, player2); // results outcome

    //Reset Game Mode
    currentGameMode = "welcomeToBeatThat";

    //Reset both player dice array
    player1dice1Arr = [];
    player1dice2Arr = [];
    player2dice1Arr = [];
    player2dice2Arr = [];

    //Reset player scores
    player1Score = ""; //Player 1 score at the end of turn
    player2Score = ""; //Player 2 score at the end of turn
    return myOutputValue;
  }

  return myOutputValue;
};
