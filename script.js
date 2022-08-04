// Took me 45 mins to write the base. Extra 30 mins to 'perfect'ing useless stuffs. Proud moments ;)
// Add 40 more minutes for tinkering around JS and HTML!
// Add 40 more minutes.
// I think if I have more time I might be able to make one skeleton for all function instead of making 3 functions.

// CALCULATE
var CALCULATE_MODES = ['highest', 'lowest'];
var [HIGHEST_MODE, LOWEST_MODE] = CALCULATE_MODES;
var CALCULATE_BY = HIGHEST_MODE;
// GAMEMODES
var GAME_MODES = ['normal', 'variable', 'running'];
var [normalGM, variableGM, runningGM] = GAME_MODES;
var CURRENT_GAME_MODE = normalGM;
// GAME STATES
var [rollDice, computerDiceNumberGenerated, userPickNumberOrder, calculateResult] = ['rollDice', 'computerDiceNumberGenerated', 'userPickNumberOrder', 'calculateResult'];
var CURRENT_GAME_STATE = rollDice;
// GAME CONFIGS
var currentPlayerNum = 0;
var playerAmount = 2;
var diceAmount = 2;
var playerChoiceNumbers = [];
// NORMAL ONLY
var [firstDiceNum, secondDiceNum] = [];
// VARIABLES AND RUNNING ONLY
var dicesGenerated = [];


var main = function (userInput) {
  if (CURRENT_GAME_MODE === normalGM) return baseGameNormal(userInput);
  if (CURRENT_GAME_MODE === variableGM) return baseGameVariable(userInput);
  if (CURRENT_GAME_MODE === runningGM) return baseGameRunning(userInput);
};

// Variable Gamemode
const baseGameRunning = function (userInput) {
  let output;
  if (CURRENT_GAME_STATE === rollDice) {
    output = `Welcome. A bot will play for ${playerAmount} players and roll ${diceAmount} dices. Press submit to roll your dice.`;
    CURRENT_GAME_STATE = computerDiceNumberGenerated;
  } else if (CURRENT_GAME_STATE === computerDiceNumberGenerated) {
    currentPlayerNum += 1;
    for (let i = 0; i < diceAmount; i++) {
      dicesGenerated.push(generateDiceNumber(6));
    }
    output = generateAutomaticPick();
    if (currentPlayerNum === playerAmount) {
      CURRENT_GAME_STATE = calculateResult;
      return output;
    }
  }
  if (CURRENT_GAME_STATE === calculateResult) {
    output = generateLeaderboard();
    resetGame();
  }
  return output;
}

function generateAutomaticPick() {
  let output = generatePickDiceOrderMessage();
  let sortedDices = dicesGenerated.sort();
  if (CALCULATE_BY === HIGHEST_MODE) {
    sortedDices.reverse();
  }
  sortedDices = +sortedDices.join("");
  playerChoiceNumbers.push(sortedDices);
  output += `Computer picked ${sortedDices}. Press submit to go to next player!`
  dicesGenerated = [];
  return output;
};

// Variable Gamemode
const baseGameVariable = function (userInput) {
  let output;
  if (CURRENT_GAME_STATE === rollDice) {
    output = `Welcome. We have ${playerAmount} players and ${diceAmount} dice to be rolled. Press submit to roll your dice.`;
    CURRENT_GAME_STATE = computerDiceNumberGenerated;
  } else if (CURRENT_GAME_STATE === computerDiceNumberGenerated) {
    currentPlayerNum += 1;
    for (let i = 0; i < diceAmount; i++) {
      dicesGenerated.push(generateDiceNumber(6));
    }
    CURRENT_GAME_STATE = userPickNumberOrder;
    output = generatePickDiceOrderMessage();
  } else if (CURRENT_GAME_STATE === userPickNumberOrder) {
    output = sanitizeUserPick(userInput);
    if (currentPlayerNum === playerAmount) {
      CURRENT_GAME_STATE = calculateResult;
    }
  }
  if (CURRENT_GAME_STATE === calculateResult) {
    output = generateLeaderboard();
    resetGame();
  }
  return output;
}

const generatePickDiceOrderMessage = function () {
  let output = `Hello, Player #${currentPlayerNum}.<br />`
  for (let i = 0; i < dicesGenerated.length; i++) {
    output += `Your #${i + 1} dice generated number is ${dicesGenerated[i]}.<br />`;
  }
  if (CURRENT_GAME_MODE !== runningGM) {
    output += `Submit your choices by writing something like '2, 3, 1.'`;
  }
  return output;
}

