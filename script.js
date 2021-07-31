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
var selectGameModes = `select game mode`;
// 2 Player normal
var twoPlayer_EnterDice = `enter dice roll`;
var twoPlayer_EnterSeq = `enter sequence of dice`; //not needed anymore
var twoPlayer_NORMALannounceWinner = `announce winner for normal game before returning to P1`;
// 2 Player lowest combined num
var twoPlayerLowest_EnterDice = `enter dice for lowest combined number game`;
var twoPlayerLowest_EnterSeq = `enter sequence for lowest combined number game`; //not needed anymore
var twoPlayer_LOWESTannounceWinner = `announce winner for Lowest Combined Number game before returning to P1`;
var varNumofDice = `mode with variable num of dice`;
var varNumofDice_rollDice = `roll dice for variable num of dice mode`
var varNumofDice_announceWinner = `var num of dice - winner`
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
  var outputMessage = ``;
  if (input.toUpperCase() == "NORMAL") {
    gameMode = twoPlayer_EnterDice;
    outputMessage = `Hit submit to start the Normal 2 player BEAT THAT game!`;
  } else if (input.toUpperCase() == "LOWEST") {
    gameMode = twoPlayerLowest_EnterDice;
    outputMessage = `Hit submit to start the lowest combined number - 2 player BEAT THAT game!`;
  } else if (input.toUpperCase() == "AUTO") {
    gameMode = auto_twoPlayer_EnterDice;
    outputMessage = `Hit submit to start the Auto generated combined number - 2 player BEAT THAT game!`;
  } else if (input.toUpperCase() == 'VAR DICE'){
  gameMode = varNumofDice;
  outputMessage = `Hit submit to start the variable number of dice (2 player) BEAT THAT game!`;
  } else {
    //Input validation
    outputMessage = `Input error. <br> Please select your game modes as follows: <br> 
    Input 'NORMAL' for normal 2 player mode<br>
    Input 'LOWEST' for lowest combined number - 2 player mode<br>
    Input 'VAR DICE' for variable number of dice mode`;
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
//========== Function for 2 Player Normal mode ==========
var startTwoPlayerNormalMode = function (input) {
  // 2 PLAYER NORMAL GAME - P1 START
  if (nextPlayer == 1 && gameMode == twoPlayer_EnterDice) {
    diceRolls = [];
    currPlayer = 1;
    //number of dice rolls is 2 by default
    for (var counter = 0; counter < 2; counter += 1) {
      diceRolls.push(rollDice());
    }
    console.log(`Dice rolls: ${diceRolls}`);

    if (diceRolls[0] > diceRolls[1]) {
      playerGuess = diceRolls[0] + "" + diceRolls[1];
    } else if (diceRolls[0] == diceRolls[1]) {
      playerGuess = diceRolls[0] + "" + diceRolls[1];
    } else if (diceRolls[0] < diceRolls[1]) {
      playerGuess = diceRolls[1] + "" + diceRolls[0];
    }
    nextPlayer = (currPlayer % numPlayers) + 1;

    console.log(`Player 1 Guess: ${playerGuess}`);
    P1Guesses.push(playerGuess);
    gameMode = twoPlayer_EnterDice;

    return `Welcome Player ${currPlayer}.<br>
    You rolled ${diceRolls[0]} for Dice 1 and ${diceRolls[1]} for Dice 2. 
    <br><br>
    Your auto-generated number is ${playerGuess}. <br>
    It is now Player ${nextPlayer}'s turn.`;
  }

  // 2 PLAYER NORMAL GAME - P2 START
  if (nextPlayer == 2 && gameMode == twoPlayer_EnterDice) {
    diceRolls = [];
    currPlayer = 2;
    for (var counter = 0; counter < 2; counter += 1) {
      diceRolls.push(rollDice());
    }
    console.log(`P2 Dice rolls: ${diceRolls}`);

    if (diceRolls[0] > diceRolls[1]) {
      playerGuess = diceRolls[0] + "" + diceRolls[1];
    } else if (diceRolls[0] == diceRolls[1]) {
      playerGuess = diceRolls[0] + "" + diceRolls[1];
    } else if (diceRolls[0] < diceRolls[1]) {
      playerGuess = diceRolls[1] + "" + diceRolls[0];
    }
    nextPlayer = (currPlayer % numPlayers) + 1;

    console.log(`Player 2 Guess: ${playerGuess}`);
    P2Guesses.push(playerGuess);
    gameMode = twoPlayer_NORMALannounceWinner;

    return `Hi Player ${currPlayer}!<br>
    You rolled ${diceRolls[0]} for Dice 1 and ${diceRolls[1]} for Dice 2. 
    <br><br>
    Your auto-generated number is ${playerGuess}. <br>
    It is now Player ${nextPlayer}'s turn.<br>
    Hit submit to announce the winner!`;
  }
};
//function to generate winner for Normal 2 player mode & reset game mode
var generateWinnerforTwoPlayerNormalMode = function (
  P1Guesses,
  P2Guesses,
  currPlayer,
  nextPlayer
) {
  console.log(
    `Announcing winner. Current player: ${currPlayer}, Next player: ${nextPlayer}`
  );
  console.log(`P1 Array: ${P1Guesses}, P2 Array: ${P2Guesses}`);
  console.log(
    `P1 total score: ${generateSumOfGuesses(
      P1Guesses
    )}, P2 total score: ${generateSumOfGuesses(P2Guesses)}`
  );
  var outputMessage = ``;
  if (
    // P1 WINS
    generateSumOfGuesses(P1Guesses) > generateSumOfGuesses(P2Guesses)
  ) {
    outputMessage = `Player 1's total guess is ${generateSumOfGuesses(
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
    outputMessage = `Player 1's total guess is ${generateSumOfGuesses(
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
    outputMessage = `Player 1's total guess is ${generateSumOfGuesses(
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
var startTwoPlayerLowestCombinedNumberMode = function (input) {
  // 2 player - Lowest Combined Num - P1 Starts
  if (nextPlayer == 1 && gameMode == twoPlayerLowest_EnterDice) {
    diceRolls = [];
    currPlayer = 1;
    //number of dice rolls is 2 by default
    for (var counter = 0; counter < 2; counter += 1) {
      diceRolls.push(rollDice());
    }
    console.log(`Dice rolls: ${diceRolls}`);
    if (diceRolls[0] < diceRolls[1]) {
      playerGuess = diceRolls[0] + "" + diceRolls[1];
    } else if (diceRolls[0] == diceRolls[1]) {
      playerGuess = diceRolls[0] + "" + diceRolls[1];
    } else if (diceRolls[0] > diceRolls[1]) {
      playerGuess = diceRolls[1] + "" + diceRolls[0];
    }

    console.log(`Player 1 Guess: ${playerGuess}`);
    P1Guesses.push(playerGuess);

    nextPlayer = (currPlayer % numPlayers) + 1;
    gameMode = twoPlayerLowest_EnterDice;

    return `Welcome Player ${currPlayer}.<br>
    You rolled ${diceRolls[0]} for Dice 1 and ${diceRolls[1]} for Dice 2. 
    <br><br>
    Your auto-generated number is ${playerGuess}. <br>
    It is now Player ${nextPlayer}'s turn.`;
  }

  // 2 player Lowest Combined Num - P2 Starts
  if (nextPlayer == 2 && gameMode == twoPlayerLowest_EnterDice) {
    diceRolls = [];
    currPlayer = 2;
    for (var counter = 0; counter < 2; counter += 1) {
      diceRolls.push(rollDice());
    }
    console.log(`P2 Dice rolls: ${diceRolls}`);

    if (diceRolls[0] < diceRolls[1]) {
      playerGuess = diceRolls[0] + "" + diceRolls[1];
    } else if (diceRolls[0] == diceRolls[1]) {
      playerGuess = diceRolls[0] + "" + diceRolls[1];
    } else if (diceRolls[0] > diceRolls[1]) {
      playerGuess = diceRolls[1] + "" + diceRolls[0];
    }

    P2Guesses.push(playerGuess);
    console.log(`Player 2 Guess: ${playerGuess}`);
    nextPlayer = (currPlayer % numPlayers) + 1;
    gameMode = twoPlayer_LOWESTannounceWinner;
    return `Hi Player ${currPlayer}.<br>
    You rolled ${diceRolls[0]} for Dice 1 and ${diceRolls[1]} for Dice 2. <br>
    Your auto generated number is ${playerGuess}. <br>
    Hit submit to announce the winner!`;
  }
};

//=== Function to generate winner for Lowest Combined Number mode ====
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
  var outputMessage = ``;
  if (
    // P1 WINS
    Number(P1Guesses[P1Guesses.length - 1]) <
    Number(P2Guesses[P2Guesses.length - 1])
  ) {
    outputMessage = `Winner is Player 1! <br>
      Player 1's last guess is ${
        P1Guesses[P1Guesses.length - 1]
      } and Player 2's last guess is ${P2Guesses[P2Guesses.length - 1]}. <br>
      It is now Player ${nextPlayer}'s turn.<br>
      We will now reset the game modes`;
  } else if (
    //P2 WINS
    Number(P1Guesses[P1Guesses.length - 1]) >
    Number(P2Guesses[P2Guesses.length - 1])
  ) {
    outputMessage = `Winner is Player 2! <br>
        Player 2's last guess is ${
          P2Guesses[P2Guesses.length - 1]
        } and Player 1's last guess is ${P1Guesses[P1Guesses.length - 1]}. <br>
        It is now Player ${nextPlayer}'s turn. <br>
        We will now reset the game modes`;
  } else if (
    //DRAW
    Number(P1Guesses[P1Guesses.length - 1]) ==
    Number(P2Guesses[P2Guesses.length - 1])
  ) {
    outputMessage = `It's a draw! <br>
      Player 1's last guess is ${
        P1Guesses[P1Guesses.length - 1]
      } and Player 2's last guess is ${P2Guesses[P2Guesses.length - 1]}. <br>
      It is now Player ${nextPlayer}'s turn.<br>
      We will now reset the game modes`;
  }
  gameMode = startGame;
  return outputMessage;
};
//===== Function for Var Num of Dice mode ======

