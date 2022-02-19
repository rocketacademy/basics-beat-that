/*
- player 1 rolls two dice and choose the order of the dice
- player 2 rolls two dice and choose the order of the dice
- compare player 1 and player 2 number, state the winner
- reset the game
*/

var gameState = "player1Roll";
var player1RollRecords = [];
var player2RollRecords = [];
var player1PointsRecord = [];
var player2PointsRecord = [];

// roll dice function
var rollDice = function () {
  let randomDiceNum = Math.floor(Math.random() * 6) + 1;
  //console.log(randomDiceNum);
  return randomDiceNum;
};

// player1 choose value function
var chooseNumberFunction1 = function (input) {
  if (input != 1 && input != 2) {
    outputMessage = `Player 1, invalid option. 
      For option 1, please key 1.
      For option 2, please key 2.`;
  }
  if (input == 1) {
    var player1Points =
      String(player1RollRecords[0]) + String(player1RollRecords[1]);
    player1PointsRecord.push(Number(player1Points));
    outputMessage = `Player 1, your value is ${player1Points}`;
  }
  if (input == 2) {
    var player1Points =
      String(player1RollRecords[1]) + String(player1RollRecords[0]);
    player1PointsRecord.push(Number(player1Points));
    outputMessage = `Player 1, your value is ${player1Points}`;
  }
  return outputMessage;
};

// player2 choose value function
var chooseNumberFunction2 = function (input) {
  if (input != 1 && input != 2) {
    outputMessage = `Player 2, invalid option. 
      For option 1, please key 1.
      For option 2, please key 2.`;
  }
  if (input == 1) {
    var player2Points =
      String(player2RollRecords[0]) + String(player2RollRecords[1]);
    player2PointsRecord.push(Number(player2Points));
    outputMessage = `Player 2, your value is ${player2Points}`;
  }
  if (input == 2) {
    var player2Points =
      String(player2RollRecords[1]) + String(player2RollRecords[0]);
    player2PointsRecord.push(Number(player2Points));
    outputMessage = `Player 2, your value is ${player2Points}`;
  }
  return outputMessage;
};

// MAIN FUNCTION!
var main = function (input) {
  //player 1 roll and choose
  if (gameState == "player1Roll") {
    while (player1RollRecords.length < 2) {
      player1RollRecords.push(rollDice());
    }
    console.log(player1RollRecords);
    gameState = "player1ChooseNumber";
    outputMessage = `Player 1, you have rolled ${player1RollRecords}. Please choose option 1 or option 2`;
    return outputMessage;
  }
  if (gameState == "player1ChooseNumber") {
    outputMessage = chooseNumberFunction1(input);
    gameState = "player2Roll";
    return outputMessage;
  }

  //player 2 roll and choose
  if (gameState == "player2Roll") {
    while (player2RollRecords.length < 2) {
      player2RollRecords.push(rollDice());
    }
    console.log(player2RollRecords);
    gameState = "player2ChooseNumber";
    outputMessage = `Player 2, you have rolled ${player2RollRecords}. Please choose option 1 or option 2`;
    return outputMessage;
  }
  if (gameState == "player2ChooseNumber") {
    outputMessage = chooseNumberFunction2(input);
    gameState = "compareValues";
    return outputMessage;
  }
  console.log(player1PointsRecord);
  console.log(player2PointsRecord);

  //compare player 1 and player 2 values
  if (gameState == "compareValues") {
    if (Number(player1PointsRecord[0]) > Number(player2PointsRecord[0])) {
      outputMessage = `Player 1, you have won. <br>
    Player 1 value: ${player1PointsRecord[0]} <br> 
    Player 2 value: ${player2PointsRecord[0]}.`;
      return outputMessage;
    }
    if (Number(player1PointsRecord[0]) < Number(player2PointsRecord[0])) {
      outputMessage = `Player 2, you have won. <br>
    Player 1 value: ${player1PointsRecord[0]} <br> 
    Player 2 value: ${player2PointsRecord[0]}.`;
      return outputMessage;
    }
  }
};
