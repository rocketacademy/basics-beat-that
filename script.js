var gametype = "nil";
var gamestage = "start1";
var player1name = "username";
var player2name = "username";
var player1number = "";
var player2number = "";
var playerArray = "";
var player1score = 0;
var player2score = 0;
var playcount = playcount + 1;

var main = function (input) {
  if (gametype == "nil") {
    gametype = `${input}`;
    console.log(`gametype = ${input}`);
    outputvalue = "pls enter username for player 1";
  }

  // start of the game
  else if (gamestage == "start1") {
    player1name = `${input}`;
    gamestage = "start2";
    outputvalue = "pls enter username for player 2";
  } else if (gamestage == "start2") {
    player2name = `${input}`;
    gamestage = "turn1";
    outputvalue = `${player1name}, pls click submit to generate your number`;

    //player 1 will generate his numbers and arrange the order
  } else if (gamestage == "turn1") {
    playerArray = playerNumber();
    console.log(playerArray);
    if (gametype == "lowest") {
      var numberGenerated = chooseOrderOfNumberAutoLow();
    } else if (gametype == "highest") {
      var numberGenerated = chooseOrderOfNumberAutoHigh();
    }

    player1number = numberGenerated;
    outputvalue = player1number + ". it is now the next player's turn! click 'submit' to continue";
    gamestage = "welcomeplayer2";
  } else if (gamestage == "welcomeplayer2") {
    gamestage = "turn2";

    outputvalue = `${player2name}, pls click submit to generate your number`;
    // player 2 generate numbers and choose the order of  the numbers
  } else if (gamestage == "turn2") {
    playerArray = playerNumber();
    console.log(playerArray);
    if (gametype == "lowest") {
      var numberGenerated = chooseOrderOfNumberAutoLow();
    } else if (gametype == "highest") {
      var numberGenerated = chooseOrderOfNumberAutoHigh();
    }
    player2number = numberGenerated;
    outputvalue = player2number + '. click "submit" to compare the 2 numbers';

    gamestage = "comparison";
    // compare the 2 numbers generated and find the winner
  } else if (gamestage == "comparison") {
    playcount = playcount + 1;
    if (gametype == "highest") {
      var whoWins = CompareTheNumbersHigh(player1number, player2number);
    } else if (gametype == "lowest") {
      var whoWins = CompareTheNumbersLow(player1number, player2number);
    }

    var leaderboard = makeLeaderboard(player1score, player2score);
    outputvalue = whoWins + `${player1name}'s number is ${player1number} while ${player2name}'s number is ${player2number}.` + leaderboard + `<br>click submit to play again starting from ${player1name}'s turn`;
    gamestage = "turn1";
  }

  return outputvalue;
};

var diceRoll = function () {
  var number = Math.random() * 6;
  var integer = Math.ceil(number);
  return integer;
};
var playerNumber = function () {
  var number1 = `${diceRoll()}`;
  var number2 = `${diceRoll()}`;
  var numArray = [number1, number2];
  return numArray;
};
var chooseOrderOfNumberAutoLow = function () {
  if (playerArray[0] < playerArray[1]) {
    numberGenerated = playerArray[0] + playerArray[1];
  } else if (playerArray[0] > playerArray[1]) {
    numberGenerated = playerArray[1] + playerArray[0];
  }
  return numberGenerated;
};
var chooseOrderOfNumberAutoHigh = function () {
  if (playerArray[0] > playerArray[1]) {
    numberGenerated = playerArray[0] + playerArray[1];
  } else if (playerArray[0] < playerArray[1]) {
    numberGenerated = playerArray[1] + playerArray[0];
  }
  return numberGenerated;
};
var CompareTheNumbersHigh = function (player1number, player2number) {
  if (player1number > player2number) {
    player1score = player1score + 1;
    return `${player1name} is the winner! `;
  }
  if (player1number < player2number) {
    player2score = player2score + 1;
    return `${player2name} is the winner! `;
  }
  if (player1number == player2number) {
    return "It is a draw! ";
  }
};
var CompareTheNumbersLow = function (player1number, player2number) {
  if (player1number < player2number) {
    player1score = player1score + 1;
    return `${player1name} is the winner! `;
  }
  if (player1number > player2number) {
    player2score = player2score + 1;
    return `${player2name} is the winner! `;
  }
  if (player1number == player2number) {
    return "It is a draw! ";
  }
};
var makeLeaderboard = function (player1score, player2score) {
  if (player1score > player2score) {
    var tableDisplay = `<br> ${player1name}'s score = ${player1score}<br>${player2name}' score = ${player2score}`;
  } else {
    var tableDisplay = `<br> ${player2name}'s score = ${player2score}<br>${player1name}' score = ${player1score}`;
  }
  return tableDisplay;
};
