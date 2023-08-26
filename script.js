//Global Variable
var user = [];
var userScore = [];
var currentGameMode = 0;

var userAdded = function (newUser) {
  user.push(newUser);
  return `${newUser}, welcome to the game. Here is ${user.length} player now!`;
  //Add Player List*******
  //Limit the player number******
};

var gameModeSelect = function (gameMode) {
  currentGameMode = gameMode;
  return `You choose ${currentGameMode}!Nice choice!<br>Let's start the game by pressing the play button!🤩🤩🤩`;
};

var main = function () {
  if (user.length < 2) {
    return "Here is not enough player to start the game.🥲<br> Please find more friend to play the game with you.";
  }

  if (currentGameMode == "") {
    return "You have not choose the game mode yet.🤨<br>Please choose what game mode you want to play before starting the game.<br>The game mode rule is explained in the bottom of this website.😆😆";
  }

  return "Test";
};
