var MODE_NUM_PLAYERS = "numberOfPlayersMode";
var MODE_NUM_DICE = "numberOfDiceMode";
var MODE_ROLL_ALL_DICE = "rollAllDiceMode";
var MODE_REORDER_DICE = "reorderDiceMode";

//initializes game mode to check input for number of players
var currentGameMode = MODE_NUM_PLAYERS;
var numberOfPlayers = 2;
var numberOfDice = 2;

//Initialize array of player dice arrays, as well as the rearranged version
var playerDice = [];
var rearrangedDice = [];

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

//Initialize global variable for tracking which player is currently rearranging their dice
var reorderDicePlayerCounter = 0;
var reorderDice = function (input) {
  //reads the desired player order
  var playerOrdering = input;

  for (var diceCounter = 0; diceCounter < numberOfDice; diceCounter++) {
    //sees the index position of the first die in the rearranged order, and so on
    var diceIndex = parseInt(playerOrdering[diceCounter]) - 1;

    //fills in the rearranged dice array according to the player's desired order
    rearrangedDice[reorderDicePlayerCounter][diceCounter] =
      playerDice[reorderDicePlayerCounter][diceIndex];
  }
  myOutputValue =
    `Player ${reorderDicePlayerCounter + 1} has rearranged their dice to ` +
    `${rearrangedDice[reorderDicePlayerCounter]} according to ${playerOrdering}. `;

  //conditional to add line of text showing next player's dice and requesting their input for dice order
  if (reorderDicePlayerCounter < numberOfPlayers - 1) {
    myOutputValue =
      myOutputValue +
      `Player ${
        reorderDicePlayerCounter + 2
      } please select your desired order. Your dice are ${
        playerDice[reorderDicePlayerCounter + 1]
      }`;
  }

  //else, all players are done rearranging, and we request Submit to proceed to the next mode
  else {
    myOutputValue =
      myOutputValue +
      "All players have finished rearranging their dice, click Submit to see who wins!";
  }
  reorderDicePlayerCounter += 1;
  return myOutputValue;
};

//function to set the number of players, called in MODE_NUM_PLAYERS. player and rearranged dice arrays are populated here using the input number of players
var setNumPlayers = function (inputNumPlayers) {
  numberOfPlayers = inputNumPlayers;

  for (
    var playerCounter = 0;
    playerCounter < numberOfPlayers;
    playerCounter++
  ) {
    rearrangedDice.push([]);
  }
  for (
    var playerCounter = 0;
    playerCounter < numberOfPlayers;
    playerCounter++
  ) {
    playerDice.push([]);
  }
  for (
    var playerCounter = 0;
    playerCounter < numberOfPlayers;
    playerCounter++
  ) {
    gameModeFunctions.push(reorderDice);
  }
  return `You have selected to play with ${numberOfPlayers} players. Please select how many dice to roll per player.`;
};

var setNumDice = function (inputNumDice) {
  numberOfDice = inputNumDice;
  return `You have selected to play with ${inputNumDice} dice per player. Please hit Submit to roll the dice and begin the game. Good luck!`;
};

//array containing the different game modes
var gameModeFunctions = [setNumPlayers, setNumDice, rollAllDice];

//main function that runs through the game modes 1 by 1, starting from 0 index. input to the main function is passed to the appropriate function called based on the gameModeIndex
var main = function (input) {
  if (gameModeIndex < gameModeFunctions.length) {
    var gameModeFunction = gameModeFunctions[gameModeIndex];
    gameModeIndex += 1;
    return gameModeFunction(input);
  }
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
