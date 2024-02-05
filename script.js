/* There are 2 players and players take turns.
When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first.
You can choose how the player specifies dice order.
After both players have rolled and chosen dice order, the player with the higher combined number wins. */

// Only managed to get normal, lowest score and choice dice.
const GET_DICE_ORDER = "Game state = Dice order";
const GET_DICE_ROLL = "Game State = Dice roll";
var gamestate = GET_DICE_ROLL;
var currentPlayerDiceNumber = [];
var currentPlayer = 1;
var totalScore = [];
const COMPARESCORE = "game state = compare score";
var gameMode = "Get_game_mode";
var playerScore; //used to store for normal game mode
var lowestScore; //used to store for reverse game mode
var totalDiceValue; //used to store for choice game mode
function getPlayerScore(playerInput) {
  if (gameMode == "normal") {
    //check if player chooses first or second digit to be used as first number
    if (playerInput == 1) {
      var playerScore = Number(
        String(currentPlayerDiceNumber[0]) + String(currentPlayerDiceNumber[1])
      );
      totalScore.push(playerScore);
      currentPlayerDiceNumber = [];
      return "Player " + currentPlayer + ", your Number is: " + playerScore;
    } else if (playerInput == 2) {
      var playerScore = Number(
        String(currentPlayerDiceNumber[1]) + String(currentPlayerDiceNumber[0])
      );
      currentPlayerDiceNumber = [];
      totalScore.push(playerScore);
      return "Player " + currentPlayer + ", your Number is: " + playerScore;
    } else if (playerInput != 1 && playerInput != 2) {
      return `Invalid input! Please enter either '1' or '2' <br>Dice 1: ${currentPlayerDiceNumber[0]}<br>Dice 2: ${currentPlayerDiceNumber[1]}`;
    }
  }
  if (gameMode == "reverse") {
    totalScore.push(lowestScore);
    currentPlayerDiceNumber = [];
    return `Player ${currentPlayer}, your score is :${lowestScore}`;
  }
  if (gameMode == "choice") {
    var isNumTotalDiceValue = Number(String(totalDiceValue)); //changing the value from string to numeric for comparison purposes
    totalScore.push(isNumTotalDiceValue);
    currentPlayerDiceNumber = [];
    console.log(totalScore);
    return `Player ${currentPlayer}, your score is : ${isNumTotalDiceValue}<br>`;
  }
}

function getRandomDiceRoll() {
  //get random index
  var diceRoll = Number(Math.floor(Math.random() * 6 + 1));
  return diceRoll;
}

