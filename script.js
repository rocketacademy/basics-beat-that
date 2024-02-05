let player1Roll, player2Roll, p1Dice1, p2Dice2, winner;
var p1WinCounts = 0;
var p2WinCounts = 0;
var gameMode = "roll p1 dice";
var allP1Rolls = [];
var allP2Rolls = [];

var main = function (input) {
  if (gameMode == "roll p1 dice") {
    p1Dice1 = getRandomNumber();
    p1Dice2 = getRandomNumber();
    gameMode = "get p1 final";
    return `Welcome Player 1. <br>You rolled ${p1Dice1} for Dice 1 and ${p1Dice2} for Dice 2. <br>Choose the order of the dice.`;
  } else if (input == "Dice 1" && gameMode == "get p1 final") {
    player1Roll = concatenate2dice(p1Dice1, p1Dice2);
    allP1Rolls.push(player1Roll);
    gameMode = "roll p2 dice";
    return `Player 1, you chose Dice 1 first.<br>Your number is ${player1Roll}.<br>It is now Player 2's turn.`;
  } else if (input == "Dice 2" && gameMode == "get p1 final") {
    player1Roll = concatenate2dice(p1Dice2, p1Dice1);
    allP1Rolls.push(player1Roll);
    gameMode = "roll p2 dice";
    return `Player 1, you chose Dice 2 first.<br>Your number is ${player1Roll}.<br>It is now Player 2's turn.`;
  } else if (gameMode == "roll p2 dice") {
    p2Dice1 = getRandomNumber();
    p2Dice2 = getRandomNumber();
    gameMode = "get p2 final";
    return `Welcome Player 2. <br>You rolled ${p2Dice1} for Dice 1 and ${p2Dice2} for Dice 2. <br>Choose the order of the dice.`;
  } else if (input == "Dice 1" && gameMode == "get p2 final") {
    player2Roll = concatenate2dice(p2Dice1, p2Dice2);
    allP2Rolls.push(player2Roll);
    allP1Rolls = sortingDiceArray(allP1Rolls);
    allP2Rolls = sortingDiceArray(allP2Rolls);
    winner = whoWins(player1Roll, player2Roll);
    gameMode = "roll p1 dice";
    return `Player 2, you chose Dice 1 first.<br>Your number is ${player2Roll}.<br>It is now Player 2's turn. <br> Player 1 number is ${player1Roll}, ${winner}. <br><br> All Player 1 rolls: ${allP1Rolls}, Total Player 1 wins: ${p1WinCounts}. <br> All Player 2 rolls: ${allP2Rolls}, Total Player 2 wins ${p2WinCounts}.`;
  } else if (input == "Dice 2" && gameMode == "get p2 final") {
    player2Roll = concatenate2dice(p2Dice2, p2Dice1);
    winner = whoWins(player1Roll, player2Roll);
    allP2Rolls.push(player2Roll);

    gameMode = "roll p1 dice";
    return `Player 2, you chose Dice 2 first.<br>Your number is ${player2Roll}.<br>It is now Player 2's turn. <br> Player 1 number is ${player1Roll}, ${winner}<br><br> All Player 1 rolls: ${allP1Rolls}, Total Player 1 wins: ${p1WinCounts}. <br> All Player 2 rolls: ${allP2Rolls}, Total Player 2 wins: ${p2WinCounts}.`;
  }
};

function getRandomNumber() {
  var randomNumber = Math.floor(Math.random() * 6) + 1;
  return randomNumber;
}

function concatenate2dice(input1, input2) {
  finalDice = Number(String(input1) + String(input2));
  return finalDice;
}

function whoWins(input1, input2) {
  if (input1 > input2) {
    p1WinCounts += 1;
    return `Player 1 wins!`;
  } else if (input2 > input1) {
    p2WinCounts += 1;
    return `Player 2 wins!`;
  } else {
    return `Draw!`;
  }
}

function sortingDiceArray(input) {
  for (i = 0; i < input.length - 1; i++) {
    for (j = 0; j < input.length - 1; j++) {
      if (input[j] > input[j + 1]) {
        var temp = input[j];
        input[j] = input[j + 1];
        input[j + 1] = temp;
      }
    }
  }
  var sortedArray = input;
  return sortedArray;
}
