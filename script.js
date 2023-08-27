//global variables
var overallRoundNum = "";
var diceRollRound = "";
var playerOneName = "";
var playerTwoName = "";
var playerOneDiceOne = "";
var playerOneDiceTwo = "";
var playerOneCombinedDice = "";
var playerTwoDiceOne = "";
var playerTwoDiceTwo = "";
var playerTwoCombinedDice = "";

//game mechanics
var playerRoll = function () {
  //player rolls 2 dice and shows the dice roll and convert it to string to concatenate later
  playerOneDiceOne = rollDice().toString();
  console.log(`dice one = ${playerOneDiceOne}`);
  playerOneDiceTwo = rollDice().toString();
  console.log(`dice two = ${playerOneDiceTwo}`);
};

var combinePlayerOneDice = function (diceChoice) {
  //player pick the order to concatenate
  if (diceChoice == 1) {
    playerOneCombinedDice = playerOneDiceOne + playerOneDiceTwo;
    return playerOneCombinedDice;
  }
  playerOneCombinedDice = playerOneDiceTwo + playerOneDiceOne;
  return playerOneCombinedDice;
};

//roll dice function
var rollDice = function () {
  var randomValue = Math.random() * 6;
  var randomInteger = Math.floor(randomValue);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

var main = function (input) {
  //new game input name
  if (overallRoundNum == "") {
    playerOneName = input;
    overallRoundNum += 1;
    return `Welcome ${playerOneName}! Please roll the dice by clicking "Submit"!`;
  }
  if (diceRollRound == "") {
    //roll dice one and two
    playerOneRoll = playerRoll();
    diceRollRound += 1;
    //return rolled msg to choose
    return `You rolled ${playerOneDiceOne} for Dice One and ${playerOneDiceTwo} for Dice Two. <br> Choose the order of the dice. Input "1" or "2"`;
  }
  var playerOneCombinedDice = combinePlayerOneDice(input);

  return playerOneCombinedDice;
};
