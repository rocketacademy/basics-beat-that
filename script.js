// Please fill out the survey before submitting the pull request. Thanks!

// 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
// How many hours did you spend on this assignment?
// 7
// Please fill in one error and/or error message you received while working on this assignment.
// the nonstop syntax issues telling me I have 1 too much }
// What part of the assignment did you spend the most time on?
// debugging my validity logic and also the duplicate checking
// Comfort Level (1-5):
//3
// Completeness Level (1-5):
//3
// What did you think of this deliverable?
// I tried. However I feel like i am limited to what I can do because I don't know too much.
// Is there anything in this code that you feel pleased about?
// I have the ability to set the dice amounts in this game

// There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.
//
// plan:
// gameState 0 should be default and show nothing, but click submit to start rolling to p1
// gameState 1, 3should show you Player's rolls and asks you to key in option 1 or option 2
// gameState 2, 4 should show u the result of the corresponding player. it then proceeds to start the next roll
// gameState 5 should be a winner screen, comparing the results, then submitting again should send back to state 0
let totalDice = 0;
let gameState = 0;
let recentRolls = [];
let player1Hand = "";
let player2Hand = "";
let playerTurn = 1;

//main game
function main(input) {
  if (totalDice === 0) {
    if (
      !isNaN(input) &&
      input !== undefined &&
      input !== "" &&
      input < 6 &&
      input > 0
    ) {
      totalDice = input;
      return `Total amount of Dice set to ${input}!`;
    } else {
      return `Please set the amount of dice first! Type in a number! Max dice is 5!`;
    }
  }
  if (gameState === 0 || gameState === 2) {
    if (!(input === "")) {
      return `Hello ${callPlayer(
        playerTurn
      )}!<br>Do NOT type anything and submit to start the round!`;
    }
    rollDice();
    gameState += 1;
    return showOptions(recentRolls);
  } else if (gameState === 1 || gameState === 3) {
    if (!validP1P3(input)) {
      return `ERROR 1. Please input ${totalDice} numbers ONLY! And they should not have any repeats! The numbers are ${recentRolls}`;
    }
    let splitNumbers = input.split("");
    console.log(`splitNumbers = ${splitNumbers}`);
    if (checkDupes(splitNumbers) === false) {
      return `ERROR 2.Please input ${totalDice} numbers ONLY! And they should not have any repeats! The numbers are ${recentRolls}`;
    }
    if (checkNumbers(splitNumbers) === false) {
      return `ERROR 3.Please input ${totalDice} numbers ONLY! And they should not have any repeats! The numbers are ${recentRolls}`;
    }
    if (playerTurn === 1) {
      for (let i = 0; i < splitNumbers.length; i += 1) {
        player1Hand += recentRolls[splitNumbers[i] - 1];
      }
    } else {
      for (let i = 0; i < splitNumbers.length; i += 1) {
        player2Hand += recentRolls[splitNumbers[i] - 1];
      }
    }
    let message = "";
    if (playerTurn === 1) {
      message = `${callPlayer(
        playerTurn
      )} has opted for ${player1Hand}! Press Submit to proceed to Player 2's turn!`;
    } else {
      message = `${callPlayer(
        playerTurn
      )} has opted for ${player2Hand}! Press Submit to head towards the resolution!`;
    }
    if (playerTurn === 1) {
      playerTurn = 2;
    } else {
      playerTurn = 1;
    }
    gameState += 1;
    recentRolls = [];
    return message;
  } else {
    gameState = 0;
    winnerMessage = compareScores(player1Hand, player2Hand);
    player1Hand = "";
    player2Hand = "";
    return winnerMessage;
  }
}

// // differentiating between the player

function callPlayer(playerTurn) {
  if (playerTurn === 1) {
    return "Player 1";
  } else {
    return "Player 2";
  }
}

//roll2dice

function rollDice() {
  for (let i = 0; totalDice > i; i += 1) {
    recentRolls.push(Math.ceil(Math.random() * 6));
  }
  console.log(recentRolls);
  return;
}
// a function to show options
function showOptions(playerRolls) {
  return `Hello ${callPlayer(
    playerTurn
  )}! Your rolls are ${playerRolls}. Please key in the order you prefer the dice to go in! (Example: 2431 means 2nd dice, 4th dice, 3rd dice then 1st dice respectively!)`;
}

// checking duplicates
function checkDupes(testsubject) {
  for (let i = 0; i < testsubject.length; i++) {
    for (let j = i + 1; j < testsubject.length; j++) {
      if (testsubject[i] === testsubject[j]) {
        return false;
      }
    }
  }
  return true;
}

//comparing scores and setting it to
function compareScores(player1Hand, player2Hand) {
  let winner = "";
  Number(player1Hand);
  Number(player2Hand);
  if (player1Hand === player2Hand) {
    return `It is a draw! Both players have rolled ${player1Hand}. Hit submit to reset the game!`;
  } else {
    if (player1Hand > player2Hand) {
      winner = "Player 1";
    } else {
      winner = "Player 2";
    }
    return `${winner} has won! Player 1 rolled ${player1Hand} while Player 2 rolled ${player2Hand}. Hit submit to reset the game!`;
  }
}

//function validP1P3

function validP1P3(input) {
  return (
    !isNaN(input) &&
    input !== "" &&
    input.length === Number(totalDice) &&
    input.length !== 0 &&
    input !== undefined
  );
}

function checkNumbers(input) {
  for (let i = 0; i < input.length; i++) {
    if (input[i] > recentRolls.length || input[i] < 1) {
      return false;
    }
  }
}
