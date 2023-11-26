// =========== GLOBAL VARIABLES ==========
var player1Name = "";
var player2Name = "";
var player1Dice1 = 0;
var player1Dice2 = 0;
var player1Number = 0;
var player2Dice1 = 0;
var player2Dice2 = 0;
var player2Number = 0;
var journeyCounter = 0;

// =========== HELPER FUNCTIONS ==========
// Function that helps autogenerate the dice roll values
var diceRoll = function () {
  var diceNumber = 6;
  var randomDecimal = Math.random() * diceNumber;
  var randomInteger = Math.floor(randomDecimal);
  var diceResult = randomInteger + 1;
  return diceResult;
};

// Functions that checks for validation of name
var nameString = function (input) {
  const letterRegex = /^[a-zA-Z]+$/;
  if (letterRegex.test(input)) {
    console.log("Input contains only letters.");
    return true;
  } else {
    console.log("Input contains non-letter characters.");
    return false;
  }
};

// Initial Dice rolls for each player and determines which player is currently going through this linear journey
var playerInput = function (input, counter) {
  if (counter == 0) {
    player1Name = input;
    player1Dice1 = diceRoll();
    player1Dice2 = diceRoll();
    journeyCounter++; // journeyCounter == 1 here
    return `Player 1's name is ${player1Name}. <br>For Dice 1, you rolled: ${player1Dice1}.<br>For Dice 2, you rolled: ${player1Dice2}.<br> Please enter '1' for Dice 1 to be first, or '2' for Dice 2 to be the first.`;
  } else {
    player2Name = input;
    player2Dice1 = diceRoll();
    player2Dice2 = diceRoll();
    journeyCounter++;
    return `Player 2's name is ${player2Name}. <br>For Dice 1, you rolled: ${player2Dice1}.<br>For Dice 2, you rolled: ${player2Dice2}.<br> Please enter '1' for Dice 1 to be first, or '2' for Dice 2 to be the first.`;
  }
};

// Function that assists in calculating the player's final Dice results after selecting their Dice positions
var playerResult = function (input, counter) {
  if (counter == 1) {
    if (input == 1) {
      journeyCounter++;
      player1Number = player1Dice1.toString() + player1Dice2.toString();
      return `${player1Name}, you chose Dice 1 first.<br> Your number is now: ${player1Number}.<br> It is now Player 2's turn.`;
    } else {
      journeyCounter++;
      player1Number = player1Dice2.toString() + player1Dice1.toString();
      return `${player1Name}, you chose Dice 2 first.<br> Your number is now: ${player1Number}.<br> It is now Player 2's turn.`;
    }
  } else {
    if (input == 1) {
      player2Number = player2Dice1.toString() + player2Dice2.toString();
      if (Number(player1Number) > Number(player2Number)) {
        return `${player1Name} number: ${player1Number}.<br>${player2Name} number: ${player2Number}.<br>As ${player1Name} has the greater value, ${player1Name} WINS!`;
      } else if (Number(player1Number) < Number(player2Number)) {
        return `${player1Name} number: ${player1Number}.<br>${player2Name} number: ${player2Number}.<br>As ${player2Name} has the greater value, ${player2Name} WINS!`;
      } else {
        return `${player1Name} number: ${player1Number}.<br>${player2Name} number: ${player2Number}.<br>As ${player1Name} and ${player2Name} has the same number, it's a DRAW!`;
      }
      return `${player2Name}, you chose Dice 1 first.<br> Your number is now: ${player2Number}.`;
    } else {
      player2Number = player2Dice2.toString() + player2Dice1.toString();
      if (Number(player1Number) > Number(player2Number)) {
        return `${player1Name} number: ${player1Number}.<br>${player2Name} number: ${player2Number}.<br>As ${player1Name} has the greater value, ${player1Name} WINS!`;
      } else if (Number(player1Number) < Number(player2Number)) {
        return `${player1Name} number: ${player1Number}.<br>${player2Name} number: ${player2Number}.<br>As ${player2Name} has the greater value, ${player2Name} WINS!`;
      } else {
        return `${player1Name} number: ${player1Number}.<br>${player2Name} number: ${player2Number}.<br>As ${player1Name} and ${player2Name} has the same number, it's a DRAW!`;
      }
    }
  }
};

// =========== MAIN FUNCTION ==========
var main = function (input) {
  var usrInput = input;
  if (journeyCounter == 0) {
    if (nameString(usrInput) !== true) {
      return `Please only input characters into the textbox! ${usrInput} is not a valid input`;
    }
    return playerInput(usrInput, journeyCounter);
  }
  console.log(journeyCounter);
  if (journeyCounter == 1) {
    return playerResult(input, journeyCounter);
  }
  if (journeyCounter == 2) {
    if (nameString(usrInput) !== true) {
      return `Please only input characters into the textbox! ${usrInput} is not a valid input`;
    }
    return playerInput(usrInput, journeyCounter);
  }
  if (journeyCounter == 3) {
    journeyCounter++;
    return playerResult(input, journeyCounter);
  }
};
