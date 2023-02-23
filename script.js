/*
Math.random for dice rolls from 0 to 7. Then, Math.floor + 1;

Return the values and convert them into a string. Add this 2 strings together.
Before adding together, find out which value is bigger than each other using comparison
operators such as < > =
This will be the final value. Convert this value back to int or use Number()
Repeat the functions for the following player.

Array should only be used when you want to generate a list and iterate it over and over again with loops.
*/

var number = [];
var gameStatus = "Number Of Players";
var currentPlayer = 1;
var totalNumberOfPlayers = 0;
var numberOfDices = 0;
var highscore = [];
var sortedList = [];
var scoreMode = "";
var gameMode = "";

var rollDice = function () {
  var generatedNumber = Math.random() * 6;
  var rolledNumber = Math.floor(generatedNumber) + 1;
  return rolledNumber;
};

var numberOfRolls = function (input) {
  var myOutputValue = `Player ${currentPlayer} is rolling ...<br><br>`;

  for (var counter = 1; counter <= input; counter += 1) {
    var diceRolls = rollDice();
    myOutputValue =
      myOutputValue + `Player rolled ${diceRolls} for Dice ${counter}.<br>`;
    number.push(diceRolls);
  }

  return myOutputValue;
};

var index = 0;

var diceRolledHighest = function (input) {
  var myOutputValue = numberOfRolls(input);
  var string = "";
  for (var counter = 0; counter < number.length; counter += 1) {
    //Sort function for array in a descending order with b - a
    number.sort(function (a, b) {
      return b - a;
    });
    string += number[counter];
  }

  if (totalNumberOfPlayers > index) {
    highscore[index++] = string;
  } else {
    index = 0;
    highscore[index++] = string;
  }

  number.length = 0;

  myOutputValue = myOutputValue + `<br> Your number is ${string}.`;

  return myOutputValue;
};

var diceRolledLowest = function (input) {
  var myOutputValue = numberOfRolls(input);
  var string = "";
  for (var counter = 0; counter < number.length; counter += 1) {
    //Sort function for array in a descending order with b - a
    number.sort(function (a, b) {
      return a - b;
    });
    string += number[counter];
  }

  if (totalNumberOfPlayers > index) {
    highscore[index++] = string;
  } else {
    index = 0;
    highscore[index++] = string;
  }

  number.length = 0;

  myOutputValue = myOutputValue + `<br> Your number is ${string}.`;

  return myOutputValue;
};

var numberOfPlayers = function (numberOfDices) {
  if (scoreMode == "Highest") {
    if (currentPlayer <= totalNumberOfPlayers) {
      var rollResults = diceRolledHighest(numberOfDices);
    } else {
      currentPlayer = 1;
      var rollResults = diceRolledHighest(numberOfDices);
    }
  } else {
    if (currentPlayer <= totalNumberOfPlayers) {
      var rollResults = diceRolledLowest(numberOfDices);
    } else {
      currentPlayer = 1;
      var rollResults = diceRolledLowest(numberOfDices);
    }
  }

  if (currentPlayer == totalNumberOfPlayers) {
    rollResults = rollResults + `<br>Player ${currentPlayer} is rolling.`;
  } else {
    rollResults = rollResults + `<br>Player ${currentPlayer + 1} is rolling.`;
  }

  currentPlayer += 1;

  return rollResults;
};

var highscoreTable = function () {
  var outputScore = "";

  for (var x = 1; x <= totalNumberOfPlayers; x++) {
    /*
    highscore.sort(function (a, b) {
      return b - a;
    });
    outputScore += `${highscore[x - 1]} </br>`;
    */
    var object = {};
    object[`Player`] = x;
    object[`Score`] = highscore[x - 1];

    sortedList.push(object);
    sortedList.sort(function (a, b) {
      return b.Score - a.Score;
    });
    var reducedList = sortedList.reduce(
      (acc, curr) => `${acc}Player ${curr.Player} : ${curr.Score}<br>`,
      ""
    );
  }

  var getMax = Math.max(...sortedList.map((s) => s.Score));

  /*
  if (
    sortedList.length == totalNumberOfPlayers &&
    typeof sortedList != `undefined`
  ) {
    var getMax = Math.max(...sortedList.map((s) => s.Score));
    var maxObj = sortedList.find((o) => o.Score === `${getMax}`);

    console.log(maxObj);
  }
  */
  outputScore = reducedList + `<br><br> The highscore is ${getMax}.`;
  sortedList.length = 0;

  return outputScore;
};

