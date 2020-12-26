// global variables
// player 1 first
// roll dice game mode first
var currentPlayer = 1;
var gameMode = 'rollDice';
var player1DiceNumbers;
var player2DiceNumbers;
var player1FinalNumber;
var player2FinalNumber;
var diceNumbers;
var diceNumbersArray = [];

// generate dice number
var generateRandomDiceNumber = function () {
  var randomNumber = Math.floor(Math.random() * 6) + 1;
  return randomNumber;
};

// create a loop to generate the number of dice the user wants to roll
var rollXNumberOfDice = function (input) {
  var counter = 0;
  while (counter < input) {
    diceNumbers += generateRandomDiceNumber();
    diceNumbersArray.push(diceNumbers);

    counter += 1;
  }
  return diceNumbers;
};

// indexes is a string of indexes specifying final number order, e.g. "0 3 2 1"
// output is final number based on player1DiceNumbers
var generateFinalNumber = function (indexes) {
  diceNumbers = [1, 3, 4, 5];

  // Split indexes into array of indexes
  var indexesArray = indexes.split(' '); // "0 3 2 1" becomes ["0", "3", "2", "1"]
  var finalNumArray = [];
  for (var finalNumIndex = 0; finalNumIndex < indexesArray.length; finalNumIndex += 1) {
    // indexPosition contains the index of the finalNumIndex inside the indexesArray
    var indexPosition = indexesArray.indexOf(String(finalNumIndex));
    finalNumArray.push(diceNumbers[indexPosition]);
  }

  var finalNum = 0;
  for (var i = 0; i < finalNumArray.length; i += 1) {
    finalNum = finalNum * 10 + finalNumArray[i];
  }

  return finalNum;
};

// determine winner, output 1 or 2, representing player 1 or player 2
var determineWinningPlayer = function () {
  if (player1FinalNumber > player2FinalNumber) {
    return 1;
  }
  return 2;
  // TODO: implement draw
};

var main = function (input) {
  // TODO:
  // update roll2Dice to rollXNumberOfDice

  if (gameMode == 'rollDice') {
    // run the roll dice function - return an array of 2 numbers
    if (currentPlayer == 1) {
      player1DiceNumbers = rollXNumberOfDice();
    } else if (currentPlayer == 2) {
      player2DiceNumbers = rollXNumberOfDice();
    }

    // game mode change to choosing order
    gameMode = 'chooseOrder';
    if (currentPlayer == 1) {
      return `Player 1, you rolled ${player1DiceNumbers}`;
    }
    if (currentPlayer == 2) {
      return `Player 2, you rolled ${player2DiceNumbers}`;
    }
  }

  // mode is choose order
  // TODO: update input to series of indexs
  // replace concatenate2Number to generateFinalNumber, input series of indexs,
  // if the player input '1', the number will be player1DiceNumbers[0] combine
  // player1DiceNumbers[1]
  if (currentPlayer == 1) {
    if (input == 1) {
      player1FinalNumber = concatenate2Numbers(player1DiceNumbers[0], player1DiceNumbers[1]);
    } else if (input == 2) {
      player2FinalNumber = concatenate2Numbers(player1DiceNumbers[1], player1DiceNumbers[0]);
    }
    // game mode change to player 2 rol dice
    currentPlayer = 2;
    gameMode = 'rollDice';
    return `your final number is ${player1FinalNumber}`;
  }

  // now current player is 2
  if (input == 1) {
    player2FinalNumber = concatenate2Numbers(player2DiceNumbers[0], player2DiceNumbers[1]);
  } else if (input == 2) {
    player2FinalNumber = concatenate2Numbers(player2DiceNumbers[1], player2DiceNumbers[0]);
  }

  // compare who has the higher number
  // winner player is either 1 or 2
  var winningPlayer = determineWinningPlayer();
  // output a winner
  if (winningPlayer == 1) {
    return `player 2 final number is ${player2FinalNumber}, player 1 number is ${player1FinalNumber}, player 1 won`;
  }
  return `player 2 final number is ${player2FinalNumber}, player 1 number is ${player1FinalNumber}, player 2 won`;
};
