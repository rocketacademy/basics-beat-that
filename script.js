var player1DiceRoll1 = 0;
var player1DiceRoll2 = 0;
var player2DiceRoll1 = 0;
var player2DiceRoll2 = 0;
var player1FinalDiceRollResult = 0;
var player2FinalDiceRollResult = 0;
var finalPlayer1AdvancedResults = 0;
var finalPlayer2AdvancedResults = 0;
var player1AdvanceRoll = [];
var player2AdvanceRoll = [];
var myOutputValue = "";
var player1WinCount = 0;
var player2WinCount = 0;
var currentGameMode = "";

var main = function (input) {
  //Output Gamemode choices "normal" and "advanced"
  if (currentGameMode == "") {
    myOutputValue =
      "Please choose between the two gamemodes. Submit 'normal' for normal gamemode (i.e., 2 dices), and 'advanced' for advanced gamemode! (i.e., select no. of dices to be played, autochoice)";
    currentGameMode = "Gamemode selected";
    return myOutputValue;
    //User selects Gamemode via gameMode function
  } else if (currentGameMode == "Gamemode selected") {
    var selectGameMode = gameMode(input);
    myOutputValue = selectGameMode;
    return myOutputValue;
    //If gamemode is "Normal"
  } else if (currentGameMode == "Submit") {
    player1DiceRoll1 = rollDice();
    player1DiceRoll2 = rollDice();
    //play1 function shows result of dicerolls for player 1
    var player1Roll = play1();
    //chooseOrderMsg function shows choose order msg for player
    var player1chooseOrderMsg = chooseOrderMsg();
    myOutputValue = player1Roll + "<br>" + player1chooseOrderMsg;
    currentGameMode = "waiting for player1 to choose order of dices";
    return myOutputValue;
  } else if (
    currentGameMode == "waiting for player1 to choose order of dices"
  ) {
    //chooseOrderPlayer1 function outputs final result based on Player1's choice of the order of dices rolled
    var player1ChooseOrder = chooseOrderPlayer1(input);
    var myOutputValue =
      player1ChooseOrder +
      "<br> Player 2, please click on the submit button to begin!";
    currentGameMode = "waiting for player2 to roll dices";
    return myOutputValue;
  } else if (currentGameMode == "waiting for player2 to roll dices") {
    player2DiceRoll1 = rollDice();
    player2DiceRoll2 = rollDice();
    var player2Roll = play2();
    var player2chooseOrderMsg = chooseOrderMsg();
    myOutputValue = player2Roll + "<br>" + player2chooseOrderMsg;
    currentGameMode = "waiting for player2 to choose order of dices";
    return myOutputValue;
  } else if (
    currentGameMode == "waiting for player2 to choose order of dices"
  ) {
    var player2ChooseOrder = chooseOrderPlayer2(input);
    myOutputValue =
      player2ChooseOrder +
      "<br> Please click on the submit button to see who won!";
    currentGameMode = "see winning message";
    return myOutputValue;
  } else if (currentGameMode == "see winning message") {
    var displayWinMsg = winMsg();
    myOutputValue = displayWinMsg;
    return myOutputValue;
    // Advanced gamemode for Player1
  } else if (currentGameMode == "advanced") {
    //storing rolls into global player1 advanced list
    player1AdvanceRoll = advanceMode1Roll(input);
    var advanceResultsMsg = advanceMode1();
    myOutputValue = `${advanceResultsMsg} Player 2 please submit the same die roll as Player 1 to see who gets the highest no!`;
    currentGameMode = "advanced2";
    return myOutputValue;
    //Advanced gamemode for Player2
  } else if (currentGameMode == "advanced2") {
    //storing rolls into global player2 advanced list
    player2AdvanceRoll = advanceMode2Roll(input);
    var advanceResultsMsg2 = advanceMode2();
    myOutputValue = advanceResultsMsg2;
    currentGameMode = "see winning message advanced";
    return myOutputValue;
  } else if (currentGameMode == "see winning message advanced") {
    var displayWinMsgAdvanced = winMsgAdvanced();
    myOutputValue = displayWinMsgAdvanced;
    return myOutputValue;
  }
};

//advance game mode player1 selects no. of dices and this function pushes results into player1AdvanceRoll list
var advanceMode1Roll = function (input) {
  var counter = 0;
  var player1RollList = [];
  while (counter < input) {
    var diceRollResult = rollDice();
    player1RollList.push(diceRollResult);
    counter += 1;
  }
  return player1RollList;
};

//advance game mode player1 auto chooses permutation
var advanceMode1 = function () {
  var counter2 = 0;
  var findNumber = 6;
  var convertPlayer1Results = "";
  var storePlayer1FinalResults = 0;

  while (findNumber > 0) {
    while (counter2 < player1AdvanceRoll.length) {
      if (player1AdvanceRoll[counter2] == findNumber) {
        var store = player1AdvanceRoll[counter2];
        convertPlayer1Results += store.toString();
      }
      counter2 += 1;
    }
    counter2 = 0;
    findNumber -= 1;
  }
  storePlayer1FinalResults = parseInt(convertPlayer1Results);
  finalPlayer1AdvancedResults = storePlayer1FinalResults;
  myOutputValue = `Here are your dice rolls, we've permutated them accordingly to form the following numbers: ${storePlayer1FinalResults}`;
  return myOutputValue;
};

