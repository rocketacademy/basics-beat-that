var numOfPlayers = 3;
var player = [3, 2, 1];
var playerInputMessage = `please input "1" or "2" for the order of the dice`;
var playerNumbers = [];
var outputValue = "";
var gameMode = "starting";
var rng = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal) + 1;
  return randomInteger;
};
var diceRoll1 = rng();
var diceRoll2 = rng();

var main = function (input) {
  if (gameMode == "starting") {
    switch (numOfPlayers) {
      case 3:
        numOfPlayers = numOfPlayers - 1;
        outputValue = `player 1 dice roll one is ${diceRoll1} and dice roll two is ${diceRoll2}, ${playerInputMessage} `;
        gameMode = "input 1 or 2";
        return outputValue;
      case 2:
        diceRoll1 = rng();
        diceRoll2 = rng();
        numOfPlayers = numOfPlayers - 1;
        outputValue = `player 2 dice roll one is ${diceRoll1} and dice roll two is ${diceRoll2}, ${playerInputMessage} `;
        gameMode = "input 1 or 2";
        return outputValue;
      case 1:
        diceRoll1 = rng();
        diceRoll2 = rng();
        numOfPlayers = numOfPlayers - 1;
        outputValue = `player 3 dice roll one is ${diceRoll1} and dice roll two is ${diceRoll2}, ${playerInputMessage} `;
        gameMode = "input 1 or 2";
        return outputValue;
      case 0:
        var maxValue = Math.max(...playerNumbers);
        var maxIndex = playerNumbers.indexOf(
          String(Math.max(...playerNumbers))
        );
        console.log(maxIndex);
        var playingPlayer = [3, 2, 1];
        console.log(playingPlayer);
        console.log(playerNumbers);
        var winningPlayer = playingPlayer[maxIndex];
        outputValue = `The winning number is ${maxValue} by ${winningPlayer}`;
        return outputValue;
    }
  }
  if (gameMode == "input 1 or 2") {
    if (input == 1) {
      var numberArray = player;
      var players = Math.min(...numberArray);
      outputValue = `player ${players} number is ${diceRoll1}${diceRoll2}`;
      var newNumber1 = `${diceRoll1}${diceRoll2}`;
      playerNumbers.push(newNumber1);
      numberArray.pop();
      console.log(newNumber1);
      gameMode = "starting";
      return outputValue;
    } else if (input == 2) {
      var numberArray = player;
      var players = Math.min(...numberArray);
      outputValue = `player ${players} number is ${diceRoll2}${diceRoll1}`;
      var newNumber2 = `${diceRoll2}${diceRoll1}`;
      playerNumbers.push(newNumber2);
      numberArray.pop();
      console.log(newNumber2);
      gameMode = "starting";
      return outputValue;
    } else outputValue = `${playerInputMessage}`;
    return outputValue;
  }
};
