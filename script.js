var gameMode = "NA";
var playerTurn = "NA";
var sequenceToggle = "OFF";
var player1 = 0;
var player2 = 0;
var player1Storage = 0;
var player2Storage = 0;
var player1Name = "Player1Name";
var player2Name = "Player2Name";
var dice1 = 0;
var dice2 = 0;
var dice3 = 0;
var dice4 = 0;

// Entry of Player's Name
var enterPlayerName = function (input) {
  playerName = input;
  return playerName;
};

//Dice number generator
var randomDiceRoll = function () {
  var randomDiceRoll = Math.ceil(Math.random() * 6);
  return randomDiceRoll;
};

//select sequence
var selectSequence1 = function (dice1, dice2) {
  var selectSequence1 = dice1 + "" + dice2;
  return Number(selectSequence1);
};
var selectSequence2 = function (dice2, dice1) {
  var selectSequence2 = dice2 + "" + dice1;
  return Number(selectSequence2);
};

var main = function (input) {
  // Enter Player 1 Name
  if (player1Name == "Player1Name") {
    var playerName = enterPlayerName(input);
    player1Name = playerName;
    return player1Name + " has joined the game";
  }
  // Enter Player 2 Name
  if (player2Name == "Player2Name") {
    var playerName = enterPlayerName(input);
    player2Name = playerName;
    return player2Name + " has joined the game";
  }
  // Input validation for game modes : Normal, Lowest Combined, Auto Generate
  if (
    input == "Normal" ||
    input == "Lowest" ||
    input == "Auto" ||
    playerTurn == "End"
  ) {
    gameMode = input;
    playerTurn = "Player 1";
    return (myOutputValue = input + " has been selected. Lets begin!");
  } else myOutputValue = "Choose only Normal, Lowest or Auto~";

  if (gameMode == "Normal") {
    if (input == "End") {
      playerTurn = "End";
      return (myOutputValue = "Whats your next game? Normal/Lowest/Auto");
    }
    // player1 turn
    if (playerTurn == "Player 1") {
      var diceRoll1 = randomDiceRoll();
      var diceRoll2 = randomDiceRoll();
      dice1 = diceRoll1; // storing player 1 numbers into global
      dice2 = diceRoll2;
      myOutputValue =
        player1Name +
        " has rolled " +
        dice1 +
        " and " +
        dice2 +
        ". <br> Select the sequence.";
      sequenceToggle = "ON";
      playerTurn = "Player 1 Sequence Toggle";
      return myOutputValue;
    }
    // player 1 selection
    if (sequenceToggle == "ON" && playerTurn == "Player 1 Sequence Toggle") {
      if (input == "1") {
        var sequence1 = selectSequence1(dice1, dice2);
        player1Storage = sequence1;
        player1 = player1 + player1Storage;
        sequenceToggle = "OFF";
        playerTurn = "Player 2";
      }
      if (input == "2") {
        var sequence2 = selectSequence2(dice2, dice1);
        player1Storage = sequence2;
        player1 = player1 + player1Storage;
        sequenceToggle = "OFF";
        playerTurn = "Player 2";
      }
    }
    // player2 turn
    if (playerTurn == "Player 2") {
      var diceRoll1 = randomDiceRoll();
      var diceRoll2 = randomDiceRoll();
      dice1 = diceRoll1; // storing player 2 numbers into global
      dice2 = diceRoll2;
      myOutputValue =
        player2Name +
        " has rolled " +
        dice1 +
        " and " +
        dice2 +
        ". <br> Select the sequence.";
      sequenceToggle = "ON";
      playerTurn = "Player 2 Sequence Toggle";
      return myOutputValue;
    }
    // player 2 selection
    if (sequenceToggle == "ON" && playerTurn == "Player 2 Sequence Toggle") {
      if (input == "1") {
        var sequence1 = selectSequence1(dice1, dice2);
        player2Storage = sequence1;
        player2 = player2 + player2Storage;
        sequenceToggle = "OFF";
        playerTurn = "Player 1";
      }
      if (input == "2") {
        var sequence2 = selectSequence2(dice2, dice1);
        player2Storage = sequence2;
        player2 = player2 + player2Storage;
        sequenceToggle = "OFF";
        playerTurn = "Player 1";
      }
    }
    // compare winners and message
    var message = "";
    if (player1 == player2) {
      message = "Score is tied now";
    }
    if (player1 > player2) {
      message = player1Name + " is leading!";
    }
    if (player2 > player1) {
      message = player2Name + " is leading!";
    }
    return (
      "Current Game Mode: " +
      gameMode +
      "<br>" +
      message +
      "<br>" +
      player1Name +
      " score now is " +
      player1 +
      "<br>" +
      player2Name +
      " score now is " +
      player2 +
      "<br> Next Round."
    );
  }
  if (gameMode == "Lowest") {
    if (input == "End") {
      playerTurn = "End";
      return (myOutputValue = "Whats your next game? Normal/Lowest/Auto");
    }
    // player1 turn
    if (playerTurn == "Player 1") {
      var diceRoll1 = randomDiceRoll();
      var diceRoll2 = randomDiceRoll();
      dice1 = diceRoll1; // storing player 1 numbers into global
      dice2 = diceRoll2;
      myOutputValue =
        player1Name +
        " has rolled " +
        dice1 +
        " and " +
        dice2 +
        ". <br> Select the sequence.";
      sequenceToggle = "ON";
      playerTurn = "Player 1 Sequence Toggle";
      return myOutputValue;
    }
    // player 1 selection
    if (sequenceToggle == "ON" && playerTurn == "Player 1 Sequence Toggle") {
      if (input == "1") {
        var sequence1 = selectSequence1(dice1, dice2);
        player1Storage = sequence1;
        player1 = player1 + player1Storage;
        sequenceToggle = "OFF";
        playerTurn = "Player 2";
      }
      if (input == "2") {
        var sequence2 = selectSequence2(dice2, dice1);
        player1Storage = sequence2;
        player1 = player1 + player1Storage;
        sequenceToggle = "OFF";
        playerTurn = "Player 2";
      }
    }
    // player2 turn
    if (playerTurn == "Player 2") {
      var diceRoll1 = randomDiceRoll();
      var diceRoll2 = randomDiceRoll();
      dice1 = diceRoll1; // storing player 2 numbers into global
      dice2 = diceRoll2;
      myOutputValue =
        player2Name +
        " has rolled " +
        dice1 +
        " and " +
        dice2 +
        ". <br> Select the sequence.";
      sequenceToggle = "ON";
      playerTurn = "Player 2 Sequence Toggle";
      return myOutputValue;
    }
    // player 2 selection
    if (sequenceToggle == "ON" && playerTurn == "Player 2 Sequence Toggle") {
      if (input == "1") {
        var sequence1 = selectSequence1(dice1, dice2);
        player2Storage = sequence1;
        player2 = player2 + player2Storage;
        sequenceToggle = "OFF";
        playerTurn = "Player 1";
      }
      if (input == "2") {
        var sequence2 = selectSequence2(dice2, dice1);
        player2Storage = sequence2;
        player2 = player2 + player2Storage;
        sequenceToggle = "OFF";
        playerTurn = "Player 1";
      }
    }
    // compare winners and message
    var message = "";
    if (player1 == player2) {
      message = "Score is tied now";
    }
    if (player1 < player2) {
      message = player1Name + " is leading the losing race!";
    }
    if (player2 < player1) {
      message = player2Name + " is leading the losing race!";
    }
    return (
      "Current Game Mode: " +
      gameMode +
      "<br>" +
      message +
      "<br>" +
      player1Name +
      " score now is " +
      player1 +
      "<br>" +
      player2Name +
      " score now is " +
      player2 +
      "<br> Next Round."
    );
  }
  if (gameMode == "Auto") {
    if (input == "End") {
      playerTurn = "End";
      return (myOutputValue = "Whats your next game? Normal/Lowest/Auto");
    }
    // player1 turn
    if (playerTurn == "Player 1") {
      var diceRoll1 = randomDiceRoll();
      var diceRoll2 = randomDiceRoll();
      dice1 = diceRoll1; // storing player 1 numbers into global
      dice2 = diceRoll2;
      if (dice1 > dice2) {
        var sequence1 = selectSequence1(dice1, dice2);
        player1Storage = sequence1;
        player1 = player1 + player1Storage;
      } else {
        var sequence2 = selectSequence2(dice2, dice1);
        player1Storage = sequence2;
        player1 = player1 + player1Storage;
      }
      player1Statement =
        player1Name +
        " has rolled " +
        dice1 +
        " and " +
        dice2 +
        ".<br>" +
        player1Name +
        " current total score is " +
        player1;
      var diceRoll3 = randomDiceRoll();
      var diceRoll4 = randomDiceRoll();
      dice3 = diceRoll3; // storing player 2 numbers into global
      dice4 = diceRoll4;
      if (dice3 > dice4) {
        var sequence3 = selectSequence1(dice3, dice4);
        player2Storage = sequence3;
        player2 = player2 + player2Storage;
      } else {
        var sequence4 = selectSequence2(dice4, dice3);
        player2Storage = sequence4;
        player2 = player2 + player2Storage;
      }
      player2Statement =
        player2Name +
        " has rolled " +
        dice3 +
        " and " +
        dice4 +
        ".<br>" +
        player2Name +
        " current total score is " +
        player2;
    }
    if (player1 == player2) {
      message = "Score is tied now";
    }
    if (player1 > player2) {
      message = player1Name + " is leading!";
    }
    if (player2 > player1) {
      message = player2Name + " is leading!";
    }
    return (myOutputValue =
      "Current Game Mode: " +
      gameMode +
      "<br>" +
      player1Statement +
      ". <br>" +
      player2Statement +
      ". <br>" +
      message);
  }
  return myOutputValue;
};
