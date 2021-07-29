//Roll Dice Function
var rollDice = function () {
  // produces a decimal between 0 and 6
  var randomDecimal = Math.random() * 6;
  // take off the decimal
  var randomInteger = Math.floor(randomDecimal);
  // it's a number from 0 - 5 ... add 1
  var diceNumber = randomInteger + 1;
  return diceNumber;
};
// Define Game Modes
var startGame = `displaying game modes`;
var selectGameModes = `select game mode`
var twoPlayer_EnterDice = `enter dice roll`;
var twoPlayer_EnterSeq = `enter sequence of dice`;

var twoPlayerLowest_EnterDice = `enter dice for lowest combined number game`;
var twoPlayerLowest_EnterSeq =`enter sequence for lowest combined number game`;
var twoPlayer_LOWESTannounceWinner = `announce winner for Lowest Combined Number game before returning to P1`;
var auto_twoPlayer_EnterDice;

// Define initial Game Mode!
var gameMode = startGame;

// Define global variables
var diceRolls = [];
var currPlayer = 1;
var nextPlayer = 1;

var playerGuess = [];
var P1Guesses = [];
var P2Guesses = [];

// Global Variables for Multi-player game
var numPlayers = 2;
var numRoundsPlayedByEachPlayer = Array(numPlayers).fill(0);
var numWinsOfEachPlayer = Array(numPlayers).fill(0);

//function to select game mode
var inputGameModes = function (input) {
  var outputMessage=``;
  if (input.toUpperCase() == "NORMAL") {
    gameMode = twoPlayer_EnterDice;
    outputMessage = `Hit submit to start the Normal 2 player BEAT THAT game!`
  } else if (input.toUpperCase() == "LOWEST") {
    gameMode = twoPlayerLowest_EnterDice;
    outputMessage = `Hit submit to start the lowest combined number - 2 player BEAT THAT game!`
  } else if (input.toUpperCase() == "AUTO") {
    gameMode = auto_twoPlayer_EnterDice;
    outputMessage = `Hit submit to start the Auto generated combined number - 2 player BEAT THAT game!`
  } else { //Input validation
    outputMessage = `Please select your game modes as follows: <br> 
    Input 'NORMAL' for normal 2 player mode<br>
    Input 'LOWEST' for lowest combined number - 2 player mode<br>`;
  }
  return outputMessage;
};

//function to track total running score of a player
var generateSumOfGuesses = function (ArrayOfPLayerGuesses) {
  var sumOfGuesses = 0;
  for (var i = 0; i < ArrayOfPLayerGuesses.length; i += 1) {
    sumOfGuesses = sumOfGuesses + Number(ArrayOfPLayerGuesses[i]);
  }
  return sumOfGuesses;
};
//function for 2 player Normal mode
var startTwoPlayerNormalMode = function (input){
 // ========= 2 PLAYER NORMAL GAME - P1 START ==========
  if (nextPlayer == 1 && gameMode == twoPlayer_EnterDice) {
    currPlayer = 1;
    //number of dice rolls is 2 by default
    for (var counter = 0; counter < 2; counter += 1) {
      diceRolls.push(rollDice());
    }
    console.log(`Dice rolls: ${diceRolls}`);

    gameMode = twoPlayer_EnterSeq;
    return `Welcome Player ${currPlayer}.<br>
    You rolled ${diceRolls[0]} for Dice 1 and ${diceRolls[1]} for Dice 2. <br>
    Choose the order of the dice by inputting '1' or '2' to select the first integer of your score.`;

  } else if (nextPlayer == 1 && gameMode == twoPlayer_EnterSeq) {
    input = Number(input);
    if (input == 1) {
      playerGuess = diceRolls[0] + "" + diceRolls[1];
    } else if (input == 2) {
      playerGuess = diceRolls[1] + "" + diceRolls[0];
    }
    nextPlayer = (currPlayer % numPlayers) + 1;
    console.log(`Player 1 Guess: ${playerGuess}`);

    P1Guesses.push(playerGuess);
    diceRolls = [];
    gameMode = twoPlayer_EnterDice;

    return `Player ${currPlayer}, you chose Dice ${input} first. <br>
    Your number is ${playerGuess}. <br>
    It is now Player ${nextPlayer}'s turn.`;
  }

  // ============= TWO PLAYER GAME - PLAYER 2 STARTS ==============
  if (nextPlayer == 2 && gameMode == twoPlayer_EnterDice) {
    currPlayer = 2;
    for (var counter = 0; counter < 2; counter += 1) {
      diceRolls.push(rollDice());
    }
    console.log(`P2 Dice rolls: ${diceRolls}`);

    gameMode = twoPlayer_EnterSeq;
    return `Welcome Player ${currPlayer}.<br>
    You rolled ${diceRolls[0]} for Dice 1 and ${diceRolls[1]} for Dice 2. <br>
    Choose the order of the dice by inputting '1' or '2' to select the first integer of your score.`;
  } else if (nextPlayer == 2 && gameMode == twoPlayer_EnterSeq) {
    currPlayer = 2;
    input = Number(input);
    if (input == 1) {
      playerGuess = diceRolls[0] + "" + diceRolls[1];
    } else if (input == 2) {
      playerGuess = diceRolls[1] + "" + diceRolls[0];
    }
    P2Guesses.push(playerGuess);
    nextPlayer = (currPlayer % numPlayers) + 1;
    console.log(`Player 2 Guess: ${playerGuess}`);
    diceRolls = [];
    gameMode = twoPlayer_NORMALannounceWinner;
    return `Player ${currPlayer}, you chose Dice ${input} first. <br>
    Your number is ${playerGuess}. <br>
    Hit submit to announce the winner!`;
  }}
