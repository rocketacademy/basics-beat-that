// Beat That Psudo Code
// 2 players is required to play the game
// player 1 will start by rolling 2 dice
// player 1 will select which dice will be his first numeral
// the other dice will automatically be the second numeral
// player 2 will continue by throwing his 2 dice
// player 2 will select which dice will be his first numeral
// the other dice will automatically be the second numeral
// compare the results of player 1 and player 2
// the player with the higher number will be the winner

// GLOBEL VARIABLES
// Scores and Leaderboard
var playerOneScore = 0;
var playerTwoScore = 0;

// player database
var playerOneRolls = ['', ''];
var playerOneNumber = '';
var playerTwoRolls = ['', ''];
var playerTwoNumber = '';

// gamemode, gameProcess and current player
var gameMode = 'default';
var autoGen = false;
var gameStart = false;
var gameProcess = 'dice roll';
var player = 'Player 1';

// HELPER FUNCTION
// function to help update leaderboard information
var updateLeaderboard = function () {
  if (playerOneScore > playerTwoScore) {
    document.getElementById("leader-board").innerHTML = `<b>🏁LEADERBOARD🏁</b>\n1: Player 1 - ${playerOneScore}\n2: Player 2 - ${playerTwoScore}`;
  } else {
    document.getElementById("leader-board").innerHTML = `<b>🏁LEADERBOARD🏁</b>\n1: Player 2 - ${playerTwoScore}\n2: Player 1 - ${playerOneScore}`;
  }
}

// HELPER FUNCTION
// function to update settings information
var updateSettingsInfo = function () {
  document.getElementById("settingInfo").innerHTML = `<b>GameMode:</b> ${gameMode}
    <br><b>Auto-Generate:</b> ${autoGen}
  `
}

// HELPER FUNCTION
// function to update player summary
var updatePlayerSummary = function () {
  document.getElementById("flex-item-one").innerHTML = `<b>Player 1!</b>\nDice #1: ${playerOneRolls[0]}\nDice #2: ${playerOneRolls[1]}\nCombined Number: ${playerOneNumber}`;
  document.getElementById("flex-item-two").innerHTML = `<b>Player 2!</b>\nDice #1: ${playerTwoRolls[0]}\nDice #2: ${playerTwoRolls[1]}\nCombined Number: ${playerTwoNumber}`;
}

// HELPER FUNCTION
// function to update system instructions
var updateSystemText = function (msg) {
  document.getElementById("myCustomText").innerHTML = msg;
}

// HELPER FUNCTION
// function to update button text
var updateButtonText = function (msg) {
  document.getElementById("submit-button").innerHTML = msg;
}

// HELPER FUNCTION
// function to return help details
var helpDetails = function () {
  return `settings - open up settings page to amend game rules
    <br>default - change game mode to default
    <br>reverse - change game mode to reverse
    <br>auto-generate - update game rule to switch auto-generate on/off
    <br>exit - exit and save game settings
    <br>reset - reset game and leaderboard
  `;
}

// HELPER FUNCTION
// function to roll a 6-sided dice and return a random number
var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  console.log(`this dice roll result: ${diceNumber}`)
  return diceNumber;
}

// HELPER FUNCTION
// function that helps to roll 2 dice and return the results in an array
var twoDiceRolls = function () {
  // defining an array for the dice roll results
  var diceResults = [];

  for (let i = 0; i < 2; i++) {
    // generating a random 6-sided dice result, and adding them to the results array
    var diceNumber = diceRoll();
    diceResults.push(diceNumber);
  }

  return diceResults;
}

// HELPER FUNCTION
// determining the 2 dice roll results for respective player
var gameProcessDiceRoll = function () {
  // generating an array with 2 dice roll results
  var diceRollResults = twoDiceRolls();
  gameStart = true;

  // assigning to respective player
  if (player == 'Player 1') {
    playerOneRolls = diceRollResults;
    updatePlayerSummary();
  } else if (player == 'Player 2') {
    playerTwoRolls = diceRollResults;
    updatePlayerSummary();
  }  
  console.log(`${player}'s dice rolls are ${diceRollResults}`)
  
  updateSystemText(`${player}! Please select which dice you want for your first numeral!`);
  updateButtonText(`Submit`);  
  gameProcess = 'first numeral'

  if (autoGen) {
    return gameProcessFirstNum();
  }
  
  // return system message for the results of the dice rolls
  return `You rolled the following: ${diceRollResults}`
}

