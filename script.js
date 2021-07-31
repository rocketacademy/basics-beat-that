// settings
var dice_rolled = "Comp rolled Dice";
var pending_players = "Pending Player Action";
var pending_result = "Get result of players";
var pendingScore = "who will win";
var Player_One = "Player 1";
var Player_Two = "Player 2";

// all of the global variable
var gameMode = pending_players;
var diceOne = ``;
var diceTwo = ``;

var currentPlayer = Player_One;

var playerOneScore = [];
var playerTwoScore = [];

var startingPointP1 = 0; // point for player 1 odd number
var startingPointP2 = 0; // point for player 2 even number
var drawPoint = 0;

var guessOne = [];
var guessTwo = [];

// roll the dice logic, logic from older game
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

// dice is made into to different dice, logic from older game
var diceRollResult = function () {
  diceOne = rollDice();
  diceTwo = rollDice();
  gameMode = dice_rolled; // this is when the dice already rolled
  return `The dice roll by ${currentPlayer} was ${diceOne} and ${diceTwo}, Select 1 for dice one to be first and select 2 for dice two to be first.`;
};

// add logic for player setting player one and two but not showing P2 why (basic mode)
var playerSettings = function (input) {
  // if not 1 or 2, throw error, using the same logic from SPS
  var message = ``;
  if (input != "1" && input != "2") {
    message = `Incorrect choice of dice roll, choose 1 or 2 for arrangement`;
    return message;
  }
  // player one turn
  if (currentPlayer == Player_One) {
    if (input == `1`) {
      playerOneScore = `${diceOne}${diceTwo}`;
    } else {
      playerOneScore = `${diceTwo}${diceOne}`;
    }
    currentPlayer = Player_Two;
    guessOne.push(Player_One, playerOneScore); //unsure how to put P1 + Score together without getting object
    console.log("guesses", guessOne); // test for array working or not

    gameMode = pending_players; // pending player two action then run again dice roll and then run to currentplayer = 2
    message = `${Player_One} selected ${playerOneScore}, wait for ${Player_Two}`;
    return message;
  }
  // player two turn
  if (currentPlayer == Player_Two) {
    if (input == `1`) {
      playerTwoScore = `${diceOne}${diceTwo}`;
    } else {
      playerTwoScore = `${diceTwo}${diceOne}`;
    }

    guessTwo.push(Player_Two, playerTwoScore);
    console.log("guesses", guessTwo); // test for array working or not

    gameMode = pending_result; // if this is now pending result run win logic
    message = `${Player_Two} selected ${playerTwoScore}. Okay, lets check`;
    return message;
  }
};

// game win logic for player 1 and player 2, using the same logic from SPS
// added a system to add point for player 1 and player 2 called P1 and P2, each time they win add one point
var gameWinLogic = function () {
  if (playerOneScore == playerTwoScore) {
    message = `This is a draw`;
  }
  if (playerOneScore > playerTwoScore) {
    startingPointP1 = startingPointP1 + 1;
    message = `${Player_One} wins with roll of ${playerOneScore} with a point of ${startingPointP1} and player two rolled ${playerTwoScore} a current score of ${startingPointP2}`;
  }
  if (playerOneScore < playerTwoScore) {
    startingPointP2 = startingPointP2 + 1;
    message = `${Player_Two} wins with roll of ${playerTwoScore} with a point of ${startingPointP2} and player one rolled ${playerOneScore} a point of ${startingPointP1}`;
  }
  gameMode = pending_players; // if it is pending player then run the game again
  currentPlayer = Player_One;
  return message;
};

var dashboardDisplay = function () {
  var dashboard = [guessOne, guessTwo]; // score storing for player 1 and player 2 - issue where it is now taking P1 and P2 as part of list
  var displayDash = dashboard;
  // dashboard.sort();
  console.log("dashboard", dashboard);
  return displayDash;
};

// final display for the game, separate the logic to make things easy to see for myself
var main = function (input) {
  if (gameMode == pending_players) {
    console.log("game mode", gameMode);
    // when the setting is now waiting for players, click submit then roll dice result
    display = diceRollResult();
  } else if (gameMode == dice_rolled) {
    console.log("game mode", gameMode);
    // if pass dicerollresult then run the player settings
    display = playerSettings(input);
  } else if (gameMode == pending_result) {
    console.log("game mode", gameMode);
    // if pass player settings display the win logic
    display =
      gameWinLogic() +
      "<br></br> The current leaderboard is as follows <br></br> " +
      dashboardDisplay();
  }
  return display;
};
