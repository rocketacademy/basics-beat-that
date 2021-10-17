var playersScore = [0, 0]; // holds players scores
var player1DiceArray = []; // holds array of dice rolls
var player2DiceArray = []; //     "
var diceOrder1 = ""; // dice order taken by player 1
var diceOrder2 = ""; // dice order taken by player 2
var currentPlayer = 1; // control flow of players
var gameRound = 9; // control flow: acts as counter to end game at 10th and to also start game
var userNameRound = 1; // control flow:: forces players to input names
var players = []; // array store of players names
var playing = true; // Control flow of rolling dice

// random dice roll function
var diceRoll = function (num) {
  var randomDecimal = Math.random() * num;
  var randomInteger = Math.floor(randomDecimal) + 1;
  return randomInteger;
};

// restart game Function to ground zero
var initGame = function () {
  playersScore = [0, 0];
  player1DiceArray = [];
  player2DiceArray = [];
  diceOrder1 = "";
  diceOrder2 = "";
  currentPlayer = 1;
  gameRound = 0;
  userNameRound = 1;
  players = [];
  return `Initialising game to ground zero. <br/><br/> Please introduce yourself Player 1 by keying in your name followed by Player 2`;
};

// browser output function
var main = function (input) {
  // round 10 auto reset or intentional "reset"
  if (gameRound == 10 || input == "reset") {
    var restartGame = initGame();
    return restartGame;
  }
  // forces players to input names // player 1 to start input first
  if (userNameRound == 1 && input == "") {
    players[0] = input;
    return `🤼👬 Both players, begin with player 1.<br/>🥳🥳 Please input your names.<br/> 😅📣 The game won't begin till you do so.`;
  }
  // stores player 1 name and guides player 2 to input name
  if (userNameRound == 1 && input !== "") {
    players[0] = input;
    userNameRound += 1;
    return `🙏 Thank you ${players[0]} for joining us 👨‍👩‍👦. <br/>🥈Player 2, please input your name as well.😅`;
  }
  // stores player 2 name // ends guiding player names input //intro message
  if (userNameRound == 2 && input !== "") {
    players[1] = input;
    userNameRound += 1; // ends guiding players to input names
    return `🙏 Thank you ${players[0]} and ${players[1]} for joining us, the game is set for 10 rounds and will auto reset.<br/><br/>❓❓ You may also reset the game at anytime by ✍✍ "reset".<br/><br/>🚦 ${players[0]}, you may 🏃‍♀️begin the game by pressing submit.`;
  }
  // notifies player--2 that input name is required and can't click submit to roll yet.
  if (userNameRound == 2 && input == "") {
    return `🤦‍♀️🤦‍♂️ Player 2, you have tried clicking submit before inputting your name.<br/> Please give us your 📛 name before the game begins🏃‍♀️.`;
  }

  // after game starts,guide players from input anything other than the following inputs "Dice 1", "Dice 2" or "" in relevant circumstances
  if (!(input == "Dice 1" || input == "Dice 2" || input == "")) {
    myOutputValue = `🛑 Do not recognise input. Only press submit to roll or input Dice 1 or Dice 2 when prompt.`;
    return myOutputValue;
  }

  // Player 1 to roll 2 dices and outputs to player and guides player to select dice order.
  if (playing && userNameRound > 2 && currentPlayer == 1 && input == "") {
    var diceRoll1 = diceRoll(6);
    player1DiceArray.push(diceRoll1); // adds dice value to array @ last position
    var diceRoll2 = diceRoll(6);
    player1DiceArray.push(diceRoll2);
    myOutputValue = `🤞 ${players[0]}, you rolled 🕐🐪 ${diceRoll1} for Dice 1 and 🕑🐫 ${diceRoll2} for Dice 2.<br> 👉👈 Choose by ✍✍ Dice 1 or Dice 2 to be first order.`;
    // stops submit to roll, but allows dice order
    playing = false;
    return myOutputValue;
  }
  // prevents players to roll more than once and guides players to input Dice 1 or Dice 2 for order selection
  if (!playing && input == "") {
    return `😡💢👿😠🗯<br/>Error. You are trying to roll when not supposed to. <br/>✍✍ "Dice 1" or "Dice 2" to determine your first dice order`;
  }

  // Player 2 to roll dices and outputs to player and guides player to select dice order.
  if (playing && currentPlayer == 2 && input == "") {
    var myOutputValue;
    diceRoll1 = diceRoll(6);
    player2DiceArray.push(diceRoll1);
    diceRoll2 = diceRoll(6);
    player2DiceArray.push(diceRoll2);
    //stops submit to roll but allows dice order
    playing = false;
    myOutputValue = `👩‍🦰 ${players[1]}, you rolled 🎲 ${diceRoll1} for Dice 1 and 🎲🎲 ${diceRoll2} for Dice 2.<br>👉👈 Choose Dice 1 or Dice 2 to be first order.`;
    return myOutputValue;
  }

  // player 1 to choose order. ! playing allows choosing of dice order and stops clicking submit to roll.
  if (
    !playing &&
    currentPlayer == 1 &&
    (input == "Dice 1" || input == "Dice 2")
  ) {
    myOutputValue = player1DiceOrder(input, diceRoll1, diceRoll2);
    currentPlayer = 2;
    // allows submit to roll
    playing = true;
    return myOutputValue;
  }

  // player 2 to choose order. ! playing allows choosing order of dice and stops clicking submit to roll.
  if (
    !playing &&
    currentPlayer == 2 &&
    (input == "Dice 1" || input == "Dice 2")
  ) {
    myOutputValue = player2DiceOrder(input, diceRoll1, diceRoll2);
    //allows player 1 to play
    currentPlayer = 1;
    // check for winner
    var winningPlayer = whoWins();
    //allows submit to roll
    playing = true;
    return myOutputValue + " " + winningPlayer;
  }
  // prompts player to only press submit to roll and not choose order of dice.
  if (playing && (input == "Dice 1" || input == "Dice 2")) {
    return `You have not rolled the dices yet, you can't choose order of dice yet. 😠💢🗯<br/>👍 Please click submit to roll.`;
  }
};

