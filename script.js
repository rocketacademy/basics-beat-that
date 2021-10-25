var players = 0
var playerNum = 0
var playerArray = []
var playerResult = [] 
var numOfDice = 2
var step = 0

var main = function (input) {
  if (input == 0 && players == 0){
    return "Player count : 0 <br> Please enter number of Players"
  }else if (input > 0 && players == 0){
    players = input //Store number of players
    for (var counter = 0; counter < players ; counter +=1){ //create the Arrays
      playerArray.push(generateDiceArray(numOfDice))
      playerResult.push(0)
    }
    console.log("A "+playerArray)
    console.log("B "+playerResult)
  }
  while (playerNum < players){
    if (playerResult[playerNum] == 0 && step == 0){
      console.log(playerArray[0])
      console.log(playerArray[1])
      console.log(playerArray.length)
      var dice1 = playerArray[playerNum][0]
      var dice2 = playerArray[playerNum][1]
      step = step +1
      return "Hello Player "+(playerNum+1)+"<br> You rolled "+dice1+" for Dice 1 and "+dice2+" for Dice 2 <br> Choose order of the dice"
    } else if (step == 1){
        if (input == 1){
          playerResult[playerNum] = Number(String(playerArray[playerNum][0]) + String(playerArray[playerNum][1]))
          console.log("C "+ playerResult)
          step = 0
        }else if (input == 2){
          playerResult[playerNum] = Number(String(playerArray[playerNum][1]) + String(playerArray[playerNum][0]))
          console.log("D "+ playerResult)
          step = 0
        }
    }
    playerNum = playerNum + 1
  }

  //Output Result
  console.log("Math.max " + Math.max(...playerResult))
  playerWin = playerResult.indexOf(Math.max(...playerResult)) // Player number -1
  var output = ""
  for (var counter = 0; counter < players; counter +=1){
    output = output + "Player "+(counter+1)+" selected "+playerResult[counter] +"<br>"
  }
  return output + "<br>Player "+(playerWin+1)+" Wins!"
};

// Function to roll 2 dice and return as array of length 2
var generateDiceArray = function(numofDice){
  diceArray = []
  for (var counter = 0;counter < numofDice; counter+=1){
    randNum = Math.floor(Math.random()*6 + 1)
    diceArray.push(randNum)
  }
  return diceArray
}

//Function to take in first dice and output combined number
var selectDiceOrder = function(){

}

