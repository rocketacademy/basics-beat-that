// mode 0 = select mode, mode 1 = normal, mode 2 = lowest combine, mode 3 = variable number of dice, mode 4 = knock out

var mode = 0;
var selectDiceMode = 0;
player1 = [];
player2 = [];
// playerselected 10 = results stage
playerselected = 1;
player1number = "";
player2number = "";
noofrolls = 0;
playerlist = [1, 2, 3, 4];
knockoutround = 1;
playerToBeElelimated = "";
roundwinner = 0;
currPlayer = 0;

var main = function (input) {
  if (mode == 0) {
    return selectmode(input);
  }
  if (mode == 1) {
    return normalmode();
  }
  if (mode == 2) {
    return lowestCombinedMode();
  }

  if (mode == 3) {
    return variableDice(input);
  }
  if (mode == 4) {
    return knockout(input);
  }
};

var rolldice = function () {
  counter = 0;
  dicerolls = [];
  while (counter < noofrolls) {
    randomNum = Math.floor(Math.random() * 6 + 1);
    dicerolls.push(randomNum);
    counter += 1;

    console.log(randomNum);
    console.log("dicerolls" + dicerolls);
  }

  return dicerolls;

  //var sortedDiceRolls = dicerolls.sort((a, b) => b - a);
  //console.log(sortedDiceRolls);

  //return sortedDiceRolls;
};

var selectmode = function (input) {
  if (input != 1 && input != 2 && input != 3 && input != 4) {
    return `Please select a valid mode <br> 1. Normal Mode <br> 2. Lowest Combined <br> 3. Variable Number of Dice <br> 4. Knockout`;
  }
  if (input == 1) {
    mode = 1;
    return `You have selected Normal mode`;
  }
  if (input == 2) {
    mode = 2;
    return `You have selected Lowest Combined mode`;
  }
  if (input == 3) {
    mode = 3;
    return `You have selected Variable Number of Dice mode`;
  }
  if (input == 4) {
    mode = 4;
    return `You have selected Knock Out mode`;
  }
};

var normalmode = function () {
  noofrolls = 2;
  if (playerselected == 1) {
    var diceroll = rolldice();
    console.log("diceroll1" + diceroll);
    var sorteddiceroll = diceroll.sort((a, b) => b - a);
    console.log("dicerollA" + diceroll);
    //player1number = string2num(sorteddiceroll[0], sorteddiceroll[1]);
    player1number = string2num1(sorteddiceroll);
    console.log(player1number);
    playerselected = 2;

    return `🎲 PLAYER 1 🎲 you rolled ${diceroll} your number is ${player1number} <br> It is now Player 2's turn.`;
  }
  if (playerselected == 2) {
    var diceroll = rolldice();
    var sorteddiceroll = diceroll.sort((a, b) => b - a);
    player2number = string2num(sorteddiceroll[0], sorteddiceroll[1]);
    console.log(player2number);
    playerselected = 0;

    //return diceroll;
    return `🎲 PLAYER 2 🎲 you rolled ${diceroll} your number is ${player2number} <br> Press submit to see results `;
  }

  return winnerDecider();
};

var winnerDecider = function () {
  if (player1number > player2number) {
    playerselected = 1;
    roundwinner = playerlist[0];
    playerToBeElelimated = playerlist[1];

    return `Winner is Player ${roundwinner}. <br> First Player Number is ${player1number} <br> Second Player Number is ${player2number} <br> Press Submit to play again`;
  }
  if (player2number > player1number) {
    playerselected = 1;
    roundwinner = playerlist[1];
    playerToBeElelimated = playerlist[0];

    return `Winner is Player ${roundwinner}. <br> First Player Number is ${player1number} <br> Second Player Number is ${player2number} <br> Press Submit to play again`;
  }
  playerselected = 1;
  return ` Its a tie! First Player  Number is ${player1number} <br> Second Player  Number is ${player2number} <br> Press Submit to play again`;
};

var string2num = function (num1, num2) {
  return Number(String(num1) + String(num2));
};

var string2num1 = function (array) {
  console.log(array + "array");
  //var i = 0;
  var stringValue = "";
  for (var counter = 0; counter < array.length; counter += 1) {
    stringValue = stringValue + array[counter];
    //i = i + 1;
  }
  return Number(stringValue);
};

