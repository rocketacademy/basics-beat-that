var currentPlayerMode = 'waiting for the player number';
var playerMode = '';
var userOrder = '';
var turn = 1;
var playerTurn = 'player1';
var user1Choice = '';
var user2Choice = '';

// dice number 1-6
var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var randomNumber = randomInteger + 1;
  return randomNumber;
};
// set diceroll 1 and diceroll2 as global status
var diceRoll1 = '';
var diceRoll2 = '';

// function to change the player's turn
var changeTurn = function (turn) {
  if (turn == 1) {
    myOutputValue = 'player1';
  } else if (turn == 2) {
    myOutputValue = 'player2';
  }
  return myOutputValue;
};

var main = function (input) {
  var myOutputValue = '';

  if (currentPlayerMode == 'waiting for the player number') {
    // set the player
    playerMode = input;
    // now that we have the player number ,switch the mode
    currentPlayerMode = 'dice game';
    myOutputValue = 'Hello ' + playerMode + 'Press submit to roll your dice';
  } else if (currentPlayerMode == 'dice game') {
    diceRoll1 = diceRoll();
    diceRoll2 = diceRoll();
    myOutputValue = `Welcome ${playerMode}.
     You rolled Dice1:${diceRoll1} and Dice2: ${diceRoll2}
     Choose the order of the dice`;
    currentPlayerMode = 'orderOfDice';
  }
  // the user picks the order of the dice
  // the player take turns and swich to the dice game mode

  // if player1
  if (currentPlayerMode == 'orderOfDice' && playerMode == 'player1') {
    userOrder = input;
    turn = turn + 1;
    var nextPlayer = changeTurn(turn);
    // if the user choose dice1 for the firdt order of numbers
    if (userOrder == 'Dice1') {
      // the order of the number that the user choose (dice1 + dice2)
      user1Choice = `${diceRoll1}${diceRoll2}`;
      myOutputValue = ` ${playerMode}, you chose ${userOrder} first.Your number is , ${user1Choice} It is now ${nextPlayer}'s turn.`;
      currentPlayerMode = 'dice game';
      playerMode = 'player2';
    } else if (userOrder == 'Dice2') {
      // the order of the number that user choose ( dice2 + dice1)
      user1Choice = `${diceRoll2}${diceRoll1}`;
      myOutputValue = ` ${playerMode}, you chose ${userOrder} first.Your number is ${user1Choice}.It is now ${nextPlayer}'s turn.`;
      currentPlayerMode = 'dice game';
      playerMode = nextPlayer;
    }
    // player2
  } else if (currentPlayerMode == 'orderOfDice' && playerMode == 'player2') {
    userOrder = input;

    if (userOrder == 'Dice1') {
      user2Choice = `${diceRoll1}${diceRoll2}`;
      myOutputValue = ` ${playerMode}, you chose ${userOrder} first.Your number is ${user2Choice}.`;
      currentPlayerMode = 'compare numbers';
    } else if (userOrder == 'Dice2') {
      user2Choice = `${diceRoll2}${diceRoll1}`;
      myOutputValue = ` ${playerMode}, you chose ${userOrder} first.Your number is ${user2Choice}.`;

      currentPlayerMode = 'compare numbers';
    }
    if (currentPlayerMode == 'compare numbers') {
      console.log('user choice 1:' + user1Choice);
      console.log('user choise 2:' + user2Choice);

      if (user1Choice > user2Choice) {
        myOutputValue = 'player1 win!';
      } else if (user1Choice < user2Choice) {
        myOutputValue = 'player2 win';
      }
    }
  }
  return myOutputValue;
};
