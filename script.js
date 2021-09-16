// games modes
const gameModeDiceRoll = "GAME_MODE_DICE_ROLL";
const gameModeChooseDiceOrder = "GAME_MODE_CHOOSE_DICE_ORDER";
// const gameModeLowestCombinedNumberMode =
//   "GAME_MODE_LOWEST_COMBINED_NUMBER_MODE";

// Initialise the game to start with the dice roll mode
let gameMode = gameModeDiceRoll;

// keep track of the current player's number, either 1 or 2. The game start with player 1
let currPlayer = 1;

// keep track of the player's dice rolls
let player1Dice = [];
let player2Dice = [];

// keep track of each players chosen numbers
let player1Num;
let player2Num;

// keep track of the player's score
let player1Score = 0;
let player2Score = 0;

// function to get random number from 1 to 6
const getDiceRoll = () => {
  return Math.ceil(Math.random() * 6);
};

/**
 * Get dice rolls for curr player and populate curr player's dice array
 * Return the new dice rolls
 */
const getDiceRolls = () => {
  //  Create an array newDiceRolls with 2 independent new dice rolls values
  const newDiceRolls = [getDiceRoll(), getDiceRoll()];
  // assign newDiceRolls to the current player's dice array
  if (currPlayer == 1) {
    player1Dice = newDiceRolls;
  }
  // if current player is not 1, assume current player is 2
  else {
    player2Dice = newDiceRolls;
  }
  // return newDiceRolls to parent function
  return newDiceRolls;
};

// return a number that is the concatenation of num1 and num2
const concatenateTwoNumbers = (num1, num2) => {
  return Number(String(num1) + String(num2));
};

// generate and store the player's numbers based on his dice rolls and chosen first numeral index
// return the player number
// @param {number} firstNUmeralIndex

const getPlayerNumber = (firstNumeralIndex) => {
  // get the current player's dice array
  // use the tenary operator
  const diceArray = currPlayer === 1 ? player1Dice : player2Dice;

  // if the chosen first numeral index is 1, create player number starting with 1st dice, again using tenary operator
  const playerNum =
    firstNumeralIndex === 1
      ? concatenateTwoNumbers(diceArray[0], diceArray[1])
      : concatenateTwoNumbers(diceArray[1], diceArray[0]);

  // store player num in the relevant global player num variable
  if (currPlayer === 1) {
    player1Num = playerNum;
  } else {
    player2Num = playerNum;
  }

  // return generated player num to parent function
  return playerNum;
};

// compute the winner between Player 1 and Player 2
// return either 1 or 2 represent the winning player
// in the event of a tie, Player 2 wins
const determineWinner = () => {
  if (player1Num > player2Num) {
    player1Score += 1;
    return 1;
  }
  player2Score += 1;
  return 2;
};

// compute the leaderboard
const determineLeaderboard = () => {
  if (player1Score > player2Score) {
    return 1;
  }
  return 2;
};

// play the game
const main = (input) => {
  const myOutputValue = "hello world";

  // roll 2 dice and show the player the values
  if (gameMode === gameModeDiceRoll) {
    // get dice roll for curr player and populate the curr player's dice array
    const newDiceRolls = getDiceRolls();
    // switch mode to choose dice order
    gameMode = gameModeChooseDiceOrder;
    // return the dice roll values to that player
    return `Welcome Player ${currPlayer}.<br>
      You rolled Dice 1: ${newDiceRolls[0]} and Dice 2: ${newDiceRolls[1]} <br>
      Choose the order of the dice by entering 1 or 2 as the first numeral index.`;
  }

  // create a number based on the player's chosen dice order, and show it to the player
  if (gameMode === gameModeChooseDiceOrder) {
    // validate the input. If first numeral index is neither 1 nor 2, tell the user.
    const firstNumeralIndex = Number(input);
    if (firstNumeralIndex !== 1 && firstNumeralIndex !== 2) {
      return `Please choose 1 or 2 as the first numeral index for your dice rolls`;
    }

    // get player number for curr player
    const playerNum = getPlayerNumber(firstNumeralIndex);
    const playerNumResponse = `Player ${currPlayer}, You chose Dice ${firstNumeralIndex} first. <br>
    Your number is ${playerNum}.`;

    // if currPlayer is Player 1, change currPlayer to Player 2, switch mode to dice roll
    if (currPlayer === 1) {
      currPlayer = 2;
      gameMode = gameModeDiceRoll;
      // return player number to Player 2, let Player 2 know it is their turn
      return `${playerNumResponse} <br>
        It is now Player 2's turn. Press Submit to roll Player 2's dice.`;
    }

    // else if currPlayer is Player 2, determine the winner and let the players know who won.
    const theWinner = determineWinner();

    // compute the who lead the games so far
    const lead = determineLeaderboard();
    const leaderboardResponse = () => {
      if (lead === 1) {
        return `<li>Player 1 -- Score : ${player1Score}</li>
                <li>Player 2 -- Score : ${player2Score}</li>`;
      } else {
        return `<li>Player 2 -- Score : ${player2Score}</li>
                <li>Player 1 -- Score : ${player1Score}</li>`;
      }
    };

    // reset the game
    currPlayer = 1;
    gameMode = gameModeDiceRoll;

    // return the game end response
    return `${playerNumResponse} <br>
      Player 1's number: ${player1Num} | Player 2's number: ${player2Num} <br> 
      Player ${theWinner} has won. <br><br>
      
      The score is Player 1: ${player1Score} || Player 2: ${player2Score}<br>
      Leaderboard : <br>
      ${leaderboardResponse()} <br><br>

      Press Submit to play again.`;
  }
  return myOutputValue;
};
