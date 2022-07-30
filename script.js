var minMode = false;
var playerNum = 0;
var diceNum = 0;
var playerScore = [];
var cumScore = [];

var diceRoll = function () {
  return Math.ceil(Math.random() * 6) + 1;
};

var concatNum = function (firstNum, secondNum) {
  return Number(firstNum) * 10 + Number(secondNum);
};

var winNum = function (inputArr) {
  var winNum = 0;
  var winNumIndex = 0;
  var sortedArr = [];
  var outputNum = 0;

  inputLength = inputArr.length;
  var loopCounter = 0;

  while (loopCounter < inputLength) {
    //Find winning number in remainder of input array and add it to sorted list
    if (minMode) {
      winNum = Math.min.apply(null, inputArr);
    } else {
      winNum = Math.max.apply(null, inputArr);
    }
    sortedArr.push(winNum);

    //Remove the winning number from remainder of input array list
    winNumIndex = inputArr.indexOf(winNum);
    inputArr.splice(winNumIndex, 1);

    loopCounter++;
  }

  loopCounter = 0;
  while (loopCounter < inputLength) {
    outputNum = outputNum + sortedArr.pop() * 10 ** loopCounter;

    loopCounter++;
  }

  return outputNum;
};

var playerNumValidate = function (input) {
  if (Number.isInteger(input) && input > 1) {
    return true;
  } else {
    return false;
  }
};

var diceNumValidate = function (input) {
  if (Number.isInteger(input) && input > 0) {
    return true;
  } else {
    return false;
  }
};

var leaderSort = function (inputArr) {
  var winNum = 0;
  var winNumIndex = 0;
  var sortedArr = [];

  var overrideNum = 0;
  if (minMode) {
    overrideNum = 10 ** diceNum;
  } else {
    overrideNum = 0;
  }

  inputLength = inputArr.length;
  var loopCounter = 0;

  while (loopCounter < inputLength) {
    //Find winning number in remainder of input array and add it to sorted list
    if (minMode) {
      winNum = Math.min.apply(null, inputArr);
    } else {
      winNum = Math.max.apply(null, inputArr);
    }

    //Remove the winning number from remainder of input array list
    winNumIndex = inputArr.indexOf(winNum);
    sortedArr.push(winNumIndex);

    inputArr.splice(winNumIndex, 1, overrideNum);

    loopCounter++;
  }

  return sortedArr;
};

var main = function (input) {
  //Validate number of players input
  if (playerNum == 0) {
    if (playerNumValidate(input)) {
      playerNum = input;

      //Initialize each player cumulative score and current round score as 0
      for (let loopPlayer = 0; loopPlayer < playerNum; loopPlayer++) {
        cumScore.push(0);
        playerScore.push(0);
      }
    } else {
      return "Please enter a valid number of players.";
    }
  }

  //Validate number of dice input
  if (diceNum == 0) {
    if (diceNumValidate(input)) {
      diceNum = input;
    } else {
      return "Please enter a valid number of dice you would like to play with.";
    }
  }

  //Generate current round score and update cumulative results
  for (let loopPlayer = 0; loopPlayer < playerNum; loopPlayer++) {
    var diceResult = [];

    for (let loopDice = 0; loopDice < diceNum; loopDice++) {
      diceResult.push(diceRoll());
    }

    var currentRoundScore = winNum(diceResult);

    cumScore[loopPlayer] = cumScore[loopPlayer] + currentRoundScore;
    playerScore[loopPlayer] = currentRoundScore;
  }

  //Generate output message
  var outputMsgPt1 = "Current round scores as follows:<br>";
  var outputMsgPt2 = "Cumulative scores as follows:<br>";

  for (let loopPlayer = 0; loopPlayer < playerNum; loopPlayer++) {}
};
