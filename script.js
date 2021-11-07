var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

// initialise game mode
var currentGameMode = "choose order of dice";
var user = "Player 1";
var diceNumberPlayer1 = 0;
var diceNumberPlayer2 = 0;
var diceRoll1 = 0;
var diceRoll2 = 0;

var whoWins = function (diceNumberPlayer1, diceNumberPlayer2) {
  if (diceNumberPlayer1 > diceNumberPlayer2) {
    return "Player 1 wins. Click submit to play again";
  } else if (diceNumberPlayer2 > diceNumberPlayer1) {
    return "Player 2 wins. Click submit to play again";
  } else if (diceNumberPlayer1 == diceNumberPlayer2) {
    return "It is a draw. Click submit to play again";
  }
};

var diceRollSame = function (user, diceRoll1, diceRoll2) {
  return `Welcome ${user}. <br> You rolled ${diceRoll1} for Dice 1 and ${diceRoll2} for Dice 2. <br> Your number is ${diceRoll1}${diceRoll2}.`;
};

var diceRollDiff = function (user, diceRoll1, diceRoll2) {
  return `Welcome ${user}. <br> You rolled ${diceRoll1} for Dice 1 and ${diceRoll2} for Dice 2. Choose the order of the dice.`;
};

var dice1First = function (user, diceRoll1, diceRoll2) {
  output = `You chose Dice 1 first. Your number is ${diceRoll1}${diceRoll2}.`;
  if (user == "Player 1") {
    output = output + "<br> It is now Player 2's turn.";
    return output;
  }
};

var dice2First = function (user, diceRoll1, diceRoll2) {
  output = `You chose Dice 2 first. Your number is ${diceRoll2}${diceRoll1}.`;
  if (user == "Player 1") {
    output = output + "<br> It is now Player 2's turn.";
    return output;
  }
};
// Step 1: Player 1 (default) - Choose order of dice
// Step 2: Player 1 - dice order chosen. dice number shown. Player 2's turn
// Step 3: Player 2 - choose order of dice
// Step 4: Player 2 - dice order chosen. dice number shown.
// Step 5: Shows Winner.

var main = function (input) {
  var myOutputValue = "";
  if (user == "Player 1") {
    // Step 1: Player 1 (default) - Choose order of dice
    if (currentGameMode == "choose order of dice") {
      diceRoll1 = rollDice();
      diceRoll2 = rollDice();
      if (diceRoll1 == diceRoll2) {
        myOutputValue = diceRollSame(user, diceRoll1, diceRoll2);
        diceNumberPlayer1 = diceRoll1 * 10 + diceRoll2;
        user = "Player 2";
      } else {
        myOutputValue = diceRollDiff(user, diceRoll1, diceRoll2);
        currentGameMode = "show dice number";
      }
    }
    // Step 2: Player 1 - dice order chosen. dice number shown. Player 2's turn
    else if (currentGameMode == "show dice number") {
      if (input == 1) {
        diceNumberPlayer1 = diceRoll1 * 10 + diceRoll2;
        myOutputValue = dice1First(user, diceRoll1, diceRoll2);
      } else if (input == 2) {
        diceNumberPlayer1 = diceRoll1 * 10 + diceRoll2;
        myOutputValue = dice2First(user, diceRoll1, diceRoll2);
      }
      currentGameMode = "choose order of dice";
      user = "Player 2";
    }
  }
  // Step 3: Player 2 - choose order of dice
  else if (user == "Player 2") {
    console.log("in player 2");
    if (currentGameMode == "choose order of dice") {
      diceRoll1 = rollDice();
      diceRoll2 = rollDice();
      if (diceRoll1 == diceRoll2) {
        myOutputValue = diceRollSame(user, diceRoll1, diceRoll2);
        diceNumberPlayer1 = diceRoll1 * 10 + diceRoll2;
        currentGameMode = "who wins";
      } else {
        myOutputValue = diceRollDiff(user, diceRoll1, diceRoll2);
        currentGameMode = "show dice number";
      }
    } else if (currentGameMode == "show dice number") {
      if (input == 1) {
        diceNumberPlayer2 = diceRoll1 * 10 + diceRoll2;
        myOutputValue = `You chose Dice 1 first. Your number is ${diceRoll1}${diceRoll2}.`;
      } else if (input == 2) {
        diceNumberPlayer2 = diceRoll1 * 10 + diceRoll2;
        myOutputValue = `You chose Dice 2 first. Your number is ${diceRoll2}${diceRoll1}.`;
      }
      currentGameMode = "who wins";
      // Step 5: Shows Winner.
    } else if (currentGameMode == "who wins") {
      myOutputValue = whoWins(diceNumberPlayer1, diceNumberPlayer2);
      currentGameMode = "choose order of dice";
      user = "Player 1";
    }
  }

  return myOutputValue;
};
