let main = function (input){
  //return base (input);
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
  
  // actual game (base)
  let base = function (input){
    let headerMessage = `Welcome, Player ${currentPlayer} 🎲 `;
  
    // start of dice roll game
    if (gameMode == 'Dice game'){
  
        let diceRollGenerator =  generateDiceRoll();
        gameMode = 'Choose order of dice';
        return `${headerMessage}<br><br>${diceRollGenerator}`;
    }
  }