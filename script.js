var main = function (input) {
  console.log(`Round is ${roundCounter}`);
  if (roundCounter == `player1Rolls`) {
    for (var counter = 0; counter < 2; counter += 1) {
      var roll = dice[Math.floor(Math.random() * dice.length)];
      playerRolls.push(roll);
      console.log(`${roll}`);
    }
    roundCounter = `player1Chooses`;
    var rollText =
      `Welcome Player 1<br><br>` + rollSentence(playerRolls[0], playerRolls[1]);
    // doesn't work: return `Welcome Player 1.<br><br>${rollSentence}`;
    // doesn't work: var rollSentence = rollSentence (playerRolls[0], playerRolls[1])
    // doesn't work: return `Welcome Player 1.<br><br>` + rollSentence;
    return rollText;
  }
  if (roundCounter == `player1Chooses`) {
    if (input != 1 && input != 2) {
      var errorText =
        rollSentence(playerRolls[0], playerRolls[1]) +
        `<br><br>Please choose "1" or "2"!`;
      return errorText;
    }
    if (input == 1) {
      player1Choice = Number(`${playerRolls[0]}${playerRolls[1]}`);
    }
    if (input == 2) {
      player1Choice = Number(`${playerRolls[1]}${playerRolls[0]}`);
    }
    playerRolls = [];
    roundCounter = `player2Rolls`;
    return `Player 1 chose ${player1Choice}.<br><br>Player 2 it is your turn`;
  }
  if (roundCounter == `player2Rolls`) {
    for (var counter = 0; counter < 2; counter += 1) {
      var roll = dice[Math.floor(Math.random() * dice.length)];
      playerRolls.push(roll);
      console.log(`${roll}`);
    }
    roundCounter = `player2Chooses`;
    var rollText =
      `Welcome Player 2<br><br>` + rollSentence(playerRolls[0], playerRolls[1]);
    // doesn't work: return `Welcome Player 1.<br><br>${rollSentence}`;
    // doesn't work: var rollSentence = rollSentence (playerRolls[0], playerRolls[1])
    // doesn't work: return `Welcome Player 1.<br><br>` + rollSentence;
    return rollText;
  }
  if (roundCounter == `player2Chooses`) {
    if (input != 1 && input != 2) {
      var errorText =
        rollSentence(playerRolls[0], playerRolls[1]) +
        `<br><br>Please choose "1" or "2"!`;
      return errorText;
    }
    if (input == 1) {
      player2Choice = Number(`${playerRolls[0]}${playerRolls[1]}`);
    }
    if (input == 2) {
      player2Choice = Number(`${playerRolls[1]}${playerRolls[0]}`);
    }
    playerRolls = [];
    roundCounter = `player1Rolls`;
    if (player1Choice > player2Choice) {
      player1Wins += 1;
      var outputText =
        choiceSentence(player2Choice, player1Choice) +
        `<br><br>` +
        scoreSentence(player1Wins, player2Wins, draws);
      return outputText;
    }
    if (player1Choice < player2Choice) {
      player2Wins += 1;
      var outputText =
        choiceSentence(player2Choice, player1Choice) +
        `<br><br>` +
        scoreSentence(player1Wins, player2Wins, draws);
      return outputText;
    }
    if (player1Choice == player2Choice) {
      draws += 1;
      var outputText =
        choiceSentence(player2Choice, player1Choice) +
        `<br><br>` +
        scoreSentence(player1Wins, player2Wins, draws);
      return outputText;
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
var roundCounter = `player1Rolls`;
var choiceSentence = function (value1, value2) {
  myOutputValue = `Player 2 chose ${value1}. Player 1 chose ${value2}`;
  return myOutputValue;
};
var scoreSentence = function (value1, value2, value3) {
  myOutputValue = `Player 1 wins = ${value1}<br>Player 2 wins = ${value2}<br>Draws = ${value3}`;
  return myOutputValue;
};
var rollSentence = function (value1, value2) {
  myOutputValue = `You rolled ${value1} for Dice 1 and ${value2} for Dice 2.<br><br>Choose the order of the dice: "1" for ${value1}${value2} or "2" for ${value2}${value1}`;
  return myOutputValue;
};
