var gameMode_ROLL_DICE = "GAME_ROLL_DICE";
var gameMode_CHOOSE_DICE = "CHOOSE_DICE";
var gameMode_COMPARE_SCORES = "COMPARE_SCORES";
var gameMode = gameMode_ROLL_DICE;
var diceRollResults = [];
var allPlayerResults = [];
var playerCount = 1;
var output = "";

///////////////////////////////////
// 1. DICE ROLL FUNCTION
///////////////////////////////////
var rollDice = function () {
  // produce a decimal between 0 and 6
  var randomDecimal = Math.random() * 6;
  // remove the decimal
  var randomInteger = Math.floor(randomDecimal);
  // add 1 to get a number between 1 and 6 inclusive
  var diceNumber = randomInteger + 1;
  return diceNumber;
};
///////////////////////////////////
// 2. ROLLS DICE TWICE
///////////////////////////////////
var playerRollDice = function () {
  for (counter = 0; counter < 2; counter += 1) {
    diceRollResults.push(rollDice());
  }
  return (
    "Welcome Player " +
    playerCount +
    ", you rolled " +
    diceRollResults[0] +
    " for Dice one and " +
    diceRollResults[1] +
    " for Dice two. <br>Choose the order of the dice by inputting either '1' or '2'"
  );
};
///////////////////////////////////
// 3. CHOOSE ORDER OF DICE
///////////////////////////////////
var playerChooseDice = function (inputDice) {
  var twodigit;
  //if order is neither 1 nor 2 - input validation
  if (inputDice != 1 && inputDice != 2) {
    console.log("Error, input is not 1 or 2");
    chooseDiceMessage =
      "Please key in '1' or '2' only to choose your dice order. <br>Your dice one is: " +
      diceRollResults[0] +
      " and your dice two is: " +
      diceRollResults[1];
    return chooseDiceMessage;
  }
  //if player is player 1
  if (playerCount == 1) {
    //if order of dice is 1
    if (inputDice == 1) {
      twodigit = "" + Number(diceRollResults[0]) + Number(diceRollResults[1]);
    }
    //if order of dice is 2
    if (inputDice == 2) {
      var twodigit =
        "" + Number(diceRollResults[1]) + Number(diceRollResults[0]);
    }
    //twodigit = 55; ** Add as control to test for tie scores
    allPlayerResults.push(twodigit);
    gameMode = gameMode_ROLL_DICE;
    chooseDiceMessage =
      "Player " +
      playerCount +
      ", you chose Dice " +
      inputDice +
      " first. <br> Your score is " +
      twodigit +
      ". <br><br> It is now Player 2's turn! <br>Player 2, click 'Submit!' to roll your dice!";
    playerCount = 2;
    diceRollResults = [];
    return chooseDiceMessage;
  }

  //if player is player 2
  if (playerCount == 2) {
    var twodigit = "";
    if (inputDice == 1) {
      twodigit = "" + Number(diceRollResults[0]) + Number(diceRollResults[1]);
    }
    //if order of dice is 2
    if (inputDice == 2) {
      twodigit = "" + Number(diceRollResults[1]) + Number(diceRollResults[0]);
    }
    //twodigit = 55; ** Add as control to test for tie scores
    allPlayerResults.push(twodigit);
    chooseDiceMessage =
      "Player " +
      playerCount +
      ", You chose Dice " +
      inputDice +
      " first.<br> Your score is " +
      twodigit +
      ". <br><br> Click 'Submit!' to compare your scores!";
    gameMode = gameMode_COMPARE_SCORES;
    diceRollResults = [];
    return chooseDiceMessage;
  }
  return chooseDiceMessage;
};

///////////////////////////////////
// 4. COMPARE PLAYER SCORES
///////////////////////////////////
var compareScores = function () {
  //Player 1 score is higher
  if (allPlayerResults[0] > allPlayerResults[1]) {
    return (
      "Player 1: " +
      allPlayerResults[0] +
      "<br> Player 2: " +
      allPlayerResults[1] +
      "<br><br> Player 1 wins with a total score of: " +
      allPlayerResults[0] +
      "! <br>Click 'Submit' to play again!"
    );
  }
  //Player 2 score is higher
  if (allPlayerResults[1] > allPlayerResults[0]) {
    return (
      "Player 1: " +
      allPlayerResults[0] +
      "<br> Player 2: " +
      allPlayerResults[1] +
      "<br><br> Player 2 wins with a total score of: " +
      allPlayerResults[1] +
      "! <br>Click 'Submit' to play again!"
    );
  }
  // If scores are tied
  return (
    "Player 1: " +
    allPlayerResults[0] +
    "<br> Player 2: " +
    allPlayerResults[1] +
    "<br><br> It's a tie! <br>Click 'Submit' to play again!"
  );
};

//////////////////////////////////
// 5. RESET GAME
/////////////////////////////////
var resetGame = function () {
  playerCount = 1;
  allPlayerResults = [];
  gameMode = gameMode_ROLL_DICE;
};

///////////////////////////////////
// ******* MAIN FUNCTION ************
///////////////////////////////////
var main = function (input) {
  console.log("Gamemode:" + gameMode);
  console.log("Player is now player: " + playerCount);
  var outputMessage = "";
  //When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.

  if (gameMode === gameMode_ROLL_DICE) {
    outputMessage = playerRollDice();
    //change gameMode for next player
    gameMode = gameMode_CHOOSE_DICE;
    console.log("After rolled dice, gamemode is:" + gameMode);
    return outputMessage;
  }
  //When player is asked to choose the order
  if (gameMode === gameMode_CHOOSE_DICE) {
    outputMessage = playerChooseDice(input);
    return outputMessage;
  }

  //call function to compare scores then reset game
  if (gameMode == gameMode_COMPARE_SCORES) {
    outputMessage = compareScores();
    console.log("Comparing scores is done. Winner announced.");
    resetGame();

    return outputMessage;
  }
};
