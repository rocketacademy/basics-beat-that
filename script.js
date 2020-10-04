var gameMode = -1;
var playerDice = [[], []];
var playerNumbers = [[], []];
var clickSubmit = ' <br><br> click submit to go to the next move...';

function rollOneDie() {
  return Math.floor(Math.random() * 6) + 1;
}

function rollTwoDie() {
  var firstDie = rollOneDie();
  var secondDie = rollOneDie();
  var resultArray = [firstDie, secondDie];
  return resultArray;
}

function callGameModeIntroduction() {
  return 'This is dice - beat that!';
}

function playerRollDice(playerNumber) {
  var rolledDice = rollTwoDie();
  playerDice[playerNumber - 1].push(rolledDice);
  return 'Player number ' + playerNumber + ' rolled Die No. 1: ' + rolledDice[0] + ' and Dice No. 2: ' + rolledDice[1] + ' ... <br><br>now it\'s time to choose which die you want to be the first digit...<b>enter either 1 or 2 before clicking submit!</b>';
}

function playerChooseNumber(playerNumber, whichDieFirst) {
  var lastSelectedDice = playerDice[playerNumber - 1][playerDice[playerNumber - 1].length - 1];
  var playerNumberArray = playerNumbers[playerNumber - 1];
  if (whichDieFirst == 1) {
    var createdNumber = String(lastSelectedDice[0]) + String(lastSelectedDice[1]);
    playerNumberArray.push(createdNumber);
    var returnStatement = 'Player ' + playerNumber + ', chose Dice 1\'s roll to be the first digit of his number! The resultant two-digit number is ' + createdNumber;
    return returnStatement;
  } if (whichDieFirst == 2) {
    var createdNumber = String(lastSelectedDice[1]) + String(lastSelectedDice[0]);
    playerNumbers[playerNumber - 1].push(String(createdNumber));
    var returnStatement = 'Player ' + playerNumber + ', you chose Dice 2 first. Your number is ' + createdNumber;
    return returnStatement;
  }
  return false;
}

function incrementGameMode() {
  gameMode += 1;
}

function getAllPlayerNumbers(playerNumber) {
  var listOfNumbers = playerNumbers[playerNumber - 1];
  return '<br> <br> Here\'s a list of numbers that player' + playerNumber + ' has chosen so far: ' + listOfNumbers;
}

function nextPlayer(currentPlayerNumber) {
  var nextPlayerNumber = (currentPlayerNumber + 1) % 2;
  if (nextPlayerNumber == 0) { nextPlayerNumber = 2; }
  return '<br><br>the next turn belongs to player number ' + nextPlayerNumber;
}

var main = function (input) {
  var myOutputValue;
  if (gameMode == -1) {
    gameMode += 1;
    myOutputValue = callGameModeIntroduction() + clickSubmit;
  } else if (gameMode % 4 == 0) {
    myOutputValue = playerRollDice(1) + clickSubmit;
    incrementGameMode();
  } else if (gameMode % 4 == 1) {
    if (playerChooseNumber(1, input) == false) {
      myOutputValue = 'invalid input!';
    } else {
      myOutputValue = playerChooseNumber(1, input) + getAllPlayerNumbers(1) + nextPlayer(1) + clickSubmit +;
      incrementGameMode();
    }
  } else if (gameMode % 4 == 2) {
    myOutputValue = playerRollDice(2) + clickSubmit;
    incrementGameMode();
  } else if (gameMode % 4 == 3) {
    if (playerChooseNumber(2, input) == false) {
      myOutputValue = 'invalid input!';
    } else {
      myOutputValue = playerChooseNumber(2, input) + getAllPlayerNumbers(2) + nextPlayer(2) + clickSubmit ;
      incrementGameMode();
    }
  }
  return myOutputValue;
};

/*
Testing:
console.log(player1RollDice());
console.log(player1RollDice());
console.log(String(player1Dice[player1Dice.length - 1][0]) + String(player1Dice[player1Dice.length - 1][1]));
*/

/* Testing

console.log(playerRollDice(1));
console.log(playerDice);
console.log(playerRollDice(1));
console.log(playerRollDice(1));
console.log(playerRollDice(2));
console.log(playerDice);
console.log(playerChooseNumber(1, 1));
console.log(playerRollDice(2));
console.log(playerRollDice(2));
console.log(playerRollDice(2));
console.log(playerRollDice(2));
console.log(playerDice);
console.log(playerChooseNumber(2, 2));
*/
