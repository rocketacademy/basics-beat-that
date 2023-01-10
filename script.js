//Cloned from day9 more dice more players

//GLOBAL VARIABLES
//Game states
var START = "START";
var SET_PLAYERS = "SET_PLAYERS";
var SET_ROLLS = "SET_ROLLS";
var DICE_ROLL = "DICE_ROLL";
var SCOREBOARD = "SCOREBOARD";

//Selected number of players and dice to play with
var playersList = [];
var chosenDiceRolls = 0;

//Set initial state
var gameState = START;
var playerInPlay;
var roundWinner;
var overallWinner;

//HELPER FUNCTIONS
//create an array of objects - # of objects = # of players
var createPlayersList = function (input) {
  var currentPlayer = 1;

  while (currentPlayer <= input) {
    var player = {
      name: `Player ${currentPlayer}`,
      hand: [],
      tally: 0,
      score: 0,
    }
    playersList.push(player);
    currentPlayer +=1;
  }
  return playersList;
};


//roll dice (1 to 6) for as many times as chosenDiceRolls indicates
var rollDiceForPlayer = function () {
  var counter = 0;

  while (counter < chosenDiceRolls) {
    playerInPlay.hand.push(Math.floor(Math.random() * 6) + 1);
    counter += 1;
  }
  return playerInPlay.hand;
};

//sort largest to smallest number
var sortBigToSmall = function (input) {

  for (i = 0; i < input.length; i += 1) {
    for (j = 0; j < (input.length - i - 1); j ++) {
      if (input[j] < input[j+1]) {
        var temp = input[j];
        input[j] = input[j+1];
        input[j+1] = temp;
      } 
    }
      console.log(input)
      console.log(j)
      console.log(i)
  }
  return null;
}

//Converts array of numbers to a number
var convertArrayToNumber = function (input) {
  var runDown = chosenDiceRolls - 1;
  var counter = 0;

  while (runDown >= 0) {
    var number = input[counter] * Math.pow(10, runDown);
    console.log(number);
    playerInPlay.tally += number;
    console.log(playerInPlay.tally);
    runDown -= 1;
    counter += 1;
  }
  return playerInPlay.tally;
};

//Compares the score 
var tallyComparison = function () {
  var i = 0;
  roundWinner = playersList[i];

  while (i < playersList.length - 1) {
    if (roundWinner.tally > playersList[i+1].tally) {
      roundWinner = roundWinner;
    } else {
      roundWinner = playersList[i+1];
    }
    i +=1;
  }

  roundWinner.score +=1;
  console.log (playersList.score);
  return roundWinner;
};

//Find out who is leading 
var scoreComparison = function () {
  var i = 0;
  overallWinner = playersList[i];

  while (i < playersList.length - 1) {
    if (overallWinner.score > playersList[i+1].score) {
      overallWinner = overallWinner;
    } else {
      overallWinner = playersList[i+1];
    }
    i +=1;
  }

  return overallWinner;
};

//reset
var resetGame = function () {
  var counter = 0;

  while (counter < playersList.length) {
    playersList[counter].hand = [];
    playersList[counter].tally = 0;

    counter += 1;
  }
  gameState = DICE_ROLL;
  return null;
};

//main
var main = function (input) {
  //check game state and player before start
  console.log(gameState);

  if (gameState == START) {
    gameState = SET_PLAYERS;
    console.log(gameState);
    return `Begin by choosing the number of players playing the game.`;
  }

  if (gameState == SET_PLAYERS) {
    createPlayersList(input);
    gameState = SET_ROLLS;
    console.log(playersList);
    return `You have chosen to play with ${input} players. Now choose the number of dice to play with.`;
  }
  
  if (gameState == SET_ROLLS) {
    chosenDiceRolls = input;
    gameState = DICE_ROLL;
    return `You have chosen to play with ${chosenDiceRolls} dice. Time to rock and roll (pun intended!). Click Submit for all players to roll the dice.`;
  }

  if (gameState == DICE_ROLL) {
    var playerCounter = 0;
    var outputStatement = 'Let the games begin (again).<br>';

    while (playerCounter < playersList.length) {
      playerInPlay = playersList[playerCounter];

      rollDiceForPlayer();
      var copiedHand = [...playerInPlay.hand];
      sortBigToSmall(copiedHand);
      convertArrayToNumber(copiedHand);
      console.log(playerInPlay.tally);
      outputStatement += `${playerInPlay.name} rolled ${playerInPlay.hand}. His highest number is ${playerInPlay.tally}.<br>`
      playerCounter += 1;
    }
    
    tallyComparison();
    
    outputStatement += `For this round, the winner is ${roundWinner.name} with a tally of ${roundWinner.tally}. <br> Let's check the scoreboard so far.`
    console.log(playersList);
    gameState = SCOREBOARD;
    return outputStatement;
  }

  if (gameState == SCOREBOARD) {
    var scoreCounter = 0;
    var outputStatement = 'The current score stands at<br>';

    while (scoreCounter < playersList.length) {
      playerInPlay = playersList[scoreCounter];
      outputStatement += `${playerInPlay.name} has a score of ${playerInPlay.score} point(s).<br>`
      scoreCounter += 1;
    }

    scoreComparison();
    outputStatement += `${overallWinner.name} is leading the race with ${overallWinner.score} point(s).<br> Shall we go again?`
    resetGame();
    return outputStatement;
  }

}



/*

// sort using while loops - why doesn't work?
var playerInPlay = [2, 3, 5, 5];
console.log(playerInPlay)

var sortBigToSmall = function () {
  var i = 0;
  var j = 0;
  while (i < playerInPlay.hand.length) {
    while (j < playerInPlay.hand.length - i - 1) {
      if (playerInPlay.hand[j] < playerInPlay.hand[j+1]) {
        var temp = playerInPlay.hand[j];
        playerInPlay.hand[j] = playerInPlay.hand[j+1];
        playerInPlay.hand[j+1] = temp;
      }
      j +=1;
    }
    i +=1;
  }
  return null;
}

var main = function () {
  return sortBigToSmall();
};

*/