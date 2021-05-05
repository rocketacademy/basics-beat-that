var MODE_NUM_PLAYERS = "numberOfPlayersMode";
var MODE_NUM_DICE = "numberOfDiceMode";
var MODE_ROLL_ALL_DICE = "rollAllDiceMode";
var MODE_REORDER_DICE = "reorderDiceMode";

//initializes game mode to check input for number of players
var currentGameMode = MODE_NUM_PLAYERS;
var numberOfPlayers = 2;
var numberOfDice = 2;

//an array of player dice arrays
var playerDice = [];
var rearrangedDice = [];

var playerRunningSums = [];
var winningOrder = [];

//initializes game mode index to 0, which is MODE_NUM_PLAYERS
var gameModeIndex = 0;
var gameModes = [
  MODE_NUM_PLAYERS,
  MODE_NUM_DICE,
  MODE_ROLL_ALL_DICE,
  MODE_REORDER_DICE,
];

var rollAllDice = function () {
  var myOutputValue = "";

  for (
    var playerCounter = 0;
    playerCounter < numberOfPlayers;
    playerCounter++
  ) {
    myOutputValue = myOutputValue + `Player ${playerCounter + 1} rolled `;
    for (var diceCounter = 0; diceCounter < numberOfDice; diceCounter++) {
      var dieRoll = rollDice();
      myOutputValue = myOutputValue + dieRoll + " ";
      playerDice[playerCounter].push(dieRoll);
    }
  }
  return (
    myOutputValue +
    ". Please hit Submit to proceed to the rearrange-dice stage. If your die result was 364 for example, you may type 231 to rearrange the 2nd die roll first, the 3rd die roll second, and the 1st die roll last. You may also type auto to automatically rearrange."
  );
};
var reorderDicePlayerCounter = 0;
var reorderDice = function (input) {
  // if(input == 'auto') {
  //   rearrangedDice = playerDice;
  //   for(var playerCounter = 0; playerCounter < numberOfPlayers; playerCounter++){

  //     for(var diceCounter = 0; diceCounter < numberOfDice; diceCounter++) {

  //         currentPlayer = rearrangedDice[playerCounter];
  //         currentDie = currentPlayer[diceCounter];

  //         if (currentDie < currentPlayer[diceCounter+1]) {
  //           currentPlayer[diceCounter] = currentPlayer[diceCounter+1];
  //           currentPl[diceCounter+1] = currentDie;
  //         }

  //     }

  //   }
  // }

  //reads the desired player order
  var playerOrdering = input;

  for (var diceCounter = 0; diceCounter < numberOfDice; diceCounter++) {
    //sees the index position of the first die in the rearranged order, and so on
    var diceIndex = parseInt(playerOrdering[diceCounter]) - 1;
    rearrangedDice[reorderDicePlayerCounter][diceCounter] =
      playerDice[reorderDicePlayerCounter][diceIndex];
  }
  myOutputValue =
    `Player ${reorderDicePlayerCounter + 1} has rearranged their dice to ` +
    `${rearrangedDice[reorderDicePlayerCounter]} according to ${playerOrdering}. `;

  if (reorderDicePlayerCounter < numberOfPlayers - 1) {
    myOutputValue =
      myOutputValue +
      `Player ${
        reorderDicePlayerCounter + 2
      } please select your desired order. Your dice are ${
        playerDice[reorderDicePlayerCounter + 1]
      }`;
  } else {
    myOutputValue =
      myOutputValue +
      "All players have finished rearranging their dice, click Submit to see who wins!";
    gameModeFunctions.push(determineGameResult);
  }
  reorderDicePlayerCounter += 1;
  return myOutputValue;
};
var setNumPlayers = function (inputNumPlayers) {
  numberOfPlayers = inputNumPlayers;

  for (
    var playerCounter = 0;
    playerCounter < numberOfPlayers;
    playerCounter++
  ) {
    rearrangedDice.push([]);
    playerDice.push([]);
    playerRunningSums.push(0);
    gameModeFunctions.push(reorderDice);
  }

  return `You have selected to play with ${numberOfPlayers} players. Please select how many dice to roll per player.`;
};
var setNumDice = function (inputNumDice) {
  numberOfDice = inputNumDice;
  return `You have selected to play with ${inputNumDice} dice per player. Please hit Submit to roll the dice and begin the game. Good luck!`;
};

var gameModeFunctions = [setNumPlayers, setNumDice, rollAllDice];

// var findLargestNumber = function(arrayOfNumbers) {
//   arrayOfNumbers.sort.sort(function(a, b){return b-a});

// }

var makeArrayIntoNumber = function (arrayOfNumbers) {
  var stringOfNumber = "";
  for (var digitsCounter = 0; digitsCounter < numberOfDice; digitsCounter++) {
    stringOfNumber = stringOfNumber + String(arrayOfNumbers[digitsCounter]);
  }
  return Number(stringOfNumber);
};

var determineGameResult = function () {
  var rearrangedDiceInNumbers = [];

  for (
    var playerCounter2 = 0;
    playerCounter2 < numberOfPlayers;
    playerCounter2++
  ) {
    var tempNumberToPush = makeArrayIntoNumber(rearrangedDice[playerCounter2]);

    rearrangedDiceInNumbers.push(tempNumberToPush);
    playerRunningSums[playerCounter2] =
      playerRunningSums[playerCounter2] + tempNumberToPush;
  }

  var currentBiggestNumber = 0;
  var currentBiggestIndex = 0;
  var playerRankedDice = [];
  var playerRanking = [];

  var outMessage = "";
  //outer loop to determine ranking for all players
  for (
    var playerCounter4 = 0;
    playerCounter4 < numberOfPlayers;
    playerCounter4++
  ) {
    //inner loop finds the player with the largest number (1st place) and saves his number and index position
    for (
      var playerCounter3 = 0;
      playerCounter3 < numberOfPlayers;
      playerCounter3++
    ) {
      if (rearrangedDiceInNumbers[playerCounter3] >= currentBiggestNumber) {
        currentBiggestNumber = rearrangedDiceInNumbers[playerCounter3];
        currentBiggestIndex = playerCounter3;
      }
    }

    //once out of inner loop, push the current winning number and position into player ranking arrays
    if (!playerRanking[0]) {
      outMessage += "Winner is ";
    }

    playerRankedDice.push(currentBiggestNumber);
    playerRanking.push(currentBiggestIndex);

    outMessage += `Player ${
      currentBiggestIndex + 1
    } with a dice sum of : ${currentBiggestNumber}<br/>`;

    rearrangedDiceInNumbers[currentBiggestIndex] = 0;
    currentBiggestNumber = 0;
  }
  return outMessage;
};
var rollDice = function () {
  // Generate a decimal from 0 through 6, inclusive of 0 and exclusive of 6.
  var randomDecimal = Math.random() * 6;

  // Remove the decimal with the floor operation.
  // This will be an integer from 0 to 5 inclusive.
  var randomInteger = Math.floor(randomDecimal);

  // Add 1 to get valid dice rolls of 1 through 6 inclusive.
  var diceNumber = randomInteger + 1;

  return diceNumber;
};

var main = function (input) {
  if (gameModeIndex < gameModeFunctions.length) {
    var gameModeFunction = gameModeFunctions[gameModeIndex];
    gameModeIndex += 1;
    return gameModeFunction(input);
  }
};
