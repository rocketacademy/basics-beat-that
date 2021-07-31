//dice roll function -- VALID
var diceRoll = function () {
  // generate random number between 1 and 6, representative of the faces of the dice.
  var setRandomNumRange = Math.floor(Math.random() * 6) + 1;
  return setRandomNumRange;
};

// when gamefunction = waiting for input of num of dice

// add new gamefunction before player 1 dice roll to ask user to input num of dice

// store input in numDice global variable
var numDice = 3;

// return all objects in player dice roll array for output message
var returnDiceRolls = function () {
  var diceRollOutput = "";
  playerdiceRollCounter = 0;
  while (playerdiceRollCounter < playerdiceRoll.length) {
    diceRollOutput = `${diceRollOutput} ... ${playerdiceRoll[playerdiceRollCounter]} `;
    playerdiceRollCounter += 1;
  }
  return diceRollOutput;
};

// Roll dice when submit button is clicked with empty input -- VALID
var userAutoRoll = function (input) {
  // when input box is left blank and submit button is clicked
  if (input == "") {
    var diceRollCounter = 0;
    while (diceRollCounter < numDice) {
      playerdiceRoll.push(diceRoll());
      diceRollCounter += 1;
    }
    console.log(playerdiceRoll);
    // set return message in output box
    return `Welcome ${playerName}.<br> You rolled:<br>${returnDiceRolls()}<br><br>Now, choose the order of the dice or<br>click the 'Submit' button to auto-generate the best possible combined value.`;
  }
};

// // function to concantate if user input value of order of dice -- VALID
// var concatenateMain = function (input) {
//   // convert input value to number data type
//   var orderSeq = Number(input);
//   // pull diceRoll array index as specified in input/order selected (minus one as array index starts at zero)
//   var firstDigit1 = playerdiceRoll.splice(orderSeq - 1, 1);
//   // assign remaining value in array as the subsequent digit
//   var secondDigit1 = playerdiceRoll.pop();
//   // assign and store the final number sequence for player 1
//   return Number(`${firstDigit1}${secondDigit1}`);
// };

// function to auto generate combined value -- VALID
var autoGenHigh = function (playerdiceRoll) {
  var combinedValue = 0;
  console.log(playerdiceRoll);
  if (currentGameMode == "regular") {
    playerdiceRoll.sort(function (a, b) {
      return b - a;
    });
    console.log(playerdiceRoll);
  }
  if (currentGameMode == "reverse") {
    playerdiceRoll.sort(function (a, b) {
      return a - b;
    });
    console.log(playerdiceRoll);
  }

  index = 0;
  while (index < playerdiceRoll.length) {
    var returnPlayerDice = playerdiceRoll[index],
      combinedValue = `${combinedValue}${returnPlayerDice}`;
    index += 1;
  }
  playerdiceRoll.splice(0, playerdiceRoll.length);
  // set combinedValue variable as number
  // var combinedValue = 0;
  // var largest = 0;
  // var index = 0;
  // // run loop to compare array and stop once its pulled largest number

  // while (playerdiceRoll.length > 0) {
  //   while (index < numDice) {
  //     if (playerdiceRoll[index] > largest) {
  //       largest = playerdiceRoll[index];
  //     }
  //     index += 1;
  //   }
  //   // remove the value from the array that has been assigned to the first digit
  //   var indexLargest = playerdiceRoll.indexOf(largest);
  //   combinedValue = `${combinedValue}${playerdiceRoll.splice(indexLargest, 1)}`;
  //   largest = 0;
  //   index = 0;
  // }
  // combinedValue = `${combinedValue}${playerdiceRoll.pop}`;
  // console.log(playerdiceRoll);
  // console.log(largest);
  // console.log(playerdiceRoll);
  // console.log(indexLargest);

  //   // return and assign the last element in array to the second digit
  //   var secondDigit = playerdiceRoll.pop();
  //   // arrange combined value according to highest element first in regular game mode
  //   if (currentGameMode == "regular") {
  //     combinedValue = `${firstDigit}${secondDigit}`;
  //   }
  //   // arrange combined value according to lowest element first in reverse game mode
  //   if (currentGameMode == "reverse") {
  //     combinedValue = `${secondDigit}${firstDigit}`;
  //   }

  return combinedValue;
};

