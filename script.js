// Initialise global variables to keep track of...
var gameStage = 'Input players';  // whether input players or player Roll dice or Select dice or Leader Board
var playerNum = 1;  // which player's turn
var diceOrder = 0;  // which dice does the user choose to be  first numeral of the combined number.
var diceRoll = [0,0];   // dice rolls
var playerTotalScores = Array(6).fill(0);   // total scores for each player in an array (max 6 players)
var players = Array(6).fill(null).map((_, i) => i);   // starting positions of the players
var largestPlayerNum = 2;   // only 2 players for a start
var numberOfDice = 2;       // only 2 dice for a start


var main = function (input) {
  // At the Input Players stage - for user to change # of players
  if (gameStage == 'Input players') {
    if (input <2 || input >6) {   // if input is Not within the range, then return error msg
      return 'Please input a number between 2 to 6 for number of players.' 
    } else {
      largestPlayerNum = input;
    }
    gameStage = 'Roll Dice';                                // toggle to Roll dice after input players 
  }


  // initial stage of the game is to roll dice
  if (gameStage == 'Roll Dice') {
    for (var i=0; i<numberOfDice; i+=1) {
      diceRoll[i] = rollDice();
    }
  
    var myOutputValue = `Welcome Player ${playerNum}, you rolled ${diceRoll[0]} and ${diceRoll[1]}. <br> <br>
                        Please choose the order of the dice by entering "1" or "2".`;

    gameStage = 'Select Dice';   // toggle to Select dice after rolling dice
    return myOutputValue;
  }
  

  // Next stage is to read the order of the dice and combine
  if (gameStage == 'Select Dice'){
    diceOrder = input;
    if (diceOrder != 1 && diceOrder != 2) {   // validate user input - only 1 and 2 are acceptable
      return 'Please input 1 or 2 for the order of the dice.'
    }

    var playerScore = combineDice(diceRoll[0], diceRoll[1], diceOrder);
    myOutputValue = `Player ${playerNum}, your number is ${playerScore}. <br> <br>`;

    updateScore(playerNum, playerScore);   console.log(playerTotalScores);  console.log(players);

    if (playerNum == largestPlayerNum) {
      gameStage = 'Leader Board';   // toggle back to show leader board everytime after (last) Player finish  
      myOutputValue = myOutputValue + `Press submit to find out who's currently leading :)`;
    } else {
      gameStage = 'Roll Dice';   // toggle back to Roll dice after completing the turn
      myOutputValue = myOutputValue + `It is now Player ${nextPlayer(playerNum)}'s turn.`;
    } 

    playerNum = nextPlayer(playerNum);    // get the next player
    return myOutputValue;
  }

  // To display results of Leader Board
  if (gameStage == 'Leader Board') {
    myOutputValue = showLeaderBoard();
    gameStage = 'Roll Dice';   // toggle back to Roll dice after showing leader board
    return myOutputValue;
  }

};




var showLeaderBoard = function(){
  bubbleSort();     // sort the player scores in descending order
  console.log(playerTotalScores);  console.log(players);

  caption = `<h2> Leaderboard 🏆 </h2> <hr> <br>`;
  body = '';

  for (var i=0; i<largestPlayerNum; i+=1) {   // display the players and scores in the sorted arrays
    body = body + `Player ${players[i]+1} : ${playerTotalScores[i]} <br>`;
  }
  
  return caption + body + `<br> Press submit to continue playing`;

}


var bubbleSort = function() {
  for (var i=0; i<largestPlayerNum; i+=1) {
    for (var j=0; j<largestPlayerNum-1; j+=1) {
      if (playerTotalScores[j] < playerTotalScores[j+1]) {
        // swap the scores to be of the right order
        temp = playerTotalScores[j];
        playerTotalScores[j] = playerTotalScores[j+1];
        playerTotalScores[j+1] = temp;

        // swap player positions
        temp = players[j];
        players[j] = players[j+1];
        players[j+1] = temp;

      }
    }
  }

}

var combineDice = function(inputDice1, inputDice2, inputOrder) {
  // If player pick Dice 1 as first numeral, then shd be 10*inputDice1 + inputDice2
  // If player pick Dice 2 as first numeral, then shd be 10*inputDice2 + inputDice1
  if (inputOrder == 1) {
    return 10*inputDice1 + inputDice2;
  } else {
    return 10*inputDice2 + inputDice1;
  }
}

var updateScore = function(inputPlayer, inputScore) {
  // find player in the players array
  for (var i=0; i<largestPlayerNum; i+=1) {
    if (inputPlayer == players[i]+1) {index = i; break;}
  }

  // add the new player score to current total score
  playerTotalScores[index] = playerTotalScores[index] + inputScore;  // add to player's total score

}

var nextPlayer = function(currentPlayer) {
  next = currentPlayer + 1;
  if (next > largestPlayerNum) {next = next - largestPlayerNum; }
  return next;
}

var rollDice = function () {
  // Generate a decimal from 0 through 6, inclusive of 0 and exclusive of 6.
  var randomDecimal = Math.random() * 6;

  // Remove the decimal with the floor operation.
  // This will be an integer from 0 to 5 inclusive.
  var randomInteger = Math.floor(randomDecimal);

  // Add 1 to get valid dice rolls of 1 through 6 inclusive.
  var diceNumber = randomInteger + 1;

  return diceNumber;
};
