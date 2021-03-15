// random number
function rollDice() {
  let randomNum = Math.floor(Math.random() * 6) + 1;
  return randomNum;
}

// two players
let player1Total;
let player2Total;
let currentTurn = 'player1';
let changedTurn;
let diceOrder;
let mode = 'playing';
let firstRoll;
let secondRoll;
let roundsPlayed = 0;


var main = function (input) {
  // on submit dice is rolled
  let message;
  let resultedNumber;
  if (mode == 'playing') {
    firstRoll = rollDice();
    secondRoll = rollDice();
    message = `Welcome ${currentTurn}. You rolled ${firstRoll} for Dice 1 and ${secondRoll} for Dice 2.Choose the order of the dice.`;
    // switch players

    mode = 'choosing';
    console.log(`current mode changed to ${mode}`);
  }
  else if (mode == 'choosing') {
    console.log('choosing mode works');
    if (input == 'Dice 1') {
      diceOrder = 'Dice 1';
    }
    else {
      diceOrder = 'Dice 2';
    }
    if (diceOrder == 'Dice 1') {
      resultedNumber = `${firstRoll}${secondRoll}`;
    }
    else {
      resultedNumber = `${secondRoll}${firstRoll}`;
    }
    if (currentTurn == 'player1') {
      changedTurn = 'player2';
    }
    else {
      changedTurn = 'player1';
    }
    message = `${currentTurn}, you chose ${diceOrder} first.Your number is ${resultedNumber}.
    It is now ${changedTurn}'s turn.`;
    if (currentTurn == 'player1') {
      player1Total = resultedNumber;
      currentTurn = 'player2';
      console.log(`playing turn changed to ${currentTurn}`);
    }
    else {
      player2Total = resultedNumber;
    }
    mode = 'playing';
    roundsPlayed += 1;
    console.log(`roundsPlayer: ${roundsPlayed}`);
  }
  if (roundsPlayed == 2) {
    player1Total = Number(player1Total);
    console.log(player1Total);
    player2Total = Number(player2Total);
    console.log(player2Total);
    if (player1Total > player2Total) {
      message = `player1 wins! Let's play again.`;
    }
    else {
      message = `player2 wins! Let's play again.`;
    }
    //reset the rounds
    roundsPlayed = 0;
    currentTurn = 'player1';
  }
  return message;
};
