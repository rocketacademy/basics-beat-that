//live server
//index of to find a position number of an input

//dice roll
//main function
//number of players --> store into var
//number of dices --> store into var
//name of players --> while statement --> store into array
//player 1 roll --> while statement number of dices --> store into array
//player 1 decision --> store into array
//player 2 roll etc --> if --> number of players = player number --> go next
//show all player rolls in order
//scoreboard --> mathmax --> index of --> parallel array --> array[index]
//new game

var gameMode = "number of dice rolls";
var numberOfPlayers = "";
var numberOfDices = "";
var playerNames = [];
var playerCount = 0;
var diceCount = 0;
var playerRoll1 = [];
var playerRoll2 = [];
var playerScore1 = [];
var playerScore2 = [];
var roundNumber1 = 0;
var roundNumber2 = 0;
var player1TotalScore = "";
var player2TotalScore = "";

//dice roll
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  console.log("dice roll: ", diceNumber);
  return diceNumber;
};

//main function
var main = function (input) {
  var myOutputValue = "";
  console.log("Game mode check:", gameMode);

  //number of players
  // if (gameMode == "number of players") {
  //   numberOfPlayers = input;
  //   console.log("number of players: ", numberOfPlayers);
  //   console.log("game mode: ", gameMode);
  //   console.log(isNaN(numberOfPlayers));

  //   if (isNaN(numberOfPlayers) || numberOfPlayers == "") {
  //     gameMode = "number of players";
  //     myOutputValue = "Kindly type in the number of players for the session!";
  //   } else {
  //     gameMode = "number of dice rolls";
  //     document.getElementById("p1").innerHTML =
  //       "Please input number of dice rolls.";
  //     myOutputValue = `Welcome! <br> There are ${numberOfPlayers} number of players for this session! <br> Please enter the number of dice rolls`;
  //   }

  //   return myOutputValue;
  // }

  //number of dice rolls

  if (input.toLowerCase() == "restart") {
    gameMode = "number of dice rolls";
    numberOfDices = "";
    playerNames = [];
    diceCount = 0;
    playerRoll1 = [];
    playerRoll2 = [];
    playerScore1 = [];
    playerScore2 = [];
    roundNumber1 = 0;
    roundNumber2 = 0;
    player1TotalScore = "";
    player2TotalScore = "";
    myOutputValue = `Game restarted! <br> Please enter the number of dice rolls!`;
    document.getElementById("p1").innerHTML =
      "Please enter the number of dice rolls!";
  } else if (gameMode == "number of dice rolls") {
    numberOfDices = input;
    console.log("number of dice rolls: ", numberOfDices);
    console.log("game mode: ", gameMode);
    console.log(isNaN(numberOfDices));

    if (isNaN(numberOfDices) || numberOfDices == "") {
      gameMode = "number of dice rolls";
      myOutputValue =
        "Kindly type in the number of dice rolls for the session!";
    } else {
      gameMode = "player 1 username";
      document.getElementById("p1").innerHTML =
        "Please enter the username for player 1.";
      myOutputValue = `Welcome! <br> There are ${numberOfDices} number of dices for this session! <br>
      Please enter the username for player 1!`;
    }

    return myOutputValue;
  }

  //player usernames
  else if (gameMode == "player 1 username") {
    if (input == "") {
      myOutputValue = `Kindly type in the username for player 1.`;
      document.getElementById(
        "p1"
      ).innerHTML = `Please enter the username for player 1.`;
      gameMode = "player 1 username";
    } else {
      playerNames.push(input);
      myOutputValue = `Welcome player 1! <br>
    Please enter the username for player 2!`;
      document.getElementById(
        "p1"
      ).innerHTML = `Please enter the username for player 2.`;
      gameMode = "player 2 username";
    }
    return myOutputValue;
  }
  //player 2 username
  else if (gameMode == "player 2 username") {
    if (input == "") {
      myOutputValue = `Kindly type in the username for player 2.`;
      document.getElementById(
        "p1"
      ).innerHTML = `Please enter the username for player 2.`;
      gameMode = "player 2 username";
    } else {
      playerNames.push(input);
      myOutputValue = `Welcome player 2! <br>
    Please roll the dice for player 1!`;
      document.getElementById(
        "p1"
      ).innerHTML = `Please roll the dice for player 1!`;
      gameMode = "player 1";
    }
    return myOutputValue;
  }
  //
  else if (gameMode == "player 1") {
    playerCount = 0;
    myOutputValue = `${playerNames[playerCount]} has rolled:`;
    while (diceCount < numberOfDices) {
      var diceRoll = rollDice();
      playerRoll1.push(diceRoll);
      myOutputValue =
        myOutputValue +
        `<br> ${playerRoll1[diceCount]} for dice number ${diceCount + 1}.`;
      diceCount = diceCount + 1;
    }

    if (diceCount == numberOfDices) {
      playerRoll1.sort(function (a, b) {
        return b - a;
      });
      playerScore1.push(parseInt(playerRoll1.join("")));
      myOutputValue =
        myOutputValue +
        `<br> <br> Your number is ${playerScore1[roundNumber1]}.`;
    }
    diceCount = 0;
    roundNumber1 = roundNumber1 + 1;
    myOutputValue =
      myOutputValue + `<br> Click again to roll the dice for player 2!`;
    gameMode = "player 2";
    return myOutputValue;
  }

  //player 2
  else if (gameMode == "player 2") {
    playerCount = 1;
    myOutputValue = `${playerNames[playerCount]} has rolled:`;
    while (diceCount < numberOfDices) {
      var diceRoll2 = rollDice();
      playerRoll2.push(diceRoll2);
      myOutputValue =
        myOutputValue +
        `<br> ${playerRoll2[diceCount]} for dice number ${diceCount + 1}.`;
      diceCount = diceCount + 1;
    }

    if (diceCount == numberOfDices) {
      playerRoll2.sort(function (a, b) {
        return b - a;
      });
      playerScore2.push(parseInt(playerRoll2.join("")));
      myOutputValue =
        myOutputValue +
        `<br> <br> Your number is ${playerScore2[roundNumber2]}.`;
    }
    diceCount = 0;
    roundNumber2 = roundNumber2 + 1;
    myOutputValue = myOutputValue + `<br> Click again to show the score!`;
    gameMode = "score";
    return myOutputValue;
  }

  //score
  else if ((gameMode = "score")) {
    player1TotalScore = playerScore1.reduce((a, b) => a + b, 0);
    player2TotalScore = playerScore2.reduce((a, b) => a + b, 0);
    console.log(player1TotalScore);
    console.log(player2TotalScore);
    if (parseInt(player1TotalScore) > parseInt(player2TotalScore)) {
      myOutputValue = `${playerNames[0]} has a total score of ${player1TotalScore}. <br> ${playerNames[1]} has a total score of ${player2TotalScore}. <br> ${playerNames[0]} wins!`;
      gameMode = "player 1";
      playerRoll1 = [];
      playerRoll2 = [];
    } else if (parseInt(player1TotalScore) == parseInt(player2TotalScore)) {
      myOutputValue = `${playerNames[0]} has a total score of ${player1TotalScore}. <br> ${playerNames[1]} has a total score of ${player2TotalScore}. <br> It's a draw!`;
      gameMode = "player 1";
      playerRoll1 = [];
      playerRoll2 = [];
    } else if (parseInt(player1TotalScore) < parseInt(player2TotalScore)) {
      myOutputValue = `${playerNames[0]} has a total score of ${player1TotalScore}. <br> ${playerNames[1]} has a total score of ${player2TotalScore}. <br> ${playerNames[1]} wins!`;
      gameMode = "player 1";
      playerRoll1 = [];
      playerRoll2 = [];
    }
  }

  return myOutputValue;
};
