// specifying the 2 game modes
var gameMode1 = "roll 2 dices";
var gameMode2 = "choose dice order";

// // the game will start with mode 1
var gameMode = gameMode1;

// both players' dice rolls
var Player1Dice;
var Player2Dice;

// both players' stored dices
var storedice1;
var storedice2;

// start game with player 1
var playernumber = 1;

var main = function (input) {
  var PlayerDiceRoll1 = diceRoll();
  var PlayerDiceRoll2 = diceRoll();

  // limit to max 2 players
  if (gameMode == gameMode1 && playernumber != 3) {
    console.log(`dice rolls`);
    myOutputValue = `Welcome Player ${playernumber}. <br> You rolled Dice 1: ${PlayerDiceRoll1} and Dice 2: ${PlayerDiceRoll2} <br> Choose the order of the dice by entering 1 or 2. `;
    storedice1 = PlayerDiceRoll1;
    storedice2 = PlayerDiceRoll2;
    // proceed to game mode 2
    gameMode = gameMode2;
    return myOutputValue;
  } else if (gameMode == gameMode2) {
    gameMode = gameMode1;

    return diceNumber(input);
  }
  // determine the winner after both players have played
  console.log(`determine winner`);
  return `${player1vs2()} Thanks for playing!`;
};

// determine players' dice order
var diceNumber = function (number) {
  if (number == 1 && playernumber == 1) {
    Player1Dice = `${storedice1}${storedice2}`;
    console.log(`Player 1 dice is ${Player1Dice}`);
    myOutputValue = `Your number is ${Player1Dice}. It is now player 2's turn.`;
    playernumber += 1;
    return Player1Dice, myOutputValue;
  } else if (number == 2 && playernumber == 1) {
    Player1Dice = `${storedice2}${storedice1}`;
    console.log(`Player 1 dice is ${Player1Dice}`);
    myOutputValue = `Your number is ${Player1Dice}. It is now player 2's turn.`;
    playernumber += 1;
    return Player1Dice, myOutputValue;
  } else if (number == 1 && playernumber == 2) {
    Player2Dice = `${storedice1}${storedice2}`;
    console.log(`Player 2 dice is ${Player2Dice}`);
    myOutputValue = `Your number is ${Player2Dice}. Click submit to see who wins.`;
    playernumber += 1;
    return Player2Dice, myOutputValue;
  } else if (number == 2 && playernumber == 2) {
    Player2Dice = `${storedice2}${storedice1}`;
    console.log(`Player 2 dice is ${Player2Dice}`);
    myOutputValue = `Your number is ${Player2Dice}. Click submit to see who wins.`;
    playernumber += 1;
    return Player2Dice, myOutputValue;
  }
  if (number !== 1 && number !== 2) {
    myOutputValue = `Invalid input. Please input '1' or '2' to get dice value.`;
    return myOutputValue;
  }
};

// compare and determine who wins
var player1vs2 = function () {
  if (Player1Dice > Player2Dice) {
    return `Player 1 wins!`;
  } else {
    return `Player 2 wins!`;
  }
};

// random dice roll
var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};
