//Roll the dice and put them in order to make the highest number possible. If you roll a 4 and an 6, for example, your best answer would be 64. Using 3 dice, a roll of 3, 5 and 2 should give you 532, and so on. Write down your answer, pass the dice, and challenge the next player to Beat That!

//Game mode (diceSelection,playerSelection, diceGuess, checkWinner) and player number
var gameMode = "playersSelection";
var numberOfPlayers = 0;
var playerNumber = 1;

//Game state for highest or lowest combined score
var gameState =''

//Global List for recording player rolls
var playersList = [];


//Global Player Number sum & score
var playerScore = [];
var playersSum= [];

//Number of rounds players played
var roundsPlayers= [];

//Numnber of dice to roll for game
var numberOfDice = 0;

var main = function (input) {
  if (gameState ==''){
    var output = ''
    
    if(input !='highest'&&input!='lowest'){
      return `Please choose highest or lowest number mode`
    }
    else{
    gameState = input.toLowerCase();
    if(numberOfPlayers!=0){
      gameMode = 'diceSelection'
    }
    else {gameMode = 'playersSelection'}
    return `You have selected ${input} number mode`
    }
  }
  if(gameMode=='playersSelection'){
    if(isNaN(input)){
      return `Error! Please enter number of players`
    }
    else{
      numberOfPlayers = input
      gameMode = 'diceSelection'
      return `There will be ${numberOfPlayers} players in the game. Please enter number of dices.`
    }
  }
  //User enter how many dices to play
  if (gameMode=='diceSelection'){

    numberOfDice = Number(input);
    if(isNaN(numberOfDice)){
      return `Not a number! Please select number of dices to roll`
    }
    gameMode ='playerSelection'
    return `All players will now be playing with ${numberOfDice} dices`
  }

  //User enter player number to start dice roll 
  if (gameMode == "playerSelection") {
    
    //Option for user to change game mode halfway
    if(input =='change'){
      gameState = ''
      return `Change Mode! Please choose highest or lowest`
    }

    //Allow user to check results at any point of time 
    if (input =='check'){
      gameMode='checkWinner'
    }
    else{
    //For every player, roll dice, check order of dice rolls and score
    for(playerNumber=1;playerNumber<numberOfPlayers;playerNumber++){
      var diceList = []
      for(counter=0;counter<numberOfDice;counter++){
        diceList.push(diceRoll())
      } 
      
      playersSum[playerNumber-1] = checkOrder(playersList['diceRolls'])
      playerScore[playerNumber-1] += playersSum[playerNumber-1]
      roundsPlayers[playerNumber-1]+=1
      return `${playerRoll(playerNumber, playerList[playerNumber-1])} Auto Mode! Your number is ${playersSum[playerNumber-1]} as the game mode is ${gameState}.<br>Enter check to see results`;
    }   
  } 
}
  //Game mode to check for winner
  if (gameMode == "checkWinner") {
    var winner = checkWinner(playerScore);
    gameMode = "playerSelection";
    return `${winner}`;
  }
  return output;
};



//Check input
function checkInput(input) {
  if (input != 1 && input != 2&&input!='check') {
    return `Please enter 1 or 2<br>Enter check to see current results`;
  }
}
//Check Winner & Prints leaderboard in decreasing order
function checkWinner(input1, input2) {
  if(gameState=='highest'){
    if (input1 > input2) {
      return `Player 1 Wins!<br>*Current LeaderBoard (${gameState})*<br>Player One: ${input1} (Rounds Played: ${roundsPlayer[0]})<br>Player Two: ${input2} (Rounds Played: ${roundsPlayer[1]})`;
    } else if (input2 > input1) {
      return `Player 2 Wins!<br>*Current LeaderBoard (${gameState})*<br>Player Two: ${input2} (Rounds Played: ${roundsPlayer[1]})<br>Player One: ${input1} (Rounds Played: ${roundsPlayer[0]})`;
    } else {
      return `Draw!<br>LeaderBoard<br>Player One & Player Two: ${input1} Rounds Played: <br>Player One: ${roundsPlayer[0]}<br>Player Two: ${roundsPlayer[1]}`;
    }
  }else{
    if (input1 < input2) {
      return `Player 1 Wins!<br>*Current LeaderBoard*<br>Player One: ${input1} (Rounds Played: ${roundsPlayer[0]})<br>Player Two: ${input2} (Rounds Played: ${roundsPlayer[1]})`;
    } else if (input2 < input1) {
      return `Player 2 Wins!<br>*Current LeaderBoard*<br>Player Two: ${input2} (Rounds Played: ${roundsPlayer[1]})<br>Player One: ${input1} (Rounds Played: ${roundsPlayer[0]})`;
    } else {
      return `Draw!<br>LeaderBoard<br>Player One & Player Two: ${input1} Rounds Played: <br>Player One: ${roundsPlayer[0]}<br>Player Two: ${roundsPlayer[1]}`;
    }
  }
  
}

// Check Order automatically by game mode
function checkOrder(playerList){
  var list=[];
  var length = playerList.length
  if(gameState=='highest'){
    //Sort dice rolls in descending order
    playerList.sort(function(a, b){return b-a})
      
    
    for(var counter=0;counter<length;counter++) {
      list+=playerList[counter]
    }
    return list
  }
  if(gameState=='lowest'){
    //Sort dice rolls in ascending order
    playerList = playerList.sort(function(a, b){return a-b})
    for(var counter=0;counter<length;counter++){
      list+=playerList[counter]
    }
    return list
  }
}

//Function to print player number and dice number rolled
function playerRoll(playerNumber, playerList) {
  // gameMode = "diceGuess";
  return `Hi Player ${playerNumber}.<br>You rolled ${playerList} for your dices.`;
}

//Dice roll function
function diceRoll() {
  return Math.floor(Math.random() * 6) + 1;
}
