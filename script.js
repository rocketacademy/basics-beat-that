//GLOBAL VARIABLE
//game mode. waiting for game to start as default.
//game step. Continuation from basic game structure. Allows for division of functions within each game mode.
var gameMode = "waiting for game to start";
var gameStep = "player 1 roll dice";

//store player dice number with array.
var playerNumber = [];

//store player combined number with array.
var player1CombinedNumber = [];
var player2CombinedNumber = [];

//global round counter.
var roundCounter = 1;

//FUNCTION 1
// create roll dice function.
var rollDice = function () {
  // Generate a decimal from 0 through 6, inclusive of 0 and exclusive of 6.
  var randomDecimal = Math.random() * 6;

  // Remove the decimal with the floor operation.
  // This will be an integer from 0 to 5 inclusive.
  var randomInteger = Math.floor(randomDecimal);

  // Add 1 to get valid dice rolls of 1 through 6 inclusive.
  var diceNumber = randomInteger + 1;

  return diceNumber;
};

//FUNCTION 2 - rolls Dice 1 and 2
// call roll dice 1 & dice 2
var playerDice = function () {
  var dice1Number = rollDice();
  var dice2Number = rollDice();

  // produce both numbers in an array to player.
  playerNumber = [dice1Number, dice2Number];
};

//FUNCTION 3 - Sum up player 1's numbers every round and 2's numbers every round, and announce winner for current round
var sumPlayerNumbers = function () {
  var winnerResult = "";
  //create loop to sum up all previous rounds' numbers saved in the CombinedNumber array of each player.
  var index = 0;
  var player1NumberSum = 0;
  var player2NumberSum = 0;
  while (index < roundCounter) {
    var player1NumberSum = player1NumberSum + player1CombinedNumber[index];
    var player2NumberSum = player2NumberSum + player2CombinedNumber[index];
    index += 1;
  }

  //Rules for winning, drawing, and losing the round, for the NORMAL game.
  if (gameMode == "normal mode") {
    if (player1NumberSum > player2NumberSum) {
      winnerResult = `Player 1 is in the lead! <br><br> <u><b>LEADERBOARD</u> <br><br> 1. Player 1 : ${player1NumberSum} <br> 2. Player 2 : ${player2NumberSum}  </b><br><br> Congratulations to Player 1!<br> Click "submit" to start a new round!`;
    } else if (player1NumberSum == player2NumberSum) {
      winnerResult = `Both players are equal! <br><br> <u><b>LEADERBOARD</u> <br><br> 1. Player 1 : ${player1NumberSum} <br> 1. Player 2 : ${player2NumberSum}  </b><br><br> Click "submit" to start a new round!`;
    } else
      winnerResult = `Player 2 is in the lead! <br><br> <u><b>LEADERBOARD</u> <br><br> 1. Player 2 : ${player2NumberSum} <br> 2. Player 1 : ${player1NumberSum}  </b><br><br> Click "submit" to start a new round!`;
    return winnerResult;
  }

  //Rules for winning, drawing, and losing the round, for the LOWEST NUMBER game.
  else if (gameMode == "lowest number mode") {
    if (player1NumberSum < player2NumberSum) {
      winnerResult = `Player 1 is in the lead! <br><br> <u><b>LEADERBOARD</u> <br><br> 1. Player 1 : ${player1NumberSum} <br> 2. Player 2 : ${player2NumberSum}  </b><br><br> Congratulations to Player 1!<br> Click "submit" to start a new round!`;
    } else if (player1NumberSum == player2NumberSum) {
      winnerResult = `Both players are equal! <br><br> <u><b>LEADERBOARD</u> <br><br> 1. Player 1 : ${player1NumberSum} <br> 1. Player 2 : ${player2NumberSum}  </b><br><br> Click "submit" to start a new round!`;
    } else
      winnerResult = `Player 2 is in the lead! <br><br> <u><b>LEADERBOARD</u> <br><br> 1. Player 2 : ${player2NumberSum} <br> 2. Player 1 : ${player1NumberSum}  </b><br><br> Click "submit" to start a new round!`;
    return winnerResult;
  }
};

