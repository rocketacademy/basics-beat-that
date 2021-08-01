//Dice Roll function
var diceRoll = function () {
  return Math.ceil(Math.random() * 6);
};

//Starting game mode
gameMode = `rollingDice`;

//Player 1 roll
var p1Roll = [diceRoll(), diceRoll()];
//Player 2 roll
var p2Roll = [diceRoll(), diceRoll()];

//Combine 2 numbers
var combineP1 = `${p1Roll[0]}${p1Roll[1]}`;
var revCombineP1 = `${p1Roll[1]}${p1Roll[0]}`;
var combineP2 = `${p2Roll[0]}${p2Roll[1]}`;
var revCombineP2 = `${p2Roll[1]}${p2Roll[0]}`;

//Save chosen number
var p1Number = ``;
var p2Number = ``;

//Keep track of player (Max to player 2)
var currentPlayer = 1;

//Keep score

//Main game
var main = function (input) {
  // Player 1 start rolling
  if (gameMode == `rollingDice` && currentPlayer == 1) {
    gameMode = `chooseDiceOrder`;
    var myOutputValue = `Welcome Player 1. <br><br>You rolled ${p1Roll[0]} and ${p1Roll[1]}. <br><br>Type "Y" to lock in ${combineP1} or "N" to lock in ${revCombineP1}.`;
    return myOutputValue;
  }
  //Player 1 choose dice order. Continuue to Player 2 after.
  if (gameMode == `chooseDiceOrder` && currentPlayer == 1) {
    if (input.toLowerCase() == "y") {
      p1Number = combineP1;
      console.log(`Locked in Norm ${combineP1}`);
      console.log(
        `Current mode: ${gameMode}. Current player: ${currentPlayer}`
      );
      currentPlayer += 1;
      gameMode = `rollingDice`;
      return `Locked in ${combineP1}. Next is Player 2 to play. <br><br>Press Submit to continue`;
    }
    if (input.toLowerCase() == "n") {
      p1Number = revCombineP1;
      currentPlayer += 1;
      gameMode = `rollingDice`;
      console.log(`Locked in Reverse ${revCombineP1}`);
      console.log(
        `Current mode: ${gameMode}. Current player: ${currentPlayer}`
      );
      return `Locked in ${revCombineP1}. Next is Player 2 to play. <br><br>Press Submit to continue`;
    }
    if (input.toLowerCase() != "n" || input.toLowerCase() != "y") {
      return `Invalid Input. <br><br>Type "Y" to lock in ${combineP1} or "N" to lock in ${revCombineP1}.`;
    }
  }
  console.log(`Current Player: ${currentPlayer}`);
  // Player 2 start rolling
  if (gameMode == `rollingDice` && currentPlayer == 2) {
    gameMode = `chooseDiceOrder`;
    var myOutputValue = `Welcome Player 2. <br><br>You rolled ${p2Roll[0]} and ${p2Roll[1]}. <br><br>Type "Y" to lock in ${combineP2} or "N" to lock in ${revCombineP2}.`;
    return myOutputValue;
  }
  // Player 2 choose dice order. Continue to check winner after.
  if (gameMode == `chooseDiceOrder` && currentPlayer == 2) {
    if (input.toLowerCase() == "y") {
      p2Number = combineP2;
      console.log(`Locked in Norm ${combineP2}`);
      console.log(
        `Current mode: ${gameMode}. Current player: ${currentPlayer}`
      );
      currentPlayer -= 1;
      gameMode = `checkWinner`;
      return `Locked in ${combineP2}. Press submit to continue`;
    }
    if (input.toLowerCase() == "n") {
      p2Number = revCombineP2;
      currentPlayer -= 1;
      gameMode = `checkWinner`;
      console.log(`Locked in Reverse ${revCombineP2}`);
      console.log(
        `Current mode: ${gameMode}. Current player: ${currentPlayer}`
      );
      return `Locked in ${revCombineP2}. Press submit to continue.`;
    }
    if (input.toLowerCase() != "n" || input.toLowerCase() != "y") {
      return `Invalid Input. <br><br>Type "Y" to lock in ${combineP2} or "N" to lock in ${revCombineP2}.`;
    }
  }
  //Check Winners and loop game
  if (gameMode == `checkWinner`) {
    if (p1Number > p2Number) {
      console.log(`P1: ${p1Number}. P2: ${p2Number}.`);
      gameMode = `rollingDice`;
      return `Player 1 Wins. Press submit to restart new game.`;
    } else {
      console.log(`P1: ${p1Number}. P2: ${p2Number}.`);
      gameMode = `rollingDice`;
      return `Player 2 Wins. Press submit to restart new game.`;
    }
  }

  return `Invalid Input. Refresh to restart.`;
};
