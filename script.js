var GAME_STATE_DICE_ROLL = 'GAME_STATE_DICE_ROLL';
var GAME_STATE_CHOOSE_DICE_ORDER = 'GAME_STATE_CHOOSE_DICE_ORDER';
var GAME_STATE_COMPARE_SCORE = 'GAME_STATE_COMPARE_SCORE';
var gameState = GAME_STATE_DICE_ROLL;

var currentPlayerRolls = [];
var currentPlayer = 1;
var allPlayersScore = [];

var rollDice = function () {;
  var randomDecimal = Math.random() * 6;
  var resultInteger = Math.floor(randomDecimal);
  var diceNumber = resultInteger + 1;
  console.log ('rollDice', diceNumber);
  return diceNumber;
}

var rollDiceForPlayer = function (){;
  var counter = 0;
  while (counter < 2){
    currentPlayerRolls.push(rollDice());
    counter = counter + 1;
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
  };
  return `Welcome to Beat That Player ${currentPlayer}!<br><br>Your Dice 1 rolled: ${currentPlayerRolls[0]} & Dice 2 rolled: ${currentPlayerRolls[1]} <br><br>Now input either '1' or '2' to choose the dice number you want as the first digit of your final value.`;
}

var getPlayerScore = function (input){
  var currentPlayerScore;
  if (input == '1'){;
    var playerScore = Number(String(currentPlayerRolls[0]) + String(currentPlayerRolls[1]));
    currentPlayerScore = `Your chosen value is ${playerScore}`
  }
  if (input == '2'){;
    var playerScore = Number(String(currentPlayerRolls[1]) + String(currentPlayerRolls[0]));
    currentPlayerScore = `Your chosen value is ${playerScore}`
  }
  allPlayersScore.push(currentPlayerScore);
  currentPlayerRolls = [];
  return `Player ${currentPlayer}: ${currentPlayerScore}`;
}

var comparePlayersScore = function (){
  myOutputValue = `Player 1:${allPlayersScore[0]}<br>Player 2:${allPlayersScore[1]}`;
  if (allPlayersScore[0] > allPlayersScore[1]){
    myOutputValue = `${myOutputValue} <br><br> Player 1 wins!`;
  }
  if (allPlayersScore[1] > allPlayersScore[0]){
    myOutputValue = `${myOutputValue} <br><br> Player 2 wins!`;
  }
  if (allPlayersScore[0] == allPlayersScore[1]){
    myOutputValue = `${myOutputValue} <br><br> It's a draw!`;
  };
  return myOutputValue;
}

var gameReset = function(){
  currentPlayer = 1;
  gameState = GAME_STATE_DICE_ROLL;
  allPlayersScore = [];
}

var main = function (input) {
  console.log('current player', currentPlayer)
  var myOutputValue = '';
  if (gameState == GAME_STATE_DICE_ROLL){
    myOutputValue = rollDiceForPlayer();
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
    return myOutputValue;
  };

  if (gameState == GAME_STATE_CHOOSE_DICE_ORDER){
    myOutputValue = getPlayerScore(input);
    if (currentPlayer == 1){
      currentPlayer = 2;
      gameState = GAME_STATE_DICE_ROLL;
      return `${myOutputValue} <br><br> It's now Player 2's turn! Press submit.`;
    };
    if (currentPlayer == 2){
      gameState = GAME_STATE_COMPARE_SCORE;
      return `${myOutputValue} <br><br> Now press submit to see final scores!`;
    };
  };

  if (gameState == GAME_STATE_COMPARE_SCORE){
    myOutputValue = comparePlayersScore();
    gameReset();
    return myOutputValue;
  };
  }
