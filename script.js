
var diceRoll = function(){
  return Math.floor(Math.random()*6+1)
}

// score leaderboard tracker game with 4 players//
var numOfPlayers = 1000
var scoreArray = [0]
var player = 1 
var numOfPlayersSpecified = false
var diceOne = 0
var diceTwo = 0
//var main = function(input,input1)
var main = function(input){
  console.log(input)
  // take the user input as the number of players in the game
  if (numOfPlayersSpecified==false){
    // input validation
    if (input <2 || input >10){
      return `Greetings! Please indicate the number of players`
    }
    numOfPlayers = input;
    numOfPlayersSpecified = true
    return "Starting Game. It is Player 1's turn. Press Submit to Roll"
  }
  // player playing is same as number of players restart player count to 1
  if (player == Number(numOfPlayers) + 1){
    player = 1
  }
  // roll dice and determine dice number for each player
  diceOne = diceRoll()
  diceTwo = diceRoll()
  diceNumber = determineDiceNumber(diceOne,diceTwo)
  // add dice number to array
  if (scoreArray.length < player){
    scoreArray.push(diceNumber)
  }
  else{
    scoreArray[player-1] += diceNumber
  }
  // increment the player count
  player += 1
  // make a copy of the scoreArray so as to acheive score board
  tempArray = [...scoreArray]
  scoreBoard = getScoreBoard(tempArray)
  return ` Hello Player ${player-1}. <br>Your number rolled for dice one is ${diceOne} <br> Your number rolled for dice two is ${diceTwo}.<br> Your dice num for this turn is ${diceNumber}. ${scoreBoard}.`



}

var determineDiceNumber = function(diceOne,diceTwo){
  number1 = diceOne * 10 + diceTwo
  number2 = diceTwo * 10 + diceOne
  if (number1 > number2){
    return number1
  }
  return number2
}

var getScoreBoard = function(array){
  str = ``
  for (i = 0; i<array.length;i+=1){
    maxIndex = array.indexOf(Math.max(...array))
    console.log(maxIndex)
    console.log(array[maxIndex])
    str += `<br>Player ${maxIndex+1} score: ${array[maxIndex]}`
    array[maxIndex] = -1
  }
  return str
}