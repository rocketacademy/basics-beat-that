//Global Variable
var userRound = 0;
var user = [];
var userWinRecord = [];
var currentGameMode = "";
var gameOn = false;
var playerDices = [];
var playerNumber = [];
// For normal Mode & Reroll Mode
var diceRolled = false;
// For AFS Mode
var accumulatedRound = 0;
var currentWinner = 0;

var userAdded = function (newUser) {
  if (gameOn) {
    return "You cannot add player while playing games!<br> Press play to resume the game!";
  }
  let userList = "";
  //Prevent user name to be nothings
  if (newUser == "") {
    return `I would like to know your name.👉👈`;
  }
  //Prevent more than 8 player
  if (user.length == 8) {
    return `It's already 8 player in the game.😣😣<br>No more player is allowed, Sorry.😭😭`;
  }
  //Check if there are user name repeated and generate userlist.
  for (let i = 0; i < user.length; i++) {
    if (newUser == user[i]) {
      return `${user[i]} is already in the game.😉<br>New player may want to choose another name.`;
    }
    userList += `Player ${i + 1}: ${user[i]} have ${
      userWinRecord[i]
    } score<br>`;
  }

  user.push(newUser);
  userWinRecord.push(0);
  userList += `Player ${user.length}: ${newUser} have 0 score`;
  return `${newUser}, welcome to the game.🥳🥳🥳<br>Here is ${user.length} player now!<br><br>Player list and winning score are:<br>${userList}`;
};

var userDelete = function (deleteUser) {
  if (gameOn) {
    return `You cannot delete player while playing games!<br> Press play to resume the game!`;
  }

  //Check if there are user name repeated and delete user.
  for (let i = 0; i < user.length; i++) {
    if (deleteUser == user[i]) {
      user.splice(i, 1);
      userWinRecord.splice(i, 1);
      let userList = genUserList();
      return `Good Bye.${deleteUser}👋👋<br> Have a nice day.<br><br>Player list and winning score are:<br>${userList}`;
    }
  }

  return `User name ${deleteUser} cannot be found. Who wants to quit the game?`;
};

var gameModeSelect = function (gameMode) {
  if (gameOn) {
    return `You cannot choose game mode while playing games!<br> Press play to resume the game!`;
  }
  currentGameMode = gameMode;
  return `You choose ${currentGameMode}! Nice choice!<br>Let's start the game by pressing the play button!🤩🤩🤩`;
};

var main = function () {
  if (gameOn == true && diceRolled == false) {
    return `Please roll your dices😆😆 ${user[userRound]}`;
  }
  if (gameOn == true && diceRolled == true) {
    return chooseDice("");
  }
  if (user.length < 2) {
    return "Here is not enough player to start the game.🥲<br> Please find more friend to play the game with you.";
  }

  if (currentGameMode == "") {
    return "You have not choose the game mode yet.🤨<br>Please choose what game mode you want to play before starting the game.<br>The game mode rule is explained in the bottom of this website.😆😆";
  }

  gameOn = true;
  rollButton.style.visibility = "visible";
  if (currentGameMode == "Normal Mode") {
    userGameInput.style.visibility = "visible";
    chooseButton.style.visibility = "visible";
  }
  if (currentGameMode == "Reroll Mode") {
    rerollButton.style.visibility = "visible";
    nextPlayerButton.style.visibility = "visible";
  }
  return `${user.length} players is ready to play the game.<br>${currentGameMode} have been choose!<br>Player 1 ${user[0]} please roll your dices!🎲🎲`;
};

var rollDice = function () {
  if (currentGameMode == "Normal Mode") {
    return rollDiceNormal();
  }
  if (currentGameMode == "Accumulated Fair Score Mode") {
    return rollDiceAFSMode();
  }
  if (currentGameMode == "Reroll Mode") {
    return rerollModeRoll();
  }
};

