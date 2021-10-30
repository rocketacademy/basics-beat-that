// Requirements
var mode = "start game";
var myOutputValue = "";
var userNumber1 = "";
var userNumber2 = "";
var player1Score = 0;
var player2Score = 0;
var guess = "";
var guess2 = "";
var userTopGuess = "";
var output = "";
var score1 = 0;
var score2 = 0;

//Roll dice function
var rollDice = function () {
  // Generate a decimal from 0 through 6, inclusive of 0 and exclusive of 6.
  var randomDecimal = Math.random() * 6;

  // Remove the decimal with the floor operation.
  // This will be an integer from 0 to 5 inclusive.
  var randomInteger = Math.floor(randomDecimal);

  // Add 1 to get valid dice rolls of 1 through 6 inclusive.
  var diceNumber = randomInteger + 1;

  return diceNumber;
};

//User press submit button to roll the dice
var userDice = function () {
  userNumber1 = rollDice();
  userNumber2 = rollDice();
};

//User choose option 1 or 2
var chooseNumber = function (input) {
  var userStringTopGuess = "";
  if (mode == "choose number" || mode == "choose number 2") {
    if (input == 1) {
      userStringTopGuess = `${userNumber1}${userNumber2}`;
    } else if (input == 2) {
      userStringTopGuess = `${userNumber2}${userNumber1}`;
    }
    userTopGuess = Number(userStringTopGuess);

    if (mode == "choose number") {
      player1Score = userTopGuess;
      output = `Your guess is  ${userTopGuess}. <br> Player 2: Please press the submit button to roll the dice.`;
    }
    if (mode == "choose number 2") {
      player2Score = userTopGuess;
      mode = "final";
      output = `Your guess is  ${userTopGuess}. <br> Click the submit button to determine the winner.`;
    }
  }

  return output;
};

// First index will ask the player to press submit
// Computer will roll the dice
// Computer will return the dice number and ask to choose
var main = function (input) {
  if (mode == "start game") {
    mode = "choose number";
    guess = userDice();
    console.log(guess);
    // guessNum1 = Number(guess);
    myOutputValue = `Player 1: <br> You chose ${userNumber1} and  ${userNumber2}. <br> Please press 1 or 2`;
  }
  // PLayer will choose option 1 or 2
  // Computer will join them
  else if (mode == "choose number") {
    //Check if the input is a number
    if (Number.isNaN(Number(input)) == true) {
      myOutputValue = "Sorry please enter a number.";
    } else {
      myOutputValue = chooseNumber(input);
      mode = "player 2";
    }
  }
  // Computer will ask player 2 to submit
  // Computer will roll the dice
  // Computer will return the dice number and ask to choose
  else if (mode == "player 2") {
    guess2 = userDice();
    console.log(guess2);
    // guessNum2 = Number(guess2);
    myOutputValue = `Player 2: <br> You chose ${userNumber1} and  ${userNumber2}. <br> Please press 1 or 2`;
    console.log(guess2);
    mode = "choose number 2";
  }
  // PLayer will choose option 1 or 2
  // Computer will join them
  else if (mode == "choose number 2") {
    //Check if the input is a number
    if (Number.isNaN(Number(input)) == true) {
      myOutputValue = "Sorry please enter a number.";
    } else {
      myOutputValue = chooseNumber(input);
    }
  }

  // Computer will compare
  // Computer will declare the winner
  else if (mode == "final") {
    console.log("Is this working?");
    if (player1Score > player2Score) {
      score1++;
      myOutputValue = `Player 1 wins! <br><br> Player 1 scored: ${score1}<br> Player 2 scored: ${score2} <br><br> Please press submit to play again.`;
      mode = "start game";
    } else if (player2Score > player1Score) {
      score2++;
      myOutputValue = `Player 2 wins! <br><br> Player 1 scored: ${score1} <br> Player 2 scored: ${score2} <br><br> Please press submit to play again.`;
      mode = "start game";
    } else {
      myOutputValue = "Draw!  Please press submit to play again.";
      mode = "start game";
    }
  }
  console.log("mode:", mode);
  return myOutputValue;
};
