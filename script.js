// create global variables for player and an array for both dice rolls
var player = 'player 1'
var diceRolls = []

//create global variables to store both players combined numbers
var player1CombinedNo = 0
var player2CombinedNo = 0

//create global variables to store the score of the players
var player1Score = 0
var player2Score = 0

//create global variable for game mode
var gameMode = 'Beat that dice game'


var main = function (input) {

  //if game mode is 'Beat that dice game'
  if (gameMode == 'Beat that dice game' && input == ''){
    return beatThatGame(input)
    }
  
  //if input is 'Lowest combined number', change the game mode
  else if (input == 'Lowest combined number'){
    gameMode = 'Lowest combined number'
    return 'You have entered Lowest combined number mode. Press submit to start.'

  }else if (gameMode == 'Lowest combined number'){
    return beatThatGame(input)
    
  }
};

//this function rolls a random number between 1-6
var diceRoll = function(){
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber
}

//create function to roll 2 dice rolls and show the dice rolls results
var showDiceRolls = function(){
  console.log('show dice roll function is running')
  
  //to reset dice rolls to empty array
  diceRolls = []
  var counter = 0

  //create a while loop to run dice roll function twice to get 2 dice rolls
  while (counter < 2){

    var randomDiceRolls = diceRoll()

    diceRolls.push(randomDiceRolls)
    console.log(`dice rolls: ${diceRolls}`)

    counter +=1
  }
  
  //return dice roll message for player to choose the order of the dice
 if (player == 'player 1'){
   return `Welcome Player 1.<br> You rolled ${diceRolls[0]} for Dice 1 and ${diceRolls[1]} for Dice 2.<br>Choose the order of the dice.`

 }else if (player == 'player 2'){
    return `Welcome Player 2.<br> You rolled ${diceRolls[0]} for Dice 1 and ${diceRolls[1]} for Dice 2.<br>Choose the order of the dice.`
 }
}

//create function for Player 1 to pick the order of the dice they want

var chooseDiceRollsPlayerOne = function(input){
  console.log('choose dice roll function is running for player 1')

  //to reset player 1 combined no to 0
  player1CombinedNo = 0

  //if player 1 picks 1st dice to go first, add the 1st dice followed by 2nd dice
  if (input == 'Dice 1'){
    player1CombinedNo = `${diceRolls[0]}${diceRolls[1]}`

    return `Player 1, you chose Dice 1 first.<br>Your number is ${player1CombinedNo}.<br>It is now Player 2's turn.<br><br>${leaderboard()}`
  }

  //if player 1 picks the 2nd dice to go first, add  the 2nd dice followed by 1st dice    
  else if (input == 'Dice 2'){
    player1CombinedNo = `${diceRolls[1]}${diceRolls[0]}`

    return `Player 1, you chose Dice 2 first.<br>Your number is ${player1CombinedNo}.<br>It is now Player 2's turn.<br><br>${leaderboard()}`
  }
}

//create function for Player 2 to pick the order of the dice they want
var chooseDiceRollsPlayerTwo = function(input){
  console.log('choose dice roll function is running for player 2')

  //to reset the player to player 1
  player = 'player 1'

  //to reset the combined number to 0
  player2CombinedNo = 0

  //if player 2 picks 1st dice to go first, add the 1st dice followed by 2nd dice
  if (input == 'Dice 1'){
    player2CombinedNo = `${diceRolls[0]}${diceRolls[1]}`

    return compareDiceRolls(input)

    //if player 2 picks 2nd dice to go first, add the 2nd dice followed by 1st dice
  }else if (input == 'Dice 2'){
    player2CombinedNo = `${diceRolls[1]}${diceRolls[0]}` 

    return compareDiceRolls(input)
  }
}

//this function compare player 1 and player 2's combined number and returns a message
var compareDiceRolls = function(input){
  console.log('compare dice rolls function is running')

  //if player 1's no combined number is higher than player 2's combined no
  if (player1CombinedNo > player2CombinedNo){

    //In beat that dice game mode, player 1 wins if player 1 has higher combined no
    if (gameMode == 'Beat that dice game'){
      
      return `Player 2, you chose ${input} first.<br>Your number is ${player2CombinedNo}.<br>Player's 1 number is ${player1CombinedNo}.<br>You lose. Bummer!<br><br>${leaderboard()}`
    
    //In lowest combined no game mode, player 1 lose if player 1 has higher combined no
    }else if (gameMode = 'Lowest combined number'){

      return `Player 2, you chose ${input} first.<br>Your number is ${player2CombinedNo}.<br>Player's 1 number is ${player1CombinedNo}.<br>You win. Congrats!<br><br>${leaderboard()}`
    }
    
  //if player 2's combined number is higher than player's 1 combined number
  }else if (player2CombinedNo > player1CombinedNo){

    //In beat that dice game mode, player 2 wins if player 2 has higher combined no
    if (gameMode == 'Beat that dice game'){

      return `Player 2, you chose ${input} first.<br>Your number is ${player2CombinedNo}.<br>Player's 1 number is ${player1CombinedNo}. <br>You win. Congrats!<br><br>${leaderboard()}`
    
    //In lowest combined no game mode, player 2 lose if player 2 has higher combined no
    }else if (gameMode == 'Lowest combined number'){

      return `Player 2, you chose ${input} first.<br>Your number is ${player2CombinedNo}.<br>Player's 1 number is ${player1CombinedNo}. <br>You lose. Bummer!<br><br>${leaderboard()}`
    }

    //if player 1's combined number is same as player 2's combined number, it's a draw  
  }else if (player2CombinedNo == player1CombinedNo){
      return `Player 2, you chose ${input} first.<br>Your number is ${player2CombinedNo}.<br>Player's 1 number is ${player1CombinedNo}. <br>It's a draw!<br><br>${leaderboard()}`}
}

//create a function to keep score for each player and output leaderboard
var leaderboard = function(){
  console.log('leaderboard function is running')
  
  //calculate sum of numbers generated by 2 players
  //if player = player 2 because change to player 2 in beatThatGame function before running chooseDiceRollsPlayerOne function
  if (player == 'player 2'){
  player1Score += Number(player1CombinedNo)

  //if player = player 1 because reset to player 1 in chooseDiceRollsPlayerTwo function
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


  //if game mode is 'Lowest combined number', the player with the lowest combined number is the winner.

var beatThatGame = function(input){
  console.log('beat that game function is running')

  //create game for 2 players and players take turns. player 1 will go first.
  //if player is player 1 and there is no input, roll the dice
    if (player == 'player 1' && input == ''){
      return showDiceRolls()
    }
    
    //if player is player 1 and player chose dice 1 or dice 2, return the combined number
    else if (player == 'player 1' && (input == 'Dice 1' || input == 'Dice 2')){

        //change player to player 2
        player = 'player 2'
      return chooseDiceRollsPlayerOne(input)
    }
  
  //if player is player 2 and there is no input, roll the dice
    else if (player == 'player 2' && input == ''){
      return showDiceRolls()
    }

  //if player is player 2 and player chose dice 1 or dice 2, return the combined number and the results of the game
    else if ((player == 'player 2' && input == 'Dice 1') ||
    (player == 'player 2' && input == 'Dice 2')){
      return chooseDiceRollsPlayerTwo(input)
    }
  }