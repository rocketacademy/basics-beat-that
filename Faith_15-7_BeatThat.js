var userNameArray = [];
var chosenNumArray = [];
var diceArray1 = [];
var diceArray2 = [];
var userName;
var diceRoll;
var diceNum;
var chosenNum;
var gameMode;
var chooseModeMsg = function () {
  return `Please enter "lowest" or "highest" to choose your Beat That game mode.<br/>`;
};
var checkMode = function (input) {
  return input == "lowest" || input == "highest";
};
var gameModeInstructions = function (gameMode) {
  if (gameMode == "lowest") {
    return `You have chosen lowest mode. Player with smallest number wins. Key in '1' to play.`;
  }
  if (gameMode == "highest") {
    return `You have chosen highest mode. Player with  highest number wins. Key in '1' to play.`;
  }
};
function largestChosenNum(diceArray, diceCt) {
  diceArray.sort(function (a, b) {
    return b - a;
  });
  var num = diceArray[0];
  for (var i = 1; i < diceCt; i += 1) {
    num = num * 10 + diceArray[i];
  }
  return num;
}
function smallestChosenNum(diceArray, diceCt) {
  diceArray.sort(function (a, b) {
    return a - b;
  });
  var num = diceArray[0];
  for (var i = 1; i < diceCt; i += 1) {
    num = num * 10 + diceArray[i];
  }
  return num;
}
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNum = randomInteger + 1;
  return diceNum;
};
var rollDiceNum = function () {
  for (n = 0; n < diceNum; n += 1) {
    diceRoll = rollDice();
    diceArray.push(diceRoll);
  }
};
var resetGame = function () {
  userNameArray = [];
  chosenNumArray = [];
  diceArray1 = [];
  diceArray2 = [];
  userName = null;
  diceNum = null;
  gameMode = null;
};
var main = function (input) {
  if (!gameMode) {
    if (!input) {
      return chooseModeMsg();
    }
    modeValid = checkMode(input);
    if (!modeValid) {
      return chooseModeMsg();
    }
    gameMode = input;
    return gameModeInstructions(gameMode);
  }
  if (gameMode == "highest") {
    if (chosenNumArray.length >= 0 && chosenNumArray.length < 2) {
      if (!userName) {
        if (!input || input != 1) {
          return `Please enter '1' to begin.`;
        }
        userName = input;
        userNameArray.push(userName);
        if (userNameArray.length == 1) {
          return `Welcome Player ${userNameArray.length}. <br/> Enter the number of dice to roll.`;
        } else {
          return `Welcome Player 2. You will roll ${diceNum} dice. No input needed, click 'Submit' to continue.`;
        }
      }
      if (!diceNum) {
        if (!input || input < 2) {
          return `Invalid input. Enter a number of dice >=2.`;
        }
        diceNum = input;
        if (userNameArray.length == 1) {
          userName = null;
          for (n = 0; n < diceNum; n += 1) {
            diceRoll = rollDice();
            diceArray1.push(diceRoll);
          }
          chosenNum = largestChosenNum(diceArray1, diceNum);
          chosenNumArray.push(chosenNum);
          return `Player ${userNameArray.length}, your number is ${chosenNum}.<br/> It is now Player 2's turn.<br/> Player 2, please key in '1' to play. `;
        } else {
          userName = null;
          for (n = 0; n < diceNum; n += 1) {
            diceRoll = rollDice();
            diceArray2.push(diceRoll);
          }
          chosenNum = largestChosenNum(diceArray2, diceNum);
          chosenNumArray.push(chosenNum);
          diceNum = null;
          return `Player ${userNameArray.length}, your number is ${chosenNum}.<br/> Click Submit to determine the winner!`;
        }
      } else {
        userName = null;
        for (n = 0; n < diceNum; n += 1) {
          diceRoll = rollDice();
          diceArray2.push(diceRoll);
        }
        chosenNum = largestChosenNum(diceArray2, diceNum);
        chosenNumArray.push(chosenNum);
        diceNum = null;
        return `Player ${userNameArray.length}, your number is ${chosenNum}.<br/> Click Submit to determine the winner!`;
      }
    } else {
      var player1No = chosenNumArray[0];
      var player2No = chosenNumArray[1];
      var player1NoFormat = Number(player1No);
      var player2NoFormat = Number(player2No);
      console.log(player1NoFormat);
      console.log(player2NoFormat);
      if (player1NoFormat > player2NoFormat) {
        resetGame();
        return `Player 1 wins!  To start a new game, key in your preferred game mode 'lowest' or 'highest'.`;
      } else {
        resetGame();
        return `Player 2 wins!  To start a new game, key in your preferred game mode 'lowest' or 'highest'.`;
      }
    }
  }
  if (gameMode == "lowest") {
    if (chosenNumArray.length >= 0 && chosenNumArray.length < 2) {
      if (!userName) {
        if (!input || input != 1) {
          return `Please enter '1' to begin.`;
        }
        userName = input;
        userNameArray.push(userName);
        if (userNameArray.length == 1) {
          return `Welcome Player ${userNameArray.length}. <br/> Enter the number of dice to roll.`;
        } else {
          return `Welcome Player 2. You will roll ${diceNum} dice. No input needed, click 'Submit' to continue.`;
        }
      }
      if (!diceNum) {
        if (!input || input < 2) {
          return `Invalid input. Enter a number of dice >=2.`;
        }
        diceNum = input;
        if (userNameArray.length == 1) {
          userName = null;
          for (n = 0; n < diceNum; n += 1) {
            diceRoll = rollDice();
            diceArray1.push(diceRoll);
          }
          chosenNum = smallestChosenNum(diceArray1, diceNum);
          chosenNumArray.push(chosenNum);
          return `Player ${userNameArray.length}, your number is ${chosenNum}.<br/> It is now Player 2's turn.<br/> Player 2, please key in '1' to play. `;
        } else {
          userName = null;
          for (n = 0; n < diceNum; n += 1) {
            diceRoll = rollDice();
            diceArray2.push(diceRoll);
          }
          chosenNum = smallestChosenNum(diceArray2, diceNum);
          chosenNumArray.push(chosenNum);
          diceNum = null;
          return `Player ${userNameArray.length}, your number is ${chosenNum}.<br/> Click Submit to determine the winner!`;
        }
      } else {
        userName = null;
        for (n = 0; n < diceNum; n += 1) {
          diceRoll = rollDice();
          diceArray2.push(diceRoll);
        }
        chosenNum = smallestChosenNum(diceArray2, diceNum);
        chosenNumArray.push(chosenNum);
        diceNum = null;
        return `Player ${userNameArray.length}, your number is ${chosenNum}.<br/> Click Submit to determine the winner!`;
      }
    } else {
      var player1No = chosenNumArray[0];
      var player2No = chosenNumArray[1];
      var player1NoFormat = Number(player1No);
      var player2NoFormat = Number(player2No);
      console.log(player1NoFormat);
      console.log(player2NoFormat);
      if (player1NoFormat < player2NoFormat) {
        resetGame();
        return `Player 1 wins!<br/>
        To start a new game, key in your preferred game mode 'lowest' or 'highest'.`;
      } else {
        resetGame();
        return `Player 2 wins! <br/>
        To start a new game, key in your preferred game mode 'lowest' or 'highest'.`;
      }
    }
  }
};
