//Press submit player 1 will go into dice roll mode
//then player will get to choose the dice sequence


var diceRollMode = 'game mode dice roll';
var chooseDiceMode = 'game mode choose dice'

var gameMode = diceRollMode;

var newdDiceRoll = [];

var player = 1;

var player1DiceRoll = [];
var player2DiceRoll = [];

var player1DiceNum = [];
var player2DiceNum = []; 

var playerNum = [];

var main = function (input) {
  var myOutput = ``;
  if (gameMode === diceRollMode){
    //generate 2 different dice roll
    var newdDiceRoll = playerDiceRoll();
    gameMode = chooseDiceMode;
    return `1st Dice Roll: ${newdDiceRoll[0]}<br>2nd Dice Roll : ${newdDiceRoll[1]}<br><br>Please choose your preferred order`;
  }
//go into choose dice roll mode
    if (gameMode == chooseDiceMode){
      if (input == "1"){
        var firstNum = player1DiceRoll[0];
        var secNum = player1DiceRoll[1];
        var player1DiceNum = String(firstNum) + String(secNum);
        playerNum.push(player1DiceNum);
        if (player == 1){
          player = 2;        
          gameMode = diceRollMode;  
          return `1st choosen No.: ${firstNum}<br>2nd choosen No.: ${secNum}<br><br>Your No. is: ${playerNum}`;
        }
        myOutput = `1st choosen No.: ${firstNum}<br>2nd choosen No.: ${secNum}<br><br> Your No. is: ${playerNum}`;
  }
      if (input == "2"){
        var firstNum = player1DiceRoll[1];
        var secNum = player1DiceRoll[0];
        var player1DiceNum = String(firstNum) + String(secNum);
        playerNum.push(player1DiceNum);
        if (player == 1){
          player = 2;
          gameMode = diceRollMode;
          return `1st choosen No.: ${firstNum}<br>2nd choosen No.: ${secNum}<br><br>Your No. is: ${playerNum}`;
        }
        myOutput = `1st choosen No.: ${firstNum}<br>2nd choosen No.: ${secNum}<br><br>Your No. is: ${playerNum}`;
  } 

     if (
       input != "1" &&
       input != "2" && playerNum == '0') {
       console.log (`plyer 1: ${playerNum}`);
       console.log(`plyer 2: ${playerNum}`);
       gameMode = chooseDiceMode;
       return `choose 1 or 2`;
      }
    }
         if ( playerNum[0]> playerNum[1]){
           gameMode = diceRollMode;
           return `Player 1 No.:${playerNum[0]}<br>Player 2 No.:${playerNum[1]}<br><br>Player 1 Win!`;
         } 
         if ( playerNum[0]<playerNum[1]){
           gameMode = diceRollMode;
           return `Player 1 No.:${playerNum[0]}<br>Player 2 No.:${playerNum[1]}<br><br>Player 2 Win!`;
         }
         if (playerNum[0] == playerNum[1]){
           gameMode = diceRollMode;
            return `Player 1 No.:${playerNum[0]}<br>Player 2 No.:${playerNum[1]}<br><br>It's a Draw!`;
         }
        };

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
