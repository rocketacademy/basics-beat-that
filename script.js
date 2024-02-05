//global variables
//gameTypes
const SELECTION_MODE = `selectionMode`;
const BASE = `base`;
const VARIABLE_DICE_NUM = `variableDiceNum`;
const VARIABLE_PLAYER_NUM = `variablePlayerNum`;
const KNOCKOUT_MODE = `knockoutMode`;

//modes in a gameType
const START_TURN = `startTurn`;
const SELECT_DICE_ORDER = `selectOrder`;
const END_GAME = `endGame`;
const WAITING_FOR_DICE_COUNT = `waitingForDiceCount`;
const SELECTING_KO_PLAYERS = `selectKoPlayers`;
const CHECK_BRACKET = `checkBracket`;
const END_KO_GAME = `endKoGame`;

//brackets for knockout mode
const UPPER = `upper`;
const LOWER = `lower`;
let bracket = UPPER;

//reused Msgs
const SUBMIT_TO_CONTINUE_MSG = `Press Submit to continue.`;
const INVALID_INPUT_MSG = `This is an invalid input. Please enter a number that is 2 or greater.`;
const INVALID_KO_MSG = `This is an invalid input. Please enter a number that is 4 or greater.`;

//game settings
let mode = ``;
let gameType = ``;
let lowestCombinedMode = false;
let aiMode = false;
let currentPlayer = 1;
let numberOfPlayers;
let numberOfDice;
const playerProfiles = [];
const playersDiceRolls = [];

//knockout game settings
let koPlayerOne;
let koPlayerTwo;
let prevPlayer;
let endKoGame = false;
const knockoutBrackets = [[], [], []];

//END of global variables
//functions

//helper functions
function initPlayersData(numberOfPlayers) {
  for (
    let playerCounter = 1;
    playerCounter <= numberOfPlayers;
    playerCounter += 1
  ) {
    playerProfiles.push({
      id: playerCounter,
      diceResult: 0,
      score: 0,
    });
    playersDiceRolls.push(0);
  }
}

//text for selecting gameTypes
function inquireGameType() {
  return `Please select from the following game modes: <br> <br> 1: Default (Base Rules) <br> 2: Lowest Combined (Lowest combined dice number wins instead) <br> 3: Variable Number of Dice (Computer will automatically select dice order) <br> 4: Variable Number of Players (Rules are same as Default otherwise) <br> 5: Knockout Format (Multiple Players, computer will automatically select dice order) <br> <br> Input 000 to toggle an option for the computer to automatically generate the optimal dice roll order`;
}

function selectGameType(playerChoice) {
  switch (playerChoice) {
    case `1`:
      gameType = BASE;
      return `Initiating the base game! ${SUBMIT_TO_CONTINUE_MSG}`;
    case `2`:
      gameType = BASE;
      lowestCombinedMode = !lowestCombinedMode;
      return `Reminder that the smallest combined number wins! ${SUBMIT_TO_CONTINUE_MSG}`;
    case `3`:
      gameType = VARIABLE_DICE_NUM;
      aiMode = true;
      return `Input the number of dice the players would like to play with! ${SUBMIT_TO_CONTINUE_MSG}`;
    case `4`:
      gameType = VARIABLE_PLAYER_NUM;
      return `Input the number of players joining the game! ${SUBMIT_TO_CONTINUE_MSG}`;
    case `5`:
      gameType = KNOCKOUT_MODE;
      aiMode = true;
      numberOfPlayers = 0;
      return `Input the number of players entering the knockout tournament! ${SUBMIT_TO_CONTINUE_MSG}`;
    case `000`:
      aiMode = !aiMode;
      let aiMsg;
      gameType = ``;
      if (aiMode == true) {
        aiMsg = `AI mode is now ON. There is no need to select the dice order in this mode.`;
      } else {
        aiMsg = `AI mode is now OFF.`;
      }
      return `${aiMsg} ${SUBMIT_TO_CONTINUE_MSG}`;
    default:
      gameType = ``;
      return `This is an invalid input. Please select between 1 to 5.`;
  }
}

