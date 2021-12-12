//REQUIREMENTS//
//1) There are two players and players take turns
//2) when a player clicks submit, the game rolls 2 dice and shows the dice rolls
//3) the player picks the order of the dice they want.
//4) after both players have rolled and chosen the dice order, the player with the higher combined number wins

// set global variables
var rollDiceState = "rollDiceState";
var chooseDiceState = "chooseDiceState";
var gameState = rollDiceState;

var playerRolls = [];

//Dice roll function
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal) + 1;

  return randomInteger;
};

//Helper function to store both dice numbers in an array
var rollBothDice = function () {
  var counter = 0;
  while (counter < 2) {
    playerRolls.push(rollDice());
    counter = counter + 1;
  }
  return `Welcome<br><br> You rolled: <br>${playerRolls[0]} for Dice One and<br>${playerRolls[1]} for Dice Two. Next, please input '1' if you would like to choose Dice One and '2' if you would like to choose Dice Two as the first digit of your final value.`;
};

//Helper function to get player's score
var getPlayerScore = function (playerInput) {
  //input validation
  if (playerInput != 1 && playerInput != 2) {
    console.log(`Control flow: input !== 1 && input !== 2`);
    return `Error! Please input:<br>'1' if you want to use Dice One as the first digit of your final value or<br> '2' if you want to use Dice Two as the first digit of your final value.<br><br>You rolled: <br>${playerRolls[0]} for Dice One and <br>${playerRolls[1]}for Dice Two.`;
  }

  //input == 1
  if (playerInput == "1") {
    var playerScore = Number(String(playerRolls[0]) + String(playerRolls[1]));
    return `Your chosen value is: ` + playerScore;
  }

  //input == 2
  if (playerInput == "2") {
    var playerScore = Number(String(playerRolls[1]) + String(playerRolls[0]));
    return `Your chosen value is: ` + playerScore;
  }
};

var main = function (input) {
  console.log(`Checking game state on submit`, gameState);
  var outputMessage = "";

  if (gameState == rollDiceState) {
    console.log("gameState == rollDiceState");

    //Display dice rolled as output mesasge
    outputMessage = rollBothDice();

    //Change game state
    gameState = chooseDiceState;
    return outputMessage;
  }
  if (gameState == chooseDiceState) {
    console.log(`gameState == chooseDiceState`);

    // Call playerScore function
    outputMessage = getPlayerScore(input);
    return outputMessage;
  }
};
