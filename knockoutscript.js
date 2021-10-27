var noOfKnockoutRounds = 0;
var playerIndexPairings = [];
var playerIndexPairingsHistory = [];
var numberOfPlayersLeft = [];
var numberOfPlayersLeftHistory = [];
var knockoutPlayerValues = [];
var knockoutPlayerValuesHistory = [];

var generateNumberOfKnockoutRoundsAndIndexes = function () {
  noOfKnockoutRounds = Math.round(playerNames / 2);

  // generate numbers [0, 1, 2, 3] if there are 4 players
  // as we generate pairings, we remove the numbers from the array
  for (var i = 0; i < playerNames.length; i++) {
    numberOfPlayersLeft.push(i);
  }
};

var generateRandomPairings = function () {
  var tempArray = [];

  // add nested arrays in playerIndexPairings to pair players together
  while (numberOfPlayersLeft.length !== 0) {
    var randomPersonIndex = pickARandomPerson();
    if (tempArray.length == 0 || tempArray.length == 1) {
      tempArray.push(numberOfPlayersLeft.splice(randomPersonIndex, 1)[0]);
    } else {
      playerIndexPairings.push(tempArray);
      tempArray = [];
      tempArray.push(numberOfPlayersLeft.splice(randomPersonIndex, 1)[0]);
    }
  }

  if (tempArray.length !== 0) {
    playerIndexPairings.push(tempArray);
  }
};

var pickARandomPerson = function () {
  var randomDecimal = Math.random() * numberOfPlayersLeft.length;
  var randomPersonIndex = Math.floor(randomDecimal);
  return randomPersonIndex;
};

var startKnockoutRound = function (noOfDices) {
  // reinitiatlise numberOfPlayersLeft to []
  // add winners to numberOfPlayersLeft

  for (var i = 0; i < playerIndexPairings.length; i++) {
    // check whether pairing has 1 or 2 people
    if (playerIndexPairings[i].length == 2) {
      var tempArray = [];
      for (var j = 0; j < 2; j++) {
        tempArray.push(rollTheDice(noOfDices));
      }
      knockoutPlayerValues.push(tempArray);
      var knockoutWinnerIndex = findKnockoutWinner(tempArray);

      for (var k = 0; k < knockoutWinnerIndex.length; k++) {
        numberOfPlayersLeft.push(playerIndexPairings[k]);
      }
    } else {
      // dont need to roll dice
      // auto win baby!
      numberOfPlayersLeft.push(playerIndexPairings[i]);
    }
  }

  // resetKnockoutRound();
};

var findKnockoutWinner = function (valuesToCompare) {
  var winners = [];

  if (valuesToCompare[0] == valuesToCompare[1]) {
    return [0, 1];
  }

  if (gameMode == "Highest") {
    if (valuesToCompare[0] > valuesToCompare[1]) {
      return [0];
    } else {
      return [1];
    }
  } else {
    if (valuesToCompare[0] > valuesToCompare[1]) {
      return [1];
    } else {
      return [0];
    }
  }
};
