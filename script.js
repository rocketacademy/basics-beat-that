// how the game works
// 2 players
// each player will roll 2 dice at random
// the player can pick the order of the dice, dice 1 or dice 2
// the highest number of between the two players win

// game mode
var currentGameMode = 'Player 1';
console.log(currentGameMode);

// number of players and two rolls per player
var playerOneFirstRoll;
var playerOneSecondRoll;
var playerTwoFirstRoll;
var playerTwoSecondRoll;
var playerOneFinal = '';
var playerTwoFinal = '';
var myOutputValue = '';

// dice roll from 1-6
var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber.toString(); };

var main = function (input) {
  myOutputValue = 'hello world';

  // player one start
  if (currentGameMode == 'Player 1') {
    // two dice for player one
    playerOneFirstRoll = diceRoll();
    playerOneSecondRoll = diceRoll();
    myOutputValue = 'Player 1,<br> you rolled ' + playerOneFirstRoll + ' and ' + playerOneSecondRoll + ' <br>Please choose the order of the dice';
    console.log(playerOneFirstRoll);
    console.log(playerOneSecondRoll);
    // once player one hit submit, gamemode will change to the player choice of dice
    currentGameMode = 'Player 1 choice';
    console.log(currentGameMode);
  }
  else if (currentGameMode == 'Player 1 choice') {
    if (input == '1') {
    // order if player one choose dice 1
      playerOneFinal = parseInt(playerOneFirstRoll + playerOneSecondRoll);
      console.log('Player 1 Final' + playerOneFinal);

      myOutputValue = 'Player 1, you chose dice ' + input + '.<br> Your number is ' + playerOneFinal + '<br>Press submit for Player 2 turn';

      currentGameMode = 'Player 2';
    }

    if (input == '2') {
    // order if player one choose dice 2
      playerOneFinal = parseInt(playerOneSecondRoll + playerOneFirstRoll);
      console.log('Player 1 Final' + playerOneFinal);

      myOutputValue = 'Player 1, you chose dice ' + input + '.<br> Your number is ' + playerOneFinal + '<br>Press submit for Player 2 turn';

      currentGameMode = 'Player 2';
    }
  }

  // start of player 2 turn once player 1 hit submit button

  else if (currentGameMode == 'Player 2') {
    playerTwoFirstRoll = diceRoll();
    playerTwoSecondRoll = diceRoll();
    myOutputValue = 'Player 2,<br> you rolled ' + playerTwoFirstRoll + ' and ' + playerTwoSecondRoll + ' <br>Please choose the order of the dice';
    console.log(playerTwoFirstRoll);
    console.log(playerTwoSecondRoll);

    // once player one hit submit, game mode will change to player choice of dice
    currentGameMode = 'Player 2 choice';
    console.log(currentGameMode);
  }
  else if (currentGameMode == 'Player 2 choice') {
    if (input == '1') {
    // order if player two choose dice 1
    // convert to number using parseInt
      playerTwoFinal = parseInt(playerTwoFirstRoll + playerTwoSecondRoll);

      // after player 2 final, compare player 1 final and player 2 final
      if (playerOneFinal > playerTwoFinal) {
        myOutputValue = 'Player 2 , you chose dice ' + input + '.<br> Your number is ' + playerTwoFinal + '. <br>Player 1 you chose ' + playerOneFinal + '. <br>Player 1 wins.';
      } else {
        myOutputValue = 'Player 2, you chose dice ' + input + '. <br> Your number is ' + playerTwoFinal + '. <br> Player 1 you chose ' + playerOneFinal + '. <br>Player 2 wins';
      }
    }

    // if player 2 choose dice 2
    else if (input == '2') {
      // convert to number using parseInt
      playerTwoFinal = parseInt(playerTwoSecondRoll + playerTwoFirstRoll);

      // after player 2 final, compare player 1 final and player 2 final
      if (playerOneFinal > playerTwoFinal) {
        myOutputValue = 'Player 2 , you chose dice ' + input + '.<br> Your number is ' + playerTwoFinal + '. <br>Player 1 you chose ' + playerOneFinal + '. <br>Player 1 wins.';
      } else {
        myOutputValue = 'Player 2, you chose dice ' + input + '. <br> Your number is ' + playerTwoFinal + '. <br> Player 1 you chose ' + playerOneFinal + '. <br>Player 2 wins';
      }
    }
  }

  return myOutputValue;
};
