//dice roll function -- VALID
var diceRoll = function () {
  // generate random number between 1 and 6, representative of the faces of the dice.
  var setRandomNumRange = Math.floor(Math.random() * 6) + 1;
  return setRandomNumRange;
};

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

  return combinedValue;
};

// player 1 concatenate final value according to dice order selected -- VALID
var concatenatePlayer1 = function (input) {
  var messageCon1 = "";
  if (input == "") {
    player1 = Number(autoGenHigh(playerdiceRoll));
    player1score += Number(player1);
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
    messageCon1 = `Regular gameplay initiated.<br>Win  by having the highest dice number.<br><br>Enter the number of dice you wish to roll for this round.`;
  } else messageCon1 = `Please click Submit to autogenerate combined value`;
  // set return message
  return messageCon1;
};
console.log(concatenatePlayer1);

// player 2 concatenate final value according to dice order selected -- VALID
var concatenatePlayer2 = function (input) {
  var messageCon2 = "";
  if (input == "") {
    player2 = Number(autoGenHigh(playerdiceRoll));
    player2score += Number(player2);
    if (currentGameMode == "regular") {
      messageCon2 = `${getWinMessage()}`;
    }
    if (currentGameMode == "reverse") {
      messageCon2 = `${getWinMessageReverse()}`;
    }
  } else if (input == "reverse") {
    currentGameMode = input;
    resetGame();
    messageCon2 = `Reverse gameplay initiated.<br>Win  by having the lowest dice number.<br><br>Click Submit to start game.`;
  } else if (input == "regular") {
    currentGameMode = input;
    resetGame();
    messageCon2 = `Regular gameplay initiated.<br>Win  by having the highest dice number.<br><br>Enter the number of dice you wish to roll for this round.`;
  } else messageCon2 = `Please click Submit to autogenerate combined value`;
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
  console.log(player1);
  console.log(player2);
  // if player 1 number was higher than player 2
  if (player1 > player2) {
    // winning message for player 1
    return `Player 1's number was ${player1}.<br>Player 2's number was ${player2}.<br>
    Congratulations Player 1, you won!<br><br>${getLeaderboard()}<br><br>Now enter the number of dice you wish to roll to begin the next round.`;
  }
  if (player1 == player2) {
    return `Player 1's number was ${player1}.<br>Player 2's number was ${player2}.<br>
    It's a tie for this round!<br><br>${getLeaderboard()}<br><br>Now enter the number of dice you wish to roll to begin the next round.`;
  }
  // winning message for player 2
  else
    return `Player 1's number was ${player1}.<br>Player 2's number was ${player2}.<br>
    Congratulations Player 2, you won!<br><br>${getLeaderboard()}<br><br>Now enter the number of dice you wish to roll to begin the next round.`;
};

// compare the 2 numbers and decide who won for reverse game mode -- VALID
var getWinMessageReverse = function () {
  // if player 1 number was lower than player 2
  if (player1 < player2) {
    // winning message for player 1
    return `Player 1's number was ${player1}.<br>Player 2's number was ${player2}.<br>
    Congratulations Player 1, you won!<br><br>${getLeaderboard()}<br><br>Now enter the number of dice you wish to roll to begin the next round.`;
  }
  if (player1 == player2) {
    return `Player 1's number was ${player1}.<br>Player 2's number was ${player2}.<br>
    It's a tie for this round!<br><br>${getLeaderboard()}<br><br>Now enter the number of dice you wish to roll to begin the next round.`;
  }
  // winning message for player 2
  return `Player 1's number was ${player1}.<br>Player 2's number was ${player2}.<br>
    Congratulations Player 2, you won!<br><br>${getLeaderboard()}<br><br>Now enter the number of dice you wish to roll to begin the next round.`;
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
    messageInputVal = `Regular gameplay initiated.<br>Win  by having the higher dice number.<br><br>Enter the number of dice you wish to roll for this round.`;
  } else if (input == "reverse") {
    currentGameMode = "reverse";
    resetGame();
    messageInputVal = `Reverse gameplay initiated.<br>Win  by having the lowest dice number.<br><br>Click Submit to start game.`;
  } else
    messageInputVal = `Please enter game mode or click Submit to begin game.`;
  return messageInputVal;
};

var waitingNumDice = function (input) {
  if (isNaN(input) || input == "") {
    return `Please input a number to indicate number of dice you wish to play for this round.`;
  }
  currentGameFunction = "player 1 diceroll";
  numDice = Number(input);
  return `You have chosen to play ${input} number of dices.
  Click on SUBMIT to begin game.`;
};

// game function for regular game mode
var gamePlay = function (input) {
  console.log(currentGameFunction);
  if (input == "reverse") {
    currentGameMode = "reverse";
    resetGame();
    return `Reverse gameplay initiated.<br>Win  by having the lowest dice number.<br><br>Click Submit to start game.`;
  }

  if (currentGameFunction == "new round") {
    return waitingNumDice(input);
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
    currentGameFunction = "new round";
    return `${concatenatePlayer2(input)}`;
  }
};

// game function for reverse game mode
var gamePlayReverse = function (input) {
  console.log(currentGameMode);
  if (input == "regular") {
    currentGameMode = "regular";
    resetGame();
    myOutputValue = `Regular gameplay initiated.<br>Win  by having the higher dice number.<br><br>Enter the number of dice you wish to roll for this round`;
  }

  if (currentGameFunction == "new round") {
    return waitingNumDice(input);
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
    currentGameFunction = "new round";
    return `${concatenatePlayer2(input)}`;
  }
  console.log(playerdiceRoll);
};

// function to reset variables when new game mode is initialised
var resetGame = function () {
  player1 = 0;
  player2 = 0;
  player1score = 0;
  player2score = 0;
  player1Name = "";
  player2Name = "";
  currentGameFunction = "new round";
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
var currentGameFunction = "new round";
var currentGameMode = "waiting for game mode";
var playerName = "";
var numDice = 0;

// but i first need to change the logic of my game play

// roll and concantate n number of times for each player

// after last loop, then compare and get win message

// game function - new round, roll dice, result

// new round no change

// roll dice - loop (diceroll function + concantenate function when counter < numofplayers)

// result - show outcome /getwinmessage

// variable number of players

// add new game mode/function = waiting for number of players

// create global variable array  to store num of plauyers

// run each function through a loop if counter < num of players -1
// customise output by using player(index-1)
