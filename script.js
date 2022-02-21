// Game type - choose which game to play
var gameType = "";

// Varible gameState is used to organize steps through game
var gameState = "start";

// Automatically compute and combine dice order and score
var autoCombine = true;

// Variable for responding to user
var message = "";

// Dice order 1 - first dice is left number, 2 - second dice is left number
var player1DiceOrder = 0;
var player2DiceOrder = 0;

// Number of games played
var totalGames = 0;

// Number of players wins
var player1Won = 0;
var player2Won = 0;

// Dices values
var player1Dice = [0, 0];
var player2Dice = [0, 0];

// Score after deciding dice order
var player1Score = 0;
var player2Score = 0;

// Game choosing message
var selectGameMessage = `Please enter game type to play:<br><br>
  basic - Basic Beat That! game<br>
  lowest - Lowest combined number`;

// Return random number from 1 to 6
var randomDice = function () {
  return Math.ceil(Math.random() * 6);
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
var calculateScore = function (dice1, dice2, order) {
  if (order == 1) {
    return dice1 * 10 + dice2;
  } else if (order == 2) {
    return dice2 * 10 + dice1;
  }
  return 0;
};

// Calculate best dice order in regard to game type
var getBestDiceOrder = function (dice1, dice2) {
  if (gameType == "basic") {
    if (dice1 >= dice2) {
      return 1;
    } else {
      return 2;
    }
  }
  if (gameType == "lowest") {
    if (dice1 <= dice2) {
      return 1;
    } else {
      return 2;
    }
  }
};

// Varible gameState for gameBasic
// start  - initial state
// p1roll - roll dice for player 1 and ask for dice order
// p1val  - validate input for player 1 and calculate score
// p2roll - roll dice for player 2 and ask for dice order
// p2val  - validate input for player 2 and calculate score, also print out who won and statistics
// score  - show score
// nextGame - invite for another round

var gameBasic = function (input) {
  if (gameState == "start") {
    message = `Welcome to Beat That game! <br><br>`;
    message += `Press button to roll dice for player 1`;
    gameState = "p1roll";
    return message;
  }

  if (gameState == "p1roll") {
    player1Dice[0] = randomDice();
    player1Dice[1] = randomDice();
    message = `Welcome Player 1.<br>`;
    message += `You rolled ${player1Dice[0]} for Dice 1 and ${player1Dice[1]} for Dice 2.<br>`;
    if (!autoCombine) {
      message += `Choose the order for the dice.`;
    }
    gameState = "p1val";
    return message;
  }

  if (gameState == "p1val") {
    if (!autoCombine) {
      input = parseInt(input);
      if (!validatePlayerInput(input)) {
        message = `You rolled ${player1Dice[0]} for Dice 1 and ${player1Dice[1]} for Dice 2.<br>`;
        message += `Choose the order for the dice.<br><br>`;
        message += `Please respond only with numer 1 or 2`;
        return message;
      } else {
        player1DiceOrder = input;
      }
      // autoCombine
    } else {
      player1DiceOrder = getBestDiceOrder(player1Dice[0], player1Dice[1]);
    }
    player1Score = calculateScore(
      player1Dice[0],
      player1Dice[1],
      player1DiceOrder
    );
    if (!autoCombine) {
      message = `Player 1, you chose Dice ${player1DiceOrder} first.<br>`;
    }
    message += `Your number is ${player1Score}.<br>`;
    message += `It is now Player 2's turn.`;
    gameState = "p2roll";
    return message;
  }

  if (gameState == "p2roll") {
    player2Dice[0] = randomDice();
    player2Dice[1] = randomDice();
    message = `Welcome Player 2.<br>`;
    message += `You rolled ${player2Dice[0]} for Dice 1 and ${player2Dice[1]} for Dice 2.<br>`;
    if (!autoCombine) {
      message += `Choose the order for the dice.`;
    }
    gameState = "p2val";
    return message;
  }

  if (gameState == "p2val") {
    if (!autoCombine) {
      input = parseInt(input);
      if (!validatePlayerInput(input)) {
        message = `You rolled ${player2Dice[0]} for Dice 1 and ${player2Dice[1]} for Dice 2.<br>`;
        message += `Choose the order for the dice.<br><br>`;
        message += `Please respond only with numer 1 or 2`;
        return message;
      } else {
        player2DiceOrder = input;
      }
      // autoCombine
    } else {
      player2DiceOrder = getBestDiceOrder(player2Dice[0], player2Dice[1]);
    }
    player2Score = calculateScore(
      player2Dice[0],
      player2Dice[1],
      player2DiceOrder
    );
    if (!autoCombine) {
      message = `Player 2, you chose Dice ${player2DiceOrder} first.<br>`;
    }
    message += `Your number is ${player2Score}.<br><br>`;
    message += `Press button to see results.`;
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
