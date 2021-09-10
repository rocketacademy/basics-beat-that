var player1 = [];
var player2 = [];
var player1Score;
var player2Score;

//ask players how many dice they wish to play with
var main = function (input) {
  return rollDice(input);
};

//generate equivalent number of randomized dice rolls and store them in an array
var generateRandomNumber1 = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var randomNumber = randomInteger + 1;
  return randomNumber;
};
var generateRandomNumber2 = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var randomNumber = randomInteger + 1;
  return randomNumber;
};

var rollDice = function (numberOfRolls) {
  counter = 0;
  while (counter < numberOfRolls) {
    var randomNumber1 = generateRandomNumber1();
    var randomNumber2 = generateRandomNumber2();
    player1.push(randomNumber1);
    console.log("player1", player1);
    player2.push(randomNumber2);
    console.log("player2", player2);
    counter += 1;
  }

  //auto-generate the optimal combined number based on each player's dice rolls to determine the winner
  var sortBigToSmall1 = player1.sort((a, b) => b - a);
  console.log("sortBigToSmall1", sortBigToSmall1);
  var sortBigToSmall2 = player2.sort((a, b) => b - a);
  console.log("sortBigToSmall2", sortBigToSmall2);
  player1Score = Number(sortBigToSmall1.join(""));
  console.log("Player 1:", player1Score);
  player2Score = Number(sortBigToSmall2.join(""));
  console.log("Player 2:", player2Score);

  var playersDiceRolls =
    `Player 1's dice rolls: ${player1}` +
    "<br>" +
    `Player 2's dice rolls: ${player2}` +
    "<br><br>" +
    `Player 1's highest combined number is ${player1Score}. Player 2's highest combined number is ${player2Score}. `;

  if (player1Score > player2Score) {
    myOutputValue = playersDiceRolls + "Player 1 wins!";
  }
  if (player2Score > player1Score) {
    myOutputValue = playersDiceRolls + "Player 2 wins!";
  }
  if (player1Score == player2Score) {
    myOutputValue = playersDiceRolls + "It's a draw!";
  }
  return myOutputValue;
};
