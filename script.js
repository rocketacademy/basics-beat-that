/*There are 2 players and players take turns.

When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.

The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.

After both players have rolled and chosen dice order, the player with the higher combined number wins.*/

/* Pseudo code for basic project 2
when click submit, roll 2 dice, output the 2 dice roll. (first submit)

player 1 pick 1st dice order by inputting 1 or 2 (second submit)

concat the player guess + remaining as dice roll result

next player 2

repeat dice roll (third submit)

repeat order (fourth submit)

compare results, higher result win
*/

// GLOBAL VARIABLES
var mode = "init";
var numberOfPlayers = 4;
var players = [];
var currentIndex = 0;
var myOutputValue = "";

var rollDice = function () {
  return Math.floor(Math.random() * 6) + 1; // expect 1 to 6 inclusive
};

// initialise players state
var startGame = function () {
  for (var i = 0; i < numberOfPlayers; i++) {
    players[i] = { player: i + 1, diceOne: rollDice(), diceTwo: rollDice() };
    console.log("function: startGame");
    console.log(players[i]);
  }
  return;
};

// var orderDiceByHighestValue = function () {
//   for (var i = 0; i < numberOfPlayers; i++) {
//     var diceOne = players[i]["diceOne"];
//     var diceTwo = players[i]["diceTwo"];

//     var orderedDice = Number(String(diceOne) + String(diceTwo));
//     if (diceOne < diceTwo) {
//       orderedDice = Number(String(diceTwo) + String(diceOne));
//     }
//     players[i]["finalDice"] = orderedDice;
//     console.log("function: orderDiceByHighestValue");
//     console.log(players[i]);
//   }
// };

var orderDice = function (userInput) {
  diceOne = players[currentIndex].diceOne;
  diceTwo = players[currentIndex].diceTwo;
  // default input = 1
  var orderedDice = Number(String(diceOne) + String(diceTwo));
  if (userInput === "2") {
    orderedDice = Number(String(diceTwo) + String(diceOne));
  }
  return orderedDice;
};

var evaluatePlayers = function () {
  var currentMax = 0;
  var winner = 0;
  for (var i = 0; i < numberOfPlayers; i++) {
    if (players[i].orderedDice > currentMax) {
      currentMax = players[i].orderedDice;
      winner = players[i]["player"];
    }
  }
  console.log(`Max: ${currentMax}    Winner: ${winner}`);
  myOutputValue = `Congratulations Player ${winner}!
  <br>
  You got the highest number ${currentMax}.`;
  return;
};

var playGame = function (input) {
  // loop thru the players, requesting for input
  // remember last player and resume to last player + 1 when submit
  while (currentIndex < numberOfPlayers) {
    // player choose 1 or 2
    userInput = input;
    // TODO - include error check
    players[currentIndex]["orderedDice"] = orderDice(userInput);
    console.log(players[currentIndex]);
    currentIndex += 1;
    return;
  }
};

var showDiceMessage = function () {
  var player = players[currentIndex].player;
  var diceOne = players[currentIndex].diceOne;
  var diceTwo = players[currentIndex].diceTwo;
  var permutationOne = String(diceOne) + String(diceTwo);
  var permutationTwo = String(diceTwo) + String(diceOne);

  myOutputValue = `Welcome Player ${player}.
  <br>
  You rolled ${diceOne} for Dice 1 and ${diceTwo} for Dice 2.
  <br>
  Choose the order of the dice.
  <br>
  Input 1 for ${permutationOne}.
  <br>
  Input 2 for ${permutationTwo}.`;
  return;
};

var showOrderMessage = function (userInput) {
  var player = players[currentIndex - 1].player;
  var nextPlayer = players[currentIndex].player;
  var playerDiceChoice = players[currentIndex - 1].orderedDice;

  myOutputValue = `Player ${player}, you chose Dice ${userInput} first.
  <br>
  Your number is ${playerDiceChoice}.
  <br>
  It is now Player ${nextPlayer}'s turn.`;
  return;
};

var reset = function () {
  // reset conditions to initial
  currentIndex = 0;
  mode = "init";
};

var main = function (input) {
  if (mode == "init") {
    startGame();
    showDiceMessage();
    mode = "play and order";
    return myOutputValue;
  }

  if (mode == "play and order") {
    playGame(input);

    if (currentIndex == numberOfPlayers) {
      evaluatePlayers();
      reset();
      return myOutputValue;
    }

    showOrderMessage(input);
    mode = "show";
    return myOutputValue;
  }

  if (mode == "show") {
    showDiceMessage();
    mode = "play and order";
    return myOutputValue;
  }
};
