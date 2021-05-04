var playerTurn = 1;
var decisionTurn = false;
var playerWins = [];

var playerNum = [];

var reverseGame = false;
var playerTurn = -1;
var numDraw = 0;

var numPlayers = 0;
var decisionTurn = false;

var firstNum;
var secondNum;

var numOfDice = 0;

var getIndexOfMaxNum = function (input) {
  var maxNum = -1;
  var maxNumId;

  for (var i = 0; i < input.length; i += 1) {
    if (input[i] > maxNum) {
      maxNum = input[i];
      maxNumId = i;
    }
  }
  return maxNumId;
};

var getIndexOfMinNum = function (input) {
  var minNum = 1000000; //can set as 10*number of dice
  var minNumId;

  for (var i = 0; i < input.length; i += 1) {
    if (input[i] < minNum) {
      minNum = input[i];
      minNumId = i;
    }
  }
  return minNumId;
};

var diceRoll = function (input) {
  return Math.floor(Math.random() * input + 1);
};

var largestNumberFromRolls = function (numDice) {
  var diceRolls = [];
  var largestNumber = 0;
  for (var i = 0; i < numDice; i += 1) {
    diceRolls.push(diceRoll(6));
  }
  diceRolls.sort(function (a, b) {
    return a - b;
  });

  for (var i = 0; i < numDice; i += 1) {
    largestNumber += diceRolls[i] * Math.pow(10, i);
  }
  return largestNumber;
};

var main = function (input) {
  var output = "";
  //reverse game
  if (input == "r") {
    reverseGame = !reverseGame;
    if (reverseGame) {
      return `reverse game started `;
    } else {
      return `game has be un-reversed`;
    }
  }

  //key in number of players, set up arrays
  if (playerTurn == -1) {
    if (isNaN(Number(input)) || input == 0) {
      return `please return a number more than 0`;
    } else {
      numPlayers = Number(input);

      playerNum = new Array(numPlayers).fill(0);
      playerWins = new Array(numPlayers).fill(0);
      playerTurn += 1;

      return `Hi all players of ${numPlayers}, please input the number of dice you wish to play with.`;
    }
  }
  //register number of dice
  if (numOfDice == 0) {
    if (isNaN(Number(input)) || input == 0) {
      return `please return a number more than 0`;
    } else {
      numOfDice = input;
      return `we are going to play with ${numOfDice} dice`;
    }
  }
  var variableDiceRolls = 0;
  if (!decisionTurn) {
    //roll the dice
    for (var i = 0; i < numOfDice; i++) {
      variableDiceRolls += diceRoll(6) * Math.pow(10, i);
    }
    playerNum[playerTurn] = variableDiceRolls;
    decisionTurn = true;
    return `player ${
      playerTurn + 1
    }, you have rolled ${variableDiceRolls}<br><br> Please choose the order in which you want these numbers to be in`;
  }
  //decision turn
  else {
    decisionTurn = false;
    //auto assign number
    if (isNaN(Number(input)) || input == 0) {
      var originalNumber = playerNum[playerTurn];

      output = `${originalNumber} shall be player ${
        playerTurn + 1
      }'s number as no order was given`;
    } else {
      //reorder number according to pattern
      var numberPatternArray = input.split("").map(Number);
      var playerNumToConvert = playerNum[playerTurn];
      var playerNumToString = playerNumToConvert.toString();
      var newlyOrderedNumber = 0;
      for (var i = 0; i < numberPatternArray.length; i++) {
        newlyOrderedNumber +=
          playerNumToString.charAt(numberPatternArray[i]) *
          Math.pow(10, numOfDice - i - 1);
      }
      playerNum[playerTurn] = newlyOrderedNumber;
      output = `player ${
        playerTurn + 1
      }, your chosen number is ${newlyOrderedNumber}`;
    }
  }

  //get winner, additional inputs if at last turn
  playerTurn += 1;
  if (playerTurn == numPlayers) {
    var winner = getIndexOfMaxNum(playerNum);
    if (reverseGame) {
      winner = getIndexOfMinNum(playerNum);
    }
    playerWins[winner] += 1;
    //reset player turn
    playerTurn = 0;
    output += `<br><br>player ${winner + 1} wins  with ${playerNum[winner]}!`;

    output += `<br><br>Overall scores:`;

    for (var i = 0; i < playerWins.length; i++) {
      output += `<br><br>player ${i + 1} has ${playerWins[i]}`;
    }
  }

  return output;
};
