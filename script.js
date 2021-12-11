//two players will take turns to play
//when the player clicks submit, game rolls 2 dice and show the values
//player then can pick the order of dice they want ie: 36 or 63
//after both players have rolled and chosen the dice order, the player with the highest combined number wins.

//have to store the values of the chosen combination
var player1Choice = [];
var player2Choice = [];

//store dice values
var diceValues = [];

//since there will be two players, multiple program states needed
var currentGameMode = "waiting for player 1 input";

//rolling dice function
var numberGenerator = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var randomNumber = randomInteger + 1;
  return randomNumber;
};

//we can use loops to store the dice roll values into the array
var dicePlayer1 = function () {
  var counter = 0;
  while (counter < 2) {
    var rolledValue = numberGenerator();
    diceValues.push(rolledValue);
    counter += 1;
  }
  return `Hi Player 1, you have rolled ${diceValues[0]} and ${diceValues[1]}. <br><br> Please choose the order you would like to combine your values. <br> <br> (1) for normal and (2) for reversed. `;
};

//we can use loops to store the dice roll values into the array
var dicePlayer2 = function () {
  var counter = 0;
  while (counter < 2) {
    rolledValue = numberGenerator();
    diceValues.push(rolledValue);
    counter += 1;
  }
  return `Hi Player 2, you have rolled ${diceValues[2]} and ${diceValues[3]}. <br> <br> Please choose the order you would like to combine your values. <br> <br> (1) for normal and (2) for reversed. `;
};

//MAIN FUNCTION
var main = function (input) {
  var myOutputValue = "";
  if (currentGameMode == "waiting for player 1 input") {
    myOutputValue = dicePlayer1();

    currentGameMode = "waiting for player 1 to choose dice order";
    console.log(`this is the current game mode: ${currentGameMode}`);
    return myOutputValue;
  } else if (currentGameMode == "waiting for player 2 input") {
    myOutputValue = dicePlayer2();

    currentGameMode = "waiting for player 2 to choose dice order";
    console.log(`this is the current game mode: ${currentGameMode}`);
    return myOutputValue;
  }

  if (currentGameMode == "waiting for player 1 to choose dice order") {
    //have to concatenate the two values together
    if (input == "1") {
      currentGameMode = "waiting for player 2 input";
      var player1 = Number(String(diceValues[0]) + String(diceValues[1]));
      player1Choice.push(player1);
      console.log(typeof player1);
      console.log(player1Choice);
      return `This is your combined number: ${player1} and its time for Player 2's turn!`;
    } else if (input == "2") {
      currentGameMode = "waiting for player 2 input";
      var player1 = Number(String(diceValues[1]) + String(diceValues[0]));
      player1Choice.push(player1);
      console.log(typeof player1);
      console.log(player1Choice);
      return `This is your combined number: ${player1} and its time for Player 2's turn!`;
    } else if (input != "1" && input != "2") {
      return "Please only enter 1 or 2!!";
    }
  }
  if (currentGameMode == "waiting for player 2 to choose dice order") {
    //have to concatenate the two values together
    if (input == "1") {
      currentGameMode = "comparing dice numbers";
      var player2 = Number(String(diceValues[2]) + String(diceValues[3]));
      player2Choice.push(player2);
      console.log(`diceValues: ${diceValues}`);
      console.log(`This is the current game mode: ${currentGameMode}`);
      return `This is your combined number: ${player2}. <br> Press "submit" to see who is the winner!`;
    } else if (input == "2") {
      currentGameMode = "comparing dice numbers";
      var player2 = Number(String(diceValues[3]) + String(diceValues[2]));
      player2Choice.push(player2);
      console.log(`diceValues: ${diceValues}`);
      console.log(`This is the current game mode: ${currentGameMode}`);
      return `This is your combined number: ${player2}. <br> Press "submit" to see who is the winner!`;
    } else if (input != "1" && input != "2") {
      return "Please only enter 1 or 2!!";
    }

    // but for this part, if the game is played multiple times, the variable player1Choice and player2Choice will have many numbers in them.
    //use a counter? global var totalCount = 0 or smth?
  } else if (currentGameMode == "comparing dice numbers") {
    if (Number(player1Choice) > Number(player2Choice)) {
      diceValues = [];
      player1Choice = [];
      player2Choice = [];
      console.log(`diceValues: ${diceValues}`);
      currentGameMode = "waiting for player 1 input";
      return "Player 1 won! <br> Click 'submit' to play the game again!";
    } else if (Number(player1Choice) < Number(player2Choice)) {
      diceValues = [];
      player1Choice = [];
      player2Choice = [];
      console.log(`diceValues: ${diceValues}`);
      currentGameMode = "waiting for player 1 input";
      return "Player 2 won! <br> Click 'submit' to play the game again!";
    }
  }
};

//use this for multiple iterations?
