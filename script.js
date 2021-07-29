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

var P1enterDiceRoll = `P1 enter dice roll`;
var P1enterSequence = `P1 enter sequence of dice`;
var P2enterDiceRoll = `P2 enter dice roll`;
var P2enterSequence = `P2 enter sequence of dice`;
var announceWinner = `announce winner before returning to P1`;
var gameMode = P1enterDiceRoll;
var diceRolls = [];
var currPlayer = 1;
var playerGuess = [];
var P1Guesses = [];
var P2Guesses = [];

var numPlayers = 2;
var numRoundsPlayedByEachPlayer = Array(numPlayers).fill(0);
var numWinsOfEachPlayer = Array(numPlayers).fill(0);
//to track total running score
var generateSumOfGuesses = function (ArrayOfPLayerGuesses) {
  var sumOfGuesses = 0;
  for (var i = 0; i < ArrayOfPLayerGuesses.length; i += 1) {
    sumOfGuesses = sumOfGuesses + Number(ArrayOfPLayerGuesses[i]);
  }
  return sumOfGuesses;
};



// =========================== MAIN FUNC ==========================
var main = function (input) {
  console.log(gameMode);
  if (gameMode == P1enterDiceRoll) {
    currPlayer = 1;
    for (var counter = 0; counter < 2; counter += 1) {
      diceRolls.push(rollDice());
    }
    console.log(`Dice rolls: ${diceRolls}`);

    gameMode = P1enterSequence;
    return `Welcome Player ${currPlayer}.<br>
    You rolled ${diceRolls[0]} for Dice 1 and ${diceRolls[1]} for Dice 2. <br>
    Choose the order of the dice by inputting '1' or '2' to select the first integer of your score.`;
  } else if (gameMode == P1enterSequence) {
    currPlayer = 1;
    input = Number(input);
    if (input == 1) {
      playerGuess = diceRolls[0] + "" + diceRolls[1];
    } else if (input == 2) {
      playerGuess = diceRolls[1] + "" + diceRolls[0];
    }
    nextPlayer = (currPlayer % numPlayers) + 1;
    console.log(`Player Guess: ${playerGuess}`);

    P1Guesses.push(playerGuess);
    diceRolls = [];
    gameMode = P2enterDiceRoll;

    return `Player ${currPlayer}, you chose Dice ${input} first. <br>
    Your number is ${playerGuess}. <br>
    It is now Player ${nextPlayer}'s turn.`;
  }
  if (gameMode == P2enterDiceRoll) {
    currPlayer = 2;
    for (var counter = 0; counter < 2; counter += 1) {
      diceRolls.push(rollDice());
    }
    console.log(`P2 Dice rolls: ${diceRolls}`);

    gameMode = P2enterSequence;
    return `Welcome Player ${currPlayer}.<br>
    You rolled ${diceRolls[0]} for Dice 1 and ${diceRolls[1]} for Dice 2. <br>
    Choose the order of the dice by inputting '1' or '2' to select the first integer of your score.`;
  } else if (gameMode == P2enterSequence) {
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
    gameMode = announceWinner;
    return `Player ${currPlayer}, you chose Dice ${input} first. <br>
    Your number is ${playerGuess}. <br>
    Hit submit to announce the winner!`;
  } //to keep score of each player
  else if (gameMode == announceWinner) {
    gameMode = P1enterDiceRoll;
    console.log(`current player: ${currPlayer}, Next player: ${nextPlayer}`);
    console.log(
      `P1 Array: ${Number(P1Guesses)}, P2 Array: ${Number(P2Guesses)}`
    );
    console.log(
      `P1 total score: ${generateSumOfGuesses(
        P1Guesses
      )}, P2 total score: ${generateSumOfGuesses(P2Guesses)}`
    );

    if ( // P1 WINS
      generateSumOfGuesses(P1Guesses) > generateSumOfGuesses(P2Guesses)) {
      return `Player 1's total guess is ${generateSumOfGuesses(
        P1Guesses
      )} and Player 2's total guess is ${generateSumOfGuesses(P2Guesses)}. <br>
    Winner is Player 1! <br>
    Leaderboard (Scores in decreasing order): <br>
    Player 1's guesses is ${P1Guesses} and Player 2's guesses are ${P2Guesses}. <br>
    It is now Player ${nextPlayer}'s turn.`;

    
    } else if ( //P2 WINS
      generateSumOfGuesses(P2Guesses) > generateSumOfGuesses(P1Guesses)
    ) {
      return `Player 1's total guess is ${generateSumOfGuesses(
        P1Guesses
      )} and Player 2's total guess is ${generateSumOfGuesses(P2Guesses)}. <br>
      Winner is Player ${currPlayer}! <br>
      Leaderboard (Scores in decreasing order):<br>
      Player 2's guesses is ${P2Guesses} and Player 1's guesses are ${P1Guesses}. <br>
      It is now Player ${nextPlayer}'s turn.`;
      
    } else if ( //DRAW
      generateSumOfGuesses(P2Guesses) = generateSumOfGuesses(P1Guesses)
    ) {
      return `Player 1's total guess is ${generateSumOfGuesses(
        P1Guesses
      )} and Player 2's total guess is ${generateSumOfGuesses(P2Guesses)}. <br>
      It's a DRAW <br>
      Leaderboard (no particular order):<br>
      Player 1's guesses are ${P1Guesses} and Player 2's guesses are ${P2Guesses}. <br>
      It is now Player ${nextPlayer}'s turn.`;
    }
  }
};
