var player1Number1 = "";
var player1Number2 = "";
var player1NumberCombined = "";
var player2Number1 = "";
var player2Number2 = "";
var player2NumberCombined = "";
var gameMode = "selection";
var genericDice1 = "";
var genericDice2 = "";
var player1Score = Number(0);
var player2Score = Number(0);

var main = function (input) {
  if (gameMode == "selection") {
    gameMode = "chooseSelection";
    return `Please type in "Normal" or "Lowest" to select the game mode.`;
  }
  if (gameMode == "chooseSelection") {
    input = input.toLowerCase();
    if (input !== "normal" && input !== "lowest" && input !== "reset") {
      return `Please type in "Normal" or "Lowest" to select the game mode.`;
    }
    if (input == "normal") {
      gameMode = "p1turn";
      return `You have selected normal mode. <br>
Please press submit to continue as player 1.`;
    }
    if (input == "lowest") {
      gameMode = "p1turnLowest";
      return `You have selected lowest mode. <br> 
  Please press submit to continue as player 1.`;
    }
    if (input == "reset") player1Score = Number(0);
    player2Score = Number(0);
    return `The scores have been reset. Please type in "Normal" or "Lowest" to select the game mode.`;
  }

  if (gameMode == "p1turn") {
    player1Number1 = diceGenerator();
    player1Number2 = diceGenerator();
    gameMode = "player1ChooseAnswer";
    console.log(gameMode, "Game Mode");
    return `Welcome Player 1. <br>
      You rolled Dice 1: ${player1Number1} and Dice 2: ${player1Number2} <br>
      Choose the order of the dice by entering 1 or 2 as the first numeral index.`;
  }
  if (gameMode == "player1ChooseAnswer") {
    if (Number(input) !== 1 && Number(input) !== 2) {
      console.log(gameMode, "Game Mode");
      return `Please input 1 or 2 to select your number. <br>
      Your current numbers are Dice 1: ${player1Number1} and Dice 2: ${player1Number2}`;
    }
    if (Number(input) == 1) {
      player1NumberCombined = `${player1Number1}${player1Number2}`;
      gameMode = "p2turn";
      console.log(gameMode, "Game Mode");
      return `You chose dice 1 first. Your number is ${player1NumberCombined} <br>
      It is now Player 2's turn.`;
    }
    if (Number(input) == 2) {
      player1NumberCombined = `${player1Number2}${player1Number1}`;
      gameMode = "p2turn";
      console.log(gameMode, "Game Mode");
      return `You chose dice 2 first. Your number is ${player1NumberCombined} <br>
      It is now Player 2's turn.`;
    }
  }
  if (gameMode == "p2turn") {
    player2Number1 = diceGenerator();
    player2Number2 = diceGenerator();
    gameMode = "player2ChooseAnswer";
    console.log(gameMode, "Game Mode");
    return `Please input 1 or 2 to select your number. <br>
 Your current numbers are Dice 1: ${player2Number1} and Dice 2: ${player2Number2}`;
  }
  if (gameMode == "player2ChooseAnswer") {
    if (Number(input) !== 1 && Number(input) !== 2) {
      console.log(gameMode, "Game Mode");
      return `Please input 1 or 2 to select your number. <br>
      Your current numbers are Dice 1: ${player2Number1} and Dice 2: ${player2Number2}`;
    }
    if (Number(input) == 1) {
      player2NumberCombined = `${player2Number1}${player2Number2}`;
      gameMode = "winner";
      console.log(gameMode, "Game Mode");
      return `You chose dice 1 first. Your number is ${player2NumberCombined} <br>
      It is time to see who won.`;
    }
    if (Number(input) == 2) {
      player2NumberCombined = `${player2Number2}${player2Number1}`;
      gameMode = "winner";
      console.log(gameMode, "Game Mode");
      return `You chose dice 2 first. Your number is ${player2NumberCombined} <br>
      It is time to see who won.`;
    }
  }
  if (gameMode == "winner") {
    if (player1NumberCombined > player2NumberCombined) {
      gameMode = "restart";
      player1Score = player1Score + 1;
      return `Player 1's number of ${player1NumberCombined} is higher than player 2's number of ${player2NumberCombined} <br>
      Player 1 has won. Please play again. <br>
      Player 1 wins = ${player1Score} <br>
      Player 2 wins = ${player2Score}`;
    }
    if (player2NumberCombined > player1NumberCombined) {
      gameMode = "restart";
      player2Score = player2Score + 1;
      return `Player 2's number of ${player2NumberCombined} is higher than player 1's number of ${player1NumberCombined} <br>
      Player 2 has won. Please play again. <br>
      Player 1 wins = ${player1Score} <br>
      Player 2 wins = ${player2Score}`;
    }
    if (player1NumberCombined == player2NumberCombined) {
      gameMode = "restart";
      return `Player 1's number of ${player1NumberCombined} is the same as player 2's number of ${player2NumberCombined} <br>
      The game is a draw. Please play again <br>
      Player 1 wins = ${player1Score} <br>
      Player 2 wins = ${player2Score}`;
    }
  }
  if (gameMode == "p1turnLowest") {
    player1Number1 = diceGenerator();
    player1Number2 = diceGenerator();
    if (player1Number1 > player1Number2) {
      gameMode = "p2turnLowest";
      player1NumberCombined = `${player1Number2}${player1Number1}`;
      return `Player 1's dice roll generated from ${player1Number1} and ${player1Number2} is <br>
        ${player1NumberCombined}`;
    }
    if (player1Number1 < player1Number2) {
      gameMode = "p2turnLowest";
      player1NumberCombined = `${player1Number1}${player1Number2}`;
      return `Player 1's dice roll generated from ${player1Number1} and ${player1Number2} is <br>
        ${player1NumberCombined}`;
    }
    if (player1Number1 == player1Number2) {
      gameMode = "p2turnLowest";
      player1NumberCombined = `${player1Number1}${player1Number2}`;
      return `Player 1's dice roll generated from ${player1Number1} and ${player1Number2} is <br>
        ${player1NumberCombined}`;
    }
  }
  if (gameMode == "p2turnLowest") {
    player2Number1 = diceGenerator();
    player2Number2 = diceGenerator();
    if (player2Number1 < player2Number2) {
      gameMode = "winnerLowest";
      player2NumberCombined = `${player2Number1}${player2Number2}`;
      return `Player 2's dice roll generated from ${player2Number1} and ${player2Number2} is <br>
        ${player2NumberCombined}`;
    }
    if (player2Number1 > player2Number2) {
      gameMode = "winnerLowest";
      player2NumberCombined = `${player2Number1}${player2Number2}`;
      return `Player 2's dice roll generated from ${player2Number1} and ${player2Number2} is <br>
        ${player2NumberCombined}`;
    }
    if (player2Number1 == player2Number2) {
      gameMode = "winnerLowest";
      player2NumberCombined = `${player2Number1}${player2Number2}`;
      return `Player 2's dice roll generated from ${player2Number1} and ${player2Number2} is <br>
        ${player2NumberCombined}`;
    }
  }
  if (gameMode == "winnerLowest") {
    if (player1NumberCombined < player2NumberCombined) {
      gameMode = "restart";
      player1Score = player1Score + 1;
      return `Player 1's number of ${player1NumberCombined} is lower than player 2's number of ${player2NumberCombined} <br>
      Player 1 has won times. Please play again. <br>
      Player 1 wins = ${player1Score} <br>
      Player 2 wins = ${player2Score}`;
    }
    if (player2NumberCombined < player1NumberCombined) {
      gameMode = "restart";
      player2Score = player2Score + 1;
      return `Player 2's number of ${player2NumberCombined} is lower than player 1's number of ${player1NumberCombined} <br>
      Player 2 has won. Please play again. <br>
      Player 1 wins = ${player1Score} <br>
      Player 2 wins = ${player2Score}`;
    }
    if (player1NumberCombined == player2NumberCombined) {
      gameMode = "restart";
      return `Player 1's number of ${player1NumberCombined} is the same as player 2's number of ${player2NumberCombined} <br>
      The game is a draw. Please play again <br>
      Player 1 wins = ${player1Score} <br>
      Player 2 wins = ${player2Score}`;
    }
  }

  if (gameMode == "restart") {
    player1Number1 = "";
    player1Number2 = "";
    player1NumberCombined = "";
    player2Number1 = "";
    player2Number2 = "";
    player2NumberCombined = "";
    gameMode = "chooseSelection";
    return `The game has been reset. Please type "Normal" or "Lowest" to play again. <br>
    Type "Reset" to reset the score. `;
  }
};
//Dice Generator (1-6)
var diceGenerator = function () {
  var diceValueGenerated = Math.floor(Math.random() * 6) + 1;
  return diceValueGenerated;
};