var lowestCombinedMode = function () {
  noofrolls = 2;
  if (playerselected == 1) {
    var diceroll = rolldice();
    console.log("diceroll1" + diceroll);
    var sorteddiceroll = diceroll.sort((a, b) => a - b);
    console.log("dicerollA" + diceroll);
    //player1number = string2num(sorteddiceroll[0], sorteddiceroll[1]);
    player1number = string2num1(sorteddiceroll);
    console.log(player1number);
    playerselected = 2;

    return `🎲 PLAYER 1 🎲 you rolled ${diceroll} your number is ${player1number} <br> It is now Player 2's turn.`;
  }
  if (playerselected == 2) {
    var diceroll = rolldice();
    var sorteddiceroll = diceroll.sort((a, b) => a - b);
    player2number = string2num(sorteddiceroll[0], sorteddiceroll[1]);
    console.log(player2number);
    playerselected = 0;

    //return diceroll;
    return `🎲 PLAYER 2 🎲 you rolled ${diceroll} your number is ${player2number} <br> Press submit to see results `;
  }
  if (player1number < player2number) {
    playerselected = 1;
    return `Winner is Player 1. <br> Player 1 Number is ${player1number} <br> Player 2 Number is ${player2number} <br> Press Submit to play again`;
  }
  if (player2number < player1number) {
    playerselected = 1;
    return `Winner is Player 2. <br> Player 1 Number is ${player1number} <br> Player 2 Number is ${player2number} <br> Press Submit to play again`;
  }
  playerselected = 1;
  return ` Its a tie! Player 1 Number is ${player1number} <br> Player 2 Number is ${player2number} <br> Press Submit to play again`;
};

var variableDice = function (input) {
  console.log(input);

  if (selectDiceMode == 0 && input > 0) {
    noofrolls = input;
    selectDiceMode = 1;
  } else if (selectDiceMode == 0) {
    return `Please enter number of rolls`;
  }

  if (playerselected == 1) {
    var diceroll = rolldice();
    console.log("diceroll1" + diceroll);
    var sorteddiceroll = diceroll.sort((a, b) => b - a);
    console.log("dicerollA" + diceroll);
    player1number = string2num1(sorteddiceroll);
    console.log(player1number);
    playerselected = 2;

    return `🎲 PLAYER 1 🎲 you rolled ${diceroll} your number is ${player1number} <br> It is now Player 2's turn.`;
  }
  if (playerselected == 2) {
    var diceroll = rolldice();
    console.log("diceroll1" + diceroll);
    var sorteddiceroll = diceroll.sort((a, b) => b - a);
    console.log("dicerollA" + diceroll);
    player2number = string2num1(sorteddiceroll);
    console.log(player2number);
    playerselected = 0;

    //return diceroll;
    return `🎲 PLAYER 2 🎲 you rolled ${diceroll} your number is ${player2number} <br> Press submit to see results `;
  }
  if (player1number > player2number) {
    playerselected = 1;
    return `Winner is Player 1. <br> Player 1 Number is ${player1number} <br> Player 2 Number is ${player2number} <br> Press Submit to play again`;
  }
  if (player2number > player1number) {
    playerselected = 1;
    return `Winner is Player 2. <br> Player 1 Number is ${player1number} <br> Player 2 Number is ${player2number} <br> Press Submit to play again`;
  }
  playerselected = 1;
  return ` Its a tie! Player 1 Number is ${player1number} <br> Player 2 Number is ${player2number} <br> Press Submit to play again`;
};

//var variableDice function (input)
var knockout = function (input) {
  noofrolls = 2;
  if (playerlist.length == 1) {
    playerlist = [1, 2, 3, 4];
    return `Player ${roundwinner} is the winner!!!!!`;
  }

  if (playerselected == 1) {
    currPlayer = playerlist[0];
    var diceroll = rolldice();
    //console.log("diceroll1" + diceroll);
    var sorteddiceroll = diceroll.sort((a, b) => b - a);
    //console.log("dicerollA" + diceroll);
    //player1number = string2num(sorteddiceroll[0], sorteddiceroll[1]);
    player1number = string2num1(sorteddiceroll);
    //console.log(player1number);
    playerselected = 2;

    return `🎲 PLAYER ${currPlayer} 🎲 you rolled ${diceroll} your number is ${player1number} <br> It is now Player 2's turn.`;
  }
  if (playerselected == 2) {
    currPlayer = playerlist[1];
    var diceroll = rolldice();
    var sorteddiceroll = diceroll.sort((a, b) => b - a);
    player2number = string2num(sorteddiceroll[0], sorteddiceroll[1]);
    console.log(player2number);
    playerselected = 0;

    //return diceroll;
    return `🎲 PLAYER ${currPlayer} 🎲 you rolled ${diceroll} your number is ${player2number} <br> Press submit to see results `;
  }

  if (player1number > player2number) {
    playerselected = 1;
    roundwinner = playerlist[0];
    playerToBeElelimated = playerlist[1];

    playerlist.splice(1, 1);

    playerlist.push(playerlist.shift());

    return `Winner is Player ${roundwinner}. <br> First Player Number is ${player1number} <br> Second Player Number is ${player2number} <br> Press Submit to play again`;
  }
  if (player2number > player1number) {
    playerselected = 1;
    roundwinner = playerlist[1];
    playerToBeElelimated = playerlist[0];
    playerlist.splice(0, 1);

    playerlist.push(playerlist.shift());

    return `Winner is Player ${roundwinner}. <br> First Player Number is ${player1number} <br> Second Player Number is ${player2number} <br> Press Submit to play again`;
  }
  playerselected = 1;
  return ` Its a tie! First Player  Number is ${player1number} <br> Second Player  Number is ${player2number} <br> Press Submit to play again`;
};
