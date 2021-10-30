

// There are 2 game modes
var gameModeDiceRoll = 'gameModeDiceRoll';
var gameModeDiceOrder = 'gameModeDiceOrder';

//for each roll of two independent dice
var rollOfDice = [];

//To keep track of each player playerCombineNumber
var playerCombineNumber;
var playerCombineNumber1 = [];
var playerCombineNumber2 = [];

//Start game with Player 1
var currPlayer = 1;

//variable for winner
var winner = "";

//Start game with gameModeDiceRoll
var gameMode = gameModeDiceRoll;

var main = function (input) { 
  if (input.toLowerCase() == "r"){
    var finalScore1 = player1Result();
    var finalScore2 = player2Result();

    if(finalScore1 > finalScore2){
      winner = 1;
    }
    else if (finalScore2 > finalScore1){
      winner = 2;
    }
    return `Winner is Player ${winner} <br> Player 1 score is ${finalScore1} <br> Player 2 score is ${finalScore2}`;
  };

  if (gameMode == gameModeDiceRoll){
      rollOfDice = getDiceRolls();
      console.log(rollOfDice);
      
      //switch to gameModeDiceOrder
      gameMode = gameModeDiceOrder;
      
      var myOutputValue = 
      `Welcome Player ${currPlayer} <br>
      You rolled: <br>
      Dice 1 -- ${rollOfDice[0]}  <br>
      Dice 2 -- ${rollOfDice[1]}  <br>
      Choose the order of the first dice <br>
      Dice 1 -- Enter 1 <br>
      Dice 2 -- Enter 2`;
      return myOutputValue;
  }
  //for gameModeDiceOrder, assign user input to dice order
  if (gameMode == gameModeDiceOrder)
      var diceOrder = Number(input);
      if (diceOrder == 1){
        playerCombineNumber = concatenate2Numbers(rollOfDice[0],rollOfDice[1]);
        console.log(playerCombineNumber);

        var myOutputValue = `Player ${currPlayer}, you chose Dice 1 first.
        Your number is ${playerCombineNumber}.
        It is now next player's turn <br>
        Click Submit to roll dice. or type "R" and Submit for results`;
        return myOutputValue;
      }
      
      if (diceOrder == 2){
        playerCombineNumber = concatenate2Numbers(rollOfDice[1],rollOfDice[0])
        console.log(playerCombineNumber);
        var myOutputValue = 
        `Player ${currPlayer}, you chose Dice 2 first <br>
        Your number is ${playerCombineNumber} <br>
        It is now next player's turn <br>
        Click Submit to roll dice. or type "R" and Submit for results`;
        return myOutputValue;
      }
    
    // If currPlayer is Player 1, change to Player 2
    // Switch mode to gameModeDiceRoll
    // Store playerCombineNumber in Player array 
    if (currPlayer == 1){
      currPlayer = 2;
      console.log('currPlayer');
      console.log(currPlayer);
      rollOfDice = [];
      gameMode = gameModeDiceRoll;
      playerCombineNumber1.push(playerCombineNumber);
      console.log ('playerCombineNumber1');
      console.log(playerCombineNumber1);
    }
    else {
      currPlayer = 1;
      console.log('currPlayer');
      console.log(currPlayer);
      rollOfDice = [];
      gameMode = gameModeDiceRoll;
      playerCombineNumber2.push(playerCombineNumber);
      console.log ('playerCombineNumber2');
      console.log(playerCombineNumber2);
    }
};

var diceRoll = function() {
  var randDecimal = Math.random();
  var diceNumber = Math.ceil(randDecimal * 6);
  return diceNumber;
};

var getDiceRolls = function () {
// Create an array newDiceRolls with 2 independent dice roll values
var newDiceRolls = [diceRoll(), diceRoll()];
return newDiceRolls;
};

// Combine 2 independent dice roll values into one Number
var concatenate2Numbers = function(num1, num2){
  return Number(String(num1) + String(num2));
};

var player1Result = function(){
  var player1Score = 0;
  for (i = 0; i < playerCombineNumber1.length; i++){
    if (playerCombineNumber1[i] >playerCombineNumber2[i]){
      player1Score +=1;
    }
  }
  console.log("player1Score")
  console.log(player1Score)
  return player1Score;
  }

var player2Result = function(){
  var player2Score = 0;
  for (i = 0; i < playerCombineNumber2.length; i++){
    if (playerCombineNumber2[i] >playerCombineNumber1[i]){
      player2Score +=1;
      
    }
  }
  console.log("player2Score")
  console.log(player2Score)
  return player2Score;
};