//basics project 2 : Beat That!
//create a game which has 2 players. 1 player goes first
//when player clicks submit, 2 random dice rolls with be generated
//player can select which of the two number goes first to create a two-digit no.
//second player does the same thing
//game decides who wins based on bigger number

var player1Num = 0;
var player2Num = 0;
var player1Arr = [];
var player2Arr = [];
var playerNameArr = [];
var nameCount = 0;
var playerNumRecords = ``;
var playerState = ``;
var gameState = `getting player names`;

var main = function (input) {
  console.log(`this is current player state: `, playerState);
  console.log(`this is current game state: `, gameState);
  var message = ``;
  if (gameState == `getting player names`) {
    if (nameCount < 2) {
      message = savePlayerNameToArray(input);
      console.log(`current list of players: `, playerNameArr);
      return message;
    }
  }
  if (playerState == `P1`) {
    if (gameState == `rolling dice`) {
      message = saveRollstoArray(playerState);
      return message;
    }
    if (gameState == `order numbers`) {
      message = decideOrder(input, 1);
      return message;
    }
  } else if (playerState == `P2`) {
    if (gameState == `rolling dice`) {
      message = saveRollstoArray(playerState);
      return message;
    }
    if (gameState == `order numbers`) {
      message = decideOrder(input, 2);
      return message;
    }
  }
};

//save player names to array, change game state to first player roll dice once the last name has been saved
var savePlayerNameToArray = function (input) {
  playerNameArr.push(input);
  message = `Welcome, ${playerNameArr[nameCount]}!`;
  nameCount += 1;
  if (nameCount != 2) {
    message = message + ` Player 2, please type in your name.`;
  }
  if (nameCount == 2) {
    message = message + ` ${playerNameArr[0]}, click submit to roll dice.`;
    gameState = `rolling dice`;
    playerState = `P1`;
  }
  return message;
};

//random dice generator
var rollDice = function () {
  var diceNum = Math.floor(Math.random() * 6) + 1;
  return diceNum;
};

//save random rolls to array
var saveRollstoArray = function (playerState) {
  if (playerState == `P1`) {
    console.log(`We're rolling dice for P1 now!`);
    for (i = 0; i < 2; i += 1) {
      player1Arr.push(rollDice());
    }
    gameState = `order numbers`;
    return (
      `${playerNameArr[0]}, the numbers from your rolls are ${player1Arr}.` +
      `<br>` +
      `Press 1 if you want your number to be ${player1Arr[0]}${player1Arr[1]}` +
      `<br>` +
      `Press 2 if you want your number to be ${player1Arr[1]}${player1Arr[0]}`
    );
  }
  console.log(`We're rolling dice for P2 now!`);
  for (i = 0; i < 2; i += 1) {
    player2Arr.push(rollDice());
  }
  gameState = `order numbers`;
  return (
    `${playerNameArr[1]}, the numbers from your rolls are ${player2Arr}.` +
    `<br>` +
    `Press 1 if you want your number to be ${player2Arr[0]}${player2Arr[1]}` +
    `<br>` +
    `Press 2 if you want your number to be ${player2Arr[1]}${player2Arr[0]}`
  );
};

//decide order of Player 1's numbers based on array
var decideOrder = function (input, player) {
  if (player == 1) {
    console.log(`we're deciding order of Player 1 now!`);
    if (input == 1) {
      player1Num = player1Arr[0] * 10 + player1Arr[1];
      console.log(`this is player 1's number: `, player1Num);
      playerState = `P2`;
      gameState = `rolling dice`;
      return (
        `${playerNameArr[0]}, your number is ${player1Num}` +
        `<br>` +
        `${playerNameArr[1]}, click submit to roll dice.`
      );
    }
    if (input == 2) {
      player1Num = player1Arr[1] * 10 + player1Arr[0];
      playerState = `P2`;
      gameState = `rolling dice`;
      return (
        `${playerNameArr[0]}, your number is ${player1Num}` +
        `<br>` +
        `${playerNameArr[1]}, click submit to roll dice.`
      );
    }
    return (
      `This is an invalid input.` +
      `<br>` +
      `Press 1 if you want your number to be ${player1Arr[0]}${player1Arr[1]}` +
      `<br>` +
      `Press 2 if you want your number to be ${player1Arr[1]}${player1Arr[0]}`
    );
  }
  if (player == 2) {
    console.log(`we're deciding order of Player 2 and deciding winner now!`);
    if (input == 1) {
      player2Num = player2Arr[0] * 10 + player2Arr[1];
    } else if (input == 2) {
      player2Num = player2Arr[1] * 10 + player2Arr[0];
    } else {
      return (
        `This is an invalid input.` +
        `<br>` +
        `Press 1 if you want your number to be ${player1Arr[0]}${player1Arr[1]}` +
        `<br>` +
        `Press 2 if you want your number to be ${player1Arr[1]}${player1Arr[0]}`
      );
    }
    console.log(`this is player 2's number, ${player2Num}`);
    message =
      `${playerNameArr[1]}, your number is ${player2Num}` +
      `<br>` +
      decideWinner(player1Num, player2Num);
    return message;
  }
};

var decideWinner = function (player1Num, player2Num) {
  message =
    `${playerNameArr[0]}, your number is ${player1Num}` +
    `<br>` +
    `${playerNameArr[1]} wins!`;
  if (player1Num > player2Num) {
    message =
      `${playerNameArr[0]}, your number is ${player1Num}` +
      `<br>` +
      `${playerNameArr[0]} wins!`;
  }
  if (player1Num == player2Num) {
    message =
      `${playerNameArr[0]}, your number is ${player1Num}` +
      `<br>` +
      `It's a draw!`;
  }
  return message;
};
