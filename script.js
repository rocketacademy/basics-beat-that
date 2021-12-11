//set global variables
var playerNumber = 2
var gameMode = "roll"
var roundCounter = 0
var dice1 = ''
var dice2 = ''
var player1score = ''
var player2score = ''


var main = function (input) {
  if (roundCounter == 2) {
    gameMode = "end round"
  }

  if (gameMode == "roll") {
    //store new values into global dice variables
    dice1 = diceRoll();
    dice2 = diceRoll();
    console.log(dice1, dice2);
    
    //change the number of the player for the new round
    if (playerNumber == 1){
      playerNumber = 2;
    } else if (playerNumber == 2) {
      playerNumber = 1;
    } 

    //output the value of the 2 dices and prompt player to select which dice
    var outputValue = `Welcome Player ${playerNumber}. <br>You rolled ${dice1} for Dice 1 and ${dice2} for Dice 2. <br>Choose the order of the dice.`
    gameMode = "choose";
    return outputValue;

  } else if (gameMode == "choose") {
    var diceChoice = input;
    var oppositePlayer = 3 - playerNumber;

    //take the input and return the dice value accordingly
    if (diceChoice == 1) {
      var outputValue = `Player ${playerNumber}, you chose Dice ${diceChoice} first. <br>Your number is ${dice1}${dice2}. <br>It is now Player ${oppositePlayer}'s turn.`
      //store player score in global variable
      if (playerNumber == 1) {
        var diceString = dice1+dice2
        player1score = parseInt(diceString)
        console.log(player1score)
      } else if (playerNumber == 2) {
        var diceString = dice1+dice2
        player2score = parseInt(diceString)
        console.log(player2score)
      }
      gameMode = "roll";
      roundCounter = roundCounter+1
      return outputValue;

    } else if (diceChoice == 2) {
      var outputValue = `Player ${playerNumber}, you chose Dice ${diceChoice} first. <br>Your number is ${dice2}${dice1}. <br>It is now Player ${oppositePlayer}'s turn.`
      
      //store player score in global variable
      if (playerNumber == 1) {
        var diceString = dice2+dice1
        player1score = parseInt(diceString)
        console.log(player1score)
      } else if (playerNumber == 2) {
        var diceString = dice2+dice1
        player2score = parseInt(diceString)
        console.log(player2score)
      }
      gameMode = "roll";
      roundCounter = roundCounter+1
      return outputValue;
    } else {
      return `Please input 1 or 2 :) <br>You rolled ${dice1} for Dice 1 and ${dice2} for Dice 2.`
    }

  } else if (gameMode == "end round") { //after 2 rounds, end round mode is triggered
    if (player1score > player2score) {
      var winner = 1
    } else {
      var winner = 2
    }
    outputValue = `Player 1 has a score of ${player1score}. <br>Player 2 has a score of ${player2score}. Player ${winner} wins!`
    gameMode = "roll"
    roundCounter = 0
    return outputValue;
  }
};

//output dice as a string value so that when we can concatenate dice1 and dice2 without adding them up
var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  var diceString = diceNumber.toString();
  return diceString;
};