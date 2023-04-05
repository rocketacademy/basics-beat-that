// --- SECOND ATTEMPT ---
var ROLL = "ROLL";
var CHOOSE = "CHOOSE";
var RESULT = "RESULT";
var mode = ROLL;
var currentPlayerDiceNumbers = [];
var currentPlayer = 1;
var player1FinalNum = 0;
var player2FinalNum = 0;

var rollOneDice = function () {
  return Math.floor(Math.random() * 6) + 1;
};

var rollTwoDice = function () {
  counter = 0;
  while (counter < 2) {
    currentPlayerDiceNumbers.push(rollOneDice());
    counter += 1;
  }
  return `Player ${currentPlayer}'s turn: <br>
    You rolled ${currentPlayerDiceNumbers[0]} for Dice 1 and ${currentPlayerDiceNumbers[1]} for Dice 2. <br>
    You are about to concatenate the two digits rolled to create the largest possible number. <br>
    Enter '1' if you would like the digit in Dice 1 to be in the tens place. <br>
    Enter '2' if you would like the digit in Dice 2 to be in the tens place. <br>`;
};

var chooseDiceMode = function (playerChoice) {
  var currentPlayerFinalNum;
  if (playerChoice != 1 && playerChoice != 2) {
    return `Please enter '1' if you want ${currentPlayerDiceNumbers[0]} or enter '2' if you want ${currentPlayerDiceNumbers[1]} to be in the tens place.`;
  } else if (playerChoice == 1) {
    currentPlayerFinalNum =
      String(currentPlayerDiceNumbers[0]) + String(currentPlayerDiceNumbers[1]);
    // transfer the final num to another variable for each player separately for result mode later
    if (currentPlayer == 1) {
      player1FinalNum = Number(currentPlayerFinalNum);
    } else if (currentPlayer == 2) {
      player2FinalNum = Number(currentPlayerFinalNum);
    }
    return `Player ${currentPlayer}, you choose Dice 1 first. <br>
          Your number is ${currentPlayerFinalNum}. <br>
          Player 2's turn now! <br>
          Please hit the "Submit" button to continue.`;
  } else if (playerChoice == 2) {
    currentPlayerFinalNum =
      String(currentPlayerDiceNumbers[1]) + String(currentPlayerDiceNumbers[0]);
    // transfer the final num to another variable for each player separately for result mode later
    if (currentPlayer == 1) {
      player1FinalNum = Number(currentPlayerFinalNum);
    } else if (currentPlayer == 2) {
      player2FinalNum = Number(currentPlayerFinalNum);
    }
    return `Player ${currentPlayer}, you choose Dice 2 first. <br>
          Your number is ${currentPlayerFinalNum}. <br>
          Player 2's turn now! <br>
          Please hit the "Submit" button to continue.`;
  }
};

var enterResultMode = function () {
  if (player1FinalNum > player2FinalNum) {
    myOutputValue = `Player 1 has won. <br>
      Player 1's number: ${player1FinalNum} | Player 2's number: ${player2FinalNum} <br>
      Press Submit to play again.`;
  } else if (player1FinalNum < player2FinalNum) {
    myOutputValue = `Player 2 has won. <br>
          Player 1's number: ${player1FinalNum} | Player 2's number: ${player2FinalNum} <br>
          Press Submit to play again.`;
  } else {
    myOutputValue = `DRAW!!! <br>
          Player 1's number: ${player1FinalNum} | Player 2's number: ${player2FinalNum} <br>
          Press Submit to play again.`;
  }
  return myOutputValue;
};

var resetGame = function () {
  mode = ROLL;
  currentPlayerDiceNumbers = [];
  currentPlayer = 1;
};

var main = function (input) {
  console.log(`when button clicked ${mode}`);
  var myOutputValue;
  if (mode == ROLL) {
    myOutputValue = rollTwoDice();
    mode = CHOOSE;
  } else if (mode == CHOOSE) {
    myOutputValue = chooseDiceMode(input);
    // switch to player 2's roll dice mode only after user has entered 1 or 2
    if (input == 1 || input == 2) {
      if (currentPlayer == 1) {
        currentPlayer = 2;
        mode = ROLL;
        currentPlayerDiceNumbers = [];
      } else if (currentPlayer == 2) {
        mode = RESULT;
      }
    }
  } else if (mode == RESULT) {
    myOutputValue = enterResultMode();
    // AFTER showing the result, game resets continuously without refreshing the browser
    resetGame();
  }

  return myOutputValue;
};

// // --- FIRST ATTEMPT ---
// // global variables
// var mode = "waiting for click";
// var player1Num1 = 0;
// var player1Num2 = 0;
// var player2Num1 = 0;
// var player2Num2 = 0;
// var player1FinalNum = [];
// var player2FinalNum = [];
// var myOutputValue = "";

// var getRandomInteger = function () {
//   return Math.floor(Math.random() * 6) + 1;
// };

