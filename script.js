//2 players take turns. when player_1 click submit, roll 2 dice
//Output shows player_1's two roll number, prompt player 1 to choose 1st or 2nd dice
//Output shows player_1's final number, prompt player_2 to click submit to roll 2 dice
//Output shows player_2's two roll numbers, prompt player 2 to choose 1st or 2nd dice
//Output shows player_2's final number, shows who win, prompt to click submit to reset the game

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

