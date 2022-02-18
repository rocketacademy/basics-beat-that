// 1. player 1 rolls 2 dice (we use 'math random' to generate random number + 'while' loop to throw twice + 'array' to put into []..)
// 2. player 1 chooses
// 3. player 2 rolls 2 dice
// 4. player 2 chooses
// 5. we compare results

// first we set the states
var STATE_DICE_ROLL = "STATE_DICE_ROLL";
var STATE_CHOOSE_ORDER = "STATE_CHOOSE_ORDER";
var STATE_RESULTS = "STATE_RESULTS";

var gameState = STATE_DICE_ROLL;

// then we need to set array to figure out what goes into each user's choices (note there are only 2 dice rolls here)
var currentplayerRolls = [];

var currentPlayer = 1;
var allPlayersScore = [];

// okay, now we start and let's use the math.random function a few classes ago
var rollDice = function () {
  var randomDecimal = Math.random() * 6; // returns from 0.00001 to 0.99999; then * 5 = 0.00003 to 5.88888
  var randomInteger = Math.floor(randomDecimal) + 1; // rounds down with numbers: 0, 1, 2, 3, 4, 5 and adds 1 to become 6
  console.log("computer dice roll", randomInteger);
  return randomInteger;
};

// // now after we get rollDice, we will put it into counter that we learned last class; we let player 1 roll first and we want to roll twice
var rollDiceForPlayer = function () {
  var counter1 = 0;
  while (counter1 < 2) {
    // we roll twice
    currentplayerRolls.push(rollDice()); // we store (rolldice) results to this array called "currentplayerRolls"
    counter1 = counter1 + 1;
  }
  return (
    "Hello Player " +
    currentPlayer +
    "<br> For Dice 1, you rolled " +
    currentplayerRolls[0] +
    "<br> For Dice 2, you rolled " +
    currentplayerRolls[1] +
    "<br> Now choose either '1' or '2' to get your final dice value"
  );
};

// now we get the player's final score

var getPlayerScore = function (playerInput) {
  console.log("getPlayerScore() running"); // i put this console log here to find where the function runs in the console so i can spot the variables i'm looking for
  var playerScore;
  if (playerInput != 1 && playerInput != 2) {
    return "Please type either 1 or 2.";
  }
  if (playerInput == 1) {
    var playerScore = Number(
      String(currentplayerRolls[0]) + String(currentplayerRolls[1])
    );

    // push scores in [array]
    allPlayersScore.push(playerScore); // you are only pushing playerScore IF playerInput == 2 created new line aty line 60
    console.log("allPlayersScore array: ", allPlayersScore);

    // clear current player rolls array
    currentplayerRolls = [];

    return "Player " + currentPlayer + "<br> Your number is " + playerScore;
  }
  if (playerInput == 2) {
    var playerScore = Number(
      String(currentplayerRolls[1]) + String(currentplayerRolls[0])
    );

    // push scores in [array]
    allPlayersScore.push(playerScore); // you are only pushing playerScore IF playerInput == 2. I copied your logic here and pasted at line 60
    console.log("allPlayersScore array: ", allPlayersScore);

    // clear current player rolls array
    currentplayerRolls = [];

    return "Player " + currentPlayer + "<br> Your number is " + playerScore;
  }
  console.log("player score", playerScore);
};

//another helper function for comparing scores
var compareResults = function () {
  ResultsMessage =
    "Player 1 score: " +
    allPlayersScore[0] +
    "<br> Player 2 score: " +
    allPlayersScore[1];

  //player 1 wins
  if (allPlayersScore[0] > allPlayersScore[1]) {
    ResultsMessage = ResultsMessage + "<br> Player 1 WINS!!!";
  }
  // player 2 wins
  if (allPlayersScore[1] > allPlayersScore[0]) {
    ResultsMessage = ResultsMessage + "<br> Player 2 WINS!!!";
  }
  // same score
  if (allPlayersScore[0] == allPlayersScore[1]) {
    ResultsMessage = ResultsMessage + "<br> It's a TIE. Try again!!!";
  }
  return ResultsMessage;
};

// refresh game
var refreshGame = function () {
  currentPlayer = 1;
  gameState = STATE_DICE_ROLL;
  allPlayersScore = [];
};

// okay now main function

var main = function (input) {
  console.log("check game state", gameState);
  console.log("check player 1/2", currentPlayer);
  var outputMessage = "";
  if (gameState == STATE_DICE_ROLL) {
    console.log("game state", STATE_DICE_ROLL);

    outputMessage = rollDiceForPlayer();

    // change game state
    gameState = STATE_CHOOSE_ORDER;

    return outputMessage;
    // we must return output message in this if statement
    // this is because gameState changes at line 69
    // if we don't return, the code in main function goes into the second if statement!
  }

  if (gameState == STATE_CHOOSE_ORDER) {
    // callplayerscore function
    outputMessage = getPlayerScore(input);

    // Bryan's comments
    // You need an extra validation point here if input != 1 && input !=2
    // Test without the code below to see that when you put something other than 1 or 2, the game will still carry on
    if (input != 1 && input != 2) {
      return outputMessage;
    }

    // now we move to results stage
    if (currentPlayer == 1) {
      console.log("end of player 1, now player 2's turn");
      currentPlayer = 2;
      gameState = STATE_DICE_ROLL;
      return (
        outputMessage +
        "<br> It is now player 2's turn. <br> Press submit to roll Player 2's dice."
      );
    }

    if (currentPlayer == 2) {
      console.log("now we compare results");
      gameState = STATE_RESULTS;
      return outputMessage + " <br> Click 'Submit' to see who won!";
    }
  }
  // finally we see who won...
  if ((gameState = STATE_RESULTS)) {
    console.log("state: check results now");

    outputMessage = compareResults();

    refreshGame();

    return outputMessage;
  }
};
