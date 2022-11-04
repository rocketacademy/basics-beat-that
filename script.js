var MODE_DICE_ROLL = "MODE_ROLL_DICE";
var MODE_DETERMINE_ORDER = "MODE_DETERMINE_ORDER";
var MODE_COMPARE_NUMBERS = "MODE_COMPARE_NUMBERS";
var MODE = "MODE_ROLL_DICE";
var finalValue = "";
var currentPlayerNumbers = [];
var currentPlayer = 1;
var allPlayersNumbers = [];

//get a random number
var rollDice = function () {
  console.log("Control flow: start of rollDice()");
  var randomInteger = Math.floor(Math.random() * 6) + 1;
  console.log(`Dice output - ${randomInteger}`);
  return randomInteger;
};
//get numbers from dice roll and put into array
var getCurrentPlayerNumbers = function () {
  console.log("Control flow: start of getCurrentPlayerNumbers()");
  var counter = 0;
  while (counter < 2) {
    currentPlayerNumbers.push(rollDice());
    counter += 1;
  }
  console.log(`Current player numbers - ${currentPlayerNumbers}`);
};

//generate a message with players numbers and request for input for order
var generateDetermineOrderMessage = function () {
  console.log("Control flow: start of generateDetermineOrderMessage()");
  return `Player ${currentPlayer}, you rolled a ${currentPlayerNumbers[0]} & ${currentPlayerNumbers[1]}. Please input either '1' or '2' to determine which number to be the first number.`;
};

//input validation whether dice 1 or 2 as first integer
var determineNumberOrder = function (playerInput) {
  console.log("Control flow: start of determineNumberOrder()");
  if (playerInput != 1 && playerInput != 2) {
    console.log("INVALID INPUT");
    MODE = "error";
    return `Invalid input! Please input either '1' or '2' to determine which number to be the first number. You rolled a ${currentPlayerNumbers[0]} & ${currentPlayerNumbers[1]}`;
  }
  if (playerInput == 1) {
    finalValue = Number(
      String(currentPlayerNumbers[0]) + String(currentPlayerNumbers[1])
    );
    console.log(`INPUT IS 1. OUTPUT - ${finalValue}`);
  }
  if (playerInput == 2) {
    finalValue = Number(
      String(currentPlayerNumbers[1]) + String(currentPlayerNumbers[0])
    );
    console.log(`INPUT IS 2. OUTPUT - ${finalValue}`);
  }
  allPlayersNumbers.push(finalValue);
  currentPlayerNumbers = [];
  return `Player ${currentPlayer}, your determined number is ${finalValue}!`;
};

var compareNumbers = function () {
  console.log("Control flow: start of compareNumbers()");
  compareMessage = `Player 1 number - ${allPlayersNumbers[0]} | Player 2 number -  ${allPlayersNumbers[1]} `;
  if (allPlayersNumbers[0] == allPlayersNumbers[1]) {
    compareMessage = compareMessage + `It's a tie!`;
  }
  if (allPlayersNumbers[0] > allPlayersNumbers[1]) {
    compareMessage = compareMessage + `<br><br> Player 1 wins!`;
  }
  if (allPlayersNumbers[0] < allPlayersNumbers[1]) {
    compareMessage = compareMessage + `<br><br> Player 2 wins!`;
  }
  return compareMessage;
};

var restartGame = function () {
  currentPlayer = 1;
  MODE = MODE_DICE_ROLL;
  allPlayersNumbers = [];
};

var main = function (input) {
  myOutputMessage = "";
  if (MODE == MODE_DICE_ROLL) {
    getCurrentPlayerNumbers();
    myOutputMessage = generateDetermineOrderMessage();
    MODE = MODE_DETERMINE_ORDER;
    return myOutputMessage;
  }
  if (MODE == MODE_DETERMINE_ORDER) {
    if (currentPlayer == 1) {
      myOutputMessage = determineNumberOrder(input);
      if (MODE != "error") {
        currentPlayer = 2;
        MODE = MODE_DICE_ROLL;
        return (
          myOutputMessage +
          `<br><br> It is now Player 2's turn to roll. Press submit to roll!`
        );
      }
    }
    if (currentPlayer == 2) {
      myOutputMessage = determineNumberOrder(input);
      if (MODE != "error") {
        MODE = MODE_COMPARE_NUMBERS;
        console.log(allPlayersNumbers);
        return myOutputMessage + ` Press submit to calculate score!`;
      }
    }
    if (MODE == "error") {
      myOutputMessage = determineNumberOrder(input);
      MODE = MODE_DETERMINE_ORDER;
      return myOutputMessage;
    }
  }
  if (MODE == MODE_COMPARE_NUMBERS) {
    myOutputMessage = compareNumbers();
    restartGame();
    return (
      myOutputMessage +
      " Press submit to go for another round! Player 1 will start!"
    );
  }
};
