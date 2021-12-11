// ❌⚔🤺

const DEFAULT_SETTINGS = {
  highScoreMode: false,
  knockoutMode: false,
  numPlayers: 10,
  numDice: 2,
  round: 1,
  players: [],      // used for knockout mode, players not yet eliminated
  pointerX: -1,     // used for knockout mode, index of playerX
  pointerY: -1,     // used for knockout mode, index of playerY
  playerRolls: [],  // knockout mode - stores rolls and scores of a round
                    // regular mode - stores scores of a round
  playerScores: [], // used for regular mode, cumulative scores of players
}

var S = {...DEFAULT_SETTINGS}

// HELPER FUNCTIONS
var diceRoll = function () {
  var roll = []
  
  for (let i = 0; i < S.numDice; i += 1) {
    roll.push(Math.floor(Math.random() * 6) + 1)
  }
  // return an array containing dice rolls
  return roll
}

var rollMax = function(arr, highScoreMode) {
  // returns score based on high score mode
  if (highScoreMode) return Number([...arr].sort().reverse().join(""))
  else return Number([...arr].sort().join(""))
}

var selectKnockoutPlayers = function() {
  
  do {
  S.pointerX = Math.floor(Math.random() * S.players.length)
  S.pointerY = Math.floor(Math.random() * S.players.length)
  } while (S.pointerX === S.pointerY)
  
  return `Round ${S.round}<br><br>
  Player ${S.players[S.pointerX] + 1} VS Player ${S.players[S.pointerY] + 1}<br><br>
  Player ${S.players[S.pointerX] + 1}, roll the dice.`

}

var removePlayer = function (playerIndex) {
    
  for( var i = 0; i < S.players.length; i++){ 
      if ( S.players[i] === playerIndex) { 
          S.players.splice(i, 1)
          i--
      }
  }
}

var setGameState = function (playerNum, diceNum, calcScore, gameMode) {

  // input from user, this function is called from the script in index.html
  S.numPlayers = Number(playerNum);
  S.numDice = Number(diceNum);
  S.highScoreMode = !!+calcScore
  S.knockoutMode = !!+gameMode

  return `Welcome to "<b>SQUID THAT</b>!", the game where only the winner gets to leave!`
};

var resetGameState = function () {

  // reset game by resetting relevant variables and changing state of ui
  S = {...DEFAULT_SETTINGS}
  S.players.length = 0
  S.playerRolls.length = 0
  S.playerScores.length = 0

  document.querySelector("#start-game-button").disabled = false;
  document.querySelector("#continue-button").style.visibility = "hidden";
  document.querySelector("#quit-button").style.visibility = "hidden";
  document.querySelector("#num-player").disabled = false;
  document.querySelector("#num-dice").disabled = false;
  document.querySelector("#calc-score").disabled = false;
  document.querySelector("#game-mode").disabled = false;
};

// MAJOR FUNCTIONS
var getGamePrompt = function() {

  var message = ""
    
  if (S.pointerX === -1) {

    // Initialise scores array for players
    S.playerScores = new Array(S.numPlayers)
    for (var i = 0; i < S.numPlayers; i += 1) {
      S.playerScores[i] = { playerNum: i + 1, score: 0 }
      S.players[i] = i
    }

    // Knockout mode: Pick 2 distinct players
    if (S.knockoutMode) return selectKnockoutPlayers()
    
    // Running mode: Start from player 1
    S.pointerX += 1
    return `Player 1, roll the dice.`
  }
  
  var roll = diceRoll()
  var score = rollMax(roll,S.highScoreMode)
  
  // Player X VS Player Y
  if (S.knockoutMode) {
    
    var playerX = S.players[S.pointerX] + 1
    var playerY = S.players[S.pointerY] + 1
    
    if (S.playerRolls.length == 0) {
      // Player X rolls
      S.playerRolls.push([S.players[S.pointerX], roll, score])
      return `Player ${playerX} rolls ${S.playerRolls[0][1]} and scores ${S.playerRolls[0][2]}.<br><br>
      Player ${playerY}, roll the dice.`
    }
    
    if (S.playerRolls.length == 1) {
      // Player Y rolls
      S.playerRolls.push([S.players[S.pointerY], roll, score])
      message = `Player ${playerY} rolls ${S.playerRolls[1][1]} and scores ${S.playerRolls[1][2]}.<br><br>`
      
      // Compare, eliminate and clear scores
      if (S.playerRolls[0][2] === S.playerRolls[1][2]) {
        return `${message}Player ${playerX} and Player ${playerY} tied!<br><br>`
      }
      if (S.highScoreMode) {
        if (S.playerRolls[0][2] >= S.playerRolls[1][2]) {
          // Player X wins
          removePlayer(S.players[S.pointerY])
          return `${message}Player ${playerY} eliminated!<br><br>`
        }
        // Player Y wins
        removePlayer(S.players[S.pointerX])
        return `${message}Player ${playerX} eliminated!<br><br>`
      }
      if (S.playerRolls[0][2] >= S.playerRolls[1][2]) {
        // Player Y wins
        removePlayer(S.players[S.pointerX])
        return `${message}Player ${playerX} eliminated!<br><br>`
      }
      // Player X wins
      removePlayer(S.players[S.pointerY])
      return `${message}Player ${playerY} eliminated!<br><br>`

    }

    // Clear scores, draw another 2 players
    if (S.players.length > 1) {
      S.playerRolls = []
      S.round += 1
      return selectKnockoutPlayers()
    }

    var survivor = S.players[0] + 1

    resetGameState()
    return `Player ${survivor} gets to leave!`

  }

  if (S.pointerX === 0) S.playerRolls = []
  
  S.playerRolls[S.pointerX] = score
  S.playerScores[S.pointerX].score += score
  
  message += `Player ${S.playerScores[S.pointerX].playerNum} rolls ${roll} and scores ${score}.<br>`
  
  S.pointerX += 1
  if (S.pointerX === S.numPlayers) {
    S.pointerX = 0
    S.round += 1
  }
  
  message += `<br>Player ${S.playerScores[S.pointerX].playerNum}, roll the dice.`

  return message
  
  // fallthrough
  return `🤦🏻‍♂️ from getGamePrompt()`

}


