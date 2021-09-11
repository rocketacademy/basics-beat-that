// there are 2 players for this game
// player mode 'Player 1' 'Player 2'
// player 1 will go first
var currentGameMode = 'waiting for username1';
var userName1 = '';
var userName2 = '';
var modePlayer1 = 'Player 1';
var modePlayer2 = 'Player 2';
var 

// game rolls 2 dice and display the outcome
var main = function (input) {
  var myOutputValue = "";

  // do this if waiting for player 1 to input name
  if (currentGameMode == "waiting for username1") {
    // no valid name input
    if (!userName1) {
      if (!input) {
        myOutputValue = `Please enter a valid name`;
      }
    }
    }

    // set player 1 name
    else if (userName1 = input) {
      console.log(userName1);
    // now that we have player 1 name, player 1 rolls the dice
    currentGameMode = "Player 1";
    console.log(`Hello ${userName1}`);
    myOutputValue = `Hello ${userName1}`;
    return myOutputValue;
  } else if (currentGameMode == "Player 1") {
    myOutputValue = `${userName1} rolled ${rollDice()}`;
    return myOutputValue;
  } else if (currentGameMode == "waiting for username2") {
    // set player 2 name
    userName2 = input;
  }
  // now that we have player 2 name, player 2 rolls the dice
    else if (currentGameMode = "Player 2") {
    console.log(`Hello ${userName2}`);
    myOutputValue = `Hello ${userName2}`;
  } else if (currentGameMode == "Player 2") {
    myOutputValue = `${userName2} rolled ${rollDice()}`;
  }

  

  return myOutputValue;
};


// get random dice rolls
var getRandomDiceRoll = function () {
  var randomDecimal = Math.random()*6;
  var randomInterger = Math.floor(randomDecimal);
  var diceNumber = randomInterger + 1;
  return diceNumber;
};

// roll dice function
var rollDice = function () {
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
} else {
  console.log(`Dice 2 + Dice 1`);
  console.log(`${randomDiceRoll2}${randomDiceRoll1}`);
  message = `${randomDiceRoll2}${randomDiceRoll1}`;
}
return message
};