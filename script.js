//ORIGINAL GAME INSTRUCTIONS -
//There are 2 players and they take turns to play
//When 1 player clicks submit, 2 dices roll at once.
//The player can combine these dice numbers to the order they like.
//I specify how they order
//The higher combo wins

//EG. GREYBOX OUTPUT1: Welcome Player 1 / You rolled 3 for Dice 1 and  6 for Dice 2. / Choose the order of your dice
//EG. GREYBOX OUTPUT2:
//player 1, you chose Dice 2 first. / Your combo number is 63. / It is now Player 2 's turn to roll the dice.

//GAME MODIFICATION TO PERSONALISE AND MAKE GAME MORE FUN!!
//ADDED USERNAMES INPUT FOR PLAYER1 AND PLAYER2 (Lines42  - 74)
//HIDE THE DICE VALUES UNTIL ORDER OF DICE IS CHOSEN.
//PLAYERS ARE GIVEN A RUNNING LIST OF THEIR RANDOM DICEROLLS
///////////////////////////////////////////////////////////////////
var currentGameMode = "player1 name input";
var playerName1 = "";
var playerName2 = "";
var playerName1Dices = [];
var playerName2Dices = [];
var playerName1DicesLog = [];
var playerName2DicesLog = [];
var playerName1Order = "";
var playerName2Order = "";

//var playerName1Counter = 0;
//var playerName2Counter = 0;

///////////////////////////////////////////////////////////////////
var rollDice = function () {
  var randomDice1 = Math.floor(Math.random() * (6 - 1 + 1) + 1);
  return randomDice1;
};

///////////////////////////////////////////////////////////////////

