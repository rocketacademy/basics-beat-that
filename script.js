//Base game rules
// Player 1 clicks submit, the game rolls 2 dice
// Player 1 chooses which dice number goes first
// The game outputs Player 1's number
// Player 2's turn
// Player with the higher combined number wins

//game mode for rolling dice
//game mode for choosing dice order
//switch between 2 players

//game modes
var gameMode_Roll_Dice = "Gamemode_roll_dice";
var gameMode_Dice_Order = "Gamemode_choose_right_order";

//start with dice roll game mode
var gameMode = gameMode_Roll_Dice;

// Keep track of current player's number - 1 or 2
// Start with player
var currentPlayer = 1;

// Keep track of each player's dice rolls.
var player1Dice = [];
var player2Dice = [];

//Each player's chosen numbers
var player1Num;
var player2Num;

// function for diceroll
var diceRoll = function () {
  randomRolledNum = Math.floor(Math.random() * 6) + 1;
  console.log(randomRolledNum);
  return randomRolledNum;
};

// Get dice roll for current player
// Populate current player's dice array
// Return the new dice rolls

var getDiceRolls = function () {
  //create an array newDiceRolls with 2 independent dice roll values
  var newDiceRolls = [diceRoll(), diceRoll()];

  // assign newDiceRolls to the current player's dice array
  if (currentPlayer == 1) {
    player1Dice = newDiceRolls;
  }

  // if current player is not player 1, assume it is player 2
  else {
    player2Dice = newDiceRolls;
  }
  // return new dice rolls to parent function
  return newDiceRolls;
};

// return a number that is a cocatenation of num1 and num 2
var cocatenate2Nums = function (num1, num2) {
  return Number(String(num1) + String(num2));
};

//Generate and store the player's number based on his dice rolls and chosen first dice.
var getPlayerNumber = function (chosenDiceNum) {
  // if it is Player 1's turn -- save to player1Dice array
  // if it is Player 2's turn -- save to player2Dice array
  var diceArray;
  if (currentPlayer == 1) {
    diceArray = player1Dice;
  } else {
    diceArray = player2Dice;
  }

  var playerNum;

  // If the chosen first dice is dice 1, create player number starting with 1st dice.

  if (chosenDiceNum == 1) {
    playerNum = cocatenate2Nums(diceArray[0], diceArray[1]);
  }
  //otherwise, create player number starting with 2nd dice.
  else {
    playerNum = cocatenate2Nums(diceArray[1], diceArray[0]);
  }

  //Store player num in the relevant global player num variable

  if (currentPlayer == 1) {
    player1Num = playerNum;
  } else {
    player2Num = playerNum;
  }

  //return generated player num to parent fuction

  return playerNum;
};

//Determine the winnder between Player 1 and Player 2
//Return either 1 or 2 to represent the winnder player.
//In the event of a tie, Player 2 wins.

var determineWinner = function () {
  if (player1Num > player2Num) {
    return 1;
  }
  return 2;
};

//Play Beat That

var main = function (input) {
  var myOutputValue = "hello world";

  //Roll 2 dice and show the player values

  if (gameMode === gameMode_Roll_Dice) {
    var newDiceRolls = getDiceRolls();
    //switch mode to choose dice order
    gameMode = gameMode_Dice_Order;
    return `Welcome player ${currentPlayer}.<br>You rolled Dice 1:${newDiceRolls[0]} and Dice 2: ${newDiceRolls[1]}.<br>Choose the order of the dice by entering 1 or 2 as the first numeral index.`;
  } else if (gameMode === gameMode_Dice_Order) {
    //validate the input. If first numeral indix is neither 1 nor 2, tell the user.
    var chosenDiceNum = Number(input);
    if (chosenDiceNum !== 1 && chosenDiceNum !== 2) {
      return `Please choose 1 or 2 as the first numeral index for your dice rolls.`;
    }

    // Get player number for curr player.
    var playerNum = getPlayerNumber(chosenDiceNum);
    var playerNumResponse = `Player ${currentPlayer}, you chose Dice${chosenDiceNum} first. <br>Your number is ${playerNum}`;

    //If currentPlayer is Player 1, change currPlayer to Player 2, switch mode to dice roll.
    if (currentPlayer == 1) {
      currentPlayer = 2;
      gameMode = gameMode_Roll_Dice;
      //Return player number to Player 1, let Player 2 know it is their turn.
      return `${playerNumResponse}<br>It is now Player 2's turn. Please Submit to roll Player 2's dice.`;
    }
    //Else if currentPlayer is Player 2, determine the winner and let the players who won.
    var winningPlayer = determineWinner();

    //Reset the game
    currentPlayer = 1;
    gameMode = gameMode_Roll_Dice;

    // Return the game end response
    return `${playerNumResponse}<br>Player${winningPlayer} has won.<br>Player 1's number ${player1Num} | Player 2's number ${player2Num}<br><br>Please submit to play agian.`;
  }
  // If we reach this point, there is an error because game mode is not what we expect
  return (myOutputValue = "An error occurred. Please refresh to start again.");
};
