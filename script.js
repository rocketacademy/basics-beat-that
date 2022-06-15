var gameMode = "match select";
var prevGameMode = "";

var matchSelect = "Normal";
var lowOrHigh = "Highest";
var numDices = 2;
var maxPlayers = 2; //number of players

var playerTurn = 0; //checks whose turn is it

var gameRound = 1;
var roundScoreBoard = []; //gather the
var totalScoreBoard = []; //

var leaderBoard = [];
var leaderBoardSequence = [];

var newRound = false;

var reset = function () {
  gameMode = "match select";

  matchSelect = "Normal";
  lowOrHigh = "Highest";
  numDices = 2;
  maxPlayers = 2; //number of players

  playerTurn = 0; //checks whose turn is it

  gameRound = 1;
  roundScoreBoard = []; //gather the
  totalScoreBoard = []; //

  leaderBoard = [];
  leaderBoardSequence = [];

  newRound = false;
};

//create Random dice number
var generateRandomNum = function () {
  return Math.ceil(Math.random() * 6);
};

var generateCoinToss = function () {
  return Math.floor(Math.random() * 2);
};

//sorts the user dice roll from highest to lowest
var highestNum = function (numOrder) {
  return numOrder.sort().reverse();
};

//sorts the user dice roll from lowest to highest
var lowestNum = function (numOrder) {
  return numOrder.sort();
};

var numToDice = function (num) {
  if (num == 1) return "⚀";
  else if (num == 2) return "⚁";
  else if (num == 3) return "⚂";
  else if (num == 4) return "⚃";
  else if (num == 5) return "⚄";
  else return "⚅";
};

var getPlayerSequence = function () {
  for (let i = 0; i < totalScoreBoard.length; i++)
    leaderBoardSequence[i] = i + 1;
};

var getHighLeaderboards = function () {
  leaderBoard = totalScoreBoard;
  getPlayerSequence();
  for (let i = 0; i < leaderBoard.length; i++) {
    for (let j = 0; j < leaderBoard.length - i - 1; j++) {
      if (leaderBoard[j] < leaderBoard[j + 1]) {
        var temp = leaderBoard[j + 1];
        var tempSeq = leaderBoardSequence[j + 1];

        leaderBoard[j + 1] = leaderBoard[j];
        leaderBoardSequence[j + 1] = leaderBoardSequence[j];

        leaderBoard[j] = temp;
        leaderBoardSequence[j] = tempSeq;
      }
    }
  }
};

var getLowLeaderboards = function () {
  leaderBoard = totalScoreBoard;
  getPlayerSequence();
  for (let i = 0; i < leaderBoard.length; i++) {
    for (let j = 0; j < leaderBoard.length - i - 1; j++) {
      if (leaderBoard[j] > leaderBoard[j + 1]) {
        var temp = leaderBoard[j + 1];
        var tempSeq = leaderBoardSequence[j + 1];

        leaderBoard[j + 1] = leaderBoard[j];
        leaderBoardSequence[j + 1] = leaderBoardSequence[j];

        leaderBoard[j] = temp;
        leaderBoardSequence[j] = tempSeq;
      }
    }
  }
};

//display End of Round game stats
var normalGameStats = function () {
  if (lowOrHigh == "Highest") getHighLeaderboards();
  else getLowLeaderboards();
  var gameStatString = `${matchSelect} Game Stats (${lowOrHigh}): <br>`;
  for (let player = 0; player < leaderBoard.length; player++) {
    if (player == 0)
      gameStatString += `<b>Player ${leaderBoardSequence[player]}: ${leaderBoard[player]}</b><br>`;
    else
      gameStatString += `Player ${leaderBoardSequence[player]}: ${leaderBoard[player]}<br>`;
  }
  return gameStatString;
};

var configMatchSelect = function (userInput) {
  if (!(userInput == 1 || userInput == 2))
    return `<b>Incorrect input</b> <br><br>
    Select your <i>game mode</i>: <br />
      (1) Normal Match <br />
      (2) Knockout Match`;
  else {
    if (userInput == 1) matchSelect = "Normal";
    else matchSelect = "Knockout";

    gameMode = "player select";
    return `<b>Game Mode:</b> ${matchSelect} <br><br> Now select the <i>number of players</i> (greater than 1): `;
  }
};

