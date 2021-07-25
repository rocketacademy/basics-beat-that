//constant variables
var PLAYER_1 = `Player 1`;
var PLAYER_2 = `Player 2`;
var GAME_MODE_ROLL_DICE = `roll dice`;
var GAME_MODE_CHOOSE_DICE_ORDER = `choose dice`;
var RESULTS_MODE_DEFAULT = `default`;
var RESULTS_MODE_LOWEST = `lowest`

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

//keep track of running score for each player
var player1RunningScore = 0;
var player2RunningScore = 0;

//keep track of current results mode - start with default mode
var currentResultsMode = RESULTS_MODE_DEFAULT;

//generates random dice number
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
}; 

//DICE ROLL GAME MODE LOGIC
//rolls two dice and changes mode to `choose dice`
var generateTwoDiceRolls = function(){
  dice1 = rollDice().toString();
  dice2 = rollDice().toString();
  currentMode = GAME_MODE_CHOOSE_DICE_ORDER;
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

//CHOOSE DICE GAME MODE LOGIC
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
  currentMode = GAME_MODE_ROLL_DICE;
  return `${currentPlayer}, you chose Dice ${diceOrder} first.<br>
  Your number is ${chosenNumber}.`;
};

//GAME RESULTS
//compares players' chosen numbers and returns result of game
//where highest number wins
var generateGameResults = function(){
  var indexLastPlayer1Number = player1Numbers.length - 1;
  var indexLastPlayer2Number = player2Numbers.length - 1;
  if(player1Numbers[indexLastPlayer1Number] > player2Numbers[indexLastPlayer2Number]){
    return `Player 1 wins the round!`
  }else{
    if(player2Numbers[indexLastPlayer2Number] > player1Numbers[indexLastPlayer1Number]){
      return `Player 2 wins the round!`
    }else {
      return `It's a tie.`
    };
  };
};

//compares players' chosen numbers and returns result of game
//where lowest number wins
var generateLowestNumberGameResults = function(){
  var indexLastPlayer1Number = player1Numbers.length - 1;
  var indexLastPlayer2Number = player2Numbers.length - 1;
  if(player1Numbers[indexLastPlayer1Number] < player2Numbers[indexLastPlayer2Number]){
    return `Player 1 wins the round!`
  }else{
    if(player2Numbers[indexLastPlayer2Number] < player1Numbers[indexLastPlayer1Number]){
      return `Player 2 wins the round!`
    }else {
      return `It's a tie.`
    };
  };
};

//returns current player's running score based on current player
var currentPlayerRunningScore = function(currentPlayer){
  if (currentPlayer == PLAYER_1){
    return player1RunningScore;
  }else{
    if(currentPlayer == PLAYER_2){
      return player2RunningScore;
    };
  };
};

//RUNNING SCORES
//generate running score of player's numbers 
var generateRunningScore = function(){
  var counter = 0;
  var runningScore = 0;
    while (counter < currentPlayerNumbers(currentPlayer).length){
      runningScore += Number(currentPlayerNumbers(currentPlayer)[counter]);
      counter += 1;
    };
    if (currentPlayer == PLAYER_1){
      player1RunningScore = runningScore;
      return player1RunningScore;
    }else{
      if(currentPlayer == PLAYER_2){
        player2RunningScore = runningScore;
        return player2RunningScore;
      };
    };
};

//LEADERBOARD
//compares players' running scores and returns leaderboard
//where highest number is in the lead
var generateLeaderboard = function(){
  var runningScore = generateRunningScore();
  if(player1RunningScore > player2RunningScore){
    return `Player 1 is in the lead!<br>
    Player 1 running score: ${player1RunningScore}<br>
    Player 2 running score: ${player2RunningScore}`
  }else{
    if(player2RunningScore > player1RunningScore){
      return `Player 2 is in the lead!<br>
      Player 2 running score: ${player2RunningScore}<br>
      Player 1 running score: ${player1RunningScore}`
    }else {
      return `It's a tie.`;
    };
  };
};

//compares players' running scores and returns leaderboard
//where lowest number is in the lead
var generateLowestNumberLeaderboard = function(){
  var runningScore = generateRunningScore();
  if(player1RunningScore < player2RunningScore){
    return `Player 1 is in the lead!<br>
    Player 1 running score: ${player1RunningScore}<br>
    Player 2 running score: ${player2RunningScore}`
  }else{
    if(player2RunningScore < player1RunningScore){
      return `Player 2 is in the lead!<br>
      Player 2 running score: ${player2RunningScore}<br>
      Player 1 running score: ${player1RunningScore}`
    }else {
      return `It's a tie.`;
    };
  };
};

//returns game result logic based on current results mode
var currentGameResult = function(currentResultsMode){
  if (currentResultsMode == RESULTS_MODE_DEFAULT){
    return generateGameResults();
  }else{
    if(currentResultsMode == RESULTS_MODE_LOWEST){
      return generateLowestNumberGameResults();
    };
  };
};

//returns leaderboard logic based on current results mode
var currentLeaderboard = function(currentResultsMode){
  if (currentResultsMode == RESULTS_MODE_DEFAULT){
    return generateLeaderboard();
  }else{
    if(currentResultsMode == RESULTS_MODE_LOWEST){
      return generateLowestNumberLeaderboard();
    };
  };
};

//MAIN FUNCTION
var main = function (input) {
  var myOutputValue = '';

  //allow input to change result mode
  if(input == RESULTS_MODE_DEFAULT){
    currentResultsMode = RESULTS_MODE_DEFAULT;
     return `You have changed game mode to ${currentResultsMode}.`;
   }else{
    if (input == RESULTS_MODE_LOWEST){
      currentResultsMode = RESULTS_MODE_LOWEST;
        return`You have changed game mode to ${currentResultsMode}.`;
    };
   };
 
  if(
    currentMode == GAME_MODE_ROLL_DICE
    ){
      myOutputValue = generateTwoDiceRolls();
    }else{
      if (
        currentMode == GAME_MODE_CHOOSE_DICE_ORDER
      ){if(
        //input validation under choose dice order mode
        input != 1 &&
        input != 2
      ){
          return `You can only enter 1 or 2 to choose your dice order.<br>
          Please try again.`;
      }else{
        var resultsModeMessage = `Current result mode: ${currentResultsMode}`;
        var chosenNumMessage = generateNumFromDiceOrder(input);
        var leaderboard = currentLeaderboard(currentResultsMode);
        //Player 1 chooses dice order
        if(currentPlayer == PLAYER_1){
          myOutputValue = `${resultsModeMessage}<br><br>
          ${chosenNumMessage}<br>
          It is now Player 2's turn.<br><br>
          ${leaderboard}`;
          currentPlayer = PLAYER_2;
        }else{
          //Player 2 chooses dice order
          //Game results displayed
          if(currentPlayer == PLAYER_2){
            var gameResults = currentGameResult(currentResultsMode);
            myOutputValue = `${resultsModeMessage}<br><br>
            ${chosenNumMessage}<br>
            ${gameResults}<br><br>
            ${leaderboard}`;
            currentPlayer = PLAYER_1;
          };
        };
      };
    };
  };        
  return myOutputValue;
};