// HELPER FUNCTION
// determine the combined number based on user choice of first numeral 
var gameProcessFirstNum = function (playerIndex) {
  // defining which player's dice rolls to use
  if (player == 'Player 1') {
    var arr = playerOneRolls;
  } else if (player == 'Player 2') {
    var arr = playerTwoRolls;
  }

  // combining the numbers
  if (!autoGen) {
    if (playerIndex == 1) {
      var firstNumeral = arr[0];
      var secondNumeral = arr[1];
      var playerNum =  (firstNumeral * 10) + secondNumeral;
    } else if (playerIndex == 2) {
      var firstNumeral = arr[1];
      var secondNumeral = arr[0];
      var playerNum =  (firstNumeral * 10) + secondNumeral;
    } else {
      // input validation
      return `You have entered in invalid input, please choose either the first or second dice as your first numeral (i.e. 1 or 2)`;
    }
    console.log(`${player}'s combined number is: ${playerNum}`)
  } else if (autoGen && gameMode == 'default') {
    if (arr[0] > arr[1]) {
      var playerNum = (arr[0] * 10) + arr[1];
    } else {
      var playerNum = (arr[1] * 10) + arr[0];
    }
    console.log(`System has automatically generate the best outcome of ${playerNum}`)
  } else if (autoGen && gameMode == 'reverse') {
    if (arr[0] < arr[1]) {
      var playerNum = (arr[0] * 10) + arr[1];
    } else {
      var playerNum = (arr[1] * 10) + arr[0];
    }
    console.log(`System has automatically generate the best outcome of ${playerNum}`)
  }

  
  // return the combined numbers to the respective players
  if (player == 'Player 1') {
    // reset game and change to player 2
    playerOneNumber = playerNum;
    playerOneScore += playerNum;
    player = 'Player 2';
    gameProcess = 'dice roll';

    // update player summary
    updatePlayerSummary();

    // update system instructions
    updateSystemText(`Player 2, please roll your dice.`);

    // update button text
    updateButtonText(`Roll dice!`);

    // return system message for the player's chosen value
    if (!autoGen) {
      return `Player 1 has selected dice #${playerIndex} as their first numberal!`
    } else {
      return `System has automatically generate the best outcome of ${playerOneNumber} for Player 1`
    }
  } else if (player == 'Player 2') {
    // reset game and change game mode to summary
    playerTwoNumber = playerNum;
    playerTwoScore += playerNum;
    player = 'Player 1';
    gameProcess = 'summary';

    // update player summary
    updatePlayerSummary();

    // update system instructions
    updateSystemText(`The game has ended. Click "Reset" to reset the game`);

    // update button
    updateButtonText(`Reset`)

    // return system message for the player's chosen value and the results of the game
    if (!autoGen) {
      return `Player 2 has selected dice #${playerIndex} as their first numberal!\n<b>${gameResults()}</b>`
    } else {
      return `System has automatically generate the best outcome of ${playerTwoNumber} for Player 2\n<b>${gameResults()}</b>`
    }
  }
}

// HELPER FUINCTION
// determine the winner 
var gameResults = function () {
  if (gameMode == 'default') {
    if (playerOneNumber > playerTwoNumber) {
      return `Player 1 Wins!`
    } else if (playerOneNumber < playerTwoNumber) {
      return  `Player 2 Wins!`
    } else {
      return `WOW! It's a Draw!`
    }
  } else if (gameMode == 'reverse') {
    if (playerOneNumber > playerTwoNumber) {
      return `Player 2 Wins!`
    } else if (playerOneNumber < playerTwoNumber) {
      return  `Player 1 Wins!`
    } else {
      return `WOW! It's a Draw!`
    }
  }
}

