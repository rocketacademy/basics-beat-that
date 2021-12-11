// generate dice function
var randomDiceNumber = function () {
  var diceNumber = Math.ceil(Math.random() * 6);
  return diceNumber;
};

//create certain global varriables
var player1FinalRoll = "";
var player2FinalRoll = "";
//keep track of current player
var currentPlayer = 1;
//keep track of scores
var player1score = 0;
var player2score = 0;

//keep track or final number
var player1rolls = [];
var player2rolls = [];

//keep track of rolls
var firstRoll = "";
var secondRoll = "";

//gamemode
currentGameMode = "player one";

var playerOneDice = function () {
  firstRoll = randomDiceNumber();
  secondRoll = randomDiceNumber();
  currentGameMode = "1 choose order";
  return `Welcome Player ${currentPlayer} . You rolled <br> Dice 1: ${firstRoll}<br> Dice 2: ${secondRoll}`;
};

var playerTwoDice = function () {
  firstRoll = randomDiceNumber();
  secondRoll = randomDiceNumber();
  currentGameMode = "2 choose order";
  currentPlayer = 2;
  return `Welcome Player ${currentPlayer} . You rolled <br> Dice 1: ${firstRoll}<br> Dice 2: ${secondRoll}`;
};

var main = function (input) {
  //for them to check leaderboard
  if (input == "score") {
    console.log(`input`, input);
    console.log(`chicken`);
    currentGameMode = "player one";
    currentPlayer = 1;
    return whoWinsScore();
  }

  // start of game
  else if (currentGameMode == "player one") {
    var myOutPutValue = playerOneDice();
    console.log("first roll", firstRoll);
    console.log("current game mode ", currentGameMode);
    return myOutPutValue;
  }
  //choosing order
  else if (currentGameMode == "1 choose order") {
    if (input !== `1` && input !== `2`) {
      console.log("first roll", firstRoll);
      console.log("current game mode ", currentGameMode);
      return `Player ${currentPlayer}, You rolled <br> Dice 1: ${firstRoll}<br> Dice 2: ${secondRoll}<br> Please Enter 1 or 2`;
    }
    console.log("first roll", firstRoll);
    player1FinalRoll = finalNumber(input);
    currentGameMode = "player 2";
    console.log("current game mode ", currentGameMode);
    console.log("currentplayer", currentPlayer);
    var myOutPutValue = `Player ${currentPlayer}, you have chosen ${input}. Your final number is ${player1FinalRoll}`;
    console.log("player 1", player1FinalRoll);
    currentPlayer = 2;
    player1rolls.push(player1FinalRoll);
    console.log(`player 1 rolls`, player1rolls);
    return myOutPutValue;
  }

  //player 2 turn
  else if (currentGameMode == "player 2") {
    var myOutPutValue = playerTwoDice();
    console.log("first roll", firstRoll);
    console.log("current game mode ", currentGameMode);
    return myOutPutValue;
  }

  //player 2 choosing order
  else if (currentGameMode == "2 choose order") {
    //check for correct input
    if (input !== `1` && input !== `2`) {
      console.log("first roll", firstRoll);
      console.log("current game mode ", currentGameMode);
      return `Player ${currentPlayer}, You rolled <br> Dice 1: ${firstRoll}<br> Dice 2: ${secondRoll} <br> Please Enter 1 or 2`;
    }
    console.log("first roll", firstRoll);
    player2FinalRoll = finalNumber(input);
    console.log("current game mode ", currentGameMode);
    console.log("currentplayer", currentPlayer);
    var myOutPutValue = `Player ${currentPlayer}, you have chosen ${input}. Your final number is ${player2FinalRoll}`;
    currentGameMode = "Final";
    console.log("player 2", player2FinalRoll);
    player2rolls.push(player2FinalRoll);
    return myOutPutValue;
  } else {
    currentGameMode = "player one";
    currentPlayer = 1;
    console.log("current game mode ", currentGameMode);
    return whoWins();
  }
};

var finalNumber = function (input) {
  if (input == 1) {
    var chosenNumber = firstRoll * 10 + secondRoll;
    // why does this line of code not run without the else?
  } else if (input == 2) {
    chosenNumber = secondRoll * 10 + firstRoll;
  }
  return chosenNumber;
};
//keep track of running sum of scores for player 1
var player1TotalSum = function () {
  var player1Sum = 0;
  for (let P1 = 0; P1 < player1rolls.length; P1++) {
    player1Sum = player1Sum + player1rolls[P1];
  }
  return player1Sum;
};

//keep track of running sum of scores for player 2
var player2TotalSum = function () {
  var player2Sum = 0;
  for (let P2 = 0; P2 < player2rolls.length; P2++) {
    player2Sum = player2Sum + player2rolls[P2];
  }
  return player2Sum;
};

// function for deciding who wins
var whoWins = function () {
  console.log("player1", player1FinalRoll);
  console.log("player2", player2FinalRoll);
  console.log(`player 1 total sum`, player1TotalSum());
  console.log(`player 2 total sum`, player2TotalSum());

  if (player1FinalRoll == player2FinalRoll) {
    return `Its a draw. You can can now type score to view the leaderboard.`;
  } else if (player1FinalRoll > player2FinalRoll) {
    player1score = player1score + 1;
    return `Player 1 wins this round. Current number of matches won <br> Player 1: ${player1score} <br> Player 2: ${player2score}<br> You can can now type score to view the leaderboard.`;
  } else {
    player2score = player2score + 1;
    return `Player 2 wins this round. Current number of matches won <br> Player 1: ${player1score} <br> Player 2: ${player2score} <br> You can can now type score to view the leaderboard.`;
  }
};
// function for leaderboard
var whoWinsScore = function () {
  console.log(`player 1 total sum`, player1TotalSum());
  console.log(`player 2 total sum`, player2TotalSum());
  var player1Sum = player1TotalSum();
  var player2Sum = player2TotalSum();
  if (player1Sum > player2Sum) {
    return `Player 1 is currently in the lead! <br> Player 1: ${player1Sum} <br> Player 2: ${player2Sum}`;
  } else if (player2Sum > player1Sum) {
    return `Player 2 is currently in the lead! <br> Player 2: ${player2Sum} <br> Player 1: ${player1Sum}`;
  } else {
    return `Its a DRAWWW!  <br> Player 1: ${player1Sum} <br> Player 2: ${player2Sum}`;
  }
};
