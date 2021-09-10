// 2 players to roll 2 dice each
// need 2 modes, one for each player.
var mode1 = `Player One's Turn!`;
var mode1_1 = `Player One is selecting dice order.`;
var mode1_2 = `Reverse Mode Player One's Turn!`;
var mode1_3 = `Reverse Mode Player One is selecting Dice Order`;
var mode2 = `Player Two's Turn!`;
var mode2_1 = `Player Two is selecting dice order.`;
var mode2_2 = `Reverse Mode Player Two's Turn!`;
var mode2_3 = `Reverse Mode Player Two is selecting Dice Order`;
var mode3 = `Default Screen`;
var mode3_1 = `Reverse Default Screen`;
var mode4 = `Score Tally`;
var mode4_2 = `Reverse Score Tally`;
var mode5 = `Select Game Mode`;
var currentGameMode = mode5;
var playerOneFirstRoll = 0;
var playerOneSecondRoll = 0;
var playerTwoFirstRoll = 0;
var playerOneSecondRoll = 0;
var playerOneCounter = 0;
var playerTwoCounter = 0;
var playerOneScore = 0;
var playerTwoScore = 0;
var playerOneTotalScore = 0;
var playerTwoTotalScore = 0;

var playerOneRecord = [];
var playerTwoRecord = [];

var rollDice = function () {
  var resultDice = Math.ceil(Math.random() * 6);
  return resultDice;
};
//Found this online, I have no real idea how the heck this works but it somehow works...!?
var scoreSort = function (a, b) {
  return a - b;
};