function validateInput(playerChoice) {
  if (gameType == KNOCKOUT_MODE && (isNaN(playerChoice) || playerChoice < 4)) {
    return true;
  }
  if (isNaN(playerChoice) || playerChoice < 2) {
    return true;
  }
}

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function randomizeDiceRolls(numOfDice) {
  const diceRolls = [];
  let diceRollMsg = ``;
  for (let diceCounter = 1; diceCounter <= numOfDice; diceCounter += 1) {
    const diceRoll = rollDice();
    diceRolls.push(diceRoll);
    diceRollMsg += `Dice ${diceCounter}: ${diceRoll} <br>`;
  }
  const playerIndex = currentPlayer - 1;
  playersDiceRolls[playerIndex] = diceRolls;
  if (aiMode) {
    return `Welcome Player ${currentPlayer}. You rolled: <br> <br> ${diceRollMsg} <br> ${SUBMIT_TO_CONTINUE_MSG}`;
  }
  return `Welcome Player ${currentPlayer}. You rolled: <br> <br> ${diceRollMsg} <br> Please choose the order of the dice by inputting 1 or 2.`;
}

function compareByDescendingDiceResult(a, b) {
  return b.diceResult - a.diceResult;
}

function compareByAscendingDiceResult(a, b) {
  return a.diceResult - b.diceResult;
}

//helper function for checking winner / after all players roll
function checkForWinner() {
  const checkResultsArray = playerProfiles.toSorted(
    compareByDescendingDiceResult
  );
  if (lowestCombinedMode) {
    checkResultsArray.sort(compareByAscendingDiceResult);
  }
  const indexOneResult = checkResultsArray[0].diceResult;
  const indexTwoResult = checkResultsArray[1].diceResult;
  let diceResultsMsg = ``;
  for (
    let playerCounter = 1;
    playerCounter <= numberOfPlayers;
    playerCounter += 1
  ) {
    let playerIndex = playerCounter - 1;
    diceResultsMsg += `Player ${playerCounter} chose ${playerProfiles[playerIndex].diceResult}. <br>`;
  }
  if (indexOneResult === indexTwoResult) {
    return `${diceResultsMsg} <br> It's a draw!`;
  }
  return `${diceResultsMsg} <br> Player ${checkResultsArray[0].id} wins!`;
}

//validate dice order input
function validateDiceOrderInput(playerChoice) {
  if (playerChoice != 1 && playerChoice != 2) {
    return true;
  }
}

//dice order selection - manual + 2 dice
function selectDiceOrderForTwo(playersDiceRolls, playerChoice) {
  if (validateDiceOrderInput(playerChoice)) {
    return `This is an invalid input. Please select 1 or 2.`;
  }
  const playerIndex = currentPlayer - 1;
  const diceRolls = playersDiceRolls[playerIndex];
  const diceOne = Number(diceRolls[0]);
  const diceTwo = Number(diceRolls[1]);
  let diceResult;
  if (playerChoice == 1) {
    diceResult = diceOne * 10 + diceTwo;
  } else if (playerChoice == 2) {
    diceResult = diceTwo * 10 + diceOne;
  }
  playerProfiles[playerIndex].diceResult = diceResult;
  playerProfiles[playerIndex].score += diceResult;
  const diceResultMsg = `Player ${currentPlayer}, you chose Dice ${playerChoice} first. <br> Your number is ${diceResult}. <br>`;
  currentPlayer = (currentPlayer % numberOfPlayers) + 1;
  if (currentPlayer === 1) {
    const endGame = checkForWinner();
    mode = END_GAME;
    return `${diceResultMsg} <br> ${endGame}`;
  }
  mode = START_TURN;
  return `${diceResultMsg} <br> It is now Player ${currentPlayer}'s turn.`;
}

