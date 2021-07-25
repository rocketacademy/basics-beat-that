var numOfRolls = 0;
var SECOND_DICE = "second dice";
var FIRST_DICE = "first dice";
var input = FIRST_DICE;
var rollDice = "roll the dice";
var decideSequence = "deciding the dice sequence";
var gameMode = rollDice;
var myOutputValue = "";
var firstDiceNumber = 0;
var secondDiceNumber = 0;
var currPlayer = 1;
var stringFirstDice = "";
var stringSecondDice = "";
var diceSequence1 = "";
var diceSequence2 = "";
var counter = 0;
var player1DiceSeq = "";
var player2DiceSeq = "";

var firstDiceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var randomNumber = randomInteger + 1;
  console.log("this is the first dice " + randomNumber);
  return randomNumber;
};

var secondDiceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var randomNumber = randomInteger + 1;
  console.log("this is the second dice " + randomNumber);
  return randomNumber;
};

var getNumOfDiceMessage = function () {
  firstDiceNumber = firstDiceRoll();
  secondDiceNumber = secondDiceRoll();
  if (currPlayer == 1) {
    return (
      "Player 1, you rolled " +
      firstDiceNumber +
      " and " +
      secondDiceNumber +
      ". Please decide your dice sequence."
    );
  } else if (currPlayer == 2) {
    return (
      "Player 2, you rolled " +
      firstDiceNumber +
      " and " +
      secondDiceNumber +
      ". Please decide your dice sequence."
    );
  }
};

var doesSequenceStartsWithDiceOne = function (userDecisionOnDiceSequence) {
  // if input is second dice, then return false. otherwise it's true.
  if (userDecisionOnDiceSequence == SECOND_DICE) {
    console.log(userDecisionOnDiceSequence);
    console.log("this will run only when the input is second dice");
    return false;
  }
  console.log("current value of " + userDecisionOnDiceSequence);
  return true;
};

var getDiceSequenceMessage = function (input) {
  stringFirstDice = firstDiceNumber.toString();
  stringSecondDice = secondDiceNumber.toString();

  diceSequence1 = stringFirstDice + stringSecondDice;
  diceSequence2 = stringSecondDice + stringFirstDice;

  if (currPlayer == 1) {
    if (doesSequenceStartsWithDiceOne(input)) {
      console.log("value of " + doesSequenceStartsWithDiceOne() + "");

      player1DiceSeq = diceSequence1;
      return (
        "Player 1, you chose " +
        firstDiceNumber +
        " first. Your dice sequence is: " +
        diceSequence1
      );
    }
    if (!doesSequenceStartsWithDiceOne(input)) {
      console.log("value of " + doesSequenceStartsWithDiceOne() + "");
      console.log("if input is 2nd dice");

      player1DiceSeq = diceSequence2;
      return (
        "Player 1, you chose " +
        secondDiceNumber +
        " first. Your dice sequence is: " +
        diceSequence2
      );
    }
  }
  if (currPlayer == 2) {
    if (doesSequenceStartsWithDiceOne(input)) {
      player2DiceSeq = diceSequence1;
      return (
        "Player 2, you chose " +
        firstDiceNumber +
        " first. Your dice sequence is: " +
        diceSequence1
      );
    }
    if (!doesSequenceStartsWithDiceOne(input)) {
      console.log("if input is 2nd dice");
      player2DiceSeq = diceSequence2;
      return (
        "Player 2, you chose " +
        secondDiceNumber +
        " first. Your dice sequence is: " +
        diceSequence2
      );
    }
  }
};

var didPlayer1Win = function () {
  if (player2DiceSeq > player1DiceSeq) {
    return (
      "Congrats to Player 2! You beat Player 1 with the numbers " +
      player2DiceSeq +
      " to " +
      player1DiceSeq +
      ""
    );
  }
  return (
    "Congrats to Player 1! You beat Player 2 with the numbers " +
    player1DiceSeq +
    " to " +
    player2DiceSeq +
    ""
  );
};

var main = function (input) {
  // while the counter is LESS than 2, function runs.
  while (counter < 2) {
    if (gameMode == rollDice) {
      gameMode = decideSequence;
      return getNumOfDiceMessage();
    }
    if (gameMode == decideSequence) {
      // check if the sequence starts with dice one or not.
      var sequenceStartsWithDiceOne = doesSequenceStartsWithDiceOne(input);

      // define the variable of the output message.
      var outputMessage = getDiceSequenceMessage(sequenceStartsWithDiceOne);

      // if the sequence starts with dice one, get output message.
      if (sequenceStartsWithDiceOne) {
        myOutputValue = outputMessage;
      }

      // change the current player to player 2.
      currPlayer = 2;

      // change game mode back to rollDice mode.
      gameMode = rollDice;

      // get output message if the sequence starts with dice two.
      myOutputValue = outputMessage;

      // increment counter number
      counter += 1;
      console.log("this is current counter " + counter);
    }
    return myOutputValue;
  }
  if (counter == 2) {
    // if counter = 2, decide which player wins.
    var closingMessage = didPlayer1Win();

    // return the closing message.
    return closingMessage + "<br>" + "Thanks for playing.";
  }
};
