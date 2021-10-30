// global variable
//user name input
var currentGameMode = `awaiting user name`;
var userName1 = "";
var userName2 = "";
var noOfRounds = 0;

//dice roll
//player 1
var diceRoll1 = [];
var diceRoll2 = [];
var player1Num = "";

//player 2
var diceRoll3 = [];
var diceRoll4 = [];
var player2Num = "";

//scores
var player1score = "";
var player2score = "";

//roll dice function
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

var main = function (input) {
  var myOutputValue = "";
  currentGameMode == "awaiting user name";
  if (currentGameMode == "awaiting user name") {
    userName1 = input;
    myOutputValue =
      `Welcome ` + userName1 + `! <br><br> Player 2, please input your name.`;
    currentGameMode = "awaiting user name 2";
  } else if (currentGameMode == "awaiting user name 2") {
    userName2 = input;
    myOutputValue =
      `Welcome ` +
      userName2 +
      `! <br><br>` +
      userName1 +
      ` , please press submit to roll the dice`;
    console.log("myOutputValue2");
    console.log(myOutputValue);
    currentGameMode = "Player 1";
  }

  // round 1 game - player 1
  // 1. player 1 roll dice
  if (currentGameMode == "Player 1") {
    diceRoll1.push(rollDice());
    diceRoll2.push(rollDice());
    myOutputValue =
      userName1 +
      ", You rolled " +
      diceRoll1[0] +
      " for dice 1 and " +
      diceRoll2[0] +
      " for dice 2. <br><br> Please choose the order of the dice. ";
    currentGameMode = "Player 1 order";
  }
  // 2. player 1 choose which order & prompt player 2 to roll
  else if (currentGameMode == "Player 1 order" && input == 1) {
    var player1DiceOrder = diceRoll1[0].toString() + diceRoll2[0].toString();
    player1Num = Number(player1DiceOrder);
    console.log("player1Num");
    console.log(player1Num);
    myOutputValue = `Your number is ${player1DiceOrder}. <br><br>${userName2}, Please press submit to roll your dice`;
    currentGameMode = "Player 2";
  } else if (currentGameMode == "Player 1 order" && input == 2) {
    var player1DiceOrder = diceRoll2[0].toString() + diceRoll1[0].toString();
    player1Num = Number(player1DiceOrder);
    myOutputValue = `Your number is ${player1DiceOrder}. <br><br>${userName2}, Please press submit to roll your dice`;
    currentGameMode = "Player 2";
  } else if (
    currentGameMode == "Player 1 order" &&
    (input != 1 || input != 2)
  ) {
    myOutputValue = `Please choose the order of the dice.`;
  }

  // 4. player 2 roll dice
  if (currentGameMode == "Player 2" && input == "") {
    //player 2's turn
    diceRoll3.push(rollDice());
    diceRoll4.push(rollDice());
    myOutputValue =
      userName2 +
      ", You rolled " +
      diceRoll3[0] +
      " for dice 1 and " +
      diceRoll4[0] +
      " for dice 2. <br><br> Please choose the order of the dice. ";
    currentGameMode = "Player 2 order";
  }

  // 5. player 2 choose which order to roll (dice3dice4 aka input == 1)
  else if (currentGameMode == "Player 2 order" && input == 1) {
    var player2DiceOrder = diceRoll3[0].toString() + diceRoll4[0].toString();
    player2Num = Number(player2DiceOrder);
    console.log("player2Num");
    console.log(player2Num);
    // 6. compare the dice numbers & winner
    if (player1Num > player2Num == true) {
      player1score = Number(player1score) + 1;
      player2score = Number(player2score) + 0;
      myOutputValue = `Your number is ${player2DiceOrder}. <br><br> The winner is ${userName1}. <br><br> The current scores are:<br> ${userName1}: ${player1score}<br> ${userName2}:${player2score}`;
      currentGameMode = "Player 1";
    } else if (player1Num < player2Num == true) {
      player1score = Number(player1score) + 0;
      player2score = Number(player2score) + 1;
      myOutputValue = `Your number is ${player2DiceOrder}. <br><br> The winner is ${userName2}. <br><br> The current scores are:<br> ${userName1}: ${player1score}<br> ${userName2}: ${player2score}`;
      currentGameMode = "Player 1";
    }
  }

  // 5. player 2 choose which order to roll (dice4dice3 aka input ==2)
  else if (currentGameMode == "Player 2 order" && input == 2) {
    var player2DiceOrder = diceRoll4[0].toString() + diceRoll3[0].toString();
    player2Num = Number(player2DiceOrder);
    console.log("player2Num");
    console.log(player2Num);
    // 6. compare the dice numbers & winner
    if (player1Num > player2Num == true) {
      player1score = Number(player1score) + 1;
      player2score = Number(player2score) + 0;
      myOutputValue = `Your number is ${player2DiceOrder}. <br><br> The winner is ${userName1}. <br><br> The current scores are:<br> ${userName1}: ${player1score}<br> ${userName2}:${player2score}`;
      currentGameMode = "Player 1";
    } else if (player1Num < player2Num == true) {
      player1score = Number(player1score) + 0;
      player2score = Number(player2score) + 1;
      myOutputValue = `Your number is ${player2DiceOrder}. <br><br> The winner is ${userName2}. <br><br> The current scores are:<br> ${userName1}: ${player1score}<br> ${userName2}: ${player2score}`;
      currentGameMode = "Player 1";
    }
  } else if (
    currentGameMode == "Player 2 order" &&
    (input != 1 || input != 2)
  ) {
    myOutputValue = `Please choose the order of the dice.`;
  }

  return myOutputValue;
};
