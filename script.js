//2 players take turns. when player_1 click submit, roll 2 dice
//Output shows player_1's two roll number, prompt player 1 to choose 1st or 2nd dice
//Output shows player_1's final number, prompt player_2 to click submit to roll 2 dice
//Output shows player_2's two roll numbers, prompt player 2 to choose 1st or 2nd dice
//Output shows player_2's final number, shows who win, prompt to click submit to reset the game

/*
//CODE1: this is the basic codes

var gameMode = "p1_rolldice"; //Five Modes: p1_rolldice, p1_sequence, p2_rolldice, p2_sequence, compare
var p1_dice_array = [];
var p2_dice_array = [];
var myOutputValue = "";

var rollDice = function () {
  var dice_num = Math.floor(Math.random() * 5 + 1);
  return dice_num;
};

var main = function (input) {
  if (gameMode == "p1_rolldice") {
    var p1_d1 = rollDice();
    var p1_d2 = rollDice();
    p1_dice_array.push(p1_d1);
    p1_dice_array.push(p1_d2);
    myOutputValue =
      "Welcome, Player 1 <br> You rolled " +
      p1_dice_array[0] +
      " for DICE ONE and " +
      p1_dice_array[1] +
      " for DICE TWO. <br> Choose the order of the dice by entering 1 or 2.";
    console.log(
      "p1 numbers:",
      p1_dice_array[0],
      p1_dice_array[1],
      p1_d1,
      p1_d2
    );
    gameMode = "p1_sequence";
    return myOutputValue;
  }
  if (gameMode == "p1_sequence") {
    if (input == "1") {
      p1_total = p1_dice_array[0] * 10 + p1_dice_array[1]; // or Number(String(p1_dice_array[0])+String(p1_dice_array[1])))
      myOutputValue =
        "You chose DICE ONE. Your number is " +
        p1_total +
        ".<br> It is now Player 2's turn.";
      gameMode = "p2_rolldice";
    }
    if (input == "2") {
      p1_total = p1_dice_array[1] * 10 + p1_dice_array[0];
      myOutputValue =
        "You chose DICE TWO. Your number is " +
        p1_total +
        ".<br> It is now Player 2's turn.";
      gameMode = "p2_rolldice";
    }
    return myOutputValue;
  }
  if (gameMode == "p2_rolldice") {
    var p2_d1 = rollDice();
    var p2_d2 = rollDice();
    p2_dice_array.push(p2_d1);
    p2_dice_array.push(p2_d2);
    myOutputValue =
      "Welcome, Player 2 <br>" +
      "You rolled " +
      p2_dice_array[0] +
      " for DICE ONE and " +
      p2_dice_array[1] +
      " for DICE TWO. <br>" +
      "Choose the order of the dice by entering 1 or 2.";
    console.log(
      "p2 numbers:",
      p2_dice_array[0],
      p2_dice_array[1],/*
      p2_d1,
      p2_d2
    );
    gameMode = "p2_sequence";
    return myOutputValue;
  }

  if (gameMode == "p2_sequence") {
    if (input == "1") {
      p2_total = p2_dice_array[0] * 10 + p2_dice_array[1];
      myOutputValue =
        "You chose DICE ONE. Your number is " +
        p2_total +
        ".<br>" +
        "Click to see the result."
      gameMode = "compare";
    }
    if (input == "2") {
      p2_total = p2_dice_array[1] * 10 + p2_dice_array[0];
      myOutputValue =
        "You chose DICE TWO. Your number is " +
        p2_total +
        ".<br>" +
        "Click to see the result.";
      gameMode = "compare";
    }
    return myOutputValue;
  }
  if (gameMode == "compare") {
    if (p2_total > p1_total) {
      myOutputValue =
        "Player 1 has " +
        p1_total +
        ", Player 2 has " +
        p2_total +
        ". Player 2 wins. Player 1 click submit to start over.";
    } else if (p1_total > p2_total) {
      myOutputValue =
        "Player 1 has " +
        p1_total +
        ", Player 2 has " +
        p2_total +
        ". Player 1 wins. Player 1 click submit to start over.";
    } else {
      myOutputValue =
        "Player 1 has " +
        p1_total +
        ", Player 2 has " +
        p2_total +
        ". It's a draw. Player 1 click submit to start over.";
    }
    gameMode = "p1_rolldice";
    return myOutputValue;
  }
};
*/

