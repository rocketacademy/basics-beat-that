var dice1 = 0;
var dice2 = 0;
var player1Dice = ``;
var player2Dice = ``;
var p1Array = [];
var p2Array = [];
var gameMode = `Player 1`;
var msg = `Welcome ${gameMode}.`;

var main = function (input) {
  // force start the game with player 1
  if (gameMode == `Player 1` || gameMode == `Player 2`) {
    if (gameMode == `Player 1`) {
      gameMode = `p1Choice`;
      console.log(`current game mode is ${gameMode}`);
      spinTwoDice();
    } else if (gameMode == `Player 2`) {
      gameMode = `p2Choice`;
      console.log(`current game mode is ${gameMode}`);
      spinTwoDice();
    }
    return playerDiceRoll();
  }

  if (gameMode == `p1Choice`) {
    // input is the dice number i.e D1 or D2
    if (input == 1) {
      console.log(`choose order block code here`);
      createdNumber = `${dice1}${dice2}`;
      gameMode = `Player 2`;
      return message(1,1,createdNumber);
    } else if (input == 2) {
      createdNumber = `${dice2}${dice1}`;
      gameMode = `Player 2`;
     return message(1,2,createdNumber);
    } else {
      msg = `Please input a valid dice number`;
      return msg;
    }
  } else if (gameMode == `p2Choice`) {
    console.log(gameMode);
    if (input == 1) {
      console.log(`choose order block code for player 2 here`);
      createdNumber2 = `${dice1}${dice2}`;
      gameMode = `Compare results`;
     return message(2,1,createdNumber2);
    } else if (input == 2) {
      createdNumber2 = `${dice2}${dice1}`;
      gameMode = `Compare results`;
return message(2,2,createdNumber2);
    } else {
      msg = `Please input a valid dice number`;
      return msg;
    }
  }


  // add players scores to arrays
  p1Array.push(player1Dice);
  p2Array.push(player2Dice);

  // compare the result of the rolls from both players
  if (gameMode == `Compare results`) {
    console.log(gameMode);
   
    if (Number(createdNumber) > Number(createdNumber2)) {
      msg = `Player 1 won this round. `;
      
    } else if (Number(createdNumber) < Number(createdNumber2)) {
      msg = `Player 2 won this round.`;
      
    } else if (Number(createdNumber) = Number(createdNumber2)) {
      msg = `It's a draw!`;
      
    }
     gameMode = `Player 1`;
    return msg;
  }
};

var playerDiceRoll = function () {
  dice1 = rollDice();
  dice2 = rollDice();
  console.log(dice1, dice2);
  return (msg += `<br>You rolled ${dice1} and ${dice2}. Please input a valid dice number to determine your score`);
};

var rollDice = function () {
  // produces a decimal between 0 and 6
  var randomDecimal = Math.random() * 6;

  // take off the decimal
  var randomInteger = Math.floor(randomDecimal);

  // it's a number from 0 - 5 ... add 1
  var diceNumber = randomInteger + 1;

  return diceNumber;
};

var spinTwoDice = function () {
  var dice1 = rollDice();
  var dice2 = rollDice();
  return `${dice1} and ${dice2}`;
};

var message = function(playerIndex,diceNumber,createdNumber){
return `Player ${playerIndex}, you chose dice ${diceNumber} first.<br>Your number is ${createdNumber}.`
}