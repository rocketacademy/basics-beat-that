// Roll dice and put them in order and make highest number possible
// User will roll dices - include dice function
// Arrange numbers - string
// User win if their number  is bigger
// user lose if their number is smaller

// Need to add while to loop entire function for player 1,2,3.

// Variables
var myOutputValue = "";
var currentGameMode = "player 1";

// Dice Roll
var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

//Diceroll Input (1)
var player1Dice1 = diceRoll();
console.log(`Player 1 Dice 1 rolled ${player1Dice1}`);

var player1Dice2 = diceRoll();
console.log(`Player 1 Dice 2 rolled ${player1Dice2}`);

//Diceroll Input (2)
var player2Dice1 = diceRoll();
console.log(`Player 2 Dice 1 rolled ${player2Dice1}`);

var player2Dice2 = diceRoll();
console.log(`Player 2 Dice 2 rolled ${player2Dice2}`);

//Player 1 functions
var player1Roll = function () {
  var player1Response = `Player 1 rolled ${player1Dice1} for dice 1 and ${player1Dice2} for dice 2. <br><br> Choose the order of the dice.`;
  return player1Response;
};

var player1Choose1 = function () {
  var choose1First = `${player1Dice1}${player1Dice2}`;
  var dice1Chosen = `Player 1, you choose Dice 1 first. <br> Your number is ${choose1First}. <br><br> It is now Player 2's turn. <br> Press Submit to continue!`;
  return dice1Chosen;
};

var player1Choose2 = function () {
  var choose2First = `${player1Dice2}${player1Dice1}`;
  var dice2Chosen = `Player 1, you choose Dice 2 first. <br> Your number is ${choose2First}. <br><br> It is now Player 2's turn. <br> Please press submit to continue!`;
  return dice2Chosen;
};

//Player 2 functions
var player2Roll = function () {
  var player2Response = `Player 2 rolled ${player2Dice1} for dice 1 and ${player2Dice2} for dice 2. <br><br> Choose the order of the dice.`;
  return player2Response;
};

var player2Choose1 = function () {
  var choose1First2 = `${player2Dice1}${player2Dice2}`;
  var dice1Chosen2 = `Player 2, you choose Dice 1 first. <br> Your number is ${choose1First2}. <br> Lets tabulate the scores. <br><br>Press submit to find out who won!`;
  return dice1Chosen2;
};

var player2Choose2 = function () {
  var choose2First2 = `${player2Dice2}${player2Dice1}`;
  var dice2Chosen2 = `Player 2, you choose Dice 2 first. <br> Your number is ${choose2First2}. <br> Lets tabulate the scores. <br><br>Press submit again to find out who won!`;
  return dice2Chosen2;
};

// Calculate winner
var winnerCalculator = function () {
  // Player 1 choice
  if (player1Choice == "1-1") {
    var player1Output = `${player1Dice1}${player1Dice2}`;
  }
  if (player1Choice == "1-2") {
    player1Output = `${player1Dice2}${player1Dice1}`;
  }
  console.log(player1Output);

  // Player 2 choice
  if (player2Choice == "2-1") {
    var player2Output = `${player2Dice1}${player2Dice2}`;
  }
  if (player2Choice == "2-2") {
    player2Output = `${player2Dice2}${player2Dice1}`;
  }
  console.log(player2Output);

  if (player1Output > player2Output) {
    myOutputValue = `Player 1 got ${player1Output}. <br> Player 2 got ${player2Output}. <br><br> Player 1 won the game!`;
  } else if (player2Output > player1Output) {
    myOutputValue = `Player 1 got ${player1Output}. <br> Player 2 got ${player2Output}. <br><br> Player 2 won the game!`;
  }
  return myOutputValue;
};

var main = function (input) {
  // Player 1 Game Mode
  if (currentGameMode == "player 1") {
    if (input == "") {
      myOutputValue = player1Roll();
      return myOutputValue;
    }

    if (input == 1) {
      myOutputValue = player1Choose1();
      currentGameMode = "player 2";
      player1Choice = "1-1";
      return myOutputValue;
    }

    if (input == 2) {
      myOutputValue = player1Choose2();
      currentGameMode = "player 2";
      player1Choice = "1-2";
      return myOutputValue;
    }
  }

  // Player 2 Game Mode
  if (currentGameMode == "player 2") {
    if (input == "") {
      myOutputValue = player2Roll();
      return myOutputValue;
    }

    if (input == 1) {
      myOutputValue = player2Choose1();
      currentGameMode = "find winner";
      player2Choice = "2-1";
      return myOutputValue;
    }

    if (input == 2) {
      myOutputValue = player2Choose2();
      currentGameMode = "find winner";
      player2Choice = "2-2";
      return myOutputValue;
    }
  }

  // Find Winner Game Mode
  if (currentGameMode == "find winner") {
    myOutputValue = winnerCalculator();
    return myOutputValue;
  }
  return myOutputValue;
};