//FUNCTION 4 - NORMAL GAME MODE
var playNormalGame = function () {
  var myOutputValue = "";
  // call function 2 for player 1.
  // automatically throw dice and assign number for most optimal result.
  // let player 1 know the result.
  // change game mode to player 2.
  if (gameStep == "player 1 roll dice") {
    gameStep = "change to player 2";
    myOutputValue = playerDice();
    if (playerNumber[0] >= playerNumber[1]) {
      player1CombinedNumber.push(
        Number(playerNumber[0] * 10 + playerNumber[1])
      );
    } else
      player1CombinedNumber.push(
        Number(playerNumber[1] * 10 + playerNumber[0])
      );

    myOutputValue = `Welcome Player 1. <br>You rolled ${
      playerNumber[0]
    } for Dice 1 and ${
      playerNumber[1]
    } for Dice 2. <br><br> The system has automatically combined the two numbers for the best value possible of ${
      player1CombinedNumber[roundCounter - 1]
    }. <br><br> Please click "submit" and pass the control to Player 2.`;

    return myOutputValue;
  }

  // give an intermediate page for player 1 to change to player 2.
  else if (gameStep == "change to player 2") {
    gameStep = "player 2 roll dice";
    myOutputValue = `Welcome Player 2. <br> Please click "submit" when ready.`;
    return myOutputValue;
  }
  // call function 2 for player 2.
  // automatically throw dice and assign number for most optimal result.
  // let player 2 know the result.
  // change game mode to player 2.
  else if (gameStep == "player 2 roll dice") {
    myOutputValue = playerDice();
    if (playerNumber[0] >= playerNumber[1]) {
      player2CombinedNumber.push(
        Number(playerNumber[0] * 10 + playerNumber[1])
      );
    } else
      player2CombinedNumber.push(
        Number(playerNumber[1] * 10 + playerNumber[0])
      );
    gameStep = "choose winner";
    return `Welcome Player 2. <br>You rolled ${
      playerNumber[0]
    } for Dice 1 and ${
      playerNumber[1]
    } for Dice 2. <br><br> The system has automatically combined the two numbers for the best value possible of ${
      player2CombinedNumber[roundCounter - 1]
    }. <br><br> Let's find out who wins!`;
  }
  // change game mode to compare player 1 and 2 numbers.
  // call function 3.
  // return to player 1 roll dice game mode to restart round.
  else if (gameStep == "choose winner") {
    myOutputValue = sumPlayerNumbers();
    roundCounter += 1;

    gameStep = "player 1 roll dice";
  }
  return myOutputValue;
};

//FUNCTION 6 - LOWEST GAME MODE
var playLowestGame = function (playerChoice) {
  var myOutputValue = "";
  // call function 2 for player 1.
  // automatically throw dice and assign number for most optimal result.
  // let player 1 know the result.
  // change game mode to player 2.
  if (gameStep == "player 1 roll dice") {
    gameStep = "change to player 2";
    myOutputValue = playerDice();
    if (playerNumber[0] <= playerNumber[1]) {
      player1CombinedNumber.push(
        Number(playerNumber[0] * 10 + playerNumber[1])
      );
    } else
      player1CombinedNumber.push(
        Number(playerNumber[1] * 10 + playerNumber[0])
      );

    myOutputValue = `Welcome Player 1. <br>You rolled ${
      playerNumber[0]
    } for Dice 1 and ${
      playerNumber[1]
    } for Dice 2. <br><br> The system has automatically combined the two numbers for the best value possible of ${
      player1CombinedNumber[roundCounter - 1]
    }. <br><br> Please click "submit" and pass the control to Player 2.`;
    return myOutputValue;
  }

  // give an intermediate page for player 1 to change to player 2.
  else if (gameStep == "change to player 2") {
    gameStep = "player 2 roll dice";
    myOutputValue = `Welcome Player 2. <br> Please click "submit" when ready.`;
    return myOutputValue;
  }
  // call function 2 for player 2.
  // automatically throw dice and assign number for most optimal result.
  // let player 2 know the result.
  // change game mode to player 2.
  else if (gameStep == "player 2 roll dice") {
    myOutputValue = playerDice();
    if (playerNumber[0] <= playerNumber[1]) {
      player2CombinedNumber.push(
        Number(playerNumber[0] * 10 + playerNumber[1])
      );
    } else
      player2CombinedNumber.push(
        Number(playerNumber[1] * 10 + playerNumber[0])
      );
    gameStep = "choose winner";
    return `Welcome Player 2. <br>You rolled ${
      playerNumber[0]
    } for Dice 1 and ${
      playerNumber[1]
    } for Dice 2. <br><br> The system has automatically combined the two numbers for the best value possible of ${
      player2CombinedNumber[roundCounter - 1]
    }. <br><br> Let's find out who wins!`;
  }
  // change game mode to compare player 1 and 2 numbers.
  // call function 3.
  // return to player 1 roll dice game mode to restart round.
  else if (gameStep == "choose winner") {
    myOutputValue = sumPlayerNumbers();
    roundCounter += 1;

    gameStep = "player 1 roll dice";
  }
  return myOutputValue;
};

//MAIN FUNCTION
var main = function (input) {
  var myOutputValue = "";

  // allows for choosing of game mode and execution of various game modes.
  if (gameMode == "waiting for game to start") {
    gameMode = "choose game mode";
    myOutputValue = `Welcome! <br> Please enter "normal" to select the original Beat That! mode <br> OR <br> "lowest number" to select the lowest number Beat That! mode.`;
    //validation of input for game mode.
  } else if (gameMode == "choose game mode") {
    if (!(input == "normal" || input == "lowest number")) {
      return `Please input a valid option "normal" or "lowest number".`;
    }
    //normal game mode
    else if (input == "normal") {
      gameMode = "normal mode";
      myOutputValue = `Original Beat That! mode has been selected. <br> In this mode, the player with the <b>highest</b> number wins! Good luck!<br><br> Please click "submit" to start the game! <br> Player 1 goes first.`;

      //lowest number game mode.
    } else if (input == "lowest number") {
      gameMode = "lowest number mode";
      myOutputValue = `Lowest number mode has been selected. <br> In this mode, the player with the <b>lowest</b> number wins! Good luck!<br><br>Please click "submit" to start the game!<br> Player 1 goes first.`;
    }
    //execution of normal mode
  } else if (gameMode == "normal mode") {
    myOutputValue = playNormalGame(input);
    //execution of lowest number mode
  } else if (gameMode == "lowest number mode") {
    myOutputValue = playLowestGame(input);
  }

  return myOutputValue;
};
