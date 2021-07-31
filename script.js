
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

// ================== Initialise dice roll =====================
if (currentGameMode = GAME_MODE_DICE_ROLL){
  console.log('game mode:' + currentGameMode);
  var diceRollOne = diceRoll();
  var diceRollTwo = diceRoll();
  console.log('player:' + currentPlayer)
  console.log('dice 1:' + diceRollOne + ', dice 2:' + diceRollTwo);
  
  myOutputValue = `Hi Player ${currentPlayer}<br> You rolled: 
        <br>Dice 1: ${diceRollOne}
        <br>Dice 2: ${diceRollTwo}
        <br> Type 1 or 2 to choose which dice should go first.` 
  
  // player1DiceRolls.push(diceRoll[0],diceRoll[1]);
  // console.log(player1DiceRolls[diceRoll])
  // player2DiceRolls.push(diceRoll[2],diceRoll[3])
  // console.log(player2DiceRolls[diceRoll])
  

//================== Setting game modes =====================
if (currentGameMode == GAME_MODE_DICE_ROLL
  && currentPlayer == 1){
  console.log('switch game mode');
  currentGameMode = GAME_MODE_DICE_ORDER;// switch game mode to choose dice order
  console.log('game mode:' + currentGameMode)
}

if (currentGameMode == GAME_MODE_DICE_ROLL
  && currentPlayer == 2){
  console.log('switch game mode');
  currentGameMode = GAME_MODE_DICE_ORDER;// switch game mode to choose dice order
  console.log('game mode:' + currentGameMode)
}
  //================== Switching players =====================
  if (currentGameMode == GAME_MODE_DICE_ORDER
    && currentPlayer == 1){
    currentPlayer == 2;
    if (currentPlayer == 2){
    currentGameMode == GAME_MODE_DICE_ROLL;
    console.log('switch players to: ' + currentPlayer)
    }
    }
// ================== Input validation =====================
// var userInput = Number(input);
//   if (userInput != 1 && userInput !=2){
//   myOutputValue = `Oops. Please type 1 or 2 to choose which die goes first.`
//   }
// ================== Determine dice order =====================
if (currentGameMode == GAME_MODE_DICE_ORDER){
  console.log('game:' + currentGameMode);
    if (input == 1){
    console.log(`current player: ${currentPlayer}, dice rolls: ${diceRollOne}, ${diceRollTwo}`);
    myOutputValue = `Player ${currentPlayer} selected Dice 1 first. Your combined number is ${diceRollOne}${diceRollTwo}. It's Player 2's turn.`
    }else if (input == 2){
    console.log(`current player: ${currentPlayer}, dice rolls: ${diceRollTwo}, ${diceRollOne}`);
    myOutputValue = `Player ${currentPlayer} selected Dice 2 first. Your combined number is ${diceRollTwo}${diceRollOne}. It's Player 2's turn.`
    };
    return myOutputValue
    };
  }
  return myOutputValue
}
  

    



