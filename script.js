// Function to roll dice
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

// There are 2 players
var counter = 0; //Where should I use this?
var playerDice = []; //Two dices result
var player1Score = 0;
var player2Score = 0;
var allPlayerScore = []; // Store dice result to player1 and player2

// To convert the dice into score and store in arrays
var calculateScore1 = function (num1, num2) {
  player1Score = Number(String(num1) + String(num2));
  allPlayerScore.push(player1Score);
  myOutputValue =
    "Player 1: Your score is " +
    player1Score +
    "<br>" +
    "Next player click 'Submit'";
  console.log(allPlayerScore);
};

//Quick fix for getting separate score for player2
var calculateScore2 = function (num1, num2) {
  player2Score = Number(String(num1) + String(num2));
  allPlayerScore.push(player2Score);
  myOutputValue =
    "Player 2: Your score is " +
    player2Score +
    "<br>" +
    "Click sumbit to see who wins";
  console.log(allPlayerScore);
};

//Player 1 enter the game, roll 2 dices
var myOutputValue = "";
var mode = "gamestart";
var playerPlay = function (input) {
  playerDice = [rollDice(), rollDice()];
  console.log(playerDice);
  myOutputValue =
    playerDice + " Enter 1 or 2 to determine the order of the dice";
  console.log(playerDice[0], playerDice[1]);
};

//Call in the main function
var main = function (input) {
  if (mode === "gamestart") {
    mode = "selection";
    playerPlay();
  } else if (mode === "selection") {
    mode = "enterNextPlayer";
    //Missing validation
    if (input == 1) {
      calculateScore1(playerDice[0], playerDice[1]);
    }
    if (input == 2) {
      calculateScore1(playerDice[1], playerDice[0]);
    }
  } else if (mode === "enterNextPlayer") {
    mode = "selection2";
    playerPlay();
  } else if (mode === "selection2") {
    mode = "finalScore";
    if (input == 1) {
      calculateScore2(playerDice[0], playerDice[1]);
    }
    if (input == 2) {
      calculateScore2(playerDice[1], playerDice[0]);
    }
    console.log(player1Score, player2Score);
  } else if (player1Score > player2Score) {
    mode = "gamestart";
    myOutputValue =
      "Congrats, player 1 wins, with score:" +
      player1Score +
      "<br>" +
      "Click submit to play again";
  } else {
    mode = "gamestart";
    myOutputValue =
      "Congrats, player 2 wins, with score:" +
      player2Score +
      "<br>" +
      "Click submit to play again";
  }

  return myOutputValue;
};

//Realised the code will keep going on when user click submit, didn't implement any loop rules.
