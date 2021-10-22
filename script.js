// BEAT THAT PROJECT

// My global variables are
var myOutputValue = ``;
var numberofDice = 2;
var gameWinner = "";

// Counters
var pergameCounter = 0;
var p1Counter = 0;
var p2Counter = 0;

// Game Modes and instructions
var gameModes = [`waiting for user to enter player`, "P1", `P2`];
var currentMode = `waiting for user to enter player`;
var p1playerInstructions = `<br><br> Player 1, hit the button again to roll your dice!`;
var p2playerInstructions = `<br><br> Player 2, hit the button again to roll your dice!`;
var showplayerInstructions = "";

// Players dice rolls values stored
var currentplayerScore = [player1scores, player2scores];
var player1scores = [];
var player2scores = [];

// Score keeping
var scoreArray = [p1score, p2score];
var p1score = 0;
var p2score = 0;

// ===========================================THIS IS MY MAIN FUNCTION ===========================================================
var main = function (input) {
  console.log(`current mode is ${currentMode}`);
  // Player needs to indicate whether they are player1 or player2 to begin the game and call the right mode
  if (currentMode == `waiting for user to enter player` && input == "") {
    myOutputValue = `Welcome to Beat That!🙋‍♀️ <br><br> Please enter "1" or "2" to select which player you want to be.👯‍♀️`;
  } else if (input == `1` || input == `2`) {
    // User inputs the mode and the next instructions are given
    myOutputValue = changeMode(input);
    console.log(`Check current game mode`);
    console.log(currentMode);
  } else if (currentMode == `P1` && input == "" && p1Counter == 0) {
    // Player 1 begins play
    myOutputValue = playBeatThatP1(input);
    pergameCounter = pergameCounter + 1;
    console.log(`counter is`);
    console.log(pergameCounter);
    p1Counter = p1Counter + 1;
  } else if (currentMode == `P2` && input == "" && p2Counter == 0) {
    // Player 2 begins play
    myOutputValue = playBeatThatP2(input);
    pergameCounter = pergameCounter + 1;
    console.log(`counter is`);
    console.log(pergameCounter);
    p2Counter = p2Counter + 1;
  } else if (
    // Player chooses dice position and the final number is stored in global variable
    (currentMode == `P1` && (input == "D1" || input == "D2")) ||
    (currentMode == `P2` && (input == "D1" || input == "D2"))
  ) {
    var playerfinalNum = createNumber(input);
    // final number has been generated but now need to put final number in array
    if (currentMode == "P1") {
      p1score = playerfinalNum;
    } else if (currentMode == "P2") {
      p2score = playerfinalNum;
    }
    myOutputValue = `Hi ${currentMode}, your final score is ${playerfinalNum}. 🎉 <br> <br> Type "Next" in the box and hit submit to continue the game. ▶`;
  } else if (input == "Next" && pergameCounter == 1) {
    myOutputValue = remainingplayerChecker(input);
  } else if (pergameCounter == 2) {
    winnerResult = winnerChecker(input);
    console.log(winnerResult);
    myOutputValue = `${gameWinner}.🤩 <br> <br> Player 1 scored ${p1score} and player 2 scored ${p2score}.`;
  } else if (
    (p1Counter == 1 && input == "") ||
    (p2Counter == 1 && input == "")
  ) {
    //Players cannot play more than once within a game
    myOutputValue = `Sorry ${currentMode} you already played.💢💢 You can only roll once per game. <br><br> Please type "Next" and hit submit to continue the game. ▶`;
  }

  return myOutputValue;
};

// ============================================ MAIN FUNCTION ENDS HERE =================================================================

// ------------------------------------------HELPER FUNCTIONS BELOW --------------------------