//optimal dice choice if computer mode = true;
function automateDiceOrder(playersDiceRolls) {
  const playerIndex = currentPlayer - 1;
  const diceRolls = playersDiceRolls[playerIndex].toSorted();
  if (!lowestCombinedMode) {
    diceRolls.reverse();
  }
  const diceResultString = diceRolls.join("");
  const diceResult = Number(diceResultString);
  playerProfiles[playerIndex].diceResult = diceResult;
  playerProfiles[playerIndex].score += diceResult;
  const diceResultMsg = `Player ${currentPlayer}, your number is ${diceResult}. <br>`;
  currentPlayer = (currentPlayer % numberOfPlayers) + 1;
  if (currentPlayer === 1) {
    const endGame = checkForWinner();
    mode = END_GAME;
    return `${diceResultMsg} <br> ${endGame}`;
  }
  mode = START_TURN;
  return `${diceResultMsg} <br> It is now Player ${currentPlayer}'s turn.`;
}

//initializes setting for multi dice game
function initMultiDiceGame(playerChoice) {
  numberOfPlayers = 2;
  if (validateInput(playerChoice)) {
    return `${INVALID_INPUT_MSG}`;
  }
  numberOfDice = playerChoice;
  initPlayersData(numberOfPlayers);
  mode = START_TURN;
  return `The players have opted to roll ${numberOfDice} dices this round.`;
}

function compareByDescendingScore(a, b) {
  return b.score - a.score;
}

function compareByAscendingScore(a, b) {
  return a.score - b.score;
}

function displayLeaderBoard() {
  const leaderBoardArray = playerProfiles.toSorted(compareByAscendingScore);
  if (!lowestCombinedMode) {
    leaderBoardArray.sort(compareByDescendingScore);
  }
  const leadingPlayer = leaderBoardArray[0].id;
  let leadPlayerMsg = `Player ${leadingPlayer} is leading! 😎 <br> <br>`;
  if (leaderBoardArray[0].score == leaderBoardArray[1].score) {
    leadPlayerMsg = `No one is in the lead at the moment. Try your best! ✌ <br> <br>`;
  }
  let leaderBoardMsg = ``;
  for (
    let playerCounter = 0;
    playerCounter < playerProfiles.length;
    playerCounter += 1
  ) {
    leaderBoardMsg += `Player ${leaderBoardArray[playerCounter].id}: ${leaderBoardArray[playerCounter].score} <br>`;
  }
  if (gameType == VARIABLE_DICE_NUM) {
    mode = WAITING_FOR_DICE_COUNT;
    return `${leadPlayerMsg} Leaderboard <br>${leaderBoardMsg} <br> <br> Input the number of dice the players would like to play with next round. ${SUBMIT_TO_CONTINUE_MSG}`;
  }
  return `${leadPlayerMsg} Leaderboard <br>${leaderBoardMsg} <br> <br> Press Submit to start a new round.`;
}

//non KO gametypes logic
//play base, lowest combined or variable players
function playBaseGame(playerChoice) {
  if (mode === ``) {
    numberOfPlayers = 2;
    numberOfDice = 2;
    if (gameType == VARIABLE_PLAYER_NUM) {
      if (validateInput(playerChoice)) {
        return `${INVALID_INPUT_MSG}`;
      }
      numberOfPlayers = playerChoice;
    }
    initPlayersData(numberOfPlayers);
    mode = START_TURN;
  }
  if (mode === START_TURN) {
    const diceRollResult = randomizeDiceRolls(numberOfDice);
    mode = SELECT_DICE_ORDER;
    return `${diceRollResult}`;
  }
  if (mode === SELECT_DICE_ORDER) {
    if (aiMode) {
      const gameProgressMsg = automateDiceOrder(playersDiceRolls);
      return gameProgressMsg;
    }
    const gameProgressMsg = selectDiceOrderForTwo(
      playersDiceRolls,
      playerChoice
    );
    return gameProgressMsg;
  }
  if (mode === END_GAME) {
    mode = START_TURN;
    return displayLeaderBoard();
  }
}

