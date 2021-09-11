var getDiceNum = "Rolling dices";
var getFinalNum = "Player deciding submission number";
var currentGameState = getDiceNum;
var currentPlayer = 1;

var diceNumbers = [0, 0];
var p1FinalNumbers = [];
var p2FinalNumbers = [];
var p1Decision = 0;
var p2Decision = 0;

//random dice roll number
var randomDiceRoll = function () {
  return Math.floor(Math.random() * 6) + 1;
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

//Decide who wins overall
var whoWinsOverall = function () {
  var p1OverallScore = 0;
  var p2OverallScore = 0;
  var counter1 = 0;
  while (counter1 < p1FinalNumbers.length) {
    p1OverallScore += p1FinalNumbers[counter1];
    console.log(p1OverallScore, "player1currentscore");
    counter1 += 1;
  }

  var counter2 = 0;
  while (counter2 < p2FinalNumbers.length) {
    p2OverallScore += p2FinalNumbers[counter2];
    console.log(p2OverallScore, "player2currentscore");
    counter2 += 1;
  }
  console.log(p1OverallScore, "player 1 score");
  console.log(p2OverallScore, "player 2 score");
  if (p1OverallScore > p2OverallScore) {
    return `Player One Total: ${p1OverallScore} <br>Player Two Total: ${p2OverallScore} <br>Player One Wins Overall!!!`;
  }
  if (p1OverallScore == p2OverallScore) {
    return `Player One Total: ${p1OverallScore} <br>Player Two Total: ${p2OverallScore} <br>It's a Draw!!!`;
  }
  return `Player One Total: ${p1OverallScore} <br>Player Two Total: ${p2OverallScore} <br>Player Two Wins Overall!!!`;
};

var main = function (input) {
  var winnerRound = "";
  var winnerOverall = "";

  if (currentPlayer == 1 && currentGameState == getDiceNum && input == "") {
    diceNumbers[0] = randomDiceRoll();
    diceNumbers[1] = randomDiceRoll();
    console.log(diceNumbers);
    currentGameState = getFinalNum;
    return `Player One rolled ${diceNumbers}, please input 1 or 2 to decide which dice roll you want to go first to create your biggest number.`;
  }

  if (currentPlayer == 1 && currentGameState == getFinalNum && input == 1) {
    p1Decision = Number("" + diceNumbers[0] + diceNumbers[1]);
    p1FinalNumbers.push(p1Decision);
    console.log(p1FinalNumbers, "p1final number");
    currentGameState = getDiceNum;
    currentPlayer = 2;
    return `Player One's final number is ${p1Decision}.<br>Player Two, please click submit to get your dice numbers`;
  }

  if (currentPlayer == 1 && currentGameState == getFinalNum && input == 2) {
    console.log(diceNumbers);
    p1Decision = Number("" + diceNumbers[1] + diceNumbers[0]);
    p1FinalNumbers.push(p1Decision);
    console.log(p1FinalNumbers, "p1final number");
    currentGameState = getDiceNum;
    currentPlayer = 2;
    return `Player One's final number is ${p1Decision}.<br>Player Two, please click submit to get your dice numbers`;
  }

  if (currentPlayer == 2 && currentGameState == getDiceNum && input == "") {
    diceNumbers[0] = randomDiceRoll();
    diceNumbers[1] = randomDiceRoll();
    console.log(diceNumbers);
    currentGameState = getFinalNum;
    return `Player Two rolled ${diceNumbers}, please input 1 or 2 to decice which dice roll you want to go first to create your biggest number.`;
  }

  if (currentPlayer == 2 && currentGameState == getFinalNum && input == 1) {
    p2Decision = Number("" + diceNumbers[0] + diceNumbers[1]);
    console.log(p1Decision, typeof p1Decision);
    console.log(p2Decision, typeof p2Decision);
    p2FinalNumbers.push(p2Decision);
    console.log(p2FinalNumbers, "p2FinalNumbers");
    winnerRound = whoWinsRound(p1Decision, p2Decision);
    winnerOverall = whoWinsOverall();
    console.log(winnerRound, winnerOverall);
    currentGameState = getDiceNum;
    currentPlayer = 1;
    return `${winnerRound}<br> <br>${winnerOverall}<br> <br>Click submit to continue playing.`;
  }
  if (currentPlayer == 2 && currentGameState == getFinalNum && input == 2) {
    p2Decision = Number("" + diceNumbers[1] + diceNumbers[0]);
    console.log(p1Decision, typeof p1Decision, "p1decsion");
    console.log(p2Decision, typeof p2Decision, "p2decsion");
    p2FinalNumbers.push(p2Decision);
    console.log(p2FinalNumbers, "p2FinalNumbers");
    winnerRound = whoWinsRound(p1Decision, p2Decision);
    winnerOverall = whoWinsOverall();
    console.log(winnerRound, winnerOverall);
    currentGameState = getDiceNum;
    currentPlayer = 1;
    return `${winnerRound}<br> <br>${winnerOverall}<br> <br>Click submit to continue playing.`;
  }
};
