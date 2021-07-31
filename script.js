//There are 2 players and they take turns to play
//When 1 player clicks submit, 2 dices roll at once.
//The player can combine these dice numbers to the order they like.
//I specify how they order
//The higher combo wins

//EG. GREYBOX OUTPUT1: Welcome Player 1 / You rolled 3 for Dice 1 and  6 for Dice 2. / Choose the order of your dice

//NEXT MODE

//EG. GREYBOX OUTPUT2:
//player 1, you chose Dice 2 first. / Your combo number is 63. / It is now Player 2 's turn to roll the dice.

//NEXT MODE

var currentGameMode = "player1 name input";
var playerName1 = "";
var playerName2 = "";
var playerName1Counter = 0;
var playerName2Counter = 0;
var playerName1DiceCombo = "";
var playerName2DiceCombo = "";
var playerName1Result = "";
var playerName2Result = "";

// var rollDice = function () {
//   var randomDice1 = Math.floor(Math.random() * (6 - 1 + 1) + 1);
//   var randomDice2 = Math.floor(Math.random() * (6 - 1 + 1) + 1);
//   var randomDiceNumbers = randomDice1 + " and " + randomDice2;
//   return randomDiceNumbers;
// };

var rollDice1 = function () {
  var randomDice1 = Math.floor(Math.random() * (6 - 1 + 1) + 1);
  return randomDice1;
};

var rollDice2 = function () {
  var randomDice2 = Math.floor(Math.random() * (6 - 1 + 1) + 1);
  return randomDice2;
};

var main = function (input) {
  var myOutputValue = "";

  if (currentGameMode == "player1 name input") {
    myOutputValue = "Hello Player1, please enter your name";
    currentGameMode = "player2 name input";
  } else if (currentGameMode == "player2 name input") {
    playerName1 = input;
    myOutputValue =
      "Hello " +
      input +
      "!" +
      "<br>" +
      " It's now Player2's turn to enter his/her name!";
    currentGameMode = "The Game Starts";
  } else if (currentGameMode == "The Game Starts") {
    //player1 has inputted his/her name so now its player2 turn
    playerName2 = input;

    myOutputValue =
      "Hello " +
      input +
      "!" +
      "<br>" +
      " It's now " +
      playerName1 +
      "'s turn to start the dice rolling! " +
      playerName1 +
      "  ,please click `submit` once to roll two dices at once - your diceroll will now yield 2 hidden random numbers (1-6). Please enter 1,2 for original order or 2,1 for reverse order and click `submit` once more";

    currentGameMode = "Dice Roll Player1";
  } else if (currentGameMode == "Dice Roll Player1") {
    var playerName1RandomDice1 = rollDice1();
    var playerName1RandomDice2 = rollDice2();
    var playerName1DiceCombo = input;

    if (playerName1DiceCombo != "1,2" && playerName1DiceCombo != "2,1") {
      myOutputValue = "Please input ordering of 1,2 or 2,1 and click `submit`.";
    } else if (playerName1DiceCombo == "1,2") {
      playerName1Result = Number(
        "" + playerName1RandomDice1 + playerName1RandomDice2
      );
      myOutputValue =
        "Your diceroll yielded " +
        playerName1RandomDice1 +
        " and " +
        playerName1RandomDice2 +
        ". You have ordered it to become " +
        playerName1Result +
        ". Now, it's " +
        playerName2 +
        "'s turn to play. " +
        "<br>" +
        " And...See who wins with the highest concatenated dice numbers!";
    } else if (playerName1DiceCombo == "2,1") {
      playerName1Result = Number(
        "" + playerName1RandomDice2 + playerName1RandomDice1
      );
      myOutputValue =
        "Your diceroll yielded " +
        playerName1RandomDice1 +
        " and " +
        playerName1RandomDice2 +
        ". You have ordered it to become " +
        playerName1Result +
        ". Now, it's " +
        playerName2 +
        "'s turn to play. " +
        "<br>" +
        " And...See who wins with the highest concatenated dice numbers!";

      //change to player2 mode to play
      currentGameMode = "Dice Roll Player2";
      console.log("running?");
    } else if (currentGameMode == "Dice Roll Player2") {
      console.log("run Diceroll player2");
      var playerName2RandomDice1 = rollDice1();
      var playerName2RandomDice2 = rollDice2();
      console.log(rollDice2());
      var playerName2DiceCombo = input;

      if (playerName2DiceCombo != "1,2" && playerName2DiceCombo != "2,1") {
        myOutputValue =
          "Please input ordering of 1,2 or 2,1 and click `submit`.";
      }
      if (playerName2DiceCombo == "1,2") {
        playerName2Result = Number(
          "" + playerName2RandomDice1 + playerName2RandomDice2
        );
        myOutputValue =
          "Your diceroll yielded " +
          playerName2RandomDice1 +
          " and " +
          playerName2RandomDice2 +
          ". You have ordered it to become " +
          playerName2Result +
          "<br>" +
          " And..." +
          playerName1 +
          " has the combo " +
          playerName1Result +
          playerName2 +
          " has the combo " +
          playerName2Result +
          " .";
      }
      if (playerName2DiceCombo == "2,1") {
        playerName2Result = Number(
          "" + playerName1RandomDice2 + playerName1RandomDice1
        );
        myOutputValue =
          "Your diceroll yielded " +
          playerName2RandomDice1 +
          " and " +
          playerName2RandomDice2 +
          ". You have ordered it to become " +
          playerName2Result +
          "<br>" +
          " And..." +
          playerName1 +
          " has the combo " +
          playerName1Result +
          playerName2 +
          " has the combo " +
          playerName2Result +
          " .";
      }
    }
  }

  return myOutputValue;
};
