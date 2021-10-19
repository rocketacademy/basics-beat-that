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
  playing = true;
  return `Initialising game to ground zero. <br/><br/> Please introduce yourself Player 1 by keying in your name followed by Player 2`;
};

var userNameCreate = function (input) {
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
    return `🙏 Thank you ${players[0]} and ${players[1]} for joining us, the game is set for 10 rounds and will auto reset.<br/><br/>❓❓ You may also reset the game at anytime by ✍✍ "reset".<br/><br/>🚦 ${players[0]}, you may 🏃‍♀️begin the game by pressing submit to roll.`;
  }
  // notifies player--2 that input name is required and can't click submit to roll yet.
  if (userNameRound == 2 && input == "") {
    return `🤦‍♀️🤦‍♂️ Player 2, you have tried clicking submit before inputting your name.<br/> Please give us your 📛 name before the game begins🏃‍♀️.`;
  }
};
// rolls 2 dices and guide to choose dice order
var rollAndSelect2Dices = function (input) {
  // Player 1 to roll 2 dices and outputs to player and guides player to select dice order.
  if (currentPlayer == 1) {
    var diceRoll1 = diceRoll(6);
    player1DiceArray.push(diceRoll1); // adds dice value to array @ last position
    var diceRoll2 = diceRoll(6);
    player1DiceArray.push(diceRoll2);
    var myOutputValue = `🤞 ${players[0]}, you rolled 🕐🐪 ${diceRoll1} for Dice 1 and 🕑🐫 ${diceRoll2} for Dice 2.<br> 👉👈 Choose by ✍✍ Dice 1 or Dice 2 to be first order.`;
    // stops submit to roll, but allows dice order
    playing = false;
  }

  // Player 2 to roll dices and outputs to player and guides player 2 to select dice order.
  if (currentPlayer == 2) {
    diceRoll1 = diceRoll(6);
    player2DiceArray.push(diceRoll1);
    diceRoll2 = diceRoll(6);
    player2DiceArray.push(diceRoll2);
    //stops submit to roll but allows dice order
    playing = false;
    myOutputValue = `👩‍🦰 ${players[1]}, you rolled 🎲 ${diceRoll1} for Dice 1 and 🎲🎲 ${diceRoll2} for Dice 2.<br>👉👈 Choose Dice 1 or Dice 2 to be first order.`;
  }
  return myOutputValue;
};
// error checking of inputs ensuring game flow
var errorInputCheck = function (input) {
  // after game starts, guides players to type correct inputs
  if (!(input == "Dice 1" || input == "Dice 2" || input == "")) {
    var myOutputValue = `🛑 Do not recognise input. Only press 'SUBMIT' to roll or input Dice 1 or Dice 2 when prompt.`;
  }
  // prevents players to roll more than once and guides inputting Dice 1 or Dice 2 for order selection
  if (!playing && input == "") {
    myOutputValue = `😡💢👿😠🗯<br/>Error. You are trying to roll when not supposed to. <br/>✍✍ "Dice 1" or "Dice 2" to determine your first dice order`;
  }
  // prompts player to only press submit to roll and not choose order of dice.
  if (playing && (input == "Dice 1" || input == "Dice 2")) {
    myOutputValue = `You have not rolled the dices yet, you can't choose order of dice yet. 😠💢🗯<br/>👍 Please click submit to roll.`;
  }
  return myOutputValue;
};

