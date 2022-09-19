var GAME_MODE_CHOOSE_NUM_PLAYERS = "GAME_MODE_CHOOSE_NUM_PLAYERS";
var GAME_MODE_CHOOSE_NUM_DICE = "GAME_MODE_CHOOSE_NUM_DICE";
var GAME_MODE_DICE_ROLL = "GAME_MODE_DICE_ROLL";
var GAME_MODE_CHOOSE_DICE_ORDER_AUTOMATICALLY =
  "GAME_MODE_CHOOSE_DICE_ORDER_AUTOMATICALLY";

var numDiceChosen = 0;

var numPlayers = 0;

var gameMode = GAME_MODE_CHOOSE_NUM_PLAYERS;

var currPlayer = 0;

var playerProfiles = [];

var roundWinner = null;

var getDiceRoll = function () {
  return Math.ceil(Math.random() * 6);
};

var getDiceRolls = function () {
  var newDiceRolls = [];
  for (var i = 0; i < numDiceChosen; i += 1) {
    newDiceRolls.push(getDiceRoll());
  }

  playerProfiles[currPlayer].diceRolls = newDiceRolls;

  return newDiceRolls;
};

var concatenate2Numbers = function (num1, num2) {
  return Number(String(num1) + String(num2));
};

var getPlayerNumberAutomatically = function () {
  var diceArray = playerProfiles[currPlayer].diceRolls;
  var playerNum;

  diceArray.sort(function (a, b) {
    return a - b;
  });

  while (diceArray.length > 0) {
    var largestNum = diceArray.pop();
    if (playerNum == null) {
      playerNum = largestNum;
    } else {
      playerNum = concatenate2Numbers(playerNum, largestNum);
    }
  }
  playerProfiles[currPlayer].diceNum = playerNum;
  return playerNum;
};

var determineWinner = function () {
  if (roundWinner == null) {
    roundWinner = playerProfiles[currPlayer];
  } else if (playerProfiles[currPlayer].diceNum > roundWinner.diceNum) {
    roundWinner = playerProfiles[currPlayer];
  }
};

var addNumToRunningScore = function (roundScore) {
  playerProfiles[currPlayer].score += roundScore;
};

var createLeaderBoardOutput = function () {
  var leaderBoardOutput = "Leaderboard: ";

  playerProfiles.sort((a, b) => b.score - a.score);
  for (var i = 0; i < playerProfiles.length; i += 1) {
    leaderBoardOutput +=
      "<br> Player " + playerProfiles[i].id + ": " + playerProfiles[i].score;
  }
  return leaderBoardOutput;
};

var resetGame = function () {
  currPlayer = 0;
  gameMode = GAME_MODE_CHOOSE_NUM_DICE;
  roundWinner = null;
};

var createDiceRollInfoMsg = function (diceRollsArr) {
  var outputMsg =
    "Welcome Player " +
    playerProfiles[currPlayer].id +
    ".<br> Your dice rolls are:";

  for (var i = 0; i < diceRollsArr.length; i += 1) {
    outputMsg += "<br> Dice " + (i + 1) + ": " + diceRollsArr[i];
  }
  return outputMsg;
};

var createPlayerProfiles = function () {
  for (var i = 0; i < numPlayers; i += 1) {
    playerProfiles.push({ id: i + 1, diceRolls: [], diceNum: 0, score: 0 });
  }
};
var totalReset = function () {
  currPlayer = 0;
  gameMode = GAME_MODE_CHOOSE_NUM_PLAYERS;
  roundWinner = null;
  playerProfiles = [];
  numPlayers = 0;
  numDiceChosen = 0;
};
//
var main = function (input) {
  console.log(gameMode);
  console.log(currPlayer);
  if (gameMode == GAME_MODE_CHOOSE_NUM_PLAYERS) {
    if (isNaN(input) == true) {
      return "Please enter a number between 2 players to 5 players";
    }
    if (Number(input) < 2) {
      return "At least 2 players to play! ";
    }
    if (Number(input) > 5) {
      return "Too crowded! Max 5 players, please. ";
    } else numPlayers = Number(input);

    createPlayerProfiles();

    gameMode = GAME_MODE_CHOOSE_NUM_DICE;
    return (
      "There are " +
      numPlayers +
      " players in this game. Please enter how many dice you would like to play with."
    );
  }

  if (gameMode == GAME_MODE_CHOOSE_NUM_DICE) {
    if (isNaN(input) == true) {
      return "Ops! Not a Number! Enter number from 2 dice to 6 dice. ";
    } else if (Number(input) < 2) {
      return "Try 2 dice or more! It's more fun this way. ";
    } else if (Number(input) > 6) {
      return "Too many dice! <br> Max 6 dice, please.";
    } else {
      numDiceChosen = Number(input);

      gameMode = GAME_MODE_DICE_ROLL;
      return (
        "You have chosen to play with " +
        numDiceChosen +
        " dice. Player 1, click submit to get your dice rolls"
      );
    }
  }

  if (gameMode == GAME_MODE_DICE_ROLL) {
    var newDiceRolls = getDiceRolls();

    gameMode = GAME_MODE_CHOOSE_DICE_ORDER_AUTOMATICALLY;

    var diceRollInfo = createDiceRollInfoMsg(newDiceRolls);
    return diceRollInfo;
  }
  if (gameMode == GAME_MODE_CHOOSE_DICE_ORDER_AUTOMATICALLY) {
    var playerNum = getPlayerNumberAutomatically();

    var playerNumResponse =
      "Player " +
      playerProfiles[currPlayer].id +
      ", your number is " +
      playerProfiles[currPlayer].diceNum +
      ".";

    addNumToRunningScore(playerNum);
    determineWinner();
    //if (playerProfiles[currPlayer].id < numPlayers) {
    if (currPlayer + 1 < numPlayers) {
      gameMode = GAME_MODE_DICE_ROLL;

      currPlayer += 1;

      return (
        playerNumResponse +
        "<br> It is now Player " +
        playerProfiles[currPlayer].id +
        "'s turn. Press Submit to roll the dice"
      );
    }
    console.log(playerProfiles);

    var leaderBoardOutput = createLeaderBoardOutput();

    var myOutputValue =
      playerNumResponse +
      " <br><br> Player " +
      roundWinner.id +
      " won this round. <br> <br> <br>" +
      leaderBoardOutput +
      "<br><br> To continue playing enter the number of dice you would like to play with, and click submit.";

    resetGame();

    return myOutputValue;
  }

  return "An error occurred. Please refresh to start again.";
};
