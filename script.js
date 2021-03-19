// there are 4 mode .
// 1) player 1 roll . 2) player 1 pick to make the highest number.
// 3) player 2 roll. 4) player 2 pick to make the highest number.
var mode = 'player 1 roll dice';

// store player 1 point
var playerOneHighestNum = 0;

var randomDice1 = 0;
var randomDice2 = 0;

// There are 2 dice.
// dice 1
var diceRoll1 = function () {
  var randomDiceNum = Math.floor(Math.random() * 6) + 1;
  return randomDiceNum;
};

// dice 2
var diceRoll2 = function () {
  var randomDiceNum2 = Math.floor(Math.random() * 6) + 1;
  return randomDiceNum2;
};

// player one pick dice logic
var playerOnePickDiceOneOrDiceTwo = function (input) {
  var message = '';
  playerOneHighestNum = 0;
  // If player 1 pick dice 1
  if (input == '1') {
    playerOneHighestNum = randomDice1 + '' + randomDice2;
    message = 'Player 1, you chose Dice 1 first.<br> Your number is ' + playerOneHighestNum + '. <br> It is now player 2 turn';
    console.log('player 1 point');
    console.log(playerOneHighestNum);
    return message;
  }
  // if player 1 pick dice 2
  if (input == '2') {
    playerOneHighestNum = randomDice2 + '' + randomDice1;
    message = 'Player 1, you chose Dice 2 first.<br> Your number is ' + playerOneHighestNum + '. <br> It is now player 2 turn';
    console.log('player 1 point');
    console.log(playerOneHighestNum);
    return message;
  }
};

// player two pick dice logic
var playerTwoPickDiceOneOrDiceTwo = function (input) {
  var message = '';
  var playerTwoHighestNum = 0;
  // If player 2 pick dice 1
  if (input == '1') {
    playerTwoHighestNum = randomDice1 + '' + randomDice2;
    console.log('player 2 point');
    console.log(playerTwoHighestNum);
    console.log('Player 1 point');
    console.log(playerOneHighestNum);
    // If player 1 combine number is higher than player 2 combine number.
    // player 1 win. Else player 2 win.
    if (playerOneHighestNum > playerTwoHighestNum) {
      message = 'Player 2, you chose Dice 1 first.<br> You number '
     + playerTwoHighestNum + '.<br> Player 1 win ';
      return message;
    }
    message = 'Player 2, you chose Dice 1 first.<br> You number '
     + playerTwoHighestNum + '<br>Player 2 win ';
    return message;

    // If player 2 pick dice 2
  } if (input == '2') {
    playerTwoHighestNum = randomDice2 + '' + randomDice1;
    console.log('player 2 point');
    console.log(playerTwoHighestNum);
    console.log('P1');
    console.log(playerOneHighestNum);
    // If player 2 combine number is higher than player 1 combine number.
    // player 2 win. Else player 1
    if (playerTwoHighestNum > playerOneHighestNum) {
      message = 'Player 2, you chose Dice 2 first.<br> You number is '
      + playerTwoHighestNum + '<br> Player 2 win ';
      return message;
    }
    message = 'Player 2, you chose Dice 2 first.<br> You number is '
    + playerTwoHighestNum + '<br> Player 1 win ';
    return message;
  }
};

var main = function (input) {
  var myOutputValue = 'have bug';

  // Player 1 roll the two dice.
  if (mode == 'player 1 roll dice') {
    randomDice1 = 0;
    randomDice2 = 0;
    randomDice1 = diceRoll1();
    randomDice2 = diceRoll2();
    console.log(randomDice1);
    console.log(randomDice2);
    myOutputValue = 'Welcome player 1.<br> You rolled '
    + randomDice1 + ' for dice 1 and ' + randomDice2 + ' for dice 2 <br> choose the order of the dice';
  }

  // player 1 pick either dice 1 or dice 2 to make the highest number.
  if (mode == 'player 1 pick dice 1 or 2') {
    myOutputValue = playerOnePickDiceOneOrDiceTwo(input);
  }
  // player 2 roll 2 dice
  if (mode == 'player 2 roll dice') {
    randomDice1 = 0;
    randomDice2 = 0;
    randomDice1 = diceRoll1();
    randomDice2 = diceRoll2();
    console.log(randomDice1);
    console.log(randomDice2);
    myOutputValue = 'Welcome player 2.<br> You rolled '
     + randomDice1 + ' for dice 1 and ' + randomDice2 + ' for dice 2 <br> choose the order of the dice';
  }
  if (mode == 'player 2 pick dice 1 or 2') {
    myOutputValue = playerTwoPickDiceOneOrDiceTwo(input);
  }
  // 1) player 1 roll . 2) player 1 pick to make the highest number.
  // 3) player 2 roll. 4) player 2 pick to make the highest number.
  // change mode accordingly to the game
  if (mode == 'player 1 roll dice') {
    mode = 'player 1 pick dice 1 or 2';
  }
  else if (mode == 'player 1 pick dice 1 or 2') {
    mode = 'player 2 roll dice';
  }
  else if (mode == 'player 2 roll dice') {
    mode = 'player 2 pick dice 1 or 2';
  }
  else if (mode == 'player 2 pick dice 1 or 2') {
    mode = 'player 1 roll dice';
  }
  return myOutputValue;
};
