var stage = 'chooseNoOfPlayer'
var noOfPlayers = 0
var player = 1
var noOfDice = 0
var numTotal = []
var scoreTotal = []

var main = function (input) {
console.log(`player ${player}`)
var myOutputValue = ''
  if (stage == 'chooseNoOfPlayer') {
    if (Number.isNaN(Number(input)) || Number(input) < 2 || Number(input)%1 != 0) {
      myOutputValue = `Sorry, please enter a whole number greater than 1.`
    } else {
      noOfPlayers = Number(input)
      for (let i=0; i<noOfPlayers; i++) {
        scoreTotal.push([0])
      }
      myOutputValue = `${noOfPlayers} players it is! Now pick the number of dice you wish to play with this round.`
      if (player == 1) {
        stage = 'chooseNoOfDice'
      } else {
        stage == 'roll'
      }
    }
  }

  else if (stage == 'chooseNoOfDice') {
    if (Number.isNaN(Number(input)) || Number(input) < 1 || Number(input)%1 != 0) {
      myOutputValue = `Sorry, please enter a whole number of 1 and above.`
    } else {
      noOfDice = Number(input)
      console.log(`noOfDice: ${noOfDice}`)
      stage = 'roll'
      myOutputValue = `You have chosen to play with ${input} dice. Player 1, go ahead and press Submit to start rolling your dice!`
    }
  }

  else if (stage == 'roll') {
    var dice = 0
    console.log(`noOfDice: ${noOfDice}`)
    var diceCounter = 0
    var numRolled = []
    var numOptimised = []
    while (diceCounter < noOfDice) {
      dice =  Math.floor(Math.random()*6)+1
      console.log(`dice: ${dice}`)
      numRolled.push(dice)
      numOptimised.push(dice)
      diceCounter += 1
    }
    numOptimised.sort()
    console.log(`numRolled: ${numRolled}`)
    console.log(`numOptimised: ${numOptimised}`)
    var numRolledString = ''
    var numOptimisedString = ''
    var stringCounter = 0
    while (stringCounter < noOfDice) {
      numRolledString += String(numRolled[stringCounter])
      numOptimisedString += String(numOptimised[stringCounter])
      stringCounter += 1
    }
    numTotal.push(Number(numOptimisedString))
    console.log(`player: ${player}`)
    console.log(`noOfPlayers: ${noOfPlayers}`)
    console.log(`numTotal: ${numTotal}`)
    if (player < noOfPlayers) {
      myOutputValue += `Welcome Player ${player}. <br/>
      You rolled ${numRolledString}. Rearranged, the lowest number is ${numOptimisedString}. <br/>
      It is now Player ${player+1}'s turn. Go ahead and press Submit to start rolling your dice!`
      player += 1
    } else {
      // find largest number and winner
      var numCounter = 0
      var largestNum = 0
      var largestNumPlayer = 1
      while (numCounter < noOfPlayers) {
        if (numTotal[numCounter] > largestNum) {
          largestNum = numTotal[numCounter]
          console.log(`largestNum: ${largestNum}`)
          largestNumPlayer = numCounter + 1
          console.log(`largestNumPlayer: ${largestNumPlayer}`)
        }
        numCounter += 1
      }
      myOutputValue = `Welcome Player ${player}. <br/>
      You rolled ${numRolledString}. Rearranged, the lowest number is ${numOptimisedString}. <br/> 
      All players have played! Congratulations to Player ${largestNumPlayer}! You got the largest number, ${largestNum}! <br/>
      `
      // leader board
      scoreTotal[largestNumPlayer-1] = Number(scoreTotal[largestNumPlayer-1]) + 1
      console.log(`scoreTotal: ${scoreTotal}`)
      for (let i=0; i<noOfPlayers; i++) {
        myOutputValue += `Player ${i+1} Score: ${scoreTotal[i]} <br/>`
      }
      // reset
      numTotal = []
      numCounter = 0
      largestNum = 0
      largestNumPlayer = 1
      player = 1
    }
  }

  return myOutputValue
}