//Player 1 function that concatenates from diceArray and outputs to browser the choice of order taken by Player 1
var player1DiceOrder = function (input) {
  if (input == "Dice 1") {
    diceOrder1 = "".concat(player1DiceArray[0], player1DiceArray[1]);
    var outputValue = `☀ ${players[0]} has chosen the order of 👩‍⚖️ ${diceOrder1}. <br/>Now next 🙃 up is 🥱 ${players[1]}.<br/>🥱 ${players[1]}, please click submit to 🎲 roll`;
  } else {
    diceOrder1 = "".concat(player1DiceArray[1], player1DiceArray[0]);
    outputValue = `☀ ${players[0]} has chosen the order of 👉 ${diceOrder1}.<br/> Now next up is 🥱 ${players[1]}.<br/> 🥱 ${players[1]}, please click submit to 🎲 roll`;
  }
  return outputValue;
};

//Player 2 function that concatenates from diceArray and outputs to browser the choice of order taken by Player 2
var player2DiceOrder = function (input) {
  if (input == "Dice 1") {
    diceOrder2 = "".concat(player2DiceArray[0], player2DiceArray[1]);

    myOutputValue = `🧠🤩🙏 ${players[1]} has chosen the order of ${diceOrder2}.`;
  } else {
    diceOrder2 = "".concat(player2DiceArray[1], player2DiceArray[0]);

    myOutputValue = `🧠🤩🙏 ${players[1]} has chosen the order of ${diceOrder2}.`;
  }
  return myOutputValue;
};
// determines winning and losing or draw players //update players scores // auto restarts game at 10th round.
var whoWins = function () {
  // roll two separate dices and store
  var diceOrderPlayer1 = Number(diceOrder1);
  var diceOrderPlayer2 = Number(diceOrder2);
  // control flow 10 games or less
  if (gameRound < 11) {
    // if player 1 wins
    if (diceOrderPlayer1 > diceOrderPlayer2) {
      playersScore[0] += 1;
      gameRound += 1;
      // if player 1 wins and is game 10th --> game ends + game restarts
      if (gameRound == 10) {
        var output1 = `👱‍♂️ ${players[0]} order is ${diceOrderPlayer1}.<br/>👱‍♂️ ${players[0]} wins 💪.<br>👱‍♂️ ${players[0]} score is score ${playersScore[0]}.<br/>👩‍🦰 ${players[1]} score is ${playersScore[1]}..<br/>This is round ${gameRound} of 10 games 🏓. Game has ended😥🛑🏅.<br/>`;
        var restartGame = initGame();
        return output1 + restartGame;
      }
      // game not yet ended and announces winning player 1
      return `👱‍♂️ ${players[0]} order is ${diceOrderPlayer1}.<br/>👱‍♂️ ${players[0]} wins 💪.<br>👱‍♂️ ${players[0]} score is ${playersScore[0]}.<br/>👩‍🦰 ${players[1]} score is ${playersScore[1]}.<br/> Next up is 👱‍♂️ ${players[0]}, please press submit to 🎲roll.<br?>This is round ${gameRound} of 10 games.🏓`;
    }
    // player 2 wins
    if (diceOrderPlayer2 > diceOrderPlayer1) {
      playersScore[1] += 1;
      gameRound += 1;
      // game 10th and to end game + restart game
      if (gameRound == 10) {
        output1 = `👱‍♂️ ${players[0]} order is ${diceOrderPlayer1}.<br/>👩‍🦰 ${players[1]} wins 💪.<br>👱‍♂️ ${players[0]} score is ${playersScore[0]}.<br/>👩‍🦰 ${players[1]} score is ${playersScore[1]}.  <br/>This is round ${gameRound} of 10 games🏓. Game has ended😥🛑📉.<br/>`;
        restartGame = initGame();
        return output1 + restartGame;
      }
      return `👱‍♂️ ${players[0]} order is ${diceOrderPlayer1}.<br/>👩‍🦰 ${players[1]} wins 💪.<br>👱‍♂️ ${players[0]} score is ${playersScore[0]}.<br/>👩‍🦰 ${players[1]} score is ${playersScore[1]}. <br/> Next up is 👱‍♂️ ${players[0]}, please press submit to 🎲 roll. <br/>This is round ${gameRound} of 10 games.🏓`;
    }
    // draw game
    if (diceOrderPlayer1 == diceOrderPlayer2) {
      gameRound += 1;
      // end game + restarts game
      if (gameRound == 10) {
        output1 = `👱‍♂️ ${players[0]} order is ${diceOrderPlayer1}. It is a 👔 tie. <br>👱‍♂️ ${players[0]} score is ${playersScore[0]}.<br/>👩‍🦰 ${players[1]} score is ${playersScore[1]}.<br/>  This is round ${gameRound} of 10 games 🏓. Game has ended.😥🛑💢<br/>`;
        restartGame = initGame();
        return output1 + restartGame;
      }
      return `👱‍♂️ ${players[0]} order is ${diceOrderPlayer1}}. It is a 👔 Tie. <br/>👱‍♂️ ${players[0]}, submit to 🎲 roll.<br/> This is ${gameRound} of 10 games🏓.`;
    }
  }
};
