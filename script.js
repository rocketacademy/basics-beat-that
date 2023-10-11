//Declare Global Variables
let numberRolled, gameMessage, player1Number, player2Number, diceOrder;

//Main Function
let main = function (input, myOutputValue) {
  if (player1Number && player2Number) evalutateWinner();
  else if (!player1Number && !numberRolled) {
    numberRolled = rollTwoDice();
    gameMessage = `Welcome Player 1.<br>You rolled ${numberRolled[0]} for Dice 1 and ${numberRolled[1]} for Dice 2.<br>Choose the order of the dice, type "1" for Dice 1 first and type "2" for Dice 2 first`;
  } else if (!player1Number && numberRolled) {
    diceOrder = Number(input);
    player1Number = combineDiceNumber();
    gameMessage = `Player 1, you chose Dice ${diceOrder} first.<br>Your number is ${player1Number}.<br>It is now Player 2's turn.`;
    diceOrder = null;
    numberRolled = null;
  } else if (!player2Number && !numberRolled) {
    numberRolled = rollTwoDice();
    gameMessage = `Welcome Player 2.<br>You rolled ${numberRolled[0]} for Dice 1 and ${numberRolled[1]} for Dice 2.<br>Choose the order of the dice, type "1" for Dice 1 first and type "2" for Dice 2 first.`;
  } else if (!player2Number && numberRolled) {
    diceOrder = Number(input);
    player2Number = combineDiceNumber();
    gameMessage = `Player 2, you chose Dice ${diceOrder} first.<br>Your number is ${player2Number}. Press sumbmit to reveal winner.`;
  }
  myOutputValue = gameMessage;
  return myOutputValue;
};

//Generate 2 numbers from dice roll
let rollTwoDice = () => [
  Math.floor(Math.random() * 6) + 1,
  Math.floor(Math.random() * 6) + 1,
];

//Concatenate the rolls to form new number
function combineDiceNumber() {
  switch (diceOrder) {
    case 1:
      return `${numberRolled[0]}` + `${numberRolled[1]}`;
    case 2:
      return `${numberRolled[1]}` + `${numberRolled[0]}`;
    default:
      return `Invalid input.<br>You rolled ${numberRolled[0]} for Dice 1 and ${numberRolled[1]} for Dice 2.<br>Choose the order of the dice, type "1" for Dice 1 first and type "2" for Dice 2 first.`;
  }
}

//Compare both numbers to determine winner
function evalutateWinner(winnerIndex) {
  Number(player1Number) > Number(player2Number)
    ? (winnerIndex = 1)
    : Number(player2Number) > Number(player1Number)
    ? (winnerIndex = 2)
    : (winnerIndex = 0);
  switch (winnerIndex) {
    case 1:
      gameMessage = `Winner is Player 1 with ${player1Number} over Player 2 with ${player2Number}.`;
      break;
    case 2:
      gameMessage = `Winner is Player 2 with ${player2Number} over Player 1 with ${player1Number}.`;
      break;
    case 0:
      gameMessage = `It is a draw with both players getting ${player1Number}.`;
      break;
  }
}
