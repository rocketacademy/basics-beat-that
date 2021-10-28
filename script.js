const totalPlayers = 2
const diceRollPair = []

let rollDice = function() {
  randomNum = (Math.random() * 6) + 1
  randomDice = Math.floor(randomNum)
  return randomDice
}


for (let i=0; i<totalPlayers; i++) {
  diceRollPair.push([rollDice(), rollDice()])
  // jsonObj['Player' + (i + 1)] = diceRollPair[i]
  // console.log(jsonObj)
}

let playerIndex = 0
const playersNumbers = []


var main = function (input) {
  let myOutputValue = getPlayerChoice(input)
  return myOutputValue;
};


const getPlayerChoice = function(input) {
    console.log('getPlayerChoice', input)
  
    if (playerIndex < totalPlayers) {
      const rollPair = diceRollPair[playerIndex]
      const playerNumber = playerIndex + 1
      if (!input) {
        return `Player ${playerNumber} rolled ${rollPair[0]} for Dice 1 and  ${rollPair[1]} for Dice 2. <br>`
      } else {
        let tensIndex
        let onesIndex
        if (input === '1') {
          tensIndex = 0 // first dice is tens
          onesIndex = 1 // second dice is ones
        } else {
          tensIndex = 1 // second dice is tens
          onesIndex = 0 // first dice is ones
        }
        makeTens = rollPair[tensIndex] * 10
        makeNum = makeTens + rollPair[onesIndex]
        playersNumbers.push(makeNum)
    
        playerIndex += 1
    
        return `Player ${playerNumber} Your number is ${makeNum}.<br>`
      }  
    } else {
      // comparison and display players and dice...
      const rankingArray = playersNumbers.map((value, index) => {
        return {
          player: index + 1,
          chosenNumber: value 
        }
      })
      console.log(rankingArray)
      rankingArray.sort((a, b) => {
        if (a.chosenNumber > b.chosenNumber) {
          return -1;
        } else if (a.chosenNumber < b.chosenNumber) {
          return 1;
        }
        return 0;
      })
      let results = ""
      rankingArray.forEach((item, index) => {
        results += `Player ${item.player} created ${item.chosenNumber} ${index === 0 ? '(Winner)' : ''}.<br>`
      })
      return results  
    }
  }
  