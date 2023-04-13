/*
There are 2 players and players take turns.
When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
After both players have rolled and chosen dice order, the player with the higher combined number wins.

*/
/*
Part 1: Roll 2 dices and show the ouput of player 1. The player choose the dice order and get the return output. 
Part 2: Refactor the code the include Player 2
Part 3: Implement dice comparison to declare the winner. 
Part 4: Reset the game so that player can play continually without refreshing the browser. 

*/
// Declaration of Variables.
var finalPlayer1Number;
var finalPlayer2Number;
var diceNumber1;
var diceNumber2;
var diceNumber3;
var diceNumber4;
var myOutputValue = "";
var largestScore = document.getElementById("gamemodebtn1");
var smallestScore = document.getElementById("gamemodebtn2");
var player2DiceRoll;
var player1DiceRoll;
var player1Score = 0;
var player2Score = 0;
var player1DiceResult = [];
var player2DiceResult = [];
var radio1 = document.getElementById("radiobutton1");
var radio2 = document.getElementById("radiobutton2");
var radio3 = document.getElementById("radiobutton3");
var radio4 = document.getElementById("radiobutton4");

//Dice Roll Function for player 1
var getPlayer1DiceRoll = function () {
  var dice1 = document.getElementById("dice1");
  var dice2 = document.getElementById("dice2");
  diceNumber1 = Math.floor(Math.random() * 6) + 1;
  diceNumber2 = Math.floor(Math.random() * 6) + 1;
  dice1.innerHTML = diceNumber1;
  dice2.innerHTML = diceNumber2;
};
diceNumber1 = 0;
diceNumber2 = 0;
// Player 1 to select order of Dice
var getPlayer1Choice = function () {
  if (radio1.checked == true) {
    finalPlayer1Number = Number(String(diceNumber1) + String(diceNumber2));
    console.log(finalPlayer1Number);
    return finalPlayer1Number;
  } else if (radio2.checked == true) {
    finalPlayer1Number = Number(String(diceNumber2) + String(diceNumber1));
    console.log(finalPlayer1Number);
    return finalPlayer1Number;
  }
};

//Dice Roll Function for player 2
var getPlayer2DiceRoll = function () {
  var dice3 = document.getElementById("dice3");
  var dice4 = document.getElementById("dice4");
  diceNumber3 = Math.floor(Math.random() * 6) + 1;
  diceNumber4 = Math.floor(Math.random() * 6) + 1;
  dice3.innerHTML = diceNumber3;
  dice4.innerHTML = diceNumber4;
};
diceNumber3 = 0;
diceNumber4 = 0;
// Player 2 to select order of Dice
var getPlayer2Choice = function () {
  if (radio3.checked == true) {
    finalPlayer2Number = Number(String(diceNumber3) + String(diceNumber4));
    console.log(finalPlayer2Number);
    return finalPlayer2Number;
  } else if (radio4.checked == true) {
    finalPlayer2Number = Number(String(diceNumber4) + String(diceNumber3));
    console.log(finalPlayer2Number);
    return finalPlayer2Number;
  }
};

//Wining Condition largest Score
var getLargestScoreWins = function () {
  player2DiceRoll = getPlayer2Choice();
  player1DiceRoll = getPlayer1Choice();

  if (player1DiceRoll > player2DiceRoll) {
    player1Score += 1;
    myOutputValue =
      `Player 1: ${player1DiceRoll} Player 2: ${player2DiceRoll}` +
      `<br>` +
      `Player 1 has a larger value` +
      `<br>` +
      `Player 1 wins!` +
      `<br>` +
      `Player 1 Score: ${player1Score}` +
      `<br>` +
      `Player 2 Score: ${player2Score}`;

    return myOutputValue;
  }
  if (player1DiceRoll < player2DiceRoll) {
    player2Score += 1;
    myOutputValue =
      `Player 1: ${player1DiceRoll} Player 2: ${player2DiceRoll}` +
      `<br>` +
      `Player 2 has a larger value` +
      `<br>` +
      `Player 2 wins!` +
      `<br>` +
      `Player 1 Score: ${player1Score}` +
      `<br>` +
      `Player 2 Score: ${player2Score}`;
    return myOutputValue;
  }
  if (
    player1DiceRoll === player2DiceRoll ||
    (player1DiceRoll == 0 && player2DiceRoll == 0)
  ) {
    myOutputValue =
      `Player 1: ${player1DiceRoll} Player 2: ${player2DiceRoll}` +
      `<br>` +
      ` It is a draw. Please roll again!` +
      `<br>` +
      `Player 1 Score: ${player1Score}` +
      `<br>` +
      `Player 2 Score: ${player2Score}`;
    return myOutputValue;
  }
};

