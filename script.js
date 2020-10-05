var currentGameMode = 1;
var combinedNumb1 = '';
var combinedNumb2 = '';
var winner = '';


var main = function (input) {
  var dice1 = diceRoll();
  var dice2 = diceRoll();
  var dice3 = diceRoll();
  var dice4 = diceRoll();
  if (input == 'roll') {
    currentGameMode == 1;
    console.log('dice1', dice1, 'dice2', dice2);
    if (dice1 > dice2 || dice1 == dice2) {
      var combinedNumb1 = Number(dice1 * 10 + dice2);
    }
    else (combinedNumb1 = Number(dice2 * 10 + dice1));
    console.log('player1' + combinedNumb1)
    return `Dice 1: ${dice1} and Dice 2: ${dice2} and player 1's combo is ${combinedNumb1}`
  }
  if (input = 'switch') {
    console.log('dice3', dice3, 'dice4', dice4);
    currentGameMode == 2;
    if (dice3 > dice4 || dice3 == dice4) {
      var combinedNumb2 = Number(dice3 * 10 + dice4);
    }
    else (combinedNumb2 = Number(dice4 * 10 + dice3));
    console.log('player2' + combinedNumb2)
  }
  if (combinedNumb1 > combinedNumb2) {
    winner = 'player 1'
  }
  if (combinedNumb2 > combinedNumb1) {
    winner = 'player 2'
  }
  if (combinedNumb2 == combinedNumb1) {
    winner = 'none'
  }
  return `Dice 3: ${dice3} and Dice 4: ${dice4}, player 2's combo is ${combinedNumb2} and the winner is ${winner}`
}

diceRoll = function () {
  var randInterger = Math.floor(Math.random() * 6) + 1;
  console.log(randInterger);
  return randInterger;
}