// HELPER FUNCTION
// reset the game
var gameProcessSummary = function () {
  playerOneRolls = ['',''];
  playerOneNumber = '';
  playerTwoRolls = ['',''];
  playerTwoNumber = '';
  
  gameStart = false;
  gameProcess = 'dice roll'
  player = 'Player 1'
  document.getElementById("flex-item-one").innerHTML = `<b>Player 1!</b>\nDice #1:\nDice #2:\nCombined Number:`
  document.getElementById("flex-item-two").innerHTML = `<b>Player 2!</b>\nDice #1:\nDice #2:\nCombined Number:`
  document.getElementById("myCustomText").innerHTML = `${player}, please roll your dice.`
  document.getElementById("submit-button").innerHTML = `Roll dice!`;

  return '';
}

// HELPER FUNCTION
// tabulate total scores and update leaderboard
var updateLeaderboard = function () {
  if (playerOneScore >= playerTwoScore) {
    document.getElementById("leader-board").innerHTML = `<b>🏁LEADERBOARD🏁</b>\n1:   Player 1 - ${playerOneScore}\n2:   Player 2 - ${playerTwoScore}`
  } else {
    document.getElementById("leader-board").innerHTML = `<b>🏁LEADERBOARD🏁</b>\n1:   Player 2 - ${playerTwoScore}\n2:   Player 1 - ${playerOneScore}`
  }
}

// HELPER FUNCTION
// change settings
var gameProcessSettings = function (lowerCaseInput) {
  if (lowerCaseInput == 'reverse') {
    gameMode = 'reverse'
    updateSettingsInfo();
    console.log({gameMode})
    console.log({autoGen})
    return 'GameMode changed to reverse'
  } else if (lowerCaseInput == 'default') {
    gameMode = 'default'
    updateSettingsInfo();
    console.log({gameMode})
    console.log({autoGen})
    return 'GameMode changed to default'
  } else if (lowerCaseInput == 'auto-generate' && !gameStart) {
    autoGen = !autoGen
    updateSettingsInfo();
    console.log({gameMode})
    console.log({autoGen})
    return `Game Settings auto generation set to ${autoGen}`
  } else if (lowerCaseInput == 'exit') {
    gameProcess = 'dice roll';
    updateSystemText(`${player}, please roll your dice.`);
    console.log({gameMode})
    console.log({autoGen})
    return `Settings saved and returned to game!`
  } else {
    return `Invalid settings, type "help" for more details,`
  }
}

updateSettingsInfo();
updateLeaderboard();
updatePlayerSummary();
updateSystemText(`${player}, please roll your dice.`);
updateButtonText(`Roll dice!`);

// MAIN FUNCTION
var main = function (input) {

  var myOutputValue = '';

  var lowerCaseInput = input.toLowerCase();
  
  // return help information
  if (lowerCaseInput == 'help') {
    return helpDetails();
  }

  // change settings
  if (lowerCaseInput == 'settings' && !gameStart) {
    gameProcess = 'settings';
    updateButtonText(`Submit`);
    updateSystemText(`You are currently in the Game Settings! Type "Exit" to return to game!`)
    return '';
  } else if (lowerCaseInput == 'settings' && gameStart) {
    return `Game has started, you cannot change game setting in a middle of a game!`;
  }
  
  // main game process
  if (gameProcess == 'dice roll') {
    myOutputValue = gameProcessDiceRoll();
  } else if  (gameProcess == 'first numeral' && !autoGen) {
    var playerIndex = input;
    myOutputValue = gameProcessFirstNum(playerIndex);
  } else if (gameProcess == 'summary') {
    myOutputValue = gameProcessSummary();
  } else if (gameProcess == 'settings') {
    myOutputValue = gameProcessSettings(lowerCaseInput)
  }

  updateLeaderboard();
  console.log(playerOneNumber)
  console.log(playerTwoNumber)

  return myOutputValue;
};
