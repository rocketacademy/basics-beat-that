/* -------------------------------- */
/* ------- GLOBAL VARIABLES ------- */
/* -------------------------------- */

// definining game states.
const STATE_ROLL = "ROLL";
const STATE_CHOOSE = "CHOOSE";
const STATE_RESULT = "RESULT";
const STATE_RESTART = "RESTART";

// initialised game state.
// total players variable that can be changed to increase / decrease number of players.
let gameState = STATE_ROLL;
let totalPlayers = 2;
let currentPlayer = 1;

// variables to store player rolls and numbers.
let diceRoll = [];
let playerNumber = 0;
let playerNumberArray = [];
let playerScoreArray = [0, 0];

/* -------------------------------- */
/* ------- HELPER FUNCTIONS ------- */
/* -------------------------------- */

// dice rolling function.
var rollDice = function () {
  return Math.floor(Math.random() * 6) + 1;
};

// function to convert two separate numbers into single number.
var joinNumbers = function (inputArray, index) {
  // convert each number in the array to a string
  // then concatenate them and turn the resulting
  // string back into a number.
  if (index == 1) {
    return Number(String(inputArray[0]) + String(inputArray[1]));
  }
  if (index == 2) {
    return Number(String(inputArray[1]) + String(inputArray[0]));
  }
};

// comparison function to see if player 1 is bigger than player 2.
var compareNumbers = function (number1, number2) {
  return number1 > number2;
};

// function to set everything back to 0, while keeping player scores.
var resetGame = function () {
  // reset player turn and game states.
  currentPlayer = 1;
  gameState = STATE_ROLL;

  // reset round information.
  diceRoll = [];
  playerNumber = 0;
  playerNumberArray = [];
};

/* -------------------------------- */
/* -------- GAME FUNCTIONS -------- */
/* -------------------------------- */

// gameplay for roll dice state.
var playDiceRoll = function () {
  // switch modes to choose the order.
  gameState = STATE_CHOOSE;

  // roll two dice, and push them to the p1Dice array.
  diceRoll = [];

  diceRoll.push(rollDice());
  diceRoll.push(rollDice());

  // inform player of the two numbers, and ask for order.
  let output = `Player ${currentPlayer}, you rolled <b>${diceRoll[0]}</b> and <b>${diceRoll[1]}</b>. 
  </br> </br> 
  Please type in '1' or '2' to indicate which number you want to be the first.`;

  return output;
};

var playChooseOrder = function (input) {
  // input validation to make sure the user only chooses 1 or 2.
  if (input != "1" && input != "2") {
    return "Please enter either 1 or 2.";
  }

  // convert the two numbers into a single number.
  playerNumber = joinNumbers(diceRoll, input);
  playerNumberArray.push(playerNumber);
  playerScoreArray[currentPlayer - 1] += playerNumber;

  // ask second player to roll his dice.
  let output = `Player ${currentPlayer}, you have indicated ${input} as your choice. 
  </br> </br> 
  Your final number is: <b>${playerNumber}</b>. 
  </br> </br> `;

  if (currentPlayer < totalPlayers) {
    // prepare for next player.
    gameState = STATE_ROLL;
    currentPlayer++;
    output += `Player ${currentPlayer}, please click submit to roll the dice. `;
  } else {
    // switch over to compute result.
    gameState = STATE_RESULT;
    output += `Press submit to find out who won!`;
  }

  return output;
};

// currently works for two players.
var playShowResult = function () {
  // if p1Number > p2Number, this variable will be true.
  let p1Win = compareNumbers(playerNumberArray[0], playerNumberArray[1]);
  let output;

  gameState = STATE_RESTART;

  // if p1Win is true, this code runs.
  if (p1Win) {
    output = `Player 1 rolled <b>${playerNumberArray[0]}</b>, which is bigger than <b>${playerNumberArray[1]}</b>. Player 1 won!
    </br> </br> 
    SCORES: 
    </br> 
    Player 1: <b>${playerScoreArray[0]}</b> 
    </br> 
    Player 2: <b>${playerScoreArray[1]}</b> 
    </br> </br> 
    Please type "RESTART" to play again. `;
  }

  // if p1Win is false, then !false = true, so this code runs.
  if (!p1Win) {
    // show numbers created during this round,
    // then show total scores from cumulative score array.
    output = `Player 2 rolled <b>${playerNumberArray[1]}</b>, which is bigger than <b>${playerNumberArray[0]}</b>. Player 2 won! 
    </br> </br> 
    SCORES: 
    </br> 
    Player 1: <b>${playerScoreArray[0]}</b> 
    </br> 
    Player 2: <b>${playerScoreArray[1]}</b> 
    </br> </br> 
    Please type "RESTART" to play again. `;
  }

  return output;
};

var playRestartGame = function (input) {
  // tell user to what to type in, if they did not type it in.
  output = `Please type "RESTART" to play again!`;

  // if user types in "RESTART", game begins again, starts at P1.
  if (input == "RESTART" || input == "restart" || input == "Restart") {
    // re-initialise the dice storage variables
    // so that it doesn't still read the previous round's values.
    resetGame();

    output = `Let's play again! 
    </br> </br> 
    Player ${currentPlayer}, press submit to start rolling the dice. `;

    return output;
  }

  return output;
};

/* -------------------------------- */
/* --------- MAIN FUNCTION -------- */
/* -------------------------------- */

// main function for game to play.
var main = function (input) {
  let output = "";

  // states for rolling dice, and presenting dice.
  if (gameState == STATE_ROLL && currentPlayer <= totalPlayers)
    return playDiceRoll();

  // states for choosing dice order, and presenting the final number.
  if (gameState == STATE_CHOOSE && currentPlayer <= totalPlayers)
    return playChooseOrder(input);

  // state for comparing numbers and presenting game result.
  if (gameState == STATE_RESULT) return playShowResult();

  // state for restarting the game.
  if (gameState == STATE_RESTART) return playRestartGame(input);

  return output;
};
