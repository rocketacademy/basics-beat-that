//====Requirements=====//

//1) there are 2 players and players take turns
//2) when a player clicks submit, the game rolls 2 dice and shows the dice rolls, eg. 3 and 6
//3) the player picks the order of the dice they want. Eg. if they wanted the number 63, they would specify that the 2nd dice goes first
//4) after both players have rolled and chosen dice order, the player with the higher combined number wins


//==== problem breakdown and planning =====//
//ver 1. rolls 2 dice and turns the output for 1 player. That player chooses the dice order and gets the correct return output.
// ver 2. refactored code to include Player 2 
//    - need global variables to keep track of the current player
//    - refactor outputMessages to interact with each player, 1 and 2, and finally point towards comparing score
//    - write logic for player 1 to go first then player 2
//ver 3. implementing comparing dice scores and declare the winner
// ver 4. reset the game so that the players can play continually without refreshing the browser page


var GAME_STATE_DICE_ROLL = "GAME_STATE_DICE_ROLL";
var GAME_STATE_CHOOSE_DICE_ORDER = "GAME_STATE_CHOOSE_DICE_ROLL";
var GAME_STATE_COMPARE_SCORES;
var gamestate = GAME_STATE_DICE_ROLL;

var currentPlayerRolls = [];

var currentPlayer = 1;
var allPlayerScore = [];

//Helper function to roll dice
var rollDice = function () {
  console.log('Control flow: start of rollDice()');
  //Random decimal between 0 and 6
  var randomDecimal = Math.random() * 6;
  //Random integer from 1 to 6
  var randomInteger = Math.floor(randomDecimal) + 1;

  console.log('rollDice output, randomInteger: ', randomInteger);

  return randomInteger;
}

//helper function to roll 2 dice
var rollDiceForPlayer = function() {
  var counter = 0;
  while (counter < 2) {
    currentPlayerRolls.push(rollDice());
    counter ++;
  }
  return `Welcome ${currentPlayer}!<br><br>You have rolled:<br>Dice 1: ${currentPlayerRolls[0]}<br>Dice 2: ${currentPlayerRolls[1]}<br><br>Now input either '1' or '2' to choose the corresponding dice to coose the corresponding dice to be used as the first digit of your final value.`
}

//get player's input and output the appropriate message
var getPlayerScore = function (playerInput) {
  var playerScore;
  //input validation
  if (playerInput != 1 && playerInput != 2) {
    return `Error! Please only input either '1' or '2' to choose which dice to use as the first digit. <br><br>Your dice rolls are:<br>Dice 1: ${currentPlayerRolls[0]}<br>Dice 2: ${currentPlayerRolls[1]}.`;
  }
  if (playerInput == 1) {
    console.log("Control flow: input == 1");
    var playerScore = Number(String(currentPlayerRolls[0]) + String(currentPlayerRolls[1]));
  }

  if (playerInput == 2) {
    console.log("Control flow: input == 2");
    var playerScore = Number(String(currentPlayerRolls[1]) + String(currentPlayerRolls[0]));
  }

  //store playerScore in array
  allPlayerScore.push(playerScore);
  //clear current player rolls array
  currentPlayerRolls = [];
  return `Player ${currentPlayer}, your chosen value is ${playerScore}`;
};

var comparePlayerScores = function() {
  compareMessage = `Player 1 score: ${allPlayerScore[0]} <br><br>Player 2 score: ${allPlayerScore[1]}`;
  //Player 1 wins
    if (allPlayerScore[0] > allPlayerScore[1]) {
      compareMessage = compareMessage + "<br><br>Player 1 wins!";
    }

    //Player 2 wins
      if (allPlayerScore[0] < allPlayerScore[1]) {
        compareMessage = compareMessage + "<br><br>Player 2 wins!";
      }

    //tie
      if (allPlayerScore[0] === allPlayerScore[1]) {
        compareMessage = compareMessage + "<br><br>It's a tie!";
      }

  return compareMessage;
}

function main(input) {
  console.log('Checking game state on submit click: ', gamestate);
  var outputMessage = '';
  if (gamestate == GAME_STATE_DICE_ROLL) {
    console.log("Control flow: gamestate == GAME_STATE_DICE_ROLL");

    //Display dice rolled as output message
    outputMessage = rollDiceForPlayer();

    //Change the game state
    gamestate = GAME_STATE_CHOOSE_DICE_ORDER;
    return outputMessage;
  }
  
  if (gamestate == GAME_STATE_CHOOSE_DICE_ORDER) {
    console.log('Control flow: gamestate == GAME_STATE_CHOOSE_DICE_ORDER');

    //call playerScore function
    outputMessage = getPlayerScore(input);    

if (currentPlayer ==1) {
  console.log("Control flow: end of Player 1's turn, now it's player 2's turn");
  currentPlayer = 2;
  gamestate = GAME_STATE_DICE_ROLL;
  
  return outputMessage + `<br><br>It is now player 2's turn!`;
}
    if (currentPlayer == 2) {
      console.log("Control flow: end of player 2's turn, Next submit click will calculate score");
      gamestate = GAME_STATE_COMPARE_SCORES;

      return outputMessage + `<br><br>Press Submit again to calculate scores.`;
    }
    
  }

  if (gamestate == GAME_STATE_COMPARE_SCORES) {
    console.log("Control flow: gamestate == GAME_STATE_COMPARE_SCORES");

    outputMessage = comparePlayerScores();
    return outputMessage;
  }

    

}
