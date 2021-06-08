var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

var mode = "part1";
var user1Number = "";
var user2Number = "";
var user1dice1 = "";
var user1dice2 = "";
var user2dice1 = "";
var user2dice2 = "";

var part1 = function () {
  user1dice1 = rollDice();
  user1dice2 = rollDice();

  return `User 1, your numbers are ${user1dice1} and ${user1dice2}. <br>Please choose the order of the dice. <br>Type in either 1 for ${user1dice1}${user1dice2}, or 2 for ${user1dice2}${user1dice1}.`;
};

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
  return message1;
};

var part2 = function () {
  user2dice1 = rollDice();
  user2dice2 = rollDice();

  return `User 2, your numbers are ${user2dice1} and ${user2dice2}. <br> Please choose the order of the dice. <br>Type in either 1 for ${user2dice1}${user2dice2}, or 2 for ${user2dice2}${user2dice1}.`;
};

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
  return message2;
};

var outcome = function (user1Number, user2Number) {
  var message = "";
  if (user1Number > user2Number) {
    message = `User 1 won! Try again later User 2.`;
  }
  if (user2Number > user1Number) {
    message = `User 2 won! Try again later User 1.`;
  }
  if (user1Number == user2Number) {
    message = `It's a tie! <br>Better luck next time.`;
  }
  return message;
};

var main = function (input) {
  var myOutputValue = " ";
  console.log(mode);

  if (mode == "part1") {
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
    myOutputValue = outcome(user1Number, user2Number);
  }
  return myOutputValue;
};
