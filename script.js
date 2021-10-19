//global variable
var player1 = `Player 1`;
var player2 = `Player 2`;
var player1Dice1 = 0;
var player1Dice2 = 0;
var player2Dice1 = 0;
var player2Dice2 = 0;
var currentPlayer = player1;
var player1Num = 0;
var player2Num = 0;
var winner = ``;
var compareResult = ``;
var gameStage = 1;
var player1Score = 0;
var player2Score = 0;
var leadingPlayer = ``;
var losingPlayer = ``;
var leadingScore = 0;
var losingScore = 0;
var gameMode = 0;
var standard = `Standard Beat That! Game`;
var reverse = `Reverse Beat That! Game`;
var currentGame = ``;

// Initial game prompt
{
  var color = "green";
  document.write(
    `<CENTER><FONT FACE=ARIAdL,VERDANA COLOR=${color} SIZE=5>Welcome! ${player1} and ${player2}.<br>Click Submit to Start Playing.</FONT><HR NOSHADE WIDTH=450></CENTER><P>`
  );
}

// generate random dice number from 1 to 6
var generateRandomDiceNumber = function () {
  var randomDiceNumber = Math.floor(Math.random() * 6) + 1;
  console.log(`randomDiceNumber =${randomDiceNumber}`);
  return randomDiceNumber;
};

// Player rolls Dice
var playerRollDice = function () {
  if (currentPlayer == player1) {
    player1Dice1 = generateRandomDiceNumber();
    player1Dice2 = generateRandomDiceNumber();
    return `${player1}.<br>Your 1st Dice = ${player1Dice1}<br> Your 2nd Dice = ${player1Dice2}.<br><br>Enter '1' or '2' to choose the 1st or 2nd Dice  as your 1st Numeral respectively.`;
  }
  if (currentPlayer == player2) {
    player2Dice1 = generateRandomDiceNumber();
    player2Dice2 = generateRandomDiceNumber();
    return `${player2}.<br>Your 1st Dice = ${player2Dice1}<br> Your 2nd Dice = ${player2Dice2}.<br><br>Enter '1' or '2' to choose the 1st or 2nd Dice  as your 1st Numeral respectively.`;
  }
};

// Player choose Dice Order
var chooseDiceOrder = function (playerOrderChoice) {
  if (currentPlayer == player1 && playerOrderChoice == 1) {
    player1Num = Number("" + player1Dice1 + player1Dice2);
    console.log(player1Num);
    return player1Num;
  } else if (currentPlayer == player1 && playerOrderChoice == 2) {
    player1Num = Number("" + player1Dice2 + player1Dice1);
    console.log(player1Num);
    return player1Num;
  }
  if (currentPlayer == player2 && playerOrderChoice == 1) {
    player2Num = Number("" + player2Dice1 + player2Dice2);
    console.log(player2Num);
    return player2Num;
  } else if (currentPlayer == player2 && playerOrderChoice == 2) {
    player2Num = Number("" + player2Dice2 + player2Dice1);
    console.log(player2Num);
    return player2Num;
  }
};

// Compare Player 1 and Player 2 Num
var comparePlayerNum = function () {
  if (gameMode == 1) {
    if (player1Num > player2Num) {
      winner = player1;
    } else if (player1Num < player2Num) {
      winner = player2;
    }
  }
  if (gameMode == 2) {
    if (player1Num > player2Num) {
      winner = player2;
    } else if (player1Num < player2Num) {
      winner = player1;
    }
  }
  return winner;
};

// check game selected
var checkGameSelected = function () {
  if (gameMode == 1) {
    currentGame = standard;
  }
  if (gameMode == 2) {
    currentGame = reverse;
  }
  return currentGame;
};

// leaderboard
var showCurrentLeader = function () {
  if (gameMode == 1) {
    if (player1Score > player2Score) {
      leadingPlayer = player1;
      leadingScore = player1Score;
      losingPlayer = player2;
      losingScore = player2Score;
    } else if (player2Score > player1Score) {
      leadingPlayer = player2;
      leadingScore = player2Score;
      losingPlayer = player1;
      losingScore = player1Score;
    }
  }
  if (gameMode == 2) {
    if (player1Score > player2Score) {
      leadingPlayer = player2;
      leadingScore = player2Score;
      losingPlayer = player1;
      losingScore = player1Score;
    } else if (player2Score > player1Score) {
      leadingPlayer = player1;
      leadingScore = player1Score;
      losingPlayer = player2;
      losingScore = player2Score;
    }
  }
  return `<br>---Leaderboard---<br>${leadingPlayer} is leading. Score is ${leadingScore}<br>${losingPlayer} is losing. Score is ${losingScore}`;
};

