// Create a helper function for dice roll
var diceRoll = function (input) {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var randomNum = randomInteger + 1;
  return randomNum;
};

// Global variables to store no. of players, array of all player scores, cumulative player scores
var playerNum = 1;
var currentRoundScore = [];
var maxPlayerNum = "";

//Create a helper function to initialise the initial score according to number of players selected by user
var createTotal = function (numPlayers) {
  // Input = user input of number of players
  var initial = [];
  var i = 0;
  while (i < numPlayers) {
    initial.push(Number(0));
    i += 1;
  }
  return initial;
};

// Creates an empty array "total" e.g. total = [0,0,0] for 3 players
var total = "";

// Create a helper function to accumulate all the scores for each player
var cumulativeScore = function () {
  var i = 0;
  while (i < currentRoundScore.length) {
    total[i] = total[i] + currentRoundScore[i];
    i += 1;
  }
  console.log("cumulative scores:", total);
  return total;
};

// Flow:
// Player 1 click submit button to roll dice
// Player 2 click submit button to roll dice
// Results are compared

// ================== Variable Number of Dice (2-player) =============================
// Create a new version of Beat That that rolls two or more dice per player.
// At the beginning of each round, ask the players how many dice they would like to play with. Both players will roll the same number of dice each round.
// Store each player's dice rolls in an array. When each player rolls dice, use a loop to place n dice roll values in that player's array, where n is the number of dice the players specified at the beginning of the round. Output each player's dice roll values.
// Auto-generate the optimal combined number based on each player's dice rolls to determine the winner of that round.

//Create global variable to store dice rolls of each player
var storeDiceRolls = [];

// Create global variable to store number of dice to be rolled as entered by user
var numDiceRolls = "";

// Create helper function to output the player's individuals dice rolls, according to how many dice is chosen i.e. input = 4 means roll 4 dice.
var rollNDice = function (input) {
  // Input = number of dice to be rolled
  // Create an empty array to store  player's dice rolls
  var myOutputValue = "";
  var counter = 0;
  // Input validation: Input must be >=2
  if (input >= 2) {
    while (counter < input) {
      var randomNum = diceRoll();
      storeDiceRolls.push(randomNum);
      console.log(storeDiceRolls);
      myOutputValue =
        myOutputValue + `You rolled ${randomNum} for Dice ${counter + 1}. <br>`;
      counter += 1;
    }
  } else {
    myOutputValue = "Key in a valid input (2 or more).";
  }
  return myOutputValue;
};

// For Highest Combined Mode, create a function that takes the array of random dice rolls as an input, sort them in descending order and return the highest number combi formed
var sortDescending = function (input) {
  // Pass the array of random dice rolls into the input

  var myOutputValue = "";

  // sort the array of dice rolls in descending order
  var diceNumSorted = input.sort(function (a, b) {
    return b - a;
  });
  var highestNum = "";
  // Run a loop to combine the digits to form the highest combine number possible based on dice rolls
  var i = 0;
  while (i < input.length) {
    highestNum = highestNum + "" + diceNumSorted[i];
    i += 1;
  }
  // Push the number into an array storing all players combined numbers
  currentRoundScore.push(Number(highestNum));
  myOutputValue = `Your number is <b>${highestNum}</b>.`;
  return myOutputValue;
};

// For Lowest Combined Mode, create a function that takes the array of random dice rolls as an input, sort them in ascending order and return the lowest number combi formed
var sortAscending = function (input) {
  // Pass the array of random dice rolls into the input

  var myOutputValue = "";

  // sort the array of dice rolls in descending order
  var diceNumSorted = input.sort(function (a, b) {
    return a - b;
  });
  var lowestNum = "";
  // Run a loop to combine the digits to form the lowest combine number possible based on dice rolls
  var i = 0;
  while (i < input.length) {
    lowestNum = lowestNum + "" + diceNumSorted[i];
    i += 1;
  }
  // Push the number into an array storing all players combined numbers
  currentRoundScore.push(Number(lowestNum));
  myOutputValue = `Your number is <b>${lowestNum}</b>.`;
  return myOutputValue;
};

// Create main game function
// User to input number of dice
// User to input which game mode - Highest or Lowest Combined mode

var currentGameMode = "choose how many players";

