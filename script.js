var GAME_STAGE_DICE_ROLL = "GAME_STAGE_DICE_ROLL";
var GAME_STAGE_DICE_CHOICE = "GAME_STAGE_DICE_CHOICE";
var GAME_STAGE_CHOOSE_DICE_ORDER_AUTOMATICALLY =
  "GAME_STAGE_CHOOSE_DICE_ORDER_AUTOMATICALLY";
var REGULAR = "REGULAR";
var LOWEST_COMBINED_NUMBER = "LOWEST_COMBINED_NUMBER";

var stage = null;

var gameStage = GAME_STAGE_DICE_ROLL;

var currentPlayer = 1;

var player1Dice = [];
var player2Dice = [];

var player1Num;
var player2Num;

var playerProfiles = [
  { id: 1, score: 0 },
  { id: 2, score: 0 },
];

function getDiceRoll() {
  return Math.floor(Math.random() * 6) + 1;
}

function getDiceRolls() {
  var newDiceRolls = [getDiceRoll(), getDiceRoll()];

  if (currentPlayer == 1) {
    player1Dice = newDiceRolls;
  } else {
    player2Dice = newDiceRolls;
  }

  return newDiceRolls;
}

function sortArray(anArray) {
  for (var i = 0; i < anArray.length - 1; i++) {
    for (var j = 0; j < anArray.length - 1; j++) {
      if (anArray[j] > anArray[j + 1]) {
        var temp = anArray[j];
        anArray[j] = anArray[j + 1];
        anArray[j + 1] = temp;
      }
    }
  }
  return anArray;
}

function getPlayerNumAuto() {
  var diceArray;
  if (currentPlayer == 1) {
    diceArray = player1Dice;
  } else {
    diceArray = player2Dice;
  }

  var playerNum;
  sortArray(diceArray);

  while (diceArray.length > 0) {
    var largestNum = diceArray.pop();

    if (playerNum == null) {
      playerNum = largestNum;
    } else {
      if ((stage = LOWEST_COMBINED_NUMBER)) {
        playerNum = Number(String(largestNum) + String(playerNum));
      } else {
        playerNum = Number(String(playerNum) + String(largestNum));
      }
    }
  }

  if (currentPlayer == 1) {
    player1Num = playerNum;
  } else {
    player2Num = playerNum;
  }

  return playerNum;
}

function updateCurrentRoundRoll(playerNum) {
  if (currentPlayer == 1) {
    player1Num = playerNum;
  } else {
    player2Num = playerNum;
  }
}

function winnerSelection() {
  if (stage == REGULAR && player1Num > player2Num) {
    return 1;
  } else if (stage == LOWEST_COMBINED_NUMBER && player1Num < player2Num) {
    return 1;
  } else {
    return 2;
  }
}

function addNumToRunningScore(roundScore) {
  if (currentPlayer == 1) {
    playerProfiles[0].score += roundScore;
  }

  if (currentPlayer == 2) {
    playerProfiles[1].score += roundScore;
  }
}

function createLeaderBoardOutput() {
  var leaderBoardOutput = "Leaderboard: <br>";

  if (stage == REGULAR) {
    if (playerProfiles[0].score > playerProfiles[1].score) {
      for (var i = 0; i < playerProfiles.length; i += 1) {
        leaderBoardOutput +=
          "Player " +
          playerProfiles[i].id +
          ": " +
          playerProfiles[i].score +
          "<br>";
      }
    } else if (playerProfiles[1].score > playerProfiles[0].score) {
      for (var i = playerProfiles.length - 1; i > -1; i -= 1) {
        leaderBoardOutput +=
          "Player " +
          playerProfiles[i].id +
          ": " +
          playerProfiles[i].score +
          "<br>";
      }
    }
    return leaderBoardOutput;
  }

  if (stage == LOWEST_COMBINED_NUMBER) {
    if (playerProfiles[0].score < playerProfiles[1].score) {
      for (var i = 0; i < playerProfiles.length; i += 1) {
        leaderBoardOutput +=
          "Player " +
          playerProfiles[i].id +
          ": " +
          playerProfiles[i].score +
          "<br>";
      }
    } else if (playerProfiles[1].score < playerProfiles[0].score) {
      for (var i = playerProfiles.length - 1; i > -1; i -= 1) {
        leaderBoardOutput +=
          "Player " +
          playerProfiles[i].id +
          ": " +
          playerProfiles[i].score +
          "<br>";
      }
    }
    return leaderBoardOutput;
  }
}

function resetGame() {
  currentPlayer = 1;
  gameStage = GAME_STAGE_DICE_ROLL;
}

function main(input) {
  if (!stage) {
    // Validet that input is one of the modes
    if (input != REGULAR && input != LOWEST_COMBINED_NUMBER) {
      return (
        "Please choose one of the following modes:<br> 1. " +
        REGULAR +
        "<br> 2. " +
        LOWEST_COMBINED_NUMBER
      );
    }
    // if the input is valid, re-assign mode with the input value
    stage = input;
    return (
      "You have selected " +
      stage +
      " mode. Player " +
      currentPlayer +
      ", click submit to roll your dice"
    );
  }

  if (gameStage == GAME_STAGE_DICE_ROLL) {
    var newDiceRolls = getDiceRolls();
    gameStage = GAME_STAGE_CHOOSE_DICE_ORDER_AUTOMATICALLY;
    return `Welcome Player ${currentPlayer}. <br>
      You rolled Dice 1: ${newDiceRolls[0]} and Dice 2: ${newDiceRolls[1]}. <br>
      Click SUBMIT to see your final number.`;
  }

  if (gameStage == GAME_STAGE_CHOOSE_DICE_ORDER_AUTOMATICALLY) {
    var playerNum = getPlayerNumAuto();
    var playerNumResponse =
      "Player " + currentPlayer + ", your number is " + playerNum;

    // Update player's current round number
    updateCurrentRoundRoll(playerNum);

    // Add the playerNum to player's running score
    addNumToRunningScore(playerNum);

    // If currPlayer is Player 1, change currPlayer to Player 2, switch mode to dice roll
    if (currentPlayer == 1) {
      currentPlayer = 2;
      gameStage = GAME_STAGE_DICE_ROLL;
      // Return player number to Player 1, let Player 2 know it is their turn
      return (
        playerNumResponse +
        " <br> It is now Player 2's turn. Press Submit to roll Player 2's dice."
      );
    }

    var winningPlayer = winnerSelection();

    resetGame();

    var leaderBoardOutput = createLeaderBoardOutput();

    return `${playerNumResponse} <br>
      Player ${winningPlayer} has won. <br>
      Player 1's number: ${player1Num}<br>
      Player 2's number: ${player2Num}<br><br>
      ${leaderBoardOutput}<br><br>
      Press Submit to play again.`;
  }

  return "Something is wrong. Please refresh to start again.";
}