var startVarNumofDice = function (input, currPlayer, nextPlayer) {
  var outputMessage=``;
  if (gameMode == (varNumofDice)){
    gameMode = varNumofDice_rollDice;
    return `Welcome! Please input the number of dice you wish to roll`

  } else if (gameMode == varNumofDice_rollDice){
    if (isNaN(input)==true || (input<0)){ 
      return `please enter a number greater than 0.`
    } else if (input>0){
    currPlayer = 1;
    nextPlayer = (currPlayer % numPlayers) + 1; 
    var P1diceRolls = [];
    var P2diceRolls = [];
    //number of dice rolls is decided by user
    for (var counter = 0; counter < input; counter += 1) {
      P1diceRolls.push(rollDice());
    }
    for (var counter = 0; counter < input; counter += 1) {
      P2diceRolls.push(rollDice());
    }
    
    P1diceRolls.sort();
    P2diceRolls.sort();
    console.log ('P1:'+P1diceRolls,'P2:'+P2diceRolls);

  //to determine winner
    var P1Answer = P1diceRolls[P1diceRolls.length-1] + "" + P1diceRolls[P1diceRolls.length-2];
    console.log('P1:'+P1Answer)
    var P2Answer = P2diceRolls[P2diceRolls.length-1] + "" + P2diceRolls[P2diceRolls.length -2];
    console.log('P2:'+P2Answer)
      // P1 WINS
    if (Number(P1Answer) < Number(P2Answer)){
      outputMessage = `Winner is Player 1! <br>
      Player 1 rolled: ${P1diceRolls}<br>
      Player 2 rolled: ${P2diceRolls}
      
      Player 1's auto guess is ${P1Answer} and Player 2's last guess is ${P2Answer}. <br>
      It is now Player ${nextPlayer}'s turn.<br>
      We will now reset the game modes`;
    } else if (
      //P2 WINS
      Number(P2Answer) < Number(P1Answer)
    ) {
      outputMessage = `Winner is Player 2! <br>
      Player 1 rolled: ${P1diceRolls}<br>
      Player 2 rolled: ${P2diceRolls}
        Player 1's auto guess is ${P1Answer} and Player 2's last guess is ${P2Answer}. <br>
        It is now Player ${nextPlayer}'s turn.<br>
        We will now reset the game modes`;
    } else if (
      //DRAW
      Number(P1Answer) == Number(P2Answer)
    ) {
      outputMessage = `It's a Draw!! <br>
      Player 1 rolled: ${P1diceRolls}<br>
      Player 2 rolled: ${P2diceRolls}
        Player 1's auto guess is ${P1Answer} and Player 2's last guess is ${P2Answer}. <br>
        It is now Player ${nextPlayer}'s turn.<br>
        We will now reset the game modes`;
    }
    gameMode = startGame;
    return outputMessage;
  }}
};

