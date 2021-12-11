/* <Joy> - B12S2
Beat That!

Number of players: 2 (take turns)

Game Mode 1: 
Input: Player 1 clicks submit & 2 dices are rolled.
Output: 2 dice numbers

Game Mode 2:
Input: Player 1 selects order of number.
Option 1: Dice 1 followed by Dice 2
Option 2: Dice 2 followed by Dice 1

Repeat Mode 1 & 2 for player 2. 

Winning Criteria: Player with the higher combined number wins
*/

var currentGameMode = "Pending player 1 submission";
var player1Dice = [];
var player2Dice = [];
var player1DiceResult = [];
var player2DiceResult = [];
var player1Counter = 0;
var player2Counter = 0;
var myOutputValue = "";

var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var diceNumber = Math.floor(randomDecimal) + 1;
  return diceNumber;
};
//Determine dice roll for player 1
var getPlayer1Result = function () {
  console.log(player1Counter, "Player 1 Counter before loop");
  while (player1Counter < 2) {
    var player1DiceSelection = rollDice();
    player1Dice.push(player1DiceSelection);
    player1Counter = player1Counter + 1;
  }
  console.log(player1Counter, "Player 1 Counter after loop");
  console.log(player1Dice, "Player 1 Dice selection");
  // Once Player 1 completes dice roll, to compare both numbers.
  // If Dice 1 = Dice 2, to skip the mode of selecting order.
  if (player1Counter == 2) {
    var player1Dice1 = player1Dice[0];
    var player1Dice2 = player1Dice[1];
    if (player1Dice1 == player1Dice2) {
      player1Result = `Player 1<br><br> Welcome Player 1! You have selected ${player1Dice}. <br><br> The number you have is ${player1Dice1}${player1Dice2}.<br><br> Player 2, you may click submit.`;
      currentGameMode = "Pending player 2 submission";
      console.log(player1Result, "Exclusion criteria ok");
      player1DiceResult.push(player1Dice[0], player1Dice[1]);
      console.log(player1DiceResult);
    } else if (player1Dice1 !== player1Dice2) {
      currentGameMode = "Pending player 1 order";
      player1Result = `Player 1 <br><br> Welcome Player 1! You have selected ${player1Dice}. <br><br> To choose the order of numbers, please key in: <br><br> 1 for Dice 1 to be first. <br><br> 2 for Dice 2 to be first.`;
      console.log(player1Result, "Inclusion criteria ok");
    }
    console.log(getPlayer1Result, "Player 1 dice roll ok");
    return player1Result;
  }
};
//Determine order for player 1
var getPlayer1Order = function (input) {
  var player1OrderResult = "";
  var player1Order = input;
  console.log(player1Order, "Player 1 Order");
  if (currentGameMode == "Pending player 1 order") {
    if (player1Order == 1) {
      player1OrderResult = `Player 1<br><br> You have selected ${player1Dice}. <br><br> The number you have is ${player1Dice[0]}${player1Dice[1]}.<br><br> Player 2, you may click submit.`;
      currentGameMode = "Pending player 2 submission";
      player1DiceResult.push(player1Dice[0], player1Dice[1]);
      console.log(player1DiceResult);
    } else if (player1Order == 2) {
      player1OrderResult = `Player 1<br><br> You have selected ${player1Dice}. <br><br> The number you have is ${player1Dice[1]}${player1Dice[0]}.<br><br> Player 2, you may click submit.`;
      currentGameMode = "Pending player 2 submission";
      player1DiceResult.push(player1Dice[1], player1Dice[0]);
      console.log(player1DiceResult);
    } else {
      player1OrderResult = `You have keyed in an invalid response. The numbers you have are ${player1Dice}. <br><br> To choose the order of numbers, please key in: <br><br> 1 for Dice 1 to be first. <br><br> 2 for Dice 2 to be first.`;
    }
    console.log(main, "Player 1 order ok");
  }
  return player1OrderResult;
};
//Determine dice roll for player 2
var getPlayer2Result = function () {
  console.log(player2Counter, "Player 2 Counter before loop");
  while (player2Counter < 2) {
    var player2DiceSelection = rollDice();
    player2Dice.push(player2DiceSelection);
    player2Counter = player2Counter + 1;
  }
  console.log(player2Counter, "Player 2 Counter after loop");
  console.log(player2Dice, "Player 2 Dice selection");
  // Once Player 2 completes dice roll, to compare both numbers.
  // If Dice 1 = Dice 2, to skip the mode of selecting order.
  if (player2Counter == 2) {
    var player2Dice1 = player2Dice[0];
    var player2Dice2 = player2Dice[1];
    if (player2Dice1 == player2Dice2) {
      player2Result = `Player 2<br><br> Welcome Player 2! You have selected ${player2Dice}. <br><br> The number you have is ${player2Dice1}${player2Dice2}.<br><br> You may click submit to find out the winner.`;
      currentGameMode = "Determine winner";
      console.log(player2Result, "Exclusion criteria ok");
      player2DiceResult.push(player2Dice[0], player2Dice[1]);
      console.log(player2DiceResult);
    } else if (player2Dice1 !== player2Dice2) {
      currentGameMode = "Pending player 2 order";
      player2Result = `Player 2 <br><br> Welcome Player 2! You have selected ${player2Dice}. <br><br> To choose the order of numbers, please key in: <br><br> 1 for Dice 1 to be first. <br><br> 2 for Dice 2 to be first.`;
      console.log(player2Result, "Inclusion criteria ok");
    }
    console.log(getPlayer2Result, "Player 2 dice roll ok");
    return player2Result;
  }
};
//Determine order for player 2
var getPlayer2Order = function (input) {
  var player2OrderResult = "";
  var player2Order = input;
  if (currentGameMode == "Pending player 2 order") {
    if (player2Order == 1) {
      player2OrderResult = `Player 2<br><br> You have selected ${player2Dice}. <br><br> The number you have is ${player2Dice[0]}${player2Dice[1]}.<br><br> You may click submit to find out the winner.`;
      currentGameMode = "Determine winner";
      player2DiceResult.push(player2Dice[0], player2Dice[1]);
      console.log(player2DiceResult);
    } else if (player2Order == 2) {
      player2OrderResult = `Player 2<br><br> You have selected ${player2Dice}. <br><br> The number you have is ${player2Dice[1]}${player2Dice[0]}.<br><br> You may click submit to find out the winner.`;
      currentGameMode = "Determine winner";
      player2DiceResult.push(player2Dice[1], player2Dice[0]);
      console.log(player2DiceResult);
    } else {
      player2OrderResult = `You have keyed in an invalid response. The numbers you have are ${player2Dice}. <br><br> To choose the order of numbers, please key in: <br><br> 1 for Dice 1 to be first. <br><br> 2 for Dice 2 to be first.`;
    }
    console.log(main, "Player 2 order ok");
    return player2OrderResult;
  }
};
//Get winner outcome
var getWinnerOutcome = function () {
  if (player1DiceResult[0] > player2DiceResult[0]) {
    winnerOutcome = `Congratulations Player 1! <br><br> You have won! <br><br> Player 1 had selected ${player1DiceResult[0]}${player1DiceResult[1]}.<br><br> Player 2 had selected ${player2DiceResult[0]}${player2DiceResult[1]}.`;
    console.log("winner criteria 1");
  } else if (player1DiceResult[0] < player2DiceResult[0]) {
    winnerOutcome = `Congratulations Player 2! <br><br> You have won! <br><br> Player 2 had selected ${player2DiceResult[0]}${player2DiceResult[1]}.<br><br> Player 1 had selected ${player1DiceResult[0]}${player1DiceResult[1]}.`;
    console.log("winner criteria 2");
  } else if (player1DiceResult[1] > player2DiceResult[1]) {
    winnerOutcome = `Congratulations Player 1! <br><br> You have won! <br><br> Player 1 had selected ${player1DiceResult[0]}${player1DiceResult[1]}.<br><br> Player 2 had selected ${player2DiceResult[0]}${player2DiceResult[1]}.`;
    console.log("winner criteria 3");
  } else if (player2DiceResult[1] > player1DiceResult[1]) {
    winnerOutcome = `Congratulations Player 2! <br><br> You have won! <br><br> Player 2 had selected ${player2DiceResult[0]}${player2DiceResult[1]}.<br><br> Player 1 had selected ${player1DiceResult[0]}${player1DiceResult[1]}.`;
  } else {
    winnerOutcome = `It's a draw! <br><br> Player 1 had selected ${player1DiceResult[0]}${player1DiceResult[1]}.<br><br> Player 2 had selected ${player2DiceResult[0]}${player2DiceResult[1]}.`;
  }
  return winnerOutcome;
};

var main = function (input) {
  if (currentGameMode == "Pending player 1 submission") {
    myOutputValue = getPlayer1Result();
  } else if (currentGameMode == "Pending player 1 order") {
    myOutputValue = getPlayer1Order(input);
  } else if (currentGameMode == "Pending player 2 submission") {
    myOutputValue = getPlayer2Result();
  } else if (currentGameMode == "Pending player 2 order") {
    myOutputValue = getPlayer2Order(input);
  } else if (currentGameMode == "Determine winner") {
    myOutputValue = getWinnerOutcome();
  }
  return myOutputValue;
};
