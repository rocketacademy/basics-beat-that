// beat-that game base
// 2 players and players take turns

// 4 game modes: "player 1 dice roll", "player 1 choose dice order", "player 2 dice roll", "player 2 choose dice order", and the game restart

var currentGameMode = "player 1 dice roll";
var currentPlayer = 1;
var pickDiceOrder;
var player1TotalNumber = 0;
var player2TotalNumber = 0;

// arrays to track each player's dice rolls
var player1DiceRolls = [];
var player2DiceRolls = [];
var player1Scores = [];
var player2Scores = [];

// to get random number for the dice rolls
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

// Player rolls to get random number of 2 dices
var playerRollDice = function () {
  var randomDice1 = rollDice();
  var randomDice2 = rollDice();
  console.log("player rolls dice 1:" + randomDice1);
  console.log("player rolls dice 2:" + randomDice2);

  // player 1 roll the dice
  if (currentGameMode == "player 1 dice roll") {
    currentPlayer = 1;
    // push dice result to arrays
    player1DiceRolls.push(randomDice1);
    player1DiceRolls.push(randomDice2);

    console.log("player 1 dice rolls: " + player1DiceRolls);

    //moving to the next game
    currentGameMode = "player 1 choose dice order";
  } // player 2 roll the dice
  else if (currentGameMode == "player 2 dice roll") {
    currentPlayer = 2;
    // push dice result to arrays
    player2DiceRolls.push(randomDice1);
    player2DiceRolls.push(randomDice2);

    console.log("player 2 dice rolls: " + player2DiceRolls);

    //moving to the next game
    currentGameMode = "player 2 choose dice order";
  }

  var myOutputValue = `Welcome Player ${currentPlayer}. <br> You rolled ${randomDice1} for Dice 1 and ${randomDice2} for Dice 2. <br> Please choose the order of the dice, by entering '1' or '2'.`;

  return myOutputValue;
};

// Player choose the dice order
var playerChooseDice = function () {
  var myOutputValue = `Player ${currentPlayer}, you choose Dice ${pickDiceOrder} first. <br>`;

  // player 1 pick dice 1 or 2
  if (currentGameMode == "player 1 choose dice order") {
    currentPlayer = 1;

    if (pickDiceOrder == 1) {
      player1TotalNumber = `${player1DiceRolls[0]}${player1DiceRolls[1]}`;
    } else if (pickDiceOrder == 2) {
      player1TotalNumber = `${player1DiceRolls[1]}${player1DiceRolls[0]}`;
    }
    myOutputValue += `Your number is ${player1TotalNumber}. <br> It is now Player 2's turn.`;

    //storing result
    player1Scores.push(player1TotalNumber);

    //moving to the next game
    currentGameMode = "player 2 dice roll";

    return myOutputValue;
  }
  if (currentGameMode == "player 2 choose dice order") {
    currentPlayer = 2;

    if (pickDiceOrder == 1) {
      player2TotalNumber = `${player2DiceRolls[0]}${player2DiceRolls[1]}`;
    } else if (pickDiceOrder == 2) {
      player2TotalNumber = `${player2DiceRolls[1]}${player2DiceRolls[0]}`;
    }
    var winnerMessage = winner();

    myOutputValue += `Your number is ${player2TotalNumber}. <br> Since Player 1's number is ${player1TotalNumber}, the ULTIMATE WINNER is ${winnerMessage}. <br> Click 'Submit' to play another round.`;

    //storing result
    player2Scores.push(player2TotalNumber);

    // restarting the game
    restartGame();

    return myOutputValue;
  }

  return myOutputValue;
};

// restarting the game
var restartGame = function () {
  currentGameMode = "player 1 dice roll";
  currentPlayer = 1;
  player1DiceRolls = [];
  player2DiceRolls = [];
  pickDiceOrder;
  player1TotalNumber = 0;
  player2TotalNumber = 0;
};

// to determine the winner
var winner = function () {
  if (player1TotalNumber > player2TotalNumber) {
    myOutputValue = "Player 1";
    return myOutputValue;
  } else if (player2TotalNumber > player1TotalNumber) {
    myOutputValue = "Player 2";
    return myOutputValue;
  } else if (player1TotalNumber == player2TotalNumber) {
    myOutputValue = "both players";
    return myOutputValue;
  }
};

var main = function (input) {
  var myOutputValue = "INVALID";
  pickDiceOrder = input;

  // player 1 clicks Submit, the game rolls 2 dice
  if (currentGameMode == "player 1 dice roll") {
    var myOutputValue = playerRollDice();
  } // player 1 choose the order of the dice
  else if (currentGameMode == "player 1 choose dice order") {
    var myOutputValue = playerChooseDice();
  } // player 2 rolls
  else if (currentGameMode == "player 2 dice roll") {
    var myOutputValue = playerRollDice();
  } //player 2 choose the order of the dice
  else if (currentGameMode == "player 2 choose dice order") {
    var myOutputValue = playerChooseDice();
  }

  console.log("player 1 scores: " + player1Scores);
  console.log("player 2 scores: " + player2Scores);

  return myOutputValue;
};
