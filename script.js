//Press submit player 1 will go into dice roll mode
//then player will get to choose the dice sequence


var diceRollMode = 'game mode dice roll';
var chooseDiceMode = 'game mode choose dice'

var gameMode = diceRollMode;

var newdDiceRoll = [];

//var diceOrder = Number();
var player = 1;

var player1DiceRoll = [];
var player2DiceRoll = [];

var player1DiceNum = [];
var player2DiceNum = []; 

var playerNum = [];

var main = function (input) {
  //var player = 1;
  var myOutput = ``;
  if (gameMode === diceRollMode){
    //generate 2 different dice roll
    var newdDiceRoll = playerDiceRoll();
    console.log(newdDiceRoll);
    gameMode = chooseDiceMode;
    //player = 1;
    console.log('hello');
    return `dice roll 1: ${newdDiceRoll[0]} and dice roll2 : ${newdDiceRoll[1]} please choose`;
  }
//go into choose dice roll mode
    if (gameMode == chooseDiceMode){
      //var player = 1;
      console.log('hi');
      if (input == "1"){
        var firstNum = player1DiceRoll[0];
        var secNum = player1DiceRoll[1];
        var player1DiceNum = String(firstNum) + String(secNum);
        console.log(playerNum);
        playerNum.push(player1DiceNum);
        //player = 1;
        if (player == 1){
          player = 2;        
          gameMode = diceRollMode;
          console.log("sleep");   
          return `you have choosen ${firstNum} and ${secNum}, you have got ${playerNum}`;
        }
        myOutput = `you have choosen ${firstNum} and ${secNum}, you have got ${playerNum}`;
  }
      if (input == "2"){
        var firstNum = player1DiceRoll[1];
        var secNum = player1DiceRoll[0];
        var player1DiceNum = String(firstNum) + String(secNum);
        console.log(playerNum);
        playerNum.push(player1DiceNum);
        //player = 1;
        if (player == 1){
          player = 2;
          gameMode = diceRollMode;
          console.log('sleep');
          return `you have choosen ${firstNum} and ${secNum}, you have got ${playerNum}`;
        }
        myOutput = `you have choosen ${firstNum} and ${secNum}, you have got ${playerNum}`;
  } 

     if (
       input != "1" &&
       input != "2" && playerNum == '0') {
       console.log (`plyer 1: ${playerNum}`);
       console.log(`plyer 2: ${playerNum}`);
       gameMode = chooseDiceMode;
       return `choose 1 or 2`
      }
    }
         if ( playerNum[0]> playerNum[1]){
           return myOutput + 'Player 1 Win!'
         } else if ( playerNum[0]<playerNum[1]){
           return myOutput + 'Player 2 Win!'
         }
        }

  

var playerDiceRoll = function(){
  var theDiceRolls = [diceRoll(), diceRoll()];
  if (player == 1){
    player1DiceRoll = theDiceRolls;
  }else{
    player2DiceRoll = theDiceRolls;
  }
  return theDiceRolls;
}

var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInterger = Math.floor(randomDecimal);
  var diceNumber = randomInterger + 1;
  return diceNumber;
}