var lowscoreTable = function () {
  var outputScore = "";

  for (var x = 1; x <= totalNumberOfPlayers; x++) {
    /*
    highscore.sort(function (a, b) {
      return b - a;
    });
    outputScore += `${highscore[x - 1]} </br>`;
    */
    var object = {};
    object[`Player`] = x;
    object[`Score`] = highscore[x - 1];

    sortedList.push(object);
    sortedList.sort(function (a, b) {
      return a.Score - b.Score;
    });
    var reducedList = sortedList.reduce(
      (acc, curr) => `${acc}Player ${curr.Player} : ${curr.Score}<br>`,
      ""
    );
  }

  console.log(sortedList);
  var getMin = Math.min(...sortedList.map((s) => s.Score));
  outputScore = reducedList + `<br><br> The lowest score is ${getMin}.`;
  sortedList.length = 0;

  return outputScore;
};

var knockoutPlayers = [];
var knockoutStatus = "Matchup";

var setTotalPlayers = function () {
  for (var counter = 1; counter <= totalNumberOfPlayers; counter += 1) {
    knockoutPlayers.push(counter);
  }
};

var randomPlayer = function () {
  var playerChosen = Math.floor(Math.random() * knockoutPlayers.length);
  return playerChosen;
};

var fightString = [];

var playerString = function (input) {
  var myOutputValue = numberOfRolls(input);
  var string = "";
  if (scoreMode == "Highest") {
    for (var counter = 0; counter < number.length; counter += 1) {
      //Sort function for array in a descending order with b - a
      number.sort(function (a, b) {
        return b - a;
      });
      string += number[counter];
    }
  } else {
    for (var counter = 0; counter < number.length; counter += 1) {
      //Sort function for array in a descending order with b - a
      number.sort(function (a, b) {
        return a - b;
      });
      string += number[counter];
    }
  }

  fightString.push(string);

  number.length = 0;

  myOutputValue = myOutputValue + `<br> Your number is ${string}.`;

  return myOutputValue;
};

function indexOfMax(arr) {
  if (arr.length === 0) {
    return -1;
  }

  var max = arr[0];
  var maxIndex = 0;

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i;
      max = arr[i];
    }
  }

  return maxIndex;
}

function removeItemByIndex(array, value) {
  var index = array.indexOf(value);
  if (index > -1) {
    array.splice(index, 1);
  }
  return array;
}

var onePlayer = 0;
var twoPlayer = 0;

