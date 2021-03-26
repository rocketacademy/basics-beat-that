// generate random dice number
function rollDice() {
  let randomNum = Math.floor(Math.random() * 6) + 1;
  return randomNum;
}
// arrange the order of dices as per user input.
function arrangeDice(userInput, firstDice, secondDice) {
  let arrangedResult;
  if (userInput == 'dice1') {
    diceOrder = 'dice1';
  }
  else {
    diceOrder = 'dice2';
  }
  if (diceOrder == 'dice1') {
    arrangedResult = `${firstDice}${secondDice}`;
  }
  else {
    arrangedResult = `${secondDice}${firstDice}`;
  }
  return Number(arrangedResult);
}
// function is used for finding winner with highest (normal) as well as lowest score modes.
function findLeadingPlayer(scorePlayer1, scorePlayer2, mode) {
  let winningMessage;
  let score1 = scorePlayer1;
  let score2 = scorePlayer2;
  if (score1 > score2) {
    if (mode == 'lowest') {
      winningMessage = `player2 WINS. <br> Has lowest score of ${score2}`;
    }
    else {
      winningMessage = 'player1 is leading! Let\'s play again.';
    }
  }
  else if (score1 < score2) {
    if (mode == 'lowest') {
      winningMessage = `player1 WINS. <br> Has lowest score of ${score1}`;
    }
    else {
      winningMessage = 'player2 is leading! Let\'s play again.';
    }
  }
  else {
    winningMessage = 'No one is leading at the moment. Let\'s play again.';
  }
  return winningMessage;
}
function autoGenNumber(rolledNumArray) {
  let array = rolledNumArray;
  let finalNumber = 0;
  let length = array.length;
  for (let i = 0; array.length >= 1; i++) {
    let max = Math.max.apply(null, array);
    finalNumber = finalNumber * 10 + max;
    rolledNumArray = array.splice(array.indexOf(max), 1);
  }
  return finalNumber;
}
function setMode(userInput, currentMode) {
  let mode;
  if (userInput == 'manual') {
    mode = 'manual';
  }
  else if (userInput == 'auto') {
    mode = 'auto';
  }
  return mode;
}

let player1Total = 0;
let player2Total = 0;
let firstRoll; let secondRoll;
let currentTurn = 'player1'; let changedTurn;
let diceOrder;
let roundsPlayed = 0;
let player1AllScores = [];
let player2AllScores = [];
let player1Dices = [];
let player2Dices = [];
let mode = 'playing';

var main = function (input) {
  // on submit dice is rolled
  let message;
  let resultedNumber;
  if (roundsPlayed < 2) {
    if (mode == 'playing') {
      firstRoll = rollDice();
      secondRoll = rollDice();
      message = `Welcome ${currentTurn}. <br> You rolled ${firstRoll} for Dice 1 and ${secondRoll} for Dice 2.<br> type 'manual' or 'auto' to chose mode to generate number.`;
      mode = 'choosing';
      return message;
    }
    if (mode == 'choosing') {
      mode = setMode(input);
      if (mode == 'manual') {
        return `${mode} is set. <br> Choose the order of the dice (i.e dice1 or dice2).`;
      }
      return `${mode} is set. <br> press 'submit' to see auto chosen number.`
    }
    if (mode == 'manual') {
      console.log('choosing mode works');
      resultedNumber = arrangeDice(input, firstRoll, secondRoll);
    }
    else if (mode == 'auto' && currentTurn == 'player1') {
      player1Dices.push(firstRoll);
      player1Dices.push(secondRoll);
      resultedNumber = autoGenNumber(player1Dices);
    }
    else if (mode == 'auto' && currentTurn == 'player2') {
      player2Dices.push(firstRoll);
      player2Dices.push(secondRoll);
      resultedNumber = autoGenNumber(player2Dices);
    }
    if (currentTurn == 'player1') {
      changedTurn = 'player2';
      player1Total += resultedNumber;
      player1AllScores.push(resultedNumber);
    }
    else {
      changedTurn = 'player1';
      player2Total += resultedNumber;
      player2AllScores.push(resultedNumber);
    }

    message = `${currentTurn}, you chose ${diceOrder} first. <br>Your number is ${resultedNumber}.<br>
    It is now ${changedTurn}'s turn.`;

    if (currentTurn == 'player1') {
      currentTurn = 'player2';
      console.log(`playing turn changed to ${currentTurn}`);
    }
    mode = 'playing';
    roundsPlayed += 1;
    console.log(`rounds Played: ${roundsPlayed}`);
    if (roundsPlayed == 2) {
      message += '<br> round is over. press submit to view the result in normal mode <br> or type lowest to winner with lowest total';
      return message;
    }
  }
  else if (roundsPlayed == 2) {
    let winningMode;
    if (input == '') {
      winningMode = 'normal';
    }
    else if (input == 'lowest') {
      winningMode = 'lowest';
    }
    console.log('player1 total: ' + player1Total + ' and player 2 total is: ' + player2Total);
    message = findLeadingPlayer(player1Total, player2Total, winningMode) + `<br> player1's scores are: ${player1AllScores.sort().reverse()} <br> player2's scores are: ${player2AllScores.sort().reverse()}`;
    // reset the rounds
    roundsPlayed = 0;
    currentTurn = 'player1';
  }
  return message;
};