//function to generate winner for Normal 2 player mode & reset game mode
var twoPlayer_NORMALannounceWinner = `announce winner for normal game before returning to P1`;

var generateWinnerforTwoPlayerNormalMode = function (
  P1Guesses,
  P2Guesses,
  currPlayer,
  nextPlayer
) {
  console.log(
    `Announcing winner. Current player: ${currPlayer}, Next player: ${nextPlayer}`
  );
  console.log(`P1 Array: ${Number(P1Guesses)}, P2 Array: ${Number(P2Guesses)}`);
  console.log(
    `P1 total score: ${generateSumOfGuesses(
      P1Guesses
    )}, P2 total score: ${generateSumOfGuesses(P2Guesses)}`
  );

  if (
    // P1 WINS
    generateSumOfGuesses(P1Guesses) > generateSumOfGuesses(P2Guesses)
  ) {
    outputMessage= `Player 1's total guess is ${generateSumOfGuesses(
      P1Guesses
    )} and Player 2's total guess is ${generateSumOfGuesses(P2Guesses)}. <br>
    Winner is Player 1! <br>
    Leaderboard (Scores in decreasing order): <br>
    Player 1's guesses is ${P1Guesses} and Player 2's guesses are ${P2Guesses}. <br>
    It is now Player ${nextPlayer}'s turn.<br>
    We will now reset the game modes`;
  } else if (
    //P2 WINS
    generateSumOfGuesses(P2Guesses) > generateSumOfGuesses(P1Guesses)
  ) {
    outputMessage= `Player 1's total guess is ${generateSumOfGuesses(
      P1Guesses
    )} and Player 2's total guess is ${generateSumOfGuesses(P2Guesses)}. <br>
      Winner is Player ${currPlayer}! <br>
      Leaderboard (Scores in decreasing order):<br>
      Player 2's guesses is ${P2Guesses} and Player 1's guesses are ${P1Guesses}. <br>
      It is now Player ${nextPlayer}'s turn.<br>
      We will now reset the game modes`;
  } else if (
    //DRAW
    generateSumOfGuesses(P2Guesses) == generateSumOfGuesses(P1Guesses)
  ) {
    outputMessage= `Player 1's total guess is ${generateSumOfGuesses(
      P1Guesses
    )} and Player 2's total guess is ${generateSumOfGuesses(P2Guesses)}. <br>
      It's a DRAW <br>
      Leaderboard (no particular order):<br>
      Player 1's guesses are ${P1Guesses} and Player 2's guesses are ${P2Guesses}. <br>
      It is now Player ${nextPlayer}'s turn.<br>
      We will now reset the game modes`;
  }
  gameMode = startGame;
  return outputMessage;
};

//===== Function for 2 player Lowest combined number game mode ======
var startTwoPlayerLowestCombinedNumberMode = function (input){
  // ====== 2 player - Lowest Combined Num - P1 Starts ========
  if (nextPlayer == 1 && gameMode == twoPlayerLowest_EnterDice) {
    currPlayer = 1;
    //number of dice rolls is 2 by default
    for (var counter = 0; counter < 2; counter += 1) {
      diceRolls.push(rollDice());
    }
    console.log(`Dice rolls: ${diceRolls}`);

    gameMode = twoPlayerLowest_EnterSeq;
    return `Welcome Player ${currPlayer}.<br>
    You rolled ${diceRolls[0]} for Dice 1 and ${diceRolls[1]} for Dice 2. <br>
    Choose the order of the dice by inputting '1' or '2' to select the first integer of your score.`;

  } else if (nextPlayer == 1 && gameMode == twoPlayerLowest_EnterSeq) {
    input = Number(input);
    if (input == 1) {
      playerGuess = diceRolls[0] + "" + diceRolls[1];
    } else if (input == 2) {
      playerGuess = diceRolls[1] + "" + diceRolls[0];
    }
    nextPlayer = (currPlayer % numPlayers) + 1;
    console.log(`Player 1 Guess: ${playerGuess}`);

    P1Guesses.push(playerGuess);
    diceRolls = [];
    gameMode = twoPlayerLowest_EnterDice;

    return `Player ${currPlayer}, you chose Dice ${input} first. <br>
    Your number is ${playerGuess}. <br>
    It is now Player ${nextPlayer}'s turn.`;
  }

  // =========== 2 player - Lowest Combined Num - P2 Starts ==========
  if (nextPlayer == 2 && gameMode == twoPlayerLowest_EnterDice) {
    currPlayer = 2;
    for (var counter = 0; counter < 2; counter += 1) {
      diceRolls.push(rollDice());
    }
    console.log(`P2 Dice rolls: ${diceRolls}`);

    gameMode = twoPlayerLowest_EnterSeq;
    return `Welcome Player ${currPlayer}.<br>
    You rolled ${diceRolls[0]} for Dice 1 and ${diceRolls[1]} for Dice 2. <br>
    Choose the order of the dice by inputting '1' or '2' to select the first integer of your score.`;
  } else if (nextPlayer == 2 && gameMode == twoPlayerLowest_EnterSeq) {
    currPlayer = 2;
    input = Number(input);
    if (input == 1) {
      playerGuess = diceRolls[0] + "" + diceRolls[1];
    } else if (input == 2) {
      playerGuess = diceRolls[1] + "" + diceRolls[0];
    }
    P2Guesses.push(playerGuess);
    nextPlayer = (currPlayer % numPlayers) + 1;
    console.log(`Player 2 Guess: ${playerGuess}`);
    diceRolls = [];
    gameMode = twoPlayer_LOWESTannounceWinner;
    return `Player ${currPlayer}, you chose Dice ${input} first. <br>
    Your number is ${playerGuess}. <br>
    Hit submit to announce the winner!`;
  }}

