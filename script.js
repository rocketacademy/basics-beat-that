// Variables to store player 1 and player 2's scores:
var P1TotalScore = 0;
var P2TotalScore = 0;

// To track game modes & statuses
var MODE_CHOOSE_GAME_MODE = `WAITING_FOR_USER_TO_CHOOSE_GAME_MODE`;
var EITHER_HIGHEST_OR_LOWEST_WINS = `EITHER HIGHEST OR LOWEST WINS`;
var MODE_HIGHER_NUMBER = `higher number`;
var MODE_LOWER_NUMBER = `lower number`;
var MODE_PLAYER_1_ROLL_DICE = `WAITING_FOR_PLAYER_1_TO_ROLL_DICE`;
var MODE_PLAYER_1_PICK_ORDER = `WAITING_FOR_PLAYER_1_TO_PICK_DICE_ORDER`;
var MODE_PLAYER_2_ROLL_DICE = `WAITING_FOR_PLAYER_2_TO_ROLL_DICE`;
var MODE_PLAYER_2_PICK_ORDER = `WAITING_FOR_PLAYER_2_TO_PICK_DICE_ORDER`;
var MODE_WINNER = `SHOW_WINNER`;

//Current game mode
var mode = MODE_CHOOSE_GAME_MODE;
var theModeUserInput = EITHER_HIGHEST_OR_LOWEST_WINS;

// Function for leaderboard for Mode: Higher number wins:
var leaderBoardHigher = function () {
  if (Number(P1TotalScore) > Number(P2TotalScore)) {
    myOutputValue = `Player 1<br>Player 2`;
  } else if (Number(P2TotalScore) > Number(P1TotalScore)) {
    myOutputValue = `Player 2<br>Player 1`;
  } else if (Number(P1TotalScore) == Number(P2TotalScore)) {
    myOutputValue = `Draw`;
  }
  return myOutputValue;
};

// Function for leaderboard for Mode: Lower number wins:
var leaderBoardLower = function () {
  if (Number(P1TotalScore) < Number(P2TotalScore)) {
    myOutputValue = `Player 1<br>Player 2`;
  } else if (Number(P2TotalScore) < Number(P1TotalScore)) {
    myOutputValue = `Player 2<br>Player 1`;
  } else if (Number(P1TotalScore) == Number(P2TotalScore)) {
    myOutputValue = `Draw`;
  }
  return myOutputValue;
};

