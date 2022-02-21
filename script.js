// Player 1 rolls 2 dice =>
// - game mode in dice roll
// - create 2 random dice roll numbers
// - game mode changes to choose order of dice number
// - output = Dice 1 rolled A and Dice 2 rolled B, please indicate "Dice 1" or "Dice 2" to be the first numeral of the combined number

// Player 1 chooses order of dice number =>
// - game mode is in choose order of dice number
// - input to be "Dice 1" or "Dice 2"
// - output = You have chosen Dice X to be the first numeral of the combined number. Your combined number is XX

// Player 2 repeat steps. Put game logic into a loop

// If Player 1 combined > Player 2 combined, Player 1 wins. If Player 1 combined < Player 2 combined, Player 2 wins. If Player 1 combined = Player 2 combined, they draw. Restart game.

// Player 1 roll dice -> Player 1 choose dice order -> Player 2 roll dice -> Player 2 choose dice order. Store choices and compare to determine winner.

//Game modes: instructions, play the game, player 1 generate dice rolls, player 1 choose dice order, player 2 generate dice rolls, player 2 choose dice order
//Functions: generate dice rolls, choose dice order

var gameMode = "instructions";
var INSTRUCTIONS = "instructions";
var DICEROLL = "dice roll";
var CHOOSEDICEORDER = "choose order of dice number";
var diceRoll1 = 0;
var diceRoll2 = 0;
var counter = 0;
var player1CombiArray = [];
var player2CombiArray = [];

var generateDiceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal) + 1;
  return randomInteger;
};

var generateDiceOrder = function (input) {
  if (input == "Dice 1") {
    console.log("diceRoll1", diceRoll1);
    console.log("diceRoll2", diceRoll2);
    var combinedNum = diceRoll1 + "" + diceRoll2;
    console.log("combined num", combinedNum);
    player1CombiArray.push(combinedNum);
    return combinedNum;
  }
  if (input == "Dice 2") {
    var combinedNum = toString(diceRoll2) + toString(diceRoll1);
    console.log("combined num", combinedNum);
    player1CombiArray.push(combinedNum);
    return combinedNum;
  }
};

// var playTheGame = function (input) {
//   var myOutputValue = "hello...";
//   console.log(gameMode);
//   gameMode = "choose winner";
// } else if (gameMode == "choose winner") {
//   if (Number(player1CombiArray[0]) > Number(player2CombiArray[0])) {
//     myOutputValue = "Player 1 wins this round!";
//   }
//   if (Number(player2CombiArray[0]) > Number(player1CombiArray[0])) {
//     myOutputValue = "Player 2 wins this round!";
//   }
//   }
//   return myOutputValue;
// };

var main = function (input) {
  var myOutputValue = "";

  if (gameMode == INSTRUCTIONS) {
    gameMode = DICEROLL;
    myOutputValue =
      "Welcome to the game of Beat That!" +
      " Please click submit to begin rolling the dice!";
  } else if (gameMode == DICEROLL) {
    diceRoll1 = generateDiceRoll();
    diceRoll2 = generateDiceRoll();
    console.log("diceRoll1", diceRoll1);
    console.log("diceRoll2", diceRoll2);
    gameMode = CHOOSEDICEORDER;
    myOutputValue =
      "You have rolled " +
      diceRoll1 +
      " and " +
      diceRoll2 +
      ". <br>" +
      "Please choose 'Dice 1' or 'Dice 2' to be the first numeral of your combined number";
  } else if (gameMode == CHOOSEDICEORDER) {
    var diceOrder = generateDiceOrder(input);
    myOutputValue =
      "You have chosen " +
      input +
      "to be the first numeral. <br>" +
      "Your combined number is " +
      diceOrder +
      "<br>" +
      "<br>" +
      "Player 1 - " +
      player1CombiArray[0];
  }

  return myOutputValue;
};
