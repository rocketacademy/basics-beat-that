//global variables
var playerNum = 1;
var playerRound = 0;
var playerDiceOne = "";
var playerDiceTwo = "";
var playerCombinedDice = [];

//game mechanics
var playerRoll = function () {
  //player rolls 2 dice and shows the dice roll and convert it to string to concatenate later
  playerDiceOne = rollDice().toString();
  console.log(`dice one = ${playerDiceOne}`);
  playerDiceTwo = rollDice().toString();
  console.log(`dice two = ${playerDiceTwo}`);
};

var combinePlayerDice = function (diceChoice) {
  //player pick the order to concatenate
  if (diceChoice == 1) {
    console.log(`array position: ${playerNum - 1}`);
    console.log(`Dice One+Two = ${playerDiceOne + playerDiceTwo}`);
    playerCombinedDice[playerNum - 1] = Number(playerDiceOne + playerDiceTwo);
    console.log(`player combined dice is ${playerCombinedDice[playerNum - 1]}`);
    return playerCombinedDice;
  }
  console.log(`array position: ${playerNum - 1}`);
  console.log(`Dice Two+One = ${playerDiceTwo + playerDiceOne}`);
  playerCombinedDice[playerNum - 1] = Number(playerDiceOne + playerDiceTwo);
  console.log(`player combined dice is ${playerCombinedDice[playerNum - 1]}`);
  return playerCombinedDice;
};

//roll dice function
var rollDice = function () {
  var randomValue = Math.random() * 6;
  var randomInteger = Math.floor(randomValue);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

//define array
var defineCombinedDiceArray = function (playerNum) {
  playerCombinedDice.length(playerNum);
};

var main = function (input) {
  //define number of players to play
  while (playerNum < 3) {
    if (playerRound < playerNum) {
      //roll the dice
      playerRollDice = playerRoll();
      playerRound += 1;
      return `Welcome Player ${playerNum}! <br> You rolled ${playerDiceOne} for Dice One and ${playerDiceTwo} for Dice Two. <br> Choose the order of the dice. Input "1" or "2"`;
    }
    console.log(`input is ${input}`);
    playerCombinedDice = combinePlayerDice(input);
    playerResult = playerCombinedDice[playerNum - 1];
    playerNum += 1;
    console.log(`PlayerNum = ${playerNum}`);
    console.log(`Round ${playerRound} ends`);
    return `Your combined dice roll is ${playerResult} <br> It is now Player ${playerNum}'s turn! Please click "Submit"!`;
  }
  return "Game ends!";
};