// function that determines order of dice
var playerDiceOrder = function (input) {
  if (currentPlayer == 1) {
    if (input == "Dice 1") {
      diceOrder1 = "".concat(player1DiceArray[0], player1DiceArray[1]);
      var myOutputValue = `☀ ${players[0]} has chosen the order of 👩‍⚖️ ${diceOrder1}. <br/>Now next 🙃 up is 🥱 ${players[1]}.<br/>🥱 ${players[1]}, please click submit to 🎲 roll`;
    } else {
      diceOrder1 = "".concat(player1DiceArray[1], player1DiceArray[0]);
      myOutputValue = `☀ ${players[0]} has chosen the order of 👉 ${diceOrder1}.<br/> Now next up is 🥱 ${players[1]}.<br/> 🥱 ${players[1]}, please click submit to 🎲 roll`;
    }
  }
  if (currentPlayer == 2) {
    if (input == "Dice 1") {
      diceOrder2 = "".concat(player2DiceArray[0], player2DiceArray[1]);
      myOutputValue = `🧠🤩🙏 ${players[1]} has chosen the order of ${diceOrder2}.`;
    } else {
      diceOrder2 = "".concat(player2DiceArray[1], player2DiceArray[0]);
      myOutputValue = `🧠🤩🙏 ${players[1]} has chosen the order of ${diceOrder2}.`;
    }
  }
  return myOutputValue;
};
// ends at game 10th, tallies scores and force restart
var endGameTallyForceRestart = function (diceOrderPlayer1, diceOrderPlayer2) {
  if (diceOrderPlayer1 > diceOrderPlayer2) {
    playersScore[0] += 1;
    var output1 = `👱‍♂️ ${players[0]} order is ${diceOrderPlayer1}.<br/>👱‍♂️ ${players[0]} wins 💪.<br>👱‍♂️ ${players[0]} score is score ${playersScore[0]}.<br/>👩‍🦰 ${players[1]} score is ${playersScore[1]}..<br/>This is round ${gameRound} of 10 games 🏓. Game has ended😥🛑🏅.<br/>`;
    var restartGame = initGame();
    var myOutputValue = output1 + restartGame;
  }
  if (diceOrderPlayer2 > diceOrderPlayer1) {
    playersScore[1] += 1;
    output1 = `👱‍♂️ ${players[0]} order is ${diceOrderPlayer1}.<br/>👩‍🦰 ${players[1]} wins 💪.<br>👱‍♂️ ${players[0]} score is ${playersScore[0]}.<br/>👩‍🦰 ${players[1]} score is ${playersScore[1]}.  <br/>This is round ${gameRound} of 10 games🏓. Game has ended😥🛑📉.<br/>`;
    restartGame = initGame();
    myOutputValue = output1 + restartGame;
  }
  if (diceOrderPlayer1 == diceOrderPlayer2) {
    output1 = `👱‍♂️ ${players[0]} order is ${diceOrderPlayer1}. It is a 👔 tie. <br>👱‍♂️ ${players[0]} score is ${playersScore[0]}.<br/>👩‍🦰 ${players[1]} score is ${playersScore[1]}.<br/>  This is round ${gameRound} of 10 games 🏓. Game has ended.😥🛑💢<br/>`;
    restartGame = initGame();
    myOutputValue = output1 + restartGame;
  }
  return myOutputValue;
};

// determines winning and losing or draw players //update players scores // auto restarts game at 10th round.
var whoWins = function () {
  // roll two separate dices and store
  var diceOrderPlayer1 = Number(diceOrder1);
  var diceOrderPlayer2 = Number(diceOrder2);
  gameRound += 1;

  // if player 1 wins
  if (diceOrderPlayer1 > diceOrderPlayer2) {
    playersScore[0] += 1;
    myOutputValue = `👱‍♂️ ${players[0]} order is ${diceOrderPlayer1}.<br/>👱‍♂️ ${players[0]} wins 💪.<br>👱‍♂️ ${players[0]} score is ${playersScore[0]}.<br/>👩‍🦰 ${players[1]} score is ${playersScore[1]}.<br/> Next up is 👱‍♂️ ${players[0]}, please press submit to 🎲roll.<br?>This is round ${gameRound} of 10 games.🏓`;
  }

  // player 2 wins
  if (diceOrderPlayer2 > diceOrderPlayer1) {
    playersScore[1] += 1;
    myOutputValue = `👱‍♂️ ${players[0]} order is ${diceOrderPlayer1}.<br/>👩‍🦰 ${players[1]} wins 💪.<br>👱‍♂️ ${players[0]} score is ${playersScore[0]}.<br/>👩‍🦰 ${players[1]} score is ${playersScore[1]}. <br/> Next up is 👱‍♂️ ${players[0]}, please press submit to 🎲 roll. <br/>This is round ${gameRound} of 10 games.🏓`;
  }
  // draw game
  if (diceOrderPlayer1 == diceOrderPlayer2) {
    myOutputValue = `👱‍♂️ ${players[0]} order is ${diceOrderPlayer1}}. It is a 👔 Tie. <br/>👱‍♂️ ${players[0]}, submit to 🎲 roll.<br/> This is ${gameRound} of 10 games🏓.`;
  }
  if (gameRound == 10) {
    var myOutputValue = endGameTallyForceRestart(
      diceOrderPlayer1,
      diceOrderPlayer2
    );
  }
  return myOutputValue;
};

// browser output function
var main = function (input) {
  if (userNameRound < 3) {
    return userNameCreate(input);
  }
  if (playing && userNameRound > 2 && input == "") {
    return rollAndSelect2Dices(input);
  }
  if (!playing && (input == "Dice 1" || input == "Dice 2")) {
    myOutputValue = playerDiceOrder(input);
    playing = true;
    if (currentPlayer == 1) {
      currentPlayer = 2;
      return myOutputValue;
    }
    if (currentPlayer == 2) {
      currentPlayer = 1;
      // check for final winner
      var winningPlayer = whoWins();
      return myOutputValue + " " + winningPlayer;
    }
  }
  if (gameRound == 10 || input == "reset") {
    console.log(gameRound);
    var restartGame = initGame();
    return restartGame;
  }
  return errorInputCheck(input);
};
