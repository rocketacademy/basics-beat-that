//Global Variable
var user = [];
var userWinRecord = [];
var userAccumulatedScore = [];
var currentGameMode = "";
var gameStop = false;

var userAdded = function (newUser) {
  if (currentGameMode != "") {
    gameStop = true;
    return "You cannot add player while playing games!<br> Press play to resume the game!";
  }
  let userList = "";

  if (currentGameMode != "") {
    return `Please finish the current game before adding a new player.😉`;
  }
  //Prevent user name to be nothings
  if (newUser == "") {
    return `I would like to know your name.👉👈`;
  }
  //Prevent more than 8 player
  if (user.length == 8) {
    return `It's already 8 player in the game.😣😣<br>No more player is allowed, Sorry.😭😭`;
  }
  //Check if there are user name repeated and generate userlist.
  for (let i = 0; i < user.length; i++) {
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
  return `${newUser}, welcome to the game.🥳🥳🥳<br>Here is ${user.length} player now!<br><br>Player list and winning score are:<br>${userList}`;
};

var userDelete = function (deleteUser) {
  if (currentGameMode != "") {
    gameStop = true;
    return `You cannot delete player while playing games!<br> Press play to resume the game!`;
  }

  //Check if there are user name repeated and delete user.
  for (let i = 0; i < user.length; i++) {
    if (deleteUser == user[i]) {
      user.splice(i, 1);
      userWinRecord.splice(i, 1);
      let userList = genUserList();
      return `Good Bye.${deleteUser}👋👋<br> Have a nice day.<br><br>Player list and winning score are:<br>${userList}`;
    }
  }

  return `User name ${deleteUser} cannot be found. Who wants to quit the game?`;
};

var gameModeSelect = function (gameMode) {
  if (currentGameMode != "") {
    gameStop = true;
    return `You cannot choose game mode while playing games!<br> Press play to resume the game!`;
  }
  currentGameMode = gameMode;
  return `You choose ${currentGameMode}! Nice choice!<br>Let's start the game by pressing the play button!🤩🤩🤩`;
};

var gameOn = function () {
  if (user.length < 2) {
    return "Here is not enough player to start the game.🥲<br> Please find more friend to play the game with you.";
  }

  if (currentGameMode == "") {
    return "You have not choose the game mode yet.🤨<br>Please choose what game mode you want to play before starting the game.<br>The game mode rule is explained in the bottom of this website.😆😆";
  }

  if (currentGameMode)
    return `${user.length} players is in the game.<br>${currentGameMode} have been choose!.`;
};

var genUserList = function () {
  let userList = "";
  for (let i = 0; i < user.length; i++) {
    userList += `Player ${i + 1}: ${user[i]} have ${
      userWinRecord[i]
    } score<br>`;
  }
  return userList;
};