// var enterPlayer1RollMode = function () {
//   player1Num1 = getRandomInteger();
//   player1Num2 = getRandomInteger();
//   player1FinalNum.push(player1Num1, player1Num2);
//   myOutputValue = `Player 1's turn: <br>
//     You rolled ${player1Num1} for Dice 1 and ${player1Num2} for Dice 2. <br>
//     You are about to concatenate the two digits rolled to create the largest possible number. <br>
//     Enter '1' if you would like the digit in Dice 1 to be in the tens place. <br>
//     Enter '2' if you would like the digit in Dice 2 to be in the tens place. <br>`;
//   mode = "player1 choose dice";

//   return myOutputValue;
// };

// var enterPlayer1ChooseDiceMode = function (player1Choice) {
//   if (player1Choice == 1) {
//     player1FinalNum = String(player1FinalNum[0]) + String(player1FinalNum[1]);
//     myOutputValue = `Player 1, you choose Dice 1 first. <br>
//       Your number is ${player1FinalNum}. <br>
//       Player 2's turn now! <br>
//       Please hit the "Submit" button to continue.`;
//   } else if (player1Choice == 2) {
//     player1FinalNum = String(player1FinalNum[1]) + String(player1FinalNum[0]);
//     myOutputValue = `Player 1, you choose Dice 2 first. <br>
//       Your number is ${player1FinalNum}. <br>
//       Player 2's turn now! <br>
//       Please hit the "Submit" button to continue.`;
//   } else {
//     myOutputValue = `Please enter '1' if you want ${player1Num1} or enter '2' if you want ${player1Num2} to be in the tens place.`;
//   }
//   if (player1Choice == 1 || player1Choice == 2) {
//     mode = "waiting for click 2";
//   }
//   return myOutputValue;
// };

// var enterPlayer2RollMode = function () {
//   player2Num1 = getRandomInteger();
//   player2Num2 = getRandomInteger();
//   player2FinalNum.push(player2Num1, player2Num2);
//   myOutputValue = `Player 2's turn: <br>
//     You rolled ${player2Num1} for Dice 1 and ${player2Num2} for Dice 2. <br>
//     You are about to concatenate the two digits rolled to create the largest possible number. <br>
//     Enter '1' if you would like the digit in Dice 1 to be in the tens place. <br>
//     Enter '2' if you would like the digit in Dice 2 to be in the tens place. <br>`;
//   mode = "player2 choose dice";
//   return myOutputValue;
// };

// var enterPlayer2ChooseDiceMode = function (player2Choice) {
//   if (player2Choice == 1) {
//     player2FinalNum = String(player2FinalNum[0]) + String(player2FinalNum[1]);
//     myOutputValue = `Player 2, you choose Dice 1 first. <br>
//       Your number is ${player2Num1}${player2Num2}. <br>
//       Please hit the "Submit" button to see the result.`;
//   } else if (player2Choice == 2) {
//     player2FinalNum = String(player2FinalNum[1]) + String(player2FinalNum[0]);
//     myOutputValue = `Player 2, you choose Dice 2 first.  <br>
//       Your number is ${player2Num2}${player2Num1}. <br>
//       Please hit the "Submit" button to see the result.`;
//   } else {
//     myOutputValue = `Please enter '1' if you want ${player2Num1} or enter '2' if you want ${player2Num2} to be in the tens place.`;
//   }
//   if (player2Choice == 1 || player2Choice == 2) {
//     mode = "waiting for click 3";
//   }
//   return myOutputValue;
// };

// var enterResultMode = function () {
//   if (player1FinalNum > player2FinalNum) {
//     myOutputValue = `Player 1 has won. <br>
//       Player 1's number: ${player1FinalNum} | Player 2's number: ${player2FinalNum} <br>
//       Press Submit to play again.`;
//   } else {
//     myOutputValue = `Player 2 has won. <br>
//       Player 1's number: ${player1FinalNum} | Player 2's number: ${player2FinalNum} <br>
//       Press Submit to play again.`;
//   }
//   // reset
//   mode = "waiting for click";
//   player1Num1 = 0;
//   player1Num2 = 0;
//   player2Num1 = 0;
//   player2Num2 = 0;
//   player1FinalNum = [];
//   player2FinalNum = [];
//   return myOutputValue;
// };

// var main = function (input) {
//   // player 1
//   if (mode == "waiting for click") {
//     if (input) {
//       myOutputValue = 'Please hit the "Submit" button to continue.';
//     } else {
//       mode = "player1 roll";
//     }
//   }
//   if (mode == "player1 roll") {
//     return enterPlayer1RollMode();
//   } else if (mode == "player1 choose dice") {
//     return enterPlayer1ChooseDiceMode(input);
//   }

//   // player 2
//   else if (mode == "waiting for click 2") {
//     if (input) {
//       myOutputValue = `Player 2's turn now! Please hit the "Submit" button to continue.`;
//     } else {
//       mode = "player2 roll";
//     }
//   }
//   if (mode == "player2 roll") {
//     return enterPlayer2RollMode();
//   } else if (mode == "player2 choose dice") {
//     return enterPlayer2ChooseDiceMode(input);
//   }

//   // result
//   else if (mode == "waiting for click 3") {
//     if (input) {
//       myOutputValue = `End of the game! Please hit the "Submit" button to see the result.`;
//     } else {
//       mode = "result";
//     }
//   }
//   if (mode == "result") {
//     return enterResultMode();
//   }
//   return myOutputValue;
// };
