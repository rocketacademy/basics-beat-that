var currentPlayer = "Player 1";
var nextPlayer = "Player 2";
var gameMode = 0;

var currentCombos = [];
var currentDices = [];

var playerOneScore = [];
var playerTwoScore = [];

var main = function (input) {
  var myOutputValue = "Please input either 1 or 2.";
  if (gameMode == 0) {
    resetCombos();
    myOutputValue = currentTurn();
    gameMode = 1;
  } else if (gameMode == 1 && (input == 1 || input == 2)) {
    myOutputValue = currentSelection(input) + thirdStatement();
    myOutputValue += trackScore(); // here
    changePlayer();
    gameMode = 0;
  }
  //console.log(currentDices);
  //console.log(currentCombos);
  console.log(playerOneScore);
  console.log(playerTwoScore);

  return myOutputValue;
};

var trackScore = function () {
  if (currentPlayer == "Player 1") {
    playerOneScore.push(Number(currentCombos.at(-1)));
  } else if (currentPlayer == "Player 2") {
    playerTwoScore.push(Number(currentCombos.at(-1)));
  }

  if (playerOneScore.length > 0 && playerTwoScore.length > 0) {
    var playerOneSum = playerOneScore.reduce((a, b) => a + b);
    var playerTwoSum = playerTwoScore.reduce((a, b) => a + b);
    if (playerOneSum > playerTwoSum) {
      return `<br><br>Player 1 is leading with a score of ${playerOneSum} versus ${playerTwoSum}.`;
    } else if (playerOneSum < playerTwoSum) {
      return `<br><br>Player 2 is leading with a score of ${playerTwoSum} versus ${playerOneSum}.`;
    } else {
      return `<br><br>Players are tied with a score of ${playerOneSum} versus ${playerTwoSum}.`;
    }
  }
  return "";
};

var thirdStatement = function () {
  if (currentPlayer == "Player 1") {
    return nextPlay();
  } else if (currentPlayer == "Player 2") {
    return determineWinner();
  }
};

var resetCombos = function () {
  if (currentPlayer == "Player 1") {
    currentCombos = [];
  }
};

var rollDice = function () {
  return Math.ceil(Math.random() * 6);
};

var currentTurn = function () {
  currentDices = [];
  currentDices.push(rollDice());
  currentDices.push(rollDice());
  return `Welcome ${currentPlayer}. <br>You rolled ${currentDices[0]} for Dice 1 and ${currentDices[1]} for Dice 2. <br>Choose the order of the dice.`;
};

var currentSelection = function (input) {
  var diceOrder = input;
  if (diceOrder == 1) {
    currentCombos.push(String(currentDices[0]) + String(currentDices[1]));
    return `${currentPlayer}, you chose Dice ${diceOrder} first. <br>Your number is ${currentCombos.at(
      -1
    )}.`;
  } else if (diceOrder == 2) {
    currentDices.reverse();
    currentCombos.push(String(currentDices[0]) + String(currentDices[1]));
    return `${currentPlayer}, you chose Dice ${diceOrder} first. <br>Your number is ${currentCombos.at(
      -1
    )}.`;
  }
};

var changePlayer = function () {
  if (currentPlayer == "Player 1") {
    currentPlayer = "Player 2";
    nextPlayer = "Player 1";
  } else if (currentPlayer == "Player 2") {
    currentPlayer = "Player 1";
    nextPlayer = "Player 2";
  }
};

var determineWinner = function () {
  if (currentCombos[0] > currentCombos[1]) {
    return `<br> Player 1 wins with ${currentCombos[0]} versus Player 2 with ${currentCombos[1]}`;
  } else if (currentCombos[0] < currentCombos[1]) {
    return `<br> Player 2 wins with ${currentCombos[1]} versus Player 1 with ${currentCombos[0]}`;
  } else {
    return `<br> It is a tie with ${currentCombos[0]} versus ${currentCombos[1]}`;
  }
};

var nextPlay = function () {
  return `<br>It is now ${nextPlayer}'s turn.`;
};
