/*
How many hours did you spend on this assignment?:
9~10 hours

What part of the assignment did you spend the most time on?:
Figuring out how to push the data and some issues with the sequence of the data collection,
caused my end result to be NaN.

How comfortable did you feel with this assignment? (1-5):
3

Is there anything in this code that you feel pleased about?:
Managed to complete the project with what I have learned.

What's one aspect of your code you would like specific, elaborate feedback on?:
not sure if i can refactored the function to get the best combination.
*/

/* REQUIREMENTS 

1. There are 2 players and players take turns.
2. When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
3. The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
4. After both players have rolled and chosen dice order, the player with the higher combined number wins.

*/

// Function for dice roll
function diceRoll() {
  let diceNum = Math.floor(Math.random() * 6) + 1;
  return diceNum;
}

// Player1 start first, so I will call the first mode as player1
let gameMode1 = "player1";
let gameMode2 = "player2";
let gameModeResult = "result";
let gameState = gameMode1;

// Player1&2 dice roll data
let diceRolledPlayer1 = [];
let diceRolledPlayer2 = [];

// Player 1&2 winning record
let numOfWinsFor1 = 0;
let numOfWinsFor2 = 0;

// Player 1&2 highest combination numbers
let player1Num = [];
let player2Num = [];

// Function when player1 click "submit" and generate 2 dice rolls.
function main(input) {
  let player1Submit = input;
  let output = "";

  if (gameState == gameMode1) {
    for (let i = 0; i < 2; i++) {
      let diceOfPlayer1 = diceRoll();
      diceRolledPlayer1.push(diceOfPlayer1);
    }
    let player1BestCombi = player1Combi();
    gameState = gameMode2;
    return (output = `Player 1 has rolled ${diceRolledPlayer1}. ${player1BestCombi}<br> It is now Player 2's turn.`);
  }
  // Function for player2 to click "submit" and generate 2 dice rolls.
  if (gameState == gameMode2) {
    for (i = 0; i < 2; i++) {
      diceOfPlayer2 = diceRoll();
      diceRolledPlayer2.push(diceOfPlayer2);
    }
    let player2BestCombi = player2Combi();
    gameState = gameModeResult;
    return (output = `Player 2 rolled ${diceRolledPlayer2}. ${player2BestCombi}<br> Press "Submit" to check on the result`);
  }

  // Call function compareResults to determine winner.
  if (gameState == gameModeResult) {
    finalResult = compareResults();
    return (output = `${finalResult}<br>Player 1: ${numOfWinsFor1}<br>Player 2: ${numOfWinsFor2}`);
  }
}

// Function to pick the highest combination for player 1
function player1Combi() {
  let best1Combi;
  let output;
  if (diceRolledPlayer1[0] > diceRolledPlayer1[1]) {
    best1Combi = diceRolledPlayer1[0] * 10 + diceRolledPlayer1[1];
    player1Num.push(best1Combi);

    output = `Your best combination is ${best1Combi}.`;
  } else {
    best1Combi = diceRolledPlayer1[1] * 10 + diceRolledPlayer1[0];
    player1Num.push(best1Combi);

    output = `Your best combination is ${best1Combi}.`;
  }

  return output;
}

// Function to pick the highest combination for player 2
function player2Combi() {
  let best2Combi;
  let output;
  if (diceRolledPlayer2[0] > diceRolledPlayer2[1]) {
    best2Combi = diceRolledPlayer2[0] * 10 + diceRolledPlayer2[1];
    player2Num.push(best2Combi);

    output = `Your best combination is ${best2Combi}.`;
  } else {
    best2Combi = diceRolledPlayer2[1] * 10 + diceRolledPlayer2[0];
    player2Num.push(best2Combi);

    output = `Your best combination is ${best2Combi}.`;
  }

  return output;
}

// Function to compare two results
function compareResults() {
  let output = "";

  if (player1Num > player2Num) {
    numOfWinsFor1 += 1;
    output = `Player 1 won!<br> Click the submit button for player 1 to roll the dice.`;
    gameState = gameMode1;
  }
  if (player1Num == player2Num) {
    output = `It is a draw! Try again.<br> Click the submit button for player 1 to roll the dice.`;
    gameState = gameMode1;
  }
  if (player1Num < player2Num) {
    numOfWinsFor2 += 1;
    output = `Player 2 won!<br> Click the submit button for player 1 to roll the dice.`;
    gameState = gameMode1;
  }
  diceRolledPlayer1 = [];
  diceRolledPlayer2 = [];
  player1Num = [];
  player2Num = [];
  return output;
}
