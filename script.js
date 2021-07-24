//constant variables
var PLAYER_1 = `Player 1`;
var PLAYER_2 = `Player 2`;
var GAME_MODE_ROLL_DICE = `roll dice`;
var GAME_MODE_CHOOSE_DICE_ORDER = `choose dice`;

//keep track of current player - player 1 starts
var currentPlayer = PLAYER_1;

//keep track of current game mode - start with roll dice
var currentMode = GAME_MODE_ROLL_DICE;

//keep track of dice rolls
var dice1 = ``;
var dice2 = ``;

//keep track of list of numbers for each player
var player1Numbers = [];
var player2Numbers = [];

//generates random dice number
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
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

//returns current player's number array based on current player
var currentPlayerNumbers = function(currentPlayer){
  if (currentPlayer == PLAYER_1){
    return player1Numbers;
  }else{
    if(currentPlayer == PLAYER_2){
      return player2Numbers;
    };
  };
};

//generates player's chosen number based on player's choice of dice order
//adds player's chosen number to player's number array
//and changes mode to `roll dice`
var generateNumFromDiceOrder = function(diceOrder){
  var chosenNumber = 0;
  if(diceOrder == 1){
    chosenNumber = dice1 + dice2;
    currentPlayerNumbers(currentPlayer).push(chosenNumber);
  }else{
    if(diceOrder == 2){
      chosenNumber = dice2 + dice1;
      currentPlayerNumbers(currentPlayer).push(chosenNumber);
    }else{
      return `You can only choose dice 1 or dice 2.`
    };
  };
  currentMode = `roll dice`
  return `${currentPlayer}, you chose Dice ${diceOrder} first.<br>
  Your number is ${chosenNumber}.`;
};

//compares players' chosen numbers and returns result of game
var generateGameResults = function(){
  if(player1Numbers.pop() > player2Numbers.pop()){
    return `Player 1 wins!`
  }else{
    if(player2Numbers.pop() > player1Numbers.pop()){
      return `Player 2 wins!`
    }else {
      return `Play again.`
    };
  };
};

//generate running sum of player's numbers
var generateRunningSum = function(){
  var counter = 0;
  var runningSum = `Running sum:`
    while (counter < currentPlayerNumbers(currentPlayer).length){
      runningSum += currentPlayerNumbers(currentPlayer)[counter];
      counter += 1;
    };
return runningSum;
};

var main = function (input) {
  var myOutputValue = '';
  if(
    currentMode == GAME_MODE_ROLL_DICE
    ){
      myOutputValue = generateTwoDiceRolls();
    }else{
      if (
        currentMode == GAME_MODE_CHOOSE_DICE_ORDER
      ){
        var chosenNumMessage = generateNumFromDiceOrder(input);
        var runningSum = generateRunningSum();
        if(currentPlayer == PLAYER_1){
          myOutputValue = `${chosenNumMessage}<br>
          It is now Player 2's turn.<br><br>
          ${runningSum}`;
          currentPlayer = PLAYER_2;
        }else{
          if(currentPlayer == PLAYER_2){
            var gameResults = generateGameResults();
            myOutputValue = `${chosenNumMessage}<br>
            ${gameResults}<br><br>
            ${runningSum}`;
            currentPlayer = PLAYER_1;
          };
        };
      };
        
      //   player1CurrentNumber = generateNumFromDiceOrder(input);
      //   console.log(`player 1 number`, player1CurrentNumber);
      //   player1NumbersList.push(player1CurrentNumber);
      //   myOutputValue = `${currentPlayer}, you chose Dice ${input} first.<br>
      //   Your number is ${player1CurrentNumber}.<br>
      //   It is now Player 2's turn.`;
      //   currentPlayer = `Player 2`;
      // }else{
      //   if(
      //     currentPlayer == `Player 2` &&
      //     currentMode == `choose dice`
      //   ){
      //     player2CurrentNumber = generateNumFromDiceOrder(input) 
      //     console.log(`player 2 number`, player2CurrentNumber);
      //     player2NumbersList.push(player2CurrentNumber);
      //     var gameResults = generateGameResults();
      //     myOutputValue = `${currentPlayer}, you chose Dice ${input} first.<br>
      //     Your number is ${player2CurrentNumber}.<br>
      //     ${gameResults}`;
      //     currentPlayer = `Player 1`;
      //   };
      
    };
  return myOutputValue;
};







