// create global variables for player and an array for dice rolls
var player = 'player 1'
var diceRolls = []
var sortDiceRolls = []

//create global variables to store both players combined numbers
var player1CombinedNo = 0
var player2CombinedNo = 0

//create global variables to store the score of the players
var player1Score = 0
var player2Score = 0

//create global variable for game mode
var gameMode = 'Beat that dice game'

//create a global variable for no of dice
var noOfDice = 0


var main = function (input) {

  //if no of dice is 0, ask players to input no of dice to roll
  if (noOfDice == 0 && input == ''){
    return `Welcome to the dice game!<br>How many dice would you like to play?`
   
  //assign input to no of dice to roll  
  }else if (input !=0 && input != 'Lowest combined number'){
    noOfDice = Number(input)
    return `You have decided to play ${noOfDice} dice. Press submit to start game.`
  
  //if game mode is 'Beat that dice game'
  }else if (gameMode == 'Beat that dice game' && input == ''){
    return beatThatGame()
    }
  
  //if input is 'Lowest combined number', change the game mode
  else if (input == 'Lowest combined number'){
    gameMode = 'Lowest combined number'
    return 'Welcome to Lowest combined number mode!<br>How many dice would you like to play?'

  }else if (gameMode == 'Lowest combined number' && input !=0){
    noOfDice = Number(input)
    return `You have decided to play ${noOfDice} dice. Press submit to start game.`
    
  }else if (gameMode == 'Lowest combined number' && input == ''){
    return beatThatGame()
  }
  
};

//create a function that runs the dice game for 2 players
var beatThatGame = function(){
  console.log('beat that game function is running')

  //if player is player 1, roll the dice
    if (player == 'player 1'){
      return autoCombineDiceRolls()
    }
  
  //if player is player 2, roll the dice
    else if (player == 'player 2'){
      return autoCombineDiceRolls()
    }

}

//this function rolls a random number between 1-6
var diceRoll = function(){
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber
}

//create function to roll dice rolls
var generateDiceRolls = function(){
  console.log('show dice roll function is running')
  
  //to reset dice rolls to empty array
  diceRolls = []
  var counter = 0

  //create a while loop to run dice roll function based on no of dice decided by players to roll
  while (counter < noOfDice){

    var randomDiceRolls = diceRoll()

    diceRolls.push(randomDiceRolls)
    console.log(`dice rolls: ${diceRolls}`)

    counter +=1
  }
  
 return diceRolls
}

var autoCombineDiceRolls = function(){
  console.log('auto combine dice rolls function is running')

  //dice roll results
  var diceRollResults = generateDiceRolls()
  console.log(`dice roll results1: ${diceRollResults}`)

  //reset sort dice rolls to empty array
  sortDiceRolls = []

  //if game mode is Beat that dice game
  if (gameMode == 'Beat that dice game'){

    //sort the dice rolls in descending order
    sortDiceRolls = diceRollResults.sort(function(a,b){return b-a})
    console.log(`sort dice rolls: ${sortDiceRolls}`)
    console.log(`dice roll results2: ${diceRollResults}`)

    //combine the numbers 
    sortDiceRolls = Number(sortDiceRolls.join(''))

    if (player == 'player 1'){

      //reset combined no to 0
      player1CombinedNo = 0
      player1CombinedNo = sortDiceRolls
      
      //change to player 2
      player = 'player 2'

      return `Player 1, your combined number is ${player1CombinedNo}.<br>It is now Player 2's turn.<br><br>${leaderboard()}`

    //else if player is player 2
    }else if (player == 'player 2'){

      //reset combined no to 0
      player2CombinedNo = 0
      player2CombinedNo = sortDiceRolls

      //change to player 1
      player = 'player 1'

      return compareDiceRolls()
    }
 
  //if game mode is Lowest combined number, sort the dice rolls in ascending order and combine the numbers
  }else if (gameMode == 'Lowest combined number'){

    //sort the dice rolls in ascending order
    sortDiceRolls = diceRollResults.sort(function(a,b){return a-b})

    //combine the numbers
    sortDiceRolls = Number(sortDiceRolls.join(''))

    //if player is player 1
  }if (player == 'player 1'){

      //reset combined no to 0
      player1CombinedNo = 0
      player1CombinedNo = sortDiceRolls
      
      //change to player 2
      player = 'player 2'

      return `Player 1, your combined number is ${player1CombinedNo}.<br>It is now Player 2's turn.<br><br>${leaderboard()}`

    //else if player is player 2
    }else if (player == 'player 2'){

      //reset combined no to 0
      player2CombinedNo = 0
      player2CombinedNo = sortDiceRolls

      //change to player 1
      player = 'player 1'

      return compareDiceRolls()
    }
  
}

//this function compare player 1 and player 2's combined number and returns a message
var compareDiceRolls = function(){
  console.log('compare dice rolls function is running')

  //In beat that dice game, if player 1's combined no is higher than player 2's combined no, player 1 wins
  //in lowest combined no game, if player 1's combined no is lower than player 2's combined no, player 1 wins 
  if ((gameMode == 'Beat that dice game' && player1CombinedNo > player2CombinedNo) ||
  (gameMode == 'Lowest combined number' && player1CombinedNo < player2CombinedNo)){

    return `Player 2, your number is ${player2CombinedNo}.<br>Player's 1 number is ${player1CombinedNo}.<br>You lose. Bummer!<br><br>${leaderboard()}`
    
    
  //In beat that dice game, if player 1's combined no is lower than player 2's combined no, player 2 wins
  //in lowest combined no game, if player 1's combined no is higher than player 2's combined no, player 2 wins 
  }else if ((gameMode == 'Beat that dice game' && player2CombinedNo > player1CombinedNo) ||
  (gameMode == 'Lowest combined number' && player2CombinedNo < player1CombinedNo)){

    return `Player 2, your number is ${player2CombinedNo}.<br>Player's 1 number is ${player1CombinedNo}. <br>You win. Congrats!<br><br>${leaderboard()}`

  //if player 1's combined number is same as player 2's combined number, it's a draw  
  }else if (player2CombinedNo == player1CombinedNo){
    return `Player 2, your number is ${player2CombinedNo}.<br>Player's 1 number is ${player1CombinedNo}. <br>It's a draw!<br><br>${leaderboard()}`}
}

//create a function to keep score for each player and output leaderboard
var leaderboard = function(){
  console.log('leaderboard function is running')
  
  //calculate sum of numbers generated by 2 players
  //if player = player 2 because change to player 2 in beatThatGame function before running autoDiceRollsPlayerOne function
  if (player == 'player 2'){
  player1Score += Number(player1CombinedNo)

  //if player = player 1 because reset to player 1 in autoDiceRollsPlayerTwo function
  }else if (player == 'player 1'){
  player2Score += Number(player2CombinedNo)
  }

  //if player 1's score is greater than or equal to player 2's score, leaderboard shows player 1 first
  if (player1Score > player2Score || player1Score == player2Score){
    return `Leaderboard<br>Players | Score<br>Player 1  ${player1Score}<br>Player 2  ${player2Score}`

  //if player 2's score is greater than player 1's score, leaderboard shows player 2 first
  }else if (player2Score > player1Score){
    return `Leaderboard<br>Players | Score<br>Player 2  ${player2Score}<br>Player 1  ${player1Score}` 
  }
}