function sanitizeUserPick(userInput) {
  // 1, 2, 3, 4, 5, 6, 7
  // Duplicates
  // 1, 2, 3, 4, 5, 5, 6
  // Incorrect input
  // 1, 2, 3, 4, 5, 6, p
  // Not same amount 
  // 1, 2, 3, 5, 5, p
  // Larger index
  // 1, 2, 3, 4, 5, 6, 10
  // Alphabets
  // a, d, l, c, o, p, s
  let output = generatePickDiceOrderMessage(dicesGenerated);
  let userPickArray = userInput.split(', ');
  if (userPickArray.length !== dicesGenerated.length) {
    output += "<br />Please make sure it have the same amount as the dice you inserted.";
    return output;
  };
  if (duplicateExists(userPickArray)) {
    output += "<br />Please make sure there are no duplicates."
    return output;
  };
  userPickArray = userPickArray.map((picks) => parseInt(picks));
  // adasaas
  if (userPickArray.some((num) => isNaN(num)) || Math.max(...userPickArray) > userPickArray.length + 1) {
    output += "<br />Please make sure you're submitting the correct input. It should be seperated by a comma and space. Example: '2, 3, 1'";
    return output
  }
  let userChoosenNumber = "";
  userPickArray.forEach((pickIndex) => {
    if (pickIndex > dicesGenerated.length - 1) {
      output += "<br />Your number submitted exceed the dices generated."
      return output;
    }
    userChoosenNumber += dicesGenerated[pickIndex - 1].toString();
  })
  playerChoiceNumbers.push(parseInt(userChoosenNumber));
  if (playerChoiceNumbers) {
    dicesGenerated = [];
    output = `Your number generated is: ${userChoosenNumber}. Be prepared for the next player!`
    CURRENT_GAME_STATE = computerDiceNumberGenerated;
  }
  return output;
}

function duplicateExists(arr) {
  return new Set(arr).size !== arr.length
}

// NORMAL GAMEMODE
const baseGameNormal = function (userInput) {
  playerAmount = 2;
  diceAmount = 2;
  let output;

  if (CURRENT_GAME_STATE === rollDice) {
    output = 'Welcome. Press submit to roll your dice.'
    CURRENT_GAME_STATE = computerDiceNumberGenerated;
  } else if (CURRENT_GAME_STATE === computerDiceNumberGenerated) {
    currentPlayerNum += 1
    firstDiceNum = generateDiceNumber(6).toString();
    secondDiceNum = generateDiceNumber(6).toString();

    output = generateNormalPickDiceOrderMessage();
    CURRENT_GAME_STATE = userPickNumberOrder
  } else if (CURRENT_GAME_STATE === userPickNumberOrder) {
    if (!['1', '2'].includes(userInput)) return "Please submit only 1 or 2.";

    let numberPicked = firstDiceNum + secondDiceNum;
    if (userInput === '2') {
      numberPicked = secondDiceNum + firstDiceNum;
    }
    playerChoiceNumbers.push(numberPicked);

    output = generateNumberPickedMessage();
    CURRENT_GAME_STATE = computerDiceNumberGenerated;

    if (currentPlayerNum === playerAmount) {
      CURRENT_GAME_STATE = calculateResult;
    }
  }
  if (CURRENT_GAME_STATE === calculateResult) {
    output = generateLeaderboard();
    resetGame();
  }
  return output;
}

const resetGame = function () {
  CURRENT_GAME_STATE = rollDice;
  currentPlayerNum = 0;
  playerChoiceNumbers = [];
};

// DICE GENERATOR
const generateDiceNumber = (diceNum) => {
  return ~~(Math.random() * diceNum) + 1;
};

// MESSAGE GENERATORS BELOW
const generateLeaderboard = function () {
  let output = '';
  let tieArray = [];
  // Borrowed from StackOverflow. (I was googling how to sort and getting the result by index then 3 mins afterwards Stackoverflow went down :joy:)
  const orderedIndex = Array.from(Array(playerChoiceNumbers.length).keys())
    .sort((a, b) => playerChoiceNumbers[a] > playerChoiceNumbers[b] ? -1 : (playerChoiceNumbers[b] > playerChoiceNumbers[a]) | 0);
  if (CALCULATE_BY === LOWEST_MODE) {
    orderedIndex.reverse();
  }
  const maxNum = playerChoiceNumbers[orderedIndex[0]];
  // forEach to generate leaderboard output. I wrote a function if tie.
  orderedIndex.forEach((index, val) => {
    output += `Player #${val + 1} had a score of ${playerChoiceNumbers[val]}<br />`
    if (playerChoiceNumbers[val] === maxNum && val !== orderedIndex[0]) {
      tieArray.push(val + 1);
    }
  });
  if (tieArray.length > 0) {
    // Sort here is just for nicer input.
    output += `<br />Players ${[...tieArray, orderedIndex[0] + 1].sort()} have won with a score of ${maxNum}! Congrats!`
  } else {
    output += `<br />Player #${orderedIndex[0] + 1} won with a score of ${maxNum}! Congrats!`;
  }
  output += "<br />Play again by pressing submit.";
  return output;
};

const generateNormalPickDiceOrderMessage = function () {
  return `Hello, Player #${currentPlayerNum}.<br />Your first number is: ${firstDiceNum}. Your second number is: ${secondDiceNum}.<br />Submit '1' to make your number starts with first number, or '2' to make your number starts with second number.`;
};

const generateNumberPickedMessage = function () {
  return `You picked ${numberPicked}. Now it's Player #${currentPlayerNum + 1}'s turn. Press submit to generate your dice.`;
};

// HELPER, letting me see the states.
const logStates = () => {
  console.log(`
  CURRENT_GAME_STATE = ${CURRENT_GAME_STATE}
  currentPlayerNum = ${currentPlayerNum}
  Dice1, Dice2 = ${firstDiceNum, secondDiceNum}
  playerChoiceNumbers = ${playerChoiceNumbers}
  `);
};
