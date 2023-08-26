//Global Variable
var user = [];
var userWinRecord = [];
var userAccumulatedScore = [];
var currentGameMode = "";
var gameOnCheck = false;

var userAdded = function (newUser) {
  var userList = "";
  //Prevent user name to be nothings

  if (newUser == "") {
    return `I would like to know your name.👉👈`;
  }
  //Prevent more than 8 player
  if (user.length == 8) {
    return `It's already 8 player in the game.😣😣<br>No more player is allowed, Sorry.😭😭`;
  }
  //Check if there are user name repeated and generate userlist.
  for (var i = 0; i < user.length; i++) {
    if (newUser == user[i]) {
      return `${user[i]} is already in the game.😉<br>New player may want to choose another name.`;
    }
    userList += `Player ${i + 1}: ${user[i]} have ${
      userWinRecord[i]
    } score<br>`;
  }

  user.push(newUser);
  userWinRecord.push(0);
  userList += `Player ${user.length}: ${newUser} have 0 score`;
  return `${newUser}, welcome to the game.🥳🥳🥳<br>Here is ${user.length} player now!<br>Player list and winning score are:<br><br>${userList}`;
  //Add Player List*******
  //Limit the player number******
};

//Game Mode Idea:
//Normal Mode
//Accumulated Fair Score Mode
//Reroll Mode
//Knockout Mode
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

  gameOnCheck = true;

  return "Test";
};