var main = function (input) {
  var myOutputValue = "";

  //Player1 enters name
  if (currentGameMode == "player1 name input") {
    myOutputValue = "Hello Player1, please enter your name";
    currentGameMode = "player2 name input";
    return myOutputValue;
  }
  if (currentGameMode == "player2 name input") {
    playerName1 = input;
    myOutputValue =
      "Hello " +
      input +
      "!" +
      "<br>" +
      " It's now Player2's turn to enter his/her name!";
    currentGameMode = "The Game Starts";
    return myOutputValue;
  }

  //Player2 enters name
  if (currentGameMode == "The Game Starts") {
    playerName2 = input;
    myOutputValue =
      "Hello " +
      input +
      "!" +
      "<br>" +
      " It's now " +
      playerName1 +
      "'s turn to start the dice rolling! 2 secret dices will roll with each play! " +
      "<br>" +
      playerName1 +
      "  , Please enter 1,2 for original order or 2,1 for reverse order for the secret dice rolls and click `submit` once";
    currentGameMode = "Dice Roll Player1";
    return myOutputValue;
  }

  //The Game starts after both players identify themselves.

  if (currentGameMode == "Dice Roll Player1") {
    var playerName1RandomDice1 = rollDice();
    var playerName1RandomDice2 = rollDice();
    playerName1Dices = [playerName1RandomDice1, playerName1RandomDice2];
    //.push to array for Player1 to contain all his dices' numbers.
    playerName1DicesLog.push(playerName1Dices);

    var playerName1DiceChoose = input;
    //player1 did not enter 1,2 or 2,1 order (orignal vs reverse)
    if (playerName1DiceChoose != "1,2" && playerName1DiceChoose != "2,1") {
      myOutputValue =
        playerName1 +
        ", please input ordering of 1,2 or 2,1 and click `submit` once.";
    }

    //player1 chose original order
    if (playerName1DiceChoose == "1,2") {
      // Concatenate the numbers and number function
      playerName1Order = Number(
        "" + playerName1RandomDice1 + playerName1RandomDice2
      );
      myOutputValue =
        "Your diceroll yielded " +
        playerName1Dices[0] +
        " and " +
        playerName1Dices[1] +
        ". You have ordered it to become " +
        playerName1Order +
        ". Now, it's " +
        playerName2 +
        "'s turn to play. Please enter 1,2 for original order or 2,1 for reverse order for the secret dice rolls and click `submit` once" +
        "<br>" +
        " And...See who wins with the highest concatenated dice numbers!";

      currentGameMode = "Dice Roll Player2";
    }
    //Player1 chose reverse order
    else if (playerName1DiceChoose == "2,1") {
      // Concatenate the numbers and number function
      playerName1Order = Number(
        "" + playerName1RandomDice2 + playerName1RandomDice1
      );
      myOutputValue =
        "Your diceroll yielded " +
        playerName1Dices[0] +
        " and " +
        playerName1Dices[1] +
        ". You have ordered it to become " +
        playerName1Order +
        ". Now, it's " +
        playerName2 +
        "'s turn to play. Please enter 1,2 for original order or 2,1 for reverse order for the secret dice rolls and click `submit` once " +
        "<br>" +
        " And...See who wins with the highest concatenated dice numbers!";

      currentGameMode = "Dice Roll Player2";
    }
    return myOutputValue;
  }

  //change to player2 mode to play
  if (currentGameMode == "Dice Roll Player2") {
    var playerName2RandomDice1 = rollDice();
    var playerName2RandomDice2 = rollDice();
    playerName2Dices = [playerName2RandomDice1, playerName2RandomDice2];
    //.push to array for Player1 to contain all his dices' numbers.
    playerName2DicesLog.push(playerName2Dices);

    var playerName2DiceChoose = input;
    //player1 did not enter 1,2 or 2,1 order (orignal vs reverse)
    if (playerName2DiceChoose != "1,2" && playerName2DiceChoose != "2,1") {
      myOutputValue =
        playerName2 +
        ", your dices have rolled. Now, please input ordering of 1,2 or 2,1 and click `submit`.";
    }
    //player2 chose original order
    if (playerName2DiceChoose == "1,2") {
      // Concatenate the numbers and number function
      playerName2Order = Number(
        "" + playerName2RandomDice1 + playerName2RandomDice2
      );
      myOutputValue =
        "Your diceroll yielded " +
        playerName2Dices[0] +
        " and " +
        playerName2Dices[1] +
        ". You have ordered it to become " +
        playerName2Order +
        "<br>" +
        " And... " +
        playerName1 +
        " has the combo-number " +
        playerName1Order +
        " . " +
        playerName2 +
        " has the combo-number " +
        playerName2Order +
        " .";

      currentGameMode = "who wins";
    }
    //player2 chose reverse order
    if (playerName2DiceChoose == "2,1") {
      // Concatenate the numbers and number function
      playerName2Order = Number(
        "" + playerName2RandomDice2 + playerName2RandomDice1
      );
      myOutputValue =
        "Your diceroll yielded " +
        playerName2Dices[0] +
        " and " +
        playerName2Dices[1] +
        ". You have ordered it to become " +
        playerName2Order +
        "<br>" +
        " And... " +
        playerName1 +
        " has the combo-number " +
        playerName1Order +
        " . " +
        playerName2 +
        " has the combo-number " +
        playerName2Order +
        " .";
      currentGameMode = "who wins";
    }
    //currentGameMode = "who wins";
    return myOutputValue;
  }
  //change mode to declare winner
  //player1 wins
  if (currentGameMode == "who wins") {
    if (playerName1Order > playerName2Order) {
      myOutputValue =
        playerName1 +
        " has won this round! Here's a list of your dicerolls so far :  " +
        playerName1DicesLog +
        " .";
      //the game restarts
      currentGameMode = "Dice Roll Player1";
    }
    //player2 wins
    else if (playerName1Order < playerName2Order) {
      myOutputValue =
        playerName2 +
        " has won this round! Here's a list of your dicerolls so far :  " +
        playerName2DicesLog +
        " .";

      //the game restarts
      currentGameMode = "Dice Roll Player1";
    } else {
      myOutputValue =
        "It's a tie! Such a rare occurrence, Let's go for a beer!";
      //the game restarts
      currentGameMode = "Dice Roll Player1";
    }
  }
  return myOutputValue;
};
