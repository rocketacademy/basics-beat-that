var state = "player1 Throw";
var createdNum1 = 0;
var createdNum2 = 0;
var p1num1;
var p1num2;
var p2num1;
var p2num2;
var main = function (input) {
  if (state == "player1 Throw") {
    p1num1 = diceRoll();
    p1num2 = diceRoll();
    console.log(typeof dice1);
    var myOutputValue =
      "your dices are  " +
      p1num1 +
      " and " +
      p1num2 +
      ". Choose which dice you want first by keying in the dice number";
    state = "player1 decide";
    return myOutputValue;
  }

  if (state == "player1 decide") {
    if (
      input == "1" ||
      input == p1num1 ||
      input == "dice 1" ||
      input == "dice number 1"
    ) {
      createdNum1 = p1num1 * 10 + p1num2;
      console.log(`createdNum1`, createdNum1, p1num1, p1num2);
      myOutputValue =
        "you chose dice 1 first and created " +
        createdNum1 +
        " Click submit to end your turn and begin player 2's turn";
      state = "player2 Throw";
      return myOutputValue;
    } else if (
      input == "2" ||
      input == p1num2 ||
      input == "dice 2" ||
      input == "dice number 2"
    ) {
      createdNum1 = p1num2 * 10 + p1num1;
      console.log(`createdNum1`, createdNum1);
      myOutputValue = "you chose dice 2 first and created " + createdNum1;
      gameMode = "player2";
      state = "player2 Throw";
      return myOutputValue;
    }
  }

  if (state == "player2 Throw") {
    p2num1 = diceRoll();
    p2num2 = diceRoll();
    console.log(typeof dice3);
    myOutputValue =
      "your dices are  " +
      p2num1 +
      " and " +
      p2num2 +
      ". Choose which dice you want first by keying in the dice number";
    state = "player2 decide";
    return myOutputValue;
  }

  if (state == "player2 decide") {
    if (
      input == "1" ||
      input == p2num1 ||
      input == "dice 1" ||
      input == "dice number 1"
    ) {
      createdNum2 = p2num1 * 10 + p2num2;
      console.log(`createdNum2`, createdNum2);
      myOutputValue = "you chose dice 1 first and created " + createdNum2;
      state = "conclusion";
      return myOutputValue;
    } else if (
      input == "2" ||
      input == p2num2 ||
      input == "dice 2" ||
      input == "dice number 2"
    ) {
      createdNum2 = p2num2 * 10 + p2num1;
      console.log(`createdNum2`, createdNum2);
      myOutputValue = "you chose dice 2 first and created " + createdNum2;
      state = "conclusion";
      return myOutputValue;
    }
  }

  if (state == "conclusion") {
    if (createdNum1 > createdNum2) {
      state = "player1 Throw";
      return `player 1 won with a number of ${createdNum1}.player 2 lost with a number of ${createdNum2}.Click submit to play again`;
    }
    if (createdNum1 < createdNum2) {
      state = "player1 Throw";
      return `player 2 won with a number of ${createdNum2}.player 1 lost with a number of ${createdNum1}.Click submit to play again`;
    }
  }
};
var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};