// player 1 concatenate final value according to dice order selected -- VALID
var concatenatePlayer1 = function (input) {
  var messageCon1 = "";
  if (input == "") {
    player1 = Number(autoGenHigh(playerdiceRoll));
    messageCon1 = `Player 1, your number is ${player1}.<br><br>It is now Player 2's turn.<br>Click 'Submit' to start.`;
    // } else if (input == 1 || input == 2) {
    //   player1 = concatenateMain(input);
    //   messageCon1 = `Player 1, you chose Dice ${input} first.<br>Your number is ${player1}.<br><br>It is now Player 2's turn.<br>Click 'Submit' to start.`;
  } else if (input == "reverse") {
    currentGameMode = input;
    resetGame();
    messageCon1 = `Reverse gameplay initiated.<br>Win  by having the lowest dice number.<br><br>Click Submit to start game.`;
  } else if (input == "regular") {
    currentGameMode = input;
    resetGame();
    messageCon1 = `Regular gameplay initiated.<br>Win  by having the highest dice number.<br><br>Click Submit to start game.`;
  } else
    messageCon1 = `Please enter either 1 or 2 in input box. Or click Submit to autogenerate combined value`;
  player1score += player1;
  // set return message
  return messageCon1;
};
console.log(concatenatePlayer1);

// player 2 concatenate final value according to dice order selected -- VALID
var concatenatePlayer2 = function (input) {
  var messageCon2 = "";
  if (input == "") {
    player2 = Number(autoGenHigh(playerdiceRoll));
    if (currentGameMode == "regular") {
      messageCon2 = `${getWinMessage()}`;
    }
    messageCon2 = `${getWinMessageReverse()}`;
    // } else if (input == 1 || input == 2) {
    //   player2 = concatenateMain(input);
    //   if (currentGameMode == "regular") {
    //     messageCon2 = `${getWinMessage()}`;
    //   }
    //   messageCon2 = `${getWinMessageReverse()}`;
  } else if (input == "reverse") {
    currentGameMode = input;
    resetGame();
    messageCon2 = `Reverse gameplay initiated.<br>Win  by having the lowest dice number.<br><br>Click Submit to start game.`;
  } else if (input == "regular") {
    currentGameMode = input;
    resetGame();
    messageCon2 = `Regular gameplay initiated.<br>Win  by having the highest dice number.<br><br>Click Submit to start game.`;
  } else
    messageCon2 = `Please enter either 1 or 2 in input box. Or click Submit to autogenerate combined value`;

  player2score += player2;
  return messageCon2;
};
console.log(concatenatePlayer2);

var getLeaderboard = function () {
  if (player1score < player2score) {
    return `Leaderboard:<br>Player 2 Score: ${player2score}<br>Player 1 Score: ${player1score}`;
  }
  return `Leaderboard:<br>Player 1 Score: ${player1score}<br>Player 2 Score: ${player2score}`;
};

var getLeaderboardReverse = function () {
  if (player1score > player2score) {
    return `Leaderboard:<br>Player 2 Score: ${player2score}<br>Player 1 Score: ${player1score}`;
  }
  return `Leaderboard:<br>Player 1 Score: ${player1score}<br>Player 2 Score: ${player2score}`;
};

// compare the 2 numbers and decide who won -- VALID
var getWinMessage = function () {
  // if player 1 number was higher than player 2
  if (player1 > player2) {
    // winning message for player 1
    return `Player 1's number was ${player1}.<br>Player 2's number was ${player2}.<br>
    Congratulations Player 1, you won!<br><br>${getLeaderboard()}`;
  }
  if (player1 == player2) {
    return `Player 1's number was ${player1}.<br>Player 2's number was ${player2}.<br>
    It's a tie for this round!<br><br>${getLeaderboard()}`;
  }
  // winning message for player 2
  return `Player 1's number was ${player1}.<br>Player 2's number was ${player2}.<br>
    Congratulations Player 2, you won!<br><br>${getLeaderboard()}`;
};

// compare the 2 numbers and decide who won for reverse game mode -- VALID
var getWinMessageReverse = function () {
  // if player 1 number was lower than player 2
  if (player1 < player2) {
    // winning message for player 1
    return `Player 1's number was ${player1}.<br>Player 2's number was ${player2}.<br>
    Congratulations Player 1, you won!<br><br>${getLeaderboard()}`;
  }
  if (player1 == player2) {
    return `Player 1's number was ${player1}.<br>Player 2's number was ${player2}.<br>
    It's a tie for this round!<br><br>${getLeaderboard()}`;
  }
  // winning message for player 2
  return `Player 1's number was ${player1}.<br>Player 2's number was ${player2}.<br>
    Congratulations Player 2, you won!<br><br>${getLeaderboard()}`;
};

// main function -- VALID
var main = function (input) {
  console.log(currentGameMode);

  var myOutputValue = "";
  if (currentGameMode == "waiting for game mode") {
    myOutputValue = inputVal(input);
  } else if (currentGameMode == "regular") {
    myOutputValue = gamePlay(input);
  } else if (currentGameMode == "reverse") {
    myOutputValue = gamePlayReverse(input);
  }
  console.log(currentGameMode);

  return myOutputValue;
};