var main = function (input) {
  var P1RandomDiceRoll1 = diceRoll();
  var P1RandomDiceRoll2 = diceRoll();
  var leaderBoardRanksHigher = leaderBoardHigher();
  var leaderBoardRanksLower = leaderBoardLower();

  // User to choose game mode
  if (mode == MODE_CHOOSE_GAME_MODE) {
    console.log(mode);
    var myOutputValue = `Hello! Welcome to the game of BEAT THAT.<br><br>Please select your game mode preference.<br><br>Choose either "higher number" or "lower number". <br><br>Good luck!!`;
    mode = MODE_PLAYER_1_ROLL_DICE;
    console.log(mode);
  } else if (input == `higher number`) {
    theModeUserInput = MODE_HIGHER_NUMBER;
    console.log(theModeUserInput);
    myOutputValue = `You have selected the higher number game mode.<br><br>Player 1, please click submit to roll the dice.`;
    mode = MODE_PLAYER_1_ROLL_DICE;
  } else if (input == `lower number`) {
    theModeUserInput = MODE_LOWER_NUMBER;
    console.log(theModeUserInput);
    myOutputValue = `You have selected the lower number game mode.<br><br>Player 1, please click submit to roll the dice.`;
    mode = MODE_PLAYER_1_ROLL_DICE;
  }

  // Player 1's turn
  else if (
    mode == MODE_PLAYER_1_ROLL_DICE &&
    (theModeUserInput == MODE_HIGHER_NUMBER ||
      theModeUserInput == MODE_LOWER_NUMBER)
  ) {
    console.log(mode);
    console.log(theModeUserInput);
    P1DicePermutation1 = P1RandomDiceRoll1 * 10 + P1RandomDiceRoll2;
    P1DicePermutation2 = P1RandomDiceRoll2 * 10 + P1RandomDiceRoll1;
    var myOutputValue = `Player 1, you have rolled ${P1RandomDiceRoll1} for your first dice and ${P1RandomDiceRoll2} for your second dice.<br><br>Choose the order of your dice. If you would like the computer to arrange for you the order automatically, please enter "auto".`;
    mode = MODE_PLAYER_1_PICK_ORDER;
  } else if (
    mode == MODE_PLAYER_1_PICK_ORDER &&
    (theModeUserInput == MODE_HIGHER_NUMBER ||
      theModeUserInput == MODE_LOWER_NUMBER)
  ) {
    console.log(mode);
    console.log(input);
    if (Number(input) == P1DicePermutation1) {
      console.log(P1DicePermutation1);
      myOutputValue = `Player 1, you have arranged your dice in this order: ${P1DicePermutation1}.<br><br>Player 2, please click submit to roll your dice.`;
      P1DiceOrder = Number(input);
    }
    if (Number(input) == P1DicePermutation2) {
      console.log(P1DicePermutation2);
      myOutputValue = `Player 1, you have arranged your dice in this order: ${P1DicePermutation2}.<br><br>Player 2, please click submit to roll your dice.`;
      P1DiceOrder = Number(input);
    }

    if (input == `auto`) {
      if (
        theModeUserInput == MODE_HIGHER_NUMBER &&
        P1DicePermutation1 > P1DicePermutation2
      ) {
        myOutputValue = `Player 1, we have automatically arranged your dice in this order: ${P1DicePermutation1}.<br><br>Player 2, please click submit to roll your dice.`;
        P1DiceOrder = Number(P1DicePermutation1);
      } else if (
        theModeUserInput == MODE_HIGHER_NUMBER &&
        P1DicePermutation2 > P1DicePermutation1
      ) {
        myOutputValue = `Player 1, we have automatically arranged your dice in this order: ${P1DicePermutation2}.<br><br>Player 2, please click submit to roll your dice.`;
        P1DiceOrder = Number(P1DicePermutation2);
      }
      if (
        theModeUserInput == MODE_LOWER_NUMBER &&
        P1DicePermutation1 < P1DicePermutation2
      ) {
        myOutputValue = `Player 1, we have automatically arranged your dice in this order: ${P1DicePermutation1}.<br><br>Player 2, please click submit to roll your dice.`;
        P1DiceOrder = Number(P1DicePermutation1);
      } else if (
        theModeUserInput == MODE_LOWER_NUMBER &&
        P1DicePermutation2 < P1DicePermutation1
      ) {
        myOutputValue = `Player 1, we have automatically arranged your dice in this order: ${P1DicePermutation2}.<br><br>Player 2, please click submit to roll your dice.`;
        P1DiceOrder = Number(P1DicePermutation2);
      }
    }
    P1DiceOrder = P1DiceOrder;
    console.log(P1DiceOrder);
    P1TotalScore = P1TotalScore + P1DiceOrder;
    mode = MODE_PLAYER_2_ROLL_DICE;
  } else if (
    mode == MODE_PLAYER_2_ROLL_DICE &&
    (theModeUserInput == MODE_HIGHER_NUMBER ||
      theModeUserInput == MODE_LOWER_NUMBER)
  ) {
    var P2RandomDiceRoll1 = diceRoll();
    var P2RandomDiceRoll2 = diceRoll();
    P2DicePermutation1 = P2RandomDiceRoll1 * 10 + P2RandomDiceRoll2;
    P2DicePermutation2 = P2RandomDiceRoll2 * 10 + P2RandomDiceRoll1;
    var myOutputValue = `Player 2, you have rolled ${P2RandomDiceRoll1} for your first dice and ${P2RandomDiceRoll2} for your second dice.<br><br>Choose the order of your dice. If you would like the computer to arrange for you the order automatically, please enter "auto".`;
    mode = MODE_PLAYER_2_PICK_ORDER;
  } else if (
    mode == MODE_PLAYER_2_PICK_ORDER &&
    (theModeUserInput == MODE_HIGHER_NUMBER ||
      theModeUserInput == MODE_LOWER_NUMBER)
  ) {
    console.log(mode);
    if (Number(input) == P2DicePermutation1) {
      console.log(P2DicePermutation1);
      myOutputValue = `Player 2, you have arranged your dice in this order: ${P2DicePermutation1}.<br><br>Click submit to see who won!`;
      P2DiceOrder = Number(input);
    }
    if (Number(input) == P2DicePermutation2) {
      console.log(P2DicePermutation2);
      myOutputValue = `Player 2, you have arranged your dice in this order: ${P2DicePermutation2}.<br><br>Click submit to see who won!`;
      P2DiceOrder = Number(input);
    }
    if (input == `auto`) {
      if (
        theModeUserInput == MODE_HIGHER_NUMBER &&
        P2DicePermutation1 > P2DicePermutation2
      ) {
        myOutputValue = `Player 2, we have automatically arranged your dice in this order: ${P2DicePermutation1}.<br><br>Click submit to see who won!`;
        P2DiceOrder = Number(P2DicePermutation1);
      } else if (
        theModeUserInput == MODE_HIGHER_NUMBER &&
        P2DicePermutation2 > P2DicePermutation1
      ) {
        myOutputValue = `Player 2, we have automatically arranged your dice in this order: ${P2DicePermutation2}.<br><br>Click submit to see who won!`;
        P2DiceOrder = Number(P2DicePermutation2);
      }
      if (
        theModeUserInput == MODE_LOWER_NUMBER &&
        P2DicePermutation1 < P2DicePermutation2
      ) {
        myOutputValue = `Player 2, we have automatically arranged your dice in this order: ${P2DicePermutation1}.<br><br>Click submit to see who won!`;
        P2DiceOrder = Number(P2DicePermutation1);
      } else if (
        theModeUserInput == MODE_LOWER_NUMBER &&
        P2DicePermutation2 < P2DicePermutation1
      ) {
        myOutputValue = `Player 2, we have automatically arranged your dice in this order: ${P2DicePermutation2}.<br><br>Click submit to see who won!`;
        P2DiceOrder = Number(P2DicePermutation2);
      }
    }
    P2DiceOrder = P2DiceOrder;
    P2TotalScore = P2TotalScore + P2DiceOrder;
    mode = MODE_WINNER;
  } else if (mode == MODE_WINNER && theModeUserInput == MODE_HIGHER_NUMBER) {
    console.log(theModeUserInput);
    if (P1DiceOrder > P2DiceOrder) {
      console.log(P1DiceOrder);
      console.log(P2DiceOrder);
      myOutputValue = `Player 1's number is ${P1DiceOrder}.<br><br>Player 2's number is ${P2DiceOrder}.<br><br>Player 1, you won!<br><br> Player 1's total score: ${P1TotalScore}<br><br>Player 2's total score: ${P2TotalScore}<br><br>Leaderboard rank:<br>${leaderBoardRanksHigher}`;
    }
    if (P2DiceOrder > P1DiceOrder) {
      myOutputValue = `Player 1's number is ${P1DiceOrder}.<br><br>Player 2's number is ${P2DiceOrder}.<br><br>Player 2, you won!<br><br> Player 1's total score: ${P1TotalScore}<br><br>Player 2's total score: ${P2TotalScore}<br><br>Leaderboard rank:<br>${leaderBoardRanksHigher}`;
    }
    mode = MODE_PLAYER_1_ROLL_DICE;
  } else if (mode == MODE_WINNER && theModeUserInput == MODE_LOWER_NUMBER) {
    console.log(theModeUserInput);
    if (P1DiceOrder < P2DiceOrder) {
      console.log(P1DiceOrder);
      console.log(P2DiceOrder);
      myOutputValue = `Player 1's number is ${P1DiceOrder}.<br><br>Player 2's number is ${P2DiceOrder}.<br><br>Player 1, you won!<br><br> Player 1's total score: ${P1TotalScore}<br><br>Player 2's total score: ${P2TotalScore}<br><br>Leaderboard rank:<br>${leaderBoardRanksLower}`;
    }
    if (P2DiceOrder < P1DiceOrder) {
      myOutputValue = `Player 1's number is ${P1DiceOrder}.<br><br>Player 2's number is ${P2DiceOrder}.<br><br>Player 2, you won!<br><br> Player 1's total score: ${P1TotalScore}<br><br>Player 2's total score: ${P2TotalScore}<br><br>Leaderboard rank:<br>${leaderBoardRanksLower}`;
    }
    mode = MODE_PLAYER_1_ROLL_DICE;
  }

  return myOutputValue;
};

