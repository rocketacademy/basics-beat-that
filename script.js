var main = function (input) {
  
  if(gameMode == gameMode_DiceRoll) {
    //get dice rolls for curren player
    var diceRolls = getDiceRolls();
    //switch game mode to choose dice order
    gameMode = gameMode_DiceOrder;
    //return the dice roll value of current player
    return 'Welcome player '+ currentPlayer+ ". <br> You rolled dice 1: "+diceRolls[0]+' and dice 2: '+diceRolls[1]+'<br> Choose the order of the dice by entering 1 or 2 as the first numeral.';

  }

  //create player number based on player's dice order choice
  if(gameMode == gameMode_DiceOrder){
    var firstNumeralIndex = Number(input);
    //validate entry
    console.log('First numeral index '+firstNumeralIndex);
      if (firstNumeralIndex !== 1 && firstNumeralIndex !== 2){
        return "Please choose 1 or 2 as the first numeral for your dice rolls.";
      }
    }

    //generate current player number
    var playerNum = getPlayerNumber(firstNumeralIndex);
    var playerNumChoice = 'Player '+currentPlayer+', you chose Dice '+firstNumeralIndex+' first. <br> Your number is '+playerNum;
        
    //if current player is 1, change to player 2
    if(currentPlayer == 1){
      currentPlayer = 2;
      gameMode = gameMode_DiceRoll;
      return playerNumChoice +"<br> It is now Player 2's turn. <br> Press submit to roll Player 2's dice."
    }

    //if current player is 2, determine the winner
    var winningPlayer = determineWinner();

    //reset the game
    currentPlayer = 1;
    gameMode = gameMode_DiceRoll;

  return playerNumChoice + '<br> Player '+winningPlayer+" has won. <br> Player 1's number: "+player1Num+" Player 2's number: "+player2Num+'. Press submit to player again';

  //if error
  return 'An error has occured. Please refresh to start again.'

};


//set up the gamemode
var gameMode_DiceRoll = 'Game Mode: Dice Roll.';
var gameMode_DiceOrder = 'Game Mode: Dice Order.';

//Initialise the game to start with dice roll game mode
var gameMode = gameMode_DiceRoll;

//keep track of who is the current player (1 or 2)
var currentPlayer = 1;

//keep track of each player's dice rolls
var player1Dice = [];
var player2Dice = [];

//keep track of each player's chosen numbers
var player1Num;
var player2Num;

//generate random number from 1 to 6
var getDiceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal)+1;
  console.log('Random number is '+randomInteger);
  return randomInteger;
};

//get dice rolls for current player, and generate the order of the dice roll
var getDiceRolls = function(){
  //create array for 2 independent dice rolls
  var diceRolls = [getDiceRoll(),getDiceRoll()];

  //assign dice rolls to current dice array
  if(currentPlayer == 1){
    player1Dice = diceRolls;
  }

  //if current player is not 1, then its player 2
  else{
    player2Dice = diceRolls;
  }

  //return the set of dice rolls 
  return diceRolls;
};

//concat num1 and num2
var concat = function(num1, num2){
  return Number(String(num1) + String(num2));
};

//generate player number based on the dice rolls and chosen order
var getPlayerNumber = function(firstNumeralIndex){
  if (currentPlayer == 1){
    var diceArray = player1Dice;
  } else {
    diceArray = player2Dice;
  }

  // if chosen order is first dice
  if(firstNumeralIndex == 1){
    var playerNum = concat(diceArray[0],diceArray[1]);
  } else {
    playerNum = concat(diceArray[1],diceArray[0])
  }

  //store player num 
  if (currentPlayer == 1){
    player1Num = playerNum;
  } else {
    player2Num = playerNum;
  };
  return playerNum;
};

//determine the winner
var determineWinner = function(){
  if(player1Num>player2Num){
    return 1;
  }
  else return 2;
};