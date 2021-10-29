// Beat That! //
/* Requirements
1. There are 2 players and players take turns.
2. When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
3. The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
4. After both players have rolled and chosen dice order, the player with the higher combined number wins. */

// Define various game modes //
var GAME_ROLL_DICE = "roll dice";
var GAME_CHOOSE_DICE_ORDER = "choose dice order";

// start with player 1 first //
var currentPlayer = 1;
var numOfDice = 2;
var diceRoll = [];
var player1Dice = [];
var player2Dice = [];
var player1Num = 0;
var player2Num = 0;
var player1Score = [];
var player2Score = [];

// Start with "roll dice" game mode //
var gameMode = GAME_ROLL_DICE;

// Roll Dice Function //
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var randomDiceNumber = randomInteger + 1;
  return randomDiceNumber;
};

// Check which player wins //
var checkWhoWon = function (player1Num, player2Num) {
  if (player1Num > player2Num) {
    return 1;
  } else if (player2Num > player1Num) {
    return 2;
  } else {
    return `Nobody won.`;
  }
};

// Tabulate score //
var tabScore = function (scoreArray) {
  var index = 0;
  var totalScore = 0;
  while (index < scoreArray.length) {
    var totalScore = totalScore + Number(scoreArray[index]);
    index += 1;
  }
  return totalScore;
};

// Sort Score in descending order //
var sortScore = function (scoreArray) {
  scoreArray.sort((a, b) => b - a);
  return scoreArray;
};

var main = function (input) {
  var myOutputValue = "";

  //When gamemode is "roll dice" //
  if (gameMode == GAME_ROLL_DICE) {
    var diceCounter = 0;
    // Initialise dice roll counter to store new values for every roll dice mode //
    diceRoll = [];
    var message = "";
    // Roll dice numOfDice times and store in diceRoll array //
    while (diceCounter < numOfDice) {
      diceRoll.push(rollDice());
      diceCounter += 1;
    }
    console.log(diceRoll);
    // Store dice rolls into the respective player dice //
    if (currentPlayer == 1) {
      player1Dice = diceRoll;
      message = `Your dice rolls are ${player1Dice}`;
    } else if (currentPlayer == 2) {
      player2Dice = diceRoll;
      message = `Your dice rolls are ${player2Dice}`;
    }
    console.log("Player 1 dice roll: " + player1Dice);
    console.log("Player 2 dice roll: " + player2Dice);

    // Set game mode as "choose order" after rolling dice //
    gameMode = GAME_CHOOSE_DICE_ORDER;

    return (myOutputValue = `Hi Player ${currentPlayer}! <br><br> ${message} <br><br> Choose your dice order. <br> Press "1" for first dice and "2" for second dice.`);
  }

  if (gameMode == GAME_CHOOSE_DICE_ORDER) {
    var index = input - 1;

    // Validate that input should be 1 or 2 //
    if (input != 1 && input != 2) {
      return (myOutputValue = `Please select "1" or "2" to choose your dice order.`);
    }
    if (currentPlayer == 1) {
      // If choose "1", concatenate Player 1 Num first digit with second digit. Note: array first index is 0. //
      if (input == 1) {
        player1Num =
          String(player1Dice[index]) + String(player1Dice[index + 1]);
        // If choose "2", concatenate Player 1 Num second digit with first digit. //
      } else if (input == 2) {
        player1Num =
          String(player1Dice[index]) + String(player1Dice[index - 1]);
      }
      // save player1Num into the array player 1 Score //
      player1Score.push(player1Num);

      console.log("player1score: " + player1Score);
      // Change to player 2 and back to game mode "roll dice" //
      currentPlayer += 1;
      gameMode = GAME_ROLL_DICE;

      return (myOutputValue = `Player ${
        currentPlayer - 1
      } choose ${input} first. <br><br> Your number is ${player1Num}. It's Player ${currentPlayer} turn, click "submit" to roll the dice.`);
    } else if (currentPlayer == 2) {
      // If choose "1", concatenate Player 2 Num first digit with second digit. Note: array first index is 0. //
      if (input == 1) {
        player2Num =
          String(player2Dice[index]) + String(player2Dice[index + 1]);
        // If choose "2", concatenate Player 2 Num second digit with first digit. //
      } else if (input == 2) {
        player2Num =
          String(player2Dice[index]) + String(player2Dice[index - 1]);
      }
      // save player2Num into the array player 2 Score //
      player2Score.push(player2Num);

      console.log("player2score: " + player2Score);

      // Check which player wins //
      var playerWon = checkWhoWon(player1Num, player2Num);
      // Change back to game "roll dice" //
      gameMode = GAME_ROLL_DICE;
      // Change to next player //
      var nextPlayer = (currentPlayer % 2) + 1;
      if (playerWon == 1 || playerWon == 2) {
        var winningText = `Player ${playerWon} wins!`;
      } else {
        winningText = `Nobody wins!`;
      }
      myOutputValue = `Player ${currentPlayer} choose ${input} first. <br><br> Your number is ${player2Num}. <br><br> ${winningText} <br> Player ${nextPlayer}'s number ${player1Num} | Score: ${tabScore(
        player1Score
      )} <br>Player ${currentPlayer}'s number ${player2Num} | Score: ${tabScore(
        player2Score
      )} <br><br> Leadership Board: <br> Player 1 <br> 
      ${sortScore(player1Score)} <br> Player 2 <br> ${sortScore(player2Score)} 
      <br><br> Click "submit" to play again`;

      currentPlayer = nextPlayer;
    }
  }
  return myOutputValue;
};
