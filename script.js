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
      myOutputValue = "END";
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
          //Find winner for this round
          i = 0;
          var winningPlayerID = "";
          var max = diceRollCurrentArray[0];
          while (i < numberOfPlayers) {
            i = i + 1;
            diceRollOverallArray[i].push(diceRollCurrentArray[i]);
            console.log("diceRollOverallArray: ", diceRollOverallArray);
            // Find max number from array
            if (max <= diceRollCurrentArray[i]) {
              max = diceRollCurrentArray[i];
              winningPlayerID = i;
              console.log("max: ", max);
              console.log("winningPlayerID: ", winningPlayerID);
            }
          }
          playerScore[winningPlayerID] = playerScore[winningPlayerID] + 1;
          console.log("playerScore:", playerScore);
          myOutputValue = `Player ${winningPlayerID} wins this round with ${max}!<br >Press Submit to continue playing. Or, type "End" to end the game and tabulate scores.`;
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
