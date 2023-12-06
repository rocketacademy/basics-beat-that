//ver1
//player press submit to roll 2 dice (gamestate = roll)
//player choose the dice order (gamestate = choose order)
//program outputs player number base on dice order

//ver2
//implement 2 player system
//game starts with player 1, press submit to roll dice, press order to finalize output, and store in array as [0] for comparison with player 2 later on
//game then switches to player 2 who presses submit to roll, and order to finalize output, then stores in the same array as [1]

//global variable for gamestate
var GAME_STATE = "USER_ROLL_DICE";
//gloval variable to check player turn
var PLAYER_TURN = 1;

//array to store each player's rolls
var PLAYER_ROLL = [];
//array to store final scores for comparison
var FINAL_PLAYER_SCORE = [];

//roll dice once
var diceRoll = function () {
  return Math.floor(Math.random() * 6) + 1;
};

//rearrange dice base on user input
var diceOrder = function (USER_SELECTION) {
  if (USER_SELECTION != 1 && USER_SELECTION != 2) {
    return "Invalid Input! Enter Again!";
  }
  if (USER_SELECTION == 1) {
    return Number(String(PLAYER_ROLL[0]) + String(PLAYER_ROLL[1]));
  }
  if (USER_SELECTION == 2) {
    return Number(String(PLAYER_ROLL[1]) + String(PLAYER_ROLL[0]));
  }
};

//function to compare scores
var compareScores = function () {
  if (FINAL_PLAYER_SCORE[0] > FINAL_PLAYER_SCORE[1]) {
    return `Player 1 wins!`;
  }
  if (FINAL_PLAYER_SCORE[0] < FINAL_PLAYER_SCORE[1]) {
    return `Player 2 wins!`;
  }
  if (FINAL_PLAYER_SCORE[0] == FINAL_PLAYER_SCORE[1]) {
    return `It's a tie!`;
  }
};

//function to reset game
var reset = function () {
  GAME_STATE = "USER_ROLL_DICE";
  PLAYER_TURN = 1;
  FINAL_PLAYER_SCORE = [];
  PLAYER_ROLL = [];
};

var main = function (input) {
  var counter = 0;
  var myOutputValue = "";

  if (GAME_STATE == "USER_ROLL_DICE") {
    //when player presses submit, roll dice 2 times and push rolls into playerRoll array
    while (counter < 2) {
      PLAYER_ROLL.push(diceRoll());
      counter++;
    }
    GAME_STATE = "USER_DICE_ORDER";
    return `Welcome PLAYER ${PLAYER_TURN}!<br><br>Your rolls are (${PLAYER_ROLL[0]}) for dice 1 and (${PLAYER_ROLL[1]}) for dice 2.<br><br>Please input "1" or "2" to decide which dice to use first!`;
  }

  if (GAME_STATE == "USER_DICE_ORDER") {
    FINAL_PLAYER_SCORE.push(diceOrder(input));
  }

  myOutputValue = `You chose dice ${input} first, and your number is ${
    FINAL_PLAYER_SCORE[PLAYER_TURN - 1]
  }!<br><br>It is now Player ${PLAYER_TURN + 1}'s turn!`;

  if (PLAYER_TURN == 1) {
    PLAYER_TURN = 2;
    GAME_STATE = "USER_ROLL_DICE";
    PLAYER_ROLL = [];
    return myOutputValue;
  }

  if (PLAYER_TURN == 2) {
    PLAYER_TURN = 0;
    GAME_STATE = "COMPARE_SCORES";
    myOutputValue = "Press submit to compare scores!";
    return myOutputValue;
  }

  if (GAME_STATE == "COMPARE_SCORES") {
    var winner = "";
    winner = compareScores();
    myOutputValue =
      `Player 1 rolled ${FINAL_PLAYER_SCORE[0]}!<br><br>Player 2 rolled ${FINAL_PLAYER_SCORE[1]}!<br><br>` +
      winner +
      " Press submit to play again!";
    reset();
    return myOutputValue;
  }

  return myOutputValue;
};
