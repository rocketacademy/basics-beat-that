// 2 players, each player rolls 2 dice,
// they choose the order of the dice,
// whoever gets the bigger number wins
// 2 modes, player 1 and player 2
// new mode with variable number of dice

var mode = 'enter mode';
var dice1 = 0;
var dice2 = 0;
var myOutputValue = '';
var playerNumber = 0;
var player1Number = 0;
var player2Number = 0;

var playerDiceArray = [];
var player1DiceArray = [];
var player2DiceArray = [];
var dicePositionArray = [];
var dicePosition1Array = [];
var dicePosition2Array = [];
var playerScore = 0;
var player1Score = 0;
var player2Score = 0;
var player1TotalScore = 0;
var player2TotalScore = 0;

// generate 1 dice number
var randomNumber = function () {
  return (Math.floor(Math.random() * 6)) + 1;
};

// generate 2 dice numbers
var roll2Dice = function () {
  var message = '';

  dice1 = randomNumber();
  dice2 = randomNumber();
  message = `you rolled<br>
  Dice 1: ${dice1}<br>
  Dice 2: ${dice2}<br>`;

  return message;
};

// generate n dice numbers
var rollNdice = function (numOfDice) {
  var i = 0;
  var diceNumber = 0;
  while (i < numOfDice) {
    diceNumber = randomNumber();
    playerDiceArray.push(diceNumber);
    i += 1;
  }
  return playerDiceArray;
};

// generate position array
var generatePositionArray = function (numOfDice) {
  var j = 0;
  var positionNumber = 0;
  while (j < numOfDice) {
    dicePositionArray.push(positionNumber);
    positionNumber += 1;
    j += 1;
  }
  return dicePositionArray;
};

// generate player's score
var generatePlayerScore = function (input) {
  var positions = input.split('');
  var playerNumberArray = [];
  var k = 0;

  while (k < playerDiceArray.length) {
    playerNumberArray.push(playerDiceArray[positions[k]]);
    k += 1;
  }
  playerScore = playerNumberArray.join('');

  return playerScore;
};

// player chooses order of dice , return resultant number
var orderOfDice = function (choice) {
  var message = '';
  var playerNumberArray = [];

  if (choice == 1) {
    playerNumberArray.push(dice1);
    playerNumberArray.push(dice2);
    playerNumber = playerNumberArray.join('');
    message = `you chose dice 1 to be first, your number is ${playerNumber}`;
  } else if (choice == 2) {
    playerNumberArray.push(dice2);
    playerNumberArray.push(dice1);
    playerNumber = playerNumberArray.join('');
    message = `you chose dice 2 to be first, your number is ${playerNumber}`;
  }

  return message;
};

