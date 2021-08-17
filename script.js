// create variable to store string values.
var FIRST_DICE = "first dice";
var SECOND_DICE = "second dice";
var WELCOME_MSG = "welcome the players";
var ROLL_DICE = "roll the dice";
var DECIDE_SEQUENCE = "deciding the dice sequence";

// set default game mode to roll dice mode.
var gameMode = WELCOME_MSG;

// create global variable to store dice numbers
var firstDiceNumber = 0;
var secondDiceNumber = 0;

// set default player to player 1
var currPlayer = 1;

// create var for players dice sequence
var diceSequence1;
var diceSequence2;

// create var for each players dice sequence
var player1DiceSeq = 0;
var player2DiceSeq = 0;

// each players' score starts at 0
var player1Score = 0;
var player2Score = 0;

// generate dice numbers
var diceRoll = function () {
  var randomNumber = Math.ceil(Math.random() * 6);
  return randomNumber;
};

var getNumOfDiceMessage = function () {
  // create an array to store 2 dice numbers
  var diceNumber = [diceRoll(), diceRoll()];
  console.log(diceNumber);

  // assign dice rolls to their respective variable.
  firstDiceNumber = diceNumber[0];
  secondDiceNumber = diceNumber[1];

  // write an output message to inform each player of their rolled dice numbers.
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
  // decide whether dice sequence starts with dice one or not.
  sequenceStartsWithDiceOne = playerDecisionOnDiceSequence;

  // change dice's number value to string value.
  var stringFirstDice = firstDiceNumber.toString();
  var stringSecondDice = secondDiceNumber.toString();

  // string the dice numbers together to create the dice sequence.
  diceSequence1 = stringFirstDice + stringSecondDice;
  diceSequence2 = stringSecondDice + stringFirstDice;

  // when curr player is 1, define a msg to return when player chooses their dice sequence.
  // assign the chosen dice sequence to respective player's dice sequence and curr score.
  if (currPlayer == 1) {
    if (sequenceStartsWithDiceOne) {
      player1DiceSeq = diceSequence1;
      player1CurrScore = diceSequence1;
      return (
        "Player 1, you chose " +
        firstDiceNumber +
        " first. Your dice sequence is: " +
        diceSequence1 +
        ". <br> Now it's Player 2's turn."
      );
    } else {
      player1DiceSeq = diceSequence2;
      player1CurrScore = diceSequence2;
      return (
        "Player 1, you chose " +
        secondDiceNumber +
        " first. Your dice sequence is: " +
        diceSequence2 +
        ". <br> Now it's Pslayer 2's turn."
      );
    }
  }
  if (currPlayer == 2) {
    // assign the chosen dice sequence to player 2's dice sequence and curr score.
    if (sequenceStartsWithDiceOne) {
      player2DiceSeq = diceSequence1;
      player2CurrScore = diceSequence1;
      return (
        "Player 2, you chose " +
        firstDiceNumber +
        " first. Your dice sequence is: " +
        diceSequence1 +
        "."
      );
    }
    if (!sequenceStartsWithDiceOne) {
      player2DiceSeq = diceSequence2;
      player2CurrScore = diceSequence2;
      return (
        "Player 2, you chose " +
        secondDiceNumber +
        " first. Your dice sequence is: " +
        diceSequence2 +
        "."
      );
    }
  }
};

// decide which player wins
// if player 2 wins, return a false. Otherwise, return a true.
var didPlayer1Win = function () {
  if (player2Score > player1Score) {
    return false;
  }
  return true;
};

// update players' score.
var updateRunningScore = function (player1CurrScore, player2CurrScore) {
  player1Score = Number(player1Score) + Number(player1CurrScore);
  player2Score = Number(player2Score) + Number(player2CurrScore);
};

// create a function to reset game.
var resetGame = function () {
  currPlayer = 1;
  gameMode = ROLL_DICE;
};

var main = function (input) {
  if (gameMode == WELCOME_MSG) {
    gameMode = ROLL_DICE;
    return "Welcome players! <br> Prepare yourself and click 'Submit' to start!";
  }
  // game starts with player 1 and get username mode
  currPlayer == 1;
  if (gameMode == ROLL_DICE) {
    // create variable to store the message that tells player their rolled dice numbers.
    var numOfDiceMessage = getNumOfDiceMessage();

    // after player decides their dice sequence, game mode changes to decide sequence.
    gameMode = DECIDE_SEQUENCE;

    return numOfDiceMessage;
  }
  if (gameMode == DECIDE_SEQUENCE) {
    // check if the sequence starts with dice one or not.
    var sequenceStartsWithDiceOne = doesSequenceStartsWithDiceOne(input);

    // create variable to store the message that tells player their chosen dice sequence.
    var outputMessage = getDiceSequenceMessage(sequenceStartsWithDiceOne);

    // get message that tells the player their chosen dice sequence.
    if (sequenceStartsWithDiceOne) {
      myOutputValue = outputMessage;
    }
    if (currPlayer == 1) {
      // change curr player to 2
      currPlayer = 2;

      // change game mode back to roll dice mode.
      gameMode = ROLL_DICE;

      return outputMessage;
    }
  }

  // update each players' running score
  updateRunningScore(player1CurrScore, player2CurrScore);

  if ((currPlayer = 2)) {
    // reset game to run the same function for player 2
    resetGame();

    // if player 1 curr score == player 2 curr score, it's a tie.
    // else, evaluate the boolean value of whether player 1 win or not.
    // if value == false, player 2 wins. Else, player 1 wins.
    if (player1CurrScore == player2CurrScore) {
      return (
        "It's a tie! <br> Player 1's running score is " +
        player1Score +
        " and player 2's running score is " +
        player2Score +
        "."
      );
    } else if (!didPlayer1Win()) {
      return (
        "Player 2 chose " +
        player2DiceSeq +
        " and player 1 chose " +
        player1DiceSeq +
        ". <br> Congrats to Player 2! You beat Player 1 with the running score of " +
        player2Score +
        " to " +
        player1Score +
        "."
      );
    } else {
      return (
        "Player 1 chose " +
        player1DiceSeq +
        " and player 2 chose " +
        player2DiceSeq +
        ". <br> Congrats to Player 1! You beat Player 2 with the running score of " +
        player1Score +
        " to " +
        player2Score +
        "."
      );
    }
  }
};
