var playerMode = "Player1Rolls";
var player1Dice = [];
var player2Dice = [];
var combinedInt1 = "";
var combinedInt2 = "";
var generateRandomDice = function () {
  randomNumber = Math.floor(Math.random() * 6) + 1;
  return randomNumber;
};

var main = function (input) {
  var myOutputValue = "";

  // Player1 click submit and roll 2 dice
  if (playerMode === "Player1Rolls") {
    var index = 0;
    while (index < 2) {
      player1Dice.push(generateRandomDice());
      index += 1;
      console.log(player1Dice);
    }

    myOutputValue = `Player 1's dice selection: ${player1Dice} <br> You can pick the highest combination by inputting 'high' or pick the lowest combination by inputting 'low'`;
    playerMode = "Player1Pick";
  }
  if (playerMode === "Player1Pick" && input === "high") {
    combinedInt1 = Number(
      String(Math.max(player1Dice[0], player1Dice[1])) +
        String(Math.min(player1Dice[0], player1Dice[1]))
    );
    console.log(combinedInt1);

    myOutputValue = `You chose the 1st dice as your 1st integer <br> Player 1's number is ${combinedInt1} <br> Please click submit to continue.`;
    playerMode = "Player1Result";
  }

  if (playerMode === "Player1Pick" && input === "low") {
    combinedInt1 = Number(
      String(Math.min(player1Dice[0], player1Dice[1])) +
        String(Math.max(player1Dice[0], player1Dice[1]))
    );
    console.log(combinedInt1);

    myOutputValue = `You chose the 2nd dice as your 1st integer <br> Player 1's number is ${combinedInt1} <br> Please click submit to continue. `;
    playerMode = "Player1Result";
  }

  if (playerMode === "Player1Result" && input == "") {
    myOutputValue = `Player 1: You have chosen ${combinedInt1} as your number, now its player 2's turn <br> Please click submit.`;
    playerMode = "Player2Starts";
  }

  if (playerMode === "Player2Starts") {
    myOutputValue = `Player 2, please click submit to start your game!`;
    playerMode = "Player2Rolls";
  }

  if (playerMode === "Player2Rolls" && input == "") {
    var index2 = 0;
    while (index2 < 2) {
      player2Dice.push(generateRandomDice());
      index2 += 1;
      console.log(player2Dice);
    }
    myOutputValue = `Player 2's dice selection: ${player2Dice} <br> You can pick the highest combination by inputting 'high' or pick the lowest combination by inputting 'low'`;
    playerMode = "Player2Pick";
  }

  // Player rolling dice
  if (playerMode === "Player2Pick" && input === "high") {
    combinedInt2 = Number(
      String(Math.max(player2Dice[0], player2Dice[1])) +
        String(Math.min(player2Dice[0], player2Dice[1]))
    );
    console.log(combinedInt2);

    myOutputValue = `You chose the 1st dice as your 1st integer <br> Player 2's number is ${combinedInt2} <br> Please click submit to continue.`;
    playerMode = "Result";
  }

  if (playerMode === "Player2Pick" && input === "low") {
    combinedInt2 = Number(
      String(Math.min(player2Dice[0], player2Dice[1])) +
        String(Math.max(player2Dice[0], player2Dice[1]))
    );
    console.log(combinedInt2);

    myOutputValue = `You chose the 2nd dice as your 1st integer <br> Player 2's number is ${combinedInt2} <br> Please click submit to continue. `;
    playerMode = "Result";
  }
  if (playerMode == "Result" && input == "") {
    playerMode = "Winner";
  }
  if (playerMode == "Winner" && input == "" && combinedInt1 > combinedInt2) {
    myOutputValue = `Player 1's number is ${combinedInt1} <br> Player 2's number is ${combinedInt2} <br> Player 1 won!`;
  }

  if (playerMode == "Winner" && input == "" && combinedInt2 > combinedInt1) {
    myOutputValue = `Player 1's number is ${combinedInt1} <br> Player 2's number is ${combinedInt2} <br> Player 2 won!`;
  }

  return myOutputValue;
};
