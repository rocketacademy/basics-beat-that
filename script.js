/*There are 2 players and players take turns.
When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
After both players have rolled and chosen dice order, the player with the higher combined number wins.*/

//there are 2 game modes: roll dice and choose dice
//beginning is roll dice game mode for player 1
//create 2 dice rolls function
//change game mode to choose dice
//choose dice function let player1 choose
//change gamemode to roll dice and repeat for player 2
//check if player 1 value more than player 2
//output user win

//gameMode have ROLLDICE1 and CHOOSEDICE1 for player1, ROLLDICE2 and CHOOSEDICE2 for player2
//gameMode CHOOSEWINNER after one round

//GameModes
var ROLLDICE1 = "ROLLDICE1";
var ROLLDICE2 = "ROLLDICE2";
var CHOOSEDICE1 = "CHOOSEDICE1";
var CHOOSEDICE2 = "CHOOSEDICE2";
var CHOOSEWINNER = "CHOOSEWINNER";

//Initialise the game state to start with Player 1 roll dice
var gameMode = "ROLLDICE1";
//Create array to store the 2 dice numbers
var diceNumber = [];
//Keep track of both player 1 & 2 scores
var player1Score = "";
var player2Score = "";

var myOutputValue = "";

//Roll dice functions and store the 2 values into an array
var rollDice = function () {
  var diceNumber1 = Math.floor(Math.random() * 6) + 1;
  var diceNumber2 = Math.floor(Math.random() * 6) + 1;
  diceNumber[0] = diceNumber1;
  diceNumber[1] = diceNumber2;
  return diceNumber;
};

//Choose dice order based on player input
var chooseDice = function (input) {
  if (gameMode == "CHOOSEDICE1") {
    if (input == 1) {
      console.log(diceNumber);
      player1Score = `${diceNumber[0]}${diceNumber[1]}`;
    }
    if (input == 2) {
      player1Score = `${diceNumber[1]}${diceNumber[0]}`;
    }
    console.log(player1Score, "player1Score");
    return player1Score;
  }

  if (gameMode == "CHOOSEDICE2") {
    if (input == "1") {
      console.log(diceNumber);
      player2Score = `${diceNumber[0]}${diceNumber[1]}`;
    }
    if (input == "2") {
      player2Score = `${diceNumber[1]}${diceNumber[0]}`;
    }
    console.log(player2Score, "player2Score");
    return player2Score;
  }
};

//Compare both user scores and decide which is higher or if it's a tie
var chooseWinner = function (player1Score, player2Score) {
  console.log("choose winner");
  if (player1Score < player2Score) {
    console.log("player 1 < player 2");
    myOutputValue = `Player 2 has won and Player 1 lost. <br> Player 1 score: ${player1Score} <br> Player 2 score: ${player2Score} <br> Click Submit again to play (Player 1's turn)`;
  }
  if (player1Score > player2Score) {
    console.log("player 1 > player 2");
    myOutputValue = `Player 1 has won and Player 2 lost. <br> Player 1 score: ${player1Score} <br> Player 2 score: ${player2Score} <br> Click Submit again to play (Player 1's turn)`;
  }
  if (player1Score == player2Score) {
    console.log("player 1 = player 2");
    myOutputValue = `It's a tie!<br> Player 1 score: ${player1Score} <br> Player 2 score: ${player2Score} <br> Click Submit again to play (Player 1's turn)`;
  }
};

var main = function (input) {
  if (gameMode == ROLLDICE1) {
    rollDice();
    console.log(diceNumber);
    gameMode = CHOOSEDICE1;
    return `Player 1. You have rolled Dice 1 as ${diceNumber[0]} and  Dice 2 as ${diceNumber[1]}. <br> Choose which dice you want to be first. <br> Input '1' or '2' `;
  }
  if (gameMode == CHOOSEDICE1) {
    if (input == "" || input == null || (input != 1 && input != 2)) {
      return "Invalid. Please input either '1' or '2' only";
    }
    chooseDice(input);
    gameMode = ROLLDICE2;
    return `Player 1. You have chosen ${input} as the first dice. <br>Your score is ${player1Score}. <br> Now it is Player 2's turn. Please click Submit to roll the dice`;
  }

  if (gameMode == ROLLDICE2) {
    rollDice();
    console.log(diceNumber);
    gameMode = CHOOSEDICE2;
    return `Player 2. You have rolled Dice 1 as ${diceNumber[0]} and  Dice 2 as ${diceNumber[1]}. <br> Choose which dice you want to be first. <br> Input '1' or '2' `;
  }
  if (gameMode == CHOOSEDICE2) {
    if (input == "" || input == null || (input != 1 && input != 2)) {
      return "Invalid. Please input either '1' or '2' only";
    }
    chooseDice(input);
    gameMode = CHOOSEWINNER;
    return `Player 2. You have chosen ${input} as the first dice.<br> Your score is ${player2Score}. <br> Please click Submit to determine who win the game`;
  }

  if (gameMode == CHOOSEWINNER) {
    player1Score = Number(player1Score);
    player2Score = Number(player2Score);
    chooseWinner(player1Score, player2Score);
    gameMode = "ROLLDICE1";
    return myOutputValue;
  }
};
