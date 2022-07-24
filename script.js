//Instructions
//Users should start first with entering their user name

//Once initialized with user name, user can enter "scissor", "paper" or "stone" to play
//Additionally, user can enter "reversed " + "scissor"/"paper"/"stone" to play, where the win/lose relationship is flipped

//Users can toggle on and off reverse mode by entering "reverse"
//In reverse mode, scissors beats stone, stone beats paper, paper beats scissors

//Combination of user input "reversed" + reverse mode active effectively turns the win/lose relationship back to conventional

//User can also enter "comp" as a means of auto-generating their user input choice

//Users can toggle on and off muk-jji-ppa mode by entering "mjp"
//In when mjp mode is active, users need to win per the conventional method once and then draw to win
//Direct draw with no previous winner = draw

//Adding global variables
var winCount = 0;
var loseCount = 0;
var drawCount = 0;

var gameInitialized = false;
var userName = "";
var reverseMode = "inactive";

//For Muk-Jji-Ppa mode
var mjpGameMode = "inactive";
var mjpCurrentWinner = "";

//Generating random input by PC player
var randSPS = function () {
  var randNum = Math.floor(Math.random() * 3);

  var spsRand = "";

  if (randNum == 0) {
    spsRand = "scissors";
  } else if (randNum == 1) {
    spsRand = "paper";
  } else {
    spsRand = "stone";
  }

  return spsRand;
};

//Standard win condition check, non-MJP game mode
var winConCheck = function (userInput, pcInput) {
  var resultStr = "";
  if (userInput == pcInput) {
    resultStr = "It's a draw.";
    drawCount += 1;
  } else if (
    (userInput == "scissors" && pcInput == "paper") ||
    (userInput == "paper" && pcInput == "stone") ||
    (userInput == "stone" && pcInput == "scissors")
  ) {
    resultStr = "You won!";
    winCount += 1;
  } else {
    resultStr = "You lost.";
    loseCount += 1;
  }
  return resultStr;
};

//Reversed win condition check, non-MJP game mode
var winConCheckRev = function (userInput, pcInput) {
  var resultStr = "";
  if (userInput == pcInput) {
    resultStr = "It's a draw.";
    drawCount += 1;
  } else if (
    (userInput == "scissors" && pcInput == "paper") ||
    (userInput == "paper" && pcInput == "stone") ||
    (userInput == "stone" && pcInput == "scissors")
  ) {
    resultStr = "You lost.";
    loseCount += 1;
  } else {
    resultStr = "You won!";
    winCount += 1;
  }
  return resultStr;
};

//Standard win condition check, MJP game mode
var winConCheckMJP = function (userInput, pcInput) {
  var resultStr = "";
  if (userInput == pcInput && mjpCurrentWinner == "") {
    resultStr = "It's a draw.";
    drawCount += 1;
  } else if (userInput == pcInput && mjpCurrentWinner != "") {
    if (mjpCurrentWinner == "user") {
      resultStr = "You won this muk-jji-ppa round!";
      winCount += 1;
    } else {
      resultStr = "You lost this muk-jji-ppa round.";
      loseCount += 1;
    }
    mjpCurrentWinner = "";
  } else if (
    (userInput == "scissors" && pcInput == "paper") ||
    (userInput == "paper" && pcInput == "stone") ||
    (userInput == "stone" && pcInput == "scissors")
  ) {
    resultStr = "You won this round!<br>Muk-jii-Ppa!";
    mjpCurrentWinner = "user";
  } else {
    resultStr = "You lost this round.<br>PC: Muk-jji-Ppa!";
    mjpCurrentWinner = "PC";
  }
  return resultStr;
};

//Reversed win condition check, MJP game mode
var winConCheckRevMJP = function (userInput, pcInput) {
  var resultStr = "";
  if (userInput == pcInput && mjpCurrentWinner == "") {
    resultStr = "It's a draw.";
    drawCount += 1;
  } else if (userInput == pcInput && mjpCurrentWinner != "") {
    if (mjpCurrentWinner == "user") {
      resultStr = "You won this muk-jji-ppa round!";
      winCount += 1;
    } else {
      resultStr = "You lost this muk-jji-ppa round.";
      loseCount += 1;
    }
    mjpCurrentWinner = "";
  } else if (
    (userInput == "scissors" && pcInput == "paper") ||
    (userInput == "paper" && pcInput == "stone") ||
    (userInput == "stone" && pcInput == "scissors")
  ) {
    resultStr = "You lost this round.<br>PC: Muk-jji-Ppa!";
    mjpCurrentWinner = "PC";
  } else {
    resultStr = "You won this round!<br>Muk-jii-Ppa!";
    mjpCurrentWinner = "user";
  }
  return resultStr;
};

