// There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.

var currentGameMode = "Waiting for players..";
console.log(currentGameMode);

// helper functions
var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1; // Add 1 to get valid dice rolls of 1 through 6 inclusive.
  return diceNumber;
};

var generateDiceOrder = function () {
  var randomDecimal = Math.random() * 2;
  var randomInteger = Math.floor(randomDecimal);
  var diceOrder = randomInteger + 1; // Add 1 to get valid dice order from 1 to 2 inclusive
  return diceOrder;
};

var main = function (input) {
  var myOutputValue = `Choose 1 or 2 for the order only!`;

  if (currentGameMode == "Waiting for players..") {
    // switch the mode

    var diceOne = diceRoll();
    console.log("number for dice one", diceOne);
    var diceTwo = diceRoll();
    console.log("number for dice two", diceTwo);
    currentGameMode = "Player 1 has rolled the dice";
    console.log(currentGameMode);

    return `Welcome Player 1! You rolled ${diceOne} for Dice 1 and ${diceTwo} for Dice 2. Choose the order of the dice.`;
  } else if (currentGameMode == "Player 1 has rolled the dice") {
    // current mode then no more dicerolls

    var chooseDiceOrder = generateDiceOrder();
    console.log("dice order", chooseDiceOrder);

    if (chooseDiceOrder == "1") {
      currentGameMode = "Player 1 has chosen dice order. Player 2 next";
      console.log(currentGameMode);

      return `You have chosen Dice 1 to go first. Your number is ${diceOne}${diceTwo}. Now is Player 2's turn!`;
    }

    if (chooseDiceOrder == "2") {
      currentGameMode = "Player 1 has chosen dice order. Player 2 next";
      console.log(currentGameMode);

      return `You have chosen Dice 2 to go first. Your number is ${diceTwo}${diceOne}. Now is Player 2's turn!`;
    }

    return myOutputValue;
  }

  if ((currentGameMode = "Player 2 has rolled the dice!")) {
    currentGameMode = "Player 2 has rolled the dice!";
    console.log(currentGameMode);
    var myOutputValue = `Welcome Player 2! You rolled ${diceOne} for Dice 1 and ${diceTwo} for Dice 2. Choose the order of the dice.`;

    if (currentGameMode == "Player 2 has rolled the dice!") {
      if (input == 1) {
        currentGameMode = "Player 2 has chosen dice order";
        myOutputValue = `You have chosen Dice 1 to go first. Your number is ${diceOne}${diceTwo}.`;
      }

      if (input == 2) {
        currentGameMode = "Player 2 has chosen dice order";
        myOutputValue = `You have chosen Dice 2 to go first. Your number is ${diceTwo}${diceOne}.`;
      }
    }
    return myOutputValue;
  }
};
