//User keys in the number of players they want.
var rollDice = function () {
  var randomDiceNumber = Math.floor(Math.random() * 6 + 1);
  return randomDiceNumber;
};
var playerDice1 = 0;
var playerDice2 = 0;
var gameMode = "start";
var numberOfPlayers = 0;
var playerScore = 0;
var x = 0;
var recordOfNumbers = [];

var main = function (input) {
  if (gameMode == "start") {
    x = 0;
    recordOfNumbers = [];
    if (isNaN(input) || input <= 0) {
      var myOutputValue = `Please enter a valid number of players.`;
      return myOutputValue;
    } else {
      numberOfPlayers = input;
      var myOutputValue = `You will have ${input} players in this game. Player 1 will go first.<br>Rules of the game: Click start to initiate the roll of 2 dice. Then choose your first number from the random roll of the 2 dice to form a 2 digit number.<br>Player with the highest value will win.<br>Click submit to continue.`;
      gameMode = "playerRoll";
      return myOutputValue;
    }
  }
  if (gameMode == "playerRoll") {
    while (x < numberOfPlayers) {
      playerDice1 = rollDice();
      playerDice2 = rollDice();
      var myOutputValue = `Welcome Player ${
        Number(x) + 1
      }. <br>You rolled ${playerDice1} for Dice 1 and ${playerDice2} for Dice 2. <br>Choose the order of your dice by keying in the number of the dice you want to be the first.`;
      gameMode = "playerToChoose";
      return myOutputValue;
    }
    if (x == numberOfPlayers) {
      gameMode = "conclusion";
      var myOutputValue = `We will now conclude the winner. Please click submit to continue.`;
      return myOutputValue;
    }
  }
  if (gameMode == "playerToChoose") {
    if (Number(input) !== playerDice1 && Number(input) !== playerDice2) {
      var myOutputValue = `Please key in a valid number that you rolled. Either ${playerDice1} or ${playerDice2}.`;
      return myOutputValue;
    }
    if (Number(input) == playerDice1) {
      var myOutputValue = `Player ${Number(x) + 1}, you chose Dice 1 first.
Your number is ${
        playerDice1.toString() + playerDice2.toString()
      }. <br>Click submit to continue.`;
      playerScore = Number(playerDice1.toString() + playerDice2.toString());
      console.log(playerScore);
      recordOfNumbers.push(playerScore);
      gameMode = "playerRoll";
      x += 1;
      return myOutputValue;
    }
    if (Number(input) == playerDice2) {
      var myOutputValue = `Player ${Number(x) + 1}, you chose Dice 2 first.
Your number is ${
        playerDice2.toString() + playerDice1.toString()
      }. <br>Click submit to continue.`;
      playerScore = Number(playerDice2.toString() + playerDice1.toString());
      console.log(playerScore);
      recordOfNumbers.push(playerScore);
      gameMode = "playerRoll";
      x += 1;
      return myOutputValue;
    }
  }

  if (gameMode == "conclusion") {
    var largestNumber = Math.max(...recordOfNumbers);
    var myOutputValue = `The 2-digit record of all players in order from player 1 to player ${x} are as follows: ${recordOfNumbers}. <br>Largest number being ${largestNumber}.<br>Congratulations to player ${
      Number(recordOfNumbers.indexOf(largestNumber)) + 1
    }.`;
    var repetitionCounter = 0;
    var largestNumberPlayers = [];
    for (var i = 0; i < recordOfNumbers.length; i += 1) {
      if (largestNumber == recordOfNumbers[i]) {
        repetitionCounter += 1;
        largestNumberPlayers.push(i + 1);
        console.log(largestNumberPlayers);
        console.log(repetitionCounter);
      }
    }
    if (repetitionCounter >= 2) {
      var myOutputValue = `The 2-digit record of all players in order from player 1 to player ${x} are as follows: ${recordOfNumbers}. <br>Largest number being ${largestNumber}.<br>Congratulations to players ${largestNumberPlayers}.`;
    }

    gameMode = "start";
    return myOutputValue + `<br>To restart the game, click submit to continue.`;
  }
};
