// there are 4 mode .
// 1) player 1 roll . 2) player 1 pick to make the highest number.
// 3) player 2 roll. 4) player 2 pick to make the highest number.
var mode = 'player 1 roll dice';
// store player 1 highest number
var player1HighestNum = 0;
var player2HighestNum = 0;

var randomDice1 = 0;
var randomDice2 = 0;

// Generate random number from 1-6.
var diceRoll = function () {
  var randomDiceNum = Math.floor(Math.random() * 6) + 1;
  return randomDiceNum;
};

// player 1 and player 2 roll 2 dice logic
var roll2Dice = function (player1Or2) {
  var message = '';
  randomDice1 = diceRoll();
  randomDice2 = diceRoll();
  console.log(randomDice1);
  console.log(randomDice2);
  message = 'Welcome ' + player1Or2 + '<br> You rolled '
    + randomDice1 + ' for dice 1 and ' + randomDice2 + ' for dice 2 <br> choose the order of the dice';
  return message;
};

// whoever have the highest total value win
var winningCondition = function () {
  if (player1HighestNum > player2HighestNum) {
    var message = 'Player 1 win! <br> Player 1 total point ' + player1HighestNum + '<br> Player 2 total point ' + player2HighestNum;
    return message;
  }

  message = 'Player 2 win! <br> Player 1 total point ' + player1HighestNum + '<br> Player 2 total point ' + player2HighestNum;
  return message;
};

// player one pick dice logic
var player1Or2PickDice1OrDice2First = function (input, playersHighestNum) {
  var message = '';
  // If player 1 or 2 pick dice 1
  if (input == '1') {
    playersHighestNum = randomDice1 + '' + randomDice2;
    if (mode == 'player 1 pick dice 1 or 2') {
      message = 'Player 1, you chose Dice 1 first.<br> Your number is ' + playersHighestNum + '<br> Computer turn';
      player1HighestNum = playersHighestNum;
      return message;
    } if (mode == 'player 2 pick dice 1 or 2') {
      player2HighestNum = playersHighestNum;
      message = winningCondition();
      return message;
    }
  }
  // if player 1 or 2 pick dice 2
  if (input == '2') {
    playersHighestNum = randomDice2 + '' + randomDice1;
    if (mode == 'player 1 pick dice 1 or 2') {
      message = 'Player 1, you chose Dice 2 first.<br> Your number is ' + playersHighestNum + '<br> Computer turn';
      player1HighestNum = playersHighestNum;
      return message;
    } if (mode == 'player 2 pick dice 1 or 2') {
      player2HighestNum = playersHighestNum;
      message = winningCondition();

      return message;
    }
  }
};

// compare both player total value

var main = function (input) {
  var myOutputValue = 'have bug';

  // Player 1 roll the two dice.
  if (mode == 'player 1 roll dice') {
    myOutputValue = roll2Dice('Player 1');
  }

  // player 1 pick dice 1 or dice 2 first to make the highest number.
  if (mode == 'player 1 pick dice 1 or 2') {
    myOutputValue = player1Or2PickDice1OrDice2First(input, player1HighestNum);
    console.log(player1HighestNum);
  }
  // player 2 roll 2 dice
  if (mode == 'player 2 roll dice') {
    myOutputValue = roll2Dice('Player 2');
  }
  // player 2 pick dice 1 or dice 2 first to make the highest number.
  if (mode == 'player 2 pick dice 1 or 2') {
    myOutputValue = player1Or2PickDice1OrDice2First(input, player2HighestNum);
    console.log(player2HighestNum);
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
