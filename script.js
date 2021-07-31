var turnCount = 0; // used to calculate which player's turn, increment by 1 after every "combine"
var gameMode = ["start", 0, 0, "", ""]; // [mode, players, dice, high/low, normal/knockout]
var playerNamesArray = [];
var diceArray = []; // stores n rolls of dice for one player (reset after each player's turn)
var numArray = []; // stores this round's numbers for n players (reset after each round)
var scoreArray = []; // stores accumulated score
var header = "";
var myOutputValue = "";
var currentPlayer = 0;

var koTurnCount = 0;
var koPlayerNamesArray = [];
var koWinnersArray = [];
var koCurrentPlayer = 0;

// SET KNOCKOUT ARRAYS
var setKnockoutArrays = function () {
  koWinnersArray = [];
  koPlayerNamesArray = duplicateArray(playerNamesArray);
  koPlayerNamesArray.shift();
  koWinnersArray.push(koPlayerNamesArray.shift());
  koWinnersArray.push(koPlayerNamesArray.shift());
};

// SET MODES
var setPlayers = function (userInput) {
  myOutputValue = `⚠️ ${userInput} is not a valid input for number of players! Please input a number larger or equal to 2 OR at least 2 names ⚠️`;
  if (userInput == "") {
    // if blank input
    myOutputValue = `⚠️ Please input a number larger or equal to 2 OR at least 2 names ⚠️`;
  } else if (isNaN(userInput)) {
    // if input by player name - put length into gameMode[1]
    playerNamesArray = userInput.split(" ");
    if (playerNamesArray.length > 2) {
      gameMode[1] = playerNamesArray.length;
      myOutputValue = `There will be ${gameMode[1]} players. <br> Please input number of dice (min. 2). 🎲`;
    } else {
      playerNamesArray = [];
    }
  } else if (userInput >= 2) {
    // if input by no. of players - make array of player names
    gameMode[1] = userInput;
    var j = 1;
    while (j <= gameMode[1]) {
      playerNamesArray.push(`Player ${j}`);
      j += 1;
    }
    myOutputValue = `There will be ${gameMode[1]} players. <br> Please input number of dice (min. 2). 🎲`;
  }
  playerNamesArray.unshift("blank");
  // create a blank score array with i elements (i = no. of players)
  var i = 0;
  while (i < gameMode[1]) {
    scoreArray.push(0);
    i += 1;
  }
};

var setDice = function (userInput) {
  myOutputValue = `⚠️ ${userInput} is not a valid input for number of dice! Please input a number larger or equal to 2 ⚠️`;
  if (userInput == "") {
    // if blank input
    myOutputValue = `⚠️ Please input a number larger or equal to 2 for number of dice ⚠️`;
  } else if (userInput >= 2) {
    // if input number
    gameMode[2] = userInput;
    myOutputValue = `There will be ${gameMode[2]} dice. <br> Please select mode (high/low). ⬆️⬇️ <br><br> ※ High - Highest combined number wins; Low - Lowest combined number wins`;
  }
};

var setMode = function (userInput) {
  myOutputValue = `⚠️ ${userInput} is not a valid input for mode! Please input 'high' or 'low' for mode ⚠️`;
  if (userInput == "") {
    // if blank input
    myOutputValue = `⚠️ Please input 'high' or 'low' for mode ⚠️`;
  } else if (userInput == "high" || userInput == "low") {
    // if input high/low
    gameMode[3] = userInput;
    myOutputValue = `You have selected '${gameMode[3]}'. The ${gameMode[3]}est combined number will win. <br> Please choose your game mode (normal/knockout). 🥊`;
  }
};

var setKnockout = function (userInput) {
  myOutputValue = `⚠️ ${userInput} is not a valid input! Please input 'normal' or 'knockout' ⚠️`;
  if (userInput == "") {
    // if blank input
    myOutputValue = `⚠️ Please input 'normal' or 'knockout' for mode ⚠️`;
  } else if (userInput == "normal" || userInput == "knockout") {
    // if input normal/knockout
    if (userInput == "knockout") {
      setKnockoutArrays();
    }
    gameMode[4] = userInput;
    myOutputValue = `You have selected '${gameMode[4]}'. <br><br> Please check your settings below: <br> `;
    myOutputValue += `👤 No. of Players: ${gameMode[1]} <br> 🎲 No. of Dice: ${gameMode[2]} <br> ⬆️⬇️ Winning Mode: ${gameMode[3]} <br> 🥊 Game Mode: ${gameMode[4]} <br><br> Click 'Submit' to start the game.`;
  }
};