function playMultiDiceGame(playerChoice) {
  if (mode == ``) {
    return initMultiDiceGame(playerChoice);
  }
  if (mode === WAITING_FOR_DICE_COUNT) {
    if (validateInput(playerChoice)) {
      return `${INVALID_INPUT_MSG}`;
    }
    numberOfDice = playerChoice;
    mode = START_TURN;
    return `The players have opted to roll ${numberOfDice} dices this round.`;
  }
  if (mode == START_TURN) {
    const diceRollResult = randomizeDiceRolls(numberOfDice);
    mode = SELECT_DICE_ORDER;
    return `${diceRollResult}`;
  }
  if (mode == SELECT_DICE_ORDER) {
    const gameProgressMsg = automateDiceOrder(playersDiceRolls);
    return gameProgressMsg;
  }
  if (mode === END_GAME) {
    mode = START_TURN;
    return displayLeaderBoard();
  }
}
//end non KO gametypes logic

//KO game helper functions//

//initializes each round of the KO game
function initKnockOutBracket(playerChoice) {
  if (validateInput(playerChoice)) {
    return `${INVALID_KO_MSG}`;
  }
  numberOfPlayers = playerChoice;
  initPlayersData(numberOfPlayers);
  const competitionArray = [];
  const lowerBracket = [];
  for (
    let playerCounter = 1;
    playerCounter <= numberOfPlayers;
    playerCounter += 1
  ) {
    competitionArray.push(playerCounter);
  }
  for (let i = 0; i < numberOfPlayers / 2; i += 1) {
    randomIndex = Math.random() * competitionArray.length;
    const lowerBracketPlayers = competitionArray.splice(randomIndex, 1);
    lowerBracket.push(lowerBracketPlayers[0]);
  }
  knockoutBrackets[0] = [...competitionArray];
  knockoutBrackets[1] = [...lowerBracket];
  return `${numberOfPlayers} players are taking part in this tournament 😎`;
}

//random selection of players for KO game
function selectPlayersforBracket() {
  if (knockoutBrackets[0].length == 1 && knockoutBrackets[1].length == 1) {
    koPlayerOne = knockoutBrackets[0][0];
    koPlayerTwo = knockoutBrackets[1][0];
    currentPlayer = koPlayerOne;
    return `Player ${koPlayerOne} and Player ${koPlayerTwo} are competing for the championship! ✌✌ <br> <br> Player ${koPlayerOne} will take the first turn.`;
  }
  let bracketIndex;
  if (bracket == UPPER) {
    bracketIndex = 0;
  } else {
    bracketIndex = 1;
  }
  const bracketPulls = knockoutBrackets[bracketIndex];
  const randomIndex = Math.random() * bracketPulls.length;
  const koPlayerOneArr = bracketPulls.splice(randomIndex, 1);
  koPlayerOne = koPlayerOneArr[0];
  const randomIndexTwo = Math.random() * bracketPulls.length;
  const koPlayerTwoArr = bracketPulls.splice(randomIndexTwo, 1);
  koPlayerTwo = koPlayerTwoArr[0];
  currentPlayer = koPlayerOne;
  return `Player ${koPlayerOne} and Player ${koPlayerTwo} are up this time! <br> <br> Player ${koPlayerOne} will take the first turn.`;
}

//automates dice order for both players in each match for KO game, can be refactored alongside function ${automateDiceOrder}
function automateKoDiceOrder(playersDiceRolls) {
  const playerIndex = currentPlayer - 1;
  const diceRolls = playersDiceRolls[playerIndex].toSorted();
  if (!lowestCombinedMode) {
    diceRolls.reverse();
  }
  const diceResultString = diceRolls.join("");
  const diceResult = Number(diceResultString);
  playerProfiles[playerIndex].diceResult = diceResult;
  playerProfiles[playerIndex].score += diceResult;
  const diceResultMsg = `Player ${currentPlayer}, your number is ${diceResult}. <br>`;
  if (currentPlayer === koPlayerTwo) {
    const endMatch = checkForKoWinner();
    return `${diceResultMsg} <br> ${endMatch}`;
  }
  prevPlayer = koPlayerOne;
  currentPlayer = koPlayerTwo;
  mode = START_TURN;
  return `${diceResultMsg} <br> It is now Player ${currentPlayer}'s turn.`;
}

