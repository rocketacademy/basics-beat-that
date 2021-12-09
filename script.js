// There are 2 players and players take turns.
var ENTERPLAYERNAME = `player enters name`;
var ROLLDICE = `player rolls dice`;
var DICEORDER = `player chooses dice order`;
var COMPARENUMBERS = `compare final nunmbers`;
var gameMode = ENTERPLAYERNAME;
var playerNames = [];
var playerDiceNum = [];
var playerFinalNum = [];
var isPlayer1turn = true;

//players enter name
var enterPlayerName = function (inputUserName) {
  var message = ``;
  playerNames.push(inputUserName);
  console.log("starting:" + gameMode);
  console.log(playerNames);
  if (gameMode == ENTERPLAYERNAME && isPlayer1turn == true) {
    message =
      `Hello <b>${playerNames[0]}</b>, let's play Beat That!` +
      "<br><br>Press the <b>Submit</b> button to roll the two dice.";
    gameMode = ROLLDICE;
    console.log("after player 1 name :" + gameMode);
    return message;
  } else if (gameMode == ENTERPLAYERNAME && isPlayer1turn == false) {
    message =
      `Hello <b>${playerNames[1]}</b>, let's see if you can beat ${playerNames[0]}!` +
      "<br><br>Press the <b>Submit</b> button to roll the two dice.";
    gameMode = ROLLDICE;
    console.log("after player 2 name :" + gameMode);
    return message;
  }
};

// When player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var number = randomInteger + 1;
  return number;
};

var getTwoDiceNum = function () {
  var message = ``;

  if (gameMode == ROLLDICE && isPlayer1turn == true) {
    var diceNum1 = rollDice();
    var diceNum2 = rollDice();
    console.log(`dice num1: ${diceNum1}, dice num2: ${diceNum2}`);
    message =
      `${playerNames[0]}, you rolled a <b>${diceNum1}</b> for Dice 1 and a <b>${diceNum2} </b>for Dice 2.` +
      "<br><br><u>Choose the order of the dice: </u><br>Enter <b>1</b> to put dice 1 first. <br>Enter <b>2</b> to put dice 2 first.";
    gameMode = DICEORDER;
    playerDiceNum.push(diceNum1);
    playerDiceNum.push(diceNum2);
    console.log(`player1 dice: ` + playerDiceNum[0] + ", " + playerDiceNum[1]);
    return message;
  } else if (gameMode == ROLLDICE && isPlayer1turn == false) {
    var diceNum1 = rollDice();
    var diceNum2 = rollDice();
    console.log(`dice num1: ${diceNum1}, dice num2: ${diceNum2}`);
    message =
      `${playerNames[1]}, you rolled a <b>${diceNum1}</b> for Dice 1 and a <b>${diceNum2} </b>for Dice 2.` +
      "<br><br><u>Choose the order of the dice: </u><br>Enter <b>1</b> to put dice 1 first. <br>Enter <b>2</b> to put dice 2 first.";
    gameMode = DICEORDER;
    playerDiceNum.push(diceNum1);
    playerDiceNum.push(diceNum2);
    console.log(`player2 dice: ` + playerDiceNum[2] + ", " + playerDiceNum[3]);
    return message;
  }
};

// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
var orderDice = function (userChoice) {
  var message = ``;
  var playerChoice = ``;
  if (gameMode == DICEORDER && isPlayer1turn == true) {
    if (!(userChoice == `1` || userChoice == `2`)) {
      message =
        `Please enter <b>1</b> or <b>2</b>.` +
        "<br><br>" +
        `In case you forgot, you rolled a <b>${playerDiceNum[0]}</b> for dice 1 and a <b>${playerDiceNum[1]} </b>for dice 2. `;
      return message;
    } else {
      if (userChoice == `1`) {
        playerChoice = `${playerDiceNum[0]}` + `${playerDiceNum[1]}`;
      } else if (userChoice == `2`) {
        playerChoice = `${playerDiceNum[1]}` + `${playerDiceNum[0]}`;
      }
      playerFinalNum.push(playerChoice);
      message =
        `<b>${playerNames[0]}</b>, your number is <b>${playerFinalNum[0]}</b>. ` +
        "<br><br>It's the next player's turn now! <br><br>Player 2, please enter your <b>name</b>.";
      console.log(`player 1 num: ` + playerFinalNum[0]);
      gameMode = ENTERPLAYERNAME;
      console.log("after play 1 choice: " + gameMode);
      isPlayer1turn = false;
      return message;
    }
  } else if (gameMode == DICEORDER && isPlayer1turn == false) {
    if (!(userChoice == `1` || userChoice == `2`)) {
      message =
        `Please enter <b>1</b> or <b>2</b>.` +
        "<br><br>" +
        `In case you forgot, you rolled a <b>${playerDiceNum[2]}</b> for dice 1 and a <b>${playerDiceNum[3]} </b>for dice 2. `;
      return message;
    } else {
      if (userChoice == `1`) {
        playerChoice = `${playerDiceNum[2]}` + `${playerDiceNum[3]}`;
      } else if (userChoice == `2`) {
        playerChoice = `${playerDiceNum[3]}` + `${playerDiceNum[2]}`;
      }
      playerFinalNum.push(playerChoice);
      message =
        `<b>${playerNames[1]}</b>, your number is <b>${playerFinalNum[1]}</b>.` +
        "<br><br>Press <b>submit</b> to see who has won!";
      console.log(`player 2 num: ` + playerFinalNum[1]);
      gameMode = COMPARENUMBERS;
      console.log("after player 2 choice: " + gameMode);
      return message;
    }
  }
};

// After both players have rolled and chosen dice order, the player with the higher combined number wins.
var compareFinalNum = function () {
  var message = ``;
  if (gameMode == COMPARENUMBERS) {
    if (playerFinalNum[0] > playerFinalNum[1]) {
      message = `Congrats <b>${playerNames[0]}</b>, you won!`;
    } else if (playerFinalNum[1] > playerFinalNum[0]) {
      message = `Congrats <b>${playerNames[1]}</b>, you won!`;
    }
    result =
      "<b>RESULTS:</b> <br><br>" +
      `${playerNames[0]}'s number: ${playerFinalNum[0]} ` +
      "<br>" +
      `${playerNames[1]}'s number: ${playerFinalNum[1]}` +
      "<br><br>";
    return result + message;
  }
};

var main = function (input) {
  var myOutputValue = ``;
  if (gameMode == ENTERPLAYERNAME) {
    myOutputValue = enterPlayerName(input);
  } else if (gameMode == ROLLDICE) {
    myOutputValue = getTwoDiceNum();
  } else if (gameMode == DICEORDER) {
    myOutputValue = orderDice(input);
  } else if (gameMode == COMPARENUMBERS) {
    myOutputValue = compareFinalNum();
  }
  return myOutputValue;
};
