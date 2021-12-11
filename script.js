// -------- define global variables ------- //
// default game mode starts with normal(player 1)
var gameMode = "player 1";
var currentPlayer = 1;
// record players' dice rolls in arrays
var player1Dice = [];
var player2Dice = [];
// the numbers that decided by players
var player1Num = "";
var player2Num = "";
// create another array to push in player's chosen numbers
var player1NumArray = [];
var player2NumArray = [];
// create a variable for the sum of numbers of player's numbers
var sumOfPlayer1Num = "";
var sumOfPlayer2Num = "";
// create another array to push in auto-generated low numbers
var player1LowArray = [];
var player2LowArray = [];
// create variable to store auto generated low dice roll numbers
var p1AutoLowNum = "";
var p2AutoLowNum = "";

// -------- helper functions -------- //

// create a dice roll function, number converted to a string value
var diceRoll = function () {
  var randomNum = Math.floor(Math.random() * 6 + 1);
  return randomNum.toString();
};
// get dice rolls function to input into player's arrays
var getDiceRoll = function () {
  var newDiceRolls = [diceRoll(), diceRoll()];

  //assign diceRolls into respective dice arrays
  if (currentPlayer == 1) {
    player1Dice = newDiceRolls;
  } else {
    player2Dice = newDiceRolls;
  }
  return newDiceRolls;
};
// create a function to combine 2 numbers
var combineDiceRolls = function (dice1, dice2) {
  return dice1 + dice2;
};
// combine and store player's number based on dice roll and chosen order of numbers
var playerChoice = function (input) {
  var playerNum = "";
  if (currentPlayer == 1) {
    if (input == 1) {
      playerNum = combineDiceRolls(player1Dice[0], player1Dice[1]);
    } else {
      playerNum = combineDiceRolls(player1Dice[1], player1Dice[0]);
    }
  } else {
    if (input == 1) {
      playerNum = combineDiceRolls(player2Dice[0], player2Dice[1]);
    } else {
      playerNum = combineDiceRolls(player2Dice[1], player2Dice[0]);
    }
  }
  return playerNum;
};
// decide who is a winner based on whose total number is bigger
var declareWinner = function () {
  if (sumOfPlayer1Num > sumOfPlayer2Num) {
    return 1;
  }
  return 2;
};

// decide who is a winner based on whose total number is smaller
var declareWinnerSmall = function () {
  if (sumOfPlayer1Num < sumOfPlayer2Num) {
    return 1;
  }
  return 2;
};
// leader board function to display total running scores
var leaderBoard = function (P1, P2) {
  return `Leader Board<br> Player 1: ${sumOfPlayer1Num}<br> Player 2: ${sumOfPlayer2Num}<br>`;
};
// -------- end of helper functions -------- //

// -------- main function -------- //

