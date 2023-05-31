var gameModeRollDice = "Game_Mode_Roll_Dice";
var gameModeOrderOfDice = "Game_Mode_Choose_Order_Of_Dice";
var gameMode = gameModeRollDice; //initialize to gameStart from Start
var userDiceRoll1;
var userDiceRoll2;
var playerRollDiceResult = [];
var playScore = [];
var finalPlayScore = [];
var input;
var setCurrentPlayer = 1;

//GetRandom no function for diceroll
var getRandomInteger = function () {
  var randomDecimal = Math.random() * 6;
  var resultInteger = Math.floor(randomDecimal) + 1;
  return resultInteger;
};

var diceRoll = function () {
  var diceNumber = getRandomInteger();
  return diceNumber;
};

var playerRollDice = function () {
  var counter = 0;
  console.log("playRollDice working");
  while (counter < 2) {
    playerRollDiceResult.push(diceRoll());
    counter += 1;
  }
  console.log("playerRollDiceResult", playerRollDiceResult);
  if (setCurrentPlayer == 1) {
    return (
      "Welcome, You roll " +
      playerRollDiceResult[0] +
      " for Dice 1 and " +
      playerRollDiceResult[1] +
      " for Dice 2. <br /> Choose the order of the dice. Input Dice 1 = 1 or Dice 2 = 2 as your 1st number"
    );
  }

  if (setCurrentPlayer == 2) {
    return (
      "Welcome, You roll " +
      playerRollDiceResult[2] +
      " for Dice 1 and " +
      playerRollDiceResult[3] +
      " for Dice 2. <br /> Choose the order of the dice. Input Dice 1 = 1 or Dice 2 = 2 as your 1st number"
    );
  }
};

var setPlayerScore = function (input) {
  if (!userInput) {
    if (!input) {
      return "Please enter 1 or 2 instead of empty submission";
    }

    if (userInput != 1 || userInput != 2) {
      console.log("Choose input : ", userInput);
      return " System only accept 1 or 2 only!";
    }

    var userInput = input;
  }

  if (userInput == 1) {
    console.log("Choose input 1 : ", userInput);

    if (setCurrentPlayer == 1) {
      var playerOneScore = "";
      playScore[0] = String(playerRollDiceResult[0]);
      playScore[1] = String(playerRollDiceResult[1]);
      playerOneScore = playScore[0] + playScore[1];
      finalPlayScore.push(playerOneScore);
      gameMode = gameModeRollDice;
      console.log("setting playerRollDice = 0 ");
      return `Player ${setCurrentPlayer}, you choose Dice 1 first. <br/> Your number is ${finalPlayScore[0]} <br/> It is now Player 2's turn.`;
    }
    if (setCurrentPlayer == 2) {
      var playerTwoScore = "";
      playScore[2] = String(playerRollDiceResult[2]);
      playScore[3] = String(playerRollDiceResult[3]);
      playerTwoScore = playScore[2] + playScore[3];
      finalPlayScore.push(playerTwoScore);
      return `Player 1 Your Score : ${finalPlayScore[0]}, <br/> Player 2 Your Score: ${finalPlayScore[1]}. `;
    }
  }

  if (userInput == 2) {
    console.log("Choose input 2 : ", userInput);

    if (setCurrentPlayer == 1) {
      var playerOneScore = "";
      playScore[0] = String(playerRollDiceResult[1]);
      playScore[1] = String(playerRollDiceResult[0]);
      playerOneScore = playScore[0] + playScore[1];
      finalPlayScore.push(playerOneScore);
      gameMode = gameModeRollDice;
      return `Player ${setCurrentPlayer}, you choose Dice 2 first. <br/> Your number is ${finalPlayScore[0]} <br/> It is now Player 2's turn.`;
    }
    if (setCurrentPlayer == 2) {
      var playerTwoScore = "";
      playScore[2] = String(playerRollDiceResult[3]);
      playScore[3] = String(playerRollDiceResult[2]);
      playerTwoScore = playScore[2] + playScore[3];
      finalPlayScore.push(playerTwoScore);
      return `Player 1 Your Score : ${finalPlayScore[0]} <br/> Player 2 Your Score: ${finalPlayScore[1]} `;
    }
  }
};

var main = function (input) {
  var outPutMessage;
  while (setCurrentPlayer <= 2) {
    if (gameMode == gameModeRollDice) {
      outPutMessage = playerRollDice();
      console.log("playRollDice return");
      gameMode = gameModeOrderOfDice;
      console.log("check gameState if = OrderOfDice set", gameMode);
      return outPutMessage;
    }

    if (gameMode == gameModeOrderOfDice) {
      console.log("Next Step, check game state on submit click : ", gameMode);
      outPutMessage = setPlayerScore(input);
      setCurrentPlayer += 1;
      console.log("GameMode RollDice Again ", gameMode);
      console.log("Player no ", setCurrentPlayer);
      return outPutMessage;
    }
  }
};
