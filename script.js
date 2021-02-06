var myOutputValue;
var playerTurn = 'player1';
var player1Final = 0;
var player2Final = 0;
var player1DiceRoll = [];
var player2DiceRoll = [];

var rollDice = function () {
  // produces a decimal between 0 and 3
  var randomDecimal = Math.random() * 6;

  // take off the decimal
  var randomInteger = Math.floor(randomDecimal);

  var numberRolled = randomInteger + 1;
  return numberRolled;
};

var gameRound = function () {
  if (playerTurn == 'player1') {
    // logs player 1 dice rolls into array
    var p1Dice1 = rollDice().toString();
    var p1Dice2 = rollDice().toString();
    player1DiceRoll.push(p1Dice1, p1Dice2);

    console.log('player 1 has rolled: ' + player1DiceRoll);
    myOutputValue = 'Player 1 rolled ' + p1Dice1 + ' & ' + p1Dice2 + '. <br><br>Player 1 choose which dice is first, type 1 or 2.';
  } else if (playerTurn == 'player2') {
    // logs player 2 dice roll into array
    var p2Dice1 = rollDice().toString();
    var p2Dice2 = rollDice().toString();
    player2DiceRoll.push(p2Dice1, p2Dice2);

    console.log(player2DiceRoll);
    myOutputValue = 'Player 2 rolled ' + p2Dice1 + ' & ' + p2Dice2 + '. <br><br>Player 2 choose which dice is first. type 1 or 2.';
  }
};

var turnRotation = function () {
  if (playerTurn == 'player1') {
    playerTurn = 'player1ChoiceRound';
  } else if (playerTurn == 'player1ChoiceRound') {
    playerTurn = 'player2';
  } else if (playerTurn == 'player2') {
    playerTurn = 'player2ChoiceRound';
  } else if (playerTurn == 'player2ChoiceRound') {
    playerTurn = 'winningRound';
  } else if (playerTurn == 'winningRound') {
    playerTurn = 'player1';
  }
  console.log('check: ' + playerTurn);
};

var handlePlayerChoice = function (input) {
  if (playerTurn == 'player1ChoiceRound' && input == '1') {
    player1Final = player1DiceRoll[0] + player1DiceRoll[1];
    myOutputValue = 'Player 1, your current combination is ' + player1Final + '. <br><br>Player 2, click submit to roll your dice.';
  } else if (playerTurn == 'player1ChoiceRound' && input == '2') {
    player1Final = player1DiceRoll[1] + player1DiceRoll[0];
    myOutputValue = 'Player 1, your current combination is ' + player1Final + '. <br><br>Player 2, click submit to roll your dice.';
  }

  if (playerTurn == 'player2ChoiceRound' && (input - 1) == 0) {
    player2Final = player2DiceRoll[0] + player2DiceRoll[1];
    myOutputValue = 'Player 2, your current combination is ' + player2Final + '. <br><br>Player 1, click submit to roll your dice.';
  } else if (playerTurn == 'player2ChoiceRound' && (input - 1) == 1) {
    player2Final = player2DiceRoll[1] + player2DiceRoll[0];
    myOutputValue = 'Player 2, your current combination is ' + player2Final + '. <br><br>Player 1, click submit to roll your dice.';
  }
  console.log(player1Final, player2Final);
};

var main = function (input) {
  gameRound();
  handlePlayerChoice(input);
  turnRotation();

  if (playerTurn == 'winningRound' && (player1Final > player2Final)) {
    myOutputValue = 'Player 1 winning';
  } else if (player2Final > player1Final) {
    myOutputValue = 'Player 2 winning';
  }

  return myOutputValue;
};
