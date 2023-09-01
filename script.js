let main = function (input){
  return base (input);
  //return moreComfortable (input);
};

let gameMode = 'Dice game';
  
  // player 1 will start first
  let currentPlayer = 1;
  
  // store individual dice rolls 
  let playerDiceArray = [];
  
  // store individual score based on dice order selection
  let currentScore = 0;
  
  // store all players' scores in an array 
  let cumulatedScores = [];
  
  // maximum number of players for base game
  let maxNumPlayersBase = 4;
  
  // set a function to generate random dices from 1 to 6
  let rollDice = function (){
    return Math.ceil(Math.random () * 6);
  };
  
  
  // set a function to generate and store random dices
  let generateDiceRoll = function (){
  
    // reset array to store dices at every player's turn
    playerDiceArray = [];
    let maxNumDice = 2;
    
    for (let diceCounter = 0; diceCounter < maxNumDice; diceCounter += 1){
        let randomDiceRoll = rollDice();
        playerDiceArray.push(randomDiceRoll);
    }
    
    return `You rolled ${playerDiceArray[0]} for Dice 1 and ${playerDiceArray[1]} for Dice 2. <br><br>
    Please enter either '1' or '2' to choose the order of the dice.`;
  };


  // set a function to determine individual score based on player's order of dice
  let evaluateIndividualScore = function (userDecision){
    let genericHeaderMessage = `Player ${currentPlayer} 🎲`;

    // reset current score to store next player's score upon dice order selection
    currentScore = 0;
    if (userDecision == '1'){
      currentScore = Number(String(playerDiceArray[0]) + String(playerDiceArray[1]));
    } else {
      currentScore = Number(String(playerDiceArray[1]) + String(playerDiceArray[0]));
    }
    cumulatedScores.push(currentScore);
    return `${genericHeaderMessage}<br><br>You chose ${userDecision}. You scored ${currentScore} points.`;
  };
  
  // set a function to determine winner
  // if players have equal scores and are the highest, there will be no winners
  let evaluateWinner = function (){
  
    // if player 1's score is the highest
    if (cumulatedScores[0] > cumulatedScores[1] && cumulatedScores[0] > cumulatedScores[2] && cumulatedScores[0] > cumulatedScores[3]){
       return `Player 1 is the winner! 🥇`;
      } 
    
      // if player 2's score is the highest
    if (cumulatedScores[1] > cumulatedScores[0] && cumulatedScores[1] > cumulatedScores[2] && cumulatedScores[1] > cumulatedScores[3]){
        return `Player 2 is the winner! 🥇`;
      } 
    
      // if player 3's score is the highest
    if (cumulatedScores[2] > cumulatedScores[0] && cumulatedScores[2] > cumulatedScores[1] && cumulatedScores[2] > cumulatedScores[3]){
        return `Player 3 is the winner! 🥇`;
      }
  
      // if player 4's score is the highest
    if (cumulatedScores[3] > cumulatedScores[0] && cumulatedScores[3] > cumulatedScores[1] && cumulatedScores[3] > cumulatedScores[2]){
        return `Player 4 is the winner! 🥇`;
      }
      
      // no winners if there are 2 players with equal highest scores
      return `There are no winners.`;
    };

  // set a function to display scores
  let displayScores = function (){
    let cumulatedScoresLength = [...cumulatedScores].length;
    let scoresMessage = " ";
    
    for (let playerNum = 0; playerNum < cumulatedScoresLength; playerNum += 1 ){
      let playerIndex = playerNum + 1;
      scoresMessage += `Player ${playerIndex}: ${cumulatedScores[playerNum]}<br>`;
    }
    return `🏁 Final Scores:<br><br>${scoresMessage}<br><br>Click on 'Submit' to play another round!`;
  };


  
  // actual game (base)
  let base = function (input){
    let headerMessage = `Welcome, Player ${currentPlayer} 🎲 `;
  
    // start of dice roll game
    if (gameMode == 'Dice game'){
  
        let diceRollGenerator =  generateDiceRoll();
        gameMode = 'Choose order of dice';
        return `${headerMessage}<br><br>${diceRollGenerator}`;
    }

    let userDecision = Number(input);
  
    // player decision in order of dice
    if (gameMode == 'Choose order of dice'){
      
      // check for input validation
      if (!(userDecision == '1' || userDecision == '2') && (currentPlayer <= maxNumPlayersBase)){
        return `Please enter either '1' or '2' to determine your score.<br><br>Your dice rolls were ${playerDiceArray[0]} and ${playerDiceArray[1]}.`;
      }
  

      // if player selected either 1 or 2 and the game reaches 3rd player
      if ((userDecision == '1' || userDecision == '2') && currentPlayer < maxNumPlayersBase){
        
        // reset game mode to allow next player to roll dice
        gameMode = 'Dice game';
        let individualScore = evaluateIndividualScore(userDecision);
        
        // update next player 
        let nextPlayer = (currentPlayer % maxNumPlayersBase) + 1;
        currentPlayer = nextPlayer;
        return `${individualScore}<br><br> Player ${nextPlayer}, you are up next! 💨`;
      }

      // if player selected either 1 and 2 and the game reaches the final player/4th player 
      if ((userDecision == '1' || userDecision == '2') && currentPlayer == maxNumPlayersBase){
        let individualScore = evaluateIndividualScore(userDecision);
        let winnerResult = evaluateWinner();
        let scoreResult = displayScores();
        let outputMessage = `${individualScore}<br><br> ${winnerResult}<br><br>${scoreResult}`;
        
        return outputMessage;
        }
}
}