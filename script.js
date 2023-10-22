let player1Num, player2Num, currDiceRoll, gameState, currPlayer;
let submitButton = document.querySelector("#submit-button");

const initGame = () => {
  gameState = "roll-dice";
  submitButton.textContent = `Roll Dice`;
  currPlayer !== 1 ? (currPlayer = 1) : (currPlayer = 2);
};

const rollDice = () => {
  let num = Math.ceil(Math.random() * 6);
  return String(num);
};

const rollDiceResult = () => {
  currDiceRoll = [rollDice(), rollDice()];
  gameState = "eval-dice";
  submitButton.textContent = `Submit Choice`;
  return `Player ${currPlayer} has rolled ${currDiceRoll[0]} for Dice 1 and ${currDiceRoll[1]} for Dice 2. 
      Choose which dice you would like to place first in your number.`;
};

function evalGame(dice) {
  console.log("testing");
}

const evalLogic = (dice) => {
  if (dice == 1 || dice == 2) {
    if (currPlayer == 2) {
      evalGame.dice(dice);
      return evalGame.winner();
    } else {
      let rolledNumber = evalGame.dice(dice);
      initGame();
      return `Your submitted number is ${rolledNumber}. It is now Player ${currPlayer}'s turn. Roll your dice.`;
    }
  }
  return `Please input either "1" or "2" to select which dice you would like to place first.`;
};

const evalDice = (dice) => {
  let result =
    dice == 1
      ? currDiceRoll[0] + currDiceRoll[1]
      : currDiceRoll[1] + currDiceRoll[0];
  currPlayer == 1 ? (player1Num = result) : (player2Num = result);
  return result;
};

const evalWinner = () => {
  submitButton.textContent = `Play Again`;
  gameState = "reset-game";
  if (player1Num == player2Num) {
    return `Your submitted number is ${player2Num}. Player 1's number is ${player1Num}. It's a draw!`;
  }
  return player1Num > player2Num
    ? `Your submitted number is ${player2Num}. Player 1's number is ${player1Num}. Player 1 has won!`
    : `Your submitted number is ${player2Num}. Player 1's number is ${player1Num}. Player 2 has won!`;
};

evalGame.winner = evalWinner;
evalGame.dice = evalDice;
evalGame.logic = evalLogic;

const resetGame = () => {
  (player1Num = 0), (player2Num = 0), (gameState = undefined);
};

let main = function (input) {
  if (gameState == "reset-game") resetGame();
  let myOutputValue;
  if (gameState) {
    console.log(`game state is roll dice`);
    myOutputValue =
      gameState == "roll-dice" ? rollDiceResult() : evalGame.logic(input);
  } else {
    console.log(`game state is empty`);

    initGame();
    myOutputValue = `Welcome Player ${currPlayer}.

  Click on the "Roll Dice" button to roll your dices.`;
  }
  return myOutputValue;
};
