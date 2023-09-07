// There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.

// things to do
// 1. input validation: null input,
// 2. implement turn counter
// 3. win and lost status for each player
// 4. store each player's roll in an array for comparison
// 5. add instructions on how to play the game
// 6.

// global variables
var turnCounter = 0;
var player1InputCheck = "";
var player2InputCheck = "";

// global variables for player status
var playerOneWinStatusCounter = 0;
var playerOneLoseStatusCounter = 0;
var playerTwoWinStatusCounter = 0;
var playerTwoLoseStatusCounter = 0;
var playerTieStatus = 0;
var playerOneChoice = "";
var playerTwoChoice = "";

// player score records
var playerOneRoll = [];
var playerTwoRoll = [];

// var main = function (input) {
//   var myOutputValue = randomDiceRoll();
//   return myOutputValue;
// };

// this is the game counter

var gameCounter = function (turnCounter) {
  return turnCounter;
};

var playerOne = function (input1) {
  player1InputCheck = input1.toLowerCase();

  if (player1InputCheck == "") {
    return "Please type <b><u>'play'</b></u> to roll your dices <br>and start the game. <br><br> Good Luck Player One!!";
  }

  if (player1InputCheck == "play") {
    playerOneChoice = playerOneDiceRoll();
  } else if (player1InputCheck == "keep") {
    playerOneChoice = playerOneDiceDecisionK();
  } else if (player1InputCheck == "swap") {
    playerOneChoice = playerOneDiceDecisionS();
  } else if (player1InputCheck == "result") {
    playerOneChoice = compareResults();
  }

  return playerOneChoice;
};

var playerTwo = function (input2) {
  player2InputCheck = input2.toLowerCase();

  if (player2InputCheck == "") {
    return "Please type <b><u>'play'</b></u> to roll your dices <br>and start the game. <br><br> Good Luck Player Two !! ";
  }

  if (player2InputCheck == "play") {
    playerTwoChoice = playerTwoDiceRoll();
  } else if (player2InputCheck == "keep") {
    playerTwoChoice = playerTwoDiceDecisionK();
  } else if (player2InputCheck == "swap") {
    playerTwoChoice = playerTwoDiceDecisionS();
  } else if (player2InputCheck == "result") {
    playerTwoChoice = compareResults();
  }

  return playerTwoChoice;
};

// this is the dice rolling function returning number 1 - 6

var playerOneDiceRoll = function () {
  var diceRoll_1 = randomDiceRoll();
  var diceRoll_2 = randomDiceRoll();

  var playerOneChoice =
    "Player One, you have rolled the following: " +
    "<br><br>Dice one: " +
    diceRoll_1 +
    "<br> & " +
    "<br>Dice two: " +
    diceRoll_2 +
    "<br><br> Would you like to keep or swap their positions? <br><br><br>Type <u><b>'keep'</b></u> to use the current configuration.<br><br>Type <u><b>'swap'</b></u> to change their positions";
  playerOneRoll.push(diceRoll_1, diceRoll_2);
  console.log(playerOneRoll);
  return playerOneChoice;
};

var playerOneDiceDecisionK = function () {
  var diceRoll_1 = playerOneRoll[0];
  var diceRoll_2 = playerOneRoll[1];

  var playerOneDecisionK =
    "Player One, you have chosen to keep the dice." +
    "<br><br> New dice one: " +
    diceRoll_1 +
    " <br>& " +
    " <br>New dice two: " +
    diceRoll_2 +
    " <br><br>Please wait for Player Two to complete their turn before <br>typing <u><b>'result'</b></u> to get the comparison.";

  return playerOneDecisionK;
};
var playerOneDiceDecisionS = function () {
  var diceTemp = playerOneRoll[0];
  playerOneRoll[0] = playerOneRoll[1];
  playerOneRoll[1] = diceTemp;

  var diceRoll_1 = playerOneRoll[0];
  var diceRoll_2 = playerOneRoll[1];

  var playerOneDecisionS =
    "Player One, you have chosen to swap the dice." +
    "<br><br>New dice one: " +
    diceRoll_1 +
    " <br>& " +
    " <br>New dice two: " +
    diceRoll_2 +
    " <br><br>Please wait for Player Two to complete their turn before <br>typing <u><b>'result'</b></u> to get the comparison.";

  return playerOneDecisionS;
};

var playerTwoDiceRoll = function () {
  var diceRoll_1 = randomDiceRoll();
  var diceRoll_2 = randomDiceRoll();

  var playerTwoChoice =
    "Player Two, you have rolled the following: " +
    "<br><br>Dice one: " +
    diceRoll_1 +
    " <br>& " +
    " <br>Dice two: " +
    diceRoll_2 +
    "<br> Would you like to keep or swap their positions? <br><br><br>Type <u><b>'keep'</b></u> to use the current configuration.<br><br>Type <u><b>'swap'</b></u> to change their positions";
  playerTwoRoll.push(diceRoll_1, diceRoll_2);
  console.log(playerTwoRoll);
  return playerTwoChoice;
};