/* CODE2 : this is Bryan's refactored code.
 
// ====================== //
// == GLOBAL VARIABLES == //
// ====================== //
var MODE_SEQUENCE = 'sequence';
var MODE_ROLLDICE = 'rolldice';
var MODE_COMPARE = 'compare';
var gameMode = MODE_ROLLDICE; 

var currentPlayer = 1;

var diceArray = [];
var scoreArray = [];

// ====================== //
// == HELPER FUNCTIONS == //
// ====================== //

var rollDice = function () {
  var dice_num = Math.floor(Math.random() * 5 + 1);
  return dice_num;
};

var rollDiceForPlayer = function () {
  console.log('current game mode is... ', gameMode);
  console.log('current player is... ', currentPlayer);

  diceArray.push(rollDice());
  diceArray.push(rollDice());

  console.log('dice array: ', diceArray);

  gameMode = MODE_SEQUENCE;
  console.log('GAME MODE CHANGED');
  console.log(gameMode);

  return `Welcome, Player ${currentPlayer}<br>You rolled ${diceArray[0]} for DICE ONE and ${diceArray[1]} for DICE TWO.<br>Choose the order of the dice by entering 1 or 2`;
}

var sequenceScore = function (input) {
  console.log('current game mode is... ', gameMode);
  console.log('current player is... ', currentPlayer);

  if (input != '1' && input != '2') return 'please enter 1 or 2!' + 
  "<br>You rolled " +
    diceArray[0] +
    " for DICE ONE and " +
    diceArray[1] +
    " for DICE TWO. <br>" +
    "Choose the order of the dice by entering 1 or 2.";

  var finalScore

  if (input == "1") finalScore = diceArray[0] * 10 + diceArray[1]; 
  if (input == "2") finalScore = diceArray[1] * 10 + diceArray[0];
    
  scoreArray.push(finalScore);
  diceArray = [];
  console.log(currentPlayer);
  currentPlayer++;
  gameMode = MODE_ROLLDICE;

  if (currentPlayer == 3) gameMode = MODE_COMPARE;

  return "You chose DICE ONE. Your number is " +
    finalScore +
    ".<br>" +
    "It is now Player 2's turn.";

}

var resetGame = function () {
  currentPlayer = 1;
  gameMode = MODE_ROLLDICE;
  diceArray = [];
  scoreArray = [];
};

var compareScore = function () {
  var p1_total = scoreArray[0];
  var p2_total = scoreArray[1];
  resetGame();

  if (p2_total > p1_total) {
    return "Player 1 has " +
      p1_total +
      ", Player 2 has " +
      p2_total +
      ". Player 2 wins. Player 1 click submit to start over.";
  } else if (p1_total > p2_total) {
    return "Player 1 has " +
      p1_total +
      ", Player 2 has " +
      p2_total +
      ". Player 1 wins. Player 1 click submit to start over.";
  } else {
    return "Player 1 has " +
      p1_total +
      ", Player 2 has " +
      p2_total +
      ". It's a draw. Player 1 click submit to start over.";
  }
}

// ====================== //
// === MAIN FUNCTIONS === //
// ====================== //
var main = function (input) {
  console.log('top of main function');
  if (currentPlayer == 1 && gameMode == MODE_ROLLDICE) return rollDiceForPlayer();
  if (currentPlayer == 1 && gameMode == MODE_SEQUENCE) return sequenceScore(input);
  if (currentPlayer == 2 && gameMode == MODE_ROLLDICE) return rollDiceForPlayer();
  if (currentPlayer == 2 && gameMode == MODE_SEQUENCE) return sequenceScore(input);
  if (gameMode == MODE_COMPARE) return compareScore();
};
white_check_mark
eyes
raised_hands

*/

