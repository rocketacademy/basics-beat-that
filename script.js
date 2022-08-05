var diceRoll = "dice roll";
var chooseDiceOrder = "choose dice order";
var gameMode = diceRoll;
var currentPlayer = 1;
var allplayersScore = [];
var compareScores = "compare scores";

var currentPlayerRolls = [];

var getPlayerScores = function (playerInput) {
  var playerScore;
  //input validation
  if (playerInput != 1 && playerInput != 2) {
    return `Sorry, please enter either "1" or "2".`;
  }
  //if input = 1
  if (playerInput == 1) {
    playerScore = Number(
      String(currentPlayerRolls[0]) + String(currentPlayerRolls[1])
    );
  }
  //if input = 2
  if (playerInput == 2) {
    playerScore = Number(
      String(currentPlayerRolls[1]) + String(currentPlayerRolls[0])
    );
  }
  //add scores into array
  allplayersScore.push(playerScore);
  //clear current player rolls array for next user
  currentPlayerRolls = [];

  return `You chose dice ${playerInput} first. <br>Your final number is ${playerScore}.`;
};

var rollDiceForPlayer = function () {
  var counter = 0;
  while (counter < 2) {
    currentPlayerRolls.push(rollDice());
    counter += 1;
  }
  console.log(`Player rolls: ${currentPlayerRolls}`);
  return `Welcome Player ${currentPlayer}! <br>You rolled ${currentPlayerRolls[0]} for DICE1 and ${currentPlayerRolls[1]} for DICE2. <br>Please choose the order of your dice by entering "1" or "2".`;
};

//create function to roll dice
var rollDice = function () {
  var numberRolled = Math.floor(Math.random() * 6 + 1);
  console.log(`number rolled: ${numberRolled}`);
  return numberRolled;
};

//MAIN~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var main = function (input) {
  console.log(`Current game mode: ${gameMode}`);
  console.log(`Current player: ${currentPlayer}`);
  var outputMessage = "";
  if (gameMode == diceRoll) {
    outputMessage = rollDiceForPlayer();
    //change game mode to allow user to choose order of dice
    gameMode = chooseDiceOrder;
    return outputMessage;
  }
  if (gameMode == chooseDiceOrder) {
    //call getPlayerScores function
    outputMessage = getPlayerScores(input);
    if (currentPlayer == 1) {
      console.log(`end of player 1's turn, player 2's turn now`);
      currentPlayer = 2;
      gameMode = diceRoll;
      return outputMessage + `<br>It is now player 2's turn.`;
    }
    if (currentPlayer == 2) {
      console.log(`end of player 2's turn. compare scores next.`);
      gameMode = compareScores;
      return (
        outputMessage + `<br>Click on the submit button to check the results!`
      );
    }
  }
};
