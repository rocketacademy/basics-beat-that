//gameState
var gameState = "waiting for dice roll";
//player turn, player 1 = 0, player 2 = 1
var playerTurn = 0;
//store player results in array
const diceResults = [0, 0];
const diceRoll = [0, 0];
const playerResult = [0, 0];
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

var main = function (input) {
  var myOutputValue = "hello world";
  if (gameState == "waiting for dice roll") {
    diceRoll[0] = rollDice();
    diceRoll[1] = rollDice();
    gameState = "pick dice";
    return `Welcome Player ${playerTurn + 1}! <br>
    You rolled ${diceRoll[0]} for Dice 1 and ${diceRoll[1]} for Dice 2. <br>
    Choose the order of the dice. 
    Type '1' for Dice 1, type '2' for Dice 2.`;
  } else if (gameState == "pick dice") {
    diceResults[playerTurn] = Number(
      "" + diceRoll[input - 1] + diceRoll[input % 2]
    );
    console.log(diceResults);
    gameState = "waiting for dice roll";
    myOutputValue = `Player ${[playerTurn + 1]}, you chose Dice ${input} first.
    <br> Your number is ${diceResults[playerTurn]}.<br>`;
    if (playerTurn == 0) {
      //switch player turn
      playerTurn = (playerTurn + 1) % 2;
      myOutputValue += `It is now Player ${playerTurn + 1}'s turn.`;
    } else {
      var winner = 1;
      var winStatement = `Player ${winner} wins.`;
      playerResult[0] += 1;
      if (diceResults[1] > diceResults[0]) {
        winner = 2;
        winStatement = `Player ${winner} wins.`;
        playerResult[0] -= 1;
        playerResult[1] += 1;
      } else if (diceResults[1] > diceResults[0]) {
        winStatement = `It's a draw.`;
        playerResult[0] -= 1;
      }
      myOutputValue += `Player 1's number is ${diceResults[0]} and Player 2's number is ${diceResults[1]}. ${winStatement}.`;
      playerTurn = (playerTurn + 1) % 2;
    }
  }

  return `${myOutputValue} <br> The current score is Player 1:${playerResult[0]} and Player 2:${playerResult[1]}`;
};
