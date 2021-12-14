// game modes
var gamemodeRollDice = 'game mode dice roll'
var gamemodeChooseDice = 'game mode choose dice'
var gamemodeChooseWinner = 'game mode choose winner'
var gamemode = gamemodeRollDice
oop

// Player 
var player1 = 'Player 1'
var player2 = 'Player 2'
var player = player1

// Array for players' dice rolls
var playerDice = []
var player1Dice = []
var player2Dice = []

// Array for players' numbers
var playerNumber = []
var player1Number = []
var player2Number = []

var rollDice = function () {
  // produces a decimal between 0 and 6

  var randomDecimal = Math.random() * 6;

  // take off the decimal
  var randomInteger = Math.floor(randomDecimal);

  // it's anumber from 0 - 5 ... add 1
  var diceNumber = randomInteger + 1;

  return diceNumber;
};

var getrandomDiceNumber = function () {
  var randomDiceNumber = [rollDice(), rollDice()]
  return randomDiceNumber;
}

var chooseWinner = function () {
  if (player1Number > player2Number) {
    return player1;
  }
  return player2;
};

var main = function (input) {
  console.log('the game mode is')
  console.log(gamemode)
  // default game mode roll dice first
  if (gamemode == gamemodeRollDice) {
    // default player 1 first
    if (player == player1) {
      player1Dice = getrandomDiceNumber()
      playerDice = player1Dice
    }
    // swap to player 2
    else {
      player = player2
      player2Dice = getrandomDiceNumber()
      playerDice = player2Dice
    }
    

    // change mode after getting dice number
    gamemode = gamemodeChooseDice
    var myOutputValue = `Welcome ${player}. <br> You rolled ${playerDice}. <br> Choose the order of the dice, Pick either Dice 1 or Dice 2 as the first numeral of the combined number by inputting 1 or 2 first. `
  } else if (gamemode == gamemodeChooseDice) {
    var chosenDice = input
    
    console.log(player1Dice);
    if (chosenDice == 1) {
      console.log('inside 1');
      console.log(player1Dice[0]);
    console.log(player2Dice[0]);
      if (player == player1) {
        player1Number = "" + player1Dice[0] + player1Dice[1]
      } else {
        player2Number = "" + player2Dice[0] + player2Dice[1]
      }
    } else {
      console.log('inside 2');
      console.log(player1Dice[1]);
    
      if (player == player1) {
        player1Number = '' + player1Dice[1] + player1Dice[0]
      } else {
        console.log(player2Dice[1]);
        player2Number = '' + player2Dice[1] + player2Dice[0]
        console.log(player2Number);
      }
    }
    
    // Assign player number into the respective player number array
    if (player == player1) {
      playerNumber = '' + player1Number
    }
    else {
      playerNumber = '' +player2Number
      gamemode = gamemodeChooseWinner
    }
    console.log(playerNumber);
    console.log('ihgore');
    var myOutputValue = `${player}, you chose ${chosenDice}. <br> Your number is ${playerNumber}.`

    // change player to player 2
    if (player == player1) {
      player = player2
      gamemode = gamemodeRollDice
    }
  }

  else if (gamemode == gamemodeChooseWinner) {
    var winningplayer = chooseWinner()
    var myOutputValue = `Congrats ${winningplayer}, you won! <br> ${player1} has chosen ${player1Number}. 
      <br> ${player2} has chosen ${player2Number}`
  }
  return myOutputValue;
};