// Beat that function for player 1
var playBeatThatP1 = function () {
  var diceCounter = 0;
  console.log(`current dice counter is`);
  console.log(diceCounter);
  while (diceCounter < numberofDice) {
    // call dice roll function into the loop
    var diceResult = rollDice();
    // add dice rolls to player1
    player1scores.push(diceResult);
    diceCounter = diceCounter + 1;
    console.log(`dice count is now`);
    console.log(diceCounter);
  }

  console.log(`check player 1 score`);
  console.log(player1scores);
  return `You rolled: ${player1scores}. <br><br>Now please enter "D1" or "D2" to choose which number goes first in your final score.`;
};

// Beat that function for player 2
var playBeatThatP2 = function () {
  var diceCounter = 0;
  console.log(`current dice counter is`);
  console.log(diceCounter);
  while (diceCounter < numberofDice) {
    // call dice roll function into the loop
    var diceResult = rollDice();
    // add dice rolls to player1
    player2scores.push(diceResult);
    diceCounter = diceCounter + 1;
    console.log(`dice count is now`);
    console.log(diceCounter);
  }

  console.log(`check player 2 score`);
  console.log(player2scores);
  return `You rolled: ${player2scores}. <br><br> Now please enter "D1" or "D2" to choose which number goes first in your final score.`;
};

// Allow the player to choose dice number order and store the number
var createNumber = function (input) {
  var dicePosition = input;
  if (dicePosition == "D1" && currentMode == "P1") {
    var finalNum = player1scores.join("");
    console.log(`player 1 final number is ${finalNum}}`);
  } else if (dicePosition == "D2" && currentMode == "P1") {
    var firstElement = player1scores.shift();
    var newOrder = player1scores.push(firstElement);
    var finalNum = player1scores.join("");
    console.log(`final number is ${finalNum}`);
  } else if (dicePosition == "D1" && currentMode == "P2") {
    var finalNum = player2scores.join("");
    console.log(`final number is ${finalNum}`);
  } else if (dicePosition == "D2" && currentMode == "P2") {
    var firstElement = player2scores.shift();
    var newOrder = player2scores.push(firstElement);
    var finalNum = player2scores.join("");
    console.log(`final number is ${finalNum}`);
  }
  console.log(`CHECK`);
  console.log(`user chose`);
  console.log(input);
  console.log(`current player is ${currentMode}`);
  console.log(`final number is ${finalNum}`);
  return finalNum;
};

// Which player hasn't played yet?
var remainingplayerChecker = function () {
  if (p1score == 0) {
    currentMode = gameModes[1];
    console.log(`check current mode is now ${currentMode}`);
    return `Player 1 has not played yet. <br> ${p1playerInstructions}`;
  } else if (p2score == 0) {
    currentMode = gameModes[2];
    console.log(`check current mode is now ${currentMode}`);
    return `Player 2 has not played yet. <br> ${p2playerInstructions}`;
  }
};

// Check who wins?
var winnerChecker = function () {
  if (p1score > p2score) {
    gameWinner = `Congratulations! P1 Wins`;
  } else if (p2score > p1score) {
    gameWinner = `Congratulations! P2 Wins`;
  } else if (p2score == p1score) {
    gameWinner = `Wow!! It's a tie! 🤷‍♀️`;
  }
  console.log(`CHECK`);
  console.log(gameWinner);
  console.log(`p1 score is`);
  console.log(p1score);
  console.log(`p2 score is`);
  console.log(p2score);
};

// Roll dice function
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);

  var diceNumber = randomInteger + 1;
  return diceNumber;
  console.log("CHECK");
  console.log(diceNumber);
};

// Change player function
var changeMode = function (input) {
  // user type in mode and presses submit to activate a change in mode
  currentMode = gameModes[input];
  if (currentMode == `P1`) {
    showplayerInstructions = p1playerInstructions;
  } else if (currentMode == `P2`) {
    showplayerInstructions = p2playerInstructions;
  }
  console.log(`current player is`);
  console.log(currentMode);
  console.log(`the instructions to play this mode are:`);
  console.log(showplayerInstructions);
  return `You have chosen ${currentMode} and are ready to play!🎲🎲 <br> ${showplayerInstructions}`;
};
