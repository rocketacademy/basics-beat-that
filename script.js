// /*
// Included features:
// - Last roll
// - Winning %
// - Most rolled
// - Guessing +- 1
// */

/* 
Fn:
input: 
- Number of users

Each submit roll 2 dices
track score
*/
var totalGames = 0;

class player {
  constructor(playername, dicenumber, score) {
    this.playername = playername;
    this.dicenumber = dicenumber;
    this.combinedDiceNumber = this.combinedDiceNumber;
    this.score = score;
  }
}

function checkDiceForWinner() {
  bblSortDice(plist);
  plist[0].score += 1;
}

// BubbleSort directly to object.score highest to lowest (tbd)
function bblSort(arr) {
  for (var i = 0; i < arr.length; i++) {
    // Last i elements are already in place
    for (var j = 0; j < arr.length - i - 1; j++) {
      // Checking if the item at present iteration
      // is greater than the next iteration
      if (arr[j].score > arr[j + 1].score) {
        // If the condition is true then swap them
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}

// BubbleSort directly to object.score highest to lowest (tbd)
function bblSortDice(arr) {
  for (var i = 0; i < arr.length; i++) {
    // Last i elements are already in place
    for (var j = 0; j < arr.length - i - 1; j++) {
      // Checking if the item at present iteration
      // is greater than the next iteration
      if (arr[j].combinedDiceNumber > arr[j + 1].combinedDiceNumber) {
        // If the condition is true then swap them
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}

// Sort lowest to highest
function bblSortNumberLow(arr) {
  for (var i = 0; i < arr.length; i++) {
    // Last i elements are already in place
    for (var j = 0; j < arr.length - i - 1; j++) {
      // Checking if the item at present iteration
      // is greater than the next iteration
      if (arr[j] > arr[j + 1]) {
        // If the condition is true then swap them
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  // Print the sorted array
  return arr;
}

// Sort array highest to lowest
function bblSortNumberHigh(array) {
  for (i = 0; i < array.length - 1; i++) {
    for (j = 0; j < array.length - i - 1; j++) {
      if (array[j] < array[j + 1]) {
        var temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
  return array;
}

function getCombinedDiceNumber(dice_arr, getHighLowOption) {
  var combinedDiceNumber = "";
  if (getHighLowOption == "low") {
    dice_arr = bblSortNumberLow(dice_arr);
  } else {
    dice_arr = bblSortNumberHigh(dice_arr);
  }
  for (let i = 0; i < dice_arr.length; i++) {
    combinedDiceNumber = combinedDiceNumber + dice_arr[i];
  }
  return combinedDiceNumber;
}

function rollDice() {
  // produces a decimal between 0 and 6
  var randomDecimal = Math.random() * 6;

  // take off the decimal
  var randomInteger = Math.floor(randomDecimal);

  // it's anumber from 0 - 5 ... add 1
  var diceNumber = randomInteger + 1;

  return diceNumber.toString();
}

function roll_n_Dices(numRolls) {
  let diceArray = [];
  for (var i = 0; i < numRolls; i++) {
    diceArray.push(rollDice());
  }
  return diceArray;
}

function playersCreation(numOfPlayers) {
  for (let i = 0; i < numOfPlayers; i++) {
    //    plist.push(new player("p" + i, bblSortNumber(roll_n_Dices(5)), rollDice()));   // For testing purpose, roll random 5 dices
    plist.push(new player("p" + i, [], 0, 0));
  }
}

function printScoreBoard(playerlists, mode) {
  var output = "The score board now!<br>";
  bblSort(plist); //sort the player list according to score lowest first
  console.log(playerlists);
  checkDiceForWinner();
  if (mode == "reverse") {
    // Game mode require us to print the lowest score first
    for (let i = 0; i < playerlists.length; i++) {
      output =
        output +
        "Playername: " +
        playerlists[i].playername +
        " " +
        "Score is: " +
        playerlists[i].score +
        "<br>";
    }
  } else {
    // Print highest score first
    for (let i = playerlists.length - 1; i > -1; i--) {
      console.log(i);
      output =
        output +
        "Playername: " +
        playerlists[i].playername +
        " " +
        "Score is: " +
        playerlists[i].score +
        "<br>";
    }
  }
  console.log(output);
  return output;
}

// function printScoreBoard(playerlists, mode) {
//   var output = "The score board now!<br>";
//   bblSort(plist); //sort the player list according to score lowest first
//   console.log(playerlists);
//   // Print lowest score first
//   // if (mode == "reverse") {
//   //   bblSortNumberLow(playerlists);
//   // }
//   checkDiceForWinner();
//   bblSort(plist); //Sort player score highest to lowest
//   for (let i = 0; i < playerlists.lenght; i++) {
//     console.log(i);
//     output =
//       output +
//       "Playername: " +
//       playerlists[i].playername +
//       " " +
//       "Score is: " +
//       playerlists[i].score +
//       "<br>";
//   }
//   console.log(output);
//   return output;
// }

const plist = []; // Array to keep all players data
var inputPlayersAndDiceNumber = (inputGameMode = true);
var startOfGame = true;
var myOutputValue = "";

var main = function (input) {
  totalGames++;
  // Player2_rolls.push(rollDice());
  // console.log(Player2_rolls[0]);
  //`Please enter the number of players and dices in the following format: Example 2 players and 2 dices, you will enter '2 2' in the input box`;

  if (startOfGame) {
    if (inputPlayersAndDiceNumber) {
      numOfPlayers = input.split(" ")[0];
      numOfDices = input.split(" ")[1];
      myOutputValue = `Please enter your game mode: Input 'normal' or 'reverse' `;
      console.log("numOfPlayers = " + numOfPlayers + " dice = " + numOfDices);
      inputPlayersAndDiceNumber = false;
    } else if (inputGameMode) {
      gameMode = input;
      inputGameMode = false;
      console.log("inputGameMode " + gameMode);
      myOutputValue = `Please enter your if you wish to autocombine dicenumber to the highest or lowest: Input 'high or 'low'`;
    } else {
      console.log("inputGameMode " + gameMode);
      autoCombineOption = input;
      startOfGame = false;
      myOutputValue = `Game start.<br> Number of players = ${numOfPlayers}. Number of dices = ${numOfDices}. <br> Game Mode is ${gameMode}Click submit to start!`;
      playersCreation(numOfPlayers); //All players data created will be sorted in plist array
    }
  } else {
    console.log("started");

    if (gameMode == "normal") {
      console.log("normal mode");

      // Each player roll a dice, den combine the dice number and update each player's details
      for (let i = 0; i < plist.length; i++) {
        plist[i].dicenumber.push(rollDice());
        plist[i].combinedDiceNumber = getCombinedDiceNumber(
          plist[i].dicenumber,
          autoCombineOption
        );
      }
      // roll dice, add dice to player profile, calculate score based on gameMode
    }
    if (gameMode == "reverse") {
      console.log("reverse mode");
    }

    if (input == "reset") {
      console.log("reset mode");
    }
    myOutputValue = printScoreBoard(plist, gameMode);
    console.log(myOutputValue);
  }

  return myOutputValue;
};
