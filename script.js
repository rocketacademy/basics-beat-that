//declare global variables,constants and arrays
const INSTRUCTION = "instruction";
const INPUT_PLAYER = "inputPlayer"; //input number of players playing
const INPUT_DICE = "inputDice"; //input number of dice playing
const INPUT_MODE = "inputMode"; //input game mode
const NORMAL_MODE = "normalMode";
const KNOCKOUT_MODE = "knockoutMode";
var numberOfPlayers = 0;
var numberOfDice = 0;
var currentPlayer = 1;
var nextPlayer = 0;
var gameMode = INSTRUCTION;
var optimalNumber = "";
var knockoutRounds = 0;
var randomPlayerNumber1 = "";
var randomPlayerNumber2 = "";
var randomPlayerNumber1Score = "";
var randomPlayerNumber2Score = "";
var knockoutWinner = "";
var knockoutLoser = "";
var rolledDiceArray = [];
var allPlayerScoreArray = [];
var knockoutPlayerArray = [];

//function for dice roll btw 1-6
var randomDiceRoll = function () {
  var randomDiceNumber = Math.floor(Math.random() * 6) + 1;
  return randomDiceNumber;
};

//function to roll the dice (numberOfDice) times and append into rolledDiceArray
var multipleDiceRoll = function () {
  var counter = 0;
  while (counter < numberOfDice) {
    randomDiceNumber = randomDiceRoll();
    rolledDiceArray.push(randomDiceNumber);
    counter += 1;
  }
};

//function to generate optimal combined number based on rolledDiceArray
//note: will perform this function on a copy of rolledDiceArray since this function will modify the array

var generateOptimalCombinedNumber = function () {
  //[INNER LOOP] find the largest number in the array. loop thru each element in array and compare to maxNumber. if greater than maxNumber,replaced it.
  //[OUTER LOOP] change current largest element (maxNumberIndex) to "0" value to find the next largest number in the rolledDiceArray
  //[OUTER LOOP] append the number from largest to smallest into optimalNumberArray

  var maxNumber = 0;
  var maxNumberIndex = 0;
  var optimalNumberArray = [];

  //make a copy of rolledDiceArray
  var rolledDiceArrayCopy = [];
  var copyIndex = 0;
  while (copyIndex < rolledDiceArray.length) {
    rolledDiceArrayCopy[copyIndex] = rolledDiceArray[copyIndex];
    copyIndex += 1;
  }

  //find largest number and generate optimal number
  var outerIndex = 0;
  while (outerIndex < numberOfDice) {
    var innerIndex = 0;
    while (innerIndex < numberOfDice) {
      if (rolledDiceArrayCopy[innerIndex] > maxNumber) {
        maxNumber = rolledDiceArrayCopy[innerIndex];
        maxNumberIndex = innerIndex;
      }
      innerIndex += 1;
    }
    rolledDiceArrayCopy[maxNumberIndex] = 0;
    optimalNumberArray.push(maxNumber);
    maxNumber = 0;
    outerIndex += 1;
  }

  //combined elements in optimalNumberArray into an optimal number
  var counter = 0;
  while (counter < optimalNumberArray.length) {
    optimalNumber += `${optimalNumberArray[counter]}`;
    counter += 1;
  }

  //assign score according to player index in allPlayerScoreArray
  allPlayerScoreArray[currentPlayer - 1] += Number(optimalNumber);

  return optimalNumber;
};

//function to calculate current leader in scoreboard [NORMAL mode]
var calcCurrentLeader = function () {
  var maxScore = 0;
  var maxScoreIndex = 0;
  scoreIndex = 0;
  while (scoreIndex < numberOfPlayers) {
    if (allPlayerScoreArray[scoreIndex] > maxScore) {
      maxScore = allPlayerScoreArray[scoreIndex];
      maxScoreIndex = scoreIndex;
    }
    scoreIndex += 1;
  }
  var currentLeader = maxScoreIndex + 1;
  return currentLeader;
};

