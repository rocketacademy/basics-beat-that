// Project 2 : Beat that (Base)//

// 1. Number of players = 2 , will take turns to play the game
// Create a prompt to inform player to click on submit button.

// 2. When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6. The dice values should be stored for each player.

// 3. The player picks the order of the dice they want. (e.g whether dice 1 or dice 2 will go first) -> conditional statement. Store the value in an array

// 4. After both players have rolled and chosen dice order, the player with the higher combined number wins. -> to compare the 2 dice value

// 6. The game will reset and will go back to Player 1

//To define Global Variable
var gameModeRollDice = "game mode roll dice";
var gameModeChooseDice = "game mode choose dice";
var gameModeDetermineWinner = "game mode determine winner";
//start the gamemode to roll the dice
var gameMode = gameModeRollDice;
var currentPlayerRoll = [];
//To track the current player along the game
var currPlayer = 1;
var allPlayerScore = [];

//Roll dice helper function to return random value from 1 - 6
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

// Roll 2 dice helping function to return message
var rollDiceForGame = function () {
  var counter = 0;
  while (counter < 2) {
    currentPlayerRoll.push(rollDice());
    counter = counter + 1;
  }
  console.log("rolldice for player", currentPlayerRoll);

  return `🎲 Welcome Player ${currPlayer} 🎲 <br><br> You rolled ${currentPlayerRoll[0]} for Dice 1 and ${currentPlayerRoll[1]} for Dice 2 <br><br> Choose the order of the dice by entering the number "1" or "2".`;
};

var getPlayerScore = function (playerInput) {
  var playerScore;
  console.log("playerScore");
  // to prompt error message if the input is not '1' or '2'
  if (playerInput != 1 && playerInput != 2) {
    return `Please only input either '1' or '2' to choose which dice to use as the first digit.`;
  }
  console.log("input==1");
  // if the input is '1', they will recognise the player score in this order
  if (playerInput == 1) {
    playerScore = Number(
      String(currentPlayerRoll[0]) + String(currentPlayerRoll[1])
    );
  }
  console.log("input==2");
  // if the input is '2', they will recognise the player score in this order
  if (playerInput == 2) {
    playerScore = Number(
      String(currentPlayerRoll[1] + String(currentPlayerRoll[0]))
    );
  }
  allPlayerScore.push(playerScore);
  currentPlayerRoll = [];
  return `🎲 Player ${currPlayer}🎲 <br><br>
  Your choosen value is ${playerScore}.`;
};

var determineWinner = function () {
  var winnerMessage = `🎲 Player 1 score is ${allPlayerScore[0]} and Player 2 score is ${allPlayerScore[1]}🎲  <br>`;
  // If Player 1 score is bigger than player 2, player 1 will win the game
  console.log("player 1 wins");
  if (allPlayerScore[0] > allPlayerScore[1]) {
    return `${winnerMessage} <br> 🎉  Player 1 Wins! 🎉`;
  }
  // If Player 2 score is bigger than player 1, player 2 will win the game
  console.log("player 2 wins");
  if (allPlayerScore[1] > allPlayerScore[0]) {
    return `${winnerMessage} <br> 🎉  Player 2 Wins! 🎉`;
  }
  // If both player score are the same then it will be a tie
  console.log("It is a tie");
  if (allPlayerScore[0] == allPlayerScore[1]) {
    return `${winnerMessage} <br> 🎉 It is a tie! 🎉`;
  }
  console.log("determine winner");
  return winnerMessage;
};

// Restart game helper function where it reset the player, game mode and also the player scores.
var restartGame = function () {
  currPlayer = 1;
  gameMode = gameModeRollDice;
  allPlayerScore = [];
};

var main = function (input) {
  console.log("check game mode", gameMode);
  var outputMessage = "";
  // If the game mode is roll dice, we will call the helper function and generate the dice number for the player
  if (gameMode == gameModeRollDice) {
    outputMessage = rollDiceForGame();
    gameMode = gameModeChooseDice;
    return outputMessage;
  }
  // If game mode changes to choose dice, we will run this section of codes
  console.log("check game mode change", gameMode);
  if (gameMode == gameModeChooseDice) {
    outputMessage = getPlayerScore(input);

    // if this is still player 1, we will run this section and inform that it is now playaer 2 turn to roll the dice
    console.log("curr player", currPlayer);
    if (currPlayer == 1) {
      currPlayer = 2;
      gameMode = gameModeRollDice;
      return `${outputMessage} It is Player 2's turn after you have selected the dice order. <br>`;
    }
    // if this is player 2, we will switch the game mode to determine the winner for both players
    console.log("curr player", currPlayer);
    if (currPlayer == 2) {
      gameMode = gameModeDetermineWinner;
      return `${outputMessage} <br><br> Please press submit to determine the winner!`;
    }
  }
  // call the helper function above to determine the winner and restart the game afterwards
  if (gameMode == gameModeDetermineWinner) {
    outputMessage = determineWinner();
    restartGame();
    return outputMessage;
  }
  console.log("Game is restart");
};
