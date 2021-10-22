var currentGameMode = "Select Number of Players";
var numofPlayers = 0;
var numofDice = 0;
var playersScore = [];
var currentPlayerDiceResults = [];
var playersChosenNumber = [];

var numofRounds = 0;
var totalPlayers = [];
var remainingPlayers = [];
var currentRoundPlayersWon = [];
var currentPlayer = 0;
var indexCurrentPlayer = 0;

var rollDice = function () {
  var diceOutcome = Math.floor(Math.random() * 6) + 1;
  return diceOutcome;
};

var selectPlayer = function () {
  var index = Math.floor(Math.random() * (numofPlayers - numofRounds));
  var playerSelected = remainingPlayers[index];

  remainingPlayers.splice(remainingPlayers.indexOf(playerSelected), 1);

  // for (var counter = 0; counter < index; counter += 1) {
  //   remainingPlayers.push(remainingPlayers.shift());
  // }

  // remainingPlayers.shift();

  return playerSelected;
};

var generateOptimalNumber = function (arrayInput) {
  var sortedArray = arrayInput.sort(function (a, b) {
    return a - b;
  });
  var lowestNum = "";

  for (var counter = 0; counter < numofDice; counter += 1) {
    lowestNum = lowestNum + String(sortedArray[counter]);
  }
  return Number(lowestNum);
};

// var rollDiceTwice = function () {
//   var dice1 = rollDice();
//   var dice2 = rollDice();
//   playersDiceResultsString[0] = String(dice1);
//   playersDiceResultsString[1] = String(dice2);

//   var bothDiceOutcome = `You rolled ${dice1} for Dice 1 and ${dice2} for Dice 2.`;
//   return;
// };

// var matchArraySizetoPlayers = function (numofPlayers) {
//   return;
// };

var main = function (input) {
  var mainOutputMessage = "";

  // Select num of players mode
  if (currentGameMode == "Select Number of Players") {
    numofPlayers = input;

    if (numofPlayers <= 1) {
      mainOutputMessage = "Pls input more than 1 player.";
      return mainOutputMessage;
    }

    for (var counter = 1; counter <= numofPlayers; counter += 1) {
      playersScore.push(0);
      playersChosenNumber.push(0);
      totalPlayers.push(counter);
    }

    currentGameMode = "Select Number of Dice";
    mainOutputMessage = `Great! There will be ${numofPlayers} players.<br>
    Now input the number of dice that will be rolled.`;
    return mainOutputMessage;
  }

  // Select num of dice mode
  if (currentGameMode == "Select Number of Dice") {
    numofDice = input;

    if (numofDice <= 1) {
      mainOutputMessage = "Pls input more than 1 die to start the game.";
      return mainOutputMessage;
    }

    for (var counter = 1; counter <= numofDice; counter += 1) {
      currentPlayerDiceResults.push(0);
    }

    // for (counter = 1; counter <= numofPlayers; counter += 1) {
    //   playersDiceResults.push(numofDiceArray);
    // }

    currentGameMode = "Roll Dice";
    mainOutputMessage = `Nice! There will be ${numofDice} dice for each player.<br>Click the "Submit" button to start the game!`;
    return mainOutputMessage;
  }

  // Rolling dice mode
  if (currentGameMode == "Roll Dice") {
    console.log("current num of rds --> " + numofRounds);
    if (numofRounds == 0) {
      remainingPlayers = totalPlayers.map((x) => x);
    }

    numofRounds += 1;
    currentPlayer = selectPlayer();
    indexCurrentPlayer = currentPlayer - 1;

    console.log("total players array " + totalPlayers);

    console.log("remaining players array" + remainingPlayers);

    var diceMessage = "You rolled";
    var diceResult = 0;
    var indexDice = 0;

    console.log("current player --> " + currentPlayer);
    // console.log("players dice results array ---> ");
    // console.log(playersDiceResults);

    for (var counter = 1; counter <= numofDice; counter += 1) {
      diceResult = rollDice();
      currentPlayerDiceResults[indexDice] = diceResult;

      if (counter == 1) {
        diceMessage = `${diceMessage} ${diceResult} for Dice ${counter}`;
      } else if (counter == numofDice) {
        diceMessage = `${diceMessage} and ${diceResult} for Dice ${counter}.`;
      } else {
        diceMessage = `${diceMessage}, ${diceResult} for Dice ${counter}`;
      }

      indexDice += 1;
    }

    console.log(currentPlayerDiceResults);

    mainOutputMessage = `Welcome Player ${currentPlayer}!<br>
    ${diceMessage}<br>
    The order of your dice will be auto rearrange to form the lowest possible number.`;
    currentGameMode = "Show Leaderboard";

    // For manual select dice order mode
    // mainOutputMessage =
    // `Welcome Player ${currentPlayer}!<br>
    // ${diceMessage}<br>
    // Choose the order of your dice (Use a , to separate the Dice order: "B,A,C")`;
    // currentGameMode = "Select Dice Order";
    // return mainOutputMessage;
    return mainOutputMessage;
  }

  // Select dice order mode
  //   if (currentGameMode == "Select Dice Order") {
  //     var chosenNumber = "";

  //     if (input < 1 || input > numofDice) {
  //       mainOutputMessage = "Pls select the correct dice.";
  //       return mainOutputMessage;
  //     }

  //     if (input == 1) {
  //       chosenNumber = Number(
  //         playersDiceResultsString[0] + playersDiceResultsString[1]
  //       );
  //     } else {
  //       chosenNumber = Number(
  //         playersDiceResultsString[1] + playersDiceResultsString[0]
  //       );
  //     }

  //     if (currentPlayer == 1) {
  //       player1Number = chosenNumber;
  //     } else {
  //       player2Number = chosenNumber;
  //     }
  //   }
  //   var myOutputValue = "hello world";
  //   return myOutputValue;
  // };

  if (currentGameMode == "Show Leaderboard") {
    lowestOptimalNumber = generateOptimalNumber(currentPlayerDiceResults);

    playersChosenNumber[indexCurrentPlayer] += lowestOptimalNumber;

    mainOutputMessage = `Player ${currentPlayer}'s number is ${lowestOptimalNumber}<br><br>`;

    for (var counter = 1; counter <= numofPlayers; counter += 1) {
      mainOutputMessage = `${mainOutputMessage}Player ${counter}'s score: ${
        playersChosenNumber[counter - 1]
      }<br>`;
    }

    console.log("current no of rds --> " + numofRounds);

    if (numofRounds == numofPlayers) {
      numofRounds = 0;
    }

    currentGameMode = "Roll Dice";

    return mainOutputMessage;
  }
};

// var ac = [
//   [1, 2],
//   [3, 4],
// ];
// console.log(ac[1][0]);

// var zzz = [3, 6, 1];
// var sortedA = zzz.sort(function (a, b) {
//   return a - b;
// });

// var lowest = "";

// for (var counter = 0; counter < 3; counter += 1) {
//   lowest = lowest + String(sortedA[counter]);
// }

// console.log(sortedA);
// console.log(Number(lowest));