// To randomly generate a dice number from 1 to 6:
var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

// // Variable Number of Dice Game

// var Player1Array = [];
// var Player2Array = [];
// var counter = 0;
// var Player1DiceCounter = 0;
// var Player2DiceCounter = 0;

// // To track game modes and statues
// var MODE_STARTING_GAME = `START`;
// var MODE_PLAYER_1_CHOOSE_DICE = `PLAYER_1_TO_CHOOSE_NO_OF_DICE`;
// var MODE_ROLL_DICE = `ROLL_DICE`;
// var MODE_ARRANGE_DICE = `ARRANGE_DICE_IN_ASCENDING_ORDER`;
// var MODE_SHOW_WINNER = `SHOW_WINNER`;

// //Current game mode
// var mode = MODE_STARTING_GAME;

// var main = function (input) {
//   var myOutputValue = ``;

//   // Ask player 1 how many dice he wants
//   if (mode == MODE_STARTING_GAME) {
//     console.log(mode);
//     myOutputValue = `Player 1, please select how many dice you would like to play with. Player 2 will also roll the same number of dice.`;
//     mode = MODE_PLAYER_1_CHOOSE_DICE;
//   }
//   // Ask user to click submit to roll dice
//   else if (mode == MODE_PLAYER_1_CHOOSE_DICE) {
//     console.log(mode);
//     var numberOfDice = input;
//     console.log(numberOfDice);
//     myOutputValue = `Player 1, you have entered ${numberOfDice} number of dice. Please click Submit to begin rolling.<br><br>Good luck!`;
//     mode = MODE_ROLL_DICE;
//   }
//   // While loop to roll the dice and number of times for player 1 and player 2
//   while (
//     mode == MODE_ROLL_DICE &&
//     Player1DiceCounter < numberOfDice &&
//     Player2DiceCounter < numberOfDice
//   ) {
//     var P1RandomDiceRoll = diceRoll();
//     console.log(P1RandomDiceRoll);
//     Player1DiceCounter = Player1DiceCounter + 1;
//     console.log(`Player1DiceCounter = ${Player1DiceCounter}`);
//     Player1Array.push(P1RandomDiceRoll);
//     console.log(Player1Array);

