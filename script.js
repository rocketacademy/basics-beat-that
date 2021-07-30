let numOfDice = 0;
let gameMode = "waiting for number of players";
let playerTurn = 0;
let arrayOfPlayers = [];

//store Player's object to be used for sorting diceRolls and leaderboard
const storePlayerObjects = (userInput) => {
  for (let i = 0; i < userInput; i += 1) {
    arrayOfPlayers.push({ id: i + 1, diceRolls: [] });
  }
};

//get winner at the end of game , display leaderboard, restart the game
const findWinner = () => {
  let sortedScore = arrayOfPlayers.sort((a, b) => b.diceRolls - a.diceRolls);
  let winner = sortedScore[0].id;
  let finalMessage = `Winner is player ${winner}.\<br\><br\>\ Leaderboard\<br\>\ ${leaderBoard(
    arrayOfPlayers
  )}\<br\><br\>\Type number of players to replay the game.`;
  resetGame();
  return finalMessage;
};

//prep leaderboard
const leaderBoard = (anArray) =>
  anArray.reduce(
    (acc, curVal) =>
      `${acc} Player ${curVal.id}. Dicerolls: ${curVal.diceRolls}\<br\>\ `,
    ""
  );

//resetGame
const resetGame = () => {
  numOfDice = 0;
  gameMode = "waiting for number of players";
  playerTurn = 0;
  arrayOfPlayers = [];
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
  arrayOfPlayers[playerTurn].diceRolls = Number(diceArray.join(""));
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
  if (playerTurn >= arrayOfPlayers.length) {
    return `Player ${playerTurn} rolled ${
      arrayOfPlayers[playerTurn - 1].diceRolls
    }. Click Submit to see winner.`;
  }
  return `Player ${playerTurn} rolled ${
    arrayOfPlayers[playerTurn - 1].diceRolls
  }. Next is Player ${playerTurn + 1}'s turn.`;
};

//Flow of game: enter no of players, enter no of dice, each player takes turn, display winner & leaderboard, repeat.
const main = (input) => {
  if (gameMode == "waiting for number of players") {
    storePlayerObjects(input);
    gameMode = "waiting for dice number";
    return `There are ${arrayOfPlayers.length} players. You may choose how many dice to roll.`;
  }

  if (gameMode == "waiting for dice number") {
    numOfDice = Number(input);
    gameMode = "normal";
    return `Each player will roll ${numOfDice} dice. Player 1 please start by clicking submit to roll your dice.`;
  }

  if (gameMode == "normal") {
    if (playerTurn < arrayOfPlayers.length) {
      return normalMode();
    }
    gameMode = "find winner";
  }

  if (gameMode == "find winner") {
    return findWinner();
  }
};
