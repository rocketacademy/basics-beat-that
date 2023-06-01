var gameMode = "instructions";
var playerOneDiceResults = [];
var playerTwoDiceResults = [];
var playerOneScore = 0;
var playerTwoScore = 0;

var main = function (input) {
  var myOutputValue = "";

  if (gameMode == "instructions") {
    myOutputValue = `<center><strong>Welcome to BEAT-THAT-DICE game!</strong> 🎲 🎲 🎲<br><br>
      ---> Click the [submit] button below to start your game</center>
      <br><br>
      <small><hr></hr><br><br>
      <u>House rules</u>:<br><br>
      1. Two players will play the game in order.<br><br>
      2. When a player clicks [submit], they will roll 2 dice, for example, 3 and 6.<br><br>
      3. The player gets to choose the order of the dice. If they want a bigger number like 63, they have to choose the 2nd dice as the 1st number.<br><br>
      4. Similarly, the next player will roll.<br><br>
      5. After both players have rolled, the player with the higher number wins.<br><br></small>`;
    gameMode = "playerOne";
  } else if (gameMode == "playerOne") {
    playerOneDiceResults = [];
    for (var counter = 0; counter < 2; counter += 1) {
      playerOneDiceResults.push(diceRoll());
    }

    if (playerOneDiceResults[0] === playerOneDiceResults[1]) {
      // Reroll if both dice have the same number
      myOutputValue = `<center><br><br>
        <big>Hello Player 1!!</big><br><br>
        <small><br><br></small>
        Oops! You rolled the same number (${playerOneDiceResults[0]}) for both dice. Let's reroll.<br><br>
        Click [submit] to roll again.</center>`;
    } else {
      myOutputValue = `<center><br><br>
        <big>Hello Player 1!!</big><br><br>
        <small><br><br></small>
        For Dice 1 >>> you rolled ${playerOneDiceResults[0]}<br><br>
        For Dice 2 >>> you rolled ${playerOneDiceResults[1]}<br><br> 
        <br><br>
        <big><b>Select the first number of your score</b></big><br><br>
        <strong><big>Enter <big>1</big> (for ${playerOneDiceResults[0]})<br><br>
        OR<br><br>
        Enter <big>2</big> (for ${playerOneDiceResults[1]})</center></strong></big>
        <br><br>`;
      gameMode = "playerOneChoice";
    }
  } else if (gameMode == "playerOneChoice") {
    if (input == 1) {
      playerOneScore = playerOneDiceResults[0] * 10 + playerOneDiceResults[1];
    } else if (input == 2) {
      playerOneScore = playerOneDiceResults[1] * 10 + playerOneDiceResults[0];
    }
    myOutputValue = `<center><b>Player 1 made a choice 🎲: Dice ${input}</b><br><br>
      [Dice ${input}] will be used for the first number of the score, which is ${
      playerOneDiceResults[input - 1]
    }.<br><br>
      <br><br>
      <big><strong>Player 1 scored ${playerOneScore}.</strong></big><br><br>
      <br><br>
      It is now Player 2's turn...</center>`;
    gameMode = "playerTwo";
  } else if (gameMode == "playerTwo") {
    playerTwoDiceResults = [];
    for (var counter = 0; counter < 2; counter += 1) {
      playerTwoDiceResults.push(diceRoll());
    }

    if (playerTwoDiceResults[0] === playerTwoDiceResults[1]) {
      // Reroll if both dice have the same number
      myOutputValue = `<center><br><br>
        <big>Hello Player 2!!</big><br><br>
        <small><br><br></small>
        Oops! You rolled the same number (${playerTwoDiceResults[0]}) for both dice. Let's reroll.<br><br>
        Click [submit] to roll again.</center>`;
    } else {
      myOutputValue = `<center><br><br>
        <big>Hello Player 2!!</big><br><br>
        <small><br><br></small>
        For Dice 1 >>> you rolled ${playerTwoDiceResults[0]}<br><br>
        For Dice 2 >>> you rolled ${playerTwoDiceResults[1]}<br><br> 
        <br><br>
        <big><b>Select the first number of your score</b></big><br><br>
        <strong><big>Enter <big>1</big> (for ${playerTwoDiceResults[0]})<br><br>
        OR<br><br>
        Enter <big>2</big> (for ${playerTwoDiceResults[1]})</center></strong></big>
        <br><br>`;
      gameMode = "playerTwoChoice";
    }
  } else if (gameMode == "playerTwoChoice") {
    if (input == 1) {
      playerTwoScore = playerTwoDiceResults[0] * 10 + playerTwoDiceResults[1];
    } else if (input == 2) {
      playerTwoScore = playerTwoDiceResults[1] * 10 + playerTwoDiceResults[0];
    }
    if (playerOneScore > playerTwoScore) {
      myOutputValue = `<center><b>Player 2 made a choice 🎲: Dice ${input}</b><br><br>
        [Dice ${input}] will be used for the first number of the score, which is ${
        playerTwoDiceResults[input - 1]
      }.<br><br>
        <br><br>
        <big><strong>Player 2 scored ${playerTwoScore} against Player 1's ${playerOneScore}</strong></big><br><br>
        <br><br>
        The winner is.... Player One.<br><br>
        Congratulations Player One!</center>`;
    } else {
      myOutputValue = `<center><b>Player 2 made a choice 🎲: Dice ${input}</b><br><br>
        [Dice ${input}] will be used for the first number of the score, which is ${
        playerTwoDiceResults[input - 1]
      }.<br><br>
        <br><br>
        <big><strong>Player 2 scored ${playerTwoScore} against Player 1's ${playerOneScore}</strong></big><br><br>
        <br><br>
        The winner is.... Player Two.<br><br>
        Congratulations Player Two!</center>`;
    }
    myOutputValue += `<br><br><center>Hit [submit] to play again</center>`;
    gameMode = "restart";
  } else if (gameMode == "restart") {
    if (input.toLowerCase() === "") {
      // Reset the game for a new round
      playerOneDiceResults = [];
      playerTwoDiceResults = [];
      playerOneScore = 0;
      playerTwoScore = 0;
      gameMode = "instructions";
      return main(input);
    } else {
      myOutputValue = `<center>Invalid input. Please hit [submit] to play again</center>`;
    }
  }

  return myOutputValue;
};

var diceRoll = function () {
  return Math.floor(Math.random() * 6) + 1;
};
