// // There are 2 players and players take turns.
// // on clicking submit, the game rolls two dices
// // and shows the dice rolls, eg 3,6
// // the player picks the order of the dice they want
// // if 63,they specify the second dice goes first
// // choose how the player specifies the dice order
// // both playes roll dices
// // the player with the highest combined the dice number wins



// 1. ask the player to press a button that rolls the dice

const NUMBER_OF_DICE = 2;
const NUMBER_OF_PLAYERS = 2;

const scores = [];
let playerIndex = 0;
let isRolling = true;
let currentDiceRoll = undefined;

/**
 * Returns an array of dice roll numbers for the number of dice used.
 */
function rollDice(numberOfDice) {
  const diceNumbers = [];
  for (let i = 0; i < numberOfDice; i++) {
    var randomDecimal = Math.random() * 6;
    var randomInteger = Math.floor(randomDecimal);
    var diceNumber = randomInteger + 1;
    diceNumbers.push(diceNumber);
  }

  return diceNumbers;
}

// 2. on button click, call "rollDice"

// 3. display dice rolled as output message
var main = function (diceOrder) {
  if (isRolling) {
    const diceRoll = rollDice(NUMBER_OF_DICE);

    currentDiceRoll = diceRoll;
    isRolling = false;

    const input = document.getElementById("input-container");
    input.style.display = "block";

    const button = document.getElementById("submit-button");
    button.innerHTML = "Select Starting Dice";

    return `Player ${playerIndex + 1} rolled a ${diceRoll
      .map((dice, i) => (i < 1 ? dice : ` and a ${dice}`))
      .join("")}.`;
  } else {
    const errorMessage =
      "Please enter only a 0 or a 1 for which dice you want first.";
    if (
      typeof Number(diceOrder) !== "number" ||
      diceOrder % 1 !== 0 ||
      diceOrder < 0 ||
      diceOrder > NUMBER_OF_DICE
    )
      return errorMessage;

    const selectedIndex = diceOrder - 1;

    const score = Number(
      `${currentDiceRoll[selectedIndex]}${
        currentDiceRoll[selectedIndex === 0 ? 1 : 0]
      }`
    );
    // Update player's score cummulatively with latest dice roll.
    scores[playerIndex] =
      typeof score[playerIndex] === "number"
        ? score[playerIndex] + score
        : score;

    // Using ternary operator to get second number's index
    const selectedNumberMessage = `Player ${
      playerIndex + 1
    } chose ${score}. Their new score is ${scores[playerIndex]}`;

    currentDiceRoll = undefined;
    isRolling = true;
    playerIndex = playerIndex === NUMBER_OF_PLAYERS - 1 ? 0 : playerIndex + 1;

    const input = document.getElementById("input-container");
    input.style.display = "none";

    const button = document.getElementById("submit-button");
    button.innerHTML = "Roll Dice";

    return selectedNumberMessage;
  }
};




// TERNARY OPERATOR

// const didEat = true;
// const isHungry = didEat ? false : true;

// let isHungry;
// if (didEat) {
//     isHungry = false;
// } else {
//     isHungry = true;
// }