var getLeaderBoard = function() {
  
  var output = `🥇🥈🥉<br><br>`
  
  // upon each player having rolled dice, output leaderboard
  if (S.knockoutMode) {
    for (var i = 0; i < S.numPlayers; i += 1) {
      if (S.players.includes(i)) {
        output += `<small>Player ${i + 1}</small><br>`
      } else {
      output += `<del><small>Player ${i + 1}</small></del><br>`
      }
    }
    return output
  }

  // sort players array by score
  if (S.highScoreMode === true) S.playerScores.sort((a, b) => b.score - a.score)
  else S.playerScores.sort((a, b) => a.score - b.score)

  // output scores
  for (var i = 0; i < S.playerScores.length; i += 1) {
    if (S.playerScores[i].score === 0) continue
    if (S.playerScores[i].score === S.playerScores[0].score)
    output += `<small>Player ${S.playerScores[i].playerNum}: <b>${
      S.playerScores[i].score
    }</b></small><br>`
    else
    output += `<small>Player ${S.playerScores[i].playerNum}: ${
      S.playerScores[i].score
    }</small><br>`
  }

  S.playerScores.sort((a, b) => a.playerNum - b.playerNum) //resort players by playernum
  return output
}

var getPlayerRolls = function() {
  var output = `<b>Round ${S.round} 🎲</b><br><br>`

  if (S.knockoutMode) {
    for (var player of S.playerRolls) {
      output += `<small>Player ${player[0] + 1}: ${player[2]}</small><br>`
    }
    return output
  }

  for (var i = 0; i < S.playerRolls.length; i += 1) {
    output += `<small>Player ${i + 1}: ${S.playerRolls[i]}</small><br>`
  }
  return output
}


var getGameFooter = function() {
  return ""
  // return `<br><br><hr><h6>Players: ${S.numPlayers}<br>
  // Dice: ${S.numDice}<br>
  // ${S.highScoreMode ? "High" : "Low"}<br>
  // ${S.knockoutMode ? "Knockout" : "Running"}<br>
  // S.players ${S.players}</h6>`
}

var getTable = function() {
  return `<table>
  <tr>
    <td valign = top style = "width:200px">${getLeaderBoard()}</td>
    <td style = "width:350px">${getGamePrompt() + getGameFooter()}</td>
    <td valign = top>${getPlayerRolls()}</td>
  </tr>
  </table>`
}

var main = function () {
  return getTable()
}

var imgURL = "https://static.straitstimes.com.sg/s3fs-public/styles/article_pictrure_780x520_/public/articles/2021/09/19/rrsquidgame1909.jpg?itok=5RH3kEjV&timestamp=1632028214"
document.body.style.backgroundImage = `url(${imgURL})`
document.body.style.backgroundRepeat = "no-repeat"
document.body.style.backgroundSize = "cover"
document.getElementById("container").style.opacity = "0.85"