//inputs players who won into active player arrays
function insertWinningPlayers() {
  let bracketIndex;
  if (bracket == UPPER) {
    bracketIndex = 0;
  } else {
    bracketIndex = 1;
  }
  const winningPlayers = knockoutBrackets[2].length;
  for (let i = 0; i < winningPlayers; i += 1) {
    const playerId = knockoutBrackets[2].shift();
    knockoutBrackets[bracketIndex].push(playerId);
  }
}

function displayRemainingPlayers() {
  const upBracketPlayers = [...knockoutBrackets[0]].toSorted();
  const lowBracketPlayerCount = [...knockoutBrackets[1]].toSorted();
  return `- Championship Contenders - <br> <br> Upper Bracket Players: ${upBracketPlayers} <br> Lower Bracket Players: ${lowBracketPlayerCount}`;
}

//change brackets and manages byes/free wins -> need ideas to refactor
function checkBracketStatus() {
  const upBracketCheck = knockoutBrackets[0].length;
  const lowBracketCheck = knockoutBrackets[1].length;
  const END_UP_BRACKET_MSG = `The upper bracket matches have ended. The lower bracket matches will now commence.`;
  const END_LOW_BRACKET_MSG = `The lower bracket matches have ended. The upper bracket matches will now commence.`;

  if (bracket === LOWER) {
    if (upBracketCheck == 1 && lowBracketCheck == 0) {
      insertWinningPlayers();
      const playerCountMsg = displayRemainingPlayers();
      bracket = UPPER;
      endKoGame = true;
      return `And up next... our final contestants! 😍 <br> <br> ${playerCountMsg}`;
    }
    if (upBracketCheck > 1 && lowBracketCheck == 1) {
      const byePlayer = knockoutBrackets[1][0];
      insertWinningPlayers();
      const playerCountMsg = displayRemainingPlayers();
      bracket = UPPER;
      return `Player ${byePlayer} has got a bye! ${END_LOW_BRACKET_MSG} <br> <br> ${playerCountMsg}`;
    }
    if (upBracketCheck > 1 && lowBracketCheck == 0) {
      insertWinningPlayers();
      const playerCountMsg = displayRemainingPlayers();
      bracket = UPPER;
      return `${END_LOW_BRACKET_MSG} <br> <br> ${playerCountMsg}`;
    }
    if (upBracketCheck == 1 && lowBracketCheck == 1) {
      const byePlayer = knockoutBrackets[1][0];
      insertWinningPlayers();
      const playerCountMsg = displayRemainingPlayers();
      return `Player ${byePlayer} has got a bye! As the upper bracket has finished, the next match will be decisive for the lower bracket. <br> <br> ${playerCountMsg}`;
    }
    return `Onto the next match in the lower bracket 😁`;
  }
  if (upBracketCheck == 1 && lowBracketCheck > 1) {
    const byePlayer = knockoutBrackets[0][0];
    insertWinningPlayers();
    const playerCountMsg = displayRemainingPlayers();
    bracket = LOWER;
    return `Player ${byePlayer} has got a bye! ${END_UP_BRACKET_MSG} <br> <br> ${playerCountMsg}`;
  }
  if (upBracketCheck == 0 && lowBracketCheck > 1) {
    insertWinningPlayers();
    const playerCountMsg = displayRemainingPlayers();
    bracket = LOWER;
    return `${END_UP_BRACKET_MSG} <br> <br> ${playerCountMsg}`;
  }
  return `Onto the next match in the upper bracket 😁`;
}

