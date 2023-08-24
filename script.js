//Global Variable
var userName = [];
var userNumber = 0;
var currentGameMode = 0; //Game Mode 0 for not in game , 1 for , 2 for

var userAdded = function (user) {
  userNumber += 1;
  userName.push(user);
  return `${
    userName[userNumber - 1]
  }, welcome to the game. Here is ${userNumber} number of player now!`;
  //Add Player List*******
  //Limit the player number******
};

var gameModeSelect = function (gameMode) {};

var main = function (input) {
  return;
};
