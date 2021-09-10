/* BASE
Player 1 rolls dice
Show diceroll
PLayer 1 choose order
Repeat for Player 2
Compare
Return Winner
Reset to roll dice mode
*/

var gameMode_DiceRoll = "gameMode_DiceRoll";
var gameMode_ChooseDiceOrder = "gameMode_ChooseDiceOrder";
var gameMode_CompareResults = "gameMode_CompareResults";
var gameMode_ReversetoLowest = "gameMode_ReversetoLowest"

// Game starts
var gameMode = gameMode_DiceRoll;
var currPlayer = 1;
var Player1 = "P1";
var Player2 = "P2";
// Create array to track player dice rolls
var p1DiceArray = [];
var p2DiceArray = [];

var p1lowest;
var p2lowest;

// Keep track of each player's chosen numbers
var p1Number = "";
var p1Score = 0;
var p2Number = "";
var p2Score = 0;

//Functions
// Roll dice function: generate random number from 1 to 6
var getDiceRoll = function () {
  return Math.ceil(Math.random() * 6);
};

//Concatenate function: Return a number that is the concatenation of num1 and num2
var concatenate2Numbers = function (num1, num2) {
  return Number(String(num1) + String(num2));
};

//Compare function: Determine larger number as winner
var getWinner = function (){
  console.log("p1Number: " + p1Number);
  console.log("p2Number: " + p2Number);
  if (p1Number >= p2Number){
    var winner = "Player 1";
  } else {
    winner = "Player 2";
  }
  return winner;
  }; 

// Compare reverse-to-lowest function: Determine lower number as winner
var getLowestWinner = function (){
  if (p1Number <= p2Number){
    var winner = "Player 1";
  } else {
    winner = "Player 2";
  }
  return winner;
  };  

// Leaderboard function
var displayLeaderboard = function () {
  if (p1Score >= p2Score) {
    return (
      "Leaderboard: <br> Player 1 Score: " +
      p1Score +
      "<br> Player 2 Score: " +
      p2Score
    );
  } else {
    return (
      "Leaderboard: <br> Player 2 Score: " +
      p2Score +
      "<br> Player 1 Score: " +
      p1Score
    );
  }
};

var main = function (input) {
  if (gameMode == gameMode_DiceRoll) {
    if (currPlayer == 1) {
      p1DiceArray.push(getDiceRoll());
      console.log("P1 D1: " + p1DiceArray[0]);
      p1DiceArray.push(getDiceRoll());
      console.log("P1 D2: " + p1DiceArray[1]);
      gameMode = gameMode_ChooseDiceOrder;
      return (
        `Hi Player ${currPlayer}, your results are: <br> Roll 1: ${
        p1DiceArray[0]}
        <br> Roll 2: ${
        p1DiceArray[1] }
        <br><br> Please key in '1' if you want Dice Roll 1 to as first digit or '2' if you want Dice Roll 2 as first digit.`
      );
    }
    if (currPlayer == 2) {
      p2DiceArray.push(getDiceRoll());
      console.log("P2 D1: " + p2DiceArray[0]);
      p2DiceArray.push(getDiceRoll());
      console.log("P2 D2: " + p2DiceArray[1]);
      gameMode = gameMode_ChooseDiceOrder;
      return (
        `Hi Player ${currPlayer}, your results are: <br> Roll 1: ${
          p2DiceArray[0]}
          <br> Roll 2: ${
          p2DiceArray[1] }
          <br> Please key in '1' if you want Dice Roll 1 to as first digit or '2' if you want Dice Roll 2 as first digit.`
        );
    }
  }

  if (gameMode == gameMode_ChooseDiceOrder) {
    if (input == "1") {
      if (currPlayer == 1) {
        p1Number = concatenate2Numbers(p1DiceArray[0], p1DiceArray[1]);
      }
      if (currPlayer == 2) {
        p2Number = concatenate2Numbers(p2DiceArray[0], p2DiceArray[1]);
      }
    } else if (input == "2") {
      if (currPlayer == 1) {
        p1Number = concatenate2Numbers(p1DiceArray[1], p1DiceArray[0]);
      }
      if (currPlayer == 2) {
        p2Number = concatenate2Numbers(p2DiceArray[1], p2DiceArray[0]);
      }
    }

    if (currPlayer == 2) {
      gameMode = gameMode_CompareResults;
      myOutputValue =
        `Your chosen number is ${p2Number} <br> Click Submit to find out which Player won!`;
    }

    if (currPlayer == 1) {
      gameMode = gameMode_DiceRoll;
      console.log("changing currPlayer to 2");
      currPlayer = 2;

      myOutputValue =
        "Your chosen number is " +
        p1Number +
        ". Player 2 click Submit to roll your dice";
      }
  }

  if (gameMode == gameMode_CompareResults) {
    var winner = getWinner();
    gameMode = gameMode_DiceRoll;
    currPlayer = 1;
    p1DiceArray = [];
    p2DiceArray = [];

    p1Score = p1Score + p1Number;

    p2Score = p2Score + p2Number;

    console.log("p2Score is:");
    console.log(p2Score);
    myOutputValue =
      "Player 1's number is: " +
      p1Number +
      "<br> Player 2's number is: " +
      p2Number +
      "<br> The player who chose the larger number is " +
      winner + `<br> <p> CONGRATULATIONS! <p> Click Submit to restart the game from Player 1. <br> <p> ${displayLeaderboard()}`;
  }

  return myOutputValue;
}