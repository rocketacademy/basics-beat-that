//Press submit player 1 will go into dice roll mode
//then player will get to choose the dice sequence

//Keep Score for each player
//

var diceRollMode = 'game mode dice roll';
var chooseDiceMode = 'game mode choose dice'

var gameMode = diceRollMode;

var newDiceRoll = [];

var playerDiceRoll = [];

var player = 1;

var player1DiceRoll = [];
var player2DiceRoll = [];

var firstOrderDiceNum = String();
var secOrderDiceNum = String(); 

var playerNum = [];

var player1Win = false;
var player2Win = false;

var main = function (input) {
  var myOutput = ``;
  if (gameMode === diceRollMode){
    //generate 2 different dice roll
    var newDiceRoll = genDiceRoll();
    console.log(playerDiceRoll);
    gameMode = chooseDiceMode;
    return `1st Dice Roll: ${newDiceRoll[0]}<br>2nd Dice Roll : ${newDiceRoll[1]}<br><br>Please choose your preferred order`;
  }
//go into choose dice roll mode
    if (gameMode == chooseDiceMode){
      if (input == "1"){
        var firstNum = playerDiceRoll[0];
        var secNum = playerDiceRoll[1];
        var firstOrderDiceNum = String(firstNum) + String(secNum);
        playerNum.push(firstOrderDiceNum);
        if (player == 1){
          player = 2;        
          gameMode = diceRollMode;  
          return `1st choosen No.: ${firstNum}<br>2nd choosen No.: ${secNum}<br><br>Your No. is: ${playerNum[0]}`;
        }
        myOutput = `1st choosen No.: ${firstNum}<br>2nd choosen No.: ${secNum}<br><br> Your No. is: ${playerNum[0]}`;
  }
      if (input == "2"){
        var firstNum = playerDiceRoll[1];
        var secNum = playerDiceRoll[0];
        var secOrderDiceNum = String(firstNum) + String(secNum);
        playerNum.push(secOrderDiceNum);
        if (player == 1){
          player = 2;
          gameMode = diceRollMode;
          return `1st choosen No.: ${firstNum}<br>2nd choosen No.: ${secNum}<br><br>Your No. is: ${playerNum[1]}`;
        }
        myOutput = `1st choosen No.: ${firstNum}<br>2nd choosen No.: ${secNum}<br><br>Your No. is: ${playerNum[1]}`;
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
           player1Win = true;
           return `Player 1 No.:${playerNum[0]}<br>Player 2 No.:${playerNum[1]}<br><br>Player 1 Win!`;
         } 
         if ( playerNum[0]<playerNum[1]){
           gameMode = diceRollMode;
           player2Win = true;
           return `Player 1 No.:${playerNum[0]}<br>Player 2 No.:${playerNum[1]}<br><br>Player 2 Win!`;
         }
         if (playerNum[0] == playerNum[1]){
           gameMode = diceRollMode;
           player1Win = true;
           player2Win = true;
            return `Player 1 No.:${playerNum[0]}<br>Player 2 No.:${playerNum[1]}<br><br>It's a Draw!`;
         }
         if (player1Win == true){
          totalPlayer1Count = playerNum 
         }
        };

var genDiceRoll = function(){
  var theDiceRolls = [diceRoll(), diceRoll()];
  playerDiceRoll = theDiceRolls;
  return playerDiceRoll;
}

var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInterger = Math.floor(randomDecimal);
  var diceNumber = randomInterger + 1;
  return diceNumber;
}
