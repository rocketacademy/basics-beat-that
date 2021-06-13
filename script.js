var playerNum = 1;
var arrangeOrder = false;
var diceOne = "";
var diceTwo = "";
var playerOneScore = 0;
var playerTwoScore = 0;
var currentplayer = 0;

var main = function (input) {
  //Arranging the order of dice is false initially and player just roll dice
  var diceResults = 0;
  var highestCombinedNumber = 0;
  var playeraction = "";
  var currentplayer = 0;

  //if (arrangeOrder == false) {
  if (input == 0 || input == 1) {
    input = 2;
  }
  diceResults = rollTheDice(input);
  highestCombinedNumber = selectionSort(diceResults);
  combinedScoring = combinedScore(highestCombinedNumber);
  var playeraction = playerAction(diceResults, input, combinedScoring);
  currentplayer = switchPlayercalculateScore(playerNum, combinedScoring);
  var output = `Welcome Player ${currentplayer} <br> ${playeraction}. <br><br> Player 1 score is ${playerOneScore}<br> Player 2 score is ${playerTwoScore}`;

  // arrangeOrder = true;
  return output;
  // }

  // if (arrangeOrder == true) {
  //   switchPlayercalculateScore(playerNum, combinedScoring);
  //   return output;
  // }
  // //Arranging the order of dice
  // if (arrangeOrder == true) {
  //   var scoring = arrangeDice(input);
  //   var statementOne = scoring;
  //   if (!isNaN(scoring)) {
  //     switchPlayercalculateScore(playerNum, scoring);

  //     if (playerOneScore > playerTwoScore) {
  //       statementOne = `Player ${currentplayer}, You chose order ${input} first <br> Your number is ${scoring}. <br><br> Player 1 score: ${playerOneScore}<br>Player 2 score: ${playerTwoScore}<br><br>It is now Player ${playerNum}'s turn.`;
  //       return statementOne;
  //     }
  //     if (playerTwoScore > playerOneScore) {
  //       statementOne = `Player ${currentplayer}, You chose order ${input} first <br> Your number is ${scoring}. <br><br> Player 2 score: ${playerTwoScore}<br>Player 1 score: ${playerOneScore}<br><br>It is now Player ${playerNum}'s turn.`;
  //       return statementOne;
  //     }
  //   } else return statementOne;
  // }
};

//Roll the dice
var diceroll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceOutcome = randomInteger + 1;
  return diceOutcome;
};

//Output player dice results and combined number
var playerAction = function (diceResults, numberOfRolls, combinedScoring) {
  var returnStatement = `You rolled ${diceResults[0]} for Dice 1 `;
  for (i = 1; i < numberOfRolls; i++) {
    returnStatement += `and ${diceResults[i]} for Dice ${i + 1} `;
  }

  var finalStatement =
    returnStatement +
    ".<br>Choose the order of the dice. Your highest combined number is " +
    combinedScoring;

  return finalStatement;
};

// Arrange dice
// var arrangeDice = function (input) {
//   if (input == 1) {
//     console.log("read");
//     firstNum = diceOne;
//     secondNum = diceTwo;
//     arrangeOrder = false;
//   }
//   if (input == 2) {
//     firstNum = diceTwo;
//     secondNum = diceOne;
//     arrangeOrder = false;
//   }
//   if (input != 1 && input != 2) {
//     return `Please enter 1 or 2.`;
//   }
//   score = firstNum * 10 + secondNum;
//   return score;
// };

//roll the dice
var rollTheDice = function (numberOfRolls) {
  var diceResults = [];
  for (i = 0; i < numberOfRolls; i++) {
    rolldice = diceroll();
    diceResults.push(rolldice);
  }
  console.log(diceResults);

  return diceResults;
};

//Switch player and calculate score of each player
var switchPlayercalculateScore = function (number, score) {
  if (number == 1) {
    currentplayer = 1;
    playerNum = 2;
    playerOneScore += score;
  } else if (number == 2) {
    currentplayer = 2;
    playerNum = 1;
    playerTwoScore += score;
  }

  return currentplayer;
};

//Sort the score according to DESC order
var selectionSort = function (diceResults) {
  for (var i = 0; i < diceResults.length; i++) {
    //set min to the current iteration of i
    var min = i;
    for (var j = i + 1; j < diceResults.length; j++) {
      if (diceResults[j] > diceResults[min]) {
        min = j;
      }
    }
    var temp = diceResults[i];
    diceResults[i] = diceResults[min];
    diceResults[min] = temp;
  }
  return diceResults;
};

//Combined
var combinedScore = function (array) {
  var combinedScore = 0;
  var j = 0;

  for (i = array.length - 1; i >= 0; i--) {
    combinedScore += Math.pow(10, i) * array[j];
    j++;
  }

  return combinedScore;
};
