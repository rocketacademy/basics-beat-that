// Use Math to generate system's generated input for the game
const getDiceRoll = () => {
  return 1 + Math.floor(Math.random() * 6);
};
let roundCounter = 0;
let playerRound = 1;
let allDiceArray = [(diceArray1 = []), (diceArray2 = [])];
let playerMode = `Player ${playerRound}`;
const isGameOver = (checkRound) => checkRound === 2;

const resetGame = () => {
  roundCounter = 0;
  playerRound = 1;
  allDiceArray = [(diceArray1 = []), (diceArray2 = [])];
  playerMode = `Player ${playerRound}`;
};

const winnerOfGame = () =>
  Number(allDiceArray[0].join("")) > Number(allDiceArray[1].join(""))
    ? "Player 1"
    : Number(allDiceArray[0].join("")) < Number(allDiceArray[1].join(""))
    ? "Player 2"
    : "Nobody";

const main = (input) => {
  while (roundCounter < 2) {
    if (playerMode === `Player ${playerRound}`) {
      let diceCounter = 0;
      while (diceCounter < 2) {
        let rollDice = getDiceRoll();
        console.log(rollDice);
        allDiceArray[playerRound - 1].push(rollDice);
        diceCounter += 1;
        console.log(allDiceArray[0]);
      }
      playerMode = `Player ${playerRound} guess`;
      return `Welcome Player ${playerRound}.\<br>\You rolled ${
        allDiceArray[playerRound - 1][0]
      } for Dice 1 and ${
        allDiceArray[playerRound - 1][1]
      } for Dice 2.\<br>\Choose the order of the dice.`;
    }

    if (playerMode === `Player ${playerRound} guess`) {
      if (input == 2) {
        [allDiceArray[playerRound - 1][0], allDiceArray[playerRound - 1][1]] = [
          allDiceArray[playerRound - 1][1],
          allDiceArray[playerRound - 1][0],
        ];
      }
      playerRound += 1;
      roundCounter += 1;
      playerMode = `Player ${playerRound}`;
      diceCounter = 0;
      return isGameOver(roundCounter)
        ? `Player ${
            playerRound - 1
          }, you chose Dice ${input} first.\<br>\Your number is ${Number(
            allDiceArray[playerRound - 2].join("")
          )}.\<br>\Winner is ${winnerOfGame()}.`
        : `Player ${
            playerRound - 1
          }, you chose Dice ${input} first.\<br>\Your number is ${Number(
            allDiceArray[playerRound - 2].join("")
          )}.\<br>\It is now Player ${playerRound}'s turn.`;
    }
  }
  resetGame();
  return `Gameover. Click submit to replay.`;
};
