//Global Variable
var userName = [];
var userScore = [];
var userNumber = 0;
var currentGameMode = 0;

var userAdded = function (user) {
  userNumber += 1;
  userName.push(user);
  return `${
    userName[userNumber - 1]
  }, welcome to the game. Here is ${userNumber} player now!`;
  //Add Player List*******
  //Limit the player number******
};

var gameModeSelect = function (gameMode) {
  currentGameMode = gameMode;
  return `You choose ${currentGameMode}!Nice choice!<br>Let's start the game by pressing the play button!🤩🤩🤩`;
};

var main = function () {
  if (userNumber < 2) {
    return "Here is not enough player to start the game.🥲<br> Please find more friend to play the game with you.";
  }

  if (currentGameMode == "") {
    return "You have not choose the game mode yet.🤨<br>Please choose what game mode you want to play before starting the game.<br>The game mode rule is explained in the bottom of this website.😆😆";
  }

  return "Test";
};
