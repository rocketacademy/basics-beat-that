// BEAT THAT

// 1. player 1 rolls 2 dice - while loop
// diceRoll function, call twice
// declare diceRoll array = [roll1, roll2]
// 2. player 1 chooses order oF number
// 3. repeat steps 1 and 2 for player 2

//    STEPS - "state"
// a) player 1 rolls dices - "player 1 roll"
// b) player 1 selects order - "player 1 order"
// c) player 2 rolls dices - "player 2 roll"
// d) player 2 selects order - "player 2 order"
// e) final result - "results"
// then back to rolling dices

// GLOBALS
var state = "player 1 roll"; // "player 1 order", "player 2 roll", "player 2 order", "result"
// store players' rolls
var player1Rolls = [];
var player2Rolls = [];
// store players' initial and final number if change was made
var player1Number;
var player2Number;
var player1Total = 0;
var player2Total = 0;

// helper function: roll dice
var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

// helper function: a) player 1 rolls dices - "player 1 roll"
var turn1Roll = function () {
  // player 1 first
  var counter1 = 0;
  // 2 dice rolls for player 1, then store into player1Rolls array
  while (counter1 < 2) {
    player1Rolls.push(diceRoll());
    counter1 = counter1 + 1;
  }
  // return player1Rolls;
  player1Number = player1Rolls[0] * 10 + player1Rolls[1]; // eg.3 and 6 becomes 36
  return player1Number;
};

// helper function: b) player 1 selects order - "player 1 order" then change state to player 2's turn
var turn1Select = function (choice1) {
  // player 1's final number
  if (choice1 == 2) {
    // swap order of number
    player1Number = player1Rolls[1] * 10 + player1Rolls[0];

    // change state to proceed to step c)
    state = "player 2 roll";
    return player1Number;
  }
  // change state to proceed to step c)
  if (choice1 == 1) {
    state = "player 2 roll";
    return player1Number;
  }
};

// helper function: c) player 2 rolls dices - "player 2 roll"
var turn2Roll = function () {
  // player 2
  var counter2 = 0;
  // 2 dice rolls for player 1, then store into player1Rolls array
  while (counter2 < 2) {
    player2Rolls.push(diceRoll());
    counter2 = counter2 + 1;
  }
  // return player1Rolls;
  player2Number = player2Rolls[0] * 10 + player2Rolls[1]; // eg.3 and 6 becomes 36
  return player2Number;
};

// helper function: d) player 2 selects order - "player 2 order"
var turn2Select = function (choice2) {
  // player 1's final number
  if (choice2 == 2) {
    // swap order of number
    player2Number = player2Rolls[1] * 10 + player2Rolls[0];

    // change state to proceed to step c)
    state = "results";
    return player2Number;
  }
  // change state to proceed to step c)
  if (choice2 == 1) {
    state = "results";
    return player2Number;
  }
};

var main = function (input) {
  var myOutputValue = "";

  // a) player 1 rolls dices - "player 1 roll"
  if (state == "player 1 roll") {
    turn1Roll(); // returns player1Number
    myOutputValue = `Player 1, your rolls are ${player1Rolls[0]} and ${player1Rolls[1]}. Your current number is ${player1Number}. <br> 
    To select this order, key in 1, to swap the order, ie. ${player1Rolls[1]}${player1Rolls[0]},  key in 2.`;

    // change state to proceed to step b)
    state = "player 1 order";
  }

  // b) player 1 selects order - "player 1 order" then change state to player 2's turn
  else if (state == "player 1 order") {
    // validate player 1's input, must be '1' or '2'
    if (input != 1 && input != 2) {
      myOutputValue = `please key in '1' to keep the order or '2' to switch the order <br>
    Your current number is ${player1Number}`;
    } else {
      var player1 = turn1Select(input); // returns final player1Number
      myOutputValue = `Player 1's number is ${player1}`;
      player1Total = player1Total + player1;
    }
  }
  // c) player 2 rolls dices - "player 2 roll"
  else if (state == "player 2 roll") {
    turn2Roll(); // returns player2Number
    myOutputValue = `Player 2, your rolls are ${player2Rolls[0]} and ${player2Rolls[1]}. Your current number is ${player2Number}. <br> 
    To select this order, key in 1, to swap the order, ie. ${player2Rolls[1]}${player2Rolls[0]},  key in 2.`;

    // change state to proceed to step d)
    state = "player 2 order";
  }
  // d) player 2 selects order - "player 2 order" then change state to results
  else if (state == "player 2 order") {
    // validate player 2's input, must be '1' or '2'
    if (input != 1 && input != 2) {
      myOutputValue = `please key in '1' to keep the order or '2' to switch the order <br>
    Your current number is ${player2Number}`;
    } else {
      var player2 = turn2Select(input); // returns final player2Number
      myOutputValue = `Player 2's number is ${player2}`;

      player2Total = player2Total + player2;
    }
  }
  // e) final result - "results"
  else if (state == "results") {
    if (player1Number > player2Number) {
      myOutputValue =
        `Player 1: ${player1Number} <br>
      Player 2: ${player2Number} <br>
      Player 1 wins this round! <br><br>
      Player 1's total: ${player1Total}<br>
      Player 2's total: ${player2Total}<br>
      ` + compareTotal(player1Total, player2Total);
    }
    if (player2Number > player1Number) {
      myOutputValue =
        `Player 1: ${player1Number} <br>
      Player 2: ${player2Number} <br>
      Player 2 wins this round! <br><br>
      Player 1's total: ${player1Total}<br>
      Player 2's total: ${player2Total}<br>
      ` + compareTotal(player1Total, player2Total);
    }
    // back to a) player 1 roll dices, remove all prev rolls
    player1Rolls = [];
    player2Rolls = [];
    state = "player 1 roll";
  }
  return myOutputValue;
};

// 1. Keep score for each player.
// arrays to store scores for each player, create a variable, to keep track of TOTAL SCORE for each player

// 2. The score is the running sum of all numbers that player has generated so far.
// while loop OR (player1Total = player1Total + currentScore)

// 3. This means there is no permanent winner, only a temporary leader.
// Display total scores for each player by RETURNING myOutputValue
// Compare total scores of each player
// compare using IF statements
// myOutputValue = `Message to show who has the higher score`

// write logic in main function, then create the helper functions
var compareTotal = function (player1Sum, player2Sum) {
  if (player1Sum > player2Sum) {
    return "Player 1 is in the lead!";
  }
  if (player1Sum < player2Sum) {
    return "Player 2 is in the lead!";
  }
  if (player1Sum == player2Sum) {
    return "You both are in a tie!";
  }
};
