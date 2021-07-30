// 2 different game modes

var firstGameMode = "Game Mode Dice Roll";
var secondGameMode = "Game Mode Choose Order";

var currentGameMode = firstGameMode;

var playerOneDiceRoll = [];
var playerTwoDiceRoll = [];
var player = 1;

var playerOneNum;
var playerTwoNum;
//dice function
var getDiceRoll = function () {
  return Math.ceil(Math.random() * 6);
};

var getDiceRolls = function () {
  var newDiceRolls = [getDiceRoll(), getDiceRoll()];
  if (player == 1) {
    playerOneDiceRoll = newDiceRolls;
  } else {
    playerTwoDiceRoll = newDiceRolls;
  }
  return newDiceRolls;
};

var concatenate2Numbers = function (num1, num2) {
  return Number(String(num1) + String(num2));
};

var getPlayerNumber = function (firstNumeralIndex) {
  var diceArray = player === 1 ? playerOneDiceRoll : playerTwoDiceRoll;
  var playerNum;
  if (firstNumeralIndex === 1) {
    playerNum = concatenate2Numbers(diceArray[0], diceArray[1]);
  } else {
    playerNum = concatenate2Numbers(diceArray[1], diceArray[0]);
  }
  if (player === 1) {
    playerOneNum = playerNum;
  } else {
    playerTwoNum = playerNum;
  }
  return playerNum;
};
var determineWinner = function () {
  if (playerOneNum > playerTwoNum) {
    return 1;
  }
  return 2;
};
var main = function (input) {
  if (currentGameMode == firstGameMode) {
    var newDiceRolls = getDiceRolls();
    currentGameMode = secondGameMode;
    return `Welcome Player ${[player]}<br>
    You rolled Dice 1: ${newDiceRolls[0]} and Dice 2: ${newDiceRolls[1]} <br>
    Choose the order of the dice by entering 1 or 2 as the first numeral index.`;
  }
  if (currentGameMode == secondGameMode) {
    var firstNumeralIndex = Number(input);
    if (firstNumeralIndex !== 1 && firstNumeralIndex !== 2) {
      return `Please choose 1 or 2 as your first numeral index for your dice rolls!`;
    }
    var playerNum = getPlayerNumber(firstNumeralIndex);
    var playerNumResponse = `Player ${player}, You chose Dice ${firstNumeralIndex} first. <br>
      Your number is ${playerNum}.`;
  }
  if (player == 1) {
    player = 2;
    currentGameMode = firstGameMode;
    return `${playerNumResponse} <br>
      It is now Player 2's turn. Press Submit to roll dice.`;
  }
  var winningPlayer = determineWinner();
  //Reset the game
  player = 1;
  currentGameMode = firstGameMode;
  return `${playerNumResponse} <br>
    Player ${winningPlayer} has won! <br>
    Player 1's number: ${playerOneNum} & Player 2's number: ${playerTwoNum}<br>
    Press submit to play again!`;
};
