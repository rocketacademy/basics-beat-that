//define 2 game modes
var diceRoll = "Dice Roll";
var chooseNumber = "Choose Number";

//default game mode is always 'Dice Roll'
var gameMode = diceRoll;

//player 1 starts
var player = 1;

// track each player and their dice roll
var player1Roll = [];
var player2Roll = [];

//create a random dice roll for thr game
var randomdiceRoll = function () {
  return Math.ceil(Math.random() * 6);
};

//put random dice roll values into player1Roll and player2Roll array
var playerdiceRolls = function () {
  var newDiceRolls = [randomdiceRoll(), randomdiceRoll()];
  if (player == 1) {
    player1Roll = newDiceRolls;
  } else {
    player2Roll = newDiceRolls;
  }
  return newDiceRolls;
};

// include function to concentate the numbers as the beat that game requires for the numbers from the 2 random dice rolls to be concancated
var concatenate2Numbers = function (number1, number2) {
  return Number(String(number1) + String(number2));
};

//the player chooses the numbers here diceArray draws from the if conditionals listed player1Roll in line 24 and player2Roll in line 26
// for the chosenplayerNum variable, player chooses the number if you input 1, the first dicerollis chosen as the first number, based on line 33 the return will be a combination of the two numbers
//for line 54 the player who is playing is important as the number the player has chosen to concencate is reflected in the retuns in line 85
var numberchosenbyPlayer = function (firstNumertobeinfront) {
  var diceArray;
  if (player == 1) {
    diceArray = player1Roll;
  } else {
    diceArray = player2Roll;
  }

  var chosenplayerNum;
  if (firstNumertobeinfront == 1) {
    chosenplayerNum = concatenate2Numbers(diceArray[0], diceArray[1]);
  } else {
    chosenplayerNum = concatenate2Numbers(diceArray[1], diceArray[0]);
  }

  if (player == 1) {
    player1Num = chosenplayerNum;
  } else {
    player2Num = chosenplayerNum;
  }

  return chosenplayerNum;
};

// determine the winner by equating 1 to player 1 and 2 to player 2
var determineWinner = function () {
  if (player1Num > player2Num) {
    return 1;
  }
  return 2;
};

//we now combine all the variables in the global state and get the local state which is the main to draw from the global state
// start off by determining which state the game is in so that we can provide instructions and initiate the random roll
var main = function (input) {
  if (gameMode == diceRoll) {
    var newDiceRolls = playerdiceRolls();
    gameMode = chooseNumber;
    return `Welcome Player ${player}. <br>
      You rolled Dice 1: ${newDiceRolls[0]} and Dice 2: ${newDiceRolls[1]} <br>
      Choose the order of the dice by entering 1 or 2 as the first numeral index.`;
  }
  if (gameMode == chooseNumber) {
    var firstNumertobeinfront = Number(input);
    if (firstNumertobeinfront !== 1 && firstNumertobeinfront !== 2) {
      return "Please choose 1 or 2 as the first numeral index for your dice rolls";
    }

    var chosenplayerNum = numberchosenbyPlayer(firstNumertobeinfront);
    var playerNumResponse = `Player ${player}, You chose Dice ${firstNumertobeinfront} first. <br>
      Your number is ${chosenplayerNum}.`;

    if (player == 1) {
      player = 2;
      gameMode = diceRoll;

      return `${playerNumResponse} <br>
        It is now Player 2's turn. Press Submit to roll Player 2's dice.`;
    }

    var winningPlayer = determineWinner();

    player = 1;
    gameMode = diceRoll;

    return `${playerNumResponse} <br>
      Player ${winningPlayer} has won. <br>
      Player 1's number: ${player1Num} | Player 2's number: ${player2Num} <br> <br>
      Press Submit to play again.`;
  }

  return "An error occurred. Please refresh to start again.";
};
