// There are 2 players and players take turns.
//global variables
var programMode = "getUsername";
var gameMode = "player1"; //change to player 2 afterwards
var diceNumbers = [];
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
function rollDice() {
  return Math.ceil(Math.random() * 6);
}

function getDiceNumbers() {
  //loop twice to get two numbers?
  for (i = 0; i < 2; i += 1) {
    diceNumbers.push(rollDice());
  }
  return `The dice numbers are ${diceNumbers}`;
}

// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
//use array then push in based on sequence? if user input number they want then have chance of mistake of better to choose based on which dice? maybe use index number
function arrangeSequence(firstChosenDice) {
  if (Number(firstChosenDice) === 1) {
    var combinedNumber =
      String(diceNumbers[firstChosenDice - 1]) + String(diceNumbers[1]);
    diceNumbers = []; //think of how not to repeat
  } else {
    combinedNumber =
      String(diceNumbers[firstChosenDice - 1]) + String(diceNumbers[0]);
    diceNumbers = [];
  }
  // gameMode = "player 2"; //change in main?

  return combinedNumber;
}
// After both players have rolled and chosen dice order, the player with the higher combined number wins.
function findWinner(number1, number2) {
  if (number1 === number2) {
    return "It's a draw";
  } else if (number1 > number2) {
    return "Player 1 wins";
  } else {
    return "Player 2 wins";
  }
}

//player 1 and player 2 to be able to choose different sequences
var main = function (input) {
  if (programMode === "getUsername") {
    username1 = input;
    username2 = input;
    programMode = "playGame";
  } else if (programMode === "playGame") {
    gameMode = "player1";
    var firstRound = getDiceNumbers();
    console.log(firstRound);
    gameMode = "chooseSequence";
    chosenFirstDice = input;
    var number1 = arrangeSequence(chosenFirstDice);
    gameMode = "player2";
    var secondRound = getDiceNumbers();
    console.log(secondRound);
    gameMode = "chooseSequence";
    chosenFirstDice = input;
    var number2 = arrangeSequence(chosenFirstDice);
    var winner = findWinner(number1, number2);
    return `The two numbers are ${number1} and ${number2}. ${winner}. Congratulations!`;
  }
};
