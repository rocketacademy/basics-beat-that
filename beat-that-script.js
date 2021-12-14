//REQUIREMENTS//
//1) There are two players and players take turns
//2) when a player clicks submit, the game rolls 2 dice and shows the dice rolls
//3) the player picks the order of the dice they want.
//4) after both players have rolled and chosen the dice order, the game compares both players' scores. Player with the higher combined number wins

// set global variables
var rollDiceState = "rollDiceState";
var chooseDiceState = "chooseDiceState";
var compareScoresState = "compareScoresState";
var gameState = rollDiceState;

var currentPlayerRolls = [];
var currentPlayer = 1;
var bothPlayersScore = [];

// reset game automatically
var resetGame = function () {
  currentPlayer = 1;
  gameState = rollDiceState;
  bothPlayersScore = [];
};

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
    currentPlayerRolls.push(rollDice());
    counter = counter + 1;
  }
  return (
    `Welcome, Player ` +
    currentPlayer +
    `.` +
    `<br><br>You rolled: ${currentPlayerRolls[0]} for Dice One and ${currentPlayerRolls[1]} for Dice Two. <br><br> Next, please input '1' if you would like to choose Dice One and '2' if you would like to choose Dice Two as the first digit of your final value.`
  );
};

//Helper function to get player's score
var getPlayerScore = function (playerInput) {
  var playerScore;
  //input validation
  if (playerInput != 1 && playerInput != 2) {
    console.log(`Control flow: input !== 1 && input !== 2`);
    return `Error! Please input:<br>'1' if you want to use Dice One as the first digit of your final value or<br> '2' if you want to use Dice Two as the first digit of your final value.<br><br>You rolled: <br>${currentPlayerRolls[0]} for Dice One and <br>
    ${currentPlayerRolls[1]} for Dice Two.`;
  }

  //input == 1
  if (playerInput == "1") {
    playerScore = Number(
      String(currentPlayerRolls[0]) + String(currentPlayerRolls[1])
    );
  }

  //input == 2
  if (playerInput == "2") {
    playerScore = Number(
      String(currentPlayerRolls[1]) + String(currentPlayerRolls[0])
    );
  }

  //Store player's score in array
  bothPlayersScore.push(playerScore);
  //clear current player's rolls array
  currentPlayerRolls = [];
  return (
    `Player ` + currentPlayer + ` Your chosen value is: ` + playerScore + `.`
  );
};

//Helper function to compare players' scores
var comparePlayersScores = function () {
  var compareMessage =
    `Player 1's score: ` +
    bothPlayersScore[0] +
    `<br>Player 2's score: ` +
    bothPlayersScore[1];

  //Player 1 wins
  if (bothPlayersScore[0] > bothPlayersScore[1]) {
    compareMessage = compareMessage + `<br><br>Player 1 wins!`;
  }

  //Player 2 wins
  if (bothPlayersScore[1] > bothPlayersScore[0]) {
    compareMessage = compareMessage + `<br><br>Player 2 wins!`;
  }

  //Player 1 and 2 draw
  if (bothPlayersScore[1] == bothPlayersScore[0]) {
    compareMessage = compareMessage + `<br><br>It's a tie.`;
  }
  return compareMessage;
};

var main = function (input) {
  console.log(`Checking gameState on submit`, gameState);
  console.log(`Checking currentPlayer on submit`, currentPlayer);
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

    //Call playerScore function
    outputMessage = getPlayerScore(input);

    if (currentPlayer == 1) {
      currentPlayer = 2;
      gameState = rollDiceState;
      return outputMessage + `<br><br>Player 2, it is your turn now.`;
    }
    if (currentPlayer == 2) {
      gameState = compareScoresState;

      return outputMessage + ` Click on submit to calculate scores.`;
    }
  }
  // Compare scores state
  if (gameState == compareScoresState) {
    console.log(`gameState == compareScoresState`);
    outputMessage = comparePlayersScores();

    resetGame();
    console.log(`current player after reset`, currentPlayer);
    console.log(`game state after reset`, gameState);
    console.log(`both players score`, bothPlayersScore);

    return outputMessage;
  }
};
