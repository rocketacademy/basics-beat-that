// Global Variables
var GAME_MODE_ROLL_DICE = "GAME_MODE_ROLL_DICE";
var GAME_MODE_SELECT_ORDER = "GAME_MODE_SELECT_ORDER";
var GAME_MODE_HIGHEST_COMBINED_NUMBER = "GAME_MODE_HIGHEST_COMBINED_NUMBER";
var GAME_MODE_KNOCKOUT = "GAME_MODE_KNOCKOUT";

var playersDiceRolls = [];
var playersScore = [];
var playersNumber = [];
var gameMode = null;
var numberOfDice = null;
var numberOfPlayer = null;
var playerAction = GAME_MODE_ROLL_DICE;

var main = function (input) {
  // Local Variables
  var playersOutputNumbersString = "";
  var myOutputValue = "";

  // Game mode selection
  if (!gameMode) {
    if (input == "Highest Value") {
      gameMode = GAME_MODE_HIGHEST_COMBINED_NUMBER;
      return `Highest number game mode selected <br>
              Select Number of Dice to roll`;
    } else if (input == "Knockedout") {
      gameMode = GAME_MODE_KNOCKOUT;
      return `Knockedout game mode selected <br> 
              Select Number of Dice to roll`;
    } else {
      return "Please enter 'Highest Value' mode or 'Knockout' mode";
    }
  }

  // Change game mode
  if (input.includes("Game Mode: ")) {
    if (input.includes("Highest Value")) {
      getReset();
      gameMode = GAME_MODE_HIGHEST_COMBINED_NUMBER;
      return "You have chosen Highest Value game mode";
    } else if (input.includes("Lowest Value")) {
      getReset();
      gameMode = GAME_MODE_KNOCKOUT;
      return "You have chosen Knockedout game mode";
    }
  }

  // Number of Dice
  if (!numberOfDice) {
    if (!input) {
      return "Enter Number of Dice to roll";
    }

    if (numberOfPlayer > 0) {
      numberOfDice = input;
      return `${numberOfDice} of dice <br>
              Click submit to continue`;
    }

    numberOfDice = input;
    return `${numberOfDice} of dice selected <br>
            Please select number of players to play this round`;
  }

  // Number of Player
  if (!numberOfPlayer) {
    if (!input) {
      return "Enter number of player to play this round";
    }

    for (var players = 0; players < input; players += 1) {
      playersScore.push(0);
    }
    numberOfPlayer = input;
    return `${numberOfPlayer} of players to play this round`;
  }

  // Highest Value Game Mode
  if (gameMode === GAME_MODE_HIGHEST_COMBINED_NUMBER) {
    // Roll Dice mode
    if (playerAction === GAME_MODE_ROLL_DICE) {
      var myOutputValue = "";
      for (var player = 0; player < numberOfPlayer; player += 1) {
        playersDiceRolls.push(getDiceNumbers(numberOfDice));
        myOutputValue += `Player ${player + 1}: ${
          playersDiceRolls[player]
        } <br>`;
      }
      playerAction = GAME_MODE_SELECT_ORDER;
      console.log(myOutputValue);
      return `The players rolled: <br>
              ${myOutputValue}`;
    }

    // Get Optimal Number
    if (playerAction === GAME_MODE_SELECT_ORDER) {
      var myOutputValue = "";
      for (var player = 0; player < numberOfPlayer; player += 1) {
        playersNumber.push(Number(generateNumber(player)));
        myOutputValue += `Player ${player + 1}: ${playersNumber[player]} <br>`;
      }
    }
    playersOutputNumbersString = `The players numbers are: <br>
                                  ${myOutputValue}`;
  }

  // Knockout Game Mode
  if (gameMode === GAME_MODE_KNOCKOUT) {
  }

  // Check Winner and reset
  var winner = getWinner(playersNumber);
  var leaderboardOutput = getLeaderboard(playersScore);
  getReset();

  return `${playersOutputNumbersString} <br><br>
          ${winner} <br><br>
          Leaderboard: <br>
          ${leaderboardOutput}`;
};

// Functions //
var rollDice = function () {
  var diceNumber = Math.floor(Math.random() * 6) + 1;
  return diceNumber;
};

var getDiceNumbers = function (diceNumber) {
  var currentPlayerDice = [];
  for (var dices = 0; dices < diceNumber; dices += 1) {
    currentPlayerDice.push(rollDice());
  }
  return currentPlayerDice;
};

var generateNumber = function (index) {
  var numberOutput = "";
  playersDiceRolls[index].sort(function (a, b) {
    return b - a;
  });
  for (var dice = 0; dice < numberOfDice; dice += 1) {
    numberOutput = numberOutput + playersDiceRolls[index][dice];
    console.log(numberOutput);
  }
  return numberOutput;
};

var getReset = function () {
  playersDiceRolls = [];
  playersNumber = [];
  gameMode = null;
  numberOfDice = null;
  // numberOfPlayer = null;
  playerAction = GAME_MODE_ROLL_DICE;
};

var getWinner = function (numbers) {
  var output = "";
  var highestNumber = Math.max(...numbers);
  var playerWithHighestNum = playersNumber.indexOf(highestNumber);
  console.log(playerWithHighestNum);

  // Add score
  playersScore[playerWithHighestNum] += 1;

  output = `Player ${playerWithHighestNum + 1} Wins`;
  return output;
};

var getLeaderboard = function (score) {
  var initialScore = [];
  initialScore = [...score];
  var scoreboard = [];
  var scoreboardIndex = [];
  var leaderboardOutput = "";

  for (var x = 0; x < numberOfPlayer; x += 1) {
    var highestNum = 0;
    var highestNumIndex = 0;
    for (var y = 0; y < numberOfPlayer; y += 1) {
      if (initialScore[y] > highestNum) {
        highestNum = initialScore[y];
        highestNumIndex = y;
      } else if (initialScore[y] == highestNum) {
        highestNum = initialScore[y];
        highestNumIndex = y;
      }
    }
    scoreboard.push(highestNum);
    scoreboardIndex.push(highestNumIndex);
    initialScore[highestNumIndex] = null;
    leaderboardOutput += `Player ${scoreboardIndex[x] + 1}: ${
      scoreboard[x]
    } <br>`;
  }

  return leaderboardOutput;
};
