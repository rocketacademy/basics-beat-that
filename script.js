/*
There are 2 players and players take turns.
When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
After both players have rolled and chosen dice order, the player with the higher combined number wins.

How many game modes:
1. Player 1 click submit to roll dice.
2. Player 1 click 1 or 2 to choose order of dice. 
3. Player 2 click submit to roll dice. 
4. Player 2 click 1 or 2 to choose order of dice. 
5. Determine who gets the higher combined number.  
*/

//global variables for current game mode
var playerRoll1 = 0;
var playerRoll2 = 0;
var gameMode = "start game by rolling 2 dice";
var currentPlayer = 1;
var allDiceOrder = [];
var accumulativeRound = 0;

var playerRollDice = function () {};

// random dice generator for user to roll dice
var randomDiceGenerator = function () {
  playerRoll1 = Math.floor(Math.random() * 6 + 1);
  playerRoll2 = Math.floor(Math.random() * 6 + 1);
  console.log(`dice1 output:`, playerRoll1, "& dice2 output:", playerRoll2);

  if (playerRoll1 == playerRoll2) {
    return `Welcome Player ${currentPlayer}.<br> <br> You have rolled ${playerRoll1} for both dice one and dice two. <br><br>Press 1.`;
  } else
    return `Welcome Player ${currentPlayer}. <br> <br> You have rolled ${playerRoll1} for dice one and ${playerRoll2} for dice two.<br> <br>Choose the order of the dice by entering "1" or "2".`;
};

// function for player to roll 2 dice to get 2 number
var chooseDiceOrder = function (userInput) {
  orderOfDice = userInput;
  //input validation > error message for player if they did not enter 1 or 2
  if (userInput != 1 && userInput != 2) {
    return "Please enter either 1 or 2 to choose which dice to put infront.";
  }

  //if user choose 1 then first dice will be infront and second dice will be behind.

  if (userInput == "1") {
    var diceOrder = Number(String(playerRoll1) + String(playerRoll2));
    console.log(`user chose ${playerRoll1}, then ${playerRoll2}.`);
    //game mode switches to the next player
    gameMode = "next player roll 2 dice";
    console.log(gameMode);
    myOutputValue = `Player ${currentPlayer}, you have chosen dice 1. <br><br>Your final value is ${playerRoll1}${playerRoll2}.<br><br> Please click submit.`;
  }

  //if user choose 1 then first dice will be infront and second dice will be behind.
  if (userInput == "2") {
    diceOrder = Number(String(playerRoll2) + String(playerRoll1));
    console.log(`user chose ${playerRoll2}, then ${playerRoll1}.`);
    gameMode = "next player roll 2 dice";
    //game mode switches to the next player
    console.log(gameMode);
    myOutputValue = `You have chosen 2. <br><br>Your final value is ${playerRoll2}${playerRoll1}. <br> <br> Please click submit.`;
  }

  //to push the user's chosen number into an array and empty the temporary variables

  if (accumulativeRound == 0) {
    allDiceOrder.push(diceOrder);
    console.log(allDiceOrder);
  }

  if (accumulativeRound >= 1) {
    if (currentPlayer == 1) {
      allDiceOrder[0] = allDiceOrder[0] + diceOrder;
      console.log(`new array value = ${allDiceOrder[0]}`);
      diceOrder = [];
    }
    if (currentPlayer == 2) {
      allDiceOrder[1] = allDiceOrder[1] + diceOrder;
      console.log(`new array value = ${allDiceOrder[0]}`);
      diceOrder = [];
    }
    playerRoll1 = [];
    playerRoll2 = [];
  }
  return myOutputValue;
};

//functiont to determine the winner by comaring the values in the array
var determineWinner = function () {
  var myOutputValue = `Player 1 score is ${allDiceOrder[0]}<br>
    Player 2 score is ${allDiceOrder[1]}<br>`;
  var endOfSentence = `This is not the end! Click submit again to continue the game and try to beat your friend!  `;
  if (allDiceOrder[0] >= allDiceOrder[1]) {
    myOutputValue =
      myOutputValue +
      `<br><br><b>The winner is Player 1.</b><br><br>` +
      endOfSentence;
  }
  if (allDiceOrder[1] >= allDiceOrder[0]) {
    myOutputValue =
      myOutputValue +
      `<br><br> <b>The winner is Player 2!</b><br><br>` +
      endOfSentence;
  }
  if (allDiceOrder[1] == allDiceOrder[0]) {
    myOutputValue =
      myOutputValue + `<br><br> <b>It is a draw!</b><br><br>` + endOfSentence;
  }

  return myOutputValue;
};

//function for the game
var beatThatGame = function (input) {
  //first mode is when the player rolls 2 dice
  if (gameMode == "start game by rolling 2 dice") {
    console.log(gameMode);
    var diceRoll = randomDiceGenerator();
    //switch mode to choose dice order
    gameMode = "player choose dice order";
    console.log(gameMode);
    return diceRoll;
  }
  if (gameMode == "player choose dice order") {
    var diceScore = chooseDiceOrder(input);
    return diceScore;
  }
};

var main = function (input) {
  if (gameMode == "next player roll 2 dice") {
    console.log(gameMode);
    //loop to have more than 2 or as many players in the game.
    while (currentPlayer < 2) {
      currentPlayer += 1;
      gameMode = "start game by rolling 2 dice";
      console.log(gameMode);
      return `It is now Player ${currentPlayer}'s turn! <br><br> Please click submit to roll the dice.`;
    }
    //after 3 players have played, change game mode to compare scores
    if (currentPlayer == 2) {
      console.log(`end of last player's turn`);
      gameMode = "determine winner among 2 players";
      return `This is the end of the game.<br><br> Please click submit to see who is the winner. `;
    }
  }
  if (gameMode == "determine winner among 2 players") {
    console.log(gameMode);
    var winner = determineWinner();
    //game continues indefinitely
    gameMode = "start game by rolling 2 dice";
    currentPlayer = 1;
    accumulativeRound = 1;
    return winner;
  }
  return beatThatGame(input);
};
