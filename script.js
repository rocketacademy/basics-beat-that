//GLOBAL VAR//
var gameState = "dice number";
var CHOOSE_DICE_NUMBER = "dice number";
var ROLL_DICE = "roll dice";
var CHOOSE_ORDER = "choose order";
var SORT = "sort";
var COMPARE_WINNER = "compare winner";

var scoreBoard = [0, 0];
var playerRolls = [];
var numOfDices = 0;
var currentPlayer = 1;
var playersScore = [];
var orderSelection = 0;
var player1Numbers = 0; // list of numbers
var player2Numbers = 0; // list of numbers
var player1SortedList = 0; // bubble/random sorted list of numbers
var player2SortedList = 0; // bubble/random sorted list of numbers
var player1combinednumber = 0; // only 1 number
var player2combinednumber = 0; // only 1 number

// STEPS //
// 1. Choose no. of players and no. of dices to be rolled
// 2. Player 1 chooses order of numbers
// 3. Returns the combined number

// Roll dice function //
var rollDice = function () {
  return Math.floor(Math.random() * 6);
};

// Roll all dices //
var rollForPlayer = function (numOfDices) {
  var counter = 0;
  var playerRolls = [];
  while (counter < numOfDices) {
    playerRolls.push(rollDice());
    counter = counter + 1;
  }
  return playerRolls;
};

// auto sort using bubble sort code
var bubbleSort = function (list) {
  for (var i = 0; i < list.length; i++) {
    // Last i elements are already in place
    for (var j = 0; j < list.length - i - 1; j++) {
      // Checking if the item at present iteration
      // is greater than the next iteration
      if (list[j] < list[j + 1]) {
        // If the condition is true then swap them
        var temp = list[j];
        list[j] = list[j + 1];
        list[j + 1] = temp;
      }
    }
  }
  return list;
};

// random shuffle sort
var randomSort = function (list) {
  var newList = [];
  newList = shuffle(list);
  return newList;
};

// concatenate elements in list
var concatIntoNumber = function (list) {
  return Number(list.join(""));
};

// shuffles
function shuffle(array) {
  console.log(array);
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// compare winners
var compareWinner = function (player1combinednumber, player2combinednumber) {
  if (player1combinednumber > player2combinednumber) {
    return true;
  }
  return false;
};

// main function //
var main = function (input) {
  var myOutputValue = "";

  // allows player to choose number of dices
  if (gameState == CHOOSE_DICE_NUMBER) {
    if (isNaN(input) == true || Number(input) <= 0) {
      return "Please enter a number more than 0.";
    }

    numOfDices = Number(input);
    gameState = ROLL_DICE;
    return (
      "You have chosen " +
      numOfDices +
      " dices for the game." +
      "<br><br> Please Submit again to start the rolling of dices."
    );
  }

  // Roll dice //
  if (gameState == ROLL_DICE) {
    player1Numbers = rollForPlayer(numOfDices);
    player2Numbers = rollForPlayer(numOfDices);
    gameState = CHOOSE_ORDER;
    return `The list of numbers are <br>${player1Numbers}<br>${player2Numbers}`;
  }

  if (gameState == CHOOSE_ORDER) {
    if (isNaN(input) == true || Number(input) > 2 || Number(input) < 1) {
      return "Please enter 1 for random number, 2 for highest number.";
    }
    orderSelection = Number(input);
    gameState = SORT;
    return "You have chosen " + input;
  }

  // random sort
  if ((gameState == SORT) & (orderSelection == 1)) {
    // player 1's number
    player1SortedList = randomSort(player1Numbers);
    player1combinednumber = concatIntoNumber(player1SortedList);

    // player 2's number
    player2SortedList = randomSort(player2Numbers);
    player2combinednumber = concatIntoNumber(player2SortedList);

    gameState = COMPARE_WINNER;
    return (
      "Player 1's initial list is: " +
      player1Numbers +
      "<br> Player 2's initial list is: " +
      player2Numbers +
      "<br><br>" +
      "Player 1's random sorted list is: " +
      player1SortedList +
      "<br> Player 2's random sorted list is: " +
      player2SortedList +
      "<br><br>" +
      "Player 1's number is: " +
      player1combinednumber +
      "<br> Player 2's number is: " +
      player2combinednumber
    );
  }

  // highest number sort
  if ((gameState == SORT) & (orderSelection == 2)) {
    // player 1's number
    player1SortedList = bubbleSort(player1Numbers);
    player1combinednumber = concatIntoNumber(player1SortedList);
    //player 2's number
    player2SortedList = bubbleSort(player2Numbers);
    player2combinednumber = concatIntoNumber(player2SortedList);

    gameState = COMPARE_WINNER;
    return (
      "Player 1's initial list is: " +
      player1Numbers +
      "<br> Player 2's initial list is: " +
      player2Numbers +
      "<br><br>" +
      "Player 1's descending list is: " +
      player1SortedList +
      "<br> Player 2's descending list is: " +
      player2SortedList +
      "<br><br>" +
      "Player 1's highest number is: " +
      player1combinednumber +
      "<br> Player 2's highest number is: " +
      player2combinednumber
    );
  }

  // compare numbers + announce winner
  if (gameState == COMPARE_WINNER) {
    if (compareWinner(player1combinednumber, player2combinednumber)) {
      scoreBoard[0] += 1;
      myOutputValue = "Congratulations! You as player 1 have won!";
    }
    scoreBoard[1] += 1;
    myOutputValue = "Congratulations! You as player 2 have won!";
  }

  return myOutputValue;
};
