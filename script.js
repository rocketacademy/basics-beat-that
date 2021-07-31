var stage = 'roll'
var noOfPlayers = 2
var player = 1
var numP1 = 0
var numP2 = 0
var scoreP1 = 0
var scoreP2 = 0
var dice1 = ''
var dice2 = ''

var main = function (input) {
console.log(`player ${player}`)
var myOutputValue = ''
  if (stage == 'roll') {
    dice1 =  Math.floor(Math.random()*6)+1
    dice2 =  Math.floor(Math.random()*6)+1
    myOutputValue = `Welcome Player ${player}. <br/>
    You rolled ${dice1} for Dice 1 and ${dice2} for Dice 2. <br/><br/>
    Choose the order of the dice. <br/>
    Enter 1 if you wish for Dice 1 to come first, and 2 for Dice 2 to come first.`
    stage = 'setDiceOrder'
    console.log(`dice 1: ${dice1}`)
    console.log(`dice 2: ${dice2}`)
  }

  else if (stage == 'setDiceOrder') {
    if (input == 1) {
      var diceOrder = '12'
      if (player == 1) {
        numP1 = `${dice1}${dice2}`
      }
      if (player == 2) {
        numP2 = `${dice1}${dice2}`
      }     
      console.log(`dice 1: ${dice1}`)
      console.log(`dice 2: ${dice2}`)
      console.log(`numP1: ${numP1}`)
      console.log(`numP2" ${numP2}`)

    }
    else if (input == 2) {
      var diceOrder = '21'
      if (player == 1) {
        numP1 = `${dice2}${dice1}`
      }
      if (player == 2) {
        numP2 = `${dice2}${dice1}`
      }
      console.log(dice1)
      console.log(dice2)
      console.log(`numP1: ${numP1}`)
      console.log(`numP2: ${numP2}`)

    }
    if (input == 1 || input == 2) {
      myOutputValue = `Player ${player}, you chose Dice ${input} first. <br/>`
      if (player == 1) {
        myOutputValue += `Your number is ${numP1}. <br/>`
      }
      if (player == 2) {
        myOutputValue += `Your number is ${numP2}. <br/>`
      }

      if (player == 2)  {
        if (numP2 > numP1) {
          scoreP2 += 1
          myOutputValue += `Player 1 Number: ${numP1} <br/>
          Player 2 Number: ${numP2} <br/>
          Player 2 wins! <br/>
          Player 1 Score: ${scoreP1} <br/>
          Player 2 Score: ${scoreP2} <br/>
          Next round. <br/>`
        }
        if (numP1 > numP2) {
          scoreP1 += 1
          myOutputValue += `Player 1 Number: ${numP1} <br/>
          Player 2 Number: ${numP2} <br/>
          Player 1 wins! <br/>
          Player 1 Score: ${scoreP1} <br/>
          Player 2 Score: ${scoreP2} <br/>
          Next round. <br/>`
        }
        if (numP1 == numP2) {
          myOutputValue += `It's a tie! Next round.`
        }
      }

      if (player < noOfPlayers) {
        player += 1
      } else {
        player = 1
      }

      myOutputValue += `It is now Player ${player}'s turn.`
      stage = 'roll'
    } 
    else {
      myOutputValue = `You have entered an invalid response, Player 1. <br/>
      Please enter '1' for Dice 1 to come first, or '2' for Dice 2 to come first.`
    } 
  }
    
  return myOutputValue

  }