var main = function (input) {
  var myOutputValue = "";
  if (currentGameMode == "choose how many players") {
    if (!(input >= 2)) {
      myOutputValue = `<span style="color:blue">
          Please enter a valid number (2 or higher).
        </span>`;
    } else {
      maxPlayerNum = input;
      total = createTotal(maxPlayerNum);
      currentGameMode = "choose how many dice";
      myOutputValue = `You chose <b>${input}</b> number of players. <br><br> <span style="color:blue">Enter number of dice to roll.</span>`;
    }
  } else if (currentGameMode == "choose how many dice") {
    if (!(input >= 2)) {
      myOutputValue = `<span style="color:blue">
          Please enter a valid number (2 or higher).
        </span>`;
    } else {
      numDiceRolls = input;
      currentGameMode = "select game mode";
      myOutputValue = `You chose to roll <b>${input}</b> dice per player. <br><br> <span style="color:blue">Select your game mode.</span> <br><br> Enter <b>"1"</b> for Highest Combined Mode <br> Enter <b>"2"</b> for Lowest Combined Mode. `;
    }
  } else if (currentGameMode == "select game mode") {
    if (!(input == 1 || input == 2)) {
      myOutputValue = `<span style="color:blue">Please enter a valid number (1 or 2).</span><br><br> Enter <b>"1"</b> for Highest Combined Mode <br> Enter <b>"2"</b> for Lowest Combined Mode.`;
    } else if (input == 1) {
      currentGameMode = "highest combined";
      myOutputValue = `You have selected <b> Highest Combined Number Mode </b>. <br><br> <span style="color:blue">Player 1, hit <i>Submit</i> to roll dice.</span>`;
    } else if (input == 2) {
      currentGameMode = "lowest combined";
      myOutputValue = `You have selected <b> Lowest Combined Number Mode </b>. <br><br> <span style="color:blue">Player 1, hit <i>Submit</i> to roll dice.</span>`;
    }
  } else if (currentGameMode == "highest combined") {
    if (playerNum != maxPlayerNum) {
      myOutputValue = `${genHighestNum()} <br><br> <span style="color:blue">It's Player ${
        playerNum + 1
      }'s turn.</span>`;
      console.log("current round player score: ", currentRoundScore);
      storeDiceRolls = [];
      playerNum += 1;
    } else if (playerNum == maxPlayerNum) {
      var outputHigh = genHighestNum();
      total = cumulativeScore();
      myOutputValue = `${outputHigh} <br><br><hr /> <span style="color:purple;font-family:Georgia">${ldbHigh(
        total
      )}</span>  <br><br>  <span style="color:blue">Player 1, hit <i>Submit</i> to roll again.</span>`;
      console.log("current round player score: ", currentRoundScore);

      storeDiceRolls = [];
      currentRoundScore = [];
      playerNum = 1;
    }
  } else if (currentGameMode == "lowest combined") {
    if (playerNum != maxPlayerNum) {
      myOutputValue = `${genLowestNum()} <br><br> <span style="color:blue">It's Player ${
        playerNum + 1
      }'s turn.</span>`;
      console.log("current round player score: ", currentRoundScore);
      storeDiceRolls = [];
      playerNum += 1;
    } else if (playerNum == maxPlayerNum) {
      var outputLow = genLowestNum();
      total = cumulativeScore();
      myOutputValue = `${outputLow} <br><br><hr /> <span style="color:purple;font-family:Georgia">${ldbLow(
        total
      )}</span>  <br><br>  <span style="color:blue">Player 1, hit <i>Submit</i> to roll again.</span>`;
      console.log("current round player score: ", currentRoundScore);
      storeDiceRolls = [];
      currentRoundScore = [];
      playerNum = 1;
    }
  }
  return myOutputValue;
};

// Refactor the results description for highest combined mode
var genHighestNum = function () {
  var myOutputValue = `🎲<b>Player ${playerNum} rolls the dice...</b>🎲 <br><br>
      ${rollNDice(numDiceRolls)}  <br>  ${sortDescending(storeDiceRolls)}  `;
  return myOutputValue;
};
// Refactor the results description for lowest combined mode
var genLowestNum = function () {
  var myOutputValue = `🎲<b>Player ${playerNum} rolls the dice...</b>🎲 <br><br>
      ${rollNDice(numDiceRolls)}  <br>  ${sortAscending(storeDiceRolls)}`;
  return myOutputValue;
};

// create function for the leaderboard for highest combined mode
var leaderboard = function () {
  var outcome = "";
  var i = 0;
  for (var i = 0; i < total.length; i += 1) {
    outcome = outcome + `Player ${i + 1}: ${total[i]} <br>`;
  }
  return "🏆<b>Leaderboard</b>🏆<br>" + outcome;
};

// Attempting to rearrange leaderboard in order. But does not work well as indexOf returns the first position so does not take into account duplicates i.e. 2 players have same score but leaderboard will show pLayer 1 twice
var ldbHigh = function (input) {
  // input is the array of cumulative scores "total"
  var myOutputValue = "";

  // sort the array of cumulative scores in descending order
  var totalSorted = [...total].sort(function (a, b) {
    return b - a;
  });

  var i = 0;
  while (i < total.length) {
    var position = input.indexOf(totalSorted[i]) + 1;
    myOutputValue =
      myOutputValue + `Player ${position}: ${totalSorted[i]} <br>`;
    i += 1;
  }
  return "🏆<b>Leaderboard</b>🏆<br>" + myOutputValue;
};

var ldbLow = function (input) {
  // input is the array of cumulative scores "total"
  var myOutputValue = "";

  // sort the array of cumulative scores in descending order
  var totalSorted = [...total].sort(function (a, b) {
    return a - b;
  });

  var i = 0;
  while (i < total.length) {
    var position = input.indexOf(totalSorted[i]) + 1;
    myOutputValue =
      myOutputValue + `Player ${position}: ${totalSorted[i]} <br>`;
    i += 1;
  }
  return "🏆<b>Leaderboard</b>🏆<br>" + myOutputValue;
};