//function to generate winner for Lowest Combined Number mode
var generateWinnerforTwoPlayerLowestMode = function (
    P1Guesses,
    P2Guesses,
    currPlayer,
    nextPlayer
  ) {
    console.log(
      `Announcing winner. Current player: ${currPlayer}, Next player: ${nextPlayer}`
    );
    console.log(`P1 Array: ${Number(P1Guesses)}, P2 Array: ${Number(P2Guesses)}`);
    console.log(
      `P1 total score: ${generateSumOfGuesses(
        P1Guesses
      )}, P2 total score: ${generateSumOfGuesses(P2Guesses)}`
    );
  
    if (
      // P1 WINS
      Number(P1Guesses [P1Guesses.length-1]) < Number(P2Guesses[P2Guesses.length-1])) {
      outputMessage= `Winner is Player 1! <br>
      Player 1's last guess is ${P1Guesses [P1Guesses.length-1]} and Player 2's last guess is ${P2Guesses[P2Guesses.length-1]}. <br>
      It is now Player ${nextPlayer}'s turn.<br>
      We will now reset the game modes`;
    } else if (
      //P2 WINS
      Number(P1Guesses [P1Guesses.length-1]) > Number(P2Guesses[P2Guesses.length-1])) {
      outputMessage= `Winner is Player 2! <br>
        Player 2's last guess is ${P2Guesses [P2Guesses.length-1]} and Player 1's last guess is ${P1Guesses[P1Guesses.length-1]}. <br>
        It is now Player ${nextPlayer}'s turn. <br>
        We will now reset the game modes`;
    } else if (
      //DRAW
      Number(P1Guesses [P1Guesses.length-1]) == Number(P2Guesses[P2Guesses.length-1])) {
      outputMessage= `It's a draw! <br>
      Player 1's last guess is ${P1Guesses [P1Guesses.length-1]} and Player 2's last guess is ${P2Guesses[P2Guesses.length-1]}. <br>
      It is now Player ${nextPlayer}'s turn.<br>
      We will now reset the game modes`;
    }
    gameMode = startGame;
    return outputMessage;
  };

// =========================== MAIN FUNC ==========================
var main = function (input) {
  console.log(gameMode);
  if (gameMode == startGame) {
    gameMode = selectGameModes
    return `Please select your game modes as follows: <br> 
  Input 'NORMAL' for normal 2 player mode<br>
  Input 'LOWEST' for lowest combined number - 2 player mode<br>`;
  } else if (gameMode == selectGameModes){
    return inputGameModes (input)

  // ========= 2 PLAYER NORMAL GAME - START ==========
  } else if (gameMode == twoPlayer_EnterDice || gameMode == twoPlayer_EnterSeq){
    return startTwoPlayerNormalMode (input);

  // ======= 2 PLAYER NORMAL GAME - Announce winner & RESET =======
  } else if (gameMode == twoPlayer_NORMALannounceWinner) {
    gameMode = twoPlayer_EnterDice;
    return generateWinnerforTwoPlayerNormalMode(
      P1Guesses,
      P2Guesses,
      currPlayer,
      nextPlayer
    );
  // ======= 2 PLAYER LOWEST COMBINED NUM GAME - START =======
  } else if (gameMode == twoPlayerLowest_EnterDice || gameMode == twoPlayerLowest_EnterSeq){
    return startTwoPlayerLowestCombinedNumberMode (input)

  // ======= 2 PLAYER LOWEST COMBINED NUM GAME - Announce winner && RESET =======

  } else if (gameMode = twoPlayer_LOWESTannounceWinner){
    return generateWinnerforTwoPlayerLowestMode(P1Guesses,
      P2Guesses,
      currPlayer,
      nextPlayer);
  }
}; //======= this bracket CLOSES OFF the main function =======
