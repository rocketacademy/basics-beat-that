//1 . There are 2 players and players take turns.
//2 . When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
//3 . The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// 4 . After both players have rolled and chosen dice order, the player with the higher combined number wins.

// First player rolls the dice save the numbers into an array after selecting choice .
// Second Player will turn roll the dice , and save the numbers into an array too .
// We will do a comparison , the person with the highest value wins the game.
var currentPlayer = 1;
var GAME_STATE_DICE_ROLL = `GAME_STATE_DICE_ROLL`;
var GAME_STATE_CHOOSE_DICE_ORDER = `GAME_STATE_CHOOSE_DICE_ORDER`;
var gamestate = GAME_STATE_DICE_ROLL;
var GAME_STATE_COMPARE_SCORE = `GAME_STATE_COMPARE_SCORE`;
var PlayerRolls = [];
var allPlayerRolls = [];

var rollDice = function () {
  console.log(`Randoming Dice`);
  var RandomDecimal = Math.random() * 6;
  var RandomInt = Math.floor(RandomDecimal) + 1;
  console.log(`Rolling Of Dices`, RandomInt);
  return RandomInt;
};
var rollDiceForPlayer = function () {
  console.log(`Start Of Dice Roll For Player 1`);
  var counter = 0;
  while (counter < 2) {
    PlayerRolls.push(rollDice());
    counter = counter + 1;
  }
  return `Welcome ! Player ${currentPlayer} , You Have Rolled <br><br> Dice 1 : ${PlayerRolls[0]} <br><br> Dice 2 : ${PlayerRolls[1]} <br><br> Please input either "1" or "2" to choose corresponding dice to be used as the first digit of the final value.`;
};
var getPlayerScore = function (PlayerInput) {
  var PlayerScore;

  if (PlayerInput != 1 && PlayerInput != 2) {
    console.log(`Invalid Choice`);
    return `Error ! Please only input '1' or '2' to choose the order of the dice to be first digit <br><br> Your Dice Rolls Are <br><br> Dice 1 : ${PlayerRolls[0]} <br><br> Dice 2 : ${PlayerRolls[1]}.`;
  }
  if (PlayerInput == 1) {
    console.log(`Input is = 1`);
    var PlayerScore = Number(String(PlayerRolls[0]) + String(PlayerRolls[1]));
  }
  if (PlayerInput == 2) {
    console.log(`input is = 2`);
    var PlayerScore = Number(String(PlayerRolls[1]) + String(PlayerRolls[0]));
  
  }
  // Player Score Stored
  allPlayerRolls.push(PlayerScore);
  // Reset Player Scores
  PlayerRolls = [];
 return `Your Chosen Value is ${PlayerScore} .`;
};
var main = function (input) {
  console.log(`CurrentPlayer on submit click`, currentPlayer);
  console.log("DiceRolled", rollDice());
  if (gamestate == GAME_STATE_DICE_ROLL) {
    console.log(`Control Flow :First Stage`);
    //Display Dice Rolled As Output Message
    var myOutputValue = rollDiceForPlayer();
    gamestate = GAME_STATE_CHOOSE_DICE_ORDER;
    console.log(gamestate);
    return myOutputValue;
  }
  if (gamestate == GAME_STATE_CHOOSE_DICE_ORDER) {
    console.log(`Control Flow : Choose Dice Order`);
    outputMessage = getPlayerScore(input);
    if (currentPlayer == 1) {
      console.log(`End Of Player 1 Turn !`);
      currentPlayer = 2;
      gamestate = GAME_STATE_DICE_ROLL;
      return outputMessage + `<br><br> It Is Now Player's 2 Turn!`;
    }
    if (currentPlayer == 2) {
      console.log(
        `Control Flow : end of Player's 2 Turn , Next Submit Click Will Calculate Score`
      );
      gamestate = GAME_STATE_COMPARE_SCORE;
      return outputMessage + `<br><br> Press Submit to calculate scores`;
    }
    if (gamestate == GAME_STATE_COMPARE_SCORE) {
      if
    }
  }
};
