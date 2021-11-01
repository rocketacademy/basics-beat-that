// Game Modes
var GAME_MODE_WAITING_FOR_PLAYER_ONE = "Waiting for Player One";
var GAME_MODE_CHOOSE_DICE_ORDER = "Choose Dice Order";

// Current Game Mode
var currentGameMode = GAME_MODE_WAITING_FOR_PLAYER_ONE;

// Keep track of current player
var currentPlayer = 1;

// Keep track of player dice rolls
var player1Rolls = [];
var player2Rolls = [];

// Keep track of player chosen numbers
var player1Num;
var player2Num;

// Create dice roll function
var rollDice = function () {
  return Math.ceil(Math.random() * 6);
};

// Create function to get 2 dice rolls for each player
var getDiceRolls = function () {
  var newDiceRolls = [rollDice(), rollDice()];
  // Assign dice rolls to players
  if (currentPlayer === 1) {
    newDiceRolls = player1Rolls;
  } else {
    newDiceRolls = player2Rolls;
  }
  return newDiceRolls;
};

// Concatenate dice numbers
var concatenateDiceNumbers = function (num1, num2) {
  return Number(String(num1) + String(num2));
};

// Assign numbers to players
var assignNumbersToPlayers = function (playerIndicatedNumber) {
  if (currentPlayer === 1) {
    var diceArray = player1Rolls;
  } else {
    var diceArray = player2Rolls;
  }
  var playerNum;
  if (playerIndicatedNumber === 1) {
    playerNum = concatenateDiceNumbers(diceArray[0], diceArray[1]);
  } else {
    playerNum = concatenateDiceNumbers(diceArray[1], diceArray[0]);
  }
  if (currentPlayer === 1) {
    playerNum = player1Num;
  } else {
    playerNum = player2Num;
  }
  return playerNum;
};

// Compare player numbers to see who wins
var identifyWinner = function () {
  if (player1Num > player2Num) {
    return 1;
  } else {
    return 2;
  }
};

// Initiate main function
var main = function (input) {
  if (currentGameMode === GAME_MODE_WAITING_FOR_PLAYER_ONE) {
    var diceRoll = getDiceRolls();
    currentGameMode = GAME_MODE_CHOOSE_DICE_ORDER;
    return `Hello Player ${currentPlayer}, you have rolled ${diceRoll[0]} and ${diceRoll[1]}. Choose the order of the dice by entering 1 or 2 to be the first dice.`;
  }
  if (currentGameMode === GAME_MODE_CHOOSE_DICE_ORDER) {
    var playerIndicatedNumber = Number(input);
    if (playerIndicatedNumber !== 1 && playerIndicatedNumber !== 2)
      return `Please enter 1 or 2 to choose the order of the dice.`;
    var playerNum = assignNumbersToPlayers(playerIndicatedNumber);
    var playerResponse = `Hi Player ${currentPlayer}, you have chosen Dice ${playerIndicatedNumber} first. Your number is ${playerNum}.`;
    if (currentPlayer === 1) {
      currentPlayer = 2;
      currentGameMode = GAME_MODE_WAITING_FOR_PLAYER_ONE;
      return `${playerResponse} <br> It is now Player 2's turn. Press submit to roll Player 2's dice.`;
    }
    var winningPlayer = identifyWinner();

    // Reset game
    currentGameMode = GAME_MODE_WAITING_FOR_PLAYER_ONE;
    currentPlayer = 1;

    // Return ending respons

    return `${playerResponse} <br> Player ${winningPlayer} has won. <br> Player 1's number: ${player1Num}, Player 2's number: ${player2Num}.`;
  }
};
