var currentPlayer = `Player 1`
var currentMode = `roll dice`
var dice1 = ``;
var dice2 = ``;
var player1Number = 0;
var player2Number = 0;

var main = function (input) {
  var myOutputValue = '';
  if(
    currentMode == `roll dice`
    ){
      myOutputValue = generateTwoDiceRolls();
    }else{
      if (
        currentPlayer == `Player 1` &&
        currentMode == `choose dice`
      ){
        player1Number = generateNumFromDiceOrder(input);
        console.log(`player 1 number`, player1Number);
        myOutputValue = `${currentPlayer}, you chose Dice ${input} first.<br>
        Your number is ${player1Number}.<br>
        It is now Player 2's turn.`;
        currentPlayer = `Player 2`;
      }else{
        if(
          currentPlayer == `Player 2` &&
          currentMode == `choose dice`
        ){
          player2Number = generateNumFromDiceOrder(input) 
          console.log(`player 2 number`, player2Number);
          var gameResults = generateGameResults();
          myOutputValue = `${currentPlayer}, you chose Dice ${input} first.<br>
          Your number is ${player2Number}.<br>
          ${gameResults}`;
          currentPlayer = `Player 1`;
        }
      }
    };
  return myOutputValue;
};

//rolls two dice and changes mode to `choose dice`
var generateTwoDiceRolls = function(){
  dice1 = rollDice().toString();
  dice2 = rollDice().toString();
  currentMode = `choose dice`
  return `Welcome ${currentPlayer}.<br>
  You rolled ${dice1} for Dice 1 and ${dice2} for Dice 2.<br>
  Choose the order of the dice.`
};

//generates player's number based on player's choice of dice order
//and changes mode to `roll dice`
var generateNumFromDiceOrder = function(diceOrder){
  var chosenNumber = 0;
  if(diceOrder == 1){
    chosenNumber = dice1 + dice2;
  }else{
    if(diceOrder == 2){
      chosenNumber = dice2 + dice1;
    }else{
      return `You can only choose dice 1 or dice 2.`
    };
  };
  currentMode = `roll dice`
  return chosenNumber;
};

//compares players' chosen numbers and returns result of game
var generateGameResults = function(){
  if(player1Number > player2Number){
    return `Player 1 wins!`
  }else{
    if(player2Number > player1Number){
      return `Player 2 wins!`
    }else {
      return `Play again.`
    };
  };
};

//generates random dice number
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
}; 