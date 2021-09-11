var gameStateOne = "User input number of player";
var gameStateTwo = "User input Names";
var gameStateThree = "User key in number of dice to play";
var gameStateFour = "Game Start";
var gameState = gameStateOne;
var gameModeOne = "Auto Mode";
var gameModeTwo = "KnockOut";
var gameMode = gameModeOne;
var winningMethodLow = "low Mode";
var winningMethodHigh = "High Mode";
var winningMethod = winningMethodHigh;
var possibleWinningNumber = 0;
var winningStateOne = "start of game";
var winningStateTwo = "Ongoing battle between winner and other player";
var winningStage = winningStateOne;
var playerName = [];
var allNumber = [];
var autodice = [];
var scoring = [];
var counter = 0;
var playerThrew = 1;
var counterIndex = 0;
var counterPlayer = 0;
var index = 0;
var extraNumber = 0;
var winningIndex = 0;
var winningNumber = 0;
var lastIndex = 0;
var counterLastWinning = 0;

var randomDice = function () {
  var diceRandom = Math.random() * 6;
  var diceIntergal = Math.floor(diceRandom) + 1;
  return diceIntergal;
};

var leaderBoard = function () {
  var resultoutput = "<br>";
  counter = 0;
  console.log("before while");
  var scoringResult = scoring;
  console.log(scoringResult, "scoringResult");

  while (counter < noOfPlayer) {
    resultoutput =
      resultoutput +
      playerName[counter] +
      "'s score : " +
      scoring[counter] +
      "<br>";
    console.log("result");
    counter += 1;
  }
  return resultoutput;
};