// switch game mode
var resetGameMode = function (userInput) {
  if (userInput == `x`) {
    // reset game mode
    gameMode = 0;
    // reset game stage
    gameStage = 1;
    // switch player
    currentPlayer = player1;
    return gameMode;
  }
};

var main = function (input) {
  var myOutputValue = ``;
  if (input == `x`) {
    // reset game mode
    gameMode = 0;
    // reset game stage
    gameStage = 1;
    // switch player
    currentPlayer = player1;
    // reset scores
    player1Score = 0;
    player2Score = 0;
    return `Game reset, please choose game mode to start<br>Enter '1' for ${standard}<br>Enter '2' for ${reverse} Game`;
  } else if (gameMode == 0) {
    // check if input is a number
    if (Number.isNaN(Number(input)) == true) {
      return `Enter '1' for ${standard}<br>Enter '2' for ${reverse} Game`;
    }
    // check if input is the number 1 or 2.
    else if (input != 1 && input != 2) {
      return `Enter '1' for ${standard}<br>Enter '2' for ${reverse} Game`;
    } else if (input == 1 || input == 2) {
      gameMode = Number(input);
      console.log(gameMode);
      return `${checkGameSelected()} is selected, click submit to start playing`;
    }
  } else if (gameMode == 1 || gameMode == 2) {
    if (gameStage == 1) {
      // swtich game stage
      gameStage = 2;
      return playerRollDice();
    }
    if (gameStage == 2) {
      // check if input is a number
      if (Number.isNaN(Number(input)) == true) {
        return `Please enter the number '1' or '2'.`;
      }
      // check if input is the number 1 or 2.
      else if (input != 1 && input != 2) {
        return `Sorry Please enter the number '1' or '2'.`;
      } else if (input == 1 || input == 2) {
        player1Num = chooseDiceOrder(input);
        console.log(`player 1 number is ${player1Num}`);
        // swtich game stage
        gameStage = 3;
        // switch player
        currentPlayer = player2;
        // Add Player 1 Score
        player1Score += player1Num;
        console.log(`player1Score = ${player1Score}`);
        return `Player 1 number is ${player1Num}.<br>Player 2 click submit to play.`;
      }
    }
    if (gameStage == 3) {
      // swtich game stage
      gameStage = 4;
      return playerRollDice();
    }
    if (gameStage == 4) {
      // check if input is a number
      if (Number.isNaN(Number(input)) == true) {
        return `Please enter the number '1' or '2'.`;
      }
      // check if input is the number 1 or 2.
      else if (input != 1 && input != 2) {
        return `Sorry Please enter the number '1' or '2'.`;
      } else if (input == 1 || input == 2) {
        player2Num = chooseDiceOrder(input);
        console.log(`player 2 number is ${player2Num}`);
        // swtich game stage
        gameStage = 5;
        // Add Player 1 Score
        player2Score += player2Num;
        console.log(`player2Score = ${player2Score}`);
        return `Player 2 number is ${player2Num}.<br>Player 2 click submit to find the winner.`;
      }
    }
    if (gameStage == 5 && player1Num == player2Num) {
      // reset game stage
      gameStage = 1;
      // switch player
      currentPlayer = player1;
      return `It's a draw!<br>Player 1 number is ${player1Num}<br>Player 2 number is ${player2Num}<br><br>click submit to start playing again<br>${showCurrentLeader()}`;
    } else if (gameStage == 5 && player1Num != player2Num) {
      winner = comparePlayerNum();
      // reset game stage
      gameStage = 1;
      // switch player
      currentPlayer = player1;
      return `Winner is ${winner}<br>Player 1 number is ${player1Num}<br>Player 2 number is ${player2Num}<br><br>click submit to start playing again<br>${showCurrentLeader()}`;
    }
  }
  return myOutputValue;
};
