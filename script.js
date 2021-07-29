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
var counter = 0;
var stringFirstDice = "";
var stringSecondDice = "";
var diceSequence1 = "";
var diceSequence2 = "";
var player1DiceSeq = "";
var player2DiceSeq = "";
var sequenceStartsWithDiceOne = "";

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

var doesSequenceStartsWithDiceOne = function (playerDecisionOnDiceSequence) {
  // if input is second dice, then return false. otherwise it's true.
  if (playerDecisionOnDiceSequence == SECOND_DICE) {
    console.log(playerDecisionOnDiceSequence);
    return false;
  }
  return true;
};

var getDiceSequenceMessage = function (playerDecisionOnDiceSequence) {
  sequenceStartsWithDiceOne = playerDecisionOnDiceSequence;

  stringFirstDice = firstDiceNumber.toString();
  stringSecondDice = secondDiceNumber.toString();

  diceSequence1 = stringFirstDice + stringSecondDice;
  diceSequence2 = stringSecondDice + stringFirstDice;

  if (currPlayer == 1) {
    if (sequenceStartsWithDiceOne) {
      player1DiceSeq = diceSequence1;
      return (
        "Player 1, you chose " +
        firstDiceNumber +
        " first. Your dice sequence is: " +
        diceSequence1
      );
    } else if (!sequenceStartsWithDiceOne) {
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
    if (sequenceStartsWithDiceOne) {
      player2DiceSeq = diceSequence1;
      return (
        "Player 2, you chose " +
        firstDiceNumber +
        " first. Your dice sequence is: " +
        diceSequence1
      );
    }
    if (!sequenceStartsWithDiceOne) {
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
      "Congrats to Player 2! <br> You beat Player 1 with the numbers " +
      player2DiceSeq +
      " to " +
      player1DiceSeq +
      "."
    );
  }
  return (
    "Congrats to Player 1! <br> You beat Player 2 with the numbers " +
    player1DiceSeq +
    " to " +
    player2DiceSeq +
    "."
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

      var outputMessage = getDiceSequenceMessage(sequenceStartsWithDiceOne);

      // if the sequence starts with dice one, get output message.
      if (sequenceStartsWithDiceOne) {
        myOutputValue = outputMessage;
      }

      currPlayer = 2;

      gameMode = rollDice;

      myOutputValue = outputMessage;

      counter += 1;
    }
    return myOutputValue;
  }
  if (counter == 2) {
    var closingMessage = didPlayer1Win();
    return closingMessage + "<br>" + "Thanks for playing.";
  }
};
