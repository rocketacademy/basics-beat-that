// global variables
var gameMode = ""; //gameMode controls what type of game we play
var gameStep = ""; //gameStep controls which stage of code to run
var player1Dice = [];
var player2Dice = [];
var player1CurrentRoll = 0;
var player2CurrentRoll = 0;
var player1TotalScore = 0;
var player2TotalScore = 0;
var currentWinner = "";

// create dice roll function
var DiceRoll = function () {
  diceNumber = Math.floor(Math.random() * 6) + 1;
  return diceNumber;
};

// Creating side functions for dice rolling
var TwoPlayerDiceRoll = function () {
  var playerDice = [];
  playerDice.push(DiceRoll());
  playerDice.push(DiceRoll());
  console.log(playerDice);
  return playerDice;
};

//Score counter takes the dice numbers rolled and counts the total score depending on user input
var ScoreCounter = function (input, totalScore, diceRoll) {
  if (gameMode == "Two player" || gameMode == "Lowest combined number") {
    if (input == "Dice 1") {
      var currentRoll = 10 * diceRoll[0] + diceRoll[1];
    } else if (input == "Dice 2") {
      var currentRoll = 10 * diceRoll[1] + diceRoll[0];
    }
  }
  if (gameMode == "Auto generate") {
    if (diceRoll[0] >= diceRoll[1]) {
      var currentRoll = 10 * diceRoll[0] + diceRoll[1];
    } else {
      var currentRoll = 10 * diceRoll[1] + diceRoll[0];
    }
  }
  totalScore = totalScore + currentRoll;
  return [totalScore, currentRoll];
};
var main = function (input) {
  // Ask player to input game mode, then change gameMode based on input. There are 3 different modes described below.
  if (
    input == "Two player" || //Game mode is the two player basic mode. Score will be saved by default.
    input == "Lowest combined number" || //Game mode prompts lowest combined number to win
    input == "Auto generate" //Game mode auto generates highest combined number
  ) {
    gameMode = input;
    gameStep = "Roll dice 1";
    return `Game mode is: ${gameMode}  <br> Click Submit to Play!`;
  }

  //
  if (gameStep == "Roll dice 1") {
    player1Dice = TwoPlayerDiceRoll();
    gameStep = "Dice order selection 1";
    return `Player 1, <br>You rolled a ${player1Dice[0]} and ${player1Dice[1]}. <br>Choose order of dice by inputing Dice 1 or Dice 2 as the first numeral.`;
  }
  // Dice Order selection for player 1
  if (gameStep == "Dice order selection 1") {
    if (input == "Dice 1" || input == "Dice 2" || gameMode == "Auto generate") {
      var scoreCounter = ScoreCounter(input, player1TotalScore, player1Dice);
      player1CurrentRoll = scoreCounter[1];
      player1TotalScore = scoreCounter[0];
    } else {
      return "Player 1, <br>Choose order of dice by inputing Dice 1 or Dice 2 as the first numeral.";
    }
    gameStep = "Roll dice 2"; //change game step before returning output
    console.log("Game mode is: " + gameMode);
    return `Player 1, you have rolled a ${player1CurrentRoll} with a total score of ${player1TotalScore}! Wow! <br><br> Player 2, please click submit to roll your dices!`;
  }
  //
  if (gameStep == "Roll dice 2") {
    // Click to roll for player 2. Roll 2 dices and save into player1Dice. Change mode to dice order selection
    player2Dice = TwoPlayerDiceRoll();
    gameStep = "Dice order selection 2";
    return `Player 2, <br>You rolled a ${player2Dice[0]} and ${player2Dice[1]}. <br>Choose order of dice by inputing Dice 1 or Dice 2 as the first numeral.`;
  }

  // Dice Order selection for player 2
  if (gameStep == "Dice order selection 2") {
    if (input == "Dice 1" || input == "Dice 2" || gameMode == "Auto generate") {
      var scoreCounter = ScoreCounter(input, player2TotalScore, player2Dice);
      player2CurrentRoll = scoreCounter[1];
      player2TotalScore = scoreCounter[0];
    } else {
      return "Player 1, <br>Choose order of dice by inputing Dice 1 or Dice 2 as the first numeral.";
    }
    gameStep = "Roll dice 1";
    console.log("Game mode is: " + gameMode);

    // Decide winner and output
    if (gameMode == "Two player" || gameMode == "Auto generate") {
      if (player1TotalScore >= player2TotalScore) {
        return `Player 2, you have rolled a ${player2CurrentRoll} with a total score of ${player2TotalScore}! Player 1 has won with a score of ${player1TotalScore}. Wow!<br><br> Player 1, please click submit to roll your dices again!`;
      } else {
        return `Player 2, you have rolled a ${player2CurrentRoll} with a total score of ${player2TotalScore} and won! Player 1 has a score of ${player1TotalScore}. <br><br> Player 1, please click submit to roll your dices again!`;
      }
    } else if (gameMode == "Lowest combined number") {
      if (player1TotalScore >= player2TotalScore) {
        return `Player 2, you have rolled a ${player2CurrentRoll} with a total score of ${player2TotalScore} and won with lowest number mode! Player 1 has a score of ${player1TotalScore}. Wow!<br><br> Player 1, please click submit to roll your dices again!`;
      } else {
        return `Player 2, you have rolled a ${player2CurrentRoll} with a total score of ${player2TotalScore}! Player 1 has won with a score of ${player1TotalScore} under lowest number mode. <br><br> Player 1, please click submit to roll your dices again!`;
      }
    }
  }

  // Request game mode if game mode has yet to be input.
  if (gameMode == "") {
    return 'Please select game mode! You have 3 game choices:<br> "Two player"<br>"Lowest combined number"<br>"Auto generate"';
  }
};
