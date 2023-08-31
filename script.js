var gameStateClarifyMode = true;
var gameStateStart = false;
var gameStateRoll = false;
var gameStateChoose = false;

var gameModeLowest = false;
var gameModeHighest = false;

var diceOne = 0;
var diceTwo = 0;

var playerNumber = 1;
var combinedNumbers = [];

var main = function (input) {
  if (gameStateClarifyMode == true) {
    gameStateClarifyMode = false;
    gameStateStart = true;
    return `Welcome to the game of 'Beat That!' <br><br>
    Choose your game mode: <br>
    Type HIGHEST if you aim to form the highest ⏫ number. <br>
    Type LOWEST if you aim to form the lowest ⏬ number. <br>`;
  }

  if (gameStateStart == true) {
    if (input != "HIGHEST" && input != "LOWEST") {
      return `You have entered an invalid 🙅🏻‍♂️🙅🏻‍♀️ choice. <br><br>
      Choose your game mode: <br>
      Type HIGHEST if you aim to form the highest ⏫ number. <br>
      Type LOWEST if you aim to form the lowest ⏬ number. <br>`;
    }
    if (input == "HIGHEST") {
      gameModeHighest = true;
    } else if (input == "LOWEST") {
      gameModeLowest = true;
    }
    gameStateStart = false;
    gameStateRoll = true;
    return `Excellent! <br>
    Press Submit for Player ${playerNumber} 👨🏻👩🏻 to roll both their dice 🎲🎲. `;
  }

  if (input == "end" && combinedNumbers.length >= 2) {
    var winningPlayer = 0;
    var winningScore = 0;
    var combinedNumbersFinal = combinedNumbers;

    if (gameModeHighest == true) {
      var highestNumberSoFar = 0;
      for (i = 1; i <= combinedNumbers.length; i += 1) {
        if (combinedNumbers[i - 1] > highestNumberSoFar) {
          winningPlayer = i;
          highestNumberSoFar = combinedNumbers[i - 1];
        }
      }
      winningScore = highestNumberSoFar;
    }

    if (gameModeLowest == true) {
      var lowestNumberSoFar = 100;
      for (i = 1; i <= combinedNumbers.length; i += 1) {
        if (combinedNumbers[i - 1] < lowestNumberSoFar) {
          winningPlayer = i;
          lowestNumberSoFar = combinedNumbers[i - 1];
        }
      }
      winningScore = lowestNumberSoFar;
    }

    gameStateClarifyMode = true;
    gameStateStart = false;
    gameStateRoll = false;
    gameStateChoose = false;
    gameModeLowest = false;
    gameModeHighest = false;
    playerNumber = 1;
    combinedNumbers = [];
    return `Here are the numbers everyone rolled: <br>
    ${combinedNumbersFinal} <br><br>
    Player ${winningPlayer} 👨🏻👩🏻 wins with a score of ${winningScore}!! Congratulations 🥇🥈🥉 <br>
    Press Submit to return to the start of the game.`;
  }

  if (gameStateRoll == true) {
    gameStateRoll = false;
    gameStateChoose = true;
    var rollHere = rollTwoDice();
    return `Player ${playerNumber} 👨🏻👩🏻: Dice 1 🎲 shows ${diceOne}, and Dice 2 🎲 shows ${diceTwo}. <br>
    Which dice would you like to use as the first number? Select either 1 or 2.`;
  }

  if (gameStateChoose == true) {
    if (input == 1 || input == 2) {
      gameStateChoose = false;
      gameStateRoll = true;
      playerNumber += 1;
      combinedNumbers.push(makeNumber(input, diceOne, diceTwo));
      return `The number Player ${playerNumber - 1} 👨🏻👩🏻 formed is ${
        combinedNumbers[playerNumber - 2]
      }! <br>
      Press Submit to for Player ${playerNumber} 👨🏻👩🏻 to roll both their dice 🎲🎲. <br><br>
      If at least two players have played, type 'end' to finish the game and compare your scores!`;
    } else {
      return `You have entered an invalid 🙅🏻‍♂️🙅🏻‍♀️ choice. <br>
      Player ${
        playerNumber - 1
      } 👨🏻👩🏻: Dice 1 🎲 shows ${diceOne}, and Dice 2 🎲 shows ${diceTwo}. <br>
      Which dice would you like to use as the first number? Select either 1 or 2.
      `;
    }
  }
};

var rollDice = function () {
  var randomIntegerOneToSix = Math.floor(Math.random() * 6) + 1;
  return randomIntegerOneToSix;
};

var rollTwoDice = function () {
  diceOne = rollDice();
  diceTwo = rollDice();
};

var makeNumber = function (decision, numOne, numTwo) {
  var newNumber = 0;
  if (decision == 1) {
    newNumber = Number(String(numOne) + String(numTwo));
  } else if (decision == 2) {
    newNumber = Number(String(numTwo) + String(numOne));
  }
  return newNumber;
};
