// Game type - choose which game to play
var gameType = "";

// Dice number per player
var diceNumber = 0;

// Number of players
var playersNum = 0;

// Current player playing
var currentPlayer = 1;

// Varible gameState is used to organize steps through game
var gameState = "start";

// Variable for responding to user
var message = "";

// Number of games played
var totalGames = 0;

// Number of players wins
var playersWon = [];

// Dices values
var playersDice = [];

// Score after deciding dice order
var playersScore = 0;

// Game choosing message
var selectGameMessage = `Please enter game type to play:<br><br>
  basic - Basic Beat That! game<br>
  lowest - Lowest combined number<br>`;

// Return array of random numbers from 1 to 6. Array length = number of dice being played with.
var randomDice = function () {
  var currentRoll = [];

  for (var i = 0; i < diceNumber; i += 1) {
    currentRoll[i] = Math.ceil(Math.random() * 6);
  }
  return currentRoll;
};

// Check, if player responded with allowed input for dice order
var validatePlayerInput = function (input) {
  if (input == 1 || input == 2) {
    return true;
  } else {
    return false;
  }
};

// Calculate score
var calculateScore = function (dice) {
  var score = 0;
  var diceNum = dice.length;

  // Sort numbers in array
  if (gameType != "lowest") {
    dice.sort(function (a, b) {
      return a - b;
    });
  } else {
    dice.sort(function (a, b) {
      return b - a;
    });
  }

  for (var i = 0; i < diceNum; i += 1) {
    score *= 10;
    score += dice.pop();
  }
  return score;
};

var gameBasic = function (input) {
  if (gameState == "start") {
    message = `Welcome to Beat That game! <br><br>`;
    message += `Press button to roll dice for player ${currentPlayer}`;
    gameState = "playerRoll";
    return message;
  }

  if (gameState == "playerRoll") {
    playersDice[currentPlayer] = randomDice();
    message = `Welcome Player ${currentPlayer}.<br>`;
    message += `You rolled ${playersDice[currentPlayer]}.<br>`;
    gameState = "playerVal";
    return message;
  }

  if (gameState == "playerVal") {
    playersScore[currentPlayer] = calculateScore(playersDice[currentPlayer]);
    message += `Your number is ${playersScore[currentPlayer]}.<br>`;
    if (currentPlayer < playersNum) {
      message += `It is now Player ${currentPlayer + 1}'s turn.`;
      currentPlayer += 1;
      gameState = "playerRoll";
    }
    gameState = "score";
    return message;
  }

  if (gameState == "score") {
    message = "";
    if (player1Score == player2Score) {
      message += `It's a tie.<br><br>`;
    } else if (
      (player1Score > player2Score && gameType == "basic") ||
      (player1Score < player2Score && gameType == "lowest")
    ) {
      player1Won += 1;
      message += `Player 1 won this round with ${player1Score} vs ${player2Score}!<br><br>`;
    } else {
      player2Won += 1;
      message += `Player 2 won this round with ${player2Score} vs ${player1Score}!<br><br>`;
    }
    totalGames += 1;
    var leaderBoard = [
      `Player 1 won ${player1Won} times.<br>`,
      `Player 2 won ${player2Won} times.<br>`,
    ];
    if (player1Won >= player2Won) {
      message += leaderBoard[0] + leaderBoard[1];
    } else {
      message += leaderBoard[1] + leaderBoard[0];
    }
    message += `You've played total of ${totalGames} rounds of game.<br><br>`;
    message += `Press button for another round of game<br><br>`;
    message += `or "exit" to select different game mode:`;
    gameState = "nextGame";
    return message;
  }

  if (gameState == "nextGame") {
    if (input == "") {
      message = `Press button to roll dice for player 1`;
      gameState = "p1roll";
    } else if (input == "exit") {
      gameState = "start";
      gameType = "";
      return selectGameMessage;
    }
    return 'Please just press button for new game or write "exit" to choose different game!';
  }
};

var main = function (input) {
  if (diceNumber == 0 && gameType == "" && input == "") {
    return "Please enter number of dice to play with!";
  }

  if (diceNumber == 0 && gameType == "") {
    input = parseInt(input);
    if (input > 0) {
      diceNumber = input;
      return `You have chosen ${diceNumber} dice to play with!<br><br>Please enter numer of players!`;
    }
    return "Please enter number of dice to play with!";
  }

  if (diceNumber != 0 && playersNum == 0) {
    input = parseInt(input);
    if (input > 0) {
      playersNum = input;
      return `You have chosen ${playersNum} players to play with!<br><br>`;
    }
    return "Please enter number of players!";
  }

  if (gameType == "") {
    input = input.toLowerCase();
    if (input == "basic") {
      gameType = input;
    } else if (input == "lowest") {
      gameType = input;
    }

    switch (gameType) {
      case "basic":
        return "You have chosen basic Beat That! game";
      case "lowest":
        return "You have chosen lowest combined number game";
      default:
        return selectGameMessage;
    }
  } else if (gameType == "basic" || gameType == "lowest") {
    return gameBasic(input);
  }
};