//advance game mode player2 selects no. of dices and this function pushes results into player2AdvanceRoll list
var advanceMode2Roll = function (input) {
  var counter = 0;
  var player2RollList = [];
  while (counter < input) {
    var diceRollResult = rollDice();
    player2RollList.push(diceRollResult);
    counter += 1;
  }
  return player2RollList;
};

//advance game mode player2 auto chooses permutation
var advanceMode2 = function () {
  var counter2 = 0;
  var findNumber = 6;
  var convertPlayer2Results = "";
  var storePlayer2FinalResults = 0;

  while (findNumber > 0) {
    while (counter2 < player2AdvanceRoll.length) {
      if (player2AdvanceRoll[counter2] == findNumber) {
        var store = player2AdvanceRoll[counter2];
        convertPlayer2Results += store.toString();
      }
      counter2 += 1;
    }
    counter2 = 0;
    findNumber -= 1;
  }
  storePlayer2FinalResults = parseInt(convertPlayer2Results);
  finalPlayer2AdvancedResults = storePlayer2FinalResults;
  myOutputValue = `Here are your dice rolls, we've permutated them accordingly to form the following numbers: ${storePlayer2FinalResults}`;
  return myOutputValue;
};

// Winning message for advanced
var winMsgAdvanced = function () {
  if (finalPlayer1AdvancedResults > finalPlayer2AdvancedResults) {
    player1WinCount += 1;
    myOutputValue = `Player 1 wins this round! So far, Player 1 has won ${player1WinCount} and Player 2 has won ${player2WinCount}. Click submit to play again!`;
    currentGameMode = "";
    return myOutputValue;
  }
  player2WinCount += 1;
  myOutputValue = `Player 1 wins this round! So far, Player 1 has won ${player1WinCount} and Player 2 has won ${player2WinCount} Click submit to play again!`;
  currentGameMode = "";
  return myOutputValue;
};

// Winning message
var winMsg = function () {
  if (player1FinalDiceRollResult > player2FinalDiceRollResult) {
    player1WinCount += 1;
    myOutputValue = `Player 1 wins this round! So far, Player 1 has won ${player1WinCount} and Player 2 has won ${player2WinCount}. Click submit to play again!`;
    currentGameMode = "";
    return myOutputValue;
  }
  player2WinCount += 1;
  myOutputValue = `Player 1 wins this round! So far, Player 1 has won ${player1WinCount} and Player 2 has won ${player2WinCount} Click submit to play again!`;
  currentGameMode = "";
  return myOutputValue;
};

//RandomNumber generator 1 to 6
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var randomNumberResult = randomInteger + 1;
  return randomNumberResult;
};

//Player 1 two dice rolls msgs
var play1 = function () {
  var diceRoll1 = player1DiceRoll1;
  var diceRoll2 = player1DiceRoll2;
  myOutputValue = `You have rolled ${diceRoll1} for Dice 1 and ${diceRoll2} for Dice 2!`;
  return myOutputValue;
};

//Player 2 two dice rolls msgs
var play2 = function () {
  var diceRoll1 = player2DiceRoll1;
  var diceRoll2 = player2DiceRoll2;
  myOutputValue = `You have rolled ${diceRoll1} for Dice 1 and ${diceRoll2} for Dice 2!`;
  return myOutputValue;
};

//Choose order Msg
var chooseOrderMsg = function () {
  myOutputValue = "Choose the order of your die by inputting either '1' or '2'";
  return myOutputValue;
};

//Choose order for Player 1
var chooseOrderPlayer1 = function (input) {
  if (input == "1") {
    var convertingPlayer1FinalResult =
      player1DiceRoll1.toString() + player1DiceRoll2.toString();
    var player1FinalResult = parseInt(convertingPlayer1FinalResult);
    myOutputValue = player1FinalResult + " is your final result!";
    player1FinalDiceRollResult = player1FinalResult;
    return myOutputValue;
  }
  var convertingPlayer1FinalResult =
    player1DiceRoll2.toString() + player1DiceRoll1.toString();
  var player1FinalResult = parseInt(convertingPlayer1FinalResult);
  myOutputValue = player1FinalResult + " is your final result!";
  player1FinalDiceRollResult = player1FinalResult;
  return myOutputValue;
};

//Choose order for Player 2
var chooseOrderPlayer2 = function (input) {
  if (input == "1") {
    var convertingPlayer2FinalResult =
      player2DiceRoll1.toString() + player2DiceRoll2.toString();
    var player2FinalResult = parseInt(convertingPlayer2FinalResult);
    myOutputValue = player2FinalResult + " is your final result!";
    player2FinalDiceRollResult = player2FinalResult;
    return myOutputValue;
  }
  var convertingPlayer2FinalResult =
    player2DiceRoll2.toString() + player2DiceRoll1.toString();
  var player2FinalResult = parseInt(convertingPlayer2FinalResult);
  myOutputValue = player2FinalResult + " is your final result!";
  player2FinalDiceRollResult = player2FinalResult;
  return myOutputValue;
};

//gameMode choices between Normal and Advanced
var gameMode = function (input) {
  if (input == "normal") {
    currentGameMode = "Submit";
    myOutputValue =
      "You have selected normal gamemode! click submit again to roll two dices!";
    return myOutputValue;
  } else if (input == "advanced") {
    currentGameMode = "advanced";
    myOutputValue =
      "You have selected advanced gamemode! Please indicate how many dices you would like to roll!";
    return myOutputValue;
  }
  currentGameMode = "";
  myOutputValue = "Please submit either 'normal' or 'advanced'";
  return myOutputValue;
};
