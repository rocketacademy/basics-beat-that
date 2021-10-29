var currentGameMode = "waiting for player 1";
var randomDiceRoll = [];

var rollDiceOne = 0;
var rollDiceTwo = 0;

var main = function (input) {
  var myOutputValue = "";
  var userName = "";

  // how to ensure they are 2 separate numbers and not a summation of both values?

  // Game Mode One: Player 1

  // Insert username
  if (currentGameMode == "waiting for player 1") {
    console.log(currentGameMode);
    currentGameMode = "pick dice for player 1";
    userName = input;
    rollDiceOne = rollDice();
    rollDiceTwo = rollDice();
    myOutputValue = myOutputValue =
      "Hello, " +
      userName +
      ". " +
      "You rolled " +
      Number(rollDiceOne) +
      " for Dice 1 and " +
      Number(rollDiceTwo) +
      " for Dice 2. <br>Please input 1 or 2 to indicate which number you would like to be the first number.";
  }
  // Score for Player 1
  else if (currentGameMode == "pick dice for player 1") {
    console.log(currentGameMode);
    if (input == 1) {
      currentGameMode = "waiting for player 2";
      myOutputValue =
        "Your final score is " +
        Number(String(rollDiceTwo) + String(rollDiceOne)) +
        " Please enter player 2's name.";
      randomDiceRoll.push(Number(String(rollDiceTwo) + String(rollDiceOne)));
    } else if (input == 2) {
      currentGameMode = "waiting for player 2";
      myOutputValue =
        "Your final score is " +
        Number(String(rollDiceTwo) + String(rollDiceOne)) +
        " Please enter player 2's name.";
      randomDiceRoll.push(Number(String(rollDiceTwo) + String(rollDiceOne)));
    }
  }

  // Game Mode Two: Player 2
  else if (currentGameMode == "waiting for player 2") {
    console.log(currentGameMode);
    currentGameMode = "play dice game for player 2";
    userName = input;
    myOutputValue = "Hello, " + userName;
  }
  // Let the good times roll
  else if (currentGameMode == "play dice game for player 2") {
    console.log(currentGameMode);
    currentGameMode = "pick dice for player 2";
    rollDiceOne = rollDice();
    rollDiceTwo = rollDice();
    myOutputValue =
      "You rolled " +
      Number(rollDiceOne) +
      " for Dice 1 and " +
      Number(rollDiceTwo) +
      " for Dice 2. <br>Please input 1 or 2 to indicate which number you would like to be the first number.";
  }
  // Score for Player 2
  else if (currentGameMode == "pick dice for player 2") {
    console.log(currentGameMode);
    if (input == 1) {
      currentGameMode = "tally results";
      myOutputValue =
        "Your final score is " +
        Number(String(rollDiceOne) + String(rollDiceTwo));
      randomDiceRoll.push(Number(String(rollDiceOne) + String(rollDiceTwo)));
    } else if (input == 2) {
      currentGameMode = "tally results";
      myOutputValue =
        "Your final score is " +
        Number(String(rollDiceTwo) + String(rollDiceOne));
      randomDiceRoll.push(Number(String(rollDiceTwo) + String(rollDiceOne)));
    }
  }

  // Final Result
  else if (currentGameMode == "tally results") {
    console.log(currentGameMode);
    if (randomDiceRoll[0] > randomDiceRoll[1]) {
      myOutputValue = "Player 1, U WIN!!!";
    } else if (randomDiceRoll[0] < randomDiceRoll[1]) {
      myOutputValue = "Player 2, U WIN!!!";
    } else if ((randomDiceRoll[0] = randomDiceRoll[1])) {
      myOutputValue = "EVERYONE IS A WINNER!!!";
    }

    currentGameMode = "waiting for player 1";
    randomDiceRoll = [];

    rollDiceOne = 0;
    rollDiceTwo = 0;
  }
  return myOutputValue;
};

var rollDice = function (input) {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};
