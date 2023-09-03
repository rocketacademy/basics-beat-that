let main = function (input){
  //return base (input);
  return moreComfortable (input);
};

let gameMode = 'Dice game';
  
// player 1 will start first
let currentPlayer = 1;

// maximum number of players for base game
let maxNumPlayersInBase = 4;

// store generated dice rolls
let playerDiceArray = [];

// record individual score based on dice order selection
let currentScore = 0;

// store all players' scores in an array 
let cumulatedScores = [];

// maximum number of players in moreComfortable game
let maxNumPlayersInMC = 2;

// store player one's score based on dice order selection in moreComfortable game
let playerOneCumulativeScore = 0;

// store player two's score based on dice order selection in moreComfortable game
let playerTwoCumulativeScore = 0;

// store accumulated ongoing scores temporarily in moreComfortable game
let tempArray = [];


// set a function to generate random dices from 1 to 6
let rollDice = function (){
  return Math.ceil(Math.random () * 6);
};


// set a function to generate and store random dices
let generateDiceRoll = function (){
  playerDiceArray = []; // reset array to store dices at every player's turn
  let maxNumDice = 2;
  for (let diceCounter = 0; diceCounter < maxNumDice; diceCounter += 1){
      let randomDiceRoll = rollDice();
      playerDiceArray.push(randomDiceRoll);
  }
  return `You rolled ${playerDiceArray[0]} for Dice One and ${playerDiceArray[1]} for Dice Two. <br><br>
  Please enter either '1' or '2' to choose the order of the dice.`;
};


// set a function to determine individual score based on player's order of dice
let evaluateIndividualScore = function (userDecision, gamePlay){
  if (userDecision == '1'){
    currentScore = Number(String(playerDiceArray[0]) + String(playerDiceArray[1]));
  } else {
    currentScore = Number(String(playerDiceArray[1]) + String(playerDiceArray[0]));
  }
  
  if (gamePlay == 'base'){
    cumulatedScores.push(currentScore); 
  } else {
    if (currentPlayer == '1'){
      playerOneCumulativeScore +=  currentScore; // accumulate scores for player one 
      cumulatedScores[currentPlayer-1] = playerOneCumulativeScore;
    } else {
      playerTwoCumulativeScore +=  currentScore; // accumulate scores for player two 
      cumulatedScores[currentPlayer-1] = playerTwoCumulativeScore;
    }
  }
  return `<b>Player ${currentPlayer} 🎲</b><br><br> You chose ${userDecision}. You scored ${currentScore} points.`;
};
  

// set a function to determine winner
// if players have equal scores and are higher than the rest, there will be no winners 
let evaluateWinnerInBase = function (){
  let winner = 0; // reset winner for next game
  let numWinner = 0; // reset number of winner(s) for next game
  let scoreDisplayMessage = " ";
  let winnerMessage = " ";
  for (let playerIndex = 0; playerIndex < cumulatedScores.length; playerIndex += 1){
    scoreDisplayMessage += `Player ${playerIndex + 1}: ${cumulatedScores[playerIndex]}<br>`;

    if (cumulatedScores[playerIndex] == Math.max.apply(Math, cumulatedScores)){
      numWinner += 1; // increment number of winners with scores that are equal and higher than the rest
      winner = playerIndex + 1; // indicate the corresponding player who wins
    }
  }
  if (numWinner >= 2){
    winnerMessage = `There are no winners.`;
  } else {
  winnerMessage = `<em><b>Player ${winner} is the winner!</b></em>`;
  }
  return `${winnerMessage}<hr>🏆 Final Scores:<br><br>${scoreDisplayMessage}<br>Click on 'Submit' to play another round!`
};


// set a function to reset the game 
let resetGame = function() {
  currentPlayer = 1;
  cumulatedScores = [];
  gameMode = 'Dice game';
};


