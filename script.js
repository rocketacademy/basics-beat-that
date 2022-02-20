// Version 2 - (Mon - Thu: 2h - 3h)
/*
Features:
- Player input number of dice, number of player and then select game mode
- Press start button to display the player and the player's optimal combination
- The highest / Lowest combination wins
*/
const diceInput = document.querySelector("#dice-number");
const playerInput = document.querySelector("#player-number");
const gameModeInput = document.querySelector("#game-mode");
const submitBtn = document.querySelector("#submit-button");
const outputDiv = document.querySelector("#output-div");
const resetBtn = document.querySelector("#reset-button");
resetBtn.style.display = "none";

let gameRecordArr = [];
let playerCounter = 1;
let diceRollMsg, winner, winnerMsg;
let displayMsg = "";
let numsArr = "";
let gameBoard;

// Toggle Buttons
function toggleBtn() {
  if (resetBtn.style.display == "none") {
    submitBtn.style.display = "none";
    resetBtn.style.display = "block";
  } else {
    submitBtn.style.display = "block";
    resetBtn.style.display = "none";
  }
}

// Add Button Event Listener
submitBtn.addEventListener("click", function () {
  let result = main();
  submitBtn.disable = true;
  outputDiv.innerHTML = result;
});

// Add reset button
resetBtn.addEventListener("click", function () {
  location.reload();
});

// Roll dice
function rollDice() {
  let diceNum = Math.floor(Math.random() * 6) + 1;
  return diceNum;
}

// Sort Array low --> high or high --> low
function sortDiceNumArr(arr, mode) {
  const swap = (arr, index1, index2) => {
    [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
  };
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i; j++) {
      if (arr[j] < arr[j + 1] && mode == "big") {
        swap(arr, j, j + 1);
      } else if (arr[j] > arr[j + 1] && mode == "small") {
        swap(arr, j, j + 1);
      }
    }
  }
  return arr;
}

// Get the biggest/lowest dice number combination
function getDiceCombo(num_of_dice, mode) {
  let counter = 0;
  let arr = [];
  while (counter < Number(num_of_dice)) {
    arr.push(rollDice());
    counter += 1;
  }
  numsArr = arr.toString();
  let sortedArr = sortDiceNumArr(arr, mode);
  let numStr = "";
  for (let i = 0; i < sortedArr.length; i++) {
    numStr += String(sortedArr[i]);
  }
  let combination = Number(numStr);
  return combination;
}

// Generate a leaderboard to show each player's optimal number
function generateLeaderboard(arr, mode) {
  let record;
  let showRecord = "";
  let leaderboard = [];
  for (let i = 0; i < arr.length; i++) {
    let player = `Player ${i + 1}`;
    leaderboard.push({ player });
    leaderboard[i].value = arr[i];
  }
  if (mode == "big") {
    record = leaderboard.sort((a, b) => (a.value < b.value ? 1 : -1));
  } else {
    record = leaderboard.sort((a, b) => (a.value > b.value ? 1 : -1));
  }
  for (let j = 0; j < record.length; j++) {
    showRecord +=
      `${[j + 1]}. ` + record[j].player + " : " + record[j].value + `<br>`;
  }
  return showRecord;
}

// Find the index of duplicated number in game board array
function findDuplicates(arr, num) {
  let duplicatesIndex = [];
  let idx = arr.indexOf(num);
  while (idx != -1) {
    duplicatesIndex.push(idx);
    idx = arr.indexOf(num, idx + 1);
  }
  return duplicatesIndex;
}

// Check winner and display
function checkWinner(numOfDice, numOfPlayer, gameMode) {
  if (playerCounter <= numOfPlayer) {
    gameRecordArr.push(getDiceCombo(numOfDice, gameMode));
    for (let i = 0; i < gameRecordArr.length; i++) {
      let diceNumsStr = "";
      for (let j = 0; j < numsArr.length; j++) {
        diceNumsStr += " " + numsArr[j] + " ";
      }
      diceRollMsg = `Player ${playerCounter}, you roll "${diceNumsStr}", your number is ${gameRecordArr[i]}<hr>`;
    }

    gameBoard = generateLeaderboard(gameRecordArr, gameMode);
    playerCounter++;
    submitBtn.innerHTML = `Player ${playerCounter}`;

    if (playerCounter > numOfPlayer) {
      let maxNum = Math.max(...gameRecordArr);
      let minNum = Math.min(...gameRecordArr);

      // Find the index of maxNum if have more then two maxNum
      let dulNum =
        gameMode == "big"
          ? Math.max(...gameRecordArr)
          : Math.min(...gameRecordArr);
      let duplicatedNumIndexArr = findDuplicates(gameRecordArr, dulNum);
      let dulTopPlayers = "";
      if (duplicatedNumIndexArr.length >= 2) {
        for (let i = 0; i < duplicatedNumIndexArr.length; i++) {
          dulTopPlayers += `Player ${duplicatedNumIndexArr[i] + 1}, `;
        }
        toggleBtn();
        return `It's a tie! ${dulTopPlayers}<br>you have the same number: ${dulNum}. `;
      }
      if (gameMode == "big" && maxNum != minNum) {
        winner = gameRecordArr.indexOf(maxNum) + 1;
      } else {
        winner = gameRecordArr.indexOf(minNum) + 1;
      }
      winnerMsg = `Congrats! Player ${winner}, you won!!!🎊🎊🎊`;
      displayMsg = `${diceRollMsg}<br>${winnerMsg}<br><br>`;
      toggleBtn();
    } else {
      displayMsg = diceRollMsg;
    }
  }
  return displayMsg + "<b>🏆Leaderboard🏆</b><br>" + gameBoard;
}

// Main function block
let main = function () {
  const num_Of_Dice = diceInput.value;
  const num_Of_Player = playerInput.value;
  const game_Mode = gameModeInput.value;
  diceInput.disabled = true;
  playerInput.disabled = true;
  gameModeInput.disabled = true;
  return checkWinner(num_Of_Dice, num_Of_Player, game_Mode);
};
