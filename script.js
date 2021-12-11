//2 players, need to collect separate input and eventually compare to see who won
//Player 1 --> roll 2 dice and get 2 numbers --> ask player to choose order of dice --> save this value1
//Player 2 --> repeat and save this value2
//Player that generates higher number wins (compare value1 & value2)

//rolldice function to generate the dice rolls
var rollDice = function () {
  var randomDecimal = Math.random() * 6; //not inclusive of 6
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
  //roll 1 to 6
};

var combineDiceNumber = function (order, roll1, roll2) {
  var combinedValue;
  if (order == 1) {
    combinedValue = Number(String(roll1) + String(roll2));
  } else if (order == 2) {
    combinedValue = Number(String(roll2) + String(roll1));
  }
  return combinedValue;
};

var compareNumber = function (value1, value2) {
  var winningNumber;
  if (value1 > value2) {
    winningNumber =
      "Congratulations Player 1, you won! Your number is: " +
      value1 +
      "<br> Player 2's number is: " +
      value2;
  } else if (value2 > value1) {
    winningNumber =
      "Congratulations Player 2, you won! Your number is: " +
      value2 +
      "<br> Player 1's number is: " +
      value1;
  } else {
    winningNumber =
      "It's a draw! <br> Player 1's number is: " +
      value1 +
      "<br> Player 2's number is: " +
      value2;
  }
  return winningNumber;
};

var playGame = function (gameMode, input) {
  var myOutputValue;
  // Player1 choose order of dice
  if (gameMode == "Player1 choose order") {
    console.log(gameMode);
    console.log(input);
    // input validation
    if (!(input == 1 || input == 2)) {
      myOutputValue = "Only choose order 1 or 2.";
      return myOutputValue;
    }
    // if player1 chooses 1, roll1 is first
    else if (input == 1) {
      orderOfDice = 1;
    }
    // if player1 chooses 2, roll2 is first
    else if (input == 2) {
      orderOfDice = 2;
    }
    player1Value = combineDiceNumber(orderOfDice, roll1, roll2);
    myOutputValue =
      "Hi Player 1, your number is " +
      player1Value +
      ". Player 2, it's your turn! Click submit to start~";
    console.log(gameMode);
    console.log(player1Value);
    //Player1 is done, Player2 is next, need to change mode in main function?
    //gameMode = "Player2 Start";

    return myOutputValue;
  }

  if (gameMode == "Player2 choose order") {
    // input validation
    if (!(input == 1 || input == 2)) {
      myOutputValue = "Only choose order 1 or 2.";
      return myOutputValue;
    }
    // if player1 chooses 1, roll1 is first
    else if (input == 1) {
      orderOfDice = 1;
    }
    // if player1 chooses 2, roll2 is first
    else if (input == 2) {
      orderOfDice = 2;
    }
    player2Value = combineDiceNumber(orderOfDice, roll1, roll2);
    myOutputValue = "Hi Player2, your number is " + player2Value + ".";

    gameMode = "Player2 Start";
    return myOutputValue;
  }
};

var roll1;
var roll2;
var player1Value;
var player2Value;
var orderOfDice;
var gameMode = "Player1 Start";

var main = function (input) {
  var myOutputValue;

  //Player 1 roll 2 dice first
  if (gameMode == "Player1 Start") {
    roll1 = rollDice();
    roll2 = rollDice();
    myOutputValue =
      "Welcome Player 1! You rolled " +
      roll1 +
      " for Dice 1 and " +
      roll2 +
      " for Dice 2.<br>Choose the order of dice.";

    gameMode = "Player1 choose order";
    console.log(gameMode);
    return myOutputValue;
  } //Choose order and save numbers for each player
  else if (gameMode == "Player1 choose order") {
    myOutputValue = playGame(gameMode, input);
    gameMode = "Player2 Start";
    console.log(gameMode);
    return myOutputValue;
  } else if (gameMode == "Player2 Start") {
    roll1 = rollDice();
    roll2 = rollDice();
    myOutputValue =
      "Welcome Player 2! You rolled " +
      roll1 +
      " for Dice 1 and " +
      roll2 +
      " for Dice 2.<br>Choose the order of dice.";

    gameMode = "Player2 choose order";
    console.log(gameMode);
    return myOutputValue;
  }
  //Choose order and save numbers for each player
  else if (gameMode == "Player2 choose order") {
    myOutputValue = playGame(gameMode, input);
    gameMode = "Compare values";
    console.log(gameMode);
    return myOutputValue;
  } else if (gameMode == "Compare values") {
    myOutputValue = compareNumber(player1Value, player2Value);
    gameMode = "Player1 Start";
    return myOutputValue;
  }
};
