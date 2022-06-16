var winTimes = 0;
var GAME_STATE_DICE_ROLL = "GAME_STATE_DICE_ROLL";
var GAME_STATE_DICE_ORDER = "GAME_STATE_DICE_ORDER";
//var GAME_STATE_COMPARE_SCORE = "GAME_STATE_COMPARE_SCORE";
var gameState = GAME_STATE_DICE_ROLL;

var currentPlayerRolls = [];

var currentPlayer = 1;
var allPlayerScore = [];

console.log("counterMode start:" + gameState);

var rollDice = function () {
  var randomDecimal = Math.random() * 6;

  var randomInteger = Math.floor(randomDecimal);

  var diceNumber = randomInteger + 1;
  return diceNumber;
};

//roll dice for player helper function
var rollDiceForPlayer = function () {
  console.log(" rolling dice for Player" + currentPlayer);
  var counter = 0;

  while (counter < 2) {
    currentPlayerRolls.push(rollDice());
    counter += 1;
  }
  return `Hello Player ${currentPlayer}. <br><br> Dice 1 is ${currentPlayerRolls[0]} while Dice 2 is ${currentPlayerRolls[1]}<br><br> Choose the order of the dice by pressing 1 for Dice 1, or 2 for Dice 2.`;
};

//player score!
var getPlayerScore = function (playerInput) {
  var playerScore;
  var output1;

  //check validity of input
  if (playerInput != 1 && playerInput != 2) {
    console.log("input is not 1 or 2");
    return `Player ${currentPlayer}, please input only "1" or "2" to choose your first Dice.<br><br> Your rolls are: Dice 1 is ${currentPlayerRolls[0]} while Dice 2 is ${currentPlayerRolls[1]}.`;
  }

  if (playerInput == 1) {
    console.log("player input 1");
    playerScore = Number(
      String(currentPlayerRolls[0]) + String(currentPlayerRolls[1])
    );

    console.log("PLAYERSCORE" + playerScore);

    output1 = `Player ${currentPlayer} you chose Dice ${playerInput} first. Your Number is ${playerScore}.`;
  }

  if (playerInput == 2) {
    console.log("player input 2");
    playerScore = Number(
      String(currentPlayerRolls[1]) + String(currentPlayerRolls[0])
    );
    console.log("PLAYERSCORE" + playerScore);

    output1 = `Player ${currentPlayer} you chose Dice ${playerInput} first. Your Number is ${playerScore}.`;
  }

  allPlayerScore.push(playerScore);
  console.log("allPlayerScore push" + allPlayerScore);

  currentPlayerRolls = [];
  console.log("current player rolls should be 0" + currentPlayerRolls);
  return output1;
};

//helper function for comparing score
var comparePlayerScore = function () {
  var compareValue = `Player 1 score:
    ${allPlayerScore[0]} 
    <br><br>Player 2 score:
    ${allPlayerScore[1]}`;

  if (allPlayerScore[0] > allPlayerScore[1]) {
    compareValue = `${compareValue} <br><br> Player 1 wins.`;
  }

  if (allPlayerScore[0] < allPlayerScore[1]) {
    compareValue = `${compareValue} <br><br> Player 2 wins.`;
  }

  if (allPlayerScore[0] == allPlayerScore[1]) {
    compareValue = `${compareValue} <br><br> Both players are winners and it should be celebrated.`;
  }
  return compareValue;
};

//LETS RESTART OMG
var resetGame = function () {
  currentPlayer = 1;
  gameState = GAME_STATE_DICE_ROLL;
  allPlayerScore = [];
};

//
var main = function (input) {
  console.log(" Submit:" + gameState);
  console.log("current player" + currentPlayer);

  var myOutputValue;

  if (gameState == GAME_STATE_DICE_ROLL) {
    console.log("gamestate" + "DICE ROLL MODE");
    myOutputValue = rollDiceForPlayer();
    //change game state
    gameState = GAME_STATE_DICE_ORDER;
    return myOutputValue;
  }

  if (gameState == GAME_STATE_DICE_ORDER) {
    console.log("gamestate" + " DICE ORDER MODE");
    myOutputValue = getPlayerScore(input);
  }

  if (currentPlayer == 1) {
    currentPlayer = 2;
    gameState = GAME_STATE_DICE_ROLL;
    return `${myOutputValue} It is Player 2's turn.`;
  }

  if (currentPlayer == 2) {
    //i swear to god i have been trying to do with var GAME_MODE_COMPARE but it always came out undefined and for some reason, switching to player 3 works
    currentPlayer = 3;
    return `${myOutputValue} <br><br> Submit to calculate scores...`;
  }

  if (currentPlayer == 3) {
    myOutputValue = comparePlayerScore();
    resetGame();
    console.log(
      "if the game did reset you should see current player is 0..." +
        currentPlayer +
        "and game state should be dice roll" +
        gameState +
        "and allplayerscore is" +
        allPlayerScore
    );
    return myOutputValue;
  }
};
