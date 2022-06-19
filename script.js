//basics project 2 : Beat That!
//create a game which has 2 players. 1 player goes first
//when player clicks submit, 2 random dice rolls with be generated
//player can select which of the two number goes first to create a two-digit no.
//second player does the same thing
//game decides who wins based on bigger number

// var numPlayers = 0;
// var playerNameArr = [];
// var player1Num = 0;
// var player2Num = 0;
// var gameState = `waiting for user names`;

// var main = function (input) {
//   //initial message = `input no of players' - use html
//   if (numPlayers == 0){
//   var message = initialisePlayers(input);
//   return message;
//   }
// };

// //intialise players
// var initialisePlayers = function (input) {
//   if (numPlayers == 0) {
//     numPlayers = input;
//     return `Enter players' name seperately, clicking submit after tpying in each name.`;
//   } else {
//     for (var i = 0; i < input; i++) {
//       if (i < input - 1) {
//         savePlayerName(i, input);
//         return `Welcome, ${playerNameArr[i]}! Please type the next player's name.`;
//       }
//       savePlayerName(i, input);
//       return `Welcome ${playerNameArr}. Let's play Beat That!`;
//     }
//   }
// };

// //save player names
// var savePlayerName = function (i, input) {
//   playerNameArr.push(input);
//   return;
// };

//start with 2 players first

var player1Num = 0;
var player2Num = 0;
var player1Arr = [];
var player2Arr = [];
var playerState = `P1`;
var gameState = `rolling dice`;

var main = function (input) {
  //initial message = `welcome player 1, click submit to roll dice`
  console.log(`this is current player state: `, playerState);
  console.log(`this is current game state: `, gameState);
  var message = ``;
  if (playerState == `P1`) {
    if (gameState == `rolling dice`) {
      message = saveRollstoArray(playerState);
      return message;
    }
    if (gameState == `order numbers`) {
      message = decideOrder1(input);
      return message;
    }
  } else if (playerState == `P2`) {
    if (gameState == `rolling dice`) {
      message = saveRollstoArray(playerState);
      return message;
    }
    if (gameState == `order numbers`) {
      message = decideOrder2(input);
      return message;
    }
  } else {
    message = decideWinner(player1Num, player2Num);
    return message;
  }
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
      `Player 1, the numbers from your rolls are ${player1Arr}.` +
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
    `Player 2, the numbers from your rolls are ${player2Arr}.` +
    `<br>` +
    `Press 1 if you want your number to be ${player2Arr[0]}${player2Arr[1]}` +
    `<br>` +
    `Press 2 if you want your number to be ${player2Arr[1]}${player2Arr[0]}`
  );
};

//decide order of Player 1's numbers based on array
var decideOrder1 = function (input) {
  console.log(`we're deciding order of Player 1 now!`);
  if (input == 1) {
    player1Num = player1Arr[0] * 10 + player1Arr[1];
    console.log(`this is player 1's number: `, player1Num);
    playerState = `P2`;
    gameState = `rolling dice`;
    return (
      `Player 1, your number is ${player1Num}` +
      `<br>` +
      `Player 2, click submit to roll dice.`
    );
  }
  if (input == 2) {
    player1Num = player1Arr[1] * 10 + player1Arr[0];
    playerState = `P2`;
    gameState = `rolling dice`;
    return (
      `Player 1, your number is ${player1Num}` +
      `<br>` +
      `Player 2, click submit to roll dice.`
    );
  }
  return (
    `This is an invalid input.` +
    `<br>` +
    `Press 1 if you want your number to be ${player1Arr[0]}${player1Arr[1]}` +
    `<br>` +
    `Press 2 if you want your number to be ${player1Arr[1]}${player1Arr[0]}`
  );
};

//Decide order of Player 2's numbers based on array and check for winning condition
var decideOrder2 = function (input) {
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
    `Player 2, your number is ${player2Num}` +
    `<br>` +
    decideWinner(player1Num, player2Num);
  return message;
};

var decideWinner = function (player1Num, player2Num) {
  message =
    `Player 1, your number is ${player1Num}` + `<br>` + `Player 2 wins!`;
  if (player1Num > player2Num) {
    message =
      `Player 1, your number is ${player1Num}` + `<br>` + `Player 1 wins!`;
  }
  if (player1Num == player2Num) {
    message =
      `Player 1, your number is ${player1Num}` + `<br>` + `It's a draw!`;
  }
  return message;
};
