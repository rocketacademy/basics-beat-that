var die1;
var die2;
var player1Results;
var player2Results;
var player = 1;
var mode = "dice roll";

var main = function (input) {
  var outputMessage;
  while (player == 1) {
    if (mode == "dice roll") {
      var diceResult = roll2Dice();
      mode = "choose dice order";
      outputMessage = `Welcome Player 1. <br>
     ${diceResult} <br>Choose the order of the dice`;
    } else if (mode == "choose dice order") {
      var concatDiceResult;
      if (Number(input) == 1) {
        concatDiceResult = `${die1}`.concat(`${die2}`);
      } else if (Number(input) == 2) {
        concatDiceResult = `${die2}`.concat(`${die1}`);
      }
      player1Results = concatDiceResult;
      player = 2;
      mode = "dice roll";
      outputMessage = `Player 1, you chose Dice ${input} first. <br>Your number is ${player1Results}. <br>It is now Player 2's turn.`;
    }
    return outputMessage;
  }
  while (player == 2) {
    if (mode == "dice roll") {
      var diceResult = roll2Dice();
      mode = "choose dice order";
      outputMessage = `Welcome Player 2. <br>
     ${diceResult} <br>Choose the order of the dice.`;
    } else if (mode == "choose dice order") {
      var concatDiceResult;
      if (Number(input) == 1) {
        concatDiceResult = `${die1}`.concat(`${die2}`);
      } else if (Number(input) == 2) {
        concatDiceResult = `${die2}`.concat(`${die1}`);
      }
      player2Results = concatDiceResult;

      mode = "dice roll";
      if (player2Results > player1Results) {
        var winnerIs = "Player 2 wins!";
      } else if (player2Results < player1Results) {
        winnerIs = "Player 1 wins!";
      } else if (player2Results == player1Results) {
        WinnerIs = "It's a draw!";
      }
      outputMessage = `Player 2, you chose Dice ${input} first. <br>Your number is ${player2Results}. <br>${winnerIs}`;
    }
    return outputMessage;
  }
};

// var main = function (input) {
//   console.log("top" + playersResultingNumbers);

//   // Mode : dice roll

//   if (mode == "dice roll") {
//     var diceResult = roll2Dice();

//     if (playerNumber == 1) {
//       var diceRollMessage = `Welcome Player 1. <br>
//      ${diceResult} <br>Choose the order of the dice.`;
//       mode = "choose dice order";
//     } else if (playerNumber == 2) {
//       diceRollMessage = `Welcome Player 2. <br>
//      ${diceResult} <br>Choose the order of the dice.`;
//       mode = "choose dice order player 2";
//     }
//     return diceRollMessage;
//   }

//   // Mode : choose dice order
//   else if (mode == "choose dice order player 1") {
//     var concatDiceResult;
//     if (Number(input) == 1) {
//       concatDiceResult = `${die1}`.concat(`${die2}`);
//     } else if (Number(input) == 2) {
//       concatDiceResult = `${die2}`.concat(`${die1}`);
//     }
//     playersResultingNumbers.push(Number(concatDiceResult));
//     mode = "dice roll";
//     var diceOrderMessage = `Player ${playerNumber}, you chose Dice ${input} first. <br>Your number is ${concatDiceResult}. <br>It is now Player ${
//       playerNumber + 1
//     }'s turn.`;
//     playerNumber = playerNumber + 1;
//     return diceOrderMessage;
//   }

//   if (mode == "player2 dice roll") {
//   }
//   var myOutputValue = diceOutput;
//   return myOutputValue;
// };

// roll both dice
function roll2Dice() {
  die1 = rollDie();
  die2 = rollDie();
  var diceOutput = `You rolled ${die1} for Dice One and ${die2} for Dice Two.`;
  return diceOutput;
}

// die rolling function setup
function getRandomInteger(max) {
  var randomDecimal = Math.random();
  var randomInteger = Math.floor(randomDecimal * max);
  return randomInteger;
}

function rollDie() {
  var randomDieFace = getRandomInteger(6) + 1;
  return randomDieFace;
}
