///////////
// States//
///////////

var playerTurnState = 1;
var gameState = "waiting for player roll dice";

//////////////
// Variables//
//////////////

var digitsArray = [];
var playersDiceRollArray = [];
// Score
var playersScoreArray = [0, 0];

////////
//Main//
////////

var main = function (input) {
  var myOutputValue = "";

  // roll dice game state //

  if (gameState == "waiting for player roll dice") {
    // get dice roll and push to array
    var diceRoll1 = rollDice();
    var diceRoll2 = rollDice();
    digitsArray.push(diceRoll1);
    digitsArray.push(diceRoll2);

    // move to choose order game state after roll dice game state
    gameState = "waiting for player to choose order of dice";

    // show dice roll outcome to player and ask them to choose
    return `Welcome Player ${playerTurnState}!.
          <br><br>you rolled [ ${diceRoll1} ]  for Dice 1 and [ ${diceRoll2} ]  for Dice 2
          <br><br>Choose the order of the dice.`;
  }

  // choose order game state //

  if (gameState == "waiting for player to choose order of dice") {
    // validate input
    if (!(input == 1 || input == 2)) {
      return "Please select the order of your dice rolls by entering either [1] or [2].";
    }

    // change to roll dice state for next player
    gameState = "waiting for player roll dice";

    if (playerTurnState == 2) {
      // change to game outcome state
      gameState = "game outcome";

      return `Player ${playerTurnState}, you chose Dice ${input} first.
      <br><br>Your number is [ ${orderDiceRoll(input)} ].
      <br><br>Who beat who?`;
    }

    // show ordered dice roll outcome to player. Next player's turn
    myOutputValue = `Player ${playerTurnState}, you chose Dice ${input} first.
    <br><br>Your number is [ ${orderDiceRoll(input)} ].
    <br<br>It is now Player ${playerTurnState + 1}'s turn.`;

    // activate next player state
    if (playerTurnState == 1) {
      playerTurnState += 1;
    }

    // output dice roll outcome message
    return myOutputValue;
  }

  // game outcome state //

  if (gameState == "game outcome") {
    // if player 1's dice roll is bigger than player 2
    if (playersDiceRollArray[0] > playersDiceRollArray[1]) {
      storeScoresAndResetGame();

      return (
        `Player 1 won!! Better luck next time Player 2
      <br><br>Click Roll to play again!` + generateLeaderboardMessage()
      );
    }
    // else player 2's dice roll is larger
    storeScoresAndResetGame();

    return (
      `Player 2 won!! Better luck next time Player 1
      <br><br>Click Roll to play again!` + generateLeaderboardMessage()
    );
  }
};

/////////////////////
// Helper functions//
/////////////////////

var rollDice = function () {
  // generate single dice roll
  var randDecimal = Math.random() * 6;
  var randInt = Math.floor(randDecimal);
  var Diceroll = randInt + 1;
  return Diceroll;
};

var orderDiceRoll = function (userInput) {
  // determine positions in array where players digits are stored
  var diceOrderInput = Number(userInput);
  var order1 = 0 + (playerTurnState - 1) * 2;
  var order2 = 1 + (playerTurnState - 1) * 2;

  // orders digits into dice roll based on user input
  // where 1st digit comes first
  if (diceOrderInput == 1) {
    var diceRollNum = Number(`${digitsArray[order1]}${digitsArray[order2]}`);

    // store ordered dice roll to determine winner later
    playersDiceRollArray.push(diceRollNum);
    return diceRollNum;
  } else {
    // else 2nd digit comes first
    var diceRollNum = Number(`${digitsArray[order2]}${digitsArray[order1]}`);

    playersDiceRollArray.push(diceRollNum);
    return diceRollNum;
  }
};

var storeScoresAndResetGame = function () {
  // store players scores
  playersScoreArray[0] = playersScoreArray[0] + playersDiceRollArray[0]; // store player one's score
  playersScoreArray[1] = playersScoreArray[1] + playersDiceRollArray[1]; // store player two's score

  // reset arrays and game mode
  playerTurnState = 1;
  gameState = "waiting for player roll dice";
  digitsArray = [];
  playersDiceRollArray = [];
};

var generateLeaderboardMessage = function () {
  // assign player position and score according to running sum of scores
  // if player one score is higher
  if (playersScoreArray[0] > playersScoreArray[1]) {
    var firstPositionPlayer = "Player 1";
    var secondPositionPlayer = "Player 2";
    var firstPositionScore = playersScoreArray[0];
    var secondPositionScore = playersScoreArray[1];
  } else {
    // else player two score is higher
    var firstPositionPlayer = "Player 2";
    var secondPositionPlayer = "Player 1";
    var firstPositionScore = playersScoreArray[1];
    var secondPositionScore = playersScoreArray[0];
  }
  // return leaderboard message
  return `<br><br>################################
      <br>Leaderboard (Player/ Score):
      <br>${firstPositionPlayer}: ${firstPositionScore}
      <br>${secondPositionPlayer}: ${secondPositionScore}
      <br>#################################`;
};