/*
// CODE 2: this is the simplified code - Not complete
var gameMode = "rolldice"; // rolldice, choose_order
var currentPlayer = 1;
var p1_dice_array = [];
var p2_dice_array = [];
var p1_total = "";
var p2_total = "";

//function to generate random number from 1 to 6
var rollDice = function () {
  return (dice_num = Math.ceil(Math.random() * 6));
};

//function to roll dice and store dice number for current player
var playerRollDice = function () {
  var newDiceRolls = [rollDice(), rollDice()];
  if (currentPlayer == 1) {
    p1_dice_array = newDiceRolls;
  } else {
    p2_dice_array = newDiceRolls;
  }
  return newDiceRolls;
};

//function to combined both roll dice value
var combineDiceValue = function (input) {
  var currentPlayerDiceValue = totalDiceValue;
  if (currentPlayer == 1) {
    if (input == 1) {
      totalDiceValue = Number(
        String(p1_dice_array[0]) + String(p1_dice_array[1])
      );
      p1_total = totalDiceValue;
      myOutputValue = "Player 1, Your number is " + totalDiceValue;
    }
    if (input == 2) {
      totalDiceValue = Number(
        String(p1_dice_array[1]) + String(p1_dice_array[0])
      );
      p1_total = totalDiceValue;
      myOutputValue = "Player 1Your number is " + totalDiceValue;
    }
  } else {
    if (input == 1) {
      totalDiceValue = Number(
        String(p2_dice_array[0]) + String(p2_dice_array[1])
      );
      p2_total = totalDiceValue;
      myOutputValue = "Player 2, Your number is " + totalDiceValue;
    }
    if (input == 2) {
      totalDiceValue = Number(
        String(p2_dice_array[1]) + String(p2_dice_array[0])
      );
      p2_total = totalDiceValue;
      myOutputValue = "Player 2, Your number is " + totalDiceValue;
    }
  }
  return currentPlayerDiceValue;
};

//function to compare results of P1 vs P2
var compareResult = function () {
  if (p2_total > p1_total) {
    myOutputValue =
      "Player 1 has " +
      p1_total +
      ", Player 2 has " +
      p2_total +
      ". Player 2 wins. Player 1 click submit to start over.";
  } else if (p1_total > p2_total) {
    myOutputValue =
      "Player 1 has " +
      p1_total +
      ", Player 2 has " +
      p2_total +
      ". Player 1 wins. Player 1 click submit to start over.";
  } else {
    myOutputValue =
      "Player 1 has " +
      p1_total +
      ", Player 2 has " +
      p2_total +
      ". It's a draw. Player 1 click submit to start over.";
  }
  return myOutputValue;
};

var main = function (input) {
  if (currentPlayer == 1) {
    var p1_d1 = rollDice();
    var p1_d2 = rollDice();
    p1_dice_array.push(p1_d1);
    p1_dice_array.push(p1_d2);
    myOutputValue =
      "Welcome, Player 1 <br>" +
      "You rolled " +
      p1_dice_array[0] +
      " for DICE ONE and " +
      p1_dice_array[1] +
      " for DICE TWO. <br>" +
      "Choose the order of the dice by entering 1 or 2.";
    console.log(
      "p1 numbers:",
      p1_dice_array[0],
      p1_dice_array[1],
      p1_d1,
      p1_d2
    );
    gameMode = "p1_sequence";
    return myOutputValue;
  }
  if (gameMode == "p1_sequence") {
    if (input == "1") {
      p1_total = p1_dice_array[0] * 10 + p1_dice_array[1]; // or Number(String(p1_dice_array[0])+String(p1_dice_array[1])))
      myOutputValue =
        "You chose DICE ONE. Your number is " +
        p1_total +
        ".<br>" +
        "It is now Player 2's turn.";
      gameMode = "p2_rolldice";
    }
    if (input == "2") {
      p1_total = p1_dice_array[1] * 10 + p1_dice_array[0];
      myOutputValue =
        "You chose DICE TWO. Your number is " +
        p1_total +
        ".<br>" +
        "It is now Player 2's turn.";
      gameMode = "p2_rolldice";
    }
    return myOutputValue;
  }
  if (gameMode == "p2_rolldice") {
    var p2_d1 = rollDice();
    var p2_d2 = rollDice();
    p2_dice_array.push(p2_d1);
    p2_dice_array.push(p2_d2);
    myOutputValue =
      "Welcome, Player 2 <br>" +
      "You rolled " +
      p2_dice_array[0] +
      " for DICE ONE and " +
      p2_dice_array[1] +
      " for DICE TWO. <br>" +
      "Choose the order of the dice by entering 1 or 2.";
    console.log(
      "p2 numbers:",
      p2_dice_array[0],
      p2_dice_array[1],
      p2_d1,
      p2_d2
    );
    gameMode = "p2_sequence";
    return myOutputValue;
  }

  if (gameMode == "p2_sequence") {
    if (input == "1") {
      p2_total = p2_dice_array[0] * 10 + p2_dice_array[1];
      myOutputValue =
        "You chose DICE ONE. Your number is " +
        p2_total +
        ".<br>" +
        "Click to see the result.";
      gameMode = "compare";
    }
    if (input == "2") {
      p2_total = p2_dice_array[1] * 10 + p2_dice_array[0];
      myOutputValue =
        "You chose DICE TWO. Your number is " +
        p2_total +
        ".<br>" +
        "Click to see the result.";
      gameMode = "compare";
    }
    gameMode = "compare";
    return myOutputValue;
  }
  if (gameMode == "compare") {
    myOutputValue = compareResult();
    gameMode = "p1_rolldice";
    return myOutputValue;
  }
};
*/
