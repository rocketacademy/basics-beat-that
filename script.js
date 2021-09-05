// create global variables for player and an array for both dice rolls
var player = 'player 1'
var diceRolls = []

//create global variables to store both players combined numbers
var player1CombinedNo = 0
var player2CombinedNo = 0


var main = function (input) {
  //var myOutputValue = '';

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

  //return myOutputValue;
};

//this function rolls a random number between 1-6
var diceRoll = function(){
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber
}

//When a player clicks Submit, the game rolls 2 dice and shows the dice rolls
var showDiceRolls = function(){
  console.log('show dice roll function is running')
  
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

  //if player 1 picks 1st dice to go first, add the 1st dice followed by 2nd dice
  if (input == 'Dice 1'){
    player1CombinedNo = `${diceRolls[0]}${diceRolls[1]}`
    return `Player 1, you chose Dice 1 first.<br>Your number is ${player1CombinedNo}.<br>It is now Player 2's turn.`
  }

  //if player 1 picks the 2nd dice to go first, add  the 2nd dice followed by 1st dice    
  else if (input == 'Dice 2'){
    player1CombinedNo = `${diceRolls[1]}${diceRolls[0]}`
    return `Player 1, you chose Dice 2 first.<br>Your number is ${player1CombinedNo}.<br>It is now Player 2's turn.`
  }
}

//create function for Player 2 to pick the order of the dice they want
var chooseDiceRollsPlayerTwo = function(input){
  console.log('choose dice roll function is running for player 2')

  player = 'player 1'

  //if player 2 picks 1st dice to go first, add the 1st dice followed by 2nd dice
  if (input == 'Dice 1'){
    player2CombinedNo = `${diceRolls[0]}${diceRolls[1]}`

    //compare player 1 and player 2's combined number
    //if player 1's combined number is higher than player's 2 combined number, player 1 wins
    if (player1CombinedNo > player2CombinedNo){
      return `Player 2, you chose Dice 1 first.<br>Your number is ${player2CombinedNo}.<br>Player's 1 number is ${player1CombinedNo}. <br>You lose. Bummer!`
    
    //if player 2's combined number is higher than player's 1 combined number, player 2 wins
    }else if (player2CombinedNo > player1CombinedNo){
      return `Player 2, you chose Dice 1 first.<br>Your number is ${player2CombinedNo}.<br>Player's 1 number is ${player1CombinedNo}. <br>You win. Congrats!`
    }
  }

    //if player 2 picks 2nd dice to go first, add the 2nd dice followed by 1st dice
  else if (input == 'Dice 2'){
    player2CombinedNo = `${diceRolls[1]}${diceRolls[0]}`

    //compare player 1 and player 2's combined number
    //if player 1's combined number is higher than player's 2 combined number, player 1 wins
    if (player1CombinedNo > player2CombinedNo){
      return `Player 2, you chose Dice 1 first.<br>Your number is ${player2CombinedNo}.<br>Player's 1 number is ${player1CombinedNo}. <br>You lose. Bummer!`
    
    //if player 2's combined number is higher than player's 1 combined number, player 2 wins
    }else if (player2CombinedNo > player1CombinedNo){
      return `Player 2, you chose Dice 1 first.<br>Your number is ${player2CombinedNo}.<br>Player's 1 number is ${player1CombinedNo}. <br>You win. Congrats!`
    }
  }
  
}