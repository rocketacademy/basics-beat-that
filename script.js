// generate random dice number
function rollDice() {
  let randomNum = Math.floor(Math.random() * 6) + 1;
  return randomNum;
}
// arrange the order of dices as per user input.
function arrangeDice(userInput, firstDice, secondDice) {
  let arrangedResult;
  if (userInput == 'dice1') {
    diceOrder = 'dice1';
  }
  else {
    diceOrder = 'dice2';
  }
  if (diceOrder == 'dice1') {
    arrangedResult = `${firstDice}${secondDice}`;
  }
  else {
    arrangedResult = `${secondDice}${firstDice}`;
  }
  return Number(arrangedResult);
}
// function is used for finding winner with highest (normal) as well as lowest score modes.
function findWinner(playersScoreArray, mode) {
  if (mode == 'normal') {
    return Math.max.apply(null, playersScoreArray);
  }
  return Math.min.apply(null, playersScoreArray);
}
function autoGenNumber(rolledNumArray) {
  let array = rolledNumArray;
  let finalNumber = 0;
  let length = array.length;
  for (let i = 0; array.length >= 1; i++) {
    let max = Math.max.apply(null, array);
    finalNumber = finalNumber * 10 + max;
    rolledNumArray = array.splice(array.indexOf(max), 1);
  }
  return finalNumber;
}
function setMode(userInput) {
  let mode;
  if (userInput == 'manual') {
    mode = 'manual';
  }
  else if (userInput == 'auto') {
    mode = 'auto';
  }
  return mode;
}
function iterateNumOfPlayers(totalPlayers, mode, userInput) {
  let currentPlayer; let nextPlayer;
  let playersScoreArray = [];
  let playerDices = [];
  let resultedNumber;
  for (let i = 1; i <= totalPlayers; i++) {
    let dice1 = rollDice();
    let dice2 = rollDice();
    currentPlayer = 'player' + [i];
    if (i + 1 <= totalPlayers) {
      nextPlayer = 'player' + [i + 1];
    }
    if (mode == 'auto') {
      playerDices.push(dice1);
      playerDices.push(dice2);
      resultedNumber = autoGenNumber(playerDices);
    }
    else if (mode == 'manual') {
      console.log('choosing mode works');
      resultedNumber = arrangeDice(UserInput, dice1, dice2);
    }
    playersScoreArray.push(resultedNumber);
    playerDices = [];
  }
  console.log('players score array: ' + playersScoreArray);
  return playersScoreArray;
}
let firstRoll; let secondRoll;
let currentTurn = 'player1'; let changedTurn;
let diceOrder;
let roundsPlayed = 0;
let mode = 'set num of players';
let numOfPlayers = 0;
let playerDices = [];
let autoArrange = [];

var main = function (input) {
  // on submit dice is rolled
  let message;
  let resultedNumber;
  if (mode == 'set num of players') {
    numOfPlayers = input;
    mode = 'playing';
    return `Number of players set to ${numOfPlayers} <p> Player1 is the default first player. <p> press 'submit' to start playing`;
  }
  if (roundsPlayed < numOfPlayers) {
    if (mode == 'playing') {
      firstRoll = rollDice();
      secondRoll = rollDice();
      message = `Welcome ${currentTurn}. <p> You rolled ${firstRoll} for Dice 1 and ${secondRoll} for Dice 2.<p> type 'manual' or 'auto' to chose mode to generate number.`;
      mode = 'choosing';
      return message;
    }
    if (mode == 'choosing') {
      mode = setMode(input);
      if (mode == 'manual') {
        return `${mode} is set. <p> Choose the order of the dice (i.e dice1 or dice2).`;
      }
      return `${mode} is set. <p> press 'submit' to see auto chosen number.`;
    }
    if (mode == 'manual') {
      console.log('choosing mode works');
      resultedNumber = arrangeDice(input, firstRoll, secondRoll);
    }
    if (mode == 'auto') {
      autoArrange.push(firstRoll);
      autoArrange.push(secondRoll);
      resultedNumber = autoGenNumber(autoArrange);
      autoArrange = [];
    }
    playerDices.push(resultedNumber);
    message = `your score is ${playerDices[roundsPlayed]}.`;
    roundsPlayed += 1;
    if (roundsPlayed == numOfPlayers) {
      message += 'The game round is over.<p> Enter \'lowest\' to see result in lowest score mode <p> Or press submit to see the winner in normal mode(highest score mode)';
      return message;
    }
    currentTurn = 'player' + (roundsPlayed + 1);
    message += `next player is ${currentTurn}`;
    mode = 'playing';
    return message;
  }
  if (roundsPlayed == numOfPlayers) {
    let winningMode;
    if (input == '') {
      winningMode = 'normal';
    }
    else if (input == 'lowest') {
      winningMode = 'lowest';
    }
    // reset the rounds
    let result = findWinner(playerDices, winningMode);
    message = ` the winner of the round is : ${result}. <p> scores of all players: ${playerDices.sort().reverse()} <p> Game is Reset. Enter number of players to play again.`;
    roundsPlayed = 0;
    currentTurn = 'player1';
    mode = 'set num of players';
  }
  return message;
};
