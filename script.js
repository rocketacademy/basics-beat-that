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

var main = function (input) {
  //PlayerOne
  if (gameMode == "PLAYER ONE ROLL MODE") {
    playerOneDiceArray.push(diceRoll1);
    playerOneDiceArray.push(diceRoll2);
    console.log(`gameMode` + gameMode);
    console.log(`playerOneArray` + playerOneDiceArray);

    gameMode = "PLAYER ONE GUESS MODE";
    console.log(`game mode change` + gameMode);

    return (myOutputValue = `Player One has rolled ${playerOneDiceArray[0]} and ${playerOneDiceArray[1]}. <br> To choose ${playerOneDiceArray[0]} as the first value, submit "1" . <br> To choose ${playerOneDiceArray[1]} as the first value, submit "2".`);
  }

  if (gameMode == "PLAYER ONE GUESS MODE") {
    var firstValue = input;
    var myOutputValue = ``;
    if (firstValue == "1") {
      finalValuePlayerOne = `${playerOneDiceArray[0]}${playerOneDiceArray[1]}`;
      return (myOutputValue += `Player One's final value is ${finalValuePlayerOne}.`);
    } else if (firstValue == "2") {
      finalValuePlayerOne = `${playerOneDiceArray[1]}${playerOneDiceArray[0]}`;
      return (myOutputValue += `Player One's final value is ${finalValuePlayerOne}.`);
    }
    gameMode = "PLAYER TWO ROLL MODE";
    return myOutputValue;
  }

  //PlayerTwo
  if (gameMode == "PLAYER TWO ROLL MODE") {
    playerTwoDiceArray.push(diceRoll1);
    playerTwoDiceArray.push(diceRoll2);
    console.log(`gameMode` + gameMode);
    console.log(`playerOneArray` + playerTwoDiceArray);

    gameMode = "PLAYER TWO GUESS MODE";
    console.log(`game mode change` + gameMode);

    return `Player Two have rolled ${playerTwoDiceArray[0]} and ${playerTwoDiceArray[1]}. <br> To choose ${playerTwoDiceArray[0]} as the first value, submit "1" . <br> To choose ${playerTwoDiceArray[1]} as the first value, submit "2".`;
  }

  if (gameMode == "PLAYER TWO GUESS MODE") {
    var firstValue = input;
    var myOutputValue = ``;
    if (firstValue == "1") {
      finalValuePlayerTwo = `${playerTwoDiceArray[0]}${playerTwoDiceArray[1]}`;
      return (myOutputValue += `Player Two's final value is ${finalValuePlayerTwo}.`);
    } else if (firstValue == "2") {
      finalValuePlayerTwo = `${playerTwoDiceArray[1]}${playerTwoDiceArray[0]}`;
      return (myOutputValue += `Player Two's final value is ${finalValuePlayerTwo}.`);
    }
    gameMode = "WHO WON";
    return myOutputValue;
  }
  //Determine winner
  if ((gameMode = "WHO WON")) {
    if (Number(finalValuePlayerOne) > Number(finalValuePlayerTwo)) {
      return `Player One's final value of ${finalValuePlayerOne} is larger than Player Two's final value of ${finalValuePlayerTwo}. <br><br>Player One wins!`;
    } else {
      return `Player Two's final value of ${finalValuePlayerTwo} is larger than Player Two's final value of ${finalValuePlayerOne}. <br><br>Player Two wins!`;
    }
  }
};
