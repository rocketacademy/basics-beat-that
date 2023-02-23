//-----------BEAT-THAT------------
//globals
var gameMode_ChooseGame = "gameMode_ChooseGame";
var gameMode_DiceRoll = "gameMode_DiceRoll";
var gameMode_DiceOrder = "gameMode_DiceOrder";
var normalGame = "higher winner";
var reversedGame = "lower winner";
var gameMode = gameMode_ChooseGame;
var currentGame = "";
var player = 1;
var dice = [];
var dice1 = [];
var dice2 = [];
var score1 = 0;
var score2 = 0;

//roll a dice
var diceRoll = function () {
  var randomNumber = Math.random() * 6;
  var randomRoll = Math.floor(randomNumber) + 1;
  return randomRoll;
};

//roll 2 dice
var diceRollTwice = function () {
  var diceRolls = [diceRoll(), diceRoll()];
  return diceRolls;
};

//join 2 digits to form an integer
var joinNumber = function (digit1, digit2) {
  return Number(String(digit1) + String(digit2));
};

//form integer according to sequence
var numberOrder = function (firstDigit, dice1, dice2) {
  var array;
  var playerNum;

  if (player == 1) {
    array = dice1;
  } else {
    array = dice2;
  }
  //sequence
  if (firstDigit == 1) {
    playerNum = joinNumber(array[0], array[1]);
  } else {
    playerNum = joinNumber(array[1], array[0]);
  }

  return playerNum;
};

//determine who is winner normal
var chooseWinner = function (dice1, dice2) {
  if (dice1 > dice2) {
    return 1;
  } else if (dice1 == dice2) {
    return 0;
  }
  return 2;
};

//determine who is winner reversed
var chooseWinnerReversed = function (dice1, dice2) {
  if (dice1 < dice2) {
    return 1;
  } else if (dice1 == dice2) {
    return 0;
  }
  return 2;
};

//-----------MAIN------------
var main = function (input) {
  var number;

  //ask for game
  if (gameMode == gameMode_ChooseGame) {
    if (input != `1` && input != `2`) {
      return `Please ONLY enter 1 or 2!😡`;
    }
    if (input == `1`) {
      currentGame = normalGame;
    }
    if (input == `2`) {
      currentGame = reversedGame;
    }
    gameMode = gameMode_DiceRoll;
    return `Player 1, please press submit to roll the dice`;
  }

  //gameMode - roll dice
  if (gameMode == gameMode_DiceRoll) {
    //switch gameMode
    gameMode = gameMode_DiceOrder;
    dice = diceRollTwice();

    //prompt player to choose sequence
    return `Player ${player}! <br><br> You rolled Dice 1: ${dice[0]} and Dice 2: ${dice[1]}. <br> Choose the order by entering 1 or 2 for the first digit.`;
  }

  //gameMode - create final number for player
  if (gameMode == gameMode_DiceOrder) {
    var firstDigit = Number(input);
    //prompt for invalid input
    if (input != 1 && input != 2) {
      return `Please ONLY enter 1 or 2!😡`;
    }

    //assign dice1/2
    if (player == 1) {
      dice1 = dice;
    } else {
      dice2 = dice;
    }

    number = numberOrder(firstDigit, dice1, dice2);
    var promptFinalNumber = `Player ${player} final number is ${number}.`;

    if (player == 1) {
      //switch player
      player = 2;
      dice1 = number;

      //switch gameMode
      gameMode = gameMode_DiceRoll;

      //prompt player2 to roll dice
      return `${promptFinalNumber} <br> Player 2, please press submit to roll the dice.`;
    }
  }

  dice2 = number;
  console.log(dice1, dice2);

  var winner;

  //determine winner normal
  if (currentGame == `1`) {
    winner = chooseWinner(dice1, dice2);
  }

  //determine winner reversed
  if (currentGame == `2`) {
    winner = chooseWinnerReversed(dice1, dice2);
  }

  //restart another round
  player = 1;
  gameMode = gameMode_DiceRoll;

  //if tie
  if (winner == 0) {
    return `Player 2, your final number is ${dice2}. <br><br> Player 1: ${dice1} | Player 2: ${dice2} <br> It's a tie! <br> Player 1: ${score1} pts <br> Player 2: ${score2} pts <br> Press submit to play again.`;
  }

  //update scores
  if (winner == 1) {
    score1 += 1;
  } else {
    score2 += 1;
  }

  //output winner and current scores
  return `Player 2, your final number is ${dice2}. <br><br> Player 1: ${dice1} | Player 2: ${dice2} <br> Good Job! Player ${winner} has won. <br> Player 1: ${score1} pts <br> Player 2: ${score2} pts <br> Press press submit to play again.`;
};
