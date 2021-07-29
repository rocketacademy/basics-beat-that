// 2 Players take turns
//keep track variables for player 1
var playerOne ='';
var diceValueOne = [];
var diceValOrderOne = [];
var outputPlayerOne = '';


// Keep track variables for player 2
var playerTwo = '';
var diceValueTwo = [];

//initialize game mode to roll the dice
var gameMode = 'READY_PLAYER_1'

// Player pick the order of the dice
// Player with higher combined number wins

// Dice rolls function
var rollDice = function () {
  var randomNum = Math.floor (Math.random ()*6)+1;
  return randomNum;
  
};

var main = function (input) {
// Player 1, rolls 2 dice
  var diceValueOne = []; 
  var counter = 0 
  // The following code assumes READY_PLAYER_1 game mode. 
      //Roll 2 dices
    while (counter <2) {
      var twoDiceRolls = rollDice ()
      console.log ('two dice rolls ' + twoDiceRolls);
      diceValueOne.push (twoDiceRolls);
      console.log('dice ' + diceValueOne);


      outputPlayerOne = 'Welcome Player 1! <br> You rolled:<br> Dice 1 = ' + diceValueOne[0] + '<br> Dice 2 = ' + diceValueOne[1] + '<br> Choose the order of the dice please!. <br> Choose: <br> 1 - for Dice 1 <br> 2 - for Dice 2' ;

      counter = counter + 1;
      gameMode = 'CHOOSE_DICE_ORDER_PLAYER_1';
    
    return outputPlayerOne;
    }
  
   
    // // Player one choose dice number order
    // // Assume the following code running here is when game mode is CHOOSE_DICE_ORDER_PLAYER_1
   
    // if (input = 2){
    //     diceValueOne.move(1,0)        
    //   }
    //    outputPlayerOne = Number(diceValueOne.join(''));
    
    // return outputPlayerOne;
  };










