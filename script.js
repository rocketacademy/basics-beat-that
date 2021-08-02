var gameMode = "roll dice";
var playerNo = 1;

// get dice roll
var diceRoll = function () {
  return Math.ceil(Math.random() * 6);
};

// create arrays with respective user dice rolls
var user1 = [diceRoll(), diceRoll()];
var user2 = [diceRoll(), diceRoll()];
var userResult = [];

var main = function (input) {
  var myOutputValue = " ";
  var comNum = user1[0] * 10 + user1[1];
  var comNumRev = user1[1] * 10 + user1[0];
  var comNum2 = user2[0] * 10 + user2[1];
  var comNumRev2 = user2[1] * 10 + user2[0];

  console.log("user1 rolled " + user1 + " & user 2 rolled " + user2);

  // dice roll for Player 1
  if (gameMode == "roll dice") {
    if ((playerNo = 1)) {
      gameMode = "choose order";
      console.log(`gamemode` + gameMode);
      return `Welcome Player ${playerNo}. You rolled ${user1[0]} for Dice 1 and ${user1[1]} for Dice 2. <br>
      Choose the order of the dice. If you would like to flip the sequence of number ${comNum}, <br>
      Enter y, else simply click submit.`;
    }
  }

  console.log("gamemode = " + gameMode);

  // choose order for player 1
  if ((gameMode = "choose order" && playerNo == 1)) {
    if (input != "y") {
      userResult.push(comNum);
      console.log(userResult);
      playerNo = 2;

      myOutputValue = `Player 1, you chose ${user1[0]} first. Your number is ${comNum}. It is now Player 2's turn`;
    } else {
      userResult.push(comNumRev);
      console.log(userResult);
      playerNo = 2;

      myOutputValue = `Player 1, you chose ${user1[1]} first. Your number is ${comNumRev}.It is now Player 2's turn`;
    }
    return myOutputValue;
  }

  console.log("gamemode = " + gameMode);

  // dice roll for Player 2
  if ((gameMode = "roll dice" && playerNo == 2)) {
    gameMode = "choose order 2";
    return `Welcome Player 2. You rolled ${user2[0]} for Dice 1 and ${user2[1]} for Dice 2. <br>
      Choose the order of the dice. If you would like to flip the sequence of number ${comNum2}, <br>
      Enter y, else simply click submit.`;
  }

  // choose order for Player 2
  if ((gameMode = "choose order 2")) {
    if (input != "y") {
      userResult.push(comNum2);
      console.log(userResult);

      console.log("check" + gameMode);
      myOutputValue = `Player 2, you chose ${user2[0]} first. Your number is ${comNum2}. Let's determine the winner!`;
    } else {
      userResult.push(comNumRev2);
      console.log(userResult);

      console.log("check" + gameMode);
      myOutputValue = `Player 2, you chose ${user2[1]} first. Your number is ${comNumRev2}. Let's determine the winner!`;
    }
    gameMode = "find winner";
    console.log("find winner" + gameMode);
    return myOutputValue;
  }

  //Find winner
  if ((gameMode = "find winner" && input == "")) {
    if (userResult[1] < userResult[0]) {
      return "Player 1 wins!";
    } else {
      return `Player 2 wins!`;
    }
  }
  return myOutputValue;
};
