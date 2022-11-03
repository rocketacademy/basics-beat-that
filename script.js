//1)  2 player game and player takes turn
//2) when a player clicks submit, the game rolls 2 dice and shows the dice roll, eg 3 and 6
//3) player picks order of the dice, example 36, they will specify 1st dice goes first, or 63, they will specify 2nd dice goes first
//4)after both player have rolled and chose dice order, plahyer with higher combined number wins

//   problem breakdown
// step 1) roll 2 dice and turns the output for 1 player. player choose the dice order and get correct return output
// step 2) refactor code to include player 2
// step 3) implemet comparing dice scores and declare winner
// step 4) reset the game so that players can play again without refresing the browser page

var player1Rolls = [];
var player2Rolls = [];
var player1Num = [];
var player2Num = [];
var state = "start";
var player = 1;
var score = [];

//generate a random number from 1 -6

var generateRandomNumber = function () {
  var randomNumber = Math.random() * 6;
  var integer = Math.floor(randomNumber);
  var diceNumber = integer + 1;
  return diceNumber;
};

//roll the dice

var playersDiceRoll = function () {
  var newDiceNumber1 = generateRandomNumber();
  var newDiceNumber2 = generateRandomNumber();

  //if its player 1, store the dice num in player1Rolls
  if (player == 1) {
    player1Rolls.push(newDiceNumber1, newDiceNumber2);

    console.log("dice 1 for player 1:", newDiceNumber1);
    console.log("dice 2 for player 1:", newDiceNumber2);
    console.log("dice array for player 1", player1Rolls);

    return (
      "Hi player 1! <br>Dice 1: " +
      newDiceNumber1 +
      " <br> Dice 2: " +
      newDiceNumber2 +
      "<br> please choose 1 or 2 to choose dice order"
    );
  } else {
    //if its player 2, store the dice num in player2Rolls
    player2Rolls.push(newDiceNumber1, newDiceNumber2);

    console.log("dice 1 for player2:", newDiceNumber1);
    console.log("dice 2 for player2:", newDiceNumber2);
    console.log("dice array for player 2", player2Rolls);

    return (
      "Hi player 2! <br> Dice 1: " +
      newDiceNumber1 +
      "<br> Dice 2: " +
      newDiceNumber2 +
      "<br> please choose 1 or 2 to choose dice order"
    );
  }
};

var player1Choose = function (input) {
  if (input != 1 && input != 2) {
    return "Please input 1 or 2 to choose which dice to use as first digit";
  }
  if (input == 1) {
    console.log("control flow for player 1: input == 1");
    var playerScore = Number(String(player1Rolls[0]) + String(player1Rolls[1]));

    //store player 1's chosen order if input = 1
    player1Num.push(playerScore);
    console.log("player 1 chosen num:", player1Num);
    return "your choosen value is " + player1Num;
  }
  if (input == 2) {
    console.log("control flow for player 1: input == 2");
    var playerScore = Number(String(player1Rolls[1]) + String(player1Rolls[0]));

    //store player 1's chosen order if input = 2
    player1Num.push(playerScore);
    console.log("player 1 chosen num:", player1Num);
    return "your choosen value is  " + player1Num;
  }
};

var player2Choose = function (input) {
  if (input == 1) {
    console.log("control flow for player 2: input == 1");
    var player2Score = Number(
      String(player2Rolls[0]) + String(player2Rolls[1])
    );

    //store player 2's chosen order if input = 1

    player2Num.push(player2Score);
    console.log("player 2 chosen Num:", player2Num);

    return "Your choosen value is" + player2Num;
  }
  if (input == 2) {
    console.log("control flow for player 2: input == 2");

    var player2Score = Number(
      String(player2Rolls[1]) + String(player2Rolls[0])
    );

    //store player 2's chosen order if input = 2

    player2Num.push(player2Score);
    console.log("player 2 chosen Num:", player2Num);

    return "your choosen value is  " + player2Num;
  }
};

var decideWinner = function () {
  if (player1Num > player2Num) {
    console.log(player1Num);
    return "Player 1 wins!";
  }
  return "Player 2 wins!";
};

var main = function (input) {
  if (state == "start") {
    state = "chooseOrder";
    return playersDiceRoll();
  }
  if (state == "chooseOrder") {
    state = "player2";
    player = 2;
    return player1Choose(input);
    1;
  }

  if (state == "player2") {
    state = "chooseOrder2";
    return playersDiceRoll();
  }
  if (state == "chooseOrder2") {
    state = "determineWinner";
    return player2Choose(input);
  }
  if (state == "determineWinner") {
    var winner = decideWinner();
    return winner;
  }
};
