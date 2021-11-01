/*
1. There are 2 players and players take turns.
​
2. When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
​
3. The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
​
4. After both players have rolled and chosen dice order, the player with the higher combined number wins.
*/

// Global variables
var currentMode = "Roll the dice";
var myOutputValue = "";
var player = "Player 1";
var player1Results = "";
var player2Results = "";
var player1Score = 0;
var player2Score = 0;

// Generate die
var diceRollGenerator = function () {
  var randomDecimal = Math.random() * 6;
  var randomDiceRoll = Math.floor(randomDecimal) + 1;
  return randomDiceRoll;
};

// Specifying the 2 die
var diceRoll1 = diceRollGenerator();
var diceRoll2 = diceRollGenerator();

var orderOfDice = function (input) {
  var choice = "";
  switch (Number(input)) {
    case 1:
      choice = `${diceRoll1}${diceRoll2}`;
      break;
    case 2:
      choice = `${diceRoll2}${diceRoll1}`;
      break;
    default:
      choice = `${diceRoll1}${diceRoll2}`;
  }
  return choice;
};

// Running the game
var generateBeatThat = function (input) {
  if (currentMode == "Roll the dice") {
    diceRoll1 = diceRollGenerator();
    diceRoll2 = diceRollGenerator();
    myOutputValue = `Welcome ${player}. <br><br> You rolled ${diceRoll1} for Dice 1 and ${diceRoll2} for Dice 2. <br><br> ${player}, please input 1 or 2 to pick either Dice 1 or Dice 2 respectively as the first numeral of the combined number. <br><br> If input received isn't 1 or 2, 1 will be chosen as the default choice`;
    currentMode = "Dice rolled, choose number";
  } else if (
    currentMode == "Dice rolled, choose number" &&
    player == "Player 1"
  ) {
    player1Results = orderOfDice(input);
    myOutputValue = `${player}: ${player1Results}`;
    player = "Player 2";
    currentMode = "Roll the dice";
    myOutputValue += `<br><br> ${player}, It is now your turn to roll the die <br><br> Click submit to roll the die🎲.`;
  } else if (
    currentMode == "Dice rolled, choose number" &&
    player == "Player 2"
  ) {
    player2Results = orderOfDice(input);
    myOutputValue = `Player 1: You chose ${player1Results} <br><br> Player 2: You chose ${player2Results} <br><br> Click submit to view results. `;
    currentMode = "End play";
  } else if (currentMode == "End play") {
    if (player1Results > player2Results) {
      myOutputValue = ` Player 1: ${player1Results}.<br><br> Player 2: ${player2Results}. <br><br> Player 1 wins! <br><br> Click submit to view current score.`;
      player1Score++;
    } else if (player2Results > player1Results) {
      myOutputValue = ` Player 1: ${player1Results}. <br><br> Player 2: ${player2Results}.<br><br> Player 2 wins! <br><br> Click submit to view current score.`;
      player2Score++;
    } else if (player2Results == player1Results) {
      myOutputValue = ` Player 1: ${player1Results}. <br><br> Player 2: ${player2Results}.<br><br> It's a draw! <br><br> Click submit to view current score.`;
      player1Score++;
      player2Score++;
    }
    currentMode = "End score";
  } else if (currentMode == "End score") {
    if (player1Score > player2Score || player1Score == player2Score) {
      myOutputValue = `Scoreboard: <br><br>Player 1: ${player1Score} <br><br> Player 2: ${player2Score}<br><br> Click submit to start another round.`;
    } else if (player2Score > player1Score) {
      myOutputValue = `Scoreboard: <br><br> Player 2: ${player2Score}<br><br>Player 1: ${player1Score}<br><br> Click submit to start another round.`;
    }
    currentMode = "Restart";
    player = "Player 1";
  } else if (currentMode == "Restart" && player == "Player 1") {
    myOutputValue = `Player 1, please click submit to start rolling the dice 🎲`;
    currentMode = "Roll the dice";
  }
  return myOutputValue;
};

var main = function (input) {
  var beatThat = generateBeatThat(input);
  return beatThat;
};
