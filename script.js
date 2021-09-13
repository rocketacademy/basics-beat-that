// there are 2 players for this game
// player mode 'Player 1' 'Player 2'
// player 1 will go first
var currentGameMode = 'waiting for username1';
var userName1 = '';
var userName2 = '';
var modePlayer1 = 'Player 1';
var modePlayer2 = 'Player 2';
var modeDetermineWinner = 'Determine the Winner'
var player1RollsArray = []
var player2RollsArray = []

var addDiceRollsToArray = function (currentGameMode, inputDiceRollsToArray) {
  if (currentGameMode == modePlayer1) {
    var inputDiceRollsToArray = rollDice1()
    var counter = 0;
    while ( counter < inputDiceRollsToArray.length) {
      player1RollsArray.push(inputDiceRollsToArray[counter]);
      counter += 1;
    }
  } else if (currentGameMode = modePlayer2) {
    var inputDiceRollsToArray = rollDice2()
    var counter = 0;
    while ( counter < inputDiceRollsToArray.length) {
      player2RollsArray.push(inputDiceRollsToArray[counter]);
      counter += 1;
  }
}
}

// game rolls 2 dice and display the outcome
var main = function (input) {
  var myOutputValue = "";

  // do this if waiting for player 1 to input name
  if (currentGameMode == "waiting for username1") {
    if (!userName1) {
      if (!input) { 
        myOutputValue = `Player 1 please enter a valid name`;
      }
      else {
        userName1 = input
        console.log(`Player 1 name: ${input}` )
        myOutputValue = `Hi ${userName1}, click Submit to roll the dice.`
        currentGameMode = modePlayer1;
      }
    return myOutputValue;
    }
  }
   else if (currentGameMode == modePlayer1) {
    console.log(`${userName1} rolled ${rollDice1()}`);
    addDiceRollsToArray (modePlayer1, rollDice1)
    console.log(player1RollsArray);
    myOutputValue = `${userName1} rolled ${rollDice1()}`;
    currentGameMode = "waiting for username2";
    return myOutputValue;
  }
     if (currentGameMode == "waiting for username2") {
    if (!userName2) {
      if (!input) {
        myOutputValue = `Player 2 please enter a valid name`;
      }
      else {
        userName2 = input
        console.log(`Player 2 name: ${input}`);
        myOutputValue = `Hi ${userName2}, click Submit to roll the dice.`
        currentGameMode = modePlayer2;
      }
    return myOutputValue;
    }
  }
   else if (currentGameMode == modePlayer2) {
    console.log(`${userName2} rolled ${rollDice2()}`);
        addDiceRollsToArray(modePlayer2, rollDice2);
        console.log(player2RollsArray);
    myOutputValue = `${userName2} rolled ${rollDice2()}`;
    currentGameMode = modeDetermineWinner;
    return myOutputValue;
}

if (currentGameMode == modeDetermineWinner) {
  if (input = `winner`) {
   if (player1RollsArray > player2RollsArray) {
    myOutputValue = `${userName1} wins with a combined roll of ${player1RollsArray}!`;
  } else if (player1RollsArray < player2RollsArray) {
    myOutputValue = `${userName2} wins with a combined roll of ${player1RollsArray}!`;
  } else {
    myOutputValue = `It is a draw. Both ${userName1} and ${userName2} rolled ${player1RollsArray}`;
  }
}
  else { myOutputValue `Please enter "who is the winner"`}
}
return myOutputValue
};

// get random dice rolls
var getRandomDiceRoll = function () {
  var randomInterger = Math.floor(Math.random() * 6);
  var diceNumber = randomInterger + 1;
  return diceNumber;
};

// roll dice function
var rollDice1 = function () {
  var message = "";

  // roll dice function logic
  var randomDiceRoll1 = getRandomDiceRoll();
  var randomDiceRoll2 = getRandomDiceRoll();
  console.log(`Dice 1`);
  console.log(`${randomDiceRoll1}`);
  console.log(`Dice 2`);
  console.log(`${randomDiceRoll2}`);

// add the dice rolls together to get the greater value
if (randomDiceRoll1 >= randomDiceRoll2) {
  console.log(`Dice 1 + Dice 2`);
  console.log(`${randomDiceRoll1}${randomDiceRoll2}`);
  message = String(randomDiceRoll1) + String(randomDiceRoll2);
}
else {
  console.log(`Dice 2 + Dice 1`);
  console.log(`${randomDiceRoll2}${randomDiceRoll1}`);
  message = String(randomDiceRoll2) + String(randomDiceRoll1);
}
return message
};

var rollDice2 = function () {
  var message = "";

  // roll dice function logic
  var randomDiceRoll1 = getRandomDiceRoll();
  var randomDiceRoll2 = getRandomDiceRoll();
  console.log(`Dice 1`);
  console.log(`${randomDiceRoll1}`);
  console.log(`Dice 2`);
  console.log(`${randomDiceRoll2}`);

// add the dice rolls together to get the greater value
if (randomDiceRoll1 >= randomDiceRoll2) {
  console.log(`Dice 1 + Dice 2`);
  console.log(`${randomDiceRoll1}${randomDiceRoll2}`);
  message = `${randomDiceRoll1}${randomDiceRoll2}`;
}
else {
  console.log(`Dice 2 + Dice 1`);
  console.log(`${randomDiceRoll2}${randomDiceRoll1}`);
  message = `${randomDiceRoll2}${randomDiceRoll1}`;
}
return message
};