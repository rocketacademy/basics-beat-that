var getDiceNum = "Rolling dices";
var getFinalNum = "Player deciding submission number";
var autogenNumHigh = "Auto-Generate Combined number (highest)";
var autogenNumLow = "Auto-Generate Combined number (lowest)";
var currentGameState = getDiceNum;
var currentPlayer = 1;

var diceNumbers = [];
var p1FinalNumbers = [];
var p2FinalNumbers = [];
var p1Decision = 0;
var p2Decision = 0;
var p1CompDecision = 0;
var p2CompDecision = 0;

//random dice roll number
var randomDiceRoll = function () {
  return Math.floor(Math.random() * 6) + 1;
};
var twoDiceRolls = function () {
  var counterDiceRolls = 0;
  while (counterDiceRolls < 2) {
    randomDice = randomDiceRoll();
    diceNumbers.push(randomDice);
    counterDiceRolls += 1;
  }
};

//decide who wins round
var whoWinsRound = function (p1Guess, p2Guess) {
  if (p1Guess > p2Guess) {
    return `Player One's number is ${p1Guess} & Player Two's number is ${p2Guess}.<br> Player One wins this round.`;
  }

  if (p1Guess == p2Guess) {
    return `Player One's number is ${p1Guess} & Player Two's number is ${p2Guess}.<br> It's a draw for this round.`;
  }

  return `Player One's number is ${p1Guess} & Player Two's number is ${p2Guess}.<br> Player Two wins this round.`;
};

//Decide who wins overall and leaderboard
var whoWinsOverall = function () {
  var p1OverallScore = 0;
  var p2OverallScore = 0;
  var counter = 0;
  while (counter < p1FinalNumbers.length) {
    p1OverallScore += p1FinalNumbers[counter];
    p2OverallScore += p2FinalNumbers[counter];
    counter += 1;
  }
  if (p1OverallScore > p2OverallScore) {
    return `<u>Leaderboard</u><br>Player One Total: ${p1OverallScore} <br>Player Two Total: ${p2OverallScore} <br>Player One Wins Overall!!!`;
  }
  if (p1OverallScore == p2OverallScore) {
    return `<u>Leaderboard</u><br>Player One Total: ${p1OverallScore} <br>Player Two Total: ${p2OverallScore} <br>It's a Draw!!!`;
  }
  return `<u>Leaderboard</u><br>Player Two Total: ${p2OverallScore} <br>Player One Total: ${p1OverallScore} <br>Player Two Wins Overall!!!`;
};

//auto-generate combined number
var diceOne = diceNumbers[0];
var diceTwo = diceNumbers[1];

var autogenHighNum = function (diceOne, diceTwo) {
  if (diceOne <= diceTwo) {
    return Number("" + diceTwo + diceOne);
  }
  if (diceTwo < diceOne) {
    return Number("" + diceOne + diceTwo);
  }
};

var autogenLowNum = function (diceOne, diceTwo) {
  if (diceTwo <= diceOne) {
    return Number("" + diceOne + diceTwo);
  }
  if (diceOne < diceTwo) {
    return Number("" + diceTwo + diceOne);
  }
};

var main = function (input) {
  var winnerRound = "";
  var winnerOverall = "";

  if (currentPlayer == 1 && currentGameState == getDiceNum && input == "") {
    twoDiceRolls();
    currentGameState = getFinalNum;
    return `Player One rolled ${diceNumbers}, please input 1 or 2 to decide which dice roll you want to go first to create your biggest number.`;
  }

  if (
    currentPlayer == 1 &&
    (input == "AutoHigh" || currentGameState == autogenNumHigh)
  ) {
    currentGameState = autogenNumHigh;
    currentPlayer = 2;
    diceNumbers[0] = randomDiceRoll();
    diceNumbers[1] = randomDiceRoll();
    p1CompDecision = autogenHighNum(diceNumbers[0], diceNumbers[1]);
    p1FinalNumbers.push(p1CompDecision);
    return `Player One rolled ${diceNumbers}, your highest number is ${p1CompDecision}.`;
  }

  if (currentPlayer == 2 && currentGameState == autogenNumHigh) {
    diceNumbers[0] = randomDiceRoll();
    diceNumbers[1] = randomDiceRoll();
    p2CompDecision = autogenHighNum(diceNumbers[0], diceNumbers[1]);
    p2FinalNumbers.push(p2CompDecision);
    winnerRound = whoWinsRound(p1CompDecision, p2CompDecision);
    winnerOverall = whoWinsOverall();
    currentPlayer = 1;
    return `Player Two rolled ${diceNumbers}, your highest number is ${p2CompDecision}.<br>${winnerRound} <br> <br>${winnerOverall}`;
  }

  if (currentPlayer == 1 && currentGameState == getFinalNum && input == 1) {
    p1Decision = Number("" + diceNumbers[0] + diceNumbers[1]);
    p1FinalNumbers.push(p1Decision);
    currentGameState = getDiceNum;
    currentPlayer = 2;
    diceNumbers = [];
    return `Player One's final number is ${p1Decision}.<br>Player Two, please click submit to get your dice numbers`;
  }

  if (currentPlayer == 1 && currentGameState == getFinalNum && input == 2) {
    p1Decision = Number("" + diceNumbers[1] + diceNumbers[0]);
    p1FinalNumbers.push(p1Decision);
    currentGameState = getDiceNum;
    currentPlayer = 2;
    diceNumbers = [];
    return `Player One's final number is ${p1Decision}.<br>Player Two, please click submit to get your dice numbers`;
  }

  if (currentPlayer == 2 && currentGameState == getDiceNum && input == "") {
    twoDiceRolls();
    currentGameState = getFinalNum;
    return `Player Two rolled ${diceNumbers}, please input 1 or 2 to decice which dice roll you want to go first to create your biggest number.`;
  }

  if (currentPlayer == 2 && currentGameState == getFinalNum && input == 1) {
    p2Decision = Number("" + diceNumbers[0] + diceNumbers[1]);
    p2FinalNumbers.push(p2Decision);
    winnerRound = whoWinsRound(p1Decision, p2Decision);
    winnerOverall = whoWinsOverall();
    currentGameState = getDiceNum;
    currentPlayer = 1;
    diceNumbers = [];
    return `${winnerRound}<br> <br>${winnerOverall}<br> <br>Click submit to continue playing.Alternatively, input "AutoHigh" to have the system autognerate the highest from your dice rolls.`;
  }
  if (currentPlayer == 2 && currentGameState == getFinalNum && input == 2) {
    p2Decision = Number("" + diceNumbers[1] + diceNumbers[0]);
    p2FinalNumbers.push(p2Decision);
    winnerRound = whoWinsRound(p1Decision, p2Decision);
    winnerOverall = whoWinsOverall();
    currentGameState = getDiceNum;
    currentPlayer = 1;
    diceNumbers = [];
    return `${winnerRound}<br> <br>${winnerOverall}<br> <br>Click submit to continue playing.<br>Alternatively, input "AutoHigh" to have the system autognerate the highest from your dice rolls.`;
  }
};
