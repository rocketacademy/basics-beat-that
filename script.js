//Global Variable
var userRound = 0;
var user = [];
var userWinRecord = [];
var currentGameMode = "";
var gameOn = false;
var playerDices = [];
var playerNumber = [];
// For normal Mode
var diceRolled = false;
// For AFS Mode
var accumulatedRound = 0;
var currentWinner = [];
// For Knockout Mode
var survivedPlayer = [];
var diceNeeded = 2;

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
  survivedPlayer.push(newUser);
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
      survivedPlayer.splice(i, 1);
      userWinRecord.splice(i, 1);
      let userList = genUserList();
      return `Good Bye.${deleteUser}👋👋<br> Have a nice day.<br><br>Player list and winning score are:<br>${userList}`;
    }
  }

  return `User name ${deleteUser} cannot be found. Who wants to quit the game?<br>${genUserList()}`;
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
  quitButton.style.visibility = "visible";
  if (currentGameMode == "Normal Mode") {
    userGameInput.style.visibility = "visible";
    chooseButton.style.visibility = "visible";
  }
  if (currentGameMode == "Reroll Mode") {
    rerollButton.style.visibility = "visible";
    nextPlayerButton.style.visibility = "visible";
  }
  return `${user.length} players is ready to play the game.<br>${currentGameMode} have been choose!<br>Player 1 ${user[0]}, please roll your dices!🎲🎲`;
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
  if (currentGameMode == "Knockout Mode") {
    return knockoutMode();
  }
};

//normal mode function
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

//AFS Mode function
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
    return `${user[user.length - 1]} roll ${dice1} and ${dice2}.🎲🎲<br> The ${
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
  } else if (dice1 >= dice2 && currentWinner.includes(userRound)) {
    currentNumber = Number(String(dice2) + String(dice1));
    playerNumber[userRound] += currentNumber;
    largeOrSmall = "smallest";
  } else if (dice1 < dice2 && currentWinner.includes(userRound)) {
    currentNumber = Number(String(dice1) + String(dice2));
    playerNumber[userRound] += currentNumber;
    largeOrSmall = "smallest";
  } else if (dice1 >= dice2) {
    currentNumber = Number(String(dice1) + String(dice2));
    playerNumber[userRound] += currentNumber;
  } else if (dice1 < dice2) {
    currentNumber = Number(String(dice2) + String(dice1));
    playerNumber[userRound] += currentNumber;
  }

  output.push(currentNumber, largeOrSmall);
  return output;
};

var AFSModeResult = function (dice1, dice2, currentNumber) {
  let scorelist = scorePointAndGenList(true);
  let result = `${dice1} and ${dice2} have rolled by ${
    user[user.length - 1]
  }.<br>The ${currentNumber[1]} combination number ${
    currentNumber[0]
  }have been used.🎲<br><br>5 Round of dices have been rolled!🎲🎲<br>Let's see the final result!😎<br><br>${genUserNumberList()}<br> Congrats${scorelist}🎉🎉🎉.You Win!<br>Now the score is in below:<br>${genUserList()}`;
  endGame();
  return result;
};

//reroll mode function
var rerollModeRoll = function () {
  let dice1 = genDice();
  let dice2 = genDice();
  playerDices = [dice1, dice2];
  playerDices.sort(function (a, b) {
    return b - a;
  });
  playerNumber.push(Number(String(playerDices[0]) + String(playerDices[1])));
  document.querySelector("#roll-button").disabled = true;
  document.querySelector("#reroll-button").disabled = false;
  document.querySelector("#next-player-button").disabled = false;
  return `You have roll ${dice1}🎲 and ${dice2}🎲.<br>Your current largest combination number is ${playerNumber[userRound]}.<br>Do you want to reroll the smaller number dice?<br>🚨🚨🚨🚨If you reroll your dice🚨🚨🚨🚨<br>🚨🚨🚨🚨the next number must use the smallest combination number.🚨🚨🚨🚨`;
};

var reroll = function () {
  let newDice = genDice();
  playerDices[1] = newDice;
  playerDices.sort(function (a, b) {
    return a - b;
  });
  playerNumber[userRound] = Number(
    String(playerDices[0]) + String(playerDices[1])
  );

  let output = `Your rerolled dice number is ${newDice}.🎲<br>The smallest combination number is ${
    playerNumber[userRound]
  }.<br>${user[userRound + 1]}, it's your turn to roll your dices.🙂`;

  document.querySelector("#roll-button").disabled = false;
  document.querySelector("#reroll-button").disabled = true;
  document.querySelector("#next-player-button").disabled = true;
  userRound += 1;
  if (userRound == user.length) {
    let phase = `Your rerolled dice number is ${newDice}.<br>The smallest combination number is ${
      playerNumber[userRound - 1]
    }.<br>`;
    return rerollResult(phase);
  }
  return output;
};

