//BASIC BEAT THAT
// 2 players
// Player rolls 2 dice and see's 2 options.
// Player selects 1 out of 2 options for 1st & 2nd order
// Game registers Player 1's selection & calls of player 2 to roll & select
// Game then shows winner, some stats, triggers next round, etc

//[HF] Dice Roll
var diceRoll = function () {
  var randomNumber = Math.random() * 6;
  var randomInteger = Math.floor(randomNumber);
  var integerNotZero = randomInteger + 1;
  return integerNotZero;
};
//[HF] Result comparison
var finalResult = function () {
  var playerChoices = `${player1} you chose ${
    p1choice[p1choice.length - 1]
  } <br> ${player2} you chose ${p2choice[p2choice.length - 1]}`;
  // Both Draw
  if (p1choice[p1choice.length - 1] == p2choice[p2choice.length - 1]) {
    displayMsg = `ITS A DRAW! <br> ${playerChoices}`;
  }
  // P1 Wins
  if (p1choice[p1choice.length - 1] > p2choice[p2choice.length - 1]) {
    displayMsg = `${player1} WINS! <br> ${playerChoices} <br> click submit to play again!`;
  }
  // P2 Wins
  if (p1choice[p1choice.length - 1] < p2choice[p2choice.length - 1]) {
    displayMsg = `${player2} WINS! <br> ${playerChoices} <br> click submit to play again!`;
  }
  return displayMsg;
};

//[HF]

//Global Variables
var player1 = "";
var player2 = "";
var gameMode = "P1 name";
var p1options = [];
var p2options = [];
var p1choice = [];
var p2choice = [];

function main(input) {
  // When mode : waiting for player 1 name,  player 1 does not enter name
  if (gameMode == "P1 name" && input == "") {
    return "Player 1 please enter your name leh.";
  }
  // When player 1 enters name. Mode changes to : Prompt player 2 to enter name
  if (input == input && gameMode == "P1 name") {
    gameMode = "P2 name";
    console.log("should be P2");
    console.log(gameMode);
    player1 = input;
    return `Welcome ${player1}. Player 2 please enter your name.`;
  }
  // When player 2 enters a blank/or clicks submit by accident
  if (gameMode == "P2 name" && input == "") {
    console.log("should still be P2");
    console.log(gameMode);
    return "Player 2 please enter your name leh.";
  }
  // When player 2 enters name, game is prepared to start & instruct player 1 to roll
  if (gameMode == "P2 name" && input == input) {
    gameMode = "gameStart";
    console.log("should be Game Start");
    console.log(gameMode);
    player2 = input;
    return `Welcome ${player2}. Let the beating begin! <br> ${player1} kindly click the button to roll your dice! `;
  }
  // When player 1 enters input when not supposed to
  if (gameMode == "gameStart" && input !== "") {
    return `${player1} please click the "submit" button to roll your dice la.`;
  }
  // Display player 1's roll & allow player 1 to choose order
  if (gameMode == "gameStart") {
    var rollOne = diceRoll();
    var rollTwo = diceRoll();
    var p1option1 = rollOne.toString() + rollTwo.toString();
    p1options.push(p1option1);
    var p1option2 = rollTwo.toString() + rollOne.toString();
    p1options.push(p1option2);
    gameMode = "P1 rolled";
    console.log("should be P1 Rolled");
    console.log(gameMode);
    return `${player1} you have rolled... <br> First Dice : ${rollOne} <br> Second Dice : ${rollTwo} <br> Kindly input your choice ('1' OR '2') above to play against ${player2} : <br> 1 = ${
      p1options[p1options.length - 2]
    } <br> 2 = ${p1options[p1options.length - 1]}`;
  }
  // If player 1 input Not '1' or '2' display error message (works)
  if (gameMode == "P1 rolled") {
    if (input !== "1" && input !== "2") {
      console.log("stuck");
      console.log(gameMode);
      return `${player1}... you have entered and invalid option la <br> Kindly input your choice ('1' OR '2') above to play against ${player2} : <br> 1 = ${
        p1options[p1options.length - 2]
      } <br> 2 = ${p1options[p1options.length - 1]}`;
    }
    // If player 1 input option '1' or '2', store option and get player 2 to roll (works)
    if (input == "1") {
      p1choice.push(p1options[p1options.length - 2]);
      gameMode = "P2's roll";
      console.log("chose 1, should be P2 turn");
      console.log(gameMode);
      return `${player1} you chose ${
        p1choice[p1choice.length - 1]
      }. <br> ${player2} its now your turn to roll the dice!`;
    }
    if (input == "2") {
      p1choice.push(p1options[p1options.length - 1]);
      gameMode = "P2's roll";
      console.log("chose 2, should be P2 turn");
      console.log(gameMode);
      return `${player1} you chose ${
        p1choice[p1choice.length - 1]
      }. <br> ${player2} its now your turn to roll the dice!`;
    }
  }
  // When P2 supposed to roll dice but accidentally types something (works)
  if (gameMode == "P2's roll") {
    if (input !== "") {
      console.log("should be P2 turn but cui");
      console.log(gameMode);
      return `${player2} please click the "submit" button to roll your dice.`;
    }
    if (input == "") {
      var rollOne = diceRoll();
      var rollTwo = diceRoll();
      var p2option1 = rollOne.toString() + rollTwo.toString();
      p2options.push(p2option1);
      var p2option2 = rollTwo.toString() + rollOne.toString();
      p2options.push(p2option2);
      gameMode = "P2 rolled";
      console.log("should be P2 Rolled");
      console.log(gameMode);
      return `${player2} you have rolled... <br> First Dice : ${rollOne} <br> Second Dice : ${rollTwo} <br> Kindly input your choice ('1' OR '2') above to play against ${player1} : <br> 1 = ${
        p2options[p2options.length - 2]
      } <br> 2 = ${p2options[p2options.length - 1]}`;
    }
  }

  if (gameMode == "P2 rolled") {
    // If player 2 input Not '1' or '2' display error message (works)
    if (input !== "1" && input !== "2") {
      console.log("stuck");
      console.log(gameMode);
      return `${player2}... you have entered and invalid option la <br> Kindly input your choice ('1' OR '2') above to play against ${player2} : <br> 1 = ${
        p2options[p2options.length - 2]
      } <br> 2 = ${p2options[p2options.length - 1]}`;
    }
    // If player 1 input option '1' or '2', store option and get player 2 to roll (works)
    if (input == "1") {
      p2choice.push(p2options[p2options.length - 2]);
      gameMode = "results";
      console.log("chose 1, should be P2 turn");
      console.log(gameMode);
      return `${player2} you chose ${
        p2choice[p2choice.length - 1]
      }. <br> Click Submit to see who won!`;
    }
    if (input == "2") {
      p2choice.push(p2options[p2options.length - 1]);
      gameMode = "results";
      console.log("chose 2, should be P2 turn");
      console.log(gameMode);
      return `${player2} you chose ${
        p2choice[p2choice.length - 1]
      }. <br> Click Submit to see who won!`;
    }
  }
  // Results
  if (gameMode == "results") {
    var gameResults = finalResult();
    gameMode = "playAgain";
    return gameResults;
  }
  // play another round
  if (gameMode == "playAgain" && input == "") {
    gameMode = "gameStart";
    return `Lets go for another round! ${player1} your turn to roll the dice!`;
  }
}