var playerTwoDiceDecisionK = function () {
  var diceRoll_1 = playerTwoRoll[0];
  var diceRoll_2 = playerTwoRoll[1];

  var playerTwoDecision =
    "Player Two, you have chosen to swap the dice." +
    "<br><br>New dice one: " +
    diceRoll_1 +
    " <br>& " +
    " <br>New dice two: " +
    diceRoll_2 +
    " <br><br>If Player One has completed their turn, <br>type <u><b>'result'</b></u> to get the comparison";

  return playerTwoDecision;
};

var playerTwoDiceDecisionS = function () {
  var diceTemp = playerTwoRoll[0];
  playerTwoRoll[0] = playerTwoRoll[1];
  playerTwoRoll[1] = diceTemp;

  var diceRoll_1 = playerTwoRoll[0];
  var diceRoll_2 = playerTwoRoll[1];

  var playerTwoDecision =
    "Player Two, you have chosen to swap the dice." +
    "<br><br>New dice one: " +
    diceRoll_1 +
    "<br>& " +
    "<br>New dice two: " +
    diceRoll_2 +
    " <br><br>If Player One has completed their turn, <br>type <u><b>'result'</b></u> to get the comparison.";

  return playerTwoDecision;
};

var compareResults = function () {
  var playerOneDice = JSON.stringify(playerOneRoll);
  var playerTwoDice = JSON.stringify(playerTwoRoll);
  playerOneDice = Number.playerOneDice;
  playerTwoDice = Number.playerTwoDice;
  console.log(playerOneDice, playerTwoDice);
  if (playerOneDice > playerTwoDice) {
    comparisonResult =
      "Player One's roll of " +
      playerOneDice +
      " <br> is greater than <br>Player Two's roll of " +
      playerTwoDice +
      "<br><br>Player One Wins this round.";

    playerOneWinStatusCounter += 1;
    playerTwoLoseStatusCounter += 1;
  } else if (playerOneDice < playerTwoDice) {
    comparisonResult =
      "Player One's roll of " +
      playerOneDice +
      " <br> is lesser than <br>Player Two's roll of " +
      playerTwoDice +
      "<br><br>Player Two Wins this round.";

    playerTwoWinStatusCounter += 1;
    playerOneLoseStatusCounter += 1;
  } else {
    comparisonResult =
      "Player One's roll of " +
      playerOneDice +
      " <br> is the same as <br><br>Player Two's roll of " +
      playerTwoDice +
      "<br><br>both players tie this round.";

    playerTieStatus += 1;
  }

  turnCounter += 1;
  return comparisonResult;
};

// Function for random dice roller
var randomDiceRoll = function () {
  var randomDiceRollOutcome = Math.floor(Math.random() * 6) + 1;
  // console.log("dice roll = " + 1);

  return randomDiceRollOutcome;
};

var emptyChecker = function () {
  var pIC1 = player1InputCheck;
  var pIC2;
  if (
    (pIC1 || pIC2) == "" ||
    (pIC1 || pIC2) != "keep" ||
    (pIC1 || pIC2) != "swap" ||
    pIC != "result"
  ) {
    return "Please enter the correct choice.";
  }
};

// -------------- script actions --------------------
// game counter

// var resultOC = gameCounter(counterValue.value);

// var outputOC = document.querySelector("#turnOutput-div");
// outputOC.innerHTML = turnCounter;

// player one button
var playerOneButton = document.querySelector("#submit1-button");
playerOneButton.addEventListener("click", function () {
  console.log("Player1 button clicked - HTML side");
  var playerOneInput = document.querySelector("#input1-field");
  /*
  if (playerOneInput == "") {
    playerOneButton.addEventListener("click", function (event) {
      event.target.disabled = true;
    });
    
  }
  */
  var result1 = playerOne(playerOneInput.value);

  var output1 = document.querySelector("#output1-div");
  output1.innerHTML = result1;

  playerOneInput.value = "";
});

// player two button
var playerTwoButton = document.querySelector("#submit-button2");
playerTwoButton.addEventListener("click", function () {
  console.log("Player2 button clicked - HTML side");
  var playerTwoInput = document.querySelector("#input2-field");

  var result2 = playerTwo(playerTwoInput.value);

  var output2 = document.querySelector("#output2-div");
  output2.innerHTML = result2;

  playerTwoInput.value = "";
});

// original button code
// var button = document.querySelector("#submit-button");
// button.addEventListener("click", function () {
//   var input = document.querySelector("#input-field");

//   var result = main(input.value);

//   var output = document.querySelector("#output-div");
//   output.innerHTML = result;

//   input.value = "";
// });