var knockOut = function () {
  var myOutputValue = "";

  if (knockoutStatus == "Matchup") {
    if (knockoutPlayers.length == 0) {
      setTotalPlayers();
    }

    console.log(knockoutPlayers);
    onePlayer = knockoutPlayers[randomPlayer()];
    twoPlayer = knockoutPlayers[randomPlayer()];
    console.log(onePlayer);
    console.log(twoPlayer);
    while (onePlayer == twoPlayer) {
      twoPlayer = knockoutPlayers[randomPlayer()];
    }
    knockoutStatus = "One Rolling";
    myOutputValue = `Player ${onePlayer} and Player ${twoPlayer} are selected to play. Player ${onePlayer} starts first.`;
  } else if (knockoutStatus == "One Rolling") {
    currentPlayer = onePlayer;
    myOutputValue = playerString(numberOfDices);
    knockoutStatus = "Two Rolling";
  } else if (knockoutStatus == "Two Rolling") {
    currentPlayer = twoPlayer;
    myOutputValue = playerString(numberOfDices);
    var results = `<br><br>Player ${onePlayer}'s number is ${fightString[0]}.<br>Player ${twoPlayer}'s number is ${fightString[1]}.`;
    console.log(fightString);
    var winner = 0;
    var loser = 0;
    if (scoreMode == "Highest") {
      if (fightString[0] > fightString[1]) {
        winner = onePlayer;
        loser = twoPlayer;
      } else {
        winner = twoPlayer;
        loser = onePlayer;
      }
    } else {
      if (fightString[0] > fightString[1]) {
        winner = twoPlayer;
        loser = onePlayer;
      } else {
        winner = onePlayer;
        loser = twoPlayer;
      }
    }
    myOutputValue =
      myOutputValue + results + `<br><br>The winner is Player ${winner}.`;

    removeItemByIndex(knockoutPlayers, loser);

    if (knockoutPlayers.length == 1) {
      myOutputValue =
        myOutputValue +
        `<br><br> Last player standing is ${knockoutPlayers[0]}`;
        gameStatus = "Number Of Players"
        knockoutStatus = "Matchup"
    } else {
      knockoutStatus = "Matchup";
      onePlayer = 0;
      twoPlayer = 0;
      fightString.length = 0;
      
    }
  }

  return myOutputValue;
};

var main = function (input) {
  var myOutputValue = "";
  var scoreOutput = "";

  if (gameStatus == "Number Of Players") {
    var NUMBEROFPLAYERS = input.trim();
    if (NUMBEROFPLAYERS < 2 || isNaN(NUMBEROFPLAYERS)) {
      myOutputValue = `Please input more than 2 players.`;
    } else {
      totalNumberOfPlayers = NUMBEROFPLAYERS;
      myOutputValue = `${NUMBEROFPLAYERS} players are playing. Please input for number of dices.`;
      gameStatus = "Number Of Dices";
    }

    return myOutputValue;
  } else if (gameStatus == "Number Of Dices") {
    var userInput = input.trim();

    if (userInput < 2 || isNaN(userInput)) {
      myOutputValue = `Please input more than 2 dices.`;
    } else {
      numberOfDices = input;
      myOutputValue = `Number of dices are ${numberOfDices}. Please input score mode.`;
      gameStatus = "Score Mode";
    }

    return myOutputValue;
  } else if (gameStatus == "Score Mode") {
    if (input.trim() != "Highest" && input.trim() != "Lowest") {
      myOutputValue = `Please input a valid score Mode : Highest or Lowest`;
    } else {
      scoreMode = `${input}`;
      myOutputValue = `Player shall win with the ${input} score! Now input game mode.`;
      gameStatus = "Game Mode";
    }

    return myOutputValue;
  } else if (gameStatus == "Game Mode") {
    if (input.trim() != "Normal" && input.trim() != "Knockout") {
      myOutputValue = `Please input a valid game Mode : Normal or Knockout`;
    } else {
      gameMode = `${input}`;
      myOutputValue = `You have chosen ${input} gamemode. You can start now!`;
      gameStatus = "Start Rolling";
    }

    return myOutputValue;
  } else if (
    gameStatus == "Start Rolling" &&
    scoreMode == "Highest" &&
    gameMode == "Normal"
  ) {
    myOutputValue = numberOfPlayers(numberOfDices);
    scoreOutput = highscoreTable();
  } else if (
    gameStatus == "Start Rolling" &&
    scoreMode == "Lowest" &&
    gameMode == "Normal"
  ) {
    myOutputValue = numberOfPlayers(numberOfDices);
    scoreOutput = lowscoreTable();
  } else if (gameStatus == "Start Rolling" && gameMode == "Knockout") {
    myOutputValue = knockOut();
  }

  var scoreTable = document.querySelector("#scoreTable");
  scoreTable.innerHTML = scoreOutput;

  return myOutputValue;
};
