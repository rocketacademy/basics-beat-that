//global variables
//gameTypes
const SELECTION_MODE = `selectionMode`;
const BASE = `base`;
const VARIABLE_DICE_NUM = `variableDiceNum`;
const VARIABLE_PLAYER_NUM = `variablePlayerNum`;

//modes in a gameType
const START_TURN = `startTurn`;
const SELECT_DICE_ORDER = `selectOrder`;
const END_GAME = `endGame`;
const WAITING_FOR_DICE_COUNT = `waitingForDiceCount`;

//reused Msgs
const SUBMIT_TO_CONTINUE_MSG = `Press Submit to continue.`;
const INVALID_INPUT_MSG = `This is an invalid input. Please enter a number that is 2 or greater.`;

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

//END of global variables
//functions

function initPlayersData(numberOfPlayers) {
  for (
    let playerCounter = 1;
    playerCounter <= numberOfPlayers;
    playerCounter += 1
  ) {
    playerProfiles.push({ id: playerCounter, diceResult: 0, score: 0 });
    playersDiceRolls.push(0);
  }
}

//text for selecting gameTypes
function inquireGameType() {
  return `Please select from the following game modes: <br> <br> 1: Default (Base Rules) <br> 2: Lowest Combined (Lowest combined dice number wins instead) <br> 3: Variable Number of Dice (Computer will automatically select dice order) <br> 4: Variable Number of Players (Rules are same as Default otherwise) <br> <br> Input 000 to toggle an option for the computer to automatically generate the optimal dice roll order`;
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
      return `This is an invalid input. Please select between 1 to 4.`;
  }
}

function validateInput(playerChoice) {
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

//dice order selection - manual + 2 dice
function selectDiceOrderForTwo(playersDiceRolls, playerChoice) {
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
  return myOutputValue;
}
