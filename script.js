var GAME_STATE_DICE_ROLL = 'GAME_STATE_DICE_ROLL';
var GAME_STATE_CHOOSE_DICE_ORDER = 'GAME_STATE_CHOOSE_DICE_ORDER';
var GAME_STATE_COMPARE_SCORES = 'GAME_STATE_COMPARE_SCORES';
var gameState = GAME_STATE_DICE_ROLL;

var currentPlayerRolls = []; 

var currentPlayer = 1;
var allPlayersScore = []; 

var rollDice = function(){
  console.log('Control flow: start of rollDice()')
  var randomInteger = Math.ceil(Math.random() * 6);
  
  console.log('rollDice output, randomInteger:', randomInteger);
  return randomInteger;
};

var rollDiceForPlayer = function(){
  console.log('Control flow: start of rollDiceForPlayer()');
  var counter = 0;
  while (counter < 2){
    currentPlayerRolls.push(rollDice());
    counter = counter + 1;
  }

  console.log('rollDiceForPLayer changes, currentPlayerRolls:', currentPlayerRolls);
  return "Welcome, Player "+ currentPlayer + "<br><br>You rolled:<br>Dice 1:" + currentPlayerRolls[0] + "| Dice 2:" + currentPlayerRolls[1] + ".<br><br>Now, please input either '1' or '2' to choose the corresponding dice to be used as the first digit of your final value."
};

var getPlayerScore = function(playerInput){

  var playerScore;

  if(playerInput != 1 && playerInput != 2){
      console.log('Control flow: input validation, valid input... Not 1 & not 2');
      return"Error! Please only input '1' or '2' to choose which dice to use as the first digit.<br><br>Your dice rolls are:<br>Dice 1: " + currentPlayerRolls[0] + "| Dice 2: " + currentPlayerRolls[1] + "."; 
    }

    if(playerInput == 1){
      var playerScore = Number(String(currentPlayerRolls[0]) + String(currentPlayerRolls[1]));
      return "Your chosen value is:" + playerScore;
    }

    if(playerInput == 2){
      var playerScore = Number(String(currentPlayerRolls[1]) + String(currentPlayerRolls[0]));

      allPlayersScore.push(playerScore);

      curren = [];
      return "Player "+ currentPlayer + ", your chosen value is: " + playerScore;
    }
};

//Need to check this function
var comparePlayersScores = function(){

    var compareMessage = "Player 1 score:" + allPlayersScore[0]+ "<br>Player 2 score: " + allPlayersScore[1];

    if(allPlayersScore[0] > allPlayersScore[1]){
      compareMessage = compareMessage + "<br><br>Player 1 wins.";
    }

    if(allPlayersScore[0] < allPlayersScore[1]){
      compareMessage = compareMessage + "<br><br>Player 2 wins.";
    }

    if(allPlayersScore[0] == allPlayersScore[1]){
      compareMessage = compareMessage + "<br><br>It is a tie.";
    }
    
    return compareMessage;
};

var resetGame = function(){
  currentPlayer = 1;
  gameState = GAME_STATE_DICE_ROLL;
  allPlayersScore = [];
};

var main = function (input) {
  console.log('Checking game state on submit click:', gameState);
  console.log('Checking currentPlayer on submit click:', currentPlayer);
  var outputMessage = '';

  if(gameState == GAME_STATE_DICE_ROLL){
    console.log ('Control flow: gameState == GAME_STATE_DICE_ROLL');
  
    outputMessage = rollDiceForPlayer();

    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
    return outputMessage;
  }

  if(gameState == GAME_STATE_CHOOSE_DICE_ORDER){
    console.log('Control flow: gameState == GAME_STATE_CHOOSE_DICE_ROLL');

    outputMessage = getPlayerScore(input);

    if(currentPlayer == 1){
      console.log("Control flow: end of player 1's turn, now player 2's turn");
      currentPlayer = 2;
      gameState = GAME_STATE_DICE_ROLL;
      return outputMessage + "<br><br>It is now player 2's turn!";
    }

    if(currentPlayer == 2){
      console.log("Control flow: end of player 2's turn, Next submit click will calculate score.");
      gameState = GAME_STATE_COMPARE_SCORES;
      return outputMessage + "<br><br>Press submit to calculate scores.";
    }
  }

  if(gameState == GAME_STATE_COMPARE_SCORES){
    console.log('Control flow: gameState == GAME_STATE_COMPARE_SCORES');

    outputMessage = comparePlayersScores();

    resetGame();
    console.log("Current player after reset: ", currentPlayer);
    console.log("Game state after reset:", gameState);
    console.log("allPlayersScore array: ", allPlayersScore);
    return outputMessage;
  }
}