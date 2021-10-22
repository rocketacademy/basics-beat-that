// ****** How the game works ******
//
// Number of players: 2
//
// ---- Player 1 Gameplay ----
// Player 1 clicks Submit (first input == '')
// Roll 2 dice (process)
// Show the numbers rolled (output)
// Player picks which dice to go first (input == 1 || 2)
// Concatenate the numbers (process)
// Show the combined number (output)
// Change to Player 2 and repeat (process)
//
// ---- Player 2 Gameplay ----
// Player 2 clicks Submit (first input == '')
// Roll 2 dice (process)
// Show the numbers rolled (output)
// Player picks which dice to go first (input == 1 || 2)
// Concatenate the numbers (process)
// Show the combined number (output)
//
// Compare the two numbers (process)
// Show the winner with the higher combined number (output)
//
// *******************************

// ****** Global Variables ******
var gameStatus = "Waiting to roll dice";
var player = "Player 1";

var p1dice1 = 0;
var p1dice2 = 0;
var p2dice1 = 0;
var p2dice2 = 0;
var p1CombinedNumber = 0;
var p2CombinedNumber = 0;

var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

var getRolledNums = function (player) {
  var rolledNumsMessage = "";

  // For Player 1
  if (player == "Player 1") {
    p1dice1 = rollDice().toString();
    p1dice2 = rollDice().toString();
    console.log("P1 Dice 1: ", p1dice1);
    console.log("P1 Dice 2: ", p1dice2);

    rolledNumsMessage = `
      <b>${player}!</b><br><br>
      You rolled ${p1dice1} and ${p1dice2}.<br><br>
      The next step is to arrange the numbers.<br><br>
      Enter "1" to get the combined number '${p1dice1 + p1dice2}'<br>
      Enter "2" to get the combined number '${p1dice2 + p1dice1}'
      `;
    gameStatus = "Combined number created";
  }
  // For Player 2
  else {
    p2dice1 = rollDice().toString();
    p2dice2 = rollDice().toString();
    console.log("P2 Dice 1: ", p2dice1);
    console.log("P2 Dice 2: ", p2dice2);

    rolledNumsMessage = `
      <b>${player}!</b><br><br>
      You rolled ${p2dice1} and ${p2dice2}.<br><br>
      The next step is to arrange the numbers.<br><br>
      Enter "1" to get the combined number '${p2dice1 + p2dice2}'<br>
      Enter "2" to get the combined number '${p2dice2 + p2dice1}'
      `;
    gameStatus = "Combined number created";
  }
  return rolledNumsMessage;
};

var combineNumbers = function (currentPlayer, input) {
  var combinedNumsMessage = "";

  // For Player 1
  if (currentPlayer == "Player 1") {
    if (input == "1") {
      p1CombinedNumber = p1dice1 + p1dice2;
    } else {
      p1CombinedNumber = p1dice2 + p1dice1;
    }
    combinedNumsMessage = `
        <b>Player 1!</b><br><br>
        Your combined number is ${p1CombinedNumber}.<br><br>
        <hr><br>
        Player 2, it's now your turn. Hit submit to roll your two numbers.
        `;
    player = "Player 2";
    gameStatus = "Waiting to roll dice";
    return combinedNumsMessage;
  }
  // For Player 2
  else {
    if (input == "1") {
      p2CombinedNumber = p2dice1 + p2dice2;
    } else {
      p2CombinedNumber = p2dice2 + p2dice1;
    }
    combinedNumsMessage = `
        <b>Player 2!</b><br><br>
        Your combined number is ${p2CombinedNumber}. <br><br>
        <hr><br>
        `;
    player = "Player 1";
    gameStatus = "Waiting to roll dice";
    return combinedNumsMessage;
  }
};

var determineWinner = function (p1number, p2number) {
  var winner = "";
  if (p1number == p2number) {
    winner = `<b>It's a draw! What are the chances?</b>`;
  } else if (p1number > p2number) {
    winner = `<b>Player 1 wins!</b>`;
  } else {
    winner = `<b>Player 2 wins!</b>`;
  }
  return winner;
};

var main = function (input) {
  var myOutputValue = "";

  // <<<< ----- Player 1's Turn ----- >>>>
  if (player == "Player 1") {
    // Part 1: roll the dice
    if (gameStatus == "Waiting to roll dice") {
      myOutputValue = getRolledNums(player);
      return myOutputValue;
    }
    // Part 2: combine the numbers
    else {
      myOutputValue = combineNumbers(player, input);
      return myOutputValue;
    }
  }

  // <<<< ----- Player 2's Turn ----- >>>>
  if (player == "Player 2") {
    // Part 1: roll the dice
    if (gameStatus == "Waiting to roll dice") {
      myOutputValue = getRolledNums(player);
      return myOutputValue;
    }
    // Part 2: combine the numbers
    else {
      var player2nums = combineNumbers(player, input);

      // << -- Game results: compare both combined numbers -- >>
      var results = determineWinner(p1CombinedNumber, p2CombinedNumber);

      myOutputValue = `${player2nums}
        Player 1's combined number is ${p1CombinedNumber}.<br><br>
        Player 2's combined number is ${p2CombinedNumber}.<br><br>
        ${results}<br><br>
        Hit submit to play again!`;

      return myOutputValue;
    }
  }
};