var main = function (input) {
  var myOutputValue = "";

  // user has a choice to toggle between auto or normal game mode
  // if game mode = normal, player gets to select dice1 or dice 2, highest wins
  // if game mode = auto, player number is auto generated, lowest wins

  if (input == "normal") {
    gameMode = "player 1";
    return `You are now in normal mode, click submit to continue!`;
  }

  if (input == "auto") {
    gameMode = "auto";
    return `You are now in auto mode, click submit to continue!`;
  }
  // start of normal game mode, generate roll dice for player 1
  if (gameMode == "player 1") {
    newDiceRolls = getDiceRoll();
    gameMode = "wait for player 1 choice";
    return `Welcome Player ${currentPlayer}. <br> You rolled ${player1Dice[0]} for the first 🎲 and ${player1Dice[1]} for the second 🎲.<br><br>Choose the order of the 🎲 by entering 1 or 2!`;
  }
  // wait for player 1 to input 1 or 2
  // input validation
  if (gameMode == "wait for player 1 choice") {
    if (input != 1 && input != 2) {
      return `Please choose either 1 or 2`;
    }
    gameMode = "player 2";
    // call function and store player number according to input
    // return message to let player know their number
    player1Num = playerChoice(input);
    console.log("player 1 number: " + player1Num);
    return `Player ${currentPlayer}, you chose dice ${input} and your number is ${player1Num}<br> It is now player 2's turn`;
  }
  // start mode for player 2, generate roll dice for player 2
  if (gameMode == "player 2") {
    currentPlayer = 2;
    newDiceRolls = getDiceRoll();
    gameMode = "wait for player 2 choice";
    return `Welcome Player ${currentPlayer}. <br> You rolled ${player2Dice[0]} for the first 🎲 and ${player2Dice[1]} for the second 🎲.<br><br>Choose the order of the 🎲 by entering 1 or 2!`;
  }
  // wait for player 2 to input 1 or 2
  // input validation
  if (gameMode == "wait for player 2 choice") {
    if (input != 1 && input != 2) {
      return `Please choose either 1 or 2`;
    }
    gameMode = "declare winner";
    // call function and store player number according to input
    // return message to let player know their number
    player2Num = playerChoice(input);
    console.log("player 2 number: " + player2Num);
    return `Player ${currentPlayer}, you chose dice ${input} and your number is ${player2Num}<br> Click submit to see who is the winner`;
  }
  if (gameMode == "declare winner") {
    // push player 1 and player 2 numbers into a new array
    player1NumArray.push(Number(player1Num));
    player2NumArray.push(Number(player2Num));
    // sum up the numbers in the array after every round
    // reset the sum of player numbers to 0
    sumOfPlayer1Num = 0;

    for (var i = 0; i < player1NumArray.length; i += 1) {
      sumOfPlayer1Num += player1NumArray[i];
    }
    console.log("Player 1 total: " + sumOfPlayer1Num);

    sumOfPlayer2Num = 0;

    for (var i = 0; i < player2NumArray.length; i += 1) {
      sumOfPlayer2Num += player2NumArray[i];
    }
    console.log("Player 2 total: " + sumOfPlayer2Num);
    // winner is declared depending on which player's sum of number is bigger

    //reset the game
    currentPlayer = 1;
    gameMode = "player 1";

    // call the winner function and declare who is the winner based on total
    var whoIsTheWinner = declareWinner();
    var leaderBoard1 = leaderBoard(sumOfPlayer1Num, sumOfPlayer2Num);

    myOutputValue = `👑Player ${whoIsTheWinner} is leading!👑<br><br>
  ${leaderBoard1}Press submit to play again!`;
  }

  // create a new game mode = auto
  // if player gameMode = auto

  // output player's auto generated low numbers
  // push the numbers into player's num array
  // add the numbers as the rounds continue

  if (gameMode == "auto") {
    // after dice roll, push player's 2 dice roll into a an array, where it will then go through sorting
    currentPlayer = 1;
    newDiceRolls = getDiceRoll();
    gameMode = "auto player 2";
    player1Dice.sort(function (a, b) {
      return a - b;
    });
    // return sorted dice number and combine sorted array [0] and [1] into new variable (auto generated low number)
    p1AutoLowNum = combineDiceRolls(player1Dice[0], player1Dice[1]);
    console.log(`player 1 auto-gen: ` + p1AutoLowNum);

    return `This is an auto-generated dice roll.<br><br> Player ${currentPlayer} rolled ${p1AutoLowNum}!`;
  }

  if (gameMode == "auto player 2") {
    currentPlayer = 2;
    newDiceRolls = getDiceRoll();
    gameMode = "auto winner";
    player2Dice.sort(function (a, b) {
      return a - b;
    });

    p2AutoLowNum = combineDiceRolls(player2Dice[0], player2Dice[1]);
    console.log(`player 2 auto-gen: ` + p2AutoLowNum);
    return `This is an auto-generated dice roll.<br><br> Player ${currentPlayer} rolled ${p2AutoLowNum}!`;
  }

  if (gameMode == "auto winner") {
    // push player1 and player2 numbers into a new low array
    player1LowArray.push(Number(p1AutoLowNum));
    player2LowArray.push(Number(p2AutoLowNum));

    // sum up the numbers in the array after every round
    // reset the sum of player numbers to 0
    sumOfPlayer1Num = 0;

    for (var i = 0; i < player1LowArray.length; i += 1) {
      sumOfPlayer1Num += player1LowArray[i];
    }
    console.log(`Sum of P1 low: ` + sumOfPlayer1Num);

    sumOfPlayer2Num = 0;

    for (var i = 0; i < player2LowArray.length; i += 1) {
      sumOfPlayer2Num += player2LowArray[i];
    }
    console.log(`Sum of P2 low: ` + sumOfPlayer2Num);

    var whoIsTheSmallWinner = declareWinnerSmall();
    var leaderBoard2 = leaderBoard(sumOfPlayer1Num, sumOfPlayer2Num);
    // reset game
    currentPlayer = 1;
    gameMode = "auto";

    myOutputValue = `Auto-generated dice-roll mode:<br><br>Player 1 rolled ${p1AutoLowNum} and Player 2 rolled ${p2AutoLowNum}! <br><br> 👑Player ${whoIsTheSmallWinner} is leading!👑 <br><br> ${leaderBoard2}`;
  }

  return myOutputValue;
  // --------- end of main function ---------- //
};
