var diceRoll1=""
var diceRoll2=""
var Player1=""
var Player2=""
var gameMode="player1input"

var diceEngine = function(){
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
}

if(gameMode=="player1input"){

  var main = function (input) {
  
    var myOutputValue = 'Welcome Player 1. The dice rolls twice. Please enter 1 or 2 to select the number that displays first';

    gameMode="player1GamePlay"
    
    if(input==1){
      gameMode = "player1GamePlay"
      diceRoll1 = diceEngine()
      diceRoll2 = diceEngine()
      myOutputValue = "Player 1: You rolled "+ diceRoll1 +" first and "+ diceRoll2+" second. You selected the first dice to be first so your score is "+ (diceRoll1*10+diceRoll2)+ " Player 2's turn next."
      gameMode = "player2input"
      console.log("gameMode: "+gameMode)
    }
      
    if(input==2){
      gameMode = "player1GamePlay"
      diceRoll1 = diceEngine()
      diceRoll2 = diceEngine()
      myOutputValue = "Player 1: You rolled "+ diceRoll1 + " first and "+ diceRoll2+" second. You selected the second dice to be first so your score is "+ (diceRoll2*10+diceRoll1)+ " Player 2's turn next."
      gameMode = "player2input"
      console.log("gameMode: "+gameMode)
    }
   /* else{
    myOutputValue = "Player 1: Invalid Input. Please select 1 or 2"
    }*/
    return myOutputValue;

};

if(gameMode=="player2input"){

  var main = function (input) {
  var myOutputValue = 'Welcome Player 2. The dice rolls twice. Please enter 1 or 2 to select the number that displays first';

  gameMode="player2GamePlay"
  console.log("gameMode: "+gameMode)

    if(input==1){
      gameMode = "player2GamePlay"
      diceRoll1 = diceEngine()
      diceRoll2 = diceEngine()
      myOutputValue = "Player 2: You rolled "+ diceRoll1+ " first and "+ diceRoll2+" second. You selected the first dice to be first so your score is "+ (diceRoll1*10+diceRoll2)+ " Player 1's turn next."
      gameMode = "player1input"
    }
    if(input==2){
      gameMode = "player2GamePlay"
      diceRoll1 = diceEngine()
      diceRoll2 = diceEngine()
      myOutputValue = "Player 2: You rolled "+ diceRoll1 + " first and "+ diceRoll2+" second. You selected the second dice to be first so your score is " +(diceRoll2*10+diceRoll1)+ " Player 1's turn next."
      gameMode = "player1input"
    }
    /*else{
    myOutputValue = "Player 2: Invalid Input. Please select 1 or 2"
    }*/
  
  return myOutputValue;

}
}
}