//function to generate output message [NORMAL mode]
var generateOutputMessageNormalMode = function () {
  nextPlayer = (currentPlayer % numberOfPlayers) + 1;
  var welcomeMessage = `Welcome, Player ${currentPlayer}.`;
  var diceRollMessage = "";
  var optimalNumberMessage = `Your number is ${optimalNumber.bold()}`;
  var playerTurnsMessage = `It is now Player ${nextPlayer}'s turn. Click "Submit" to roll dice. `;
  var scoreboardTitle = `SCOREBOARD:`;
  var scoreboardMessage = "";
  var currentLeaderMessage = "";

  //print all numbers in rolledDiceArray for diceRollMessage
  var diceIndex = 0;
  while (diceIndex < numberOfDice) {
    var diceNumber = diceIndex + 1;
    diceRollMessage += `You rolled ${rolledDiceArray[diceIndex]} for Dice ${diceNumber}.<br>`;
    diceIndex += 1;
  }

  //print all numbers in allPlayerScoreArray for scoreboardMessage
  var playerIndex = 0;
  while (playerIndex < numberOfPlayers) {
    var playerNumber = playerIndex + 1;
    scoreboardMessage += `Player ${playerNumber} : ${allPlayerScoreArray[playerIndex]}<br>`;
    playerIndex += 1;
  }

  //get current leader player from calcCurrentLeader() function
  var currentLeaderNumber = calcCurrentLeader();
  currentLeaderMessage = `The current leader is Player ${currentLeaderNumber}!`;

  //combined all messages into a final output message
  var outputMessage = `${welcomeMessage}<br><br>${diceRollMessage}<br><br>${optimalNumberMessage}<br>${playerTurnsMessage}<br><br>${scoreboardTitle}<br>${scoreboardMessage}<br><br>${currentLeaderMessage}`;
  return outputMessage;
};

//function to reset variables for next round [NORMAL + KNOCKOUT mode]
var resetForNextRound = function () {
  //reset rolled dice array for next player
  rolledDiceArray = [];

  //reset optimal number
  optimalNumber = "";

  //reset current player when it hit numberOfPlayers
  //currentPlayer is set to 0 because main function will switch to next player.
  if (currentPlayer >= numberOfPlayers) {
    currentPlayer = 0;
  }
};

//initialize knockoutPlayerArray for knockout game [KNOCKOUT mode]
var initializeKnockoutGame = function () {
  //assign player number into array to keep track remaining player in game
  //eg: if there's 5 players, knockoutPlayerArray = [1,2,3,4,5]
  var knockoutPlayerIndex = 0;
  while (knockoutPlayerIndex < numberOfPlayers) {
    knockoutPlayerArray[knockoutPlayerIndex] = Number(knockoutPlayerIndex + 1);
    knockoutPlayerIndex += 1;
  }
};

//function to select random 2 players to play [KNOCKOUT mode]
var knockoutPlayerSelection = function () {
  //randomly select 2 players from the knockoutPlayerArray

  //randomly select the first player
  var randomPlayerIndex1 = Math.floor(
    Math.random() * knockoutPlayerArray.length
  );
  randomPlayerNumber1 = knockoutPlayerArray[randomPlayerIndex1];

  //remove first selected player from the array
  knockoutPlayerArray.splice(randomPlayerIndex1, 1);

  //randomly select the second player
  var randomPlayerIndex2 = Math.floor(
    Math.random() * knockoutPlayerArray.length
  );
  randomPlayerNumber2 = knockoutPlayerArray[randomPlayerIndex2];

  //remove second selected player from the array
  knockoutPlayerArray.splice(randomPlayerIndex2, 1);
};

//function to calculate knockout result  [KNOCKOUT mode]
var knockoutGame = function () {
  //random player 1 roll dice and get optimal number
  currentPlayer = randomPlayerNumber1;
  multipleDiceRoll();
  generateOptimalCombinedNumber();
  randomPlayerNumber1Score = allPlayerScoreArray[randomPlayerNumber1 - 1];

  //reset optimal number before player 2 play
  resetForNextRound();

  //random player 2 roll dice and get optimal number
  currentPlayer = randomPlayerNumber2;
  multipleDiceRoll();
  generateOptimalCombinedNumber();
  randomPlayerNumber2Score = allPlayerScoreArray[randomPlayerNumber2 - 1];

  //reset optimal number for next round
  resetForNextRound();

  //compare and see random player 1 or 2 won
  if (randomPlayerNumber1Score > randomPlayerNumber2Score) {
    knockoutWinner = randomPlayerNumber1;
    knockoutLoser = randomPlayerNumber2;

    //add back player 1 into array if he wins
    addBackKnockoutGameWinner(randomPlayerNumber1);
  } else {
    knockoutWinner = randomPlayerNumber2;
    knockoutLoser = randomPlayerNumber1;

    //add back player 2 into array if he wins
    addBackKnockoutGameWinner(randomPlayerNumber2);
  }
  //keep track of number of knockour rounds played
  knockoutRounds += 1;
};