var userAutoSelection = function (randomNo1, input) {
  if (input == "low" && winningMethod == winningMethodHigh) {
    winningMethod = winningMethodLow;
    possibleWinningNumber = 0;
    playerThrew = 1;
    return `Current mode have change to <b>low</b>, <br> Press Submit to re-roll the dice`;
  }
  if (input == "high" && winningMethod == winningMethodLow) {
    winningMethod = winningMethodHigh;
    possibleWinningNumber = 0;
    playerThrew = 1;
    return `Current mode have change to <b>high</b>, <br> Press Submit to re-roll the dice`;
  }
  if (playerThrew == 1) {
    possibleWinningNumber = 0;
    allNumber = [];
    counterIndex = 0;
  }
  if (playerThrew <= noOfPlayer) {
    autodice = [];

    while (counter < noOfDice) {
      randomNo1 = randomDice();
      counter += 1;
      autodice.push(randomNo1);
    }

    if (winningMethod == winningMethodHigh) {
      autodice.sort(function (a, b) {
        return b - a;
      });
    }
    if (winningMethod == winningMethodLow) {
      autodice.sort(function (a, b) {
        return a - b;
      });
    }
    counter = 0;
    console.log(winningMethod);
    autodice.toString();
    console.log(autodice, "playerResult string");
    var number1 = "";

    while (counter < noOfDice) {
      number1 = number1 + autodice[counter];
      counter = counter + 1;
    }

    playerThrew = playerThrew + 1;
    realNumber = Number(number1);
    console.log("before if max", realNumber);
    if (
      possibleWinningNumber <= realNumber &&
      winningMethod == winningMethodHigh
    ) {
      if (possibleWinningNumber == realNumber) {
        extraNumber = possibleWinningNumber;
      } else {
        possibleWinningNumber = realNumber;
        index = counterIndex;
        console.log("high", possibleWinningNumber);
        console.log("index", index);
      }
    }
    if (winningMethod == winningMethodLow) {
      if (possibleWinningNumber == 0) {
        possibleWinningNumber = realNumber;
        index = counterIndex;
      }
      if (possibleWinningNumber >= realNumber && possibleWinningNumber != 0) {
        if (possibleWinningNumber == realNumber) {
          extraNumber = possibleWinningNumber;
        } else {
          possibleWinningNumber = realNumber;
          index = counterIndex;
          console.log("low", possibleWinningNumber);
          console.log("index", index);
        }
      }
    }
    counterIndex = counterIndex + 1;
    allNumber.push(realNumber);
    console.log(allNumber);

    return `${playerName[playerThrew - 2]} number is ${realNumber};`;
  }

  if (playerThrew > noOfPlayer) {
    if (possibleWinningNumber != extraNumber) {
      playerThrew = 1;
      scoring[index] = scoring[index] + 1;
      leaderBoardResult = leaderBoard();
      return `winner is ${playerName[index]} and ${possibleWinningNumber} and ${leaderBoardResult}`;
    } else {
      playerThrew = 1;
      leaderBoardResult = leaderBoard();
      return `<b>It's a Draw</b> <br>${leaderBoardResult}`;
    }
  }
};
var userKnockOutSelection = function (randomNo1, input) {
  if (input == "low" && winningMethod == winningMethodHigh) {
    winningMethod = winningMethodLow;
    possibleWinningNumber = 0;
    playerThrew = 1;
    return `Current mode have change to <b>low</b>, <br> Press Submit to re-roll the dice`;
  }
  if (input == "high" && winningMethod == winningMethodLow) {
    winningMethod = winningMethodHigh;
    possibleWinningNumber = 0;
    playerThrew = 1;
    return `Current mode have change to <b>high</b>, <br> Press Submit to re-roll the dice`;
  }
  if (playerThrew == 1) {
    possibleWinningNumber = 0;
    allNumber = [];
    counterIndex = 0;
  }
  if (playerThrew <= noOfPlayer) {
    if (counterPlayer < 2) {
      autodice = [];

      while (counter < noOfDice) {
        randomNo1 = randomDice();
        counter += 1;
        autodice.push(randomNo1);
      }

      if (winningMethod == winningMethodHigh) {
        autodice.sort(function (a, b) {
          return b - a;
        });
      }
      if (winningMethod == winningMethodLow) {
        autodice.sort(function (a, b) {
          return a - b;
        });
      }
      counter = 0;
      console.log(winningMethod);
      playerResult = autodice.toString();
      var number1 = "";

      while (counter < noOfDice) {
        number1 = number1 + autodice[counter];
        counter = counter + 1;
      }
      counterPlayer += 1;

      realNumber = Number(number1);
      console.log("before if max");
      if (
        possibleWinningNumber <= realNumber &&
        winningMethod == winningMethodHigh
      ) {
        if (possibleWinningNumber == realNumber) {
          extraNumber = possibleWinningNumber;
        } else {
          possibleWinningNumber = realNumber;
          index = counterIndex;
          console.log("high", possibleWinningNumber);
          console.log("index", index);
        }
      }
      if (winningMethod == winningMethodLow) {
        if (possibleWinningNumber == 0) {
          possibleWinningNumber = realNumber;
          index = counterIndex;
        }
        if (possibleWinningNumber >= realNumber && possibleWinningNumber != 0) {
          if (possibleWinningNumber == realNumber) {
            extraNumber = possibleWinningNumber;
          } else {
            possibleWinningNumber = realNumber;
            index = counterIndex;
            console.log("low", possibleWinningNumber);
            console.log("index", index);
          }
        }
      }
      if (winningStage == winningStateOne) {
        console.log("test");
        if (playerThrew == 1) {
          playerThrew = playerThrew + 1;
          winningStage = winningStateTwo;
          counterIndex = counterIndex + 1;
          console.log("stage1");

          return `${playerName[playerThrew - 2]} number is ${realNumber}`;
        }
        if (playerThrew != 1) {
          winningStage = winningStateTwo;
          counterIndex = counterLastWinning;
          console.log("stage1");
          return `${playerName[winningIndex]} number is ${realNumber}`;
        }
      }
      if (winningStage == winningStateTwo) {
        console.log("test1");
        winningStage = winningStateOne;
        playerThrew = playerThrew + 1;
        counterIndex = counterIndex + 1;
        console.log("stage2");
        console.log(playerName);

        return `${playerName[playerThrew - 2]} number is ${realNumber}`;
      }
    }
    if (counterPlayer == 2) {
      console.log(extraNumber, "extraNumber");
      console.log(possibleWinningNumber, "Possible Winning Number");
      if (playerThrew <= noOfPlayer) {
        if (possibleWinningNumber != extraNumber) {
          counterPlayer = 0;
          counterLastWinning = counterIndex;
          counterIndex = index;
          winningIndex = index;
          winningNumber = possibleWinningNumber;
          possibleWinningNumber = 0;
          extraNumber = 0;
          allNumber = [];
          return `${
            playerName[winningIndex]
          } Win, <b>The Winning number is ${winningNumber}<br><br> ${
            playerName[winningIndex]
          }, Please throw again to continue challenger ${
            playerName[playerThrew - 1]
          }`;
        } else {
          counterPlayer = 0;
          counterLastWinning = 0;
          counterIndex = 0;
          winningIndex = 0;
          playerThrew = playerThrew - 1;
          winningNumber = possibleWinningNumber;
          possibleWinningNumber = 0;
          extraNumber = 0;
          allNumber = [];
          return ` <b>It's a draw</b>, please throw again`;
        }
      }
    }
  }
  if (playerThrew > noOfPlayer) {
    if (possibleWinningNumber != extraNumber) {
      winningIndex = index;
      scoring[winningIndex] = scoring[winningIndex] + 1;
      playerThrew = 1;
      counterPlayer = 0;
      console.log("winningindex", winningIndex);
      winningNumber = possibleWinningNumber;

      possibleWinningNumber = 0;
      allNumber = [];
      counterIndex = 0;
      leaderBoardResult = leaderBoard();
      return `winner is ${playerName[winningIndex]} and ${winningNumber} and ${leaderBoardResult}`;
    } else {
      counterPlayer = 0;

      possibleWinningNumber = 0;
      extraNumber = 0;
      allNumber = [];
      playerThrew = playerThrew - 1;
      return ` <b>It's a draw</b>, please throw again`;
    }
  }
};
var main = function (input) {
  var randomNumber1 = randomDice();

  if (gameState == gameStateOne) {
    if (input == "" || isNaN(input)) {
      return `Please key in number of players`;
      // if (input == "" && gamestate == 0) {
      //   return "Player 1, Please input your name.";
    }
    noOfPlayer = input;
    gameState = gameStateTwo;

    return `There are total of ${noOfPlayer} player, <br>Please Key in your Name`;
  }

  if (input == "" && gameState == gameStateTwo && counter < noOfPlayer) {
    return `Please key in your name`;
  }

  if (input != "" && gameState == gameStateTwo) {
    if (gameState == gameStateTwo && counter < noOfPlayer - 1) {
      counter = counter + 1;
      var name = input;
      var nameOfAllPlayer = playerName.push(input);
      scoring.push(0);
      return `Player${nameOfAllPlayer} = ${name}<br><br> Key in next player Name<br><br>`;
    } else {
      counter = counter + 1;
      scoring.push(0);

      var name = input;
      var nameOfAllPlayer = playerName.push(input);
      counter = 0;
      gameState = gameStateThree;
      return `Welcome all players <br><b>${playerName}<br><br>Please select the number of dices you want to throw at the time`;
    }
  }

  if (gameState == gameStateThree) {
    if (input == "" || isNaN(input)) {
      return `Please key the number of dices you want to play`;
    }
    noOfDice = input;
    gameState = gameStateFour;
    return `You will throw ${noOfDice} dices at one time<br>There are 4 mode:<b> high and low mode & Auto and Knockout mode.<br> high(default)</b>: Highest number win <br> <b>low</b>: Lowest number win<br><br> <br> Auto(default)</b>: All Players will throw dice together in 1 game <br> <b>Knockout</b>: 1st 2 player will start 1st, while loser out and replace by 3rd player and so on<br><br>Let the game start rolling<br>`;
  }

  //   if (gameMode == "Normal" && gamestate == 2) {
  //     return userManualSelection(randomNumber1, randomNumber2, input);
  //   }
  if (gameMode == gameModeOne && gameState == gameStateFour) {
    if (input == "Knockout") {
      gameMode = gameModeTwo;
      possibleWinningNumber = 0;
      playerThrew = 1;
      return `Game mode will now change to Knockout mode`;
    }
    counter = 0;
    return userAutoSelection(randomNumber1, input);
  }
  if (gameMode == gameModeTwo && gameState == gameStateFour) {
    if (input == "Auto") {
      gameMode = gameModeOne;
      possibleWinningNumber = 0;
      playerThrew = 1;
      return `Game mode will now change to Auto mode`;
    }
    counter = 0;
    return userKnockOutSelection(randomNumber1, input);
  }
};
