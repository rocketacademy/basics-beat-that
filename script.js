var winCounts = 0;
var playCounts = 0;
var diceCounts = 0;

var state = "begin";
var numberofplays = "";
var player1NumberList = [];
var compNumberList = [];
var numberOfRemainingPlays = "";

var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var ranNumber = Math.ceil(randomDecimal);
  return ranNumber;
};

var valueFormed = function (firstDigit, secondDigit) {
  var number = "";
  if (firstDigit > secondDigit) {
    number = Number(firstDigit) * 10 + Number(secondDigit);
  } else {
    number = Number(secondDigit) * 10 + Number(firstDigit);
  }
  return number;
};

var main = function (input) {
  var myOutputValue = "";
  if (state == "begin") {
    myOutputValue =
      "Welcome to Beat That🤩, <br> please enter the number of times you would like to play Beat That!";
    state = "Entered number of rounds";
    return myOutputValue;
  }
  if (state == "Entered number of rounds") {
    numberofplays = input;
    state = "please click submit once to form a number";
    return (myOutputValue = "Please click submit once to form a number!😎");
  }
  if (state == "please click submit once to form a number") {
    while (diceCounts < numberofplays) {
      var firstDiceRollNumber = diceRoll();
      var secondDiceRollNumber = diceRoll();
      var playersNumber = valueFormed(
        firstDiceRollNumber,
        secondDiceRollNumber
      );

      player1NumberList.push(playersNumber);

      var firstCompDiceRollNumber = diceRoll();
      var secondCompDiceRollNumber = diceRoll();
      var computersNumber = valueFormed(
        firstCompDiceRollNumber,
        secondCompDiceRollNumber
      );

      compNumberList.push(computersNumber);
      diceCounts = diceCounts + 1;
      numberOfRemainingPlays = numberofplays - diceCounts;
      return (myOutputValue = `🙂🤗You formed ${playersNumber} <br> and 🤖👾 computer formed ${computersNumber}.
       <br> Click submit again to form another number, <br> you have ${numberOfRemainingPlays} remaining Plays left.🎲`);
    }
    state = "compute win Counts";
    return (myOutputValue = "Lets find out the number of times you won!🔥");
  }
  if (diceCounts == numberofplays) {
    while (playCounts < numberofplays) {
      if (compNumberList[playCounts] > player1NumberList[playCounts]) {
        winCounts = winCounts;
        playCounts = playCounts + 1;
      }
      if (compNumberList[playCounts] < player1NumberList[playCounts]) {
        winCounts = winCounts + 1;
        playCounts = playCounts + 1;
      } else {
        playCounts = playCounts + 1;
      }
    }
    return (myOutputValue = `You have won ${winCounts} times. 💥<br>
    ✨These are your numbers: ${player1NumberList} and <br> 💻 computer's numbers:
    ${compNumberList}`);
  }
};
