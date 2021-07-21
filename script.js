var firstDiceChoice = "";
var playerTurn = 1;
var combinedNumber = 0;
var savedFirstDice = 0;
var savedSecondDice = 0;
var allCombinedNumbers = [];

// More comfortable portion should require separate lists for each player?

var main = function (input) {
  while (playerTurn <= 2) {
    if (input == "") {
      var genFirstDice = Math.floor(Math.random() * 6 + 1);
      var genSecondDice = Math.floor(Math.random() * 6 + 1);
      savedFirstDice = genFirstDice;
      savedSecondDice = genSecondDice;
      myOutputValue =
        `Welcome Player ${playerTurn}.` +
        "<br><br>" +
        `You rolled ${genFirstDice} for Dice 1 and ${genSecondDice} for Dice 2.` +
        "<br><br> Choose the order of the dice. Pick Dice 1 or Dice 2 as your first dice.";
      return myOutputValue;
    }
    firstDiceChoice = input;
    if (firstDiceChoice == "Dice 1") {
      combinedNumber = String(savedFirstDice) + String(savedSecondDice);
    } else if (firstDiceChoice == "Dice 2") {
      combinedNumber = String(savedSecondDice) + String(savedFirstDice);
    } else {
      return (
        "Please enter either 'Dice 1' or 'Dice 2' without the quotation.<br><br>" +
        `Dice 1 was ${savedFirstDice} while Dice 2 was ${savedSecondDice}`
      );
    }
    myOutputValue =
      `Player ${playerTurn}, you chose ${firstDiceChoice} first.` +
      "<br><br>" +
      "Your number is " +
      combinedNumber;

    allCombinedNumbers.push(combinedNumber);
    console.log(allCombinedNumbers);
    if (playerTurn == 2) {
      playerTurn = 1;
      var myOutputValue = checkWin(allCombinedNumbers);
      allCombinedNumbers = [];
      return myOutputValue;
    }
    playerTurn += 1;
    return myOutputValue;
  }
};

var checkWin = function (x) {
  if (x[0] > x[1]) {
    var outputMessage =
      "Player 2 played " +
      x[1] +
      " while Player 1 played " +
      x[0] +
      "<br><br>Player 1 wins";
    return outputMessage;
  } else if (x[0] < x[1]) {
    var outputMessage =
      "Player 2 played " +
      x[1] +
      " while Player 1 played " +
      x[0] +
      "<br><br>Player 2 wins";
    return outputMessage;
  } else {
    outputMessage = "Draw!";
    return outputMessage;
  }
};
