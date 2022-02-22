var player1dice = [];
var player2dice = [];
var player1DiceNumber = 0;
var player2DiceNumber = 0;
var myOutputvalue = ``;
var player1score = 0;
var player2score = 0;
var recordP1 = [];
var recordP2 = [];
var gameMode = `Player 1 dice`;

var rollDice = function () {
  var diceNumber = Math.ceil(Math.random() * 6);
  return diceNumber;
};

var main = function (input) {
  if (input == `result`) {
    message1 = `Player 1 wins ${player1score} rounds, Player 2 wins ${player2score} rounds.<br><br>`;
    var i = 0;
    var messageArray = [];
    while (i < recordP1.length) {
      messageArray.push(
        `Round ${i + 1}: ${recordP1[i]} - ${recordP2[i]}. <br>`
      );
      i++;
    }
    return message1 + messageArray.join(" ");
  }

  if (gameMode == `Player 1 dice`) {
    player1dice = [];
    for (var i = 0; i < 2; i++) {
      player1dice.push(rollDice());
    }
    myOutputvalue = `1️⃣Player 1: 1️⃣<br><br> You have rolled ${player1dice[0]} for Dice one, ${player1dice[1]} for Dice two. <br><br> Please choose the order by entering "1" or "2". `;
    gameMode = `player 1 choose order`;
    return myOutputvalue;
  }

  if (gameMode == `player 1 choose order`) {
    if (input != 1 && input != 2) {
      myOutputvalue = `Please only choose 1 or 2. `;
      return myOutputvalue;
    }

    if (input == 1) {
      player1DiceNumber = Number(
        String(player1dice[0]) + String(player1dice[1])
      );
      myOutputvalue = `1️⃣Player 1: 1️⃣<br><br> You choose dice 1 first. Your number is ${player1DiceNumber}. <br><br><br>🔻Please click Submit for Player 2 to roll the Dice. `;
      gameMode = `Player 2 dice`;
      return myOutputvalue;
    }
    if (input == 2) {
      player1DiceNumber = Number(
        String(player1dice[1]) + String(player1dice[0])
      );
      myOutputvalue = `1️⃣Player 1: 1️⃣<br><br> You choose dice 2 first. Your number is ${player1DiceNumber}. <br><br><br>🔻Please click Submit for Player 2 to roll the Dice. `;
      gameMode = `Player 2 dice`;
      return myOutputvalue;
    }
  }
  if (gameMode == `Player 2 dice`) {
    player2dice = [];
    for (var i = 0; i < 2; i++) {
      player2dice.push(rollDice());
    }
    myOutputvalue = `2️⃣Player 2: 2️⃣<br><br> You have rolled ${player2dice[0]} for Dice one, ${player2dice[1]} for Dice two. <br><br> Please choose the order by entering "1" or "2". `;
    gameMode = `player 2 choose order`;
    return myOutputvalue;
  }

  if (gameMode == `player 2 choose order`) {
    if (input != 1 && input != 2) {
      myOutputvalue = `Please only choose 1 or 2. `;
      return myOutputvalue;
    }

    if (input == 1) {
      player2DiceNumber = Number(
        String(player2dice[0]) + String(player2dice[1])
      );
      myOutputvalue = `2️⃣Player 2: 2️⃣<br><br> You choose dice 1 first. Your number is ${player2DiceNumber}. <br><br><br>🔻Please click Submit to see who is the winner. `;
      gameMode = `Compare`;
      return myOutputvalue;
    }
    if (input == 2) {
      player2DiceNumber = Number(
        String(player2dice[1]) + String(player2dice[0])
      );
      myOutputvalue = `2️⃣Player 2: 2️⃣<br><br> You choose dice 2 first. Your number is ${player2DiceNumber}. <br><br><br>🔻Please click Submit to see who is the winner. `;
      gameMode = `Compare`;
      return myOutputvalue;
    }
  }
  if (gameMode == "Compare") {
    var diff = player1DiceNumber - player2DiceNumber;
    console.log(diff);
    if (diff > 0) {
      myOutputvalue = `🥇Player 1 Win! <br><br>`;
      player1score += 1;
    } else if (diff < 0) {
      myOutputvalue = `🥇Player 2 Win! <br><br>`;
      player2score += 1;
    }
    myOutputvalue =
      myOutputvalue +
      `1️⃣Player 1 number is ${player1DiceNumber}.<br> 2️⃣Player 2 number is ${player2DiceNumber}`;
    recordP1.push(player1DiceNumber);
    recordP2.push(player2DiceNumber);
    gameMode = `Player 1 dice`;

    return myOutputvalue;
  }
};
