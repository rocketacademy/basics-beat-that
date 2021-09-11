var currentGameMode = "Player 1 Roll";
var player1DiceRoll1;
var player1DiceRoll2;
var player2DiceRoll1;
var player2DiceRoll2;
var player1FinalDice;
var player2FinalDice;
var player1NumberofWins = 0;
var player2NumberofWins = 0;

var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

var player1Roll = function () {
  player1DiceRoll1 = rollDice();
  player1DiceRoll2 = rollDice();
  myOutputValue = `Player 1, you rolled <b>${player1DiceRoll1}</b> for Dice 1 and <b>${player1DiceRoll2}</b> for Dice 2. <br>Choose the order of the dice by selection 1 or 2. `;
};

var player2Roll = function () {
  player2DiceRoll1 = rollDice();
  player2DiceRoll2 = rollDice();
  myOutputValue = `Player 2, you rolled <b>${player2DiceRoll1}</b> for Dice 1 and <b>${player2DiceRoll2}</b> for Dice 2. <br>Choose the order of the dice by selection 1 or 2. `;
};

var compareHighest = function () {
  if (Number(player1FinalDice) > Number(player2FinalDice)) {
    player1NumberofWins += 1;
    myOutputValue += `<br><br>Player 1 rolled ${player1FinalDice}.<br> Player 1 wins!<br><br>Player 1 Total Wins: ${player1NumberofWins}<br>Player 2 Total Wins: ${player2NumberofWins}<br><br>Click submit to play another round!`;
  } else {
    player2NumberofWins += 1;
    myOutputValue += `<br><br>Player 1 rolled ${player1FinalDice}.<br>Player 2 wins!<br><br>Player 1 Total Wins: ${player1NumberofWins}<br>Player 2 Total Wins: ${player2NumberofWins}<br><br>Click submit to play another round!`;
  }
};

var main = function (input) {
  var myOutputValue = "";

  if (currentGameMode == "Player 1 Roll") {
    player1Roll();
    currentGameMode = "Player 1 Choose";
  } else if (currentGameMode == "Player 1 Choose") {
    if (input == "1") {
      player1FinalDice = String(player1DiceRoll1) + String(player1DiceRoll2);
      myOutputValue = `Player 1, you chose Dice 1 first.<br>Your number is <b>${player1FinalDice}</b>.<br><br>It is now Player 2's turn. Click submit to roll the dice.`;
    } else if (input == "2") {
      player1FinalDice = String(player1DiceRoll2) + String(player1DiceRoll1);
      myOutputValue = `Player 1, you chose Dice 2 first.<br>Your number is <b>${player1FinalDice}</b>. <br><br>It is now Player 2's turn. Click submit to roll the dice.`;
    } else {
      myOutputValue = `Only 1 or 2 is accepted!! Please choose again.`;
      return myOutputValue;
    }
    currentGameMode = "Player 2 Roll";
  } else if (currentGameMode == "Player 2 Roll") {
    player2Roll();
    currentGameMode = "Player 2 Choose";
  } else if (currentGameMode == "Player 2 Choose") {
    if (input == "1") {
      player2FinalDice = String(player2DiceRoll1) + String(player2DiceRoll2);
      myOutputValue = `Player 2, you chose Dice 1 first.<br>Your number is <b>${player2FinalDice}</b>.`;
    } else if (input == "2") {
      player2FinalDice = String(player2DiceRoll2) + String(player2DiceRoll1);
      myOutputValue = `Player 2, you chose Dice 2 first.<br>Your number is <b>${player2FinalDice}</b>.`;
    } else {
      myOutputValue = `Only 1 or 2 is accepted!! Please choose again.`;
      return myOutputValue;
    }
    compareHighest();
    currentGameMode = "Player 1 Roll";
  }
  return myOutputValue;
};
