var diceObject = []; // This stores the list of dice values of all players
var orderedDiceValue = []; // This stores the combined value of the dices after an order has been selected
var numberOfPlayers = 2; // Work in progress. User cannot change number of players yet
var numberOfDice = 2; // Work in progress. User cannot change number of players yet
var playerCounter = 1;
var roundCounter = 1; // Work in progress
var winnerIndex = 0;
// var runningScore = [];

var main = function (input) {
  if (input == '') {
    populateRandomDice(playerCounter);
  }
  console.log(diceObject);
  if (Number(input) == 1) {
    orderedDiceValue.push(
      diceObject[numberOfPlayers * (playerCounter - 1)].value * 10 +
        diceObject[numberOfPlayers * (playerCounter - 1) + 1].value
    );
  } else if (Number(input) == 2) {
    orderedDiceValue.push(
      diceObject[numberOfPlayers * (playerCounter - 1)].value +
        diceObject[numberOfPlayers * (playerCounter - 1) + 1].value * 10
    );
  }

  // Determine the winner when a round is complete
  if (orderedDiceValue.length == numberOfPlayers) {
    winnerIndex = getWinner(orderedDiceValue) + 1;
  }

  // Display message
  var message = displayMessage(input, playerCounter, winnerIndex);

  // Determine the next player
  if (input != '') {
    if (playerCounter == numberOfPlayers) {
      playerCounter = 1;
      roundCounter++;
    } else {
      playerCounter++;
    }
  }
  return message;
};

var displayMessage = function (userInput, playerIndex, winnerIndex) {
  var message;
  // var diceRollMessage = generateDiceRollMessage();
  if (userInput == '') {
    message = `Welcome Player ${playerIndex}. <br> You rolled ${generateDiceRollMessage()}. <br> Choose the order of the Dice by entering integers (e.g. 1, 2, 3 etc.)`;
  }
  if (userInput == 1 || userInput == 2) {
    message = `Player ${playerIndex}, you chose Dice ${userInput} first. <br> Your number is ${
      orderedDiceValue[playerIndex - 1]
    }.`;
  }
  if (userInput != '') {
    if (playerIndex == numberOfPlayers) {
      message =
        message +
        `<br> <br> ${displayLeaderboard()} <br> Player ${winnerIndex} wins. Please refresh the page to restart`;
    } else {
      message =
        message +
        `<br> It is now Player ${
          playerIndex + 1
        }'s turn. Please click Submit to play`;
    }
  }
  return message;
};

var getWinner = function () {
  var counter = 0;
  var max = 0;
  var maxIndex;
  while (counter < orderedDiceValue.length) {
    if (orderedDiceValue[counter] > max) {
      max = orderedDiceValue[counter];
      maxIndex = counter;
    }
    counter++;
  }
  return maxIndex;
};

var displayLeaderboard = function () {
  var leaderboard = '';
  var counter = 1;
  while (counter <= numberOfPlayers) {
    leaderboard =
      leaderboard + `Player ${counter}: ${orderedDiceValue[counter - 1]} <br>`;
    counter++;
  }
  return leaderboard;
};

var generateDiceRollMessage = function () {
  var counter = 1;
  var diceMessage = '';
  while (counter <= numberOfDice) {
    diceMessage =
      diceMessage +
      `${
        diceObject[counter - 1 + (playerCounter - 1) * numberOfDice].value
      } for Dice ${counter}`;
    if (counter != numberOfDice) {
      diceMessage = diceMessage + ' and ';
    }
    counter++;
  }
  return diceMessage;
};

var populateRandomDice = function (currentPlayer) {
  var diceCounter = 1;
  while (diceCounter <= numberOfDice) {
    diceObject.push({
      player: currentPlayer,
      dice: diceCounter,
      value: Math.ceil(Math.random() * 6),
    });
    diceCounter++;
  }
};
