//Game: Beat That!
//2 players, 2 dices
//2 game modes: Each player rolls once and player picks the order of the numbers rolled to get the biggest value
//Player with higher combined number wins
//Calculate number of wins

//2 players
var player1 = "Player 1";
var player2 = "Player 2";
var player1DiceRoll = [];
var player2DiceRoll = [];
var player1Number;
var player2Number;
var player1WinCount = 0;
var player2WinCount = 0;
var player1LoseCount = 0;
var player2LoseCount = 0;
var drawCount = 0;

//2 game modes, start with first player
var modeRollDice = "modeRollDice";
var modeChooseDiceOrder = "modeChooseDiceOrder";
var currentPlayer = "Player 1";

//Game starts with rolling of dice
var gameMode = modeRollDice;

var rollSingleDice = function () {
  return Math.floor(Math.random() * 6) + 1;
};

var rollDiceAndAssign = function () {
  var getDiceNumber = [rollSingleDice(), rollSingleDice()];

  if (currentPlayer === "Player 1") {
    player1DiceRoll = getDiceNumber;
  } else {
    player2DiceRoll = getDiceNumber;
  }
  return getDiceNumber;
};

//Player picks the order of the numbers rolled (1 for first number first, 2 for second number first)
//orderChosen is the user input (1 or 2)

var getPlayerNumber = function (orderChosen) {
  var diceArray;
  if (currentPlayer === "Player 1") {
    diceArray = player1DiceRoll;
  } else {
    diceArray = player2DiceRoll;
  }

  if (orderChosen === 1) {
    playerNumber = Number(String(diceArray[0]) + String(diceArray[1]));
  } else {
    playerNumber = Number(String(diceArray[1]) + String(diceArray[0]));
  }

  if (currentPlayer === "Player 1") {
    player1Number = playerNumber;
  } else {
    player2Number = playerNumber;
  }
  return playerNumber;
};

//determine winner
var determineWinner = function () {
  if (player1Number > player2Number) {
    return "Player 1";
  } else if (player2Number > player1Number) {
    return "Player 2";
  } else {
    return "Draw";
  }
};

//yay, we are into the main function!

var main = function (input) {
  //Roll dice first
  if (gameMode === modeRollDice) {
    var getDiceNumber = rollDiceAndAssign();

    gameMode = modeChooseDiceOrder;
    var diceRollMessage = `Welcome ${currentPlayer}! <br> 
Your dice numbers are: <br> 
Dice 1: ${getDiceNumber[0]} <br>
Dice 2: ${getDiceNumber[1]} <br> 
Indicate your choice of order by entering 1 or 2 to assume the first value of the combined number.`;
    return diceRollMessage;
  }

  //Combine numbers based on chosen order and show user combined number
  if (gameMode === modeChooseDiceOrder) {
    var orderChosen = Number(input);
    if (isNaN(orderChosen) || (orderChosen !== 1 && orderChosen !== 2)) {
      var returnErrorMessage =
        "Please enter either 1 or 2 to indicate your preferred order.";
      return returnErrorMessage;
    }
  }
  var playerNumber = getPlayerNumber(orderChosen);
  var combinedNumberMessage = `${currentPlayer}, you chose Dice ${orderChosen} as your first value. <br> 
    Your number is therefore ${playerNumber}.<br>`;
  if (currentPlayer === "Player 1") {
    currentPlayer = "Player 2";
    gameMode = modeRollDice;
    return (
      combinedNumberMessage +
      "It is now Player 2's turn. Press submit to roll your dice."
    );
  }

  //Determine winner and reset game
  if (currentPlayer === "Player 2") {
    var winningPlayer = determineWinner();
    if (winningPlayer === "Player 1") {
      player1WinCount += 1;
      player2LoseCount += 1;
      var winningMessage = `${winningPlayer} has won this round. 👻`;
    } else if (winningPlayer === "Player 2") {
      player1LoseCount += 1;
      player2WinCount += 1;
      var winningMessage = `${winningPlayer} has won this round. 🥷`;
    } else {
      drawCount += 1;
      var winningMessage = "No one won this round. It's a draw. 🤝";
    }
    currentPlayer = "Player 1";
    gameMode = modeRollDice;
    var tallyWinMessage =
      winningMessage +
      `<br>Player 1's number is ${player1Number} while Player 2's number is ${player2Number}. <br> 
      Player 1 - Wins: ${player1WinCount} || Losses ${player1LoseCount} <br>
      Player 2 - Wins: ${player2WinCount} || Losses ${player2LoseCount} <br>
      Press submit to play again.`;
    return tallyWinMessage;
  }
};