//function to add back player into array if he wins  [KNOCKOUT mode]
var addBackKnockoutGameWinner = function (randomPlayerNumber) {
  //put back randomPlayer into array since player is not eliminated
  //loop thru array,find the number which is larger than player number, then insert player number at that index
  // unless player number is the largest number , then insert at last index

  var arrayIndex = 0;
  while (arrayIndex < knockoutPlayerArray.length) {
    if (knockoutPlayerArray[arrayIndex] > randomPlayerNumber) {
      knockoutPlayerArray.splice(arrayIndex, 0, randomPlayerNumber);
      break;
    } else if (arrayIndex + 1 == knockoutPlayerArray.length) {
      knockoutPlayerArray.push(randomPlayerNumber);
      break;
    }
    arrayIndex += 1;
  }
};

//function to generate output message for knockout mode [KNOCKOUT mode]
var generateOutputMessageKnockoutMode = function () {
  var knockoutRoundsMsg = `Knockout Round ${knockoutRounds}~~ `;
  var knockoutPlayerSelectionMsg = `Player ${randomPlayerNumber1} vs Player ${randomPlayerNumber2}`;
  var knockoutOptimalNumberMsg = `Player ${randomPlayerNumber1}'s number is ${randomPlayerNumber1Score}<br>Player ${randomPlayerNumber2}'s number is ${randomPlayerNumber2Score}<br>`;
  var knockoutgameMsg = `Player ${knockoutWinner} won! Player ${knockoutLoser} is eliminated!`;
  var remainingPlayerMsg = "";
  var knockoutResultMsg = "";
  var knockoutInstruction = "";

  if (knockoutRounds < numberOfPlayers - 1) {
    //print this if second last round
    remainingPlayerMsg = `Player ${knockoutPlayerArray} remains...`;
    knockoutInstruction = `Click "Submit" to proceed to the next round!`;
  } else if (knockoutRounds == numberOfPlayers - 1) {
    //print this during last round
    remainingPlayerMsg = "";
    knockoutResultMsg = `Congratulation! Player ${knockoutWinner} is the final winner of knockout game!`;
    knockoutInstruction = `Click "Submit" to replay the game!`;
    gameMode = INSTRUCTION;
  }
  var finalMsg = `${knockoutRoundsMsg}<br><br>${knockoutPlayerSelectionMsg}<br><br>${knockoutOptimalNumberMsg}<br><br>${knockoutgameMsg}<br>${remainingPlayerMsg}<br>${knockoutResultMsg}<br>${knockoutInstruction}`;

  return finalMsg;
};

var main = function (input) {
  var myOutputValue = "";

  if (gameMode == INSTRUCTION) {
    myOutputValue = `Welcome to the Beat That game! This is a multiplayer game.<br><br>
    Please input the number of players playing. `;
    gameMode = INPUT_PLAYER;
  } else if (gameMode == INPUT_PLAYER) {
    numberOfPlayers = Number(input);

    //initiate score array to be 0 score for all players with numOfPlayers length
    allPlayerScoreArray = Array(numberOfPlayers).fill(0);

    myOutputValue = `${numberOfPlayers} players are playing. Please input the number of dice for this round.`;
    gameMode = INPUT_DICE;
  } else if (gameMode == INPUT_DICE) {
    numberOfDice = Number(input);

    myOutputValue = `Each player will roll ${numberOfDice} dice each round. Please input "normal" or "knockout" to select your game mode.`;
    gameMode = INPUT_MODE;
  } else if (gameMode == INPUT_MODE) {
    if (input == "normal") {
      myOutputValue = `You have selected Normal mode. Your score will accumulate in this mode.<br>Player 1 start first.`;
      gameMode = NORMAL_MODE;
    } else if (input == "knockout") {
      myOutputValue = `You have selected Knockout mode. There will only be one winner!!`;
      initializeKnockoutGame();
      gameMode = KNOCKOUT_MODE;
    }
  } else if (gameMode == NORMAL_MODE) {
    //roll multiple dice & generate optimal combined number
    multipleDiceRoll();
    generateOptimalCombinedNumber();

    //generate output message
    myOutputValue = generateOutputMessageNormalMode();

    //reset for next round
    resetForNextRound();

    //switch to next player
    currentPlayer += 1;
  } else if (gameMode == KNOCKOUT_MODE) {
    //select 2 players to play knockout game
    knockoutPlayerSelection();

    //play knockout game
    knockoutGame();

    //initiate score array to be 0 score for all players with numOfPlayers length
    //because in knockout mode, player will play more than once if they're winner.
    allPlayerScoreArray = Array(numberOfPlayers).fill(0);

    //generate output message
    myOutputValue = generateOutputMessageKnockoutMode();
  }

  return myOutputValue;
};
