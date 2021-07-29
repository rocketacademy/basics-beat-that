let numOfDice = 0;
let gameMode = "waiting for number of players";
let playerTurn = 0;
let arrayOfObjects = [];

//get largest diceRolls
const findWinner = () => {
  let sortedScore = arrayOfObjects.sort((a, b) => b.diceRolls - a.diceRolls);
  let winner = sortedScore[0].id;
  return `Winner is player ${winner}.\<br\>\ Leaderboard\<br\>\ ${leaderBoard()}`;
};

//leaderboard (function map)
const leaderBoard = () =>
  arrayOfObjects.map(
    (item) => `
    Player ${item.id}. Dicerolls: ${item.diceRolls}.\<br\>\ 
    `
  );

var storePlayerObjects = function (userInput) {
  for (var i = 0; i < userInput; i += 1) {
    arrayOfObjects.push({ id: i + 1, diceRolls: [] });
  }
};

//resetGame
const resetGame = () => {
  numOfDice = 0;
  gameMode = "waiting for number of players";
  playerTurn = 0;
  arrayOfObjects = [];
};

//rolling dice number with Math
const getDiceRoll = () => {
  return 1 + Math.floor(Math.random() * 6);
};
//pushing the sorted diceRoll to diceArray
const diceRollArray = () => {
  let diceArray = [];
  for (let n = 0; n < Number(numOfDice); n++) {
    let diceNumber = getDiceRoll();
    diceArray.push(diceNumber);
    sortDiceArray(diceArray);
  }
  arrayOfObjects[playerTurn].diceRolls = Number(diceArray.join(""));
  return diceArray;
};
// sorting array
const sortDiceArray = (anArray) => {
  anArray.sort(function (a, b) {
    return b - a;
  });
};

//normalMode
const normalMode = () => {
  diceRollArray();
  playerTurn += 1;
  if (playerTurn >= arrayOfObjects.length) {
    return `Player ${playerTurn} rolled ${
      arrayOfObjects[playerTurn - 1].diceRolls
    }. Click Submit to see winner.`;
  }
  return `Player ${playerTurn} rolled ${
    arrayOfObjects[playerTurn - 1].diceRolls
  }. Next is Player ${playerTurn + 1}'s turn`;
};

const main = (input) => {
  if (gameMode == "waiting for number of players") {
    storePlayerObjects(input);
    gameMode = "waiting for dice number";
    return `There are ${arrayOfObjects.length} players. You may choose how many dice to roll.`;
  }

  if (gameMode == "waiting for dice number") {
    numOfDice = Number(input);
    gameMode = "normal";
    return `Each player will roll ${numOfDice} dice. Player 1 please start by clicking submit to roll your dice.`;
  }

  if (gameMode == "normal") {
    if (playerTurn < arrayOfObjects.length) {
      return normalMode();
    }
    gameMode = "find winner";
  }

  if (gameMode == "find winner") {
    return findWinner();
  }
  //to be fixed later.
  resetGame();
};