// =========================== MAIN FUNC ==========================
var main = function (input) {
  console.log(gameMode);
  console.log(gameMode == varNumofDice);
  if (gameMode == startGame) {
    gameMode = selectGameModes;
    return `Please select your game modes as follows: <br> 
  Input 'NORMAL' for normal 2 player mode<br>
  Input 'LOWEST' for lowest combined number - 2 player mode<br>
  Input 'VAR DICE' for variable number of dice mode`;
  } else if (gameMode == selectGameModes) {
    return inputGameModes(input);

    // 2 PLAYER NORMAL GAME - START ==========
  } else if (
    gameMode == twoPlayer_EnterDice ||
    gameMode == twoPlayer_EnterSeq
  ) {
    return startTwoPlayerNormalMode(input);

    // 2 PLAYER NORMAL GAME - Announce winner & RESET =======
  } else if (gameMode == twoPlayer_NORMALannounceWinner) {
    gameMode = twoPlayer_EnterDice;
    return generateWinnerforTwoPlayerNormalMode(
      P1Guesses,
      P2Guesses,
      currPlayer,
      nextPlayer
    );
    // 2 PLAYER LOWEST COMBINED NUM GAME - START =======
  } else if (
    gameMode == twoPlayerLowest_EnterDice ||
    gameMode == twoPlayerLowest_EnterSeq
  ) {
    return startTwoPlayerLowestCombinedNumberMode(input);

    // 2 PLAYER LOWEST COMBINED NUM GAME - Announce winner && RESET =======
  } else if ((gameMode == twoPlayer_LOWESTannounceWinner)) {
    return generateWinnerforTwoPlayerLowestMode(
      P1Guesses,
      P2Guesses,
      currPlayer,
      nextPlayer
    );
  } else if (gameMode == varNumofDice || gameMode == varNumofDice_rollDice || gameMode == varNumofDice_announceWinner){
    console.log(gameMode +'test');
    return startVarNumofDice (input, currPlayer, nextPlayer)
  }
}; //======= this bracket CLOSES OFF the main function =======