var main = function (input) {
  if (currentGameMode == mode4_2 && playerOneTotalScore < playerTwoTotalScore) {
    playerOneCounter += 1;
    currentGameMode = mode3_1;
    var sortedPlayerOneScore = playerOneRecord.sort(scoreSort);
    var sortedPlayerTwoScore = playerTwoRecord.sort(scoreSort);
    return `Player One Wins!! <br>The current score is <br> Player One : ${playerOneTotalScore}!! <br>Player Two : ${playerTwoTotalScore}!! <br>The current number of wins each player has is <br>Player One : ${playerOneCounter}!! <br>Player Two : ${playerTwoCounter}!!<br>Player One Record: ${sortedPlayerOneScore} <br>Player Two Record: ${sortedPlayerTwoScore}`;
  }
  if (currentGameMode == mode4_2 && playerOneTotalScore > playerTwoTotalScore) {
    playerTwoCounter += 1;
    currentGameMode = mode3_1;
    var sortedPlayerOneScore = playerOneRecord.sort(scoreSort);
    var sortedPlayerTwoScore = playerTwoRecord.sort(scoreSort);
    return `Player Two Wins!! <br>The current score is <br> Player One : ${playerOneTotalScore}!! <br>Player Two : ${playerTwoTotalScore}!! <br>The current number of wins each player has is <br>Player One : ${playerOneCounter}!! <br>Player Two : ${playerTwoCounter}!!<br>Player One Record: ${sortedPlayerOneScore} <br>Player Two Record: ${sortedPlayerTwoScore}`;
  }
  if (
    currentGameMode == mode4_2 &&
    playerOneTotalScore == playerTwoTotalScore
  ) {
    currentGameMode = mode3_1;
    var sortedPlayerOneScore = playerOneRecord.sort(scoreSort);
    var sortedPlayerTwoScore = playerTwoRecord.sort(scoreSort);
    return `Its a draw!! <br>The current score is <br> Player One : ${playerOneTotalScore}!! <br>Player Two : ${playerTwoTotalScore}!! <br>The current number of wins each player has is <br>Player One : ${playerOneCounter}!! <br>Player Two : ${playerTwoCounter}!!<br>Player One Record: ${sortedPlayerOneScore} <br>Player Two Record: ${sortedPlayerTwoScore}`;
  }
  if (currentGameMode == mode4 && playerOneTotalScore > playerTwoTotalScore) {
    playerOneCounter += 1;
    currentGameMode = mode3;
    var sortedPlayerOneScore = playerOneRecord.sort(scoreSort);
    var sortedPlayerTwoScore = playerTwoRecord.sort(scoreSort);
    return `Player One Wins!! <br>The current score is <br> Player One : ${playerOneTotalScore}!! <br>Player Two : ${playerTwoTotalScore}!! <br>The current number of wins each player has is <br>Player One : ${playerOneCounter}!! <br>Player Two : ${playerTwoCounter}!!<br>Player One Record: ${sortedPlayerOneScore} <br>Player Two Record: ${sortedPlayerTwoScore}`;
  }
  if (currentGameMode == mode4 && playerOneTotalScore < playerTwoTotalScore) {
    playerTwoCounter += 1;
    currentGameMode = mode3;
    var sortedPlayerOneScore = playerOneRecord.sort(scoreSort);
    var sortedPlayerTwoScore = playerTwoRecord.sort(scoreSort);
    return `Player Two Wins!! <br>The current score is <br> Player One : ${playerOneTotalScore}!! <br>Player Two : ${playerTwoTotalScore}!! <br>The current number of wins each player has is <br>Player One : ${playerOneCounter}!! <br>Player Two : ${playerTwoCounter}!!<br>Player One Record: ${sortedPlayerOneScore} <br>Player Two Record: ${sortedPlayerTwoScore}`;
  }
  if (currentGameMode == mode4 && playerOneTotalScore == playerTwoTotalScore) {
    currentGameMode = mode3;
    var sortedPlayerOneScore = playerOneRecord.sort(scoreSort);
    var sortedPlayerTwoScore = playerTwoRecord.sort(scoreSort);
    return `Its a draw!! <br>The current score is <br> Player One : ${playerOneTotalScore}!! <br>Player Two : ${playerTwoTotalScore}!! <br>The current number of wins each player has is <br>Player One : ${playerOneCounter}!! <br>Player Two : ${playerTwoCounter}!!<br>Player One Record: ${sortedPlayerOneScore} <br>Player Two Record: ${sortedPlayerTwoScore}`;
  }
  if (currentGameMode == mode5 && input == `Normal`) {
    currentGameMode = mode1;
    return `It is now Player One's Turn`;
  }
  if (currentGameMode == mode3 && input == `Ready`) {
    currentGameMode = mode1;
    return `It is now Player One's Turn`;
  }
  if (currentGameMode == mode1) {
    var diceOne = rollDice();
    playerOneFirstRoll = diceOne;
    console.log(`Your first dice roll is ${diceOne}`);
    var diceTwo = rollDice();
    playerOneSecondRoll = diceTwo;
    console.log(`Your Second dice roll is ${diceTwo}`);
    currentGameMode = mode1_1;
    return `Dice One : ${diceOne}<br>Dice Two : ${diceTwo}<br>Please select the first dice`;
  }
  if (currentGameMode == mode1_1) {
    if (input == "One") {
      playerOneScore = playerOneFirstRoll * 10 + playerOneSecondRoll;
      playerOneTotalScore += playerOneScore;
      console.log(`Player One's score is ${playerOneScore}`);
      playerOneRecord.push(playerOneScore);
      currentGameMode = mode2;
      return `Your score is ${playerOneScore}. <br> It is now the next player's turn.`;
    }
    if (input == "Two") {
      playerOneScore = playerOneSecondRoll * 10 + playerOneFirstRoll;
      console.log(`Player One's score is ${playerOneScore}`);
      playerOneRecord.push(playerOneScore);
      playerOneTotalScore += playerOneScore;
      currentGameMode = mode2;
      return `Your score is ${playerOneScore}. <br> It is now the next player's turn.`;
    } else return `Please only enter either One or Two`;
  }
  if (currentGameMode == mode2) {
    var diceOne = rollDice();
    playerTwoFirstRoll = diceOne;
    console.log(`Your first dice roll is ${diceOne}`);
    var diceTwo = rollDice();
    playerTwoSecondRoll = diceTwo;
    console.log(`Your Second dice roll is ${diceTwo}`);
    currentGameMode = mode2_1;
    return `Dice One : ${diceOne}<br>Dice Two : ${diceTwo}<br>Please select the first dice`;
  }
  if (currentGameMode == mode2_1) {
    if (input == "One") {
      playerTwoScore = playerTwoFirstRoll * 10 + playerTwoSecondRoll;
      console.log(`Player Two's score is ${playerTwoScore}`);
      playerTwoRecord.push(playerTwoScore);
      playerTwoTotalScore += playerTwoScore;
      currentGameMode = mode4;
      return `Your score is ${playerTwoScore}. <br> It is now time to tally the score!.`;
    }
    if (input == "Two") {
      playerTwoScore = playerTwoSecondRoll * 10 + playerTwoFirstRoll;
      console.log(`Player Two's score is ${playerTwoScore}`);
      playerTwoRecord.push(playerTwoScore);
      playerTwoTotalScore += playerTwoScore;
      currentGameMode = mode4;
      return `Your score is ${playerTwoScore}. <br> It is now time to tally the score!.`;
    }
  }
  if (currentGameMode == mode5 && input == `Reverse`) {
    currentGameMode = mode1_2;
    return `It is now Player One's Turn`;
  }
  if (currentGameMode == mode3_1 && input == `Ready`) {
    currentGameMode = mode1_2;
    return `It is now Player One's Turn`;
  }

  if (currentGameMode == mode1_2) {
    var diceOne = rollDice();
    playerOneFirstRoll = diceOne;
    console.log(`Your first dice roll is ${diceOne}`);
    var diceTwo = rollDice();
    playerOneSecondRoll = diceTwo;
    console.log(`Your Second dice roll is ${diceTwo}`);
    currentGameMode = mode1_3;
    return `Dice One : ${diceOne}<br>Dice Two : ${diceTwo}<br>Please select the first dice`;
  }
  if (currentGameMode == mode1_3) {
    if (input == "One") {
      playerOneScore = playerOneFirstRoll * 10 + playerOneSecondRoll;
      playerOneTotalScore += playerOneScore;
      console.log(`Player One's score is ${playerOneScore}`);
      playerOneRecord.push(playerOneScore);
      currentGameMode = mode2_2;
      return `Your score is ${playerOneScore}. <br> It is now the next player's turn.`;
    }
    if (input == "Two") {
      playerOneScore = playerOneSecondRoll * 10 + playerOneFirstRoll;
      console.log(`Player One's score is ${playerOneScore}`);
      playerOneRecord.push(playerOneScore);
      playerOneTotalScore += playerOneScore;
      currentGameMode = mode2_2;
      return `Your score is ${playerOneScore}. <br> It is now the next player's turn.`;
    } else return `Please only enter either One or Two`;
  }
  if (currentGameMode == mode2_2) {
    var diceOne = rollDice();
    playerTwoFirstRoll = diceOne;
    console.log(`Your first dice roll is ${diceOne}`);
    var diceTwo = rollDice();
    playerTwoSecondRoll = diceTwo;
    console.log(`Your Second dice roll is ${diceTwo}`);
    currentGameMode = mode2_3;
    return `Dice One : ${diceOne}<br>Dice Two : ${diceTwo}<br>Please select the first dice`;
  }
  if (currentGameMode == mode2_3) {
    if (input == "One") {
      playerTwoScore = playerTwoFirstRoll * 10 + playerTwoSecondRoll;
      console.log(`Player Two's score is ${playerTwoScore}`);
      playerTwoRecord.push(playerTwoScore);
      playerTwoTotalScore += playerTwoScore;
      currentGameMode = mode4_2;
      return `Your score is ${playerTwoScore}. <br> It is now time to tally the score!.`;
    }
    if (input == "Two") {
      playerTwoScore = playerTwoSecondRoll * 10 + playerTwoFirstRoll;
      console.log(`Player Two's score is ${playerTwoScore}`);
      playerTwoRecord.push(playerTwoScore);
      playerTwoTotalScore += playerTwoScore;
      currentGameMode = mode4_2;
      return `Your score is ${playerTwoScore}. <br> It is now time to tally the score!.`;
    } else return `Please only enter either One or Two`;
  }
  if (currentGameMode == mode3) {
    return `Please type "Ready" when you are ready to begin`;
  }
  return `Please select "Normal" or "Reverse" mode`;
};
