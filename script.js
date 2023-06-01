gameMode = "playerRollDice";
var playerRollDice = [];
var player = 1;
var TotalplayerResult = [];

var diceRoll = function () {
  var randomInteger = Math.floor(Math.random() * 6) + 1;
  return randomInteger;
};
//RollDice function
function playerDiceRoll() {
  for (var counter = 0; counter < 2; counter += 1) {
    playerRollDice.push(diceRoll());
  }
  console.log("Dice1: " + playerRollDice[0] + " Dice2: " + playerRollDice[1]);
  return `Welcome Player ${player}<br /> You rolled ${playerRollDice[0]} for Dice 1 and ${playerRollDice[1]} for Dice 2<br />
  Select dice 1 or dice 2`;
}

//specifyDice function
function specifyDice(playerInput) {
  var playerResult = "";
  if (playerInput != 1 && playerInput != 2) {
    return " Select dice 1 or dice 2";
  }
  if (playerInput == 1) {
    var playerResult = playerRollDice[0] * 10 + playerRollDice[1];
  }
  if (playerInput == 2) {
    var playerResult = playerRollDice[1] * 10 + playerRollDice[0];
  }
  TotalplayerResult.push(playerResult);
  playerRollDice = [];
  return `Player ${player}, you chose Dice ${playerInput} first<br />
      Your number is ${playerResult}<br />`;
}
// Compare result
function compareResult() {
  if (TotalplayerResult[0] > TotalplayerResult[1]) {
    return `player 1 number is ${TotalplayerResult[0]}<br /> player 1 wins`;
  }
  if (TotalplayerResult[0] == TotalplayerResult[1]) {
    return `player 1 number is ${TotalplayerResult[0]}<br /> draw!!!`;
  } else {
    return `player 1 number is ${TotalplayerResult[0]}<br /> player 2 wins`;
  }
}

var main = function (input) {
  var output = "";
  console.log("gamemode " + gameMode);
  console.log("player: " + player);
  if (gameMode == "playerRollDice") {
    output = playerDiceRoll();
    gameMode = "specifiyingDice";
    return output;
  }

  if (gameMode == "specifiyingDice") {
    output = specifyDice(input);
    if (player == 1) {
      player = 2;
      gameMode = "playerRollDice";
      return output + "It is now Player 2's turn";
    }
    var resultOutcome = compareResult();
    return output + resultOutcome;
  }

  return output;
};
