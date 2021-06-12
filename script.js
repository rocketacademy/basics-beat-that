///roll dice
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

var mode = "choosinggamemode";
var user1Number = "";
var user2Number = "";
var user1dice1 = "";
var user1dice2 = "";
var user2dice1 = "";
var user2dice2 = "";
var user1SCORE = 0;
var user2SCORE = 0;
var gamemode = "";

var main = function (input) {
  var myOutputValue = " ";
  console.log(mode);

  if (mode == "choosinggamemode") {
    myOutputValue = choosinggamemode();
    mode = "gamemodechosen";
  } else if (mode == "gamemodechosen") {
    myOutputValue = gamemodechosen(input);
    mode = "part1";
  } else if (mode == "part1") {
    myOutputValue = part1();
    mode = "choose1";
  } else if (mode == "choose1") {
    myOutputValue = choose1(input);
    mode = "part2";
  } else if (mode == "part2") {
    myOutputValue = part2();
    mode = "choose2";
  } else if (mode == "choose2") {
    myOutputValue = choose2(input);
    mode = "outcome";
  } else if (mode == "outcome") {
    if (gamemode == "Normal") {
      myOutputValue = normalOutcome(user1Number, user2Number);
    } else if (gamemode == "Reverse") {
      myOutputValue = reverseOutcome(user1Number, user2Number);
    }
    mode = "part1";
  }
  return myOutputValue;
};

///chooser normal or reverse mode
var choosinggamemode = function () {
  return "Please choose a game mode. <br>There are 2 possible game modes: Normal and Reverse.<br>Please choose one.";
};

var gamemodechosen = function (input) {
  if (input == "Normal") {
    gamemode = "Normal";
    return "The game mode you chose was Normal. <br>The player with the highest possible number will win.";
  }
  if (input == "Reverse") {
    gamemode = "Reverse";
    return "The game mode you chose was Reverse.<br>The player with the lowest possible number will win.";
  } else {
    return "Please type in either 'Normal' or 'Reverse' ";
  }
};

///roll the dice for user1's two numbers
var part1 = function () {
  user1dice1 = rollDice();
  user1dice2 = rollDice();

  return `User 1, your numbers are ${user1dice1} and ${user1dice2}. <br>Please choose the order of the dice. <br>Type in either 1 for ${user1dice1}${user1dice2}, or 2 for ${user1dice2}${user1dice1}.`;
};

/// get user1 to choose which order should the numbers be in.
var choose1 = function (input) {
  if (input == "1") {
    user1Number = user1dice1 * 10 + user1dice2;
  }
  if (input == "2") {
    user1Number = user1dice2 * 10 + user1dice1;
  }
  var message1 = `Thank you, User 1. <br>Your number is ${user1Number}. <br>User 2, please click 'submit'.`;

  if (!input == "2" || !input == "1") {
    message1 = `Please type in either 1 or 2.`;
  }
  user1SCORE = user1SCORE + user1Number;
  console.log(user1SCORE);
  return message1;
};

///roll the dice for user2's two numbers
var part2 = function () {
  user2dice1 = rollDice();
  user2dice2 = rollDice();

  return `User 2, your numbers are ${user2dice1} and ${user2dice2}. <br> Please choose the order of the dice. <br>Type in either 1 for ${user2dice1}${user2dice2}, or 2 for ${user2dice2}${user2dice1}.`;
};

/// get user2 to choose which order should the numbers be in.
var choose2 = function (input) {
  if (input == "1") {
    user2Number = user2dice1 * 10 + user2dice2;
  }
  if (input == "2") {
    user2Number = user2dice2 * 10 + user2dice1;
  }
  var message2 = `Thank you, User 2. <br>Your number is ${user2Number}. <br>Please click 'submit'.`;
  if (!input == "2" || !input == "1") {
    message2 = `Please type in either 1 or 2.`;
  }
  user2SCORE = user2SCORE + user2Number;
  console.log(user2SCORE);
  return message2;
};

///get the leaderboard for the normal mode.
var normalleaderboard = function (user1SCORE, user2SCORE) {
  var message = "";
  if (user1SCORE >= user2SCORE) {
    message = `1. User1's Score: ${user1SCORE} <br>2. User2's Score: ${user2SCORE}`;
  } else if (user2SCORE > user1SCORE) {
    message = `1. User2's Score: ${user2SCORE} <br>2. User1's Score: ${user1SCORE}`;
  }
  return message;
};

///get the outcome for the normal mode (e.g. win or lose)
var normalOutcome = function (user1Number, user2Number) {
  var message = "";
  if (user1Number > user2Number) {
    message = `User 1 won! Try again later User 2. <br>`;
  }
  if (user2Number > user1Number) {
    message = `User 2 won! Try again later User 1. <br>`;
  }
  if (user1Number == user2Number) {
    message = `It's a tie! <br>Better luck next time. <br>`;
  }
  message =
    message +
    normalleaderboard(user1SCORE, user2SCORE) +
    '<br><br>Click the "submit" button to replay. <br>To change Game Modes, please refresh page.';
  return message;
};

///get the leaderboard for the reverse mode.
var reverseleaderboard = function (user1SCORE, user2SCORE) {
  var message = "";
  if (user1SCORE <= user2SCORE) {
    message = `1. User1's Score: ${user1SCORE} <br>2. User2's Score: ${user2SCORE}`;
  } else if (user2SCORE < user1SCORE) {
    message = `1. User2's Score: ${user2SCORE} <br>2. User1's Score: ${user1SCORE}`;
  }
  return message;
};

///get the outcome for the reverse mode (e.g. win or lose)
var reverseOutcome = function (user1Number, user2Number) {
  if (user1Number < user2Number) {
    var message = `User 1 won! Try again later User 2. <br>`;
  }
  if (user2Number > user1Number) {
    var message = `User 2 won! Try again later User 1. <br>`;
  }
  if (user1Number == user2Number) {
    var message = `It's a tie! <br>Better luck next time. <br>`;
  }
  message =
    message +
    reverseleaderboard(user1SCORE, user2SCORE) +
    '<br><br>Click the "submit" button to replay. <br>To change Game Modes, please refresh page.';
  return message;
};
