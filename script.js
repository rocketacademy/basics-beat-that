//Game Mode
var INPUTMODE = "Input number of players";
var ROLLMODE = "Roll dice";
var ORDERMODE = "Order dice roll";
var COMPAREMODE = "Compare dice roll";
var ENDMODE = "End";
var gameMode = INPUTMODE;

//Global Variable
var numberOfPlayers = "";
var playerCounter = 1;
var myOutputValue = "";
var diceRollOne = "";
var diceRollTwo = "";
var diceRollCombined = "";
var diceRollCurrentArray = [0];
var diceRollOverallArray = [0];
var playerScore = [0];

var main = function (input) {
  //Input number of users
  if (gameMode == INPUTMODE) {
    if (isNaN(input) || input == "") {
      return `Please input number of players.`;
    } else {
      numberOfPlayers = input;
      var i = 1;
      // Setup arrays based on number of players
      while (i <= numberOfPlayers) {
        diceRollOverallArray.push([]);
        playerScore.push(0);
        i = i + 1;
      }
      gameMode = ROLLMODE;
      return `Number of players input: ${numberOfPlayers} <br >Click Submit to begin playing.`;
    }
  }
  //Main game - Roll, Order, Compare, End
  else {
    //End game - If User inputs "End"
    if (input == ENDMODE) {
      myOutputValue = listAllRolls(numberOfPlayers, diceRollOverallArray);
      return myOutputValue;

      // Roll, Order, Compare
    } else {
      while (playerCounter <= numberOfPlayers) {
        if (gameMode == ROLLMODE) {
          diceRollOne = rollDice();
          diceRollTwo = rollDice();
          gameMode = ORDERMODE;
          return `Welcome Player ${playerCounter}<br >You rolled ${diceRollOne} for Dice 1 and ${diceRollTwo} for Dice 2.<br >Choose the order of the dice.`;
        } else if (gameMode == ORDERMODE) {
          if (input == 1) {
            diceRollCombined = Number(diceRollOne + "" + diceRollTwo);
          } else {
            diceRollCombined = Number(diceRollTwo + "" + diceRollOne);
          }
          diceRollCurrentArray.push(diceRollCombined);
          console.log("diceRollCombined: ", diceRollCombined);
          console.log("diceRollCurrentArray: ", diceRollCurrentArray);
          myOutputValue = `Player ${playerCounter}, you chose to order by Dice ${input} first. Your final number is: ${diceRollCombined}.`;
          if (playerCounter < numberOfPlayers) {
            gameMode = ROLLMODE;
            playerCounter = playerCounter + 1;
            myOutputValue += `<br >It is now Player ${playerCounter}'s turn. Press Submit to continue.`;
          } else {
            myOutputValue += `<br >All Players have rolled their dices. Press Submit to compare the dice rolls.`;
            gameMode = COMPAREMODE;
          }
        } else if (gameMode == COMPAREMODE) {
          myOutputValue =
            computeCurrentWinner(
              numberOfPlayers,
              diceRollCurrentArray,
              diceRollOverallArray,
              playerScore
            ) + computeLeaderboard(numberOfPlayers, diceRollOverallArray);
          resetGame();
          return myOutputValue;
        }
        return myOutputValue;
      }
    }
  }
  return myOutputValue;
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
var resetGame = function () {
  gameMode = ROLLMODE;
  playerCounter = 1;
  max = "";
  winningPlayerID = "";
  diceRollCurrentArray = [0];
};
var computeCurrentWinner = function (
  totalNumber,
  currentArray,
  overallArray,
  scoreArray
) {
  var indexNumber = 0;
  var winningPlayerID = "";
  var max = currentArray[0];
  while (indexNumber < totalNumber) {
    indexNumber = indexNumber + 1;
    overallArray[indexNumber].push(currentArray[indexNumber]);
    console.log("OverallArray: ", overallArray);
    // Find max number from array
    if (max <= currentArray[indexNumber]) {
      max = currentArray[indexNumber];
      winningPlayerID = indexNumber;
      console.log("max: ", max);
      console.log("winningPlayerID: ", winningPlayerID);
    }
  }
  scoreArray[winningPlayerID] = scoreArray[winningPlayerID] + 1;
  console.log("playerScore:", playerScore);
  myOutputValue = `Player ${winningPlayerID} wins this round with ${max}!<br >Press Submit to continue playing. Or, type "End" to end the game and review dice roll history.`;
  return myOutputValue;
};
var computeLeaderboard = function (totalNumber, overallArray) {
  myOutputValue = "";
  var indexNumber = 0;
  var innerArrayIndexNumber = 0;
  var sumNumber = 0;
  var previousSumNumber = 0;
  var leaderBoard = [];
  while (indexNumber < totalNumber) {
    indexNumber = indexNumber + 1;
    sumNumber = 0;
    while (innerArrayIndexNumber < overallArray[indexNumber].length) {
      sumNumber = sumNumber + overallArray[indexNumber][innerArrayIndexNumber];
      innerArrayIndexNumber = innerArrayIndexNumber + 1;
    }
    innerArrayIndexNumber = 0;
    myOutputValue = `<br>Player ${indexNumber}: ${sumNumber}`;
    console.log("sumNumber: ", sumNumber);
    console.log("previousSumNumber", previousSumNumber);
    console.log("myOutputValue: ", myOutputValue);
    if (sumNumber > previousSumNumber) {
      leaderBoard.unshift(myOutputValue);
    } else {
      leaderBoard.push(myOutputValue);
    }
    previousSumNumber = sumNumber;
  }
  return `<br><br>Leaderboard:<br>${leaderBoard.join("<br >")}`;
};
var listAllRolls = function (totalNumber, overallArray) {
  var indexNumber = 0;
  myOutputValue = "Dice Roll History:<br >";
  while (indexNumber < totalNumber) {
    indexNumber = indexNumber + 1;
    myOutputValue += `Player ${indexNumber}: ${overallArray[indexNumber]}<br >`;
  }
  return myOutputValue;
};
