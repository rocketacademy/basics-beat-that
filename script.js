// There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.

//global variables
var DICEROLL = `DICEROLL`;
var DICEORDER = `DICEORDER`;
var gameMode = DICEROLL;
var player1Dice = [];
var player2Dice = [];
var currPlayer = 1;
var player1Num = [];
var player2Num = [];
var player1SumNum = [];
var player2SumNum = [];


var rollDice = function () {
  return Math.ceil(Math.random() * 6)
}

var getDiceRolls = function () {
  var diceRolls = [rollDice(), rollDice()]
  
  if (currPlayer == 1) {
    player1Dice = diceRolls;
  } else 
    {
    player2Dice = diceRolls;
    }
    return diceRolls;
}

var concatenate2Numbers = function (num1, num2) {
  return Number(String(num1) + String(num2));
};


  var getPlayerNumber = function (diceOrder) {
  
    var diceArray;
    if (currPlayer == 1) {
        diceArray = player1Dice
        } else
        {diceArray = player2Dice};

    var playerNum;

    if (diceOrder === 1) {
      playerNum = concatenate2Numbers(diceArray[0], diceArray[1]);
    }
    else {
      playerNum = concatenate2Numbers(diceArray[1], diceArray[0]);
    }
  
    if (currPlayer === 1) {
      player1Num = playerNum;
    } else {
      player2Num = playerNum;
    }
  
    return playerNum;
  };



var determineWinner = function() {
  if (player1Num > player2Num) {
    return 1;
  }
  return 2;
}


var main = function(input) {
  if (gameMode == DICEROLL) {
    var newDiceRolls = getDiceRolls();
    gameMode = DICEORDER;
    return `Welcome Player ${currPlayer}.<br><br>
    You rolled Dice 1: ${newDiceRolls[0]} and Dice 2: ${newDiceRolls[1]}.
    Please choose which dice you want to be first.` 
}

  if (gameMode == DICEORDER) {
    var diceOrder = Number(input)
    if (diceOrder !== 1 && diceOrder !== 2) {
      return `Please choose 1 or 2.`
    } else 

    var playerNum = getPlayerNumber(diceOrder);

    console.log (player1Dice)
    console.log (player1Num)
    
    var playerMess = `Player ${currPlayer}, You chose Dice ${diceOrder} to be first.<br><br>
    Your number is ${playerNum}.`

    if (currPlayer == 1) {
      currPlayer = 2;
      gameMode = DICEROLL;

      return `${playerMess}<br><br>
      Player 2, Press Submit to roll dice`;
    };

    var whoWon = determineWinner();

    currPlayer = 1;
    gameMode = DICEROLL;
   
    var counterPlayer1 = 0;
    var counterPlayer2 = 0;

    for (var i=0; i < player1Num.length, i++) 
    {
    
    var player1SumNum = player1Num + player1Num[i];
    counterPlayer1 += player1Num[i];

    player1SumNum;
    }

    for (var i=0; i < player2Num.length, i++) 
    {

    var player2SumNum = player2Num + player2Num[i];
    counterPlayer2+= player2Num[i];

    player2SumNum;
    }

    return `
    Player ${whoWon} wins!<br><br>
    Player 1 Number : ${player1Num} & Player 2 Number 2: ${player2Num}.
    <br><br>Press submit to play again!
    <br><br>
    Player 1 Total Number : ${player1SumNum} | Player 2 Total Number: ${player2SumNum}`

  }
  }