// ROLL DICE
var rollNDice = function () {
  var i = 0;
  while (i < gameMode[2]) {
    var diceNum = Math.ceil(Math.random() * 6);
    diceArray.push(diceNum);
    i += 1;
  }
};

// RESET DICE
var resetDice = function () {
  turnCount += 1;
  koTurnCount += 1;
  diceArray = [];
  gameMode[0] = "roll";
};

// SORT ARRAY ACCORDING TO HIGH/LOW
var sortArray = function (array) {
  // sort by comparing numbers
  array.sort(function (a, b) {
    return a - b;
  });
  if (gameMode[3] == "high") {
    array.reverse();
  }
  return array;
};

// COMBINE DICE ARRAY INTO STRING
var combineDice = function (array) {
  var i = 0;
  var number = "";
  while (i < array.length) {
    number += array[i].toString();
    i += 1;
  }
  return number;
};

// DUPLICATE ARRAY
var duplicateArray = function (array) {
  var dupArray = [];
  var i = 0;
  while (i < array.length) {
    dupArray[i] = array[i];
    i += 1;
  }
  return dupArray;
};

// FIND RANKING
var findRank = function (array) {
  // duplicate array and sort according to high/low
  var dupArray = [];
  var i = 0;
  while (i < array.length) {
    dupArray[i] = array[i];
    i += 1;
  }
  sortArray(dupArray);
  // find rank of each element (start from 0)
  var rankArrayZero = [];
  var j = 0;
  while (j < array.length) {
    var rank = array.indexOf(dupArray[j]);
    // prevent duplicates by controlling start number of indexOf
    var k = 1;
    while (k <= j) {
      if (dupArray[j] == dupArray[j - k]) {
        rank = array.indexOf(dupArray[j], rank + 1);
      }
      k += 1;
    }
    rankArrayZero.push(rank);
    j += 1;
  }
  // increment whole array by 1 so that ranking starts from 1
  var rankArray = rankArrayZero.map(function (num) {
    return num + 1;
  });
  return rankArray;
};

// CREATE RANKBOARD
var createRank = function (array, scores, type) {
  var ranks = "";
  var icons = ["🥇", "🥈", "🥉", "🧻", "💩"];
  var i = 0;
  while (i < array.length) {
    if (type == "rank") {
      ranks += String(i + 1);
      ranks += ".";
    } else if (type == "score") {
      if (i < icons.length) {
        ranks += icons[i];
      } else {
        ranks += "💩";
      }
    }
    ranks += ` ${playerNamesArray[array[i]]} - ${scores[array[i] - 1]} <br>`;
    i += 1;
  }
  return ranks;
};

var main = function (input) {
  currentPlayer = 1 + (turnCount % gameMode[1]);
  koCurrentPlayer = koTurnCount % 2;

  // SETTINGS
  if (gameMode[0] == "start") {
    header = "🎰🎰🎰🎰🎰 Welcome to Beat That! 🎰🎰🎰🎰🎰 <br>";
    myOutputValue =
      "Please input number of players (min. 2) OR player names separated by a single space 👤";
    gameMode[0] = "mode";
  } else if (gameMode[0] == "mode") {
    header = "*️⃣*️⃣*️⃣*️⃣*️⃣ SETUP *️⃣*️⃣*️⃣*️⃣*️⃣ <br>";
    if (gameMode[1] == 0) {
      setPlayers(input);
    } else if (gameMode[2] == 0) {
      setDice(input);
    } else if (gameMode[3] == "") {
      setMode(input);
    } else if (gameMode[4] == "") {
      setKnockout(input);
    } else {
      gameMode[0] = "roll";
    }
  }

  if (gameMode[4] == "knockout") {
    if (gameMode[0] == "roll") {
      header = `🎲🎲🎲🎲🎲 ${koWinnersArray[0]} vs. ${koWinnersArray[1]} 🎲🎲🎲🎲🎲 <br>`;
      rollNDice();
      myOutputValue = `${koWinnersArray[koCurrentPlayer]}, your dice rolls are: ${diceArray}. <br><br> Click 'Submit' for your ${gameMode[3]}est combined number.`;
      gameMode[0] = "combine";
    } else if (gameMode[0] == "combine") {
      header = `➕➕➕➕➕ ${koWinnersArray[0]} vs. ${koWinnersArray[1]} ➕➕➕➕➕ <br>`;
      sortArray(diceArray);
      var combinedNum = combineDice(diceArray);
      numArray.push(combinedNum);
      if (koCurrentPlayer == 0) {
        myOutputValue = `${koWinnersArray[0]}, your ${gameMode[3]}est combined number is ${combinedNum}. <br><br> Click 'Submit' for ${koWinnersArray[1]}'s dice rolls.`;
        resetDice();
      } else if (koCurrentPlayer == 1) {
        myOutputValue = `${koWinnersArray[1]}, your ${gameMode[3]}est combined number is ${combinedNum}. <br><br>`;
        var koRanks = findRank(numArray);
        if (koRanks[0] == 1) {
          myOutputValue += `${koWinnersArray[0]}'s ${numArray[0]} is ${gameMode[3]}er than ${koWinnersArray[1]}'s ${numArray[1]}. <br>`;
          koWinnersArray.pop();
        } else if (koRanks[0] == 2) {
          myOutputValue += `${koWinnersArray[1]}'s ${numArray[1]} is ${gameMode[3]}er than ${koWinnersArray[0]}'s ${numArray[0]}. <br>`;
          koWinnersArray.shift();
        }
        if (koPlayerNamesArray.length == 0) {
          myOutputValue += `🏆 ${koWinnersArray[0]} is the final winner! <br><br> Click 'Submit for a new game.`;
          resetDice();
          numArray = [];
          setKnockoutArrays();
        } else {
          myOutputValue += `${koWinnersArray[0]} proceeds to the next round! <br><br> Click 'Submit' to start next round.`;
          resetDice();
          numArray = [];
          koWinnersArray.push(koPlayerNamesArray.shift());
        }
      }
    }
  } else if (gameMode[4] == "normal") {
    if (gameMode[0] == "roll") {
      header = `🎲🎲🎲🎲🎲 PLAYER ${currentPlayer}/${gameMode[1]} 🎲🎲🎲🎲🎲 <br>`;
      // ### ROLL MODE ###
      rollNDice();
      myOutputValue = `${playerNamesArray[currentPlayer]}, your dice rolls are: ${diceArray}. <br><br> Click 'Submit' for your ${gameMode[3]}est combined number.`;
      gameMode[0] = "combine";
    } else if (gameMode[0] == "combine") {
      header = `➕➕➕➕➕ PLAYER ${currentPlayer}/${gameMode[1]} ➕➕➕➕➕ <br>`;
      // ## COMBINE MODE ###
      sortArray(diceArray);
      var combinedNum = combineDice(diceArray);
      numArray.push(combinedNum);
      // SAVE COMBINED NUMBER TO ACCUMULATED SCOREBOARD
      var currentIndex = currentPlayer - 1;
      scoreArray[currentIndex] += Number(combinedNum);
      // PREPARE TO ROLL FOR NEXT PLAYER
      var nextPlayer = currentPlayer + 1;
      if (nextPlayer <= gameMode[1]) {
        myOutputValue = `${playerNamesArray[currentPlayer]}, your ${gameMode[3]}est combined number is ${combinedNum}. <br><br> Click 'Submit' for Player ${nextPlayer}'s dice rolls.`;
        resetDice();
      } else {
        // WHEN LAST PLAYER IS DONE
        var rankingArray = findRank(numArray);
        var scoreboardArray = findRank(scoreArray);
        var rankingMsg = createRank(rankingArray, numArray, "rank");
        var scoreboardMsg = createRank(scoreboardArray, scoreArray, "score");

        myOutputValue =
          `${playerNamesArray[currentPlayer]}, your ${gameMode[3]}est combined number is ${combinedNum}. <br><br> 🏆 THIS ROUND'S RANKINGS 🏆 <br>` +
          rankingMsg +
          "<br> 🧮 SCOREBOARD 🧮 <br>" +
          scoreboardMsg +
          "<br> Click 'Submit' for a new round!";
        resetDice();
        numArray = [];
      }
    }
  }

  return header + myOutputValue;
};
