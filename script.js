var GAME_STATE_DICE_ROLL = "GAME_STATE_DICE_ROLL";
var GAME_STATE_CHOOSE_DICE_ORDER = "GAME_STATE_CHOOSE_DICE_ORDER";
var GAME_STATE_COMPARE_SCORES = "GAME_STATE_COMPARE_SCORES";
var gameState = GAME_STATE_DICE_ROLL;

var currentPlayerRolls = [];

var currentPlayer = 1;
var allPlayersScore = [];

var rollDice = function () {
  console.log("Control flow: start of rollDice()");
  var noOfDiceFaces = 6;
  var diceNumber = Math.floor(Math.random() * noOfDiceFaces) + 1;

  console.log("rollDice output, diceNumber: ", diceNumber);
  return diceNumber;
};

var rollDiceForPlayer = function () {
  console.log("Control flow: start of rollDiceForPlayer()");
  var counter = 0;
  while (counter < 2) {
    currentPlayerRolls.push(rollDice());
    counter += 1;
  }

  console.log(
    "rollDiceForPlayer changes, currentPlayerRolls: ",
    currentPlayerRolls
  );
  return `Welcome, Player ${currentPlayer}.<br><br>You rolled:<br>Dice 1: ${currentPlayerRolls[0]} | Dice 2: ${currentPlayerRolls[1]}.<br><br>Now, please input either '1' or '2' to choose the corresponding dice to be used as the first digit of your final value.`;
};

var getPlayerScore = function (playerInput) {
  var playerScore;
  if (playerInput != 1 && input != 2) {
    console.log(
      "Control flow: input validation, invalid input... NOT 1 AND NOT 2"
    );
    return `Error! Please only input '1' or '2' to choose which dice to use as the first dice digit.<br><br>Your dice rolls are:<br>Dice 1: ${currentPlayerRolls[0]} | Dice 2: ${currentPlayerRolls[1]}.`;
  }

  if (playerInput == 1) {
    console.log("Control flow: input == 1");
    var playerScore = Number(
      String(currentPlayerRolls[0]) + String(currentPlayerRolls[1])
    );
    return `Your chosen value is: ${playerScore}.`;
  }

  if (playerInput == 2) {
    console.log("Control flow: input == 2");
    var playerScore = Number(
      String(currentPlayerRolls[1]) + String(currentPlayerRolls[0])
    );
    return `Your chosen value is: ${playerScore}.`;
  }

  allPlayersScore.push(playerScore);
  currentPlayerRolls = [];
  return `Player ${currentPlayer}, your chosen value is: ${playerScore}.`;
};

var main = function (input) {
  console.log("Checking game state on submit click: ", gameState);
  console.log("Checking currentPlayer on submit click: ", currentPlayer);
  var outputMessage = "";
  if (gameState == GAME_STATE_DICE_ROLL) {
    console.log("Control flow: gameState == GAME_STATE_DICE_ROLL");
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
    outputMessage = rollDiceForPlayer();
    return outputMessage;
  }

  if (gameState == GAME_STATE_CHOOSE_DICE_ORDER) {
    console.log("Control flow: gameState == GAME_STATE_CHOOSE_DICE_ORDER");
    outputMessage = getPlayerScore(input);

    if (currentPlayer == 1) {
      console.log("Control flow: end of player 1's turn, now player 2's turn");
      currentPlayer = 2;
      gameState = GAME_STATE_DICE_ROLL;
      return `${outputMessage}<br><br> It is now Player 2's turn!`;
    }

    if (currentPlayer == 2) {
      console.log(
        "Control flow: end of player 2's turn, next submit click will calculate score"
      );
      gameState = GAME_STATE_COMPARE_SCORES;
    }
    return `${outputMessage}<br><br>Press submit to calculate scores.`;
  }
};