// Largest Score game mode selected.
var selectingGameModeLargestScore = function () {
  if (largestScore.checked == true) {
    var largestScoreWins = getLargestScoreWins();
    return largestScoreWins;
  }
};

var gameModeLargestScore = selectingGameModeLargestScore();

// Wining Condition Smalllest Score
var getSmallestScoreWins = function () {
  player2DiceRoll = getPlayer2Choice();
  player1DiceRoll = getPlayer1Choice();

  if (player1DiceRoll < player2DiceRoll) {
    player1Score += 1;
    myOutputValue =
      `Player 1: ${player1DiceRoll} Player 2: ${player2DiceRoll}` +
      `<br>` +
      `Player 1 has a smallest value` +
      `<br>` +
      `Player 1 wins!` +
      `<br>` +
      `Player 1 Score: ${player1Score}` +
      `<br>` +
      `Player 2 Score: ${player2Score}`;
    return myOutputValue;
  }
  if (player1DiceRoll > player2DiceRoll) {
    player2Score += 1;
    myOutputValue =
      `Player 1: ${player1DiceRoll} Player 2: ${player2DiceRoll}` +
      `<br>` +
      `Player 2 has a smallest value` +
      `<br>` +
      `Player 2 wins!` +
      `<br>` +
      `Player 1 Score: ${player1Score}` +
      `<br>` +
      `Player 2 Score: ${player2Score}`;
    return myOutputValue;
  }
  if (
    player1DiceRoll === player2DiceRoll ||
    (player1DiceRoll == 0 && player2DiceRoll == 0)
  ) {
    myOutputValue =
      `Player 1: ${player1DiceRoll} Player 2: ${player2DiceRoll}` +
      `<br>` +
      ` It is a draw. Please roll again!` +
      `<br>` +
      `Player 1 Score: ${player1Score}` +
      `<br>` +
      `Player 2 Score: ${player2Score}`;
    return myOutputValue;
  }
};

// Smallest Score game mode selected.
var selectingGameModeSmallestScore = function () {
  if (smallestScore.checked == true) {
    var smallestScoreWins = getSmallestScoreWins();
    return smallestScoreWins;
  }
};
var gameModeSmallestScore = selectingGameModeSmallestScore();

// Main Program
var main = function () {
  if (
    largestScore.checked == true &&
    (radio1.checked == true || radio2.checked == true) &&
    (radio3.checked == true || radio4.checked == true)
  ) {
    gameModeLargestScore = selectingGameModeLargestScore();
    player1DiceResult.push(player1DiceRoll);
    player2DiceResult.push(player2DiceRoll);
    console.log("Player 1 Dice Roll");
    console.log(player1DiceResult);
    console.log("Player 2 Dice Roll");
    console.log(player2DiceResult);
    return gameModeLargestScore;
  }
  if (
    smallestScore.checked == true &&
    (radio1.checked == true || radio2.checked == true) &&
    (radio3.checked == true || radio4.checked == true)
  ) {
    gameModeSmallestScore = selectingGameModeSmallestScore();
    player1DiceResult.push(player1DiceRoll);
    player2DiceResult.push(player2DiceRoll);
    console.log("Player 1 Dice Roll");
    console.log(player1DiceResult);
    console.log("Player 2 Dice Roll");
    console.log(player2DiceResult);
    return gameModeSmallestScore;
  }

  return (myOutputValue =
    `Incorrect Input. Kindly follow the following steps:` +
    `<br>` +
    `1. Select a Game Mode` +
    `<br>` +
    `2. Click the roll button` +
    `<br>` +
    `3. Click order of the dice!`);
};
