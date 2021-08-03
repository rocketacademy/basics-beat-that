// keeps track of current gamemode
var currentGameMode = "game mode selection";

// keeps track of current player
var currentPlayer = "1";

// keeps track of each dice roll
var dice1 = "";
var dice2 = "";

// keeps track of each player's merged number
var player1Num = "";
var player2Num = "";

// keeps track of each player's score
var player1Score = 0;
var player2Score = 0;

var main = function (input) {
  var myOutputValue = "";
  var showLeaderboard = generateLeaderboard();

  // prompts/allows players to select a game mode
  if (input == "select game mode") {
    currentGameMode = "game mode selection";
    return "Please select a game mode: <i>Higher</i> or <i>Lower</i> <br> <br> In <i>Higher</i>, the player with the higher number combination wins. <br> In <i>Lower</i>, the player with the lower number combination wins.";
  } else if (currentGameMode == "game mode selection") {
    if (input != "Higher" && input != "Lower") {
      return "Game mode does not exist. Please input <i>Higher</i> or <i>Lower</i>.";
    } else {
      currentGameMode = input;
      return `Great! Let's play <i>${input}</i>. <br><br> To change game modes, input "select game mode" at any time. <br><br> Click the 'Submit' button to start playing!`;
    }
  }

  // game mode: highest number combination wins
  if (currentGameMode == "Higher") {
    dice1 = diceRoll();
    dice2 = diceRoll();

    // determines largest possible number
    var smallNum = "";
    var largeNum = "";
    if (dice1 <= dice2) {
      smallNum = dice1;
      largeNum = dice2;
    } else {
      smallNum = dice2;
      largeNum = dice1;
    }
    var mergedNumbers = Number(String(largeNum) + String(smallNum));

    // generates output message
    if (currentPlayer == 1) {
      player1Num = mergedNumbers;
      myOutputValue = `<b><u> Highest Number Wins </u></b> <br><br> Player One rolled a ${dice1} and a ${dice2}, which means that their number is ${mergedNumbers}. <br><br> Player One's number: ${player1Num} <br> Player Two's number: <br><br> Now, it's Player Two's turn to roll.`;
      currentPlayer = 2;
    } else {
      player2Num = mergedNumbers;
      myOutputValue = `<b><u> Highest Number Wins </u></b> <br><br> Player Two rolled a ${dice1} and a ${dice2}, which means that their number is ${mergedNumbers}. <br><br> Player One's number: ${player1Num} <br> Player Two's number: ${player2Num}`;
      currentPlayer = 1;

      // determines round winner
      if (player1Num > player2Num) {
        myOutputValue = myOutputValue + "<br><br> Player One wins this round!";
        player1Score = player1Score + player1Num;
      } else if (player1Num < player2Num) {
        myOutputValue = myOutputValue + "<br><br> Player Two wins this round!";
        player2Score = player2Score + player2Num;
      } else {
        myOutputValue =
          myOutputValue + "<br><br> It's a tie! No one wins this round.";
      }
      myOutputValue =
        myOutputValue + "<br><br> Onto the next round! It's Player One's turn.";
    }

    // shows player leaderboard
    return (myOutputValue = myOutputValue + showLeaderboard);
  }

  // game mode: lowest number wins
  if (currentGameMode == "Lower") {
    dice1 = diceRoll();
    dice2 = diceRoll();

    // determines smallest possible number
    var smallNum = "";
    var largeNum = "";
    if (dice1 <= dice2) {
      smallNum = dice1;
      largeNum = dice2;
    } else {
      smallNum = dice2;
      largeNum = dice1;
    }
    var mergedNumbers = Number(String(smallNum) + String(largeNum));

    // generates output message
    if (currentPlayer == 1) {
      player1Num = mergedNumbers;
      myOutputValue = `<b> Highest Number Wins </b> <br><br> You rolled a ${dice1} and a ${dice2}, which means that your number is ${mergedNumbers}. <br><br> Player One's number: ${player1Num} <br> Player Two's number: <br><br> Now, it's Player Two's turn to roll.`;
      currentPlayer = 2;
    } else {
      player2Num = mergedNumbers;
      myOutputValue = `<b> Highest Number Wins </b> <br><br> You rolled a ${dice1} and a ${dice2}, which means that your number is ${mergedNumbers}. <br><br> Player One's number: ${player1Num} <br> Player Two's number: ${player2Num}`;
      currentPlayer = 1;

      // determines round winner
      if (player1Num > player2Num) {
        myOutputValue = myOutputValue + "<br><br> Player Two wins this round!";
        player2Score = player2Score + player2Num;
      } else if (player1Num < player2Num) {
        myOutputValue = myOutputValue + "<br><br> Player One wins this round!";
        player1Score = player1Score + player1Num;
      } else {
        myOutputValue =
          myOutputValue + "<br><br> It's a tie! No one wins this round.";
      }
      myOutputValue =
        myOutputValue + "<br><br> Onto the next round! It's Player One's turn.";
    }

    // shows player leaderboard
    return (myOutputValue = myOutputValue + showLeaderboard);
  }
};

// generates a dice roll
var diceRoll = function () {
  return Math.floor(Math.random() * 6) + 1;
};

// generates player leaderboard
var generateLeaderboard = function () {
  var myOutputValues = "";
  if (player1Score >= player2Score) {
    return (
      myOutputValues +
      `<br><br> <b><u> Leaderboard </u></b> <br> <pre> #1  Player One               ${player1Score} <br> #2  Player Two               ${player2Score} </pre>`
    );
  }
  if (player1Score <= player2Score) {
    return (
      myOutputValues +
      `<br><br> <b><u> Leaderboard </u></b> <br> <pre> #1  Player Two               ${player2Score} <br> #2  Player One               ${player1Score}`
    );
  }
  return myOutputValues;
};
