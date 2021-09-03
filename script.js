var curGameMode = "roll";
var diceRoll1 = 0;
var diceRoll2 = 0;
var numPlayers = 2;
var curPlayer = 1;
var playerScores = [];

var rollDice = function () {
  return Math.ceil(Math.random() * 6);
};

var getScore = function (firstDie) {
  return firstDie == 1
    ? diceRoll1 * 10 + diceRoll2
    : diceRoll2 * 10 + diceRoll1;
};

var resetGameState = function () {
  curGameMode = "roll";
  curPlayer = 1;
  playerScores = [];
};

var main = function (input) {
  var output = "";
  if (curGameMode == "roll") {
    diceRoll1 = rollDice();
    diceRoll2 = rollDice();
    curGameMode = "choose";

    output = `Welcome Player ${curPlayer}.<br>You rolled ${diceRoll1} for Dice 1 and ${diceRoll2} for Dice 2.<br><br>Choose the order of the dice.<br>Type 1 to put Dice 1 first, or type 2 to put Dice 2 first.`;
    return output;
  }

  if (curGameMode == "choose") {
    if (input != 1 && input != 2) {
      return `Invalid input. You rolled ${diceRoll1} for Dice 1 and ${diceRoll2} for Dice 2.<br>Choose the order of the dice.<br>Type 1 to put Dice 1 first, or type 2 to put Dice 2 first.`;
    }
    curGameMode = "roll";
    var score = getScore(input);
    playerScores.push(score);
    output = `Player ${curPlayer}, you chose Dice ${input} first.<br>Your number is ${score}.`;
    if (curPlayer < numPlayers) {
      curPlayer += 1;
      output += `<br>It is now Player ${curPlayer}'s turn.`;
    } else {
      output += "<br><br>";
      for (var j = 0; j < playerScores.length; j++) {
        output += `Player ${j + 1}'s number is ${playerScores[j]}.<br>`;
      }
      var winner = playerScores.indexOf(Math.max(...playerScores)) + 1;
      output += `The winner is Player ${winner}!`;
      resetGameState();
    }
    return output;
  }
};
