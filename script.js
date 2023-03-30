var player1 = [];
var player2 = [];
var gameMode = "player 1 roll dice";
var player1Choice = 0;
var player2Choice = 0;

var main = function (input) {
  //player 1 clicks submit to roll two dice
  if (gameMode == "player 1 roll dice") {
    gameMode = "player 1 select";
    return `Player 1, ${playerDiceRoll(player1)}`;
  }

  //player 1 enters either "1" or "2" for the order of preference
  else if (gameMode == "player 1 select") {
    if (input == 1 || input == 2) {
      gameMode = "player 2 roll dice";
      player1Choice = playerSelect(input, player1);
      return `Player 1, the number you have chosen is ${player1Choice}`;
    } else return `Please input either "1" or "2".`;
  }

  //player 2 clicks submit to roll two dice
  else if (gameMode == "player 2 roll dice") {
    gameMode = "player 2 select";
    return `Player 2, ${playerDiceRoll(player2)}`;
  }
  //player 2 enters either "1" or "2" for the order of preference
  else if (gameMode == "player 2 select") {
    if (input == 1 || input == 2) {
      gameMode = "determine winner";
      player2Choice = playerSelect(input, player2);
      return `Player 2, the number you have chosen is ${player2Choice}`;
    } else return `Please input either "1" or "2".`;
  }

  //calculate whether player 1 or player 2 has the higher score and then reset the game
  else if (gameMode == "determine winner") {
    return determineWinner(player1Choice, player2Choice);
  } else
    return `Something went wrong with the program, please refresh the browser and try again.`;
};

//function to randomise a dice roll
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal) + 1;
  return randomInteger;
};

//function for player to roll the dice
var playerDiceRoll = function (playerNumber) {
  playerNumber.push(rollDice());
  playerNumber.push(rollDice());
  return `you have rolled a ${playerNumber[0]} and a ${playerNumber[1]}. Now input "1" or "2" to decide the order of your number. <br><br> I.e. If you input "1", your number will be ${playerNumber[0]}${playerNumber[1]} and if you input "2", your number will be ${playerNumber[1]}${playerNumber[0]}`;
};

//function for player to select the order of dice
var playerSelect = function (input, playerNumber) {
  {
    if (input == "1") {
      playerChoice = `${playerNumber[0]}${playerNumber[1]}`;
      return playerChoice;
    } else {
      playerChoice = `${playerNumber[1]}${playerNumber[0]}`;
      return playerChoice;
    }
  }
};

//function to determine the winner and then reset the game
var determineWinner = function (player1Choice, player2Choice) {
  if (Number(player1Choice) > Number(player2Choice)) {
    player1 = [];
    player2 = [];
    gameMode = "player 1 roll dice";
    return `Player 1's number was ${player1Choice}, Player 2's number was ${player2Choice}. <br><br><b>Player 1 wins!</b><br><br> Press "Submit" to play again!`;
  } else if (Number(player1Choice) < Number(player2Choice)) {
    player1 = [];
    player2 = [];
    gameMode = "player 1 roll dice";
    return `Player 1's number was ${player1Choice}, Player 2's number was ${player2Choice}. <br><br><b>Player 2 wins!</b><br><br> Press "Submit" to play again!`;
  } else {
    player1 = [];
    player2 = [];
    gameMode = "player 1 roll dice";
    return `Player 1's number was ${player1Choice}, Player 2's number was ${player2Choice}. <br><br><b>It's a draw!</b> <br><br>Press "Submit" to play again!`;
  }
};
//made changes in script.js -- make changes
