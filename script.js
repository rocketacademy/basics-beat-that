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
function findLeadingPlayer(scorePlayer1, scorePlayer2) {
  let winningMessage;
  let score1 = scorePlayer1;
  let score2 = scorePlayer2;
  if (score1 > score2) {
    winningMessage = 'player1 is leading! Let\'s play again.';
  }
  else if (score1 < score2) {
    winningMessage = 'player2 is leading! Let\'s play again.';
  }
  else {
    winningMessage = 'No one is leading at the moment. Let\'s play again.';
  }
  return winningMessage;
}

let player1Total = 0;
let player2Total = 0;
let firstRoll; let secondRoll;
let currentTurn = 'player1'; let changedTurn;
let diceOrder;
let mode = 'playing';
let roundsPlayed = 0;
let player1AllScores = [];
let player2AllScores = [];

var main = function (input) {
  // on submit dice is rolled
  let message;
  let resultedNumber;
  if (mode == 'playing') {
    firstRoll = rollDice();
    secondRoll = rollDice();
    message = `Welcome ${currentTurn}. <br> You rolled ${firstRoll} for Dice 1 and ${secondRoll} for Dice 2.<br> Choose the order of the dice (i.e dice1 or dice2).`;
    mode = 'choosing';
    console.log(`current mode changed to ${mode}`);
  }
  else if (mode == 'choosing') {
    console.log('choosing mode works');
    resultedNumber = arrangeDice(input, firstRoll, secondRoll);
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
    console.log(`roundsPlayer: ${roundsPlayed}`);
  }
  if (roundsPlayed == 2) {
    console.log('player1 total: ' + player1Total + ' and player 2 total is: ' + player2Total);
    message = findLeadingPlayer(player1Total, player2Total) + `<br> player1's scores are: ${player1AllScores.sort().reverse()} <br> player2's scores are: ${player2AllScores.sort().reverse()}`;
    // reset the rounds
    roundsPlayed = 0;
    currentTurn = 'player1';
  }
  return message;
};
