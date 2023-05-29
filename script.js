var currentPlayer = 1;
var diceRolls = []; // this is an array because we need a list to store numbers
var playerScores = [0,0]; // array to hold players' scores
var gameMode = 'waiting for roll';
// game modes are 'waiting for roll' and 'choose order'. If they don't choose 1 or 2, then it's waiting for order
var output = ''

// --- Function for randomness of rolling dice for 2 dice
var rollSingleDice = function() {
  return Math.floor(Math.random() * 6) + 1
}

var main = function (input){
  if (gameMode === 'waiting for roll'){
    console.log(gameMode, diceRolls)
    diceRolls = [rollSingleDice(), rollSingleDice()]
    
    gameMode = 'choose order'
    console.log(gameMode, diceRolls)
    return `Player ${currentPlayer}: you rolled ${diceRolls[0]} and ${diceRolls[1]}.<br> 
    Enter 1 to choose the order ${diceRolls[0]}${diceRolls[1]}, or 2 to choose the order ${diceRolls[1]}${diceRolls[0]}.`; 
  }

  if (gameMode == 'choose order') {
    console.log('need to enter 1 or 2')
    if (input != '1' && input != '2') {
      return `Please enter 1 or 2 to choose the order of the dice.`;
    }
  
    if (input == '2') {
      diceRolls.reverse();
    }

    // Calculate the score based on the (possibly reversed) diceRolls array
    var score = Number(diceRolls.join(''));

    // Store the score in playerScores
    playerScores[currentPlayer - 1] = score;
    console.log(playerScores, 'current player is ' +currentPlayer)
    output = `Player ${currentPlayer}, your score is ${score}. `;

    if (currentPlayer == 1) {
      currentPlayer += 1; //automatically goes to Player 2.
      gameMode = 'waiting for roll'; // switch game mode back to roll.
      output = `Player 2, it's your turn to roll the dice.`;

    } else {
      gameMode = 'compare results';
      
      if (gameMode == 'compare results') {
        var winner = (playerScores[0] > playerScores[1]) ? 1 : 2;
        currentPlayer = 1;
        gameMode = 'waiting for roll';
        output = `Player 1 scored ${playerScores[0]} and Player 2 scored ${playerScores[1]}. Player ${winner} wins! Click Submit to play again.`;
      }
    }
    return output;
  }
}