// function validate input
var inputVal = function (input) {
  if (input == "regular" || input == "") {
    currentGameMode = "regular";
    resetGame();
    messageInputVal = `Regular gameplay initiated.<br>Win  by having the higher dice number.<br><br>Click Submit to start game.`;
  } else if (input == "reverse") {
    currentGameMode = "reverse";
    resetGame();
    messageInputVal = `Reverse gameplay initiated.<br>Win  by having the lowest dice number.<br><br>Click Submit to start game.`;
  } else
    messageInputVal = `Please enter game mode or click Submit to begin game.`;
  return messageInputVal;
};

// game function for regular game mode
var gamePlay = function (input) {
  if (input == "reverse") {
    currentGameMode = "reverse";
    resetGame();
    return `Reverse gameplay initiated.<br>Win  by having the lowest dice number.<br><br>Click Submit to start game.`;
  }
  if (currentGameFunction == "player 1 diceroll") {
    currentGameFunction = "player 1 waiting for input on order of dice";
    playerName = "Player 1";
    return userAutoRoll(input);
  }

  if (currentGameFunction == "player 1 waiting for input on order of dice") {
    currentGameFunction = "player 2 diceroll";
    return `${concatenatePlayer1(input)}`;
  }

  if (currentGameFunction == "player 2 diceroll") {
    currentGameFunction = "player 2 waiting for input on order of dice";
    playerName = "Player 2";
    return userAutoRoll(input);
  }

  if (currentGameFunction == "player 2 waiting for input on order of dice") {
    currentGameFunction = "player 1 diceroll";
    return `${concatenatePlayer2(input)}`;
  }
};

// game function for reverse game mode
var gamePlayReverse = function (input) {
  console.log(currentGameMode);
  if (input == "regular") {
    currentGameMode = "regular";
    resetGame();
    myOutputValue = `Regular gameplay initiated.<br>Win  by having the higher dice number.<br><br>Click Submit to start game.`;
  }
  if (currentGameFunction == "player 1 diceroll") {
    currentGameFunction = "player 1 waiting for input on order of dice";
    playerName = "Player 1";
    return userAutoRoll(input);
  }
  console.log(playerdiceRoll);

  if (currentGameFunction == "player 1 waiting for input on order of dice") {
    currentGameFunction = "player 2 diceroll";
    return `${concatenatePlayer1(input)}`;
  }
  console.log(playerdiceRoll);

  if (currentGameFunction == "player 2 diceroll") {
    currentGameFunction = "player 2 waiting for input on order of dice";
    playerName = "Player 2";
    return userAutoRoll(input);
  }
  console.log(playerdiceRoll);

  if (currentGameFunction == "player 2 waiting for input on order of dice") {
    currentGameFunction = "player 1 diceroll";
    return `${concatenatePlayer2(input)}`;
  }
  console.log(playerdiceRoll);
};

// // only allow switching of game modes during game function player 2 waiting for input on order of dice
// var checkInput = function () {
//   if (
//     (currentGameMode == "regular" || currentGameMode == "reverse") &&
//     currentGameFunction == "player 1 diceroll"
//   ) {
//     if (input == "regular") {
//       currentGameMode = "regular";
//       return `Regular gameplay initiated.<br>Win  by having the highest dice number.<br><br>Click Submit to start game.`;
//     }
//     if (input == "reverse") {
//       currentGameMode = "reverse";
//       return `Reverse gameplay initiated.<br>Win  by having the lowest dice number.<br><br>Click Submit to start game.`;
//     }
//   } else {
//     return `Please enter dice order or click Submit to continue game play. You can only switch game modes after each round.`;
//   }
// };

// function to reset variables when new game mode is initialised
var resetGame = function () {
  player1 = 0;
  player2 = 0;
  player1score = 0;
  player2score = 0;
  player1Name = "";
  player2Name = "";
  currentGameFunction = "player 1 diceroll";
};

// all the global variables created to store values
var player1 = 0;
var player2 = 0;
var player1score = 0;
var player2score = 0;
var player1Name = "";
var player2Name = "";
var dice1 = 0;
var dice2 = 0;
var playerdiceRoll = [];
var numOfDice = 0;
var currentGameFunction = "player 1 diceroll";
var currentGameMode = "waiting for game mode";
var playerName = "";

// [
//   "waiting for player 1 username",
//   "waiting for player 2 username",
//   "waiting for number of dice to play",
//   "diceroll",
//   "waiting for input on order of dice",
// ];

// function for random dice
// global variable for 2 dices
// global variable for 2 player modes
//default mode is player 1
// after number is finalised, mode changes to player 2
// dice roll is auto upon submission
// input is for player to decide which dice to put in front
// convert input to number
// concantate 2 dice rolls together
// allow user to input which dice goes first
// store final concantated dice number
// compare the 2 stored dice numbers between each modes
// output message on who won.

// global variable for score
// add concantate values to each player score

// output leaderboard for each message for both players in decreasing order

// add new game mode for lowest combined number

// add function to auto generate combined number

// create variable for an array for each round's score

// output the array in descending order every output
