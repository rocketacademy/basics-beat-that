let noOfPlayers, noOfDice;
let diceRolls = [];
let optimumNumbers = [];
let mode = "playerCount";

function main(input) {
  let outputValue = "";
  if (mode === "playerCount") {
    noOfPlayers = input;
    outputValue = `Chosen number of players: ${noOfPlayers}`;
    mode = "diceCount";
  } else if (mode === "diceCount") {
    noOfDice = input;
    outputValue = `Chosen number of dice: ${noOfDice}. Click "Submit" to roll!`;
    mode = "rollDice";
  } else if (mode === "rollDice") {
    diceRolls = generateDiceRolls(noOfPlayers, noOfDice);
    outputValue = rollsStatement(noOfPlayers, diceRolls);
    mode = "arrangeNumbers";
  } else if (mode === "arrangeNumbers") {
    optimumNumbers = arrangeNumbers(noOfPlayers, diceRolls);
    outputValue = optimumStatement(noOfPlayers, optimumNumbers);
    mode = "getWinner";
  } else if (mode === "getWinner") {
    outputValue = winStatement(optimumNumbers) + restartStatement();
    mode = "playerCount";
  }
  return outputValue;
}

function generateDiceRolls(players, dice) {
  let playerArray = [];
  for (let i = 0; i < players; i += 1) {
    let userArray = [];
    for (let j = 0; j < dice; j += 1) {
      userArray.push(diceRoll(6));
    }
    playerArray.push(userArray);
  }
  return playerArray;
}

function diceRoll(number) {
  return Math.ceil(Math.random() * number);
}

function arrangeNumbers(players, rolls) {
  let playerArray = [];
  for (let i = 0; i < players; i += 1) {
    playerArray.push(sortAndCombine(rolls[i]));
  }
  return playerArray;
}

function sortAndCombine(array) {
  array.sort(function (a, b) {
    return b - a;
  });
  let result = "";
  for (let i = 0; i < array.length; i += 1) {
    result += String(array[i]);
  }
  return result;
}

function rollsStatement(players, rolls) {
  let result = "The dice rolls are: <br><br>";
  for (let i = 0; i < players; i += 1) {
    result += `Player ${i + 1}: ${rolls[i]} <br>`;
  }
  result += `<br>Click "Submit" to generate optimum numbers!`;
  return result;
}

function optimumStatement(players, numbers) {
  let result = "The optimum number combinations are: <br><br>";
  for (let i = 0; i < players; i += 1) {
    result += `Player ${i + 1}: ${numbers[i]} <br>`;
  }
  result += `<br>Click "Submit" to see who wins!`;
  return result;
}

function winStatement(numbers) {
  return `The winner is ${getWinner(numbers)}!`;
}

function restartStatement() {
  return `<br><br> Input your new player count and click "Submit"!`;
}

function getWinner(numbers) {
  let sortedArray = [...numbers];
  sortedArray.sort(function (a, b) {
    return b - a;
  });
  let winningNumber = sortedArray[0];
  let winningIndex = numbers.indexOf(winningNumber);
  return `Player ${winningIndex + 1}`;
}
