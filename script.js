//Declare Global Variables
let currentNumberRolled,
  gameMessage,
  player1Number = 0,
  player2Number = 0,
  currentDiceOrder,
  player1Score = 0,
  player2Score = 0;

//Main Function
let main = function (input, myOutputValue) {
  if (player1Number && player2Number) {
    evalutateWinner();
    scoreRecord();
    resetGame();
  } else if (!player1Number && !currentNumberRolled) {
    currentNumberRolled = rollTwoDice();
    gameMessage = `Welcome Player 1.<br>You rolled ${currentNumberRolled[0]} for Dice 1 and ${currentNumberRolled[1]} for Dice 2.<br>Choose the order of the dice, type "1" for Dice 1 first and type "2" for Dice 2 first`;
  } else if (!player1Number && currentNumberRolled) {
    if (input == `1` || input == `2`) {
      currentDiceOrder = Number(input);
      player1Number = combineDiceNumber();
      gameMessage = `Player 1, you chose Dice ${currentDiceOrder} first.<br>Your number is ${player1Number}.<br>It is now Player 2's turn.`;
      semiResetGame();
    } else
      gameMessage = `Invalid input.<br>You rolled ${currentNumberRolled[0]} for Dice 1 and ${currentNumberRolled[1]} for Dice 2.<br>Choose the order of the dice, type "1" for Dice 1 first and type "2" for Dice 2 first.`;
  } else if (!player2Number && !currentNumberRolled) {
    currentNumberRolled = rollTwoDice();
    gameMessage = `Welcome Player 2.<br>You rolled ${currentNumberRolled[0]} for Dice 1 and ${currentNumberRolled[1]} for Dice 2.<br>Choose the order of the dice, type "1" for Dice 1 first and type "2" for Dice 2 first.`;
  } else if (!player2Number && currentNumberRolled) {
    if (input == `1` || input == `2`) {
      currentDiceOrder = Number(input);
      player2Number = combineDiceNumber();
      gameMessage = `Player 2, you chose Dice ${currentDiceOrder} first.<br>Your number is ${player2Number}. Press sumbmit to reveal winner.`;
    } else
      gameMessage = `Invalid input.<br>You rolled ${currentNumberRolled[0]} for Dice 1 and ${currentNumberRolled[1]} for Dice 2.<br>Choose the order of the dice, type "1" for Dice 1 first and type "2" for Dice 2 first.`;
  }
  myOutputValue =
    gameMessage +
    `<br><br>Player 1 total:${player1Score}<br>Player 2 total:${player2Score}`;
  return myOutputValue;
};

//Generate 2 numbers from dice roll
let rollTwoDice = () => [
  Math.floor(Math.random() * 6) + 1,
  Math.floor(Math.random() * 6) + 1,
];

//Concatenate the rolls to form new number
function combineDiceNumber() {
  switch (currentDiceOrder) {
    case 1:
      return Number(`${currentNumberRolled[0]}` + `${currentNumberRolled[1]}`);
    case 2:
      return Number(`${currentNumberRolled[1]}` + `${currentNumberRolled[0]}`);
  }
}

//Compare both numbers to determine winner
function evalutateWinner() {
  gameMessage =
    player1Number > player2Number
      ? `Winner is Player 1 with ${player1Number} over Player 2 with ${player2Number}.`
      : player1Number < player2Number
      ? `Winner is Player 2 with ${player2Number} over Player 1 with ${player1Number}.`
      : player1Number == player2Number
      ? `It is a draw with both players getting ${player1Number}.`
      : `Error with evaluating winner.`;
}

//Reset entire game state
function resetGame() {
  player1Number = null;
  player2Number = null;
  currentDiceOrder = null;
  currentNumberRolled = null;
}

//Reset game state for next player
function semiResetGame() {
  currentDiceOrder = null;
  currentNumberRolled = null;
}

function scoreRecord() {
  player1Score += player1Number;
  player2Score += player2Number;
}
