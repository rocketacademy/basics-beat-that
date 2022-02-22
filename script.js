var gameModeDiceRoll = "game_state_dice_roll";
var gameStateChooseDiceOrder = "game_state_choose_dice";
var gameCompareScore = "game_compare_score";
var currentGameMode = gameModeDiceRoll;

var currentPlayer = 1;
// var userName = "";
var allPlayerSCore = [];

//create an array to store the values of the 2 dices for both players
var currentPlayerRolls = [];

//creating helper function for dice roll
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

//creating helper function to roll 2 dice
var rollDiceForPlayer = function () {
  var counter = 0;
  while (counter < 2) {
    currentPlayerRolls.push(rollDice());
    counter = counter + 1;
  }
  //after this step, ask player to choose the order
  console.log(currentPlayerRolls[0]);
  console.log(currentPlayerRolls[1]);
  return `Welcome Player ${currentPlayer}! <br><br> You rolled ${currentPlayerRolls[0]} for Dice 1 and ${currentPlayerRolls[1]} for Dice 2. <br><br> Please choose the dice number (either 1 or 2) to be your first digit of your final value.`;
};

var getPlayerScore = function (playerInput) {
  // input validation
  if (playerInput != 1 && playerInput != 2) {
    return `Error! Please only input "1" or "2" to choose your first digit of your final value. <br> Dice 1: ${currentPlayerRolls[0]} | Dice 2: ${currentPlayerRolls[1]}`;
  }

  // input == 1
  if (playerInput == 1) {
    var playerFinalValue = Number(
      String(currentPlayerRolls[0]) + String(currentPlayerRolls[1])
    );
  }

  // input == 2
  if (playerInput == 2) {
    var playerFinalValue = Number(
      String(currentPlayerRolls[1]) + String(currentPlayerRolls[0])
    );
  }
  // store current player score
  allPlayerSCore.push(playerFinalValue);
  console.log(playerFinalValue);
  // clear current player rolls array
  currentPlayerRolls = [];
  return `Player ${currentPlayer}, your final value is ${playerFinalValue}.`;
};

var comparePlayersScores = function () {
  // have to use another outputvalue
  var compareOutputValue = `Player 1 score: ${allPlayerSCore[0]} <br> Player 2 score: ${allPlayerSCore[1]}`;

  // player 1 wins
  if (allPlayerSCore[0] > allPlayerSCore[1]) {
    compareOutputValue = `${compareOutputValue} <br><br> Player 1 wins!`;
  }
  //player 2 wins
  if (allPlayerSCore[0] < allPlayerSCore[1]) {
    compareOutputValue = `${compareOutputValue} <br><br> Player 2 wins!`;
  }
  //tie
  if (allPlayerSCore[0] == allPlayerSCore[1]) {
    compareOutputValue = `${compareOutputValue} <br><br> It's a tie!`;
  }
  return compareOutputValue;
};

//reset game helper function
var resetGame = function () {
  currentPlayer = 1;
  currentGameMode = gameModeDiceRoll;
  allPlayerSCore = [];
};

var main = function (input) {
  console.log(currentPlayer);
  var myOutputValue = "";

  if (currentGameMode == gameModeDiceRoll) {
    // set the name
    // userName = input;
    // now that we have the name for player 1 and rolled 2 dices, switch the mode
    currentGameMode = gameStateChooseDiceOrder;
    console.log(currentGameMode);
    return (myOutputValue = rollDiceForPlayer());
  }

  if (currentGameMode == gameStateChooseDiceOrder) {
    // call getPlayerScore helper function
    myOutputValue = getPlayerScore(input);

    if (currentPlayer == 1) {
      currentPlayer = 2;
      currentGameMode = gameModeDiceRoll;
      console.log(currentPlayer);
      return `${myOutputValue} <br> It is now player 2's turn. Click submit when ready!`;
    }

    if (currentPlayer == 2) {
      currentGameMode = gameCompareScore;
      return `${myOutputValue} <br><br> Please click submit to calculate score`;
    }
  }

  if (currentGameMode == gameCompareScore) {
    myOutputValue = comparePlayersScores();
    // have to put after the output and before return
    resetGame();
    return myOutputValue;
  }
};
