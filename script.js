// mode 0 = select mode, mode 1 = normal, mode 2 = lowest combine, mode 3 = variable number of dice, mode 4 = knock out

var mode = 0;
player1 = [];
player2 = [];
// playerselected 10 = results stage
playerselected = 1;
player1number = "";
player2number = "";
noofrolls = 0;
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
    player1number = string2num(sorteddiceroll[0], sorteddiceroll[1]);
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

var string2num = function (num1, num2) {
  return Number(String(num1) + String(num2));
};

var lowestCombinedMode = function () {
  noofrolls = 2;
  if (playerselected == 1) {
    var diceroll = rolldice();
    console.log("diceroll1" + diceroll);
    var sorteddiceroll = diceroll.sort((a, b) => a - b);
    console.log("dicerollA" + diceroll);
    player1number = string2num(sorteddiceroll[0], sorteddiceroll[1]);
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
