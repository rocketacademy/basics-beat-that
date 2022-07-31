var diceRoll1 = 0;
var diceRoll2 = 0;
var player1Score = 0;
var player2Score = 0;
var gameTurn = 'start game';
var player = 'player1'

var main = function (input) {
  var myOutputValue = '';

  if(gameTurn == 'start game') {
    diceRoll1 = 0;
    diceRoll2 = 0;
    gameTurn = player
    diceRoll1 = diceRoll();
    console.log(`diceRoll1: ${diceRoll1}`)
    diceRoll2 = diceRoll();
    console.log(`diceRoll2: ${diceRoll2}`)

    myOutputValue = `Welcome ${player}. <br>
    You rolled ${diceRoll1} for Dice 1 and ${diceRoll2} for Dice 2. <br>
    Choose the order of the dice`
    return myOutputValue;
  }

  if(gameTurn == player) {
    console.log(`player: ${player}`)
    var playerScore = '';
    if(input == 1) {
      playerScore = String(diceRoll1) + String(diceRoll2)
    } else if(input == 2) {
      playerScore = String(diceRoll2) + String(diceRoll1)
    }

    if(player == 'player1') {
      player1Score = playerScore;
    } else if(player == 'player2') {
      player2Score = playerScore;
    }

    myOutputValue = `${player}, you chose Dice ${input} first <br>
    Your number is ${playerScore}`

    if (gameTurn == 'player2') {
      gameTurn = 'end game';
      return myOutputValue;
    }
    gameTurn = 'start game'
    player = 'player2'
    return myOutputValue;
  }

  if(gameTurn == 'end game') {
    var gameOutcome = '';
    if(Number(player1Score) > Number(player2Score)) {
      gameOutcome = 'player1 win';
    } else {
      gameOutcome = 'player2 win';
    }

    myOutputValue = `player1 score ${player1Score} <br>
    player2 score ${player2Score} <br>
    ${gameOutcome}`;

  }
  return myOutputValue;
};




var diceRoll = function () {
  return Math.ceil(Math.random() * 6);
};