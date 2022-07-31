var minMode = false;
var playerNum = 0;
var diceNum = 0;
var playerScore = [];
var cumScore = [];
var userName = "";

var diceRoll = function () {
  return Math.floor(Math.random() * 6) + 1;
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
  if (input % 1 == 0) {
    if (input > 1) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

var diceNumValidate = function (input) {
  if (input > 0 && input < 11) {
    if (input % 1 == 0) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

var leaderSort = function (input) {
  var inputArr = input.slice();
  var winNum = 0;
  var winNumIndex = 0;
  var sortedArr = [];

  inputLength = inputArr.length;
  var loopCounter = 0;

  while (loopCounter < inputLength) {
    //Find winning number in remainder of input array and add it to sorted list
    if (minMode) {
      //Needed to make sure that 0 is ignored as the minimum in the array
      winNum = Math.min.apply(null, inputArr.filter(nonZeroHelper));
    } else {
      winNum = Math.max.apply(null, inputArr);
    }

    //Override the winning number from remainder of input array list to 0
    winNumIndex = inputArr.indexOf(winNum);

    sortedArr.push(winNumIndex);

    inputArr.splice(winNumIndex, 1, 0);

    loopCounter++;
  }

  return sortedArr;
};

var nonZeroHelper = function (input) {
  return input > 0;
};

var main = function (input) {
  if (userName == "") {
    console.log("a");
    userName = input;
    console.log("b");
    return `Hi <b>${userName}</b>, please enter the number of players (2 or more) for this game.`;
  }

  //Activation of min mode
  if (input == "min") {
    console.log("a");
    if (minMode == false) {
      minMode = true;
    } else {
      minMode = false;
    }

    //Resetting cumulative score
    if (playerNum > 0) {
      for (let loopPlayer = 0; loopPlayer < playerNum; loopPlayer++) {
        cumScore[loopPlayer] = 0;
        playerScore[loopPlayer] = 0;
      }
    }

    if (minMode) {
      return "Min mode is active.<br>Cumulative score tracking has been reset.<br>Enter number of dice for next round to continue playing.";
    } else {
      return "Min mode is inactive.<br>Cumulative score tracking has been reset.<br>Enter number of dice for next round to continue playing.";
    }
  }

  //Validate number of players input
  if (playerNum == 0) {
    if (playerNumValidate(input)) {
      playerNum = input;

      //Initialize each player cumulative score and current round score as 0
      for (let loopPlayer = 0; loopPlayer < playerNum; loopPlayer++) {
        cumScore.push(0);
        playerScore.push(0);
      }
      return ` You have decided to play with ${playerNum} players.<br>Please choose the number of dice (10 or less) you would like to play with.<br><br>You can also toggle to an alternative mode where lowest number wins instead of higher number by entering 'min' into the input field.<br><b>Warning: Toggling on and off the alternative min mode will trigger a reset of cumulative score tracking.<b>`;
    } else {
      return "Please enter a valid number of players (2 or more).";
    }
  }

  //Validate number of dice input
  if (diceNum == 0) {
    if (diceNumValidate(input)) {
      diceNum = input;
    } else {
      return "Please enter a valid number of dice (10 or less) you would like to play with.";
    }
  }

  //Generate current round score and update cumulative results
  var loopCounter = 0;
  while (loopCounter < playerNum) {
    var diceResult = [];

    for (let loopDice = 0; loopDice < diceNum; loopDice++) {
      diceResult.push(diceRoll());
    }

    var currentRoundScore = winNum(diceResult);

    cumScore[loopCounter] = cumScore[loopCounter] + currentRoundScore;
    playerScore[loopCounter] = currentRoundScore;
    loopCounter++;
  }

  //Generate output message
  var currentLeader = leaderSort(playerScore);
  var cumLeader = leaderSort(cumScore);

  var playerResult = 0;
  var cumResult = 0;

  if (minMode) {
    minModeText = "active";
  } else {
    minModeText = "inactive";
  }

  var outputMsgPt1 = `You played with ${diceNum} dice this round.<br>Min mode is ${minModeText}.<br><br>Current round scores as follows:<br>`;
  var outputMsgPt2 = `Cumulative scores as follows:<br>`;

  for (let loopPlayer = 0; loopPlayer < playerNum; loopPlayer++) {
    playerResult = Number(currentLeader.splice(0, 1));
    playerResultScore = playerScore[playerResult];
    if (playerResult == 0) {
      outputMsgPt1 =
        outputMsgPt1 + `<b>${userName}: ${playerResultScore}</b><br>`;
    } else {
      outputMsgPt1 =
        outputMsgPt1 + `Player ${playerResult + 1}: ${playerResultScore}<br>`;
    }

    cumResult = Number(cumLeader.splice(0, 1));
    cumResultScore = cumScore[cumResult];
    if (cumResult == 0) {
      outputMsgPt2 = outputMsgPt2 + `<b>${userName}: ${cumResultScore}</b><br>`;
    } else {
      outputMsgPt2 =
        outputMsgPt2 + `Player ${cumResult + 1}: ${cumResultScore}<br>`;
    }
  }

  //Reset number of dice for next round
  diceNum = 0;

  return `${outputMsgPt1}<br>${outputMsgPt2}`;
};
