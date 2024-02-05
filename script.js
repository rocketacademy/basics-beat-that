var playerNumbers = [];
var gameState = "";
var playerCounter = 1;

var main = function (input) {
  //sets numbers of players
  var maxPlayers = 3;
  var myOutputValue = "Player 1, hit 'submit' to begin the game.";

  //starts loops. loop ends when counter track players' turns is more than max players.
  while (playerCounter <= maxPlayers) {
    //checks the gamestate
    //gamestate = roll
    if (gameState == "") {
      gameState = "roll";
      console.log(gameState);
      return myOutputValue;
    }
    //checks the gamestate
    //gamestate = roll
    if (gameState == "roll") {
      dice1 = rollDice();
      dice2 = rollDice();
      console.log("Dice 1: ", dice1);
      console.log("Dice 2: ", dice2);
      myOutputValue = `Welcome Player ${playerCounter}.<br> You rolled ${dice1} for Dice 1 and ${dice2} for Dice 2. Choose the order of the dice.<br>[Type '1' or '2' for your choice of first digit of your score.]`;
      gameState = "choose";
      break;
    }
    //checks the gamestate
    //gameState = choose and not all players have played
    if (gameState == "choose" && playerCounter < maxPlayers) {
      var score = setScore(input, dice1, dice2);
      playerNumbers.push(score);
      console.log("Score: ", score);
      myOutputValue = `Player ${playerCounter}, you chose Dice ${input} first.<br>
      Your number is ${score}.<br>
      It is now Player ${playerCounter + 1}'s turn. Hit 'submit' to roll.`;
      gameState = "roll";
      console.log(gameState);
      playerCounter += 1;
      break;
    }

    //gamestate = choose and final player has played
    if (gameState == "choose" && playerCounter >= maxPlayers) {
      var score = setScore(input, dice1, dice2);
      playerNumbers.push(score);
      console.log("Score: ", score);
      myOutputValue = `Player ${playerCounter}, you chose Dice ${input} first.<br>
        Your number is ${score}.<br>
        Hit 'Submit' again to see who won.`;
      console.log(gameState);
      gameState = "evaluate";
      console.log(gameState);
      break;
    }
  }

  //gamestate = evaluate and return final result
  if (gameState == "evaluate") {
    var results = evalScore(playerNumbers);
    console.log(results);
    highestScore = results[0];
    playerIndex = results[1];
    myOutputValue = `Player ${
      playerIndex + 1
    } won with a score of ${highestScore}!<br>Hit 'submit' to restart the game.`;
    gameState = "";
    playerCounter = 1;
    console.log(gameState, playerCounter);
  }
  return myOutputValue;
};

//HELPER FUNCTIONS//

//roll dice function
function rollDice() {
  var diceRoll = Math.ceil(Math.random() * 6);
  return diceRoll;
}

//store score function
function setScore(input, dice1, dice2) {
  if (input == 1) {
    var score = dice1 * 10 + dice2;
  } else score = dice2 * 10 + dice1;
  return score;
}

//eval score function
function evalScore(playerNumbers) {
  var highestScore = Math.max(...playerNumbers);
  var playerIndex = playerNumbers.indexOf(highestScore);
  return [highestScore, playerIndex];
}