var nextPlayer = function () {
  userRound += 1;
  document.querySelector("#roll-button").disabled = false;
  document.querySelector("#reroll-button").disabled = true;
  document.querySelector("#next-player-button").disabled = true;

  if (userRound == user.length) {
    return rerollResult("");
  }

  return `Nice job, ${user[userRound - 1]}.<br>${
    user[userRound]
  }, it's your turn to roll the dices now.😉😉`;
};

var rerollResult = function (phase) {
  let winnerList = scorePointAndGenList(true);
  let output = `${phase}Here is the final result!🥳🥳🥳<br>${genUserNumberList()}<br>Congrats${winnerList}🎉🎉🎉🎉🎉🎉<br><br>Here is the score.<br>${genUserList()}`;
  endGame();

  return output;
};

//Knockout mode function
var knockoutMode = function () {
  let diceList = "";

  for (let i = 0; i < diceNeeded; i++) {
    playerDices.push(genDice());
    diceList += `${playerDices[i]},`;
  }

  let sorted = playerDices.toSorted(function (a, b) {
    return b - a;
  });

  playerNumber.push(sorted.join(""));

  let output = `${
    survivedPlayer[userRound]
  } have rolled ${diceList} nice!<br>Your largest combination number is ${
    playerNumber[userRound]
  }.🤓<br>Next player ${
    survivedPlayer[userRound + 1]
  }, you may roll your dices now.🎲💪
  `;
  userRound += 1;
  if (userRound == survivedPlayer.length) {
    let loser = losingUser();
    if (isNaN(loser)) {
      userRound = 0;
      return `${
        survivedPlayer[survivedPlayer.length - 1]
      } have rolled ${diceList} nice!<br>Your largest combination number is ${
        playerNumber[survivedPlayer.length - 1]
      }.🤓<br><br>Here is the list of this round.🤠🤠<br>${genUserNumberList()}<br>Becuase there are two more player have the lowest number.😮😮<br> This round will be play again!<br> ${
        survivedPlayer[0]
      }, now it's your turn to roll ${diceNeeded} dices!🎲`;
    }

    output = `${
      survivedPlayer[userRound - 1]
    } have rolled ${diceList} nice!<br>Your largest combination number is ${
      playerNumber[userRound - 1]
    }.🤓<br><br>Here is the list of this round.🤠🤠<br>${genUserNumberList()}<br>Sorry, ${
      survivedPlayer[loser]
    }. You are eliminated!😢😢<br>`;

    survivedPlayer.splice(loser, 1);
    diceNeeded += 1;
    if (survivedPlayer.length != 1) {
      output += `${survivedPlayer[0]}, now it's your turn to roll ${diceNeeded} dices!🎲`;
    } else {
      let winnerIndex = user.indexOf(survivedPlayer[0]);
      userWinRecord[winnerIndex] += 1;
      output += `Congrats! ${
        survivedPlayer[0]
      }🥳🥳🥳🥳. You survived and Win!<br>Here is the score:<br>${genUserList()}`;
      endGame();
    }

    playerNumber = [];
    userRound = 0;
  }
  playerDices = [];
  return output;
};

var losingUser = function () {
  let lowestNumber = Math.min(...playerNumber);
  let loserIndexArray = [];
  for (let i = 0; i < playerNumber.length; i++) {
    if (playerNumber[i] == lowestNumber) {
      loserIndexArray.push(i);
    }
  }
  let loserIndex = Number(loserIndexArray);

  return loserIndex;
};

var quit = function () {
  endGame();
  currentGameMode = "";
  return `Game quited. Please select your game mode again.😁😁`;
};

//general function
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
  for (let i = 0; i < survivedPlayer.length; i++) {
    userNumberList += `${survivedPlayer[i]} have number ${playerNumber[i]}<br>`;
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
  currentWinner = [];
  survivedPlayer = [...user];
  diceRolled = false;
  diceNeeded = 2;
  rollButton.style.visibility = "hidden";
  userGameInput.style.visibility = "hidden";
  chooseButton.style.visibility = "hidden";
  rerollButton.style.visibility = "hidden";
  nextPlayerButton.style.visibility = "hidden";
  quitButton.style.visibility = "hidden";
};

var findWinnerIndexList = function () {
  let highestNumber = Math.max(...playerNumber);
  currentWinner = [];
  for (let i = 0; i < playerNumber.length; i++) {
    if (playerNumber[i] == highestNumber) {
      currentWinner.push(i);
    }
  }
};

var scorePointAndGenList = function (score) {
  let winnerList = "";
  findWinnerIndexList();
  for (let i = 0; i < currentWinner.length; i++) {
    if (score) {
      userWinRecord[currentWinner[i]] += 1;
    }
    winnerList += `, ${user[currentWinner[i]]}`;
  }

  return winnerList;
};