//User input validation function
var inputValidation = function (userInput) {
  var splitInput = userInput.split(" ");
  if (splitInput.length == 1) {
    //check if user input = scissors/paper/stone
    return ["scissors", "paper", "stone"].includes(splitInput[0]);
  } else if (splitInput.length == 2) {
    //check if user input = reversed scissors/paper/stone
    if (
      splitInput[0] == "reversed" &&
      ["scissors", "paper", "stone"].includes(splitInput[1])
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

var main = function (input) {
  //Initializing username
  if (gameInitialized == false) {
    userName = input;
    gameInitialized = true;
    return `Welcome ${userName}!<br>Please enter scissors/paper/stone to play the game.`;
  }
  var lowCaseConv = input.toLowerCase();

  //Toggling on/off reverse mode
  if (lowCaseConv == "reverse" && reverseMode == "active") {
    reverseMode = "inactive";
    return "Reverse mode is currently inactive.";
  } else if (lowCaseConv == "reverse" && reverseMode == "inactive") {
    reverseMode = "active";
    return "Reverse mode is currently active.";
  }

  //Toggling on/off muk-jji-ppa mode
  if (lowCaseConv == "mjp" && mjpGameMode == "active") {
    mjpGameMode = "inactive";
    return "Muk-jji-ppa mode is currently inactive.";
  } else if (lowCaseConv == "mjp" && mjpGameMode == "inactive") {
    mjpGameMode = "active";
    return "Muk-jji-ppa mode is currently active.";
  }

  //User input validation check
  if (inputValidation(lowCaseConv) == false && lowCaseConv != "comp") {
    return "Please input [reversed (optional)] + scissors/paper/stone only.";
  }

  var userChoice = "";
  var winConCheckResult = "";

  //Generating PC choice
  var pcChoice = randSPS();

  var splitUserInput = "";

  //Non-MJP game mode
  //Reverse mode + starting input with "reverse" cancels each other out
  if (mjpGameMode == "inactive") {
    if (reverseMode == "inactive") {
      //converting user input in case reversed scenario triggered
      splitUserInput = lowCaseConv.split(" ");

      //Reverse mode off scenario
      if (splitUserInput[0] == "reversed") {
        userChoice = splitUserInput[1];
        winConCheckResult = winConCheckRev(userChoice, pcChoice);
      } else if (lowCaseConv == "comp") {
        userChoice = randSPS();
        winConCheckResult = winConCheck(userChoice, pcChoice);
      } else {
        userChoice = splitUserInput[0];
        winConCheckResult = winConCheck(userChoice, pcChoice);
      }
    } else {
      //converting user input in case reversed scenario triggered
      splitUserInput = lowCaseConv.split(" ");

      //Reverse mode on scenario
      if (splitUserInput[0] == "reversed") {
        userChoice = splitUserInput[1];
        winConCheckResult = winConCheck(userChoice, pcChoice);
      } else if (lowCaseConv == "comp") {
        userChoice = randSPS();
        winConCheckResult = winConCheckRev(userChoice, pcChoice);
      } else {
        userChoice = splitUserInput[0];
        winConCheckResult = winConCheckRev(userChoice, pcChoice);
      }
    }
  }

  //MJP game mode
  //Reverse mode + starting input with "reverse" cancels each other out
  if (mjpGameMode == "active") {
    if (reverseMode == "inactive") {
      //converting user input in case reversed scenario triggered
      splitUserInput = lowCaseConv.split(" ");

      //Reverse mode off scenario
      if (splitUserInput[0] == "reversed") {
        userChoice = splitUserInput[1];
        winConCheckResult = winConCheckRevMJP(userChoice, pcChoice);
      } else if (lowCaseConv == "comp") {
        userChoice = randSPS();
        winConCheckResult = winConCheckMJP(userChoice, pcChoice);
      } else {
        userChoice = splitUserInput[0];
        winConCheckResult = winConCheckMJP(userChoice, pcChoice);
      }
    } else {
      //converting user input in case reversed scenario triggered
      splitUserInput = lowCaseConv.split(" ");

      //Reverse mode on scenario
      if (splitUserInput[0] == "reversed") {
        userChoice = splitUserInput[1];
        winConCheckResult = winConCheckMJP(userChoice, pcChoice);
      } else if (lowCaseConv == "comp") {
        userChoice = randSPS();
        winConCheckResult = winConCheckRevMJP(userChoice, pcChoice);
      } else {
        userChoice = splitUserInput[0];
        winConCheckResult = winConCheckRevMJP(userChoice, pcChoice);
      }
    }
  }
  var outputMsg = `Hi ${userName}!<br>The computer chose ${pcChoice}.<br>You chose ${userChoice}.<br>${winConCheckResult}<br>Now you can type "scissors" "paper" or "stone" to play another round!<br>Your Win/Lose/Draw record is ${winCount}/${loseCount}/${drawCount}.<br>Reverse mode is currently ${reverseMode}.<br>Muk-jji-ppa mode is currently ${mjpGameMode}.`;

  return outputMsg;
};
