var myOutputValue;
var playerTurn = 'player1';
var player1Final = 0;
var player2Final = 0;
var diceRolls = [];

var rollDice = function () {
  // produces a decimal between 0 and 3
  var randomDecimal = Math.random() * 6;

  // take off the decimal
  var randomInteger = Math.floor(randomDecimal);

  var numberRolled = randomInteger + 1;
  return numberRolled;
};

// var gameRound = function () {
//   if (playerTurn == 'player1') {
//     var p1Dice1 = rollDice().toString();
//     var p1Dice2 = rollDice().toString();
//     player1DiceRoll.push(p1Dice1, p1Dice2);

//     console.log(player1DiceRoll);
//     myOutputValue = 'Player 1 rolled ' + p1Dice1 + ' & ' + p1Dice2 + '. It is now player 2s turn';
//   } else if (playerTurn == 'player2') {
//     var p2Dice1 = rollDice().toString();
//     var p2Dice2 = rollDice().toString();
//     player2DiceRoll.push(p2Dice1, p2Dice2);

//     myOutputValue = 'Player 2 rolled ' + p2Dice1 + ' & ' + p2Dice2 + '. it is now a new round.';
//   }
// };

var turnRotation = function () {
  console.log('turning turns');
  if (playerTurn == 'player1') {
    playerTurn = 'player2';
  } else if (playerTurn == 'player2') {
    playerTurn = 'player1';
  }
};

// var playerChoices = function (input) {
//   console.log('Running player choice method');
//   if (playerTurn == 'player1ChoiceRound') {
//     if ((input - 1) == 0) {
//       player1Final = player1DiceRoll[0] + player2DiceRoll[1];
//       console.log(player1Final);
//     }
//   }
// };
var handlePlayerChoice = function (input) {
  var finalResult;
  if ((input - 1) == 0) {
    finalResult = diceRolls[0] + diceRolls[1];
  } else {
    finalResult = diceRolls[1] + diceRolls[0];
  }
  console.log(finalResult);
  return finalResult;
};

var rollingDice = function () {
  var diceArray = [];
  var dice1 = rollDice().toString();
  var dice2 = rollDice().toString();
  diceArray.push(dice1, dice1);

  console.log('player:' + playerTurn + ' options: ' + diceArray);
  return diceArray;
};

diceRolls = rollingDice();

var main = function (input) {
  if (playerTurn == 'player1') {
    player1Final = handlePlayerChoice(input);
  } else {
    player2Final = handlePlayerChoice(input);
  }
  turnRotation();
  diceRolls = rollingDice();

  if (player1Final > player2Final) {
    myOutputValue = 'Player 1 winning';
  } else {
    myOutputValue = 'Player 2 winning';
  }

  console.log('who is playing ', playerTurn);
  console.log('Player 1 result ', player1Final);
  console.log('Player 2 result ', player2Final);
  return myOutputValue;
};
