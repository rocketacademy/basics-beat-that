var main = function (input) {
  console.log(`Round is ${roundCounter}`);
  if (roundCounter == 0) {
    for (var counter = 0; counter < 2; counter += 1) {
      var roll = dice[Math.floor(Math.random() * dice.length)];
      playerRolls.push(roll);
      console.log(`${roll}`);
    }
    roundCounter += 1;
    return `Welcome Player 1.<br><br>You rolled ${playerRolls[0]} for Dice 1 and ${playerRolls[1]} for Dice 2.<br><br>Choose the order of the dice: "1" for ${playerRolls[0]}${playerRolls[1]} or "2" for ${playerRolls[1]}${playerRolls[0]}`;
  }
  if (roundCounter == 1) {
    if (input != 1 && input != 2) {
      return `Please choose "1" or "2"!`;
    }
    if (input == 1) {
      player1Choice = Number(`${playerRolls[0]}${playerRolls[1]}`);
    }
    if (input == 2) {
      player1Choice = Number(`${playerRolls[1]}${playerRolls[0]}`);
    }
    playerRolls = [];
    roundCounter += 1;
    return `Player 1 chose ${player1Choice}.<br><br>Player 2 it is your turn`;
  }
  if (roundCounter == 2) {
    for (var counter = 0; counter < 2; counter += 1) {
      var roll = dice[Math.floor(Math.random() * dice.length)];
      playerRolls.push(roll);
      console.log(`${roll}`);
    }
    roundCounter += 1;
    return `Welcome Player 2.<br><br>You rolled ${playerRolls[0]} for Dice 1 and ${playerRolls[1]} for Dice 2.<br><br>Choose the order of the dice: "1" for ${playerRolls[0]}${playerRolls[1]} or "2" for ${playerRolls[1]}${playerRolls[0]}`;
  }
  if (roundCounter % 4) {
    if (input != 1 && input != 2) {
      return `Please choose "1" or "2"!`;
    }
    if (input == 1) {
      player2Choice = Number(`${playerRolls[0]}${playerRolls[1]}`);
    }
    if (input == 2) {
      player2Choice = Number(`${playerRolls[1]}${playerRolls[0]}`);
    }
    playerRolls = [];
    roundCounter = 0;
    if (player1Choice > player2Choice) {
      player1Wins += 1;
      var outputText = joiner(player2Choice, player1Choice);
      return outputText + `<br>` + outputText;
    }
    if (player1Choice < player2Choice) {
      player2Wins += 1;
      var outputText = joiner(player2Choice, player1Choice);
      return outputText + `<br>` + outputText;
    }
    if (player1Choice == player2Choice) {
      draws += 1;
      var outputText = joiner(player2Choice, player1Choice);
      return outputText + `<br>` + outputText;
    }
  }
};

var playerRolls = [];
var player1Wins = 0;
var player2Wins = 0;
var draws = 0;
var player1Choice = "";
var player2Choice = "";
var dice = [1, 2, 3, 4, 5, 6];
var roundCounter = 0;
var joiner = function (value1, value2) {
  myOutput = `Player 2 chose ${value1}. Player 1 chose ${value2}`;
  return myOutput;
};
