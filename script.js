//global variables
var GAME_STATE_DICE_ROLL = "GAME_STATE_DICE_ROLL";
var GAME_STATE_DICE_ORDER = "GAME_STATE_DICE_ORDER";
var gameState = GAME_STATE_DICE_ROLL;
var playerRolls = [];

//helper function

var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;

  return diceNumber;
};

var rollDiceForPlayer = function () {
  console.log("player 1 starts to roll");
  index = 0;
  while (index < 2) {
    playerRolls.push(rollDice());
    index = index + 1;
  }
  console.log("player rolls completed and it is: " + playerRolls);
  return (
    "welcome <br> you have rolled, <br> Dice 1: " +
    playerRolls[0] +
    "<br> Dice 2: " +
    playerRolls[1] +
    "." +
    " <br> Now, please input 1 or 2 to select the number combination for the 2 dice chosen. "
  );
};

var getPlayerScore = function (playerInput) {
  //input validation
  if (playerInput != 1 && playerInput != 2) {
    console.log("This means the not 1/2 number function is working");
    return (outputMessage =
      "Please select 1 or 2 only!, you currect dice roll are, <br> Dice 1: " +
      playerRolls[0] +
      " <br> Dice 2: " +
      playerRolls[1]);
  }

  //input 1
  if (playerInput == 1) {
    console.log("if input is 1: ");
    var playerScore = Number(String(playerRolls[0]) + String(playerRolls[1]));
    return " Your chosen value is: " + playerScore;
  }

  //input 2
  if (playerInput == 2) {
    console.log("if input is 2: ");
    var playerScore = Number(String(playerRolls[1]) + String(playerRolls[0]));
    return " Your chosen value is: " + playerScore;
  }
};

var main = function (input) {
  console.log(" current game state is: " + gameState);
  var outputMessage = "";

  if (gameState == GAME_STATE_DICE_ROLL) {
    console.log("Yes, dice roll function is working");

    //display roll dice as output
    outputMessage = rollDiceForPlayer();

    //change game state to dice order
    gameState = GAME_STATE_DICE_ORDER;

    return outputMessage;
  }

  if (gameState == GAME_STATE_DICE_ORDER) {
    console.log("yes, the order function is working");

    //call the score function
    outputMessage = getPlayerScore(input);

    return outputMessage;
  }
};