function getDiceNumber(getAmountOfDice) {
  if (gameMode == "normal") {
    //get 2 random dice rolls
    for (var counter = 0; counter < 2; counter++) {
      currentPlayerDiceNumber.push(getRandomDiceRoll());
    }
    console.log(currentPlayerDiceNumber);
    return `Hi, Player ${currentPlayer} <br> You rolled: <br>Dice 1: ${currentPlayerDiceNumber[0]}<br>Dice 2: ${currentPlayerDiceNumber[1]}<br> Please input either "1" or "2" to choose which dice number is to be used as your first digit!`;
  }
  if (gameMode == "reverse") {
    //get 2 random dice roll and automatically calculate which permutation would be the lowest score
    for (var counter = 0; counter < 2; counter++) {
      currentPlayerDiceNumber.push(getRandomDiceRoll());
    }
    var min = Math.min.apply(Math, currentPlayerDiceNumber);
    if (min == currentPlayerDiceNumber[0]) {
      lowestScore =
        Number(String(currentPlayerDiceNumber[0])) +
        String(currentPlayerDiceNumber[1]);
    } else if (min == currentPlayerDiceNumber[1]) {
      lowestScore =
        Number(String(currentPlayerDiceNumber[1])) +
        String(currentPlayerDiceNumber[0]);
    }
    return `Hi, Player ${currentPlayer}<br> You rolled:<br>Dice 1: ${currentPlayerDiceNumber[0]}<br>Dice 2: ${currentPlayerDiceNumber[1]}`;
  }
  if (gameMode == "choice") {
    var diceValue = "";
    totalDiceValue = "";
    for (var counter2 = 0; counter2 < getAmountOfDice; counter2++) {
      // roll and stores the amount of dice user inputs into currentplayerdicenumber array
      currentPlayerDiceNumber.push(getRandomDiceRoll());
    }
    for (var i = 0; i < currentPlayerDiceNumber.length; i++) {
      // get value of each index in currentplayerdicenumber array and output what dice they rolled
      diceValue += "<br>Dice" + (i + 1) + " : " + currentPlayerDiceNumber[i];
    }
    var sorted = currentPlayerDiceNumber; //sorting the array in descending order
    sorted.sort(function (a, b) {
      return b - a;
    });
    console.log(sorted);
    for (var i = 0; i < currentPlayerDiceNumber.length; i++) {
      //adding each value from the array to get the highest permutation available
      totalDiceValue += currentPlayerDiceNumber[i];
    }
  }
  console.log(totalDiceValue);
  return `Hi, Player ${currentPlayer}<br> You rolled: ${diceValue}`;
}
function main(input) {
  var myOutputValue = "";
  if (gameMode == "Get_game_mode") {
    //verify which gamemode is selected
    if (input == "normal") {
      gameMode = "normal";
      myOutputValue =
        "Game mode: Normal <br>Player with the highest number wins the game!<br>Press submit to begin.";
    } else if (input == "reverse") {
      gameMode = "reverse";
      myOutputValue =
        "Game mode: Reverse <br>Player with the lowest number wins the game!<br>Press submit to begin.";
    } else if (input == "choice") {
      gameMode = "choice";
      myOutputValue =
        "Game mode: Choice Of Dice <br> Players can choose the amount of dice they would like to roll!<br> Please input how many dice (ranging from 2 - 10 dice) you would like to roll!";
    } else {
      myOutputValue =
        "Invalid game mode! Please input either 'normal' or 'reverse' or 'choice' !";
    }
    return myOutputValue;
  }
  if (gameMode == "normal") {
    if (gamestate == GET_DICE_ROLL) {
      myOutputValue = getDiceNumber();
      gamestate = GET_DICE_ORDER;
      return myOutputValue;
    }
    if (gamestate == GET_DICE_ORDER) {
      myOutputValue = getPlayerScore(input);
    }
    if (currentPlayer == 1) {
      currentPlayer = 2;
      gamestate = GET_DICE_ROLL;
      return myOutputValue + "<br> It is now player 2's turn!";
    }
    if (currentPlayer == 2) {
      gamestate = COMPARESCORE;
      console.log(gamestate);
      currentPlayer = 3; //reason for this is so that my function will move down to comparescore
      // is there a way around this? please advice 🙏
      return myOutputValue + "<br> Press submit to calculate scores!";
    }
    if (gamestate == COMPARESCORE) {
      myOutputValue = `Player 1 score: ${totalScore[0]} <br>Player 2 score: ${totalScore[1]}`;
      //player1 wins
      if (totalScore[0] > totalScore[1]) {
        myOutputValue = myOutputValue + "<br>Player 1 Wins!";
      }
      //player 2 wins
      else if (totalScore[1] > totalScore[0]) {
        myOutputValue = myOutputValue + "<br>Player 2 Wins!";
      }
      //draw
      else if (totalScore[0] == totalScore[1]) {
        myOutputValue = myOutputValue + "<br>Its a tie!";
      }
      currentPlayer = 1;
      gamestate = GET_DICE_ROLL;
      totalScore = [];
      return (
        myOutputValue +
        "<br>Press submit to play another round or if you would like to change game modes, please refresh your browser!"
      );
    }
  }
  if (gameMode == "reverse") {
    if (gamestate == GET_DICE_ROLL) {
      myOutputValue = getDiceNumber();
      gamestate = GET_DICE_ORDER;
      return myOutputValue;
    }
    if (gamestate == GET_DICE_ORDER) {
      myOutputValue = getPlayerScore(input);
    }
    if (currentPlayer == 1) {
      currentPlayer = 2;
      gamestate = GET_DICE_ROLL;
      return myOutputValue + "<br> It is now player 2's turn!";
    }
    if (currentPlayer == 2) {
      gamestate = COMPARESCORE;
      console.log(gamestate);
      currentPlayer = 3; //reason for this is so that my function will move down to comparescore
      return myOutputValue + "<br> Press submit to calculate scores!";
    }
    if (gamestate == COMPARESCORE) {
      myOutputValue = `Player 1 score: ${totalScore[0]} <br>Player 2 score: ${totalScore[1]}`;
      //player1 wins
      if (totalScore[0] < totalScore[1]) {
        myOutputValue = myOutputValue + "<br>Player 1 Wins!";
      }
      //player 2 wins
      else if (totalScore[1] < totalScore[0]) {
        myOutputValue = myOutputValue + "<br>Player 2 Wins!";
      }
      //draw
      else if (totalScore[0] == totalScore[1]) {
        myOutputValue = myOutputValue + "<br>Its a tie!";
      }
      currentPlayer = 1;
      gamestate = GET_DICE_ROLL;
      totalScore = [];
      return (
        myOutputValue +
        "<br>Press submit to play another round or if you would like to change game modes, please refresh your browser!"
      );
    }
  }
  if (gameMode == "choice") {
    console.log("game mode = choice");

    if (gamestate == GET_DICE_ROLL) {
      var getAmountOfDice = Number(input);
      if (getAmountOfDice < 2 || getAmountOfDice > 10) {
        myOutputValue =
          "Invalid input! Please enter a number ranging from 2 - 10!";
        return myOutputValue;
      } else {
        gamestate = GET_DICE_ORDER;
        myOutputValue = getDiceNumber(getAmountOfDice);
        return myOutputValue;
      }
    }
    if (gamestate == GET_DICE_ORDER) {
      myOutputValue = getPlayerScore();
    }
    if (currentPlayer == 1) {
      currentPlayer = 2;
      gamestate = GET_DICE_ROLL;
      return (
        myOutputValue +
        " It is now Player 2's turn!<br>Please input the same amount of dice that player 1 chose!"
      );
      // did not manage to make both player 1 and 2 roll the same amount of dice automaticallyz
    }
    if (currentPlayer == 2) {
      gamestate = COMPARESCORE;
      currentPlayer = 3; //to continue down to the next if statement
      return myOutputValue + "Press submit to see who is the winner.";
    }
    if (gamestate == COMPARESCORE) {
      console.log("gamestate = compare");
      myOutputValue = `Player 1 score: ${totalScore[0]} <br>Player 2 score: ${totalScore[1]}`;
      //player1 wins
      if (totalScore[0] > totalScore[1]) {
        myOutputValue = myOutputValue + "<br>Player 1 Wins!";
      }
      //player 2 wins
      else if (totalScore[1] > totalScore[0]) {
        myOutputValue = myOutputValue + "<br>Player 2 Wins!";
      }
      //draw
      else if (totalScore[0] == totalScore[1]) {
        myOutputValue = myOutputValue + "<br>Its a tie!";
      }
      currentPlayer = 1;
      gamestate = GET_DICE_ROLL;
      totalScore = [];
      return (
        myOutputValue +
        "<br>Please input how many dice (ranging from 2 - 10 dice) you would like to roll and press submit to play another round or if you would like to change game modes, please refresh your browser!"
      );
    }
  }
}
