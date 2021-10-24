var diceRolls = [];
var playerValues = [];
var currentPlayer = 0;
var totalPlayers = 2;

var main = function (input) {
  var output = "";

  // user's first action must be submit without any input
  // as user is throwing a random roll
  if (input.length == 0 && diceRolls.length == 0) {
    currentPlayer = currentPlayer + 1;
    diceRolls = rollTheDice(2);
    output += `Welcome Player ${currentPlayer}.<br />`;
    output += `You rolled `;

    for (var counter = 0; counter < 2; counter++) {
      output += `${diceRolls[counter]} for Dice ${counter + 1}`;

      if (counter != 1) {
        output += ` and `;
      } else {
        output += `.<br />`;
      }
    }

    output += `Choose the order of the dice. <br />`;
    output += `e.g. Type 1 if you want the value of Dice 1 to be first. <br />`;

    return output;
  } else if (diceRolls.length != 0 && (input == 1 || input == 2)) {
    // for either Player 1 or Player 2 to decide the order of their dices
    if (input == 1) {
      playerValues[currentPlayer - 1] = diceRolls[0] + "" + diceRolls[1];
    } else {
      playerValues[currentPlayer - 1] = diceRolls[1] + "" + diceRolls[0];
    }

    output += `Player ${currentPlayer}, you chose Dice ${input} first. <br />`;
    output += `Your number is ${playerValues[currentPlayer - 1]}. <br />`;

    if (playerValues.length != totalPlayers) {
      output += `It is now Player ${currentPlayer + 1}'s turn.`;
      diceRolls = [];
    } else {
      var winnerIndex = findWinner(playerValues);
      output += `Player ${winnerIndex + 1} wins with dice values ${
        playerValues[winnerIndex]
      }! Round has ended.`;

      resetRound();
    }

    return output;
  } else if (diceRolls.length != 0 && (input != 1 || input != 2)) {
    output +=
      "Your input is invalid. You can only select a number less than or equal to the number of dices.";

    return output;
  } else {
    output += "You need to roll your dices first. Don't provide any input.";

    return output;
  }
};

// returns an array of random dice values
var rollTheDice = function (noOfTimes) {
  var diceValues = [];

  for (var counter = 0; counter < noOfTimes; counter++) {
    var randomDecimal = Math.random() * 6;
    var randomWholeNumber = Math.floor(randomDecimal);
    var finalDiceValue = randomWholeNumber + 1;
    diceValues.push(finalDiceValue);
  }

  return diceValues;
};

// after all users have selected their dice values
// find a winner. returns index of playerValues
var findWinner = function (playerValues) {
  if (playerValues[0] > playerValues[1]) {
    return 0;
  } else {
    return 1;
  }
};

var resetRound = function () {
  diceRolls = [];
  playerValues = [];
  currentPlayer = 0;
};