var configPlayerSelect = function (userInput) {
  var checkNum = Number(userInput);
  if (Number.isInteger(checkNum)) {
    if (checkNum < 2)
      return `<b>Player Select: </b><br> Enter a number that is greater than 1`;
    gameMode = "dice select";
    maxPlayers = checkNum;
    return `<b>Game Mode:</b> ${matchSelect} <br>
    <b>No. of Players: </b> ${checkNum} <br><br> Now select the <i>number of dice</i> to roll (greater than 1): `;
  } else
    return "<b>The input is not a number.</b> <br><br> <b>Players Select: </b><br> Please enter a number";
};

var configDiceSelect = function (userInput) {
  var checkNum = Number(userInput);
  if (Number.isInteger(checkNum)) {
    if (checkNum < 1)
      return `<b>Dice Select: </b><br> Enter a number that is greater than 0`;
    gameMode = "low or high";
    numDices = checkNum;
    return `<b>Game Mode:</b> ${matchSelect} <br>
    <b>No. of Players: </b> ${maxPlayers} <br>
    <b>No. of Dice/s: </b> ${checkNum} <br><br> Now select your <i>match mode</i>: <br/>
      (1) Highest number wins<br/>
      (2) Lowest number wins`;
  } else
    return "<b>The input is not a number.</b> <br><br> <b>Dice Select: </b><br> Please enter a number";
};

var configLowOrHigh = function (userInput) {
  if (!(userInput == 1 || userInput == 2))
    return `<b>Incorrect input</b> <br><br>
    Select your <i>match mode</i>: <br/>
      (1) Highest number wins<br/>
      (2) Lowest number wins`;
  else {
    if (userInput == 1) lowOrHigh = "Highest";
    else lowOrHigh = "Lowest";

    gameMode = "game proper";
    return `<b>Game Mode:</b> ${matchSelect} <br>
    <b>No. of Players: </b> ${maxPlayers} <br>
    <b>No. of Dice/s: </b> ${numDices} <br>
    <b>Match Mode: </b> ${lowOrHigh} <br><br> Click the submit button to start the game: `;
  }
};

// Game Proper
var gameProper = function () {
  var userNumberStore = []; //random number generated | temporary storage
  for (let num = 0; num < numDices; num++)
    userNumberStore.push(generateRandomNum()); //generated number

  var numString = `You rolled: `; //displayed numbers
  for (let userNum = 0; userNum < userNumberStore.length; userNum++) {
    numString += `${numToDice(userNumberStore[userNum])} - ${
      userNumberStore[userNum]
    } | `;
  }

  var orderednum = [];
  var orderedNumString = `The autogenerated ${lowOrHigh} Number: `;
  if (lowOrHigh == "Highest") orderednum = highestNum(userNumberStore);
  else orderednum = lowestNum(userNumberStore);

  var intUserNum = 0; //Number of the user
  for (let genNum = 0; genNum < orderednum.length; genNum++) {
    if (intUserNum == 0) intUserNum = Number(orderednum[genNum]);
    else intUserNum = intUserNum * 10 + Number(orderednum[genNum]);
  }
  orderedNumString += intUserNum;

  if (matchSelect == "Normal")
    return normalGame(numString, orderedNumString, intUserNum);
  else return knockoutGame(numString, orderedNumString, intUserNum);
};

var normalGame = function (numString, orderedNumString, intUserNum) {
  if (playerTurn == maxPlayers) {
    playerTurn = 0;
    gameRound += 1;

    if (totalScoreBoard.length <= 0) {
      for (let i = 0; i < roundScoreBoard.length; i++)
        totalScoreBoard[i] = roundScoreBoard[i];
    } else {
      for (let i = 0; i < roundScoreBoard.length; i++) {
        totalScoreBoard[i] += roundScoreBoard[i];
        console.log(`Player ${i}`, totalScoreBoard[i]);
      }
    }
    return `- End of Round ${
      gameRound - 1
    } - <br> ${normalGameStats()} <br><br> Click submit to continue the game`;
  } else {
    roundScoreBoard[playerTurn] = intUserNum;
    playerTurn += 1; //increase player

    return `<b>Round ${gameRound}</b> <br> Welcome Player ${playerTurn}!<br> ${numString} <br> ${orderedNumString}. <br><br> Click submit for next player turn.`;
  }
};

