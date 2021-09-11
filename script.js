var mode1 = "Number of players";
var numberOfPlayers = 0;
var playerNumber = 0;
var mode2 = "Usernames";
var userNames = [];
var mode3 = "Number of dice";
var numberOfDice = 0;
var allPlayersRoll = [];
var allPlayersCombi = [];
var mode4 = "Game mode selection";
var mode5 = "Highest wins";
var mode6 = "Lowest wins";
var mode7 = "KO";
var allPlayersScore = [];
var currentMode = mode1;

var main = function (input) {
  //asking how many players
  if (currentMode == mode1 && input != NaN) {
    numberOfPlayers = input;
    console.log(`number of players: ${numberOfPlayers}`);
    currentMode = mode2;
    return `Hi there will be ${numberOfPlayers} players. Now please enter your usernames. First name will be Player 1, second name Player 2 etc..`;
  } else if (currentMode == mode1 && input == NaN) {
    return `Input is not a number. Please try again.`;
  }
  if (currentMode == mode2) {
    //getting usernames
    while (playerNumber < numberOfPlayers) {
      var output = ``;
      userNames.push(input);
      console.log(userNames);
      console.log(`counter: ${playerNumber}`);
      output += `Player ${playerNumber + 1}: ${
        userNames[playerNumber]
      } <br> You have ${numberOfPlayers} players. Once all players have filled in their names, press submit to begin.`;
      console.log(output);
      playerNumber += 1;
      return output;
    }
    playerNumber = 0;
    console.log(`player counter: ${playerNumber}`);
    currentMode = mode3;
    return `Please select number of dice to play with.`;
  }

  //choosing number of dice
  if (currentMode == mode3) {
    numberOfDice = input;
    console.log(`number of dice: ${numberOfDice}`);
    currentMode = mode4;
    return `You have selected to play with ${numberOfDice} dices per player. Now please select game mode: high / low / ko (caps sensitive)`;
  }

  //selecting game mode
  if (currentMode == mode4) {
    if (input == "high") {
      currentMode = mode5;
      console.log(mode5);
      return `You have selected 'Highest wins' mode! Press submit to continue.`;
    } else if (input == "low") {
      currentMode = mode6;
      return `You have selected 'Lowest wins' mode! Press submit to continue.`;
    } else if (input == "ko") {
      currentMode = mode7;
      return `You have selected 'KO' mode! Press submit to continue.`;
    } else {
      return `Invalid mode selection, please check your spelling and caps and try again. (Game modes available: high / low )`;
    }
  }

  //Highest wins game mode
  if (currentMode == mode5) {
    console.log(`mode 5`);
    console.log(`playerNumber: ${playerNumber}`);
    while (playerNumber < numberOfPlayers) {
      var individualPlayerRolls = [];
      var innerCounter = 0;
      //generate dice numbers
      while (innerCounter < numberOfDice) {
        individualPlayerRolls.push(diceRoll());
        console.log(`Player rolls: ${individualPlayerRolls}`);
        innerCounter += 1;
      }
      //sort dice numbers from big to small
      individualPlayerRolls.sort(function (a, b) {
        return b - a;
      });
      console.log(individualPlayerRolls);
      individualPlayerRolls.toString();
      console.log(individualPlayerRolls);
      //generate combination as a string
      var innerCounter2 = 0;
      var number = "";
      while (innerCounter2 < numberOfDice) {
        number += individualPlayerRolls[innerCounter2];
        console.log(number);
        innerCounter2 += 1;
      }
      //convert string to number and push into array
      var realNumber = Number(number);
      console.log(realNumber);
      allPlayersRoll.push(realNumber);
      console.log(`allPlayersRoll: ${allPlayersRoll}`);
      playerNumber += 1;
    }
    playerNumber = 0;
    //compare numbers and decide winner
    var winningNumber = 0;
    var winningIndex = 0;
    while (playerNumber < numberOfPlayers) {
      if (winningNumber < allPlayersRoll[playerNumber]) {
        winningNumber = allPlayersRoll[playerNumber];
        winningIndex = playerNumber;
        console.log(winningNumber);
        console.log(winningIndex);
      }
      playerNumber += 1;
    }
    currentMode = mode3;
    return `${userNames[winningIndex]} won with a highest combination of ${winningNumber}! To go for another round, please select the number of dice to play with.`;
  }

  //Lowest wins game mode
  if (currentMode == mode6) {
    console.log(`mode 6`);
    console.log(`playerNumber: ${playerNumber}`);
    while (playerNumber < numberOfPlayers) {
      var individualPlayerRolls = [];
      var innerCounter = 0;
      //generate dice numbers
      while (innerCounter < numberOfDice) {
        individualPlayerRolls.push(diceRoll());
        console.log(`Player rolls: ${individualPlayerRolls}`);
        innerCounter += 1;
      }
      //sort dice numbers from small to big
      individualPlayerRolls.sort(function (a, b) {
        return a - b;
      });
      console.log(individualPlayerRolls);
      individualPlayerRolls.toString();
      console.log(individualPlayerRolls);
      //generate combination as a string
      var innerCounter2 = 0;
      var number = "";
      while (innerCounter2 < numberOfDice) {
        number += individualPlayerRolls[innerCounter2];
        console.log(number);
        innerCounter2 += 1;
      }
      //convert string to number and push into array
      var realNumber = Number(number);
      console.log(realNumber);
      allPlayersRoll.push(realNumber);
      console.log(`allPlayersRoll: ${allPlayersRoll}`);
      playerNumber += 1;
    }
    playerNumber = 0;
    //compare numbers and decide winner
    var winningNumber = allPlayersRoll[0];
    var winningIndex = 0;
    while (playerNumber < numberOfPlayers) {
      if (winningNumber > allPlayersRoll[playerNumber + 1]) {
        winningNumber = allPlayersRoll[playerNumber + 1];
        winningIndex = playerNumber + 1;
        console.log(winningNumber);
        console.log(winningIndex);
      }
      playerNumber += 1;
    }
    currentMode = mode3;
    return `${userNames[winningIndex]} won with a lowest combination of ${winningNumber}! To go for another round, please select the number of dice to play with.`;
  }
};

diceRoll = function () {
  var numberDecimal = Math.random() * 6 + 1;
  var numberFinal = Math.floor(numberDecimal);
  return numberFinal;
};
