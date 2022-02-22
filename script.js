var ROLL_DICE = "ROLL_DICE";
var CHOOSE_DICE = "CHOOSE_DICE";
var COMPARE_SCORE = "COMPARE_SCORE";
var RESET_GAME = "RESET_GAME";
var PROMPT_GAMEMODE = "PROMPT_GAMEMODE";
var game_state = ROLL_DICE;
var currentPlayer = 1;
var combineScore;
var playerInput;
var allScoresDict = {};
var playerScores = [];
var GAME_STARTED = false;
var gameMode;

// function that roll dice randomly
var rollDice = function (input) {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal) + 1;
  return randomInteger;
};

// roll a random dice and push it to the scores
var playerRollDice = function () {
  var counter = 0;
  while (counter < 2) {
    playerScores.push(rollDice());
    counter += 1;
  }
  return (
    `Welcome player ${currentPlayer}, <br> Your current dice rolls are: ` +
    playerScores[0] +
    " and " +
    playerScores[1] +
    ". <br> Choose the order of the dice by entering 1 or 2."
  );
};

// concatenate 2 scores to form a number
var concatScores = function (num1, num2) {
  return Number(String(num1) + String(num2));
};

// dice ordering
var getPlayerScore = function (playerInput) {
  var combineScore;
  console.log(typeof playerInput);

  if (playerInput != 1 && playerInput != 2) {
    return "Error! Please key in either 1 or 2";
  } else if (playerInput == 1) {
    combineScore = concatScores(playerScores[0], playerScores[1]);
  } else if (playerInput == 2) {
    combineScore = concatScores(playerScores[1], playerScores[0]);
  }
  //storing the scores of each player in a dictionary
  allScoresDict[currentPlayer] = combineScore;
  playerScores = [];
  return `Player: ${currentPlayer}, your chosen number is: ${combineScore}`;
};

// normal mode of determine winner
var determineWinner = function () {
  if (allScoresDict[1] > allScoresDict[2]) {
    return `Player 1 wins! <br> Player 1's score: ${allScoresDict[1]} <br> Player 2's score: ${allScoresDict[2]}`;
  }
  if (allScoresDict[1] == allScoresDict[2]) {
    return `It's a draw!! <br> Player 1's score: ${allScoresDict[1]} <br> Player 2's score: ${allScoresDict[2]}`;
  }
  if (allScoresDict[1] < allScoresDict[2]) {
    return `Player 2 wins! <br> Player 1's score: ${allScoresDict[1]} <br> Player 2's score: ${allScoresDict[2]}`;
  }
};

// reverse mode of determining winner
var reverseWinner = function () {
  if (allScoresDict[1] < allScoresDict[2]) {
    return `Player 1 wins! <br> Player 1's score: ${allScoresDict[1]} <br> Player 2's score: ${allScoresDict[2]}`;
  }
  if (allScoresDict[1] == allScoresDict[2]) {
    return `It's a draw!! <br> Player 1's score: ${allScoresDict[1]} <br> Player 2's score: ${allScoresDict[2]}`;
  }
  if (allScoresDict[1] > allScoresDict[2]) {
    return `Player 2 wins! <br> Player 1's score: ${allScoresDict[1]} <br> Player 2's score: ${allScoresDict[2]}`;
  }
};

// reset the game back to its original state
var gameReset = function () {
  playerScores = [];
  currentPlayer = 1;
  allScoresDict = {};
  game_state = ROLL_DICE;
  GAME_STARTED = false;
  return "Click submit to play again";
};

//main function
var main = function (input) {
  console.log("gameMode: " + gameMode);

  //
  if (input !== "Normal" && input !== "Reverse" && GAME_STARTED == false) {
    game_state = PROMPT_GAMEMODE;
    return "Please choose your game mode - type in either Normal or Reverse: <br><br> Normal: biggest score wins! <br> Reverse: lowest score wins!";
  }

  if (game_state == PROMPT_GAMEMODE) {
    gameMode = input;
    game_state = ROLL_DICE;
  }

  GAME_STARTED = true;

  if (game_state == ROLL_DICE) {
    output = playerRollDice();
    game_state = CHOOSE_DICE;
    console.log(game_state);

    return output;
  }

  if (game_state == CHOOSE_DICE) {
    console.log("passed");
    output = getPlayerScore(input);
    console.log("getplayerscore");
    if (output == "Error! Please key in either 1 or 2") {
      return output;
    }

    if (currentPlayer == 1) {
      currentPlayer = 2;
      console.log("player 2's turn");
      game_state = ROLL_DICE;
      return output + "<br><br> Now it's player 2's turn!";
    }
    if (currentPlayer == 2) {
      game_state = COMPARE_SCORE;
      console.log("passed palyer 2");
      return output + "<br><br> Press submit to see who wins!";
    }
  }
  if (game_state == COMPARE_SCORE) {
    if (gameMode == "Normal") {
      console.log("normalMode triggered");
      output = determineWinner();
      game_state = RESET_GAME;
      return output;
    }

    if (gameMode == "Reverse") {
      output = reverseWinner();
      console.log("reverseMode triggered");
      game_state = RESET_GAME;
      return output;
    }
  }
  if (game_state == RESET_GAME) {
    output = gameReset();
    return output;
  }
};
