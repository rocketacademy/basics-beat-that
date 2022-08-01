// There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, 
// for example 3 and 6.
// The player picks the order of the dice they want. For example, 
// if they wanted the number 63, they would specify that the 2nd dice goes first. 
// You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, 
// the player with the higher combined number wins.

//Global Varibles
const gameStateDiceRoll = "gameStateDiceRoll";
const gameStateChooseDiceOrder = "gameStateChooseDiceOrder";
const gameStateCompareScores = "gameStateCompareScores"
let gameState = gameStateDiceRoll;


let currentPlayerRolls = [];

let currentPlayer = 1;
let allPlayerScore = [];

//Helper function
let rollDice = function () {
  //random decimal between 0 to 6
  let randomDecimal = Math.random() * 6;
  //random integer from 1 to 6
  let randomInteger = Math.floor(randomDecimal) + 1;
  console.log("rollDice output", randomInteger);
  return randomInteger;
}

let rollDiceForPlayer = function () {
  console.log("Control flow: Start of rollDiceForPlayer()")
  let counter = 0
  while (counter < 2) {
    currentPlayerRolls.push(rollDice());
    counter = counter + 1
  }
  console.log("rollDiceForPlayer changes, playerRolls:", currentPlayerRolls);
  return `Welcome Player ${currentPlayer}. 
  You rolled ${currentPlayerRolls[0]} for Dice 1 and 
  ${currentPlayerRolls[1]} for Dice 2. Choose the order of the dice.`
};

let getPlayerScore = function (playerInput) {
  let playerScore;
  if (playerInput != 1 && playerInput != 2) {
    return `Error! Please only input 1 or 2 to choose which dice to use as the first digit.
    You rolled ${currentPlayerRolls[0]} for Dice 1 and ${currentPlayerRolls[1]} for Dice 2.`
  }
  if (playerInput == 1) {
    playerScore = Number(String(currentPlayerRolls[0] + String(currentPlayerRolls[1])));

  }
  if (playerInput == 2) {
    playerScore = Number(String(currentPlayerRolls[1] + String(currentPlayerRolls[0])));

  }
  // store player score in array
  allPlayerScore.push(playerScore);

  //clear current player rolls array
  currentPlayerRolls = [];
  return ` Player ${currentPlayer}, Your chosen value is ${playerScore}`;

}

let resetGame = function() {
  currentPlayer = 1;
  gameState = gameStateDiceRoll;
  allPlayerScore = [];

};

let main = function (input) {
  // let myOutputValue = rollDice();
  // return myOutputValue
  console.log("check game state", gameState);
  console.log("check current player ", currentPlayer);
  let outputMessage = "";
  if (gameState == gameStateDiceRoll) {
    console.log("gameStateDiceRoll")
    outputMessage = rollDiceForPlayer();
    gameState = gameStateChooseDiceOrder;
    return outputMessage;
  }
  else if (gameState == gameStateChooseDiceOrder) {
    outputMessage = getPlayerScore(input);

    if (currentPlayer == 1 && (input == 1 || input == 2)) {
      currentPlayer = 2;
      gameState = gameStateDiceRoll
      return `${outputMessage} It is now player 2's turn!`;
    }
    else if (currentPlayer == 2 && (input == 1 || input == 2)) {
      gameState = gameStateCompareScores
      return `${outputMessage} <br> Press submit to calculate scores`;
    } else {
      return outputMessage;
    }
  }
  if (gameState == gameStateCompareScores) {
    console.log('control flow: compare scores');

    outputMessage = `Player 1 score: ${allPlayerScore[0]}, Player 2 score: ${allPlayerScore[1]}`;

    if (allPlayerScore[0] > allPlayerScore[1]) {
      outputMessage = `${outputMessage} Player 1 wins!`
    }

    if (allPlayerScore[0] < allPlayerScore[1]) {
      outputMessage = `${outputMessage} Player 2 wins!`
    }

    if (allPlayerScore[0] == allPlayerScore[1]) {
      outputMessage = `${outputMessage} Its a tie!`
    }
    resetGame();
    return outputMessage
  }

};