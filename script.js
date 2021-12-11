// Player 1 clicks submit
// Roll two dice and show value
// Player 1 chooses dice order
// Player 2 clicks submit
// Roll two dice and show value
// Player 2 chooses dice order
// Evaluate higher combined score and output result
//
//
var rollDiceMode = "Roll Dice Mode";
var chooseDiceMode = "Choose Dice Mode";
var compareScoresMode = "Compare Scores Mode";
var gameMode = rollDiceMode;

var currentPlayerRolls = [];

var currentPlayer = 1;
var allPlayersScore = [];

var rollDice = function () {
  console.log(`Control flow: start of rollDice()`);
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal) + 1;

  console.log(`rollDice output, randomInteger: ${randomInteger}`);

  return randomInteger;
};

var rollBothDice = function () {
  var diceOne = rollDice();
  var diceTwo = rollDice();

  currentPlayerRolls = [diceOne, diceTwo];

  var rollTwoDice = `Welcome Player ${currentPlayer}! <br><br>You rolled: <br>${diceOne} for Dice One and<br>${diceTwo} for Dice Two.<br><br>Please input:<br>'1' if you want to use Dice One as the first digit of your final value or<br>'2' if you want to use Dice Two as the first digit of your final value.`;
  return rollTwoDice;
};

var getPlayerScore = function (playerInput) {
  var playerScore;
  // input validation
  if (playerInput != 1 && playerInput != 2) {
    console.log(`Control flow: input !== 1 && input !== 2`);
    return `Please input:<br>'1' if you want to use Dice One as the first digit of your final value or<br> '2' if you want to use Dice Two as the first digit of your final value.<br><br>You rolled: <br>${currentPlayerRolls[0]} for Dice One and<br>${currentPlayerRolls[1]} for Dice Two.`;
  }
  // input == 1
  if (playerInput == `1`) {
    console.log(`Control flow: input == 1`);
    var playerScore = Number(
      `${currentPlayerRolls[0]}${currentPlayerRolls[1]}`
    );
  }
  // input == 2
  if (playerInput == `2`) {
    console.log(`Control flow: input == 2`);
    var playerScore = Number(
      `${currentPlayerRolls[1]}${currentPlayerRolls[0]}`
    );
  }
  // store playerScore in array
  allPlayersScore.push(playerScore);

  //clear playerScore in array
  currentPlayerRolls = [];

  return `Player ${currentPlayer}! <br>Your chosen number is ${playerScore}.`;
};

var comparePlayersScores = function () {
  compareMessage = `Player 1 score: ${allPlayersScore[0]} <br><br>Player 2 score: ${allPlayersScore[1]}`;
  // player 1 wins
  if (allPlayersScore[0] > allPlayersScore[1]) {
    compareMessage = `${compareMessage} <br><br>Player 1 wins!`;
  }

  // player 2 wins
  if (allPlayersScore[1] > allPlayersScore[0]) {
    compareMessage = `${compareMessage} <br><br>Player 2 wins!`;
  }
  // tie
  if (allPlayersScore[0] == allPlayersScore[1]) {
    compareMessage = `${compareMessage} <br><br>It's a tie!`;
  }
  return compareMessage;
};

var resetGame = function () {
  currentPlayer = 1;
  gameMode = rollDiceMode;
  allPlayersScore = [];
};

var main = function (input) {
  console.log(`Checking game state on submit click: ${gameMode}`);
  console.log(`Checking currentlayer: ${currentPlayer}`);
  var outputMessage = ``;
  if (gameMode == rollDiceMode) {
    console.log(`Control flow: gameMode == rollDiceMode`);
    // Display the rolled dice in an output message
    outputMessage = rollBothDice();

    // Change the game mode
    gameMode = chooseDiceMode;

    return outputMessage;
  }

  if (gameMode == chooseDiceMode) {
    console.log(`Control flow: gameMode == chooseDiceMode`);

    // Call getPlayerScore function
    outputMessage = getPlayerScore(input);

    if (currentPlayer == 1) {
      console.log(`Control flow: Change player from 1 to 2`);
      currentPlayer = 2;
      gameMode = rollDiceMode;
      return `${outputMessage} <br><br> It is now Player 2's turn!`;
    }

    if (currentPlayer == 2) {
      console.log(`Control flow: Change from Player 2 to compare scores`);
      gameMode = compareScoresMode;
      return `${outputMessage} <br><br>Press submit to calculate scores!`;
    }
    return outputMessage;
  }

  if (gameMode == compareScoresMode) {
    console.log(`Control flow: gameMode == compareScoreMode`);
    outputMessage = comparePlayersScores();

    resetGame();
    console.log(`Current player after reset: ${currentPlayer}`);
    console.log(`Game mode after reset: ${gameMode}`);
    console.log(`allPlayersScore array: ${allPlayersScore}`);

    return outputMessage;
  }
  return myOutputValue;
};