var rollDiceNormal = function () {
  if (diceRolled) {
    return `You have rolled your dice ${user[userRound]}.<br>
    ${user[userRound]}, please choose which dice you want to place first.
    <br>Dice 1🎲: ${playerDices[0]} or Dice 2🎲: ${playerDices[1]}`;
  }
  let dice1 = genDice();
  let dice2 = genDice();
  playerDices = [dice1, dice2];
  diceRolled = true;
  return `${user[userRound]} have rolled <br>Dice 1🎲:  ${dice1} <br>Dice 2🎲:  ${dice2}<br>Which dice you want to place first? "Dice 1" or "Dice 2"?`;
};

var chooseDice = function (choice) {
  if (!diceRolled) {
    return `You haven't roll your dice ${user[userRound]}.😔😔`;
  }
  choice = choice.toLowerCase();
  if (choice != "dice 1" && choice != "dice 2") {
    return `Dice 1🎲: ${playerDices[0]}<br>Dice 2🎲: ${playerDices[1]}<br>Please choose which dice you want to place first.<br>"Dice 1" or "Dice 2"`;
  }
  if (choice == "dice 1") {
    playerNumber.push(String(playerDices[0]) + String(playerDices[1]));
  } else if (choice == "dice 2") {
    playerNumber.push(String(playerDices[1]) + String(playerDices[0]));
  }
  userRound += 1;
  diceRolled = false;
  if (userRound == user.length) {
    return normalModeResult(choice);
  }
  return `You choose ${choice} to place first , your number is ${
    playerNumber[userRound - 1]
  }.🥳🥳<br> Next player ${user[userRound]} please roll your dices!`;
};

var normalModeResult = function (dice) {
  let result = `You choose ${dice} to place first , your number is ${
    playerNumber[userRound - 1]
  }.<br> Everyone have already roll their dices and choose their number.🎲🎲🎲<br>Here is the list of the player and the number <br>${genUserNumberList()}<br> Congrats${scorePointAndGenList(
    true
  )}🎉🎉. You Wins! Now the score is in below:<br>${genUserList()}`;
  endGame();
  return result;
};

var rollDiceAFSMode = function () {
  let dice1 = genDice();
  let dice2 = genDice();
  let currentNumber = currentNumberAFS(dice1, dice2);

  if (userRound == user.length - 1 && accumulatedRound == 4) {
    return AFSModeResult(dice1, dice2, currentNumber);
  }
  if (userRound == user.length - 1 && accumulatedRound < 4) {
    userRound = 0;
    accumulatedRound += 1;
    winnerList = scorePointAndGenList(false);
    return `${
      user[user.length - 1]
    } have rolled ${dice1} and ${dice2}.🎲🎲<br> The ${
      currentNumber[1]
    } combination number is ${
      currentNumber[0]
    }.<br><br>This is the end the Round ${accumulatedRound}.😎<br>Let's see the result until now.<br><br>${genUserNumberList()}<br>It will be hard for you${winnerList}.<br>The next round will use the smallest combination for the current winner.<br>Good Luck.😏😏`;
  }

  let result = `${
    user[userRound]
  } have rolled ${dice1} and ${dice2}.🎲🎲<br> The ${
    currentNumber[1]
  } combination number is ${currentNumber[0]}.<br>Next player ${
    user[userRound + 1]
  } please roll your dices!🤩🤩`;
  userRound += 1;
  return result;
};

var currentNumberAFS = function (dice1, dice2) {
  let currentNumber = 0;
  let largeOrSmall = "largest";
  let output = [];
  if (dice1 >= dice2 && accumulatedRound == 0) {
    currentNumber = Number(String(dice1) + String(dice2));
    playerNumber.push(currentNumber);
  } else if (dice1 < dice2 && accumulatedRound == 0) {
    currentNumber = Number(String(dice2) + String(dice1));
    playerNumber.push(currentNumber);
  } else if (
    (dice1 >= dice2 && userRound != currentWinner) ||
    (dice1 <= dice2 && userRound == currentWinner)
  ) {
    currentNumber = Number(String(dice1) + String(dice2));
    playerNumber[userRound] += currentNumber;
  } else if (
    (dice1 < dice2 && userRound != currentWinner) ||
    (dice1 > dice2 && userRound == currentWinner)
  ) {
    currentNumber = Number(String(dice2) + String(dice1));
    playerNumber[userRound] += currentNumber;
  }
  if (userRound == currentNumber) {
    largeOrSmall = "smallest";
  }
  output.push(currentNumber, largeOrSmall);
  return output;
};

