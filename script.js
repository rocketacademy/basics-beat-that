console.log("Project 2 Beat That");

//BASE

// dice logic
var rollDice = function () {
  return Math.floor(Math.random() * 6) + 1;
};

//define game modes
var gameMode_Roll = "LET'S ROLL";
var gameMode_DiceOda = "CHOOSE DICE ODA";

//starting game mode
var gameModeNow = gameMode_Roll;

//define player variables
var playerNow = 1;

//record player dice rolls
var player1Dice = [];
var player2Dice = [];

//record player chosen numbers
var player1Num;
var player2Num;

//generate current rolls
var genRolls = function () {
  var currRolls = [rollDice(), rollDice()];

  //check and assign roll to player
  if (playerNow == 1) {
    player1Dice = currRolls;
  } else {
    player2Dice = currRolls;
  }
  return currRolls;
};

var combineDiceNum = function (num1, num2) {
  return Number(num1.toString() + num2.toString());
};

var getPlayerNum = function (firstDice) {
  var diceArray;
  if (playerNow === 1) {
    diceArray = player1Dice;
  } else {
    diceArray = player2Dice;
  }
  var diceArray = playerNow === 1 ? player1Dice : player2Dice;
  var playerNum;
  // If the chosen firstDice is 1, create player number starting with 1st dice
  if (firstDice === 1) {
    playerNum = combineDiceNum(diceArray[0], diceArray[1]);
  }
  // else create player number starting with 2nd dice
  else {
    playerNum = combineDiceNum(diceArray[1], diceArray[0]);
  }

  // Store player num in the relevant global player num variable
  if (playerNow === 1) {
    player1Num = playerNum;
  } else {
    player2Num = playerNum;
  }

  // Return generated player num to parent function
  return playerNum;
};

/**
 * Compute the winner between Player 1 and Player 2.
 * Return either 1 or 2 to represent the winning player.
 */
var determineWinner = function () {
  if (player1Num > player2Num) {
    return 1;
  }
  if (player1Num < player2Num) {
    return 2;
  }
  return 0;
};

//beatThat
var beatThat = function (input) {
  //check game mode
  if (gameModeNow == gameMode_Roll) {
    // Get dice rolls for curr player and populate the curr player's dice array
    var currRolls = genRolls();
    //update gameModeNow
    gameModeNow = gameMode_DiceOda;
    //prompt order selection
    return `Welcome Player ${playerNow}, <br/>
    You rolled ${currRolls[0]} for Dice 1 and ${currRolls[1]} for Dice 2. <br/>
    Choose the order of the dice.`;
  }
  if (gameModeNow == gameMode_DiceOda) {
    var firstDice = Number(input);
    //validate input
    if ((firstDice != 1) & (firstDice != 2)) {
      return "Please choose 1 or 2 as the first numeral index for your dice rolls";
    }

    //get current player number
    var playerNum = getPlayerNum(firstDice);
    var playerNumMsg = `Player ${playerNow}, you chose Dice ${firstDice} first,your number is ${playerNum}`;

    //chg to player 2
    if (playerNow == 1) {
      playerNow += 1;
      gameModeNow = gameMode_Roll;
      return `Player ${playerNow}'s turn. Press Submit to roll dice.`;
    } else winner = determineWinner();
  }
  //reset game mode
  playerNow = 1;
  gameModeNow = gameMode_Roll;

  //end game w/ Tie
  if (winner === 0) {
    return `${playerNumMsg} <br/>
    Player 1 has ${player1Num}; Player 2 has ${player2Num}; <br/>
    Tie! <br/>
    Submit to play again.`;
  }

  //End game w/ winner
  return `${playerNumMsg} <br/>
    Player 1 has ${player1Num}; Player 2 has ${player2Num}; <br/>
    Player ${winner} wins! <br/>
    Submit to play again.`;
};

/**/
var main = function (input) {
  return beatThat(input);
};
