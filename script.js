var main = function (input) {
  var myOutputValue = "hello world";
  return myOutputValue;
};
var gamemode = "roll die";
// 0 even for player 1 and odd for player2
var playerArray = ["Player 1", "Player 2"];
var chosenArrary = [];
var die1 = "";
var die2 = "";
var counter = 0;
var chosenNum = "";

var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var diceNumber = Math.floor(randomDecimal) + 1;
  return diceNumber;
};

var main = function (input) {
  var myOutputValue = "";
  if (input == "Dice 1") {
    chosenNum = die1 * 10 + die2;
    chosenArrary.push(chosenNum);
    gamemode = "roll die";
    counter = (counter + 1) % 2;

    console.log("number : " + chosenNum);
    console.log("chosenArray: " + chosenArrary);
    console.log("gamemode: " + gamemode);
    console.log("counter : " + counter);

    return `Your chosen number is ${chosenNum}.`;
  } else if (input == "Dice 2") {
    chosenNum = die2 * 10 + die1;
    chosenArrary.push(chosenNum);
    gamemode = "roll die";

    counter = (counter + 1) % 2;
    console.log("number : " + chosenNum);
    console.log("chosenArray: " + chosenArrary);
    console.log("gamemode: " + gamemode);
    console.log("counter : " + counter);
    return `Your chosen number is ${chosenNum}.`;
  }

  if ((gamemode == "roll die") & (chosenArrary.length < 2)) {
    // even is player 1 turn, odd is player 2 turn
    var playerTurn = playerArray[counter];
    die1 = rollDice();
    die2 = rollDice();
    console.log("die1: " + die1);
    console.log("die2: " + die2);
    console.log("playerTurn : " + playerTurn);
    gamemode = "choose die";
    return `Welcome ${playerTurn}. <br>
    You rolled ${die1} for Dice 1 and ${die2} for Dice 2. <br>
    Choose the order of the dice.<br><br>

    Dice 1<br>
    Dice 2<br> `;
  } else {
    if (chosenArrary[0] > chosenArrary[1]) {
      myOutputValue = `Player 1 win! with ${chosenArrary[0]}`;
    } else {
      myOutputValue = `Player 2 win! with ${chosenArrary[0]}`;
    }
    chosenArrary = [];
  }
  return myOutputValue;
};
