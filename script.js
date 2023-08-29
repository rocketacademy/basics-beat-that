//global variables
var gameMode = "Number of players";
var playerNum = 0;
var totalPlayers = 0;
var playerRound = 0;
var playerDiceOne = "";
var playerDiceTwo = "";
var playerCombinedDice = [];
var playerResult = 0;
var largestNum = 0;
// var playingPlayerMsg = `🎲 <b> Player ${playerNum + 1} </b> 🎲`;
// var rollingDiceMsg = `You rolled ${playerDiceOne} for Dice One and ${playerDiceTwo} for Dice Two. <br><br> Choose the order of the dice. Input "1" or "2"`;
// var combineDiceMsg = `Your combined dice roll is ${playerResult}`;
// var nextPlayer = `It is now Player ${
//   playerNum + 2
// }'s turn! Please click "Submit"!`;

//player rolls 2 dice and shows the dice roll and convert it to string to concatenate later
var playerRoll = function () {
  playerDiceOne = rollDice().toString();
  console.log(`dice one = ${playerDiceOne}`);
  playerDiceTwo = rollDice().toString();
  console.log(`dice two = ${playerDiceTwo}`);
};

//player pick the order to concatenate
var combinePlayerDice = function (diceChoice) {
  if (diceChoice == 1) {
    console.log(`array position: ${playerNum}`);
    console.log(`Dice One+Two = ${playerDiceOne + playerDiceTwo}`);
    playerCombinedDice[playerNum] = Number(playerDiceOne + playerDiceTwo);
    console.log(`player combined dice is ${playerCombinedDice[playerNum]}`);
    return playerCombinedDice;
  }
  console.log(`array position: ${playerNum}`);
  console.log(`Dice Two+One = ${playerDiceTwo + playerDiceOne}`);
  playerCombinedDice[playerNum] = Number(playerDiceTwo + playerDiceOne);
  console.log(`player combined dice is ${playerCombinedDice[playerNum]}`);
  return playerCombinedDice;
};

//roll dice function
var rollDice = function () {
  var randomValue = Math.random() * 6;
  var randomInteger = Math.floor(randomValue);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

//winning functions
var calcWinner = function () {
  largestNum = playerCombinedDice[0];
  for (var i = 0; i < playerCombinedDice.length; i += 1) {
    if (playerCombinedDice[i] > largestNum) {
      largestNum = playerCombinedDice[i];
    }
  }
  var winningPlayer = playerCombinedDice.indexOf(largestNum) + 1;
  console.log(`largest num is ${largestNum}`);
  console.log(playerCombinedDice.indexOf(largestNum));
  console.log(`winning player is ${winningPlayer}`);
  return winningPlayer;
};

var main = function (input) {
  //validate input is number and not blank
  if (input == "") {
    return `Please enter the number of players`;
  }
  if (isNaN(Number(input)) == true)
    return `You did not enter a number! Please enter the number of players!`;
  //define number of players to play
  if (gameMode == "Number of players") {
    totalPlayers = Number(input);
    gameMode = "roll dice";
    console.log(`total players = ${totalPlayers}`);
    return `There are a total of ${totalPlayers} players! Click "Submit" to begin!`;
  }
  while (playerNum < totalPlayers) {
    if (gameMode == "roll dice") {
      //roll the dice
      playerRollDice = playerRoll();
      gameMode = "combine dice";
      return `🎲 <b> Player ${
        playerNum + 1
      } </b> 🎲 <br><br> You rolled ${playerDiceOne} for Dice One and ${playerDiceTwo} for Dice Two. <br><br> Choose the order of the dice. Input "1" or "2"`;
    } else if (gameMode == "combine dice") {
      console.log(`input is ${input}`);
      //validate input is 1 or 2
      if (isNaN(Number(input)) == true || (input !== "1" && input !== "2")) {
        return `You did not enter a valid input. <br><br> Please enter either "1" or "2"`;
      } else playerCombinedDice = combinePlayerDice(input);
      playerResult = playerCombinedDice[playerNum];
      playerNum += 1;
      if (playerNum != totalPlayers) {
        gameMode = "roll dice";
        console.log(`PlayerNum = ${playerNum}`);
        return `🎲 <b> Player ${playerNum} </b> 🎲 <br><br> Your combined dice roll is ${playerResult} <br><br> It is now Player ${
          playerNum + 1
        }'s turn! Please click "Submit"!`;
      }
      return `🎲 <b> Player ${playerNum} </b> 🎲 <br><br> Your combined dice roll is ${playerResult} <br><br> Let's see who wins~</br>`;
    }
  }
  //winning conditions
  var findWinner = calcWinner();
  playerNum = 0;
  playerCombinedDice = [];
  gameMode = "Number of players";
  return `🎲 <b> Player ${findWinner} wins! 🎲 </b> <br><br> The combined dice roll is ${largestNum}! <br><br>Let's play again!`;
};
