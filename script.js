// Requirements
// 1. There are 2 players and players take turns.
// 2. When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// 3. The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// 4. After both players have rolled and chosen dice order, the player with the higher combined number wins.

//Define global variables
//Checks if game mode is to roll dice or if user needs to specify order
var GAME_MODE_ROLL_DICE = `dice Roll`;
var GAME_MODE_CHOOSE_ORDER = `choose Order`
var UNIVERSAL_GAME_MODE = GAME_MODE_ROLL_DICE;
var counter = 0;
var firstPlayerFinalDiceRoll = 0;
var secondPlayerFinalDiceRoll = 0;
var playerDiceRoll = [];
var errorMessage = ``;
var chosenOrderOfDiceRoll = 0;


var main = function (input) {

  //loop exits after 2 rounds where player 1 & 2 choose dice values
  while (counter < 2) {
  // starts game with dice roll
  if (UNIVERSAL_GAME_MODE === GAME_MODE_ROLL_DICE) { 
    var totalDiceRolls = [];
    totalDiceRolls.push(rollDice());
    UNIVERSAL_GAME_MODE = GAME_MODE_CHOOSE_ORDER;
    return totalDiceRolls;
  }
  //proceeds to game section to choose dice order
  if ( UNIVERSAL_GAME_MODE === GAME_MODE_CHOOSE_ORDER ) {
    chosenOrderOfDiceRoll = validatesInput(input);

    if (chosenOrderOfDiceRoll === errorMessage) {
      return chosenOrderOfDiceRoll;
    }

    if (chosenOrderOfDiceRoll !== errorMessage) {
      var reorderDiceRoll = orderDiceRoll(chosenOrderOfDiceRoll);
      var finalDiceOrder = capturesDiceRollForEachPlayer(reorderDiceRoll);
      UNIVERSAL_GAME_MODE = GAME_MODE_ROLL_DICE
      return finalDiceOrder;
    }
  }
    }
    // evaluates whether player 1 or 2 wins based on higher dice value
 var myOutputValue = testWinningCondition();
 return myOutputValue;
  } 

//Function to roll dice
var generateDiceRoll = function() {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor( randomDecimal );
  var diceRoll = randomInteger + 1;
  return diceRoll;
}

//Function to roll dice twice
var rollDice = function() {
  var rollDiceCounter = 0;
  playerDiceRoll.length = 0;
  while (rollDiceCounter < 2) {
    var newDiceRoll = generateDiceRoll();
     playerDiceRoll.push(newDiceRoll);
    rollDiceCounter += 1;
   }

    var myOutputValue = `Welcome! <br> You rolled ${playerDiceRoll[0]} for Dice 1 and ${playerDiceRoll[1]} for Dice 2.  <br> Choose the order of the dice.- Enter 1 to start with Dice 1: ${playerDiceRoll[0]} or 2 to start with Dice 2:${playerDiceRoll[1]}.`
    return myOutputValue;
}

//Function to validate input; whether user entered 1 or 2
var validatesInput = function(input) {
  if ( (input !== `1`) && (input !== `2`) ) {
    errorMessage = `Wrong option! Please enter either 1 or 2 only.`;
    return errorMessage;
  } else {
    chosenOrder = input;
    return chosenOrder;
    
  }
}

//Function to reorder dice roll based on user input
var orderDiceRoll = function(input) {
  //if user chose order of dice 1 then dice 2
  if (input === `1`) {
    var finalOrder = Number( `` + playerDiceRoll[0] + playerDiceRoll[1] );
    return finalOrder;
  }
  //if user chose order of dice 2 then dice 1
  if (input === '2') {
    var finalOrder = Number( `` + playerDiceRoll[1] + playerDiceRoll[0] );
    return finalOrder;
  }
  }
 
//Function to capture each dice roll for player 1 & 2
var capturesDiceRollForEachPlayer = function(input) {
  counter += 1;

//initialize final dice value for player 1
  if (( UNIVERSAL_GAME_MODE === GAME_MODE_CHOOSE_ORDER ) && (counter === 1) ) {
      firstPlayerFinalDiceRoll = input;
      var myOutputValue = `The first player's dice roll is ${firstPlayerFinalDiceRoll}. Please click submit again to roll for second player.`
      return myOutputValue;
    }
    //initialize final dice value for player 2
    else if (( UNIVERSAL_GAME_MODE === GAME_MODE_CHOOSE_ORDER ) && (counter === 2 ) ) {
      secondPlayerFinalDiceRoll= input;
      var myOutputValue = `The second player's dice roll is ${secondPlayerFinalDiceRoll}. Please click submit again to see who wins!`
      return myOutputValue;
    }
}

//Function to capture winning condition
var testWinningCondition = function () {
  //if 1st player dice roll is more than 2nd player
  if (firstPlayerFinalDiceRoll > secondPlayerFinalDiceRoll) {
    var myOutputValue = `Player 1 wins! Player 1 rolled ${firstPlayerFinalDiceRoll} while player 2 rolled ${secondPlayerFinalDiceRoll}.`

     //reset counter & game mode
    counter = 0;
    UNIVERSAL_GAME_MODE = GAME_MODE_ROLL_DICE;

    return myOutputValue;
  }
  //if 2nd player dice roll is more than 1st player
  else if (secondPlayerFinalDiceRoll > firstPlayerFinalDiceRoll) {
    var myOutputValue = `Player 2 wins! Player 2 rolled ${secondPlayerFinalDiceRoll} while player 1 rolled ${firstPlayerFinalDiceRoll}.`

     //reset counter & game mode
    counter = 0;
    UNIVERSAL_GAME_MODE = GAME_MODE_ROLL_DICE;

    return myOutputValue;
  }
  //the only other condition left is if they tie

     var myOutputValue = `It's tie! Player 2 rolled ${secondPlayerFinalDiceRoll} while player 1 rolled ${firstPlayerFinalDiceRoll}.`

     //reset counter & game mode
    counter = 0;
    UNIVERSAL_GAME_MODE = GAME_MODE_ROLL_DICE;
    return myOutputValue;
  
}