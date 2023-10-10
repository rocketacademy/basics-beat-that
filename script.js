//Declare Global Variables
let player1Roll,
  player2Roll,
  gameMessage,
  player1Number,
  player2Number,
  diceOrder;

//Main Function
let main = function (input, myOutputValue) {
  if (!player1Roll) {
    player1Roll = rollTwoDice();
    gameMessage = `Welcome Player 1.<br>You rolled ${player1Roll[0]} for Dice 1 and ${player1Roll[1]} for Dice 2.<br>Choose the order of the dice, type "1" for Dice 1 first and type "2" for Dice 2 first`;
  } else if (player1Roll && !player2Roll) {
    diceOrder = Number(input);
    switch (diceOrder) {
      case 1:
        player1Number = `${player1Roll[0]}` + `${player1Roll[1]}`;
        break;
      case 2:
        player1Number = `${player1Roll[1]}` + `${player1Roll[0]}`;
        break;
      default:
        return `Invalid input.<br>You rolled ${player1Roll[0]} for Dice 1 and ${player1Roll[1]} for Dice 2.<br>Choose the order of the dice, type "1" for Dice 1 first and type "2" for Dice 2 first`;
    }
    gameMessage = `Player 1, you chose Dice ${diceOrder} first.<br>Your number is ${player1Number}.<br>It is now Player 2's turn.`;
  }
  myOutputValue = gameMessage;
  return myOutputValue;
};

let rollTwoDice = () => [
  Math.floor(Math.random() * 6) + 1,
  Math.floor(Math.random() * 6) + 1,
];
