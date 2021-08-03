//global variables
var gameMode = "PLAYER ONE ROLL MODE";
var playerOneDiceArray = [];
var playerTwoDiceArray = [];
var finalValuePlayerOne;
var finalValuePlayerTwo;

var rollDice = function () {
  return Math.floor(Math.random() * 6) + 1;
};

var diceRoll1 = rollDice();
var diceRoll2 = rollDice();
var diceRoll3 = rollDice();
var diceRoll4 = rollDice();

var main = function (input) {
  console.log(gameMode);
  //PlayerOne
  if (gameMode == "PLAYER ONE ROLL MODE") {
    playerOneDiceArray.push(diceRoll1);
    playerOneDiceArray.push(diceRoll2);

    gameMode = "PLAYER ONE GUESS MODE";

    return (myOutputValue = `Player One has rolled ${playerOneDiceArray[0]} and ${playerOneDiceArray[1]}. <br> To choose ${playerOneDiceArray[0]} as the first value, submit "1" . <br> To choose ${playerOneDiceArray[1]} as the first value, submit "2".`);
  }

  if (gameMode == "PLAYER ONE GUESS MODE") {
    var firstValue = input;
    var myOutputValue = ``;
    if (firstValue == "1") {
      finalValuePlayerOne = `${playerOneDiceArray[0]}${playerOneDiceArray[1]}`;
      myOutputValue += `Player One's final value is ${finalValuePlayerOne}.`;
    } else if (firstValue == "2") {
      finalValuePlayerOne = `${playerOneDiceArray[1]}${playerOneDiceArray[0]}`;
      myOutputValue += `Player One's final value is ${finalValuePlayerOne}.`;
    }
    gameMode = "PLAYER TWO ROLL MODE";
    return myOutputValue;
  }

  //PlayerTwo

  if (gameMode == "PLAYER TWO ROLL MODE") {
    console.log(`after, ${gameMode}`);
    playerTwoDiceArray.push(diceRoll3);
    playerTwoDiceArray.push(diceRoll4);

    gameMode = "PLAYER TWO GUESS MODE";

    return `Player Two have rolled ${playerTwoDiceArray[0]} and ${playerTwoDiceArray[1]}. <br> To choose ${playerTwoDiceArray[0]} as the first value, submit "1" . <br> To choose ${playerTwoDiceArray[1]} as the first value, submit "2".`;
  }

  if (gameMode == "PLAYER TWO GUESS MODE") {
    var firstValue = input;
    var myOutputValue = ``;
    if (firstValue == "1") {
      finalValuePlayerTwo = `${playerTwoDiceArray[0]}${playerTwoDiceArray[1]}`;
      myOutputValue += `Player Two's final value is ${finalValuePlayerTwo}.`;
    } else if (firstValue == "2") {
      finalValuePlayerTwo = `${playerTwoDiceArray[1]}${playerTwoDiceArray[0]}`;
      myOutputValue += `Player Two's final value is ${finalValuePlayerTwo}.`;
    }
    gameMode = "WHO WON";
    return myOutputValue;
  }
  //Determine winner
  if (gameMode == "WHO WON") {
    if (Number(finalValuePlayerOne) > Number(finalValuePlayerTwo)) {
      return `Player One's final value of ${finalValuePlayerOne} is larger than Player Two's final value of ${finalValuePlayerTwo}. <br><br>Player One wins!`;
    } else {
      return `Player Two's final value of ${finalValuePlayerTwo} is larger than Player One's final value of ${finalValuePlayerOne}. <br><br>Player Two wins!`;
    }
  }
};