var highKnockout = function () {
  if (roundScoreBoard[0] > roundScoreBoard[1]) {
    leaderBoardSequence.pop();
    return `<b>Player ${leaderBoardSequence[0]} wins!</b>`;
  } else if (roundScoreBoard[0] < roundScoreBoard[1]) {
    leaderBoardSequence.shift();
    return `<b>Player ${leaderBoardSequence[0]} wins!</b>`;
  } else {
    var coinTossWinner = leaderBoardSequence[generateCoinToss()];
    var coinTossString = `<b>It is a DRAW!</b> <br> 
      Commenting coin toss (heads) Player ${leaderBoardSequence[0]} (tails) Player ${leaderBoardSequence[1]} <br>
      Coin Toss Winner: <b>Player ${coinTossWinner}</b>`;
    if (leaderBoardSequence[0] == coinTossWinner) leaderBoardSequence.pop();
    else leaderBoardSequence.shift();
    return coinTossString;
  }
};

var lowKnockout = function () {
  if (roundScoreBoard[0] < roundScoreBoard[1]) {
    leaderBoardSequence.pop();
    return `<b>Player ${leaderBoardSequence[0]} wins!</b>`;
  } else if (roundScoreBoard[0] > roundScoreBoard[1]) {
    leaderBoardSequence.shift();
    return `<b>Player ${leaderBoardSequence[0]} wins!</b>`;
  } else {
    var coinTossWinner = leaderBoardSequence[generateCoinToss()];
    var coinTossString = `<b>It is a DRAW!</b> <br> 
      Commenting coin toss (heads) Player ${leaderBoardSequence[0]} (tails) Player ${leaderBoardSequence[1]} <br>
      Coin Toss Winner: <b>Player ${coinTossWinner}</b>`;
    if (leaderBoardSequence[0] == coinTossWinner) leaderBoardSequence.pop();
    else leaderBoardSequence.shift();
    return coinTossString;
  }
};

var knockoutGame = function (numString, orderedNumString, intUserNum) {
  if (roundScoreBoard.length == 2) {
    var winString = "";
    var battleString = `<b>- Elimination: Match ${gameRound} </b>- <br>
    Player ${leaderBoardSequence[0]} vs Player ${leaderBoardSequence[1]} <br><br>
    Player ${leaderBoardSequence[0]}: ${roundScoreBoard[0]} <br>
    Player ${leaderBoardSequence[1]}: ${roundScoreBoard[1]} <br><br>`;

    if (lowOrHigh == "Highest") winString = highKnockout();
    else winString = lowKnockout();

    roundScoreBoard = [];
    gameRound += 1;
    newRound = true;
    return battleString + winString;
  } else if (playerTurn == maxPlayers) {
    var winString = `<b>Knockout Champion</b> <br>
    Congratulations Player ${leaderBoardSequence[0]} <br><br>
    The game will now reset.`;
    reset();
    return winString;
  } else {
    var currPlayer = playerTurn;
    if (!newRound) {
      playerTurn += 1; //increase player
      leaderBoardSequence.push(playerTurn);
      currPlayer = playerTurn;
    } else {
      currPlayer = leaderBoardSequence[0];
      newRound = false;
    }
    roundScoreBoard.push(intUserNum);
    if (roundScoreBoard.length == 2) {
      return `<b>Knockout: Match ${gameRound}</b> <br>Player ${currPlayer} Ready!<br> ${numString} <br> ${orderedNumString}. <br><br> Click submit for player elimination.`;
    } else
      return `<b>Knockout: Match ${gameRound}</b> <br>Player ${currPlayer} Ready!<br> ${numString} <br> ${orderedNumString}. <br><br> Click submit for next player turn.`;
  }
};

var gameResetPermission = function (userInput) {
  var yOrN = userInput.toLowerCase();
  console.log(yOrN);
  if (yOrN == "y") {
    reset();
    return `Select your gamemode: <br/>
        (1) Normal Match <br/>
        (2) Knockout Match`;
  } else if (yOrN == "n") {
    gameMode = prevGameMode;
    return "<b>Game reset aborted!</b> <br><br> Click the submit button to continue.";
  } else return `<b>Game Reset</b> <br> Incorrect input, type y/n to continue`;
};

var main = function (input) {
  if (input == "reset") {
    prevGameMode = gameMode;
    gameMode = "reset";
    return "<b>Are you sure you want to reset?</b> (y/n) <br> All records will reset and will go back to match selection.";
  } else if (gameMode == "reset") return gameResetPermission(input);
  else if (gameMode == "match select") return configMatchSelect(input);
  else if (gameMode == "player select") return configPlayerSelect(input);
  else if (gameMode == "dice select") return configDiceSelect(input);
  else if (gameMode == "low or high") return configLowOrHigh(input);
  else if (gameMode == "game proper") return gameProper();
};