var main = function (input) {
  // choose which mode to play
  if (mode == 'enter mode') {
    if (input == 'n' || input == 'v') {
      if (input == 'n') {
        myOutputValue = 'Player 1, please click the submit button';
        mode = 'player 1';
      } else if (input == 'v') {
        myOutputValue = 'Player 1, please enter the number of dice to use';
        mode = 'player 1 variable dice mode';
      }
    } else {
      myOutputValue = 'Please enter either \'n\' or \'v\'';
    }
    return myOutputValue;
  }

  // variable dice mode
  // obtaining player 1's dice array and positions array
  if (mode == 'player 1 variable dice mode') {
    if (isNaN(Number(input)) == false && input != '') {
      rollNdice(input);
      generatePositionArray(input);
      player1DiceArray = playerDiceArray;
      dicePosition1Array = dicePositionArray;
      mode = 'player 1 enter positions mode';
      myOutputValue = 'Player 1,<br>Numbers : ' + player1DiceArray
    + '<br> Positions : ' + dicePosition1Array + '<br>Please choose your positions';
    } else {
      myOutputValue = 'Please enter number of dice to use';
    }
    return myOutputValue;
  }

  // obtaining player 1's score
  if (mode == 'player 1 enter positions mode') {
    if (isNaN(Number(input)) == false && input != '' && input.length == player1DiceArray.length) {
      generatePlayerScore(input);
      player1Score = Number(playerScore);
      player1TotalScore += player1Score;
      myOutputValue = `Player 1, your score is ${player1Score}. It is now Player 2's turn. Player 2, 
      please click submit`;
      mode = 'player 2 variable dice mode';
    } else {
      myOutputValue = 'Please enter a valid choice';
    }

    // clear arrays for player 2's turn
    dicePositionArray = [];
    playerDiceArray = [];
    return myOutputValue;
  }

  // obtaining player 2's dice array and positions array
  if (mode == 'player 2 variable dice mode') {
    rollNdice(player1DiceArray.length);
    generatePositionArray(player1DiceArray.length);
    console.log(generatePositionArray);
    player2DiceArray = playerDiceArray;
    dicePosition2Array = dicePositionArray;
    mode = 'player 2 enter positions mode';
    myOutputValue = 'Player 2,<br>Numbers : ' + player2DiceArray
    + '<br> Positions : ' + dicePosition2Array + '<br>Please choose your positions';
    return myOutputValue;
  }

  // obtaining player 2's score
  if (mode == 'player 2 enter positions mode') {
    if (isNaN(Number(input)) == false && input != '' && input.length == player2DiceArray.length) {
      generatePlayerScore(input);
      player2Score = Number(playerScore);
      player2TotalScore += player2Score;
      myOutputValue = `Player 2, your score is ${player2Score}<br>Player 1's score was ${player1Score}`;
    } else {
      myOutputValue = 'Please enter a valid choice';
    }

    // clear arrays for player 1's turn
    dicePositionArray = [];
    playerDiceArray = [];

    // determining the winner
    if (player1TotalScore > player2TotalScore) {
      myOutputValue += `<br><br>Player 1's total score : ${player1TotalScore}
      <br>Player 2's total score : ${player2TotalScore}<br><br> PLAYER 1 WINS !!<br><br>
      Enter 'v' to continue, or 'n' to enter normal mode`;
    } else if (player2TotalScore > player1TotalScore) {
      myOutputValue += `<br><br>Player 1's total score : ${player1TotalScore}
      <br>Player 2's total score : ${player2TotalScore}<br><br> PLAYER 2 WINS !!
      <br><br>Enter 'v' to continue, or 'n' to enter normal mode`;
    } else {
      myOutputValue += `<br><br>Player 1's total score : ${player1TotalScore}
      <br>Player 2's total score : ${player2TotalScore}<br><br> It's a DRAW !<br><br>
      Enter 'v' to continue, or 'n' to enter normal mode`;
    }

    mode = 'enter mode';
    return myOutputValue;
  }
  // end of variable game mode

  // normal game mode
  // player 1's dice roll
  if (mode == 'player 1') {
    myOutputValue = 'Player 1, ' + roll2Dice() + 'Please choose the order you want them in';
    mode = 'player 1 choice';
    return myOutputValue;
  }

  // obtaining player 1's number
  if (mode == 'player 1 choice') {
    if (input == 1 || input == 2) {
      myOutputValue = 'Player 1, ' + orderOfDice(input) + '<br>It is now Player 2\'s turn'
      + '<br> Player 2, please click the submit button';
      mode = 'player 2';
    } else {
      myOutputValue = 'Please enter either 1 or 2';
    }
    player1Number = playerNumber;
    return myOutputValue;
  }

  // player 2's dice roll
  if (mode == 'player 2') {
    myOutputValue = 'Player 2, ' + roll2Dice() + 'Please choose the order you want them in';
    mode = 'player 2 choice';
    return myOutputValue;
  }

  // obtaining player 2's number
  if (mode == 'player 2 choice') {
    if (input == 1 || input == 2) {
      myOutputValue = 'Player 2, ' + orderOfDice(input) + '<br>Player 1\'s number is ' + player1Number + '<br>';
      player2Number = playerNumber;

      // determining the winner
      if (player1Number > player2Number) {
        myOutputValue += `PLAYER 1 WINS!!<br>It is now player 1's turn. Enter 'n' to continue, or 'v' to enter 
      variable dice mode`;
      } else if (player2Number > player1Number) {
        myOutputValue += `PLAYER 2 WINS!!<br>It is now player 1's turn. Enter 'n' to continue, or 'v' to enter 
      variable dice mode`;
      } else {
        myOutputValue += `It's a DRAW!! Enter 'n' to continue, or 'v' to enter 
      variable dice mode`;
      }
      mode = 'enter mode';
    } else {
      myOutputValue = 'Please enter either 1 or 2';
    }

    return myOutputValue;
  }
  // end of normal game mode
};
