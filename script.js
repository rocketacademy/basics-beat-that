//states
var playerCount = 0;
var userNames = [];
var gameMode = "";
var gameType = "";
var diceCount = 0;
var playerScores = [];
var diceRolls = [];
var playGameCount = 0;
var scoreBoard = [];
var tempScoreBoard = [];
var gameRoundCount = 0;
var eliminationArray = [];

//constants
const NORMAL = "Normal";
const LOWEST = "Lowest";
const KNOCKOUT = "Knockout";
const HIGHSCORE = "Highscore";
const DICE = [1, 2, 3, 4, 5, 6];

//username change state
var userNameCount = 11;

var main = function (input) {
  // player count validation
  if (playerCount == 0) {
    if (isNaN(input) || input > 10 || input < 2) {
      return `Please enter the number of players that wish to play. Maximum of 10 and minimum of 2!`;
    }
    playerCount = Number(input);
    // update scoreboard
    for (let a = 0; scoreBoard.length < playerCount; a += 1) {
      scoreBoard.push(Number(0));
    }

    console.log("scoreboard fill 0: " + scoreBoard);
    return `<b>${playerCount}</b> players selected. Please proceed to enter your usernames.`;
  }

  //username validation
  if (userNames.length < playerCount) {
    if (input == "" || userNames.includes(input)) {
      return `Please enter a valid username! Usernames must be unique to other players and should not be blank!`;
    } else if (userNames.length == playerCount - 1 && diceCount != 0) {
      userNames.push(input);
      console.log(userNames);
      return `Hello <b>${input}</b>, Welcome to the game. We now have your names 😈 Click submit to continue the game`;
    } else if (userNames.length == playerCount - 1) {
      userNames.push(input);
      console.log(userNames);
      return `Hello <b>${input}</b>, Welcome to the game. We now have your names 😈 Please enter the number of dices you want to play with.`;
    }
    userNames.push(input);
    return `Hello <b>${input}</b>, Welcome to the game.`;
  }

  //diceCount validation
  if (diceCount == 0) {
    if (isNaN(input) || input > 10 || input < 2) {
      return `Please enter the number of dices you wish to play with. Maximum of 10 and minimum of 2!`;
    } //for changing dice count
    else if (gameMode != "") {
      diceCount = Number(input);
      return `Dice count successfully changed to <b>${diceCount}</b>. Click submit to continue rolling!`;
    }
    diceCount = Number(input);
    return `<b>${diceCount}</b> dices selected. Please proceed to select your game mode.<br><br>Modes available:<br>⮞Highscore<br>⮞Knockout`;
  }

  //gameMode validation
  if (gameMode == "") {
    if (
      input == "" ||
      (input.toUpperCase() != HIGHSCORE.toUpperCase() &&
        input.toUpperCase() != KNOCKOUT.toUpperCase())
    ) {
      return `Please enter a valid game mode.<br><br>Modes available:<br>⮞Highscore<br>⮞Knockout`;
    } // for changing game mode
    else if (gameType != "") {
      gameMode = input.toUpperCase();
      return `Game mode successfully changed to <b>${gameMode}</b>. Click submit to continue rolling!`;
    }
    gameMode = input.toUpperCase();
    return `<b>${gameMode}</b> mode selected. Please proceed to select game type.<br><br>Types available:<br>⮞Normal<br>⮞Lowest`;
  }

  //gameType validation
  if (gameType == "") {
    if (
      input == "" ||
      (input.toUpperCase() != NORMAL.toUpperCase() &&
        input.toUpperCase() != LOWEST.toUpperCase())
    ) {
      return `Please enter a valid game type.<br><br>Types available:<br>⮞Normal<br>⮞Lowest`;
    } //for changing game type
    else if (playerScores != "") {
      gameType = input.toUpperCase();
      return `Game type successfully changed to <b>${gameType}</b>. Click submit to continue rolling!`;
    }
    gameType = input.toUpperCase();
    return `<b>${gameType}</b> game type selected. You are ready! click Submit to roll dices for <b>${userNames[0]}</b>`;
  }

  //to change player count
  if (input == "change player count") {
    playerCount = 0;
    scoreBoard = [];
    userNames = [];
    playGameCount = 0;
    tempScoreBoard = [];
    return `Please enter the new number of players for the game.`;
  }

  //to change usernames
  if (input == "change username") {
    userNameCount = -1;
    return "Please enter your current username";
  }
  if (userNameCount == -1) {
    if (input == "" || userNames.includes(input) == false) {
      return `Please enter a valid current username!`;
    }
    userNameCount = userNames.indexOf(input);
    return `Old username <b>${input}</b> detected. Please enter your new desired username.`;
  }
  if (userNameCount < userNames.length && userNameCount > -1) {
    if (input == "" || userNames.includes(input)) {
      return `Please enter a valid username! Usernames must be unique to other players and should not be blank!`;
    }
    userNames[userNameCount] = input;
    console.log(userNames);
    userNameCount = 11;
    return `Username successfully changed. hello <b>${input}</b>.<br><br>Enough time wasted peasants. Now click submit to continue playing.`;
  }

  //to change dice count
  if (input == "change dice count") {
    diceCount = 0;
    for (let a = 0; a < scoreBoard.length; a += 1) {
      scoreBoard[a] = 0;
    }
    playGameCount = 0;
    tempScoreBoard = [];
    return `Please enter the new number of dice you wish to play with.Maximum of 10 and minimum of 2!`;
  }

  //to change game mode
  if (input == "change game mode") {
    gameMode = "";
    for (let a = 0; a < scoreBoard.length; a += 1) {
      scoreBoard[a] = 0;
    }
    playGameCount = 0;
    tempScoreBoard = [];
    return `Please enter the new game mode you wish to play.<br><br>Modes available:<br>⮞Highscore<br>⮞Knockout`;
  }

  //to change game type
  if (input == "change game type") {
    gameType = "";
    for (let a = 0; a < scoreBoard.length; a += 1) {
      scoreBoard[a] = 0;
    }
    playGameCount = 0;
    tempScoreBoard = [];
    return `Please enter the new game type you wish to play.<br><br>Types available:<br>⮞Normal<br>⮞Lowest`;
  }

  //play the game
  // // Highscore game mode
  if (gameMode == HIGHSCORE.toUpperCase()) {
    if (playGameCount < userNames.length) {
      console.log(userNames.length + " :username length");
      console.log(playGameCount + " :playGameCount");
      //roll dice
      for (let a = 0; a < diceCount; a += 1) {
        var rollDice = getDiceRoll();
        diceRolls.push(rollDice);
        console.log(`dice rolls ${diceRolls}`);
      }
      // Normal game type
      ////sort diceRolls array decending
      if (gameType == NORMAL.toUpperCase()) {
        let sortedDiceRolls = [...diceRolls].sort(function (a, b) {
          return b - a;
        });
        console.log(sortedDiceRolls + " :sorted diceRolls");

        //concatenate diceRolls array and push into scoreboard array
        scoreBoard[playGameCount] += Number(sortedDiceRolls.join(""));
        console.log(scoreBoard + " :scoreboard");

        tempScoreBoard.push(sortedDiceRolls.join(``));

        // for final player roll statement and leaderboard
        if (playGameCount == userNames.length - 1) {
          let sortedScoreBoard = [...scoreBoard].sort(function (a, b) {
            return b - a;
          });
          console.log(sortedScoreBoard + " :sorted scoreBoard");
          // to find who is in the lead
          return `<b>${
            userNames[playGameCount]
          }</b> rolled ${diceRolls}, resulting in a score of ${
            tempScoreBoard[playGameCount]
          }.<br><br><b>${
            userNames[scoreBoard.indexOf(sortedScoreBoard[0])]
          }</b> is currently in the lead. Please buck up the rest of you!<br><br> Click submit to continue playing! ${
            ((playGameCount = 0), (diceRolls = []), (tempScoreBoard = []))
          }`;
        }

        //increase playGameCount to exit this if condition
        playGameCount += 1;

        return `<b>${
          userNames[playGameCount - 1]
        }</b> rolled ${diceRolls}, resulting in a score of ${
          tempScoreBoard[playGameCount - 1]
        }.<br><br><b>${
          userNames[playGameCount]
        }</b> click submit to roll. ${(diceRolls = [])}`;
      }

      // Lowest game type
      else if (gameType == LOWEST.toUpperCase()) {
        ////sort diceRolls array ascending
        let sortedDiceRolls = [...diceRolls].sort(function (a, b) {
          return a - b;
        });
        console.log(sortedDiceRolls + " :sorted diceRolls");

        //concatenate diceRolls array and push into scoreboard array
        scoreBoard[playGameCount] += Number(sortedDiceRolls.join(""));
        console.log(scoreBoard + " :scoreboard");

        tempScoreBoard.push(sortedDiceRolls.join(``));

        // for final player roll statement and leaderboard
        if (playGameCount == userNames.length - 1) {
          let sortedScoreBoard = [...scoreBoard].sort(function (a, b) {
            return a - b;
          });
          console.log(sortedScoreBoard + " :sorted scoreBoard");
          // to find who is in the lead
          return `<b>${
            userNames[playGameCount]
          }</b> rolled ${diceRolls}, resulting in a score of ${
            tempScoreBoard[playGameCount]
          }.<br><br><b>${
            userNames[scoreBoard.indexOf(sortedScoreBoard[0])]
          }</b> is currently in the lead. Please buck up the rest of you!<br><br> Click submit to continue playing! ${
            ((playGameCount = 0), (diceRolls = []), (tempScoreBoard = []))
          }`;
        }

        //increase playGameCount to exit this if condition
        playGameCount += 1;

        return `<b>${
          userNames[playGameCount - 1]
        }</b> rolled ${diceRolls}, resulting in a score of ${
          tempScoreBoard[playGameCount - 1]
        }.<br><br><b>${
          userNames[playGameCount]
        }</b> click submit to roll. ${(diceRolls = [])}`;
      }
    }
  }
  //KNOCKOUT game mode
  else if (gameMode == KNOCKOUT.toUpperCase()) {
    //do round robin tournament style. only allow 4 or 8 players for this to be fair.
    if (playerCount < 4) {
      for (let a = playerCount; a < 4; a += 1) {
        playerCount += 1;
        scoreBoard.push(Number(0));
        userNames.push(`Player ${userNames.length + 1}`);
        shuffleArray(userNames);
        console.log(userNames);
      }
    } else if (playerCount != 4 && playerCount < 8) {
      for (let a = playerCount; a < 8; a += 1) {
        playerCount += 1;
        scoreBoard.push(Number(0));
        userNames.push(`Player ${userNames.length + 1}`);
        shuffleArray(userNames);
        console.log(userNames);
      }
    } else if (playerCount > 8) {
      return `You have too many players! <b>${KNOCKOUT.toUpperCase()}</b> mode currently supports a maximum of 8 players. Enter "change player count" to continue or "change game mode" to play another game mode!`;
    }

    if (gameRoundCount == 1) {
      playGameCount = 0;
      //remove all users with score 0
      for (let a = 0; a < scoreBoard.length; a += 1) {
        if ((scoreBoard[a] = 0)) {
          eliminationArray.push(userNames[a]);
        }
      }
      for (let a = 0; a < eliminationArray.length; a += 1) {
        if (userNames.includes(eliminationArray[a])) {
          userNames.splice(userNames.indexOf(eliminationArray[a]), 1);
          console.log(userNames);
        }
      }
      for (let a = 0; a < scoreBoard; a += 1) {
        if (scoreBoard[a] == 0) {
          scoreBoard.splice(scoreBoard.indexOf[a], 1);
          console.log(scoreBoard);
        }
      }
    } else if (gameRoundCount == 2) {
      playGameCount = 0;
      //remove all users with score 0
      for (let a = 0; a < scoreBoard.length; a += 1) {
        if ((scoreBoard[a] = 0)) {
          eliminationArray.push(userNames[a]);
        }
      }
      for (let a = 0; a < eliminationArray.length; a += 1) {
        if (userNames.includes(eliminationArray[a])) {
          userNames.splice(userNames.indexOf(eliminationArray[a]), 1);
          console.log(userNames);
        }
      }
      for (let a = 0; a < scoreBoard; a += 1) {
        if (scoreBoard[a] == 0) {
          scoreBoard.splice(scoreBoard.indexOf[a], 1);
        }
      }
    }
    if (playGameCount < userNames.length) {
      //roll dices
      for (let a = 0; a < diceCount; a += 1) {
        var rollDice = getDiceRoll();
        diceRolls.push(rollDice);
      }
      // Normal game type
      ////sort diceRolls array descending
      if (gameType == NORMAL.toUpperCase()) {
        let sortedDiceRolls = [...diceRolls].sort(function (a, b) {
          return b - a;
        });

        //concatenate sortedDiceRolls array and push into scoreboard array
        scoreBoard[playGameCount] += Number(sortedDiceRolls.join(""));
        console.log(scoreBoard + " :scoreboard");

        if (playGameCount == userNames.length - 1) {
        }

        //condition on every second player to eliminate 1 player
        if (playGameCount % 2 != 0) {
          if (playGameCount == userNames.length - 1) {
            if (scoreBoard[playGameCount] > scoreBoard[playGameCount - 1]) {
              return `<b>${
                userNames[playGameCount]
              }</b> rolled ${diceRolls}, resulting in a score of ${
                scoreBoard[playGameCount]
              }<br><br><b>${
                userNames[playGameCount - 1]
              }</b> has been eliminated from the game.${
                ((scoreBoard[playGameCount] = 0),
                (playGameCount += 1),
                (diceRolls = []),
                (gameRoundCount += 1))
              }`;
            } else if (
              scoreBoard[playGameCount] < scoreBoard[playGameCount - 1]
            ) {
              return `<b>${
                userNames[playGameCount]
              }</b> rolled ${diceRolls}, resulting in a score of ${
                scoreBoard[playGameCount]
              }<br><br><b>${
                userNames[playGameCount]
              }</b> has been eliminated from the game.${
                ((scoreBoard[playGameCount] = 0),
                (playGameCount += 1),
                (diceRolls = []),
                (gameRoundCount += 1))
              }`;
            }
          }
          if (scoreBoard[playGameCount] > scoreBoard[playGameCount - 1]) {
            return `<b>${
              userNames[playGameCount]
            }</b> rolled ${diceRolls}, resulting in a score of ${
              scoreBoard[playGameCount]
            }<br><br><b>${
              userNames[playGameCount - 1]
            }</b> has been eliminated from the game.${
              ((scoreBoard[playGameCount] = 0),
              (playGameCount += 1),
              (diceRolls = []))
            }`;
          } else if (
            scoreBoard[playGameCount] < scoreBoard[playGameCount - 1]
          ) {
            return `<b>${
              userNames[playGameCount]
            }</b> rolled ${diceRolls}, resulting in a score of ${
              scoreBoard[playGameCount]
            }<br><br><b>${
              userNames[playGameCount]
            }</b> has been eliminated from the game.${
              ((scoreBoard[playGameCount] = 0),
              (playGameCount += 1),
              (diceRolls = []))
            }`;
          }
        }

        //increase playGameCount to exit this if condition
        playGameCount += 1;

        return `<b>${
          userNames[playGameCount - 1]
        }</b> rolled ${diceRolls}, resulting in a score of ${
          scoreBoard[playGameCount - 1]
        }${(diceRolls = [])}`;
      }
    }
  }
};

//Implement leaderboard

//dice roll helper fn
var getDiceRoll = function () {
  return DICE[Math.floor(Math.random() * 6)];
};

//array shuffle helper fn

var shuffleArray = function (array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};
