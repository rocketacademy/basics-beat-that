var gametype = "nil";
var gamestage = "nil";
var numberOfDice = 0;
var numberOfPlayers = 0;
var PlayerNames = [];
var PlayerGeneratedNumbers = [];
var PlayerScores = [];
var playcount = 0;
var numberOfPlayersPlayed = 0;
var outputvalue = "please enter the number of players";
// i need to put the player numbers into an array using a loop

var main = function (input) {
  if (gamestage == "nil") {
    if (isNaN(input) || input == 0 || input == "") {
      return "invalid input! " + outputvalue;
    }
    outputvalue = 'pls type "lowest" or "highest" to determine how the winner should be picked';
    numberOfPlayers = `${input}`;
    gamestage = "gametype";
    console.log(gamestage);
  } else if (gamestage == "gametype") {
    gametype = `${input}`;
    if (gametype != "lowest" && gametype != "highest") {
      return "invalid input! " + outputvalue;
    }

    gamestage = "start1";
    console.log(gametype);
    outputvalue = "pls enter username for player 1";
  }

  // start of the game
  else if (gamestage == "start1") {
    numberOfPlayersPlayed = numberOfPlayersPlayed + 1;
    PlayerNames.push(input);
    PlayerScores.push(0);
    console.log(`player names = ${PlayerNames}`);
    console.log(`Player scores = ${PlayerScores}`);
    if (numberOfPlayers > numberOfPlayersPlayed) {
      outputvalue = `pls enter username for player ${numberOfPlayersPlayed + 1}`;
    } else {
      numberOfPlayersPlayed = 0;
      gamestage = "enternumberofdice";
      outputvalue = "pls input the number of dice to be played in the game";
    }
  } else if (gamestage == "enternumberofdice") {
    if (isNaN(input) || input == 0 || input == "") {
      return "invalid input! " + outputvalue;
    }
    numberOfDice = `${input}`;
    gamestage = "turns";
    outputvalue = `${PlayerNames[0]}, pls click 'submit' to generate your number`;
  }

  //players will generate their number
  else if (gamestage == "turns") {
    numberOfPlayersPlayed = numberOfPlayersPlayed + 1;
    var number = playerNumber();
    PlayerGeneratedNumbers.push(number);
    console.log(PlayerGeneratedNumbers);
    if (numberOfPlayers > numberOfPlayersPlayed) {
      outputvalue = number + `, it is now ${PlayerNames[numberOfPlayersPlayed]}'s turn to generate his/her number. Pls click "submit" to continue`;
    } else {
      gamestage = "comparison";
      outputvalue = number + ", pls click submit to compare the numbers";
    }
    // compare the  numbers generated and find the winner
  } else if (gamestage == "comparison") {
    playcount = playcount + 1;
    if (gametype == "highest") {
      var whoWins = CompareTheNumbersHigh();
    } else if (gametype == "lowest") {
      var whoWins = CompareTheNumbersLow();
    }
    leaderboard = makeLeaderboard();
    outputvalue = whoWins + leaderboard + `<br>click "submit" to start another round beginning from ${PlayerNames[0]}`;
    gamestage = "turns";
    numberOfPlayersPlayed = 0;
    PlayerGeneratedNumbers = [];
  }

  return outputvalue;
};

var diceRoll = function () {
  var number = Math.random() * 6;
  var integer = Math.ceil(number);
  return integer;
};
var playerNumber = function () {
  var numArray = [];
  var numberOfDiceRolled = 0;
  while (numberOfDice > numberOfDiceRolled) {
    var diceRolled = diceRoll();
    numArray.push(diceRolled);
    numberOfDiceRolled = numberOfDiceRolled + 1;
  }
  var outputarray = numArray.sort();
  if (gametype == "highest") {
    outputarray = outputarray.reverse();
  }
  numberGenerated = outputarray.join("");
  return numberGenerated;
};

var CompareTheNumbersHigh = function () {
  var highestNumber = `${Math.max.apply(null, PlayerGeneratedNumbers)}`;
  var numericalPositionOfthatNumber = Number(PlayerGeneratedNumbers.indexOf(highestNumber));
  console.log(`number position = ${numericalPositionOfthatNumber}`);
  var playerWithThatNumber = PlayerNames[numericalPositionOfthatNumber];
  PlayerScores[numericalPositionOfthatNumber] = Number(PlayerScores[numericalPositionOfthatNumber]) + 1;
  return playerWithThatNumber + " is the winner!";
};
var CompareTheNumbersLow = function () {
  var lowestNumber = `${Math.min.apply(null, PlayerGeneratedNumbers)}`;
  var numericalPositionOfthatNumber = Number(PlayerGeneratedNumbers.indexOf(lowestNumber));
  console.log(`number position = ${numericalPositionOfthatNumber}`);
  var playerWithThatNumber = PlayerNames[numericalPositionOfthatNumber];
  PlayerScores[numericalPositionOfthatNumber] = Number(PlayerScores[numericalPositionOfthatNumber]) + 1;
  return playerWithThatNumber + " is the winner!";
};
var makeLeaderboard = function () {
  var counter = 0;
  var leaderboard = "";
  while (numberOfPlayers > counter) {
    leaderboard = leaderboard + `<br>${PlayerNames[counter]}'score = ${PlayerScores[counter]}`;
    counter = counter + 1;
  }
  return leaderboard;
};
