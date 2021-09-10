//Array to store each round of dice roll
var randomRollArray = [];

//Array to store player names
var playerNameArray = [];

//Array to store each player's biggest number
var playerBiggestNumberArray = [];

//Starting game mode - Enter number of players
var gameMode = "Enter number of players";
//gameMode 2 = 'Roll dice'

var playerTurn = 0;

var main = function (input) {
  //Storing of player names and starting game
  if (gameMode == "Enter number of players" && input == "start") {
    gameMode = "Roll dice";
    return (myOutputValue =
      "The game begins. Please follow the instructions below:<br><br>Player " +
      playerNameArray[0] +
      ', enter "roll" and hit the submit button to start rolling your dice.');
  }
  if (gameMode == "Enter number of players" && input == "undo") {
    playerNameArray.pop();
    return (myOutputValue =
      "Registered players: " +
      playerNameArray +
      '<br><br>Once all players are registered, enter "start" and hit submit!<br><br>If you entered a wrong player name, simply enter "undo" and hit submit to remove the latest player');
  } else if (gameMode == "Enter number of players") {
    var myOutputValue = storePlayerName(input);
    console.log(myOutputValue);
    return myOutputValue;
  }

  //Rolling of dice
  var playerName = playerNameArray[playerTurn];
  var myOutputValue =
    "Player " + playerName + ': Begin your turn by entering "roll"';

  if (
    gameMode == "Roll dice" &&
    (input == "roll") & (playerTurn + 1 < playerNameArray.length)
  ) {
    var playerName = playerNameArray[playerTurn];
    var nextPlayerName = playerNameArray[playerTurn + 1];
    myOutputValue =
      generateNumber(playerName) +
      "<br><br>Player " +
      nextPlayerName +
      ': Begin your turn by entering "roll"';
    playerTurn = playerTurn + 1;
    playerBiggestNumberArray.push(Number(generateBiggestNumber()));
    randomRollArray = [];
    return myOutputValue;
  } else if (gameMode == "Roll dice" && input == "roll") {
    var playerName = playerNameArray[playerTurn];
    myOutputValue =
      generateNumber(playerName) +
      '<br><br>All players have finished their roll. Enter "results" to see who won this round!';
    playerTurn = playerTurn + 1;
    playerBiggestNumberArray.push(Number(generateBiggestNumber()));
    randomRollArray = [];
    gameMode = "results mode";
    return myOutputValue;
  }

  if (gameMode == "results mode" && input == "results") {
    console.log("generate results");
    playerCounter = 0;
    myOutputValue = "The results for this round:<br><br>";
    while (playerCounter < playerTurn) {
      myOutputValue =
        myOutputValue +
        ("Player " +
          playerNameArray[playerCounter] +
          ": " +
          playerBiggestNumberArray[playerCounter] +
          "<br>");
      playerCounter = playerCounter + 1;
    }
    myOutputValue =
      myOutputValue +
      "<br><br>" +
      decideWinner() +
      '<br><br>Enter "replay" to start another round.';
    return myOutputValue;
  }
  if (gameMode == "results mode" && input == "replay") {
    gameMode = "Roll dice";
    playerTurn = 0;
    playerBiggestNumberArray = [];
    return (
      "The game begins. Please follow the instructions below:<br><br>Player " +
      playerNameArray[0] +
      ', enter "roll" and hit the submit button to start rolling your dice.'
    );
  } else if (gameMode == "results mode") {
    return (myOutputValue =
      'Enter "results" to see the results for this round or enter "replay" to play another round.');
  }

  return myOutputValue;
};

//Function to store username
var storePlayerName = function (username) {
  console.log("input name");
  playerNameArray.push(username);
  myOutputValue =
    "Registered players: " +
    playerNameArray +
    '<br><br>Once all players are registered, enter "start" and hit submit!<br><br>If you entered a wrong player name, simply enter "undo" and hit submit to remove the latest player';
  console.log(myOutputValue);
  return myOutputValue;
};

//Function to roll dice and return 1-6
var rollDice = function () {
  var randomRoll = Math.ceil(Math.random() * 6);
  return randomRoll;
};

//Function to store dice rolls and generate biggest possible number
var generateNumber = function (playerName) {
  diceCounter = 0;
  while (diceCounter < 2) {
    randomRollArray.push(rollDice());
    diceCounter += 1;
  }
  myOutputValue =
    "Player " +
    playerName +
    ": You rolled " +
    randomRollArray[0] +
    " and " +
    randomRollArray[1] +
    ".<br><br>Your biggest number is " +
    generateBiggestNumber();

  return myOutputValue;
};

//Function to determine biggest number
var generateBiggestNumber = function () {
  if (randomRollArray[0] > randomRollArray[1])
    return String(randomRollArray[0]) + String(randomRollArray[1]);
  else return String(randomRollArray[1]) + String(randomRollArray[0]);
};

//Function to determine biggest number in array
var decideWinner = function () {
  var playerCounter = 0;
  var largestNumber = 0;
  var winningPlayer = 0;
  var countOfDraw = 0;

  while (playerCounter < playerNameArray.length) {
    var comparisonIndex = 0;
    while (comparisonIndex < playerNameArray.length) {
      var playerNumber = playerBiggestNumberArray[playerCounter];
      var comparisonNumber = playerBiggestNumberArray[comparisonIndex];
      if (playerNumber > comparisonNumber && playerNumber > largestNumber) {
        largestNumber = playerNumber;
        winningPlayer = playerCounter;
      }
      comparisonIndex = comparisonIndex + 1;
    }
    playerCounter = playerCounter + 1;
  }

  var drawComparisonIndex = 0;
  while (drawComparisonIndex < playerNameArray.length) {
    var drawComparisonNumber = playerBiggestNumberArray[drawComparisonIndex];
    if (largestNumber == drawComparisonNumber) {
      countOfDraw = countOfDraw + 1;
    }
    drawComparisonIndex = drawComparisonIndex + 1;
  }
  if (countOfDraw > 1 || countOfDraw == 0) {
    return "Its a draw";
  } else
    return (
      "Player " +
      playerNameArray[winningPlayer] +
      " wins with " +
      largestNumber +
      "."
    );
};
