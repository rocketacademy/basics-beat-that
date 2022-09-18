var NUMBER_OF_DICE_PLAYED = 2;

var STATE_DICE_ROLL = "DICE_ROLL";
var STATE_DICE_ORDER = "DICE_ORDER";
var STATE_AUTO_GENERATE_COMBINED_NUMBER = "AUTO_GENERATE_COMBINED_NUMBER";

var MODE_NORMAL = "Normal";
var MODE_LOWEST_WINS = "Lowest Wins";

//current default - only 2 players
var playerOne = [];
var playerOneFinal = 0;
var playerOneScore = 0;
var playerTwo = [];
var playerTwoFinal = 0;
var playerTwoScore = 0;

var currentPlayer = 1;
var currentState = STATE_DICE_ROLL;
var currentMode = MODE_NORMAL;

var getDiceRolled = function () {
  //get a random dice roll
  return Math.floor(Math.random() * 6) + 1;
};

var playerDiceRoll = function (player, rolls) {
  for (var i = 0; i < rolls; i += 1) {
    var rolled = getDiceRolled();
    player.push(rolled);
  }
};

var getCurrentPlayer = function () {
  if (currentPlayer == 1) return playerOne;
  else return playerTwo;
};

var updatePlayerTotal = function (order) {
  //update auto-generate combined number
  if (currentState == STATE_AUTO_GENERATE_COMBINED_NUMBER) {
    return autoGenerateCombinedNumber();
  } else {
    var array = getCurrentPlayer(currentPlayer);
    console.log(array);
    if (currentPlayer == 1) {
      if (order == 1) playerOneFinal = `${array[0]}${array[1]}`;
      else playerOneFinal = `${array[1]}${array[0]}`;
      return playerOneFinal;
    } else {
      if (order == 1) playerTwoFinal = `${array[0]}${array[1]}`;
      else playerTwoFinal = `${array[1]}${array[0]}`;
      return playerTwoFinal;
    }
  }
};

var getPlayerDisplayRoll = function () {
  var output = `Welcome Player ${currentPlayer}. `;

  var array = getCurrentPlayer(currentPlayer);

  //populate player's dice roll
  playerDiceRoll(array, NUMBER_OF_DICE_PLAYED);

  output += "<br> You rolled ";

  for (var i = 0; i < array.length; i += 1) {
    if (i == array.length - 1) {
      output += ` and `;
    } else if (i != 0) {
      output += `, `;
    }
    output += `${array[i]} for Dice ${i + 1}`;
  }

  //VARIABLE NUMBER OF DICE - auto generate number if dice is more than 2
  if (NUMBER_OF_DICE_PLAYED > 2) {
    output +=
      " . <br> Please type AUTO_GENERATE_COMBINED_NUMBER or any key and submit for computer to Auto-Generate Combined Number.";
  } else {
    output +=
      " . <br> Choose the order of the dice or type AUTO_GENERATE_COMBINED_NUMBER for computer to Auto-Generate Combined Number.";
  }
  return output;
};

var autoGenerateCombinedNumber = function () {
  var final = "";
  var array = getCurrentPlayer();
  if (currentMode == MODE_LOWEST_WINS) {
    //generate lowest number possible from array
    array.sort((a, b) => a - b);
  } else {
    //geenerate highest number possible from array
    array.sort((a, b) => b - a);
  }
  for (var i = 0; i < array.length; i += 1) {
    final += `${array[i]}`;
  }
  if (currentPlayer == 1) {
    playerOneFinal = final;
  } else {
    playerTwoFinal = final;
  }
  return final;
};

var calculateWinner = function () {
  var output = "";
  if (
    (playerOneFinal > playerTwoFinal && currentMode == MODE_NORMAL) ||
    (playerOneFinal < playerTwoFinal && currentMode == MODE_LOWEST_WINS)
  ) {
    output += `Player 1 Wins! Player 1: ${playerOneFinal} vs Player 2: ${playerTwoFinal}`;
    playerOneScore += 1;
  } else if (
    (playerOneFinal < playerTwoFinal && currentMode == MODE_NORMAL) ||
    (playerOneFinal < playerTwoFinal && currentMode == MODE_LOWEST_WINS)
  ) {
    output += `Player 2 Wins! Player 1: ${playerOneFinal} vs Player 2: ${playerTwoFinal}`;
    playerTwoScore += 1;
  } else output += `It's a draw`;

  return output;
};

var getPlayerCombinedResult = function (order) {
  var total = updatePlayerTotal(order);
  var output = `Player ${currentPlayer}, you chose Dice ${order} first.
  <br>Your number is ${total}`;
  if (currentPlayer == 1) {
    currentPlayer += 1;
    currentState = STATE_DICE_ROLL;
    output += `<br> It is now Player ${currentPlayer}'s turn.`;
  } else {
    // get result of battle;
    output += `<br>` + calculateWinner();

    //SCORE - Adding Leadership Board
    output += `<br><br> 
    <h4> Leadership Board </h4>
    Player 1: ${playerOneScore}
    <br>
    Player 2: ${playerTwoScore}`;
  }

  return output;
};

var updateNumberOfDiceInGame = function (diceNumber) {
  if (diceNumber > NUMBER_OF_DICE_PLAYED) {
    NUMBER_OF_DICE_PLAYED = diceNumber;
    return diceNumber;
  }
  return NUMBER_OF_DICE_PLAYED;
};

var main = function (input) {
  //hidden keywords trigger: MODE_LOWEST_WINS, AUTO_GENERATE_COMBINED_NUMBER
  var myOutputValue = "";

  //check if user changed game mode
  if (input == MODE_LOWEST_WINS) {
    currentMode = MODE_LOWEST_WINS;
  }

  if (currentState == STATE_DICE_ROLL) {
    myOutputValue = getPlayerDisplayRoll();
    currentState = STATE_DICE_ORDER;
  } else {
    //STATE_DICE_ORDER

    ////VARIABLE NUMBER OF DICE - auto generate number if dice is more than 2
    if (NUMBER_OF_DICE_PLAYED > 2)
      currentState = STATE_AUTO_GENERATE_COMBINED_NUMBER;

    if (input == STATE_AUTO_GENERATE_COMBINED_NUMBER) {
      //updated to allow auto-generation of combined number
      currentState = STATE_AUTO_GENERATE_COMBINED_NUMBER;
      myOutputValue = getPlayerCombinedResult(input);
    } else {
      if (input < 0 || input > NUMBER_OF_DICE_PLAYED) {
        //check if selection is valid length
        myOutputValue = `Invalid dice selection, please pick the whicn dice to use up to Dice ${NUMBER_OF_DICE_PLAYED}`;
      } else {
        myOutputValue = getPlayerCombinedResult(input);
      }
    }
  }

  return myOutputValue;
};
