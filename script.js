var counter = 0;
var combinedNumber1 = 0;
var combinedNumber2 = 0;
var playerOneRolls = [];
var playerTwoRolls = [];

// generate random dice number
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

//roll two dices
var generateTwoDices = function (diceRoll1, diceRoll2) {
  var output = "";
  output = `You rolled ${diceRoll1} for Dice One and ${diceRoll2} for Dice Two.<br>Please choose a number for the first numeral of your combined number.`;

  return output;
};

//check which Player
var checkPlayer = function () {
  var output = "";
  if (counter == 0) {
    output = `Welcome <b>Player One</b>.<br>`;
  } else if (counter == 1) {
    output = `Welcome <b>Player Two</b>.<br>`;
  }
  return output;
};

//choose order of dice rolls
var chooseOrder = function (input, diceRoll1, diceRoll2) {
  var output = "";
  if (counter < 2) {
    if (input == diceRoll2) {
      output = parseInt(`${diceRoll2}${diceRoll1}`);
    } else if (input == diceRoll1) {
      output = parseInt(`${diceRoll1}${diceRoll2}`);
    }
  }
  return output;
};

//comparing two combined numbers
var compareCombinedNumber = function (combinedNo1, combinedNo2) {
  var compareOutcome = "";
  if (combinedNo1 > combinedNo2) {
    compareOutcome = `Player One's number: ${combinedNo1} <br>Player Two's number: ${combinedNo2}<br>Player One's number is bigger and wins this round!`;
  } else if (combinedNo1 < combinedNo2) {
    compareOutcome = `Player One's number: ${combinedNo1} <br>Player Two's number: ${combinedNo2}<br>Player Two's number is bigger and wins this round!`;
  } else {
    compareOutcome = `Player One's number: ${combinedNo1} <br>Player Two's number: ${combinedNo2}<br>Both Players One and Two have the same number. It's a draw!`;
  }
  return compareOutcome;
};

var main = function (input) {
  var myOutputValue = "";

  console.log("player one number:", combinedNumber1);
  console.log("player two number:", combinedNumber2);

  // player one's turn
  if (counter == 0 && input == 0) {
    //roling the dices
    playerOneRolls.push(rollDice());
    playerOneRolls.push(rollDice());
    //output two dice numbers rolled
    var playerOneRoll = generateTwoDices(playerOneRolls[0], playerOneRolls[1]);
    return checkPlayer() + playerOneRoll;
  } else if (counter == 0 && input != 0) {
    combinedNumber1 = chooseOrder(input, playerOneRolls[0], playerOneRolls[1]);
    counter = counter + 1;
    return `Your combined number is ${combinedNumber1}. <br>It's time for Player Two. <br>Press Submit to roll the dice for Player Two`;
  }

  //player two's turn
  if (counter == 1 && input == 0) {
    //roling the dices
    playerTwoRolls.push(rollDice());
    playerTwoRolls.push(rollDice());
    //output two dice numbers rolled
    var playerTwoRoll = generateTwoDices(playerTwoRolls[0], playerTwoRolls[1]);
    return checkPlayer() + playerTwoRoll;
  } else if (counter == 1 && input != 0) {
    combinedNumber2 = chooseOrder(input, playerTwoRolls[0], playerTwoRolls[1]);
    counter = counter + 1;
    return `Your combined number is ${combinedNumber2}. Press Submit to compare numbers.`;
  }

  //compare two combined numbers
  if (counter == 2) {
    var compareNumbersOutcome = compareCombinedNumber(
      combinedNumber1,
      combinedNumber2
    );
    //reset counter and numbers for players
    counter = 0;
    playerOneRolls = [];
    playerTwoRolls = [];
    myOutputValue = compareNumbersOutcome + "<br>Press Submit to play again!";
  }

  return myOutputValue;
};
