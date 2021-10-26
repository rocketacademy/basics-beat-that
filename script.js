var state = "INPUT PLAYER 1 NAME"
var numOfPlayer1Wins = 0
var numOfPlayer2Wins = 0
var Player1UserName = ""
var Player2UserName = ""
var Player1Arr = []
var Player2Arr = []



var diceRoll = function () {
  var randomInteger = Math.ceil(Math.random() * 6);
  return randomInteger
}

var beat_that = function (input) {

  if (state == "INPUT PLAYER 1 NAME") {
    Player1UserName = input
    state = "INPUT PLAYER 2 NAME"
    return `Welcome, ${Player1UserName}. Please input Player 2's username to continue.`
  }

  else if (state == "INPUT PLAYER 2 NAME") {
    Player2UserName = input
    state = "PLAYER 1 DICE ROLL"
    return `Welcome, ${Player2UserName}. Please click submit to roll the dice.`
  }

  else if (state == "PLAYER 1 DICE ROLL") {
    while (Player1Arr.length < 2) {
      Player1Arr.push(diceRoll())
    }
    state = "PLAYER 1 CHOOSE NUMBERS"
    return `${Player1UserName} rolled <br>
    ${Player1Arr[0]} for Dice 1 <br>
    ${Player1Arr[1]} for Dice 2.<br> 
      Choose the order of the dice.`
  }

  else if (state == "PLAYER 1 CHOOSE NUMBERS") {

    if (input == 2) {
      var tempNumber = Player1Arr[0]
      Player1Arr[0] = Player1Arr[1]
      Player1Arr[1] = tempNumber
    }

    var player1Numbers = Player1Arr[0].toString() + Player1Arr[1].toString()
    state = "PLAYER 2 DICE ROLL"

    return `${Player1UserName}, you chose Dice ${input} first. <br>
          Your number is ${player1Numbers}. <br>
          It is now Player 2's turn. Please click submit to roll the dice for player 2.`
  }

  else if (state == "PLAYER 2 DICE ROLL") {
    while (Player2Arr.length < 2) {
      Player2Arr.push(diceRoll())
    }
    state = "PLAYER 2 CHOOSE NUMBERS"
    return `${Player2UserName} rolled<br>
    ${Player2Arr[0]} for Dice 1 <br>
    ${Player2Arr[1]} for Dice 2.<br> 
      Choose the order of the dice.`
  }

  else if (state == "PLAYER 2 CHOOSE NUMBERS") {
    if (input == 2) {
      var tempNumber = Player2Arr[0]
      Player2Arr[0] = Player2Arr[1]
      Player2Arr[1] = tempNumber
    }
    var player2Numbers = Player2Arr[0].toString() + Player2Arr[1].toString()
    state = "COMPARE WINNERS"

    return `${Player2UserName}, you chose Dice ${input} first. <br>
      Your number is ${player2Numbers}. <br>
      Press submit to see who has the bigger number.`
  }

  else if (state == "COMPARE WINNERS") {
    state = "PLAYER 1 DICE ROLL"
    player1Numbers = Player1Arr[0].toString() + Player1Arr[1].toString()
    player2Numbers = Player2Arr[0].toString() + Player2Arr[1].toString()
    console.log(Number(player1Numbers), Number(player2Numbers))
    Player1Arr =[]
    Player2Arr =[]
    if (Number(player1Numbers) > Number(player2Numbers)) {
      numOfPlayer1Wins += 1
      return `${Player1UserName}'s number's are ${player1Numbers}, ${Player2UserName}'s numbers are ${player2Numbers}<br>
      ${Player1UserName} Wins! <br>
        The current score is ${Player1UserName}: ${numOfPlayer1Wins} ${Player2UserName}: ${numOfPlayer2Wins} <br>
        Click submit to play again.`
    }
    else if (Number(player1Numbers) == Number(player2Numbers)) {
      return `Draw! Everyone loses! <br>
        The current score is ${Player1UserName}: ${numOfPlayer1Wins} ${Player2UserName}: ${numOfPlayer2Wins} <br>
        Click submit to re-roll player 1's dice.`
    }

    else {
      numOfPlayer2Wins += 1
      return `${Player1UserName}'s number's are ${player1Numbers}, ${Player2UserName}'s numbers are ${player2Numbers}<br>
      ${Player2UserName} Wins! <br>
        The current score is ${Player1UserName}: ${numOfPlayer1Wins} ${Player2UserName}: ${numOfPlayer2Wins} <br>
        Click submit to re-roll player 1's dice.`
    }

  }


}

var main = function (input) {
  return beat_that(input);
}