var AFSModeResult = function (dice1, dice2, currentNumber) {
  let result = `${dice1} and ${dice2} have rolled by ${
    user[user.length - 1]
  }.<br>The ${
    currentNumber[1]
  } combination number have been used.🎲<br><br>5 Round of dices have been rolled!🎲🎲<br>Let's see the final result!😎<br><br>${genUserNumberList()}<br> Congrats${scorePointAndGenList(
    true
  )}🎉🎉🎉.You Win!<br>Now the score is in below:<br>${genUserList()}`;
  endGame();
  return result;
};

var rerollModeRoll = function () {
  let dice1 = genDice();
  let dice2 = genDice();
  playerDices = [dice1, dice2];
  console.log(playerDices);
  playerDices.sort(function (a, b) {
    return b - a;
  });
  console.log(playerDices);
  playerNumber.push(Number(String(playerDices[1]) + String(playerDices[0])));
  return `You have roll ${dice1}🎲 and ${dice2}🎲.<br>Your current largest combination number is ${playerNumber[userRound]}.<br>Do you want to reroll the smaller number dice?<br>🚨🚨🚨🚨If you reroll your dice,<br> the next number must use the smallest combination number.🚨🚨🚨🚨<br>If don't, press the next player button.🫰🫰`;
};

var reroll = function () {
  if (diceRolled) {
    return `You have reroll your dice${
      user[userRound - 1]
    }.😕<br>I know you want to get a better number.<br>Please let the next player roll their dices.😫😫`;
  }

  diceRolled = true;
  userRound += 1;
  return;
};

var nextPlayer = function () {
  userRound += 1;
};

var genDice = function () {
  let randomNumber = Math.random() * 6;
  randomDice = Math.floor(randomNumber) + 1;
  return randomDice;
};

var genUserList = function () {
  let userList = "";
  for (let i = 0; i < user.length; i++) {
    userList += `Player ${i + 1}: ${user[i]} have ${
      userWinRecord[i]
    } score<br>`;
  }
  return userList;
};

var genUserNumberList = function () {
  let userNumberList = "";
  for (let i = 0; i < user.length; i++) {
    userNumberList += `Player ${i + 1}: ${user[i]} have number ${
      playerNumber[i]
    }<br>`;
  }
  return userNumberList;
};

var endGame = function () {
  userRound = 0;
  playerDices = [];
  playerNumber = [];
  gameOn = false;
  accumulatedRound = 0;
  accumulatedNumber = [];
  rollButton.style.visibility = "hidden";
  userGameInput.style.visibility = "hidden";
  chooseButton.style.visibility = "hidden";
  rerollButton.style.visibility = "hidden";
  nextPlayerButton.style.visibility = "hidden";
};

var findWinnerIndexList = function () {
  let sortedPlayerNumber = playerNumber.toSorted(function (a, b) {
    return b - a;
  });
  let winnerNumber = sortedPlayerNumber[0];
  let winnerIndexList = [];
  for (let i = 0; i < user.length; i++) {
    if (winnerNumber == playerNumber[i]) {
      winnerIndexList.push(i);
    }
  }
  return winnerIndexList;
};

var scorePointAndGenList = function (score) {
  let winnerIndexList = findWinnerIndexList();
  let winnerList = "";

  for (let i = 0; i < winnerIndexList.length; i++) {
    if (score) {
      userWinRecord[winnerIndexList[i]] += 1;
    }
    winnerList += `, ${user[winnerIndexList[i]]}`;
  }

  return winnerList;
};
