var playerOneRunningCount = 0;
var playerTwoRunningCount = 0;
var winningIndex = 0;
var gameState = 0;
//can use array of array but so lazy to change again
var p1DiceArray = [];
var p1DiceOrdered = [];
var p2DiceArray = [];
var p2DiceOrdered = [];
var p1DiceOrder = [];
var p2DiceOrder = [];
var arrayOfPlayers = [];

var main = function (input) {
  var myOutputValue = "hello world";
  //Initialise
  if (gameState == 0) {
    myOutputValue = "Let's start the game!";
    gameState = 1;
    return myOutputValue;
  }
  //Player 1 rolls and output the rolls
  if (gameState == 1) {
    //roll dices and push into player's array
    for (var i = 0; i < noOfDices; i += 1) {
      p1DiceArray.push(rollDice());
    }
    myOutputValue = outputDiceroll();
    gameState = 11;
    return myOutputValue;
  }
  //Record Player 1 dice order
  if (gameState == 11) {
    var diceOrder = orderDiceV2(input);
    var index = 0;
    while (index < diceOrder.length) {
      p1DiceOrdered.push(p1DiceArray[diceOrder[index]]);
      index += 1;
    }
    arrayOfPlayers.push(p1DiceOrdered);
    myOutputValue = outputDiceOrder(p1DiceOrdered);
    gameState = 2;
    return myOutputValue;
  }
  //Player two's turn
  if (gameState == 2) {
    //roll dices and push into player's array
    for (var i = 0; i < noOfDices; i += 1) {
      p2DiceArray.push(rollDice());
    }
    myOutputValue = outputDiceroll();
    gameState = 22;
    return myOutputValue;
  }
  if (gameState == 22) {
    var diceOrder = orderDiceV2(input);
    var index = 0;
    while (index < diceOrder.length) {
      p2DiceOrdered.push[p2DiceArray[diceOrder[index]]];
      index += 1;
    }
    myOutputValue = outputDiceOrder(p2DiceOrdered);
    gameState = 3;
    return myOutputValue;
  }
  if (gameState == 3) {
    var winningNumber = compareHighest();
  }

  return myOutputValue;
};

// dice rolling function
var rollDice = function () {
  var randomInteger = Math.floor(Math.random() * 6); // integers 0-5
  randomInteger = randomInteger + 1;
  return randomInteger;
};

//generates the output so dont have to keep copying
var outputDiceRoll = function () {
  var myOutputValue = `Player ${gameState} rolled.`;
  for (var i = 0; i < noOfDices; i += 1) {
    myOutputValue =
      myOutputValue + `<br/> Rolled ${p1DiceArray[i]} for Dice ${i}.`;
  }
  myOutputValue = myOutputValue + "<br/> Choose your dice order!";
  return myOutputValue;
};

var outputDiceOrder = function (diceArray) {
  var outputMessage = "The ordered dice value is ";
  var index = 0;
  while (index < diceArray.length) {
    outputMessage = outputMessage + diceArray[index];
    index += 1;
  }
  outputMessage = outputMessage + ". It is Player 2's turn.";
  return outputMessage;
};
/*
// function eats the input order from the player, digests it and then poop out the array into the ordered array
var orderDice = function (order, playerArray) {
  var counter = 0;
  var digit = noOfDices;
  var divisor = 1;
  var tempDiceArray = [];
  //Sets the divisor to the digit placing (tens/thousands)
  // 3 dices give you '1000' but expected order is just '123'
  for (var i = 0; i < noOfDices; i += 1) {
    divisor = divisor * 10;
  }
  //digest the 
  while (counter < noOfDices) {
    var subtractor = 0;
    divisor = divisor / 10; // need to divide 10 first, top portion is 1 place greater
    var diceNum = Math.floor(order / divisor); // the value is the dice chosen but the position is +1 from the array
    tempDiceArray.push(playerArray[diceNum - 1]); //push in value into array for output later
    subtractor = diceNum * divisor;
    order = order - subtractor; //remove the first number read already
    counter += 1;
  }
  return tempDiceArray;
};
*/

var orderDiceV2 = function (input) {
  var tempDiceArray = input.split(",");
  return tempDiceArray;
};

var compareHighest = function (playerArray) {
  var index = 1;
  var currentPlayer = playerArray[0];
  var highestValue = numberCoversion(currentPlayer);
  var currentValue = 0;
  //comparing all players
  while (index < playerArray.length) {
    currentPlayer = playerArray[index];
    currentValue = numberCoversion(currentPlayer);
    if (highestValue < currentValue) {
      highestValue = currentValue;
      winningIndex = index; //winning index +1 = winning player
    }
    index += 1;
  }
  return highestValue;
};

var numberCoversion = function (array) {
  index = 0;
  while (index < noOfDices) {
    var value = value + array[index];
    index += 1;
  }
  value = Number(value);
  return value;
};
