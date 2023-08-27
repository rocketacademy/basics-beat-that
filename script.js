//global variables
var playerNum = 1;
var playerRound = 0;
var playerDiceOne = "";
var playerDiceTwo = "";
var playerCombinedDice = [];
var largestNum = 0;

//player rolls 2 dice and shows the dice roll and convert it to string to concatenate later
var playerRoll = function () {
  playerDiceOne = rollDice().toString();
  console.log(`dice one = ${playerDiceOne}`);
  playerDiceTwo = rollDice().toString();
  console.log(`dice two = ${playerDiceTwo}`);
};

//player pick the order to concatenate
var combinePlayerDice = function (diceChoice) {
  if (diceChoice == 1) {
    console.log(`array position: ${playerNum - 1}`);
    console.log(`Dice One+Two = ${playerDiceOne + playerDiceTwo}`);
    playerCombinedDice[playerNum - 1] = Number(playerDiceOne + playerDiceTwo);
    console.log(`player combined dice is ${playerCombinedDice[playerNum - 1]}`);
    return playerCombinedDice;
  }
  console.log(`array position: ${playerNum - 1}`);
  console.log(`Dice Two+One = ${playerDiceTwo + playerDiceOne}`);
  playerCombinedDice[playerNum - 1] = Number(playerDiceTwo + playerDiceOne);
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

//winning functions
var calcWinner = function () {
  largestNum = playerCombinedDice[0];
  for (var i = 0; i < playerCombinedDice.length; i += 1) {
    if (playerCombinedDice[i] > largestNum) {
      largestNum = playerCombinedDice[i];
    }
  }
  var winningPlayer = playerCombinedDice.indexOf(largestNum) + 1;
  console.log(`largest num is ${largestNum}`);
  console.log(playerCombinedDice.indexOf(largestNum));
  console.log(`winning player is ${winningPlayer}`);
  return winningPlayer;
};

var main = function (input) {
  //define number of players to play
  //to change to player number input afterwards
  while (playerNum < 5) {
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

    //to change to player number input afterwards
    if (playerNum !== 5) {
      console.log(`PlayerNum = ${playerNum}`);
      console.log(`Round ${playerRound} ends`);
      return `Your combined dice roll is ${playerResult} <br> It is now Player ${playerNum}'s turn! Please click "Submit"!`;
    }
    return `Let's see who wins~`;
  }
  //winning conditions
  var findWinner = calcWinner();
  playerNum = 1;
  playerRound = 0;
  return `Player ${findWinner} wins! The combined dice roll is ${largestNum}! Let's play again!`;
};