// set a function to determine winner
let evaluateWinnerInMC = function (){
  let runningScoreMessage = " ";
  let winnerMessage = " ";

  if (cumulatedScores[0] > cumulatedScores[1]){
    runningScoreMessage = `Player 1: ${cumulatedScores[0]}<br>Player 2: ${cumulatedScores[1]}`;
    winnerMessage = `Player 1 is leading!`;
  } else {
    runningScoreMessage = `Player 2: ${cumulatedScores[1]}<br>Player 1: ${cumulatedScores[0]}`;
    if (cumulatedScores[0] == cumulatedScores[1]){
      winnerMessage = `Wow, both tie!`;
    } else {
      winnerMessage = `Player 2 is leading!`;
    }
  }
  return `<b>${winnerMessage}</b><hr>🏆 Leaderboard:<br><br>${runningScoreMessage}<br><br>Click on 'Submit' to play another round!`;
};


// actual game (base)
let base = function (input){
  let headerMessage = `<b>Welcome, Player ${currentPlayer}</b> 🎲 `;
  if (gameMode == 'Dice game'){
      let diceRollGenerator =  generateDiceRoll();
      gameMode = 'Choose order of dice';
      return `${headerMessage}<br><br>${diceRollGenerator}`;
  }
  
  let userDecision = Number(input);
  let gamePlay = 'base';
  
  // check for input validation
  if (!(userDecision == '1' || userDecision == '2') && (currentPlayer <= maxNumPlayersInBase)){ 
    return `Please enter either '1' or '2' to determine your score.<br><br>Your dice rolls were ${playerDiceArray[0]} and ${playerDiceArray[1]}.`;
  }

  // if player selected either 1 or 2 and the game reaches 3rd player
  if ((userDecision == '1' || userDecision == '2') && currentPlayer < maxNumPlayersInBase){
    
    // reset game mode to allow next player to roll dice
    gameMode = 'Dice game';
    let individualScore = evaluateIndividualScore(userDecision, gamePlay);
    
    // update next player 
    let nextPlayer = (currentPlayer % maxNumPlayersInBase) + 1;
    currentPlayer = nextPlayer;
    return `${individualScore}<br><br>Player ${nextPlayer}, you are up next! 💨`;
  }

  // if player selected either 1 and 2 and the game reaches the final player/4th player 
  if ((userDecision == '1' || userDecision == '2') && currentPlayer == maxNumPlayersInBase){
    let individualScore = evaluateIndividualScore(userDecision, gamePlay);
    let winnerResult = evaluateWinnerInBase();
    let outputMessage = `${individualScore}<br><br> ${winnerResult}`;
    resetGame();
    return outputMessage;
  }
};


// actual game (more comfortable)
let moreComfortable = function (input){
  let headerMessage = `<b>Welcome, Player ${currentPlayer}</b> 🎲 `;
  
  // start of dice roll game
  if (gameMode == 'Dice game'){
    let diceRollGenerator =  generateDiceRoll ();
    gameMode = 'Choose order of dice';
    return `${headerMessage}<br><br>${diceRollGenerator}`;
  }
  
  let userDecision = Number(input);

  // player decision in order of dice
  if (gameMode == 'Choose order of dice'){
    
    // check for input validation
    if (!(userDecision == '1' || userDecision == '2')){
      return `Please enter either '1' or '2' to determine your score.<br><br>Your dice rolls were ${playerDiceArray[0]} and ${playerDiceArray[1]}.`;
    }
    
    // if player selected either 1 or 2 and game reaches only 1st player
    if ((userDecision == '1' || userDecision == '2') && (currentPlayer < maxNumPlayersInMC)){
      
      // reset game mode to allow next player to roll dice
      gameMode = 'Dice game';
      let gamePlay = 'MC';
      let individualScore = evaluateIndividualScore(userDecision, gamePlay);

      // update next player 
      let nextPlayer = (currentPlayer % maxNumPlayersInMC) + 1;
      currentPlayer = nextPlayer;
      return `${individualScore}<br><br> Player ${nextPlayer}, you are up next! 💨`;
    }
    
    // if player selected either 1 and 2 and the game reaches the final player/2nd player 
    if ((userDecision == '1' || userDecision == '2') && currentPlayer == maxNumPlayersInMC){
      let gamePlay = 'MC';
      let individualScore = evaluateIndividualScore(userDecision, gamePlay);
      gameMode = 'Leaderboard';
      return `${individualScore}<br><br>Click on 'Submit' to see who is leading.`;
    }
  }
    let winnerResult = evaluateWinnerInMC();
    currentPlayer = 1;

    gameMode = 'Dice game';
    return winnerResult;
  
};