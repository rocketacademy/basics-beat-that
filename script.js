//2 players and each take tuns
//When a player clicks Submit, the game rolls 2 dice and shows the dice rolls
//The player picks the order of the dice they want
//choose how the player specifies dice order
//After both players have rolled and chosen dice order, the player with the higher combined number wins.

var start = "Start of game";
var chooseDiceOrder = "Choose Dice Order";
var compareFinalNumb = "Compare Final Number";
var gameMode = start;

//Determine player
var startingPlayer = 1;

//Dice tracking
var player1Dice = [];
var player2Dice = [];

//Track choice
var player1choice;
var player2choice;

function main(input) {
  //Start game, roll dice for 1st player
  if (gameMode == start) {
    var startingRoll = getDice();
    gameMode = chooseDiceOrder;
    return `Hi! Player ${startingPlayer}. <br>
    Your first Dice is ${startingRoll[0]} and your second Dice is ${startingRoll[1]} <br>
    Please choose your first digit base on your dice, 1 or 2`;
  }

  //Move onto chosing dice
  if (gameMode == chooseDiceOrder) {
    var diceChoice = Number(input);
    //Validate input
    if (diceChoice !== 1 && diceChoice !== 2) {
      return "Please select 1st or 2nd dice to proceed";
    }

    //Combine the 2 dice base on dice choice
    var combinedNumb = getPlayerChoice(diceChoice);
    var confirm = `Player ${startingPlayer}, you chose Dice ${diceChoice}.
    Your number is ${combinedNumb}`;

    //To change game mode for winner, after player2 decision made
    if (startingPlayer == 2) {
      gameMode = compareFinalNumb;
    }

    //Loop back and let player2 start
    if (startingPlayer === 1) {
      startingPlayer = 2;
      gameMode = start;
      return `${confirm}. <br>
    It is now Player 2's turn. Please press submit to roll dice`;
    }
    //GetWinner
    if (gameMode == compareFinalNumb) {
      var winner = getWinner();
    }
  }
  return `${confirm} <br>
  Player ${winner} is the Winner <br>
  Player 1's Number is ${player1choice} and Player 2's Number is ${player2choice}
  Thank you for playing`;
}

//Gen random dice
function diceRoll() {
  var diceNumber = Math.floor(Math.random() * 6) + 1;
  //convert diceNumber to string
  return diceNumber.toString();
}

//Diceroll for player
function getDice() {
  //Log the 2 dice roll for players
  var newDiceRoll = [diceRoll(), diceRoll()];
  console.log(newDiceRoll);

  //Assign newDiceRoll to current player
  if (startingPlayer == 1) {
    player1Dice = newDiceRoll;
  } else if (startingPlayer != 1) {
    player2Dice = newDiceRoll;
  }
  return newDiceRoll;
}
//function for number
function combiningDiceNumb(numb1, numb2) {
  return numb1 + numb2;
}

//function for combining number base on player and player choice
function getPlayerChoice(diceChoice) {
  var finalNumb = "";
  if ((startingPlayer = 1)) {
    if (diceChoice == 1) {
      finalNumb = combiningDiceNumb(player1Dice[0], player1Dice[1]);
    } else {
      finalNumb = combiningDiceNumb(player1Dice[1], player1Dice[0]);
    }
  } else if (startingPlayer != 1) {
    if (diceChoice == 1) {
      finalNumb = combiningDiceNumb(player2Dice[0], player2Dice[1]);
    } else {
      finalNumb = combiningDiceNumb(player2Dice[1], player2Dice[0]);
    }
  }

  //Log the combined number back to global variable
  if (startingPlayer == 1) {
    player1choice = finalNumb;
  } else if (startingPlayer !== 1) {
    player2choice = finalNumb;
  }
  console.log(finalNumb);
  return finalNumb;
}

//Winner
function getWinner() {
  if (player1choice > player2choice) {
    return 1;
  } else {
    return 2;
  }
}
