var gameState = "P1";
var p1DiceRoll1 = "";
var p1DiceRoll2 = "";
var p1Total = 0;
var p2DiceRoll1 = "";
var p2DiceRoll2 = "";
var p2Total = 0;

var main = function (input) {
  var myOutputValue = diceGame(input);
  return myOutputValue;
};

var diceRoll = function(){
  var randInt = Math.floor(Math.random()*6);
  randInt = randInt + 1;
  return randInt
};

var diceGame = function(userInput){
  if (gameState == "P1"){ //State 1: Initial
    p1DiceRoll1 = diceRoll().toString();
    p1DiceRoll2 = diceRoll().toString();
    gameState = "P1-Order";
    return `Welcome Player 1. <br> You rolled ${p1DiceRoll1} for Dice 1 and ${p1DiceRoll2} for Dice 2. <br> Choose the order of the dice.`
  }
  if (gameState == "P1-Order"){
    console.log(userInput);
    if (userInput=="Dice 1"){
      var userOrder = 1;
      console.log(userOrder);
      p1Total = orderSelect(p1DiceRoll1,p1DiceRoll2,userOrder);
      console.log(p1Total);
      gameState = "P2";
      return `Player 1, you chose Dice ${userOrder} first.<br>
      Your number is ${p1Total}.<br>
      It is now Player 2's turn.`
    }
    if (userInput=="Dice 2"){
      var userOrder = 2;
      p1Total = orderSelect(p1DiceRoll1,p1DiceRoll2,userOrder);
      console.log(p1Total);
      gameState = "P2";
      return `Player 1, you chose Dice ${userOrder} first.<br>
      Your number is ${p1Total}.<br>
      It is now Player 2's turn.`
    }
    else {
      return "Error! Please choose numeral order by typing in 'Dice 1' or 'Dice 2' as the first numeral."
    } 
  }
//================================
  if (gameState == "P2"){ //State 1: Initial
    p2DiceRoll1 = diceRoll().toString();
    p2DiceRoll2 = diceRoll().toString();
    gameState = "P2-Order";
    return `Welcome Player 2. <br> You rolled ${p2DiceRoll1} for Dice 1 and ${p2DiceRoll2} for Dice 2. <br> Choose the order of the dice.`
  }
  if (gameState == "P2-Order"){
    console.log(userInput);
    if (userInput=="Dice 1"){
      var userOrder = 1;
      console.log(userOrder);
      p2Total = orderSelect(p2DiceRoll1,p2DiceRoll2,userOrder);
      console.log(p2Total);
      gameState = "P1";
      return `Player 2, you chose Dice ${userOrder} first.<br>
      Your number is ${p2Total} and Player 1's number is ${p1Total}.<br>` + result(p1Total,p2Total)
    }
    if (userInput=="Dice 2"){
      var userOrder = 2;
      p2Total = orderSelect(p1DiceRoll1,p1DiceRoll2,userOrder);
      console.log(p1Total);
      gameState = "P1";
      return `Player 2, you chose Dice ${userOrder} first.<br>
      Your number is ${p2Total} and Player 1's number is ${p1Total}.<br>` + result(p1Total,p2Total)
    }
    else {
      return "Error! Please choose numeral order by typing in 'Dice 1' or 'Dice 2' as the first numeral."
    } 
  }

};

var orderSelect = function(diceOne,diceTwo,userSel){
  if (userSel==1){
    return Number(diceOne+diceTwo);
  }
  if (userSel==2){
    return Number(diceTwo+diceOne);
  }
};

var result = function(player1,player2){
  if (player1>player2){
    return "Player 1 won!"
  }
  else {
    return "Player 2 won!"
  }
}