var getDiceNum = "Rolling dices";
var getFinalNum = "Player deciding submission number";
var currentGameState = getDiceNum;
var currentPlayer = 1;

var p1DiceNumbers = [];
var p2DiceNumbers = [];
var p1FinalNumbers = [];
var p2FinalNumbers = [];
var p1Decision = 0;
var p2Decision = 0;

//random dice roll number
var randomDiceRoll = function () {
  return Math.floor(Math.random() * 6) + 1;
};

//Decide who wins
var whoWins = function (p1Guess, p2Guess) {
  if (p1Guess > p2Guess) {
    return "Player One Wins";
  }
  if (p1Guess == p2Guess) {
    return "It's a draw.";
  }
  return "Player Two Wins";
};

var main = function (input) {
  if (currentPlayer == 1 && currentGameState == getDiceNum && input == "") {
    p1DiceNumbers[0] = randomDiceRoll();
    p1DiceNumbers[1] = randomDiceRoll();
    console.log(p1DiceNumbers);
    currentGameState = getFinalNum;
    return `Player One rolled ${p1DiceNumbers}, please input 1 or 2 to decide which dice roll you want to go first to create your biggest number.`;
  }

  if (currentPlayer == 1 && currentGameState == getFinalNum && input == 1) {
    p1Decision = Number("" + p1DiceNumbers[0] + p1DiceNumbers[1]);
    p1FinalNumbers.push(p1Decision);
    currentGameState = getDiceNum;
    currentPlayer = 2;
    return `Player One's final number is ${p1Decision}.<br>Player Two, please click submit to get your dice numbers`;
  }

  if (currentPlayer == 1 && currentGameState == getFinalNum && input == 2) {
    console.log(p1DiceNumbers);
    p1Decision = Number("" + p1DiceNumbers[1] + p1DiceNumbers[0]);
    p1FinalNumbers.push(p1Decision);
    currentGameState = getDiceNum;
    currentPlayer = 2;
    return `Player One's final number is ${p1Decision}.<br>Player Two, please click submit to get your dice numbers`;
  }

  if (currentPlayer == 2 && currentGameState == getDiceNum && input == "") {
    p2DiceNumbers[0] = randomDiceRoll();
    p2DiceNumbers[1] = randomDiceRoll();
    console.log(p2DiceNumbers);
    currentGameState = getFinalNum;
    return `Player Two rolled ${p2DiceNumbers}, please input 1 or 2 to decice which dice roll you want to go firs to create your biggest number.`;
  }

  if (currentPlayer == 2 && currentGameState == getFinalNum && input == 1) {
    p2Decision = Number("" + p2DiceNumbers[0] + p2DiceNumbers[1]);
    console.log(p1Decision, typeof p1Decision);
    console.log(p2Decision, typeof p2Decision);
    winner = whoWins(p1Decision, p2Decision);
    currentGameState = getDiceNum;
    currentPlayer = 1;
    return `${winner}<br>Click submit to play again.`;
  }
  if (currentPlayer == 2 && currentGameState == getFinalNum && input == 2) {
    p2Decision = Number("" + p2DiceNumbers[1] + p2DiceNumbers[0]);
    console.log(p1Decision, typeof p1Decision, "p1decsion");
    console.log(p2Decision, typeof p2Decision, "p2decsion");
    winner = whoWins(p1Decision, p2Decision);
    currentGameState = getDiceNum;
    currentPlayer = 1;
    return `${winner}<br>Click submit to play again.`;
  }
};
