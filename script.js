var GameRollDice = 'GameRollDice';
var GameChooseDice = 'GameChooseDice';
var GameRollDiceTwo = 'GameRollDiceTwo'
var GameChooseDiceTwo = 'GameChooseDiceTwo';
var GameCompare = 'GameCompare'
var GameState = GameRollDice;
var playerOne
var playerTwo


var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var resultInteger = Math.floor(randomDecimal);
  var diceNumber = resultInteger + 1;
  return diceNumber
}
var DiceRolled = [];
var DiceRolledTwo = [];

var main = function (input) {
  var myOutPutValue
  if (GameState == GameRollDice) {
    DiceRolled.push(rollDice());
    DiceRolled.push(rollDice());
    myOutPutValue = 'Player One Rolled  ' + DiceRolled[0] + ' And ' + DiceRolled[1] + ' .' + 'Please Choose how you want to STRING the number together!'
    GameState = GameChooseDice;
    return myOutPutValue;
  }

  if (GameState == GameChooseDice) {
    if (!(input == 1 || input == 2)) {
      myOutPutValue = 'Please Enter Either 1 or 2 ';
      return myOutPutValue
    }
    if (input == 1) {
      playerOne = String(DiceRolled[0]) + String(DiceRolled[1]);
      console.log(playerOne);
    }
    if (input == 2) {
      playerOne = String(DiceRolled[1]) + String(DiceRolled[0]);
      console.log(playerOne);
    }
    myOutPutValue = 'Your Number is ' + playerOne + ' !!! '
    GameState = GameRollDiceTwo;
    return myOutPutValue;
  }

  if (GameState == GameRollDiceTwo) {
    DiceRolledTwo.push(rollDice());
    DiceRolledTwo.push(rollDice());
    myOutPutValue = 'Player Two Rolled  ' + DiceRolledTwo[0] + ' And ' + DiceRolledTwo[1] + ' .' + 'Please Choose how you want to STRING the number together!'
    GameState = GameChooseDiceTwo;
    return myOutPutValue;
  }

  if (GameState == GameChooseDiceTwo) {
    if (!(input == 1 || input == 2)) {
      myOutPutValue = 'Please Enter Either 1 or 2 ';
      return myOutPutValue
    }
    if (input == 1) {
      playerTwo = String(DiceRolledTwo[0]) + String(DiceRolledTwo[1]);
      console.log(playerTwo);
    }
    if (input == 2) {
      playerTwo = String(DiceRolledTwo[1]) + String(DiceRolledTwo[0]);
      console.log(playerTwo);
    }
    myOutPutValue = 'Your Number is ' + playerTwo + ' !!! '
    GameState = GameCompare
    return myOutPutValue;
  }
  if (GameState == GameCompare) {
    if (playerOne - playerTwo > 0) {
      myOutPutValue = 'PlayerOne Won ! '
    }
    if (playerOne - playerTwo < 0) {
      myOutPutValue = 'PlayerTwo Won ! '

    }

    return myOutPutValue;
  }
}