var currentGameMode = "Waiting for next player";
var playerScores = [];
var round = 0;
var maxNum = 0;
var noOfRounds = 3;
var diceRoll1 = 0;
var diceRoll2 = 0;
var scoreBoard = [];

var diceRoll = function () {
  var randomNum = Math.random() * 6;
  var randomInt = Math.floor(randomNum) + 1;

  return randomInt;
};

var concatNum = function (num1, num2, input) {
  var num = 0;
  if (input == 1) {
    num = parseInt(String(num1) + String(num2));
  }

  if (input == 2) {
    num = parseInt(String(num2) + String(num1));
  }

  return num;
};

var findSortedArray = function (arr) {
  var originalIndexVal = [];

  for (var i = 0; i < arr.length; i++) {
    originalIndexVal.push({ player: i, score: arr[i] });
  }

  var sortedArray = originalIndexVal.sort(function (a, b) {
    return b.score - a.score;
  });

  return sortedArray;
};

var main = function (input) {
  var myOutputValue = "Press 'Submit' to start rolling the dice!";

  while (round < noOfRounds) {
    console.log(round);
    if (currentGameMode == "Waiting for next player") {
      if (input != "") {
        myOutputValue = `Press submit to roll the dice!`;
      } else {
        diceRoll1 = diceRoll();
        diceRoll2 = diceRoll();

        myOutputValue = `👯‍♀️Welcome Player${round + 1}👯‍♀️! <br> 
        You rolled ${diceRoll1} for Dice 1 and ${diceRoll2} for Dice 2. <br> Please choose the order of the dice submitting either 1 or 2`;
        currentGameMode = "Playing";
      }
    } else if (currentGameMode == "Playing") {
      var finalVal = 0;

      input = parseInt(input);

      if (input != 1 || input != 2) {
        myOutputValue = `Valid options are only 1 and 2 🤦🏻`;
      }

      if (input == 1 || input == 2) {
        finalVal = concatNum(diceRoll1, diceRoll2, input);
        myOutputValue = `Player ${
          round + 1
        }, you chose Dice ${input} first. <br> Your number is ${finalVal} <br> It is now Player ${
          round + 2
        }'s turn`;
        round = round + 1;
        currentGameMode = "Waiting for next player";
        playerScores.push(finalVal);

        if (round == noOfRounds) {
          scoreBoard = findSortedArray(playerScores);
          maxNum = scoreBoard[0]["player"];
          myOutputValue = `Player ${round}, you chose Dice ${input} first. <br> Your number is ${finalVal} <br> <br><hr> <br> 
          This is the end of the game.<br> 
          <b>The top 2 winners are: <b> <br>
          <table>
          <tbody>
          <tr><td><b>Player<b></td><td><b>Score<b></td></tr>
          <tr><td>Player ${scoreBoard[0]["player"] + 1}</td><td>${
            scoreBoard[0]["score"]
          }</td></tr>
          <tr><td> Player ${scoreBoard[1]["player"] + 1}</td><td>${
            scoreBoard[1]["score"]
          }</td></tr>
          </tbody>
          </table>
          <br> Press 'Submit' to play again! <br>`;
          round = round + 1;
        }
      }
    }
    return myOutputValue;
  }

  round = 0;
  playerScores = [];
  return myOutputValue;
};

/*
var findMaxNum = function (arr) {
  if (arr.length === 0) {
    return "there is an issue";
  }

  var max = arr[0];
  var maxIndex = 0;

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i;
      max = arr[i];
    }
  }
  return maxIndex;
};

<br>The winner is <b> Player ${maxNum + 1}<b>
/maxNum = findMaxNum(playerScores);

*/
