
//Create a version of the Beat That dice game, where players create the largest number 
//they can by concatenating random dice roll digits
//There are 2 players and players take turns.
//When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
//The player picks the order of the dice they want. 
//For example, if they wanted the number 63, they would specify that the 2nd dice goes first. 
//You can choose how the player specifies dice order.
//After both players have rolled and chosen dice order, the player with the higher combined number wins.

var currentGameMode = GAME_MODE_DICE_ROLL; //initialise game mode to explain rules.
var currentPlayer = 1;
var player1DiceRolls = [];//keep track of dice rolls for each player
var player2DiceRolls = [];

var player1CombNum; //keep track of each player's combined numbers
var player2CombNum;
var gameCount = 0;//keep track of number of games played
var winCountPlayerOne = 0;//keep track of number of wins per user
var winCountPlayerTwo = 0

var GAME_MODE_DICE_ROLL = 'dice roll';
var GAME_MODE_DICE_ORDER = 'dice order';

// ================== Store combined numbers =====================

// var storePlayer1CombNum = function (player1CombNum){
//   var player1Counter = 0;
//   while (player1Counter < player1CombNum.length){
//   console.log(player1CombNum)
//   player1CombNum.push(player1DiceRolls) 
// }
// }
// var storePlayer2CombNum = function (player2CombNum){
//   var player2Counter = 0;
//   while (player2Counter <player2CombNum.length){
//   console.log(player2CombNum)
//   player2CombNum.push(player2DiceRolls)
//   }
// }

var diceRolls = function (){
  var generateDiceRolls = [diceRoll(),diceRoll()];

  if (currentPlayer == 1){
    player1DiceRolls = generateDiceRolls;
  }
  if (currentPlayer == 2){
    player2DiceRolls = generateDiceRolls;
  }
return generateDiceRolls;
}

// var PlayerCombNum = function (diceRoll1, diceRoll2){
// return Number (String(diceRoll1)+ String(diceRoll2));
// };

// ================== Main function =====================
var main = function (input) {
  var myOutputValue = '';
  // var winner = function (){
  //   if (player1CombNum > player2CombNum){
  //   myOutputValue = `Player 1 wins!`;
  //   }
  //   myOutputValue = `Player 2 wins!`
  //   winner ();
  // }

// ================== Roll dice logic =====================
var diceRoll = function (){
  var randomDecimal = Math.random() * 6;
  randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
}

//Player 1's turn
// ================== Initialise dice roll =====================
if (currentGameMode = GAME_MODE_DICE_ROLL){
  console.log('game mode:' + currentGameMode);
  var diceRollOne = diceRoll();
  var diceRollTwo = diceRoll();
  if (currentPlayer == 1){
  console.log('player:' + currentPlayer)
  console.log('dice 1:' + diceRollOne + ', dice 2:' + diceRollTwo);
  player1DiceRolls.push(diceRollOne,diceRollTwo);
  myOutputValue = `Hi Player ${currentPlayer}<br> You rolled: 
        <br>Dice 1: ${diceRollOne}
        <br>Dice 2: ${diceRollTwo}
        <br> Type 1 or 2 to choose which dice should go first.` 
        // player1DiceRolls.push(diceRollOne,diceRollTwo);
        // console.log(player1DiceRolls);
      }
//================== Setting game modes =====================
if (currentGameMode == GAME_MODE_DICE_ROLL
  && currentPlayer == 1){
  console.log('switch game mode');
  currentGameMode = GAME_MODE_DICE_ORDER;// switch game mode to choose dice order
  console.log('game mode:' + currentGameMode)
}

// ================== Input validation =====================
// var userInput = Number(input);
//   if (userInput != 1 && userInput !=2){
//   myOutputValue = `Oops. Please type 1 or 2 to choose which die goes first.`
//   }
// ================== Determine dice order =====================
if (currentGameMode == GAME_MODE_DICE_ORDER){
  console.log('game:' + currentGameMode);
  
  if (currentPlayer == 1){
    if (input == 1){
    // player1CombNum = (player1DiceRolls[0],player1DiceRolls[1]);
    // player1CombNum.push(player1DiceRolls[0],player1DiceRolls[1]);
    console.log(`current player: ${currentPlayer}, dice rolls: ${diceRollOne}, ${diceRollTwo}`);
    myOutputValue = `Player ${currentPlayer} selected Dice 1 first. Your combined number is ${diceRollOne}${diceRollTwo}. It's Player 2's turn.`
    }else if (input == 2){
    // player1CombNum = (player1DiceRolls[1],player1DiceRolls[0]);
    // player1CombNum.push(player1DiceRolls[1],player1DiceRolls[0])
    console.log(`current player: ${currentPlayer}, dice rolls: ${diceRollOne}, ${diceRollTwo}`);
    myOutputValue = `Player ${currentPlayer} selected Dice 2 first. Your combined number is ${diceRollTwo}${diceRollOne}. It's Player 2's turn.`
    };
    };
}

return myOutputValue
}
//================== Switching players =====================
if (currentPlayer == 1){
  currentPlayer == 2;
  currentGameMode == GAME_MODE_DICE_ORDER
  console.log('switch players: ' + currentPlayer)
  myOutputValue = `Player ${currentPlayer}'s turn. Hit 'Go!' to roll dice.`
  }

//Player 2's turn
// ================== Initialise dice roll =====================
if (currentGameMode != GAME_MODE_DICE_ORDER){
  currentGameMode = GAME_MODE_DICE_ROLL;
  console.log('game mode:' + currentGameMode);
    if (currentPlayer != 1){
      currentPlayer = 2
      var diceRollThree = diceRoll();
      var diceRollFour = diceRoll();
      console.log('player:' + currentPlayer)
      console.log ('dice 3:' + diceRollThree + ', dice 4:' + diceRollFour);
      myOutputValue = `Hi Player ${currentPlayer}<br> You rolled: 
        <br>Dice 1: ${diceRollThree}
        <br>Dice 2: ${diceRollFour}
        <br> Type 1 or 2 to choose which dice should go first.`
        // player2DiceRolls.push(diceRollThree,diceRollFour)
        // console.log(player2DiceRolls);
    }
  }
if (currentGameMode == GAME_MODE_DICE_ORDER){
  console.log('game:' + currentGameMode);  
    if (currentPlayer != 1){
    currentPlayer = 2
    if (currentPlayer ==2){
        var diceRollThree = diceRoll();
        var diceRollFour = diceRoll();
      if (input == 1){
      // player2CombNum = (player2DiceRolls[0],player2DiceRolls[1]);
      // player2CombNum.push(`${diceRollThree}${diceRollFour}`);
      console.log(`current player: ${currentPlayer}, dice rolls: ${diceRollThree}, ${diceRollFour}`);
      myOutputValue = `Player ${currentPlayer} selected Dice 1 first. Your combined number is ${diceRollThree}${diceRollFour}.`
    }else if (input == 2){
      // player2CombNum = (player2DiceRolls[0],player2DiceRolls[1]);
      // player2CombNum.push(`${diceRollFour}${diceRollThree}`)
      console.log(`current player: ${currentPlayer}, dice rolls: ${diceRollThree}, ${diceRollFour}`);
      myOutputValue = `Player ${currentPlayer} selected Dice 2 first. Your combined number is ${diceRollFour}${diceRollThree}.`}
    }
  }
  
  }
  return myOutputValue
}
  

    