//checks for game results and pushes winner into holding area for winners
function checkForKoWinner() {
  const prevPlayerIndex = prevPlayer - 1;
  const playerIndex = currentPlayer - 1;
  const indexOneResult = playerProfiles[prevPlayerIndex].diceResult;
  const indexTwoResult = playerProfiles[playerIndex].diceResult;
  let diceResultsMsg = `Player ${prevPlayer} chose ${indexOneResult}. <br> Player ${currentPlayer} chose ${indexTwoResult}. `;
  if (indexOneResult === indexTwoResult) {
    currentPlayer = prevPlayer;
    mode = START_TURN;
    return `${diceResultsMsg} <br> It's a draw! Time to roll again. <br> <br> It is now Player ${prevPlayer}'s turn.`;
  }
  if (indexOneResult < indexTwoResult) {
    if (endKoGame) {
      mode = END_KO_GAME;
      return `${diceResultsMsg} <br> <br> Player ${prevPlayer} has been eliminated. <br> Player ${currentPlayer} is the final winner! 🏆🏆🏆`;
    }
    knockoutBrackets[2].push(currentPlayer);
    mode = CHECK_BRACKET;
    return `${diceResultsMsg} <br> <br> Player ${prevPlayer} has been eliminated. <br> Player ${currentPlayer} advances to the next round!`;
  }
  if (endKoGame) {
    mode = END_KO_GAME;
    return `${diceResultsMsg} <br> <br> Player ${currentPlayer} has been eliminated. <br> Player ${prevPlayer} is the final winner! 🏆🏆🏆`;
  }
  knockoutBrackets[2].push(prevPlayer);
  mode = CHECK_BRACKET;
  return `${diceResultsMsg} <br> <br> Player ${currentPlayer} has been eliminated. <br> Player ${prevPlayer} advances to the next round!`;
}

//resets all parameters of the KO game that can affect a new game
function resetKnockOutGame() {
  mode = ``;
  playerProfiles.splice(0);
  playersDiceRolls.splice(0);
  knockoutBrackets[0].splice(0);
  knockoutBrackets[1].splice(0);
  endKoGame = false;
  numberOfPlayers = 0;
  return `Game has been reset. To start a new game, input the number of players entering the knockout tournament! ${SUBMIT_TO_CONTINUE_MSG}`;
}

//end KO game helper functions

function playKnockoutGame(playerChoice) {
  numberOfDice = 2;
  if (mode == ``) {
    mode = SELECTING_KO_PLAYERS;
    return initKnockOutBracket(playerChoice);
  }

  if (mode == SELECTING_KO_PLAYERS) {
    if (numberOfPlayers != 0) {
      mode = START_TURN;
      return selectPlayersforBracket();
    } else {
      return initKnockOutBracket(playerChoice);
    }
  }

  if (mode == START_TURN) {
    const diceResult = randomizeDiceRolls(numberOfDice);
    mode = SELECT_DICE_ORDER;
    return `${diceResult}`;
  }
  if (mode == SELECT_DICE_ORDER) {
    const gameProgressMsg = automateKoDiceOrder(playersDiceRolls);
    return gameProgressMsg;
  }
  if (mode == CHECK_BRACKET) {
    const bracketMsg = checkBracketStatus();
    mode = SELECTING_KO_PLAYERS;
    return bracketMsg;
  }
  if (mode == END_KO_GAME) {
    return resetKnockOutGame();
  }
}

function main(input) {
  let myOutputValue = ``;
  if (gameType == ``) {
    gameType = SELECTION_MODE;
    return inquireGameType();
  }
  if (gameType == SELECTION_MODE) {
    return selectGameType(input);
  }
  if (gameType == BASE || gameType == VARIABLE_PLAYER_NUM) {
    const baseGame = playBaseGame(input);
    myOutputValue = baseGame;
  }
  if (gameType == VARIABLE_DICE_NUM) {
    const multiDiceGame = playMultiDiceGame(input);
    myOutputValue = multiDiceGame;
  }
  if (gameType == KNOCKOUT_MODE) {
    const knockoutGame = playKnockoutGame(input);
    myOutputValue = knockoutGame;
  }
  return myOutputValue;
}
