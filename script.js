const main = function (input) {
  return BeatThat(input);
};

// define initial gameMode as setting of Player 1's name
let gameMode = `setNumberOfRollsPerGame`;

let playerOneName = ``;
let playerTwoName = ``;

let playerOneDiceResultArray = [];
let playerTwoDiceResultArray = [];

let playerOneArrangedChoiceArray = [];
let playerTwoArrangedChoiceArray = [];

let playerOneArrangedArray = [];
let playerTwoArrangedArray = [];

let numberOfRollsPerGame;

const BeatThat = function (input) {
  // if gameMode = `setPlayerOneName`, we should set playerOne name, and change gameMode to `setPlayerTwoName`.
  if (gameMode == `setPlayerOneName`) {
    playerOneName = input;
    gameMode = `setPlayerTwoName`;
    return `Welcome ${playerOneName}.<br>You are Player 1.<br><br>Player 2, it is your turn to fill in your name`;
  }
  // if gameMode = `setPlayerTwoName`, we should set playerTwo name, and change gameMode to `PlayerOneRolls`.
  if (gameMode == `setPlayerTwoName`) {
    playerTwoName = input;
    gameMode = `setNumberOfRollsPerGame`;
    return `Welcome ${playerTwoName}.<br>You are Player 2.<br><br>It is now time to start the game of 'Beat That'!<br>But before we officially start the game, please select the number of dice each player would get to roll each game!`;
  }
  // if gameMode = `setNumberOfRollsPerGame`, we should push the number of rolls to `numberOfRollsPerGame` variable, and change the gameMode to `PlayerOneRolls`
  if (gameMode == `setNumberOfRollsPerGame`) {
    if (isNaN(input) || input == ``) {
      return `You can only key in a number!<br>Please try again, and key in a valid number`;
    } else {
      numberOfRollsPerGame = input;
      gameMode = `PlayerOneRolls`;
      return `You have selected ${input}.<br>Each Player will now roll ${input} dice each turn!<br><br>${playerOneName}, please roll your ${input} dice now!`;
    }
  }
  // if gameMode = `PlayerOneRolls`, we do not need any inputs. We will display the result of the "x" rolls as output display, and switch gameMode to `PlayerOneOrders`.
  if (gameMode == `PlayerOneRolls`) {
    let returnMessage = `${playerOneName}, here are your dice results!<br><br>`;
    for (i = 0; i < numberOfRollsPerGame; i++) {
      playerOneDiceResultArray.push(oneDiceRoll());
      returnMessage =
        returnMessage + `Dice ${i + 1}: ${playerOneDiceResultArray[i]}<br>`;
    }
    console.log(playerOneDiceResultArray);
    gameMode = `PlayerOneArranges`;
    return (
      returnMessage +
      `<br>Please indicate how you would arrange your results now!<br><br>If you would like Dice 3 to be displayed first, followed by Dice 1, then lastly Dice 2, please input "312", without the quotations!`
    );
  }

  if (gameMode == `PlayerOneArranges`) {
    return arranger(input, playerOneDiceResultArray);
    gameMode = `PlayerTwoRolls`;
    return `You arranged your result to become ${playerOneArrangedArray}!<br><br> It is now ${playerTwoName}'s turn to roll dice!`;

    // return `Your result is invalid.<br>Please indicate the sequence you would like to display arrange your results in now!<br><br>If you would like Dice 3 to be displayed first, followed by Dice 1, then lastly Dice 2, please input "312", without the quotations! `;
  }
};

/**
 * This function simulates a single dice roll
 * @returns {number} The result of a single dice roll (i.e. 1 - 6)
 */
const oneDiceRoll = function () {
  const randomDecimal = Math.random() * 6;
  const oneDiceResult = Math.floor(randomDecimal) + 1;
  return oneDiceResult;
};

const arranger = function (arrangedIndex, unarrangedArray) {
  let resultArray = [];
  if (isNaN(arrangedIndex) || arrangedIndex == ``) {
    return `Error, you have keyed an invalid data type.<br><br>You can only key in numbers!`;
  } else if (arrangedIndex.toString().length != unarrangedArray.length) {
    return `Error, you have keyed in a larger index than required`;
  } else {
    for (i = 0; i < unarrangedArray.length; i++) {
      resultArray.push(unarrangedArray[arrangedIndex[i]]);
    }
    return resultArray;
  }
};

// if (gameMode == `PlayerOneArranges`) {
//   for (let i = 0; i < input.length; i++) {
//     playerOneArrangedChoiceArray.push(parseInt(input[i]));
//   }
//   console.log(playerOneArrangedChoiceArray);
//   console.log(playerOneDiceResultArray);
//   for (let i = 0; i < playerOneDiceResultArray.length; i++) {
//     playerOneArrangedArray.push(
//       playerOneDiceResultArray[playerOneArrangedChoiceArray[i] - 1]
//     );
//   }
//   console.log(playerOneArrangedArray);
//   gameMode = `PlayerTwoRolls`;
//   return `You arranged your result to become ${playerOneArrangedArray}!<br><br> It is now ${playerTwoName}'s turn to roll dice!`;

//   // return `Your result is invalid.<br>Please indicate the sequence you would like to display arrange your results in now!<br><br>If you would like Dice 3 to be displayed first, followed by Dice 1, then lastly Dice 2, please input "312", without the quotations! `;
// }
