/* There are 2 players and players take turns.

placeholder: Welcome Player 1.

input 1: player 1 run program (play clicks Submit)
output: computer shows 2 dice rolls 
"You rolled 3 for Dice 1 and 6 for Dice 2.
Choose the order of the dice."

input 2: player 1 choose dice roll #1 or #2
output: Player 1, you chose Dice 2 first. Your number is 63. It is now Player 2's turn.

input 3: player 2 rolls 
output: computer shows 2 dice rolls 
"You rolled 3 for Dice 1 and 6 for Dice 2.
Choose the order of the dice."

input 4: player 2 rolls 
output: computers shows 2 dice rolls 

*/ 

// default
var mode = 'Player 1 turn';
var message = '';
var winner = '';


var playerOneFirstRoll = 0;
var playerOneSecondRoll = 0;
var playerTwoFirstRoll = 0;
var playerTwoSecondRoll = 0;

var playerOneChoice = 0;
var playerTwoChoice = 0;

// computer generates dice roll string
var diceRoll = function () {
  // avoid rolling 0
  var randomDecimal = 1 + Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  return parseInt(randomInteger);
}

var main = function (input) {
  
  // default mode: player 1 starts 
  if (mode == 'Player 1 turn') {
    // player 1 rolls random dice twice 
    playerOneFirstRoll = diceRoll();
    playerOneSecondRoll = diceRoll();

    message = 'Player 1, you rolled ' + playerOneFirstRoll + ' for dice 1 and ' + playerOneSecondRoll + ' for dice 2.' + '<br>' + 'Choose 1 or 2.';

    // player 1 chooses one dice
    mode = 'Player 1 choice';
    console.log(mode);
    return message; 
  }
  
  // after player 1 rolls, player 1 chooses 
  else if (mode == 'Player 1 choice') { 
    // default: dice 1 is player 1's choice, concantenate dice 1,2
    playerOneChoice = playerOneFirstRoll + playerOneSecondRoll;

    // dice 2 is player 1's choice, concantenate dice 2,1
    if (input == '2') {
      playerOneChoice = playerOneSecondRoll + playerOneFirstRoll;
    }
    message = 'Player 1, you chose dice ' + input +  ' first. Your number is ' + playerOneChoice + '. It is now Player 2\'s turn. Click Submit';

    mode = 'Player 2 turn'
    return message;
  }

  // after player 1 chooses, player 2 rolls
  else if (mode == 'Player 2 turn') { 
    playerTwoFirstRoll = diceRoll();
    playerTwoSecondRoll = diceRoll();

    message = 'Player 2, you rolled ' + playerTwoFirstRoll + ' for dice 1 and ' + playerTwoSecondRoll + ' for dice 2.' + '<br>' + 'Choose 1 or 2.';
    mode = 'Player 2 choice';

    return message;
  }

  // after player 2 rolls, player 2 chooses
  else if (mode == 'Player 2 choice') {
    
    // default: dice 1 is player 2's choice, concantenate dice 1,2
    playerTwoChoice = playerTwoFirstRoll + playerTwoSecondRoll;

    // dice 2 is player 1's choice, concantenate dice 2,1
    if (input == '2') {
      playerTwoChoice = playerTwoSecondRoll + playerTwoFirstRoll;
    }
    
    // default for winning 
    if (playerOneChoice > playerTwoChoice) {
      winner = 'Player 1';
    }
    else {
      winner = 'Player 2';
    }

    message = 'Player 2, you chose dice ' + input +  ' first. Your number is ' + playerTwoChoice + '. ' + '<br>' + 'Player 1: ' + playerOneChoice + '<br>' + 'Player 2: ' + playerTwoChoice + '<br>' + winner + ' wins!';
    mode = 'Player 1 turn'

    return message;
  }
}
