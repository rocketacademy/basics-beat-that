//1. Player 1 to roll dice
//2. Player 1 to decide order of dice
//3. Player 2 to roll dice
//4. Player 2 to decide order of dice
//5. Determine if Player 1 or 2 wins
//6. Game continues with running score being tabulated

var diceRoll_1 = "";
var diceRoll_2 = "";
var diceResult = "";
var player = "Player 1";
var winner = "";
var gameMode = "start";
var myOutputValue = "";
var player1score = [];
var player2score = [];
var player1runningscore = "";
var player2runningscore = "";
var leaderboard = "";

var diceRoll = function (input) {
  if (input == "roll") {
    diceRoll_1 = Math.floor(Math.random() * 6) + 1;
    diceRoll_2 = Math.floor(Math.random() * 6) + 1;
  }
};

var diceCombined = function (input) {
  if (input == 1) {
    diceResult = parseInt(diceRoll_1.toString() + diceRoll_2.toString());
  } else if (input == 2) {
    diceResult = parseInt(diceRoll_2.toString() + diceRoll_1.toString());
  }
};

var runningScore = function (array) {
  let sum = 0;

  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum;
};

var main = function (input) {
  while (gameMode == "start") {
    //set current player
    if (player1score.length > player2score.length) {
      player = "Player 2";
    } else {
      player = "Player 1";
    }
    myOutputValue = `Welcome ${player}, enter "roll" to go.`;
    gameMode = "play";
    return myOutputValue;
  }
  //player to start rolling
  while (gameMode == "play") {
    if (input == "roll") {
      diceRoll(input);
      myOutputValue = `${player}, you have rolled ${diceRoll_1} and ${diceRoll_2}. Enter 1 or 2 to set the order`;
    }
    //player to choose order
    if ((input == 1 || input == 2) && diceRoll_1 != "") {
      diceCombined(input);

      //record score
      if (player == "Player 1") {
        player1score.push(diceResult);
        console.log(player1score);
        myOutputValue = `${player}, your results are ${diceResult}. Next player, enter "roll" to go.`;
        gameMode = "play";
        player = "Player 2";
      } else if (player == "Player 2") {
        player2score.push(diceResult);
        gameMode = "score";
        myOutputValue = `Press "submit" for results`;
      }
    }
    return myOutputValue;
  }

  while (gameMode == "score") {
    // check winner after player 2
    player1currentscore = player1score[player1score.length - 1];
    player2currentscore = player2score[player2score.length - 1];

    // calculate running score
    player1runningscore = runningScore(player1score);
    player2runningscore = runningScore(player2score);

    // define top score
    if (player1runningscore > player2runningscore) {
      leaderboard = `Player 1 running score: ${player1runningscore} <br> Player 2 running score: ${player2runningscore} <br>`;
    } else if (player1runningscore < player2runningscore) {
      leaderboard = `Player 2 running score: ${player2runningscore} <br> Player 1 running score: ${player1runningscore} <br>`;
    }

    if (player1currentscore == player2currentscore) {
      myOutputValue = `Its a draw! <br><br> Player 1: ${player1currentscore} <br> Player 2: ${player2currentscore} <br>>br> Click "submit" to go again! <br><br> Leaderboard <br> ${leaderboard}`;
    } else {
      if (player1currentscore > player2currentscore) {
        winner = "Player 1";
      } else {
        winner = "Player 2";
      }
      myOutputValue = `${player}, your results are ${diceResult}. <br>
    Congrats ${winner}, you win! <br><br> Player 1: ${player1currentscore} <br> Player 2: ${player2currentscore} <br><br>Click "submit" to go again! <br><br> Leaderboard <br> ${leaderboard}`;
    }
    gameMode = "start";
    return myOutputValue;
  }
};