//     var P2RandomDiceRoll = diceRoll();
//     console.log(P2RandomDiceRoll);
//     Player2DiceCounter = Player2DiceCounter + 1;
//     console.log(`Player2DiceCounter = ${Player2DiceCounter}`);
//     Player2Array.push(P2RandomDiceRoll);
//     console.log(Player2Array);
//   }
//   // Once exit the while loop, tell user all of his dice rolls. Ask user to click submit to auto arrange
//   if (
//     mode == MODE_ROLL_DICE &&
//     Player1DiceCounter >= numberOfDice &&
//     Player2DiceCounter >= numberOfDice
//   ) {
//     myOutputValue = `Player 1, you have rolled: ${Player1Array}.<br><br>And Player 2 has rolled: ${Player2Array}.<br><br>Please click submit to automatically arrange the dice in ascending order.`;
//     mode = MODE_ARRANGE_DICE;
//     console.log(mode);
//   }
//   // To auto arrange dice in ascending order and tell user who wins
//   else if (mode == MODE_ARRANGE_DICE) {
//     // To sort the dice in ascending order
//     var Player1ArrayInAscOrder = Player1Array.sort(function (a, b) {
//       return b - a;
//     });
//     var Player2ArrayInAscOrder = Player2Array.sort(function (a, b) {
//       return b - a;
//     });

//     // To join all the individual dice roll numbers into a single large number, in ascending order
//     var Player1ArrayInIntegers = +Player1ArrayInAscOrder.join("");
//     console.log(`P1 rolls in integers: ${Player1ArrayInIntegers}`);
//     var Player2ArrayInIntegers = +Player2ArrayInAscOrder.join("");
//     console.log(`P2 rolls in integers: ${Player2ArrayInIntegers}`);

//     mode = MODE_SHOW_WINNER;
//     console.log(mode);
//     // To tell user who wins the game
//     if (Player1ArrayInIntegers > Player2ArrayInIntegers) {
//       var whoWinsMessage = `Player 1 wins!`;
//       console.log(whoWinsMessage);
//     } else {
//       whoWinsMessage = `Player 2 wins!`;
//     }

//     myOutputValue = `Player 1, here is your dice arranged in ascending order: ${Player1Array.sort(
//       function (a, b) {
//         return b - a;
//       }
//     )}, hence your value is ${Player1ArrayInIntegers}.<br><br> Here is Player 2's dice arranged in ascending order: ${Player2Array.sort(
//       function (a, b) {
//         return b - a;
//       }
//     )}, hence Player 2's value is ${Player2ArrayInIntegers}.<br><br>${whoWinsMessage}`;

//     Player1Array = [];
//     Player2Array = [];
//     Player1DiceCounter = 0;
//     Player2DiceCounter = 0;
//     mode = MODE_STARTING_GAME;
//   }

//   return myOutputValue;
// };

// // To randomly generate a dice number from 1 to 6:
// var diceRoll = function () {
//   var randomDecimal = Math.random() * 6;
//   var randomInteger = Math.floor(randomDecimal);
//   var diceNumber = randomInteger + 1;
//   return diceNumber;
// };
