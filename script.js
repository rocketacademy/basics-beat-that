var player1_list = []
var player2_list = []
var player1_selectedNum = 0
var player2_selectedNum = 0
var player1wins = 0
var player2wins = 0

var game_state = "PLAYER_1_DICE_ROLL"
var player1_diceroll_roll = "PLAYER_1_DICE_ROLL"
var player1_diceroll_select = "PLAYER_1_ROLL_SELECT"
var player2_diceroll_roll = "PLAYER_2_DICE_ROLL"
var player2_diceroll_select = "PLAYER_2_ROLL_SELECT"
var player_score = "PLAYER_SCORE"


var genRandNum = function () {
  var randomNum = Math.random() * 6;
  var randInt = Math.floor(randomNum) + 1;

  console.log(`Random generated number: ${randInt}`);

  return randInt;
};

var genPlayerDiceRoll = function () {
  var genNum1 = genRandNum();
  var genNum2 = genRandNum();

  console.log(`Dice Roll 1: ${genNum1}`);
  console.log(`Dice Roll 2: ${genNum2}`);

  return [genNum1,genNum2]
};


var reset_Score = function () {
  console.log("Scores reset initialized");
  var player1_list = []
  var player2_list = []
  var player1_selectedNum = 0
  var player2_selectedNum = 0
};


var main = function (input) {

  if (game_state == player1_diceroll_roll){
    console.log("ENTERED PLAYER 1 ROLL");
    player1_list = genPlayerDiceRoll()
    var myOutputValue = `Welcome Player 1<br>You rolled ${player1_list[0]} for Dice 1 and ${player1_list[1]} for Dice 2.<br>Choose the order of the dice. Please input "1" or "2"`;
    game_state = player1_diceroll_select;

  } else if (game_state == player1_diceroll_select){
    console.log("ENTERED PLAYER 1 SELECT");
    if(input == "1") {
      player1_selectedNum = Number(`${player1_list[0]}${player1_list[1]}`)
      console.log(`PLAYER 1 CHOSE ${input}. Result will be ${player1_selectedNum}`);
      var myOutputValue = `Player 1, you chose Dice 1 first.<br>Your number is ${player1_selectedNum}.<br>It is now Player 2's turn`;
      game_state = player2_diceroll_roll;
    } else if (input == "2"){
      player1_selectedNum = Number(`${player1_list[1]}${player1_list[0]}`)
      console.log(`PLAYER 1 CHOSE ${input}. Result will be ${player1_selectedNum}`);
      var myOutputValue = `Player 1, you chose Dice 2 first.<br>Your number is ${player1_selectedNum}.<br>It is now Player 2's turn`;
      game_state = player2_diceroll_roll;
    } else {
      console.log(`PLAYER 1 input incorrect values.`);
      var myOutputValue = `Player 1, please input only "1" or "2"<br>You rolled ${player1_list[0]} for Dice 1 and ${player1_list[1]} for Dice 2.<br>Choose the order of the dice. Please input "1" or "2"`;
    };
  } else if (game_state == player2_diceroll_roll){
    console.log("ENTERED PLAYER 2 ROLL");
    player2_list = genPlayerDiceRoll()
    var myOutputValue = `Welcome Player 2<br>You rolled ${player2_list[0]} for Dice 1 and ${player2_list[1]} for Dice 2.<br>Choose the order of the dice. Please input "1" or "2"`;
    game_state = player2_diceroll_select;

  } else if (game_state == player2_diceroll_select){
    console.log("ENTERED PLAYER 2 SELECT");
    if(input == "1") {
      player2_selectedNum = Number(`${player2_list[0]}${player2_list[1]}`)
      console.log(`PLAYER 2 CHOSE ${input}. Result will be ${player2_selectedNum}`);
      var myOutputValue = `Player 2, you chose Dice 1 first.<br>Your number is ${player2_selectedNum}.`;
      game_state = player_score;
    } else if (input == "2"){
      player2_selectedNum = Number(`${player2_list[1]}${player2_list[0]}`)
      console.log(`PLAYER 2 CHOSE ${input}. Result will be ${player2_selectedNum}`);
      var myOutputValue = `Player 2, you chose Dice 2 first.<br>Your number is ${player2_selectedNum}.`;
      game_state = player_score;
    } else {
      console.log(`PLAYER 2 input incorrect values.`);
      var myOutputValue = `Player 1, please input only "1" or "2"<br>You rolled ${player2_list[0]} for Dice 1 and ${player2_list[1]} for Dice 2.<br>Choose the order of the dice. Please input "1" or "2"`;
    };

  } else {
    if (player1_selectedNum > player2_selectedNum) {
      var myOutputValue = `Player 1 score: ${player1_selectedNum}<br> Player 2 score: ${player2_selectedNum}<br><br>Player 1 wins!!`
      player1wins +=1
    } else if (player2_selectedNum > player1_selectedNum) {
      var myOutputValue = `Player 1 score: ${player1_selectedNum}<br> Player 2 score: ${player2_selectedNum}<br><br>Player 2 wins!!`
      player2wins +=1
    } else {
      var myOutputValue = `Player 1 score: ${player1_selectedNum}<br> Player 2 score: ${player2_selectedNum}<br><br>WHAT?? BOTH PLAYERS HAVE THE SAME NUMBER!! <br>ITS A DRAW!!!`
    };

    if (player1wins > 2 || player2wins > 2){
      myOutputValue = myOutputValue + `<br><br>CURRENT SCORES: PLAYER 1: ${player1wins} | PLAYER 2: ${player2wins}`
    }

    reset_Score()
    game_state = player1_diceroll_roll;
  }; 

  
  return myOutputValue;
};
