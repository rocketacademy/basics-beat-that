//Roll the dice and put them in order to make the highest number possible. If you roll a 4 and an 6, for example, your best answer would be 64. Using 3 dice, a roll of 3, 5 and 2 should give you 532, and so on. Write down your answer, pass the dice, and challenge the next player to Beat That!

//Game mode (diceSelection,playerSelection, diceGuess, checkWinner) and player number
var gameMode = "";
var numberOfPlayers = 0;
var playerNumber = 1;

//Game state for highest or lowest combined score
var gameState =''

//Game function, normal or knockout
var gameFunction = ''

//Global List for recording player rolls
var playersList = [];

//Global variable for rounds played
var roundsPlayed =0;


//Global Player Number sum & score
var playerScore = [];

var leaderBoard =[];

//Numnber of dice to roll for game
var numberOfDice = 0;


var main = function (input) {
  if (gameState ==''){
    var output = ''
    //User to choose game mode
    if(input !='highest'&&input!='lowest'){
      return `Please choose highest or lowest number mode.`
    }
    else{
    gameState = input.toLowerCase();
    if(numberOfPlayers!=0){
      gameMode = 'game'
    }
    else {gameMode = 'functionSelect'}
    return `You have selected ${input} number mode. Please choose mode`
    }
  }
  //Player choose game function
  if(gameMode == 'functionSelect'){
    
    if(input!='normal'&&input!='knockout'){
      return `Please enter normal or knockout mode`
    }
    gameFunction = input;
    gameMode='playersSelection'
    return `The rules of the game is ${gameFunction}. Please select number of players`
  }

  //User to select number of players
  if(gameMode=='playersSelection'){
    if(isNaN(input)||input==''){
      return `Error! Please enter number of players`
    }
    else{
      numberOfPlayers = input
      for(i=0;i<numberOfPlayers;i++){
        playerScore[i]=0
      }
      gameMode = 'diceSelection'
      return `There will be ${numberOfPlayers} players in the game. Please enter number of dices.`
    }
  }
  //User enter how many dices to play
  if (gameMode=='diceSelection'){

    numberOfDice = Number(input);
    //Check input for valid number
    if(isNaN(numberOfDice)||input==''){
      return `Not a number! Please select number of dices to roll`
    }
    //Move to next game mode
    gameMode ='game'
    return `All players will now be playing with ${numberOfDice} dices`
  }

  //Game Function
  if (gameMode == "game") {
    
    //Option for user to change game mode halfway
    if(input =='change'){
      gameState = ''
      return `Change Mode! Please choose highest or lowest`
    }
    
    if(gameFunction=='normal'){
    while(playerNumber<=numberOfPlayers){
      var normal = normalGame();
      return normal
    }
  } if(gameFunction=='knockout'){
    while(roundsPlayed<numberOfPlayers){
    var knockOut = knockOutGame();
    return knockOut;
  }}
  
    gameMode = 'checkWinner'   
  } 
  

  //Game mode to check for winner
  if (gameMode == "checkWinner") {
    
    var winner = checkWinner(numberOfPlayers,playerScore);
    var message =`LeaderBoard<br><br>Current Game Mode: ${gameState}<br><br><b>Current Winner:</b> Player ${winner[0][1]} with a score of ${winner[0][0]}!!🎉🎉<br><br>PlayerNo.: PlayerScore<br>`

    for(i=0;i<numberOfPlayers;i++){
      message += `<br>Player ${winner[i][1]}: ${winner[i][0]}`
      
    }
    //Reset the game 
    gameMode = "game";
    playerNumber=1
    
    return message
    
  }
  return output;
};




//Check Winner & Prints leaderboard in decreasing order
function checkWinner(player,input1) {
  
  
  for(i=0;i<player;i++){
    leaderBoard[i]=[]
  }
  //Create array for player number and corresponding player score
  for(j=0;j<player;j++){
    leaderBoard[j]=[input1[j],[j+1]]
  }
  
  //Sort array by 1st element, player score
  if(gameState=='highest'){
    leaderBoard.sort().reverse()
  }else{
    leaderBoard.sort()
  }
  return leaderBoard
}

// Check Order automatically by game mode
function checkOrder(playerList){
  var list=[];
  var length = playerList.length
  if(gameState=='highest'){
    //Sort dice rolls in descending order
    playerList.sort()
    
    for(var counter=0;counter<length;counter++) {
      list+=playerList[counter]
    }
    list=parseInt(list.toString())
    return list
  }
  if(gameState=='lowest'){
    //Sort dice rolls in ascending order
    playerList = playerList.sort().reverse()
    for(var counter=0;counter<length;counter++){
      list+=playerList[counter]
    }
    list=parseInt(list.toString())
    return list
  }
}


//Dice roll function
function diceRoll() {
  return Math.floor(Math.random() * 6) + 1;
}


//Normal game function
function normalGame(){
  var playersSum= [];
    //For every player, roll dice, check order of dice rolls and score
    while(playerNumber<=numberOfPlayers){
      
      //Roll dice as per numberOfDices
      var diceList = []
      for(counter=0;counter<numberOfDice;counter++){
        diceList.push(diceRoll())
      } 
      
      //Check for best number order
      playersSum[playerNumber-1] = checkOrder(diceList)
      
      //Add best score to running scoreboard
      playerScore[playerNumber-1] = playerScore[playerNumber-1]+playersSum[playerNumber-1]
      
      
      var message = `Hi Player ${playerNumber}! You have rolled ${playersSum[playerNumber-1]}, click submit again for the next player!`
      playerNumber+=1

      
      return message
    
      
      }
    }
      
    


function knockOutGame(){
  var playersSum= [];
    //For every player, roll dice, check order of dice rolls and score
    while(playerNumber<=numberOfPlayers){
      
      //Roll dice as per numberOfDices
      var diceList = []
      for(counter=0;counter<numberOfDice;counter++){
        diceList.push(diceRoll())
      } 
      
      //Check for best number order
      playersSum[playerNumber-1] = checkOrder(diceList)
      
      //Add best score to running scoreboard
      playerScore[playerNumber-1] = playerScore[playerNumber-1]+playersSum[playerNumber-1]
      
      
      
      playerNumber+=1
    }
    var i = 1;
    var roundWinner = checkWinner(numberOfPlayers,playerScore)
    roundsPlayed+=1
    while(i<=numberOfPlayers){
      
      if(gameState=='highest'){
        if(roundWinner[i][0]>roundWinner[i+1][0]){
          return `Player ${roundWinner[i][1]} wins with a score of ${roundWinner[i][0]} against Player ${roundWinner[i+1][1]} with a score of ${roundWinner[i+1][0]}`
        }
        if(roundWinner[i][0]<roundWinner[i+1][0]){
          return `Player ${roundWinner[i+1][1]} wins with a score of ${roundWinner[i+1][0]} against Player ${roundWinner[i][1]} with a score of ${roundWinner[i][0]}`
      }
      if(gameState=='lowest'){
        if(roundWinner[i][0]<roundWinner[i+1][0]){
          return `Player ${roundWinner[i][1]} wins with a score of ${roundWinner[i][0]} against Player ${roundWinner[i+1][1]} with a score of ${roundWinner[i+1][0]}`
        }
        if(roundWinner[i][0]>roundWinner[i+1][0]){
          return `Player ${roundWinner[i+1][1]} wins with a score of ${roundWinner[i+1][0]} against Player ${roundWinner[i][1]} with a score of ${roundWinner[i][0]}`
      }
    }
    }
    i+=1
  }
  
}
