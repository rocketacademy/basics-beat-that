var Code01 = " Beat That- Base";
/* 
//Helper Functions
var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  return randomInteger + 1;
};

//Definitions.
var myOutputValue = "";
var dice1 = 0;
var dice2 = 0;
var numberString = "";
var playerName = "";
var gameCount = 0;
var player1SumOfNumbers = 0;
var player2SumOfNumbers = 0;
var gameLogic = "highest";

//Game Logic and Service parts

//Service
var pickDiceOrder = function (playerName) {
  console.log("First Half Mode=" + gameMode);
  dice1 = diceRoll();
  dice2 = diceRoll();

  if (player == "player 1") {
    playerName = "Player 1";
  } else if (player == "player 2") {
    playerName = "Player 2";
  }

  var message1 = `Welcome ${playerName}<br><br>
                  Dice 1 roll = ${dice1} --- Dice 2 roll = ${dice2}
                  <br><br>Please hit submit again to generate the ${gameLogic.toUpperCase()} combined number
                  <br> Or key in "lowest" or "highest" to switch game logic`;
  gameMode = `arrangeDice`;
  console.log("End of 1st Half, Player =" + player);
  return message1;
};

//Game Logic
var arrangeDice = function (orderSpecified) {
  var scoreDisplay = "";
  var gameLogicDisplay = "";

  if (
    orderSpecified.toLowerCase() == "" ||
    orderSpecified.toLowerCase() == "highest" ||
    orderSpecified.toLowerCase() == "lowest"
  ) {
    gameCount = gameCount + 1;

    console.log("Start of 2nd Half Mode = " + gameMode);
    var nextPlayerName = "Blank";

    // putting the numbers together--> Auto generate combined number
    if (
      (gameLogic == "highest" && orderSpecified.toLowerCase() == "highest") ||
      (gameLogic == "highest" && orderSpecified.toLowerCase() == "") ||
      (gameLogic == "lowest" && orderSpecified.toLowerCase() == "highest")
    ) {
      gameLogic = "highest";
      gameLogicDisplay = `Game Logic: ${gameLogic.toUpperCase()} Combined Number<br><br>`;
    } else if (
      (gameLogic == "lowest" && orderSpecified.toLowerCase() == "lowest") ||
      (gameLogic == "lowest" && orderSpecified.toLowerCase() == "") ||
      (gameLogic == "highest" && orderSpecified.toLowerCase() == "lowest")
    ) {
      gameLogic = "lowest";
      gameLogicDisplay = `Game Logic: ${gameLogic.toUpperCase()} Combined Number<br><br>`;
    }

    if (gameLogic == "highest") {
      if (dice1 > dice2) {
        numberString = dice1.toString() + dice2.toString();
      } else if (dice2 > dice1) {
        numberString = dice2.toString() + dice1.toString();
      }
    } else if (gameLogic == "lowest") {
      if (dice1 < dice2) {
        numberString = dice1.toString() + dice2.toString();
      } else if (dice2 < dice1) {
        numberString = dice2.toString() + dice1.toString();
      }
    } else if (dice1 == dice2) {
      numberString = dice1.toString() + dice2.toString();
    }

    if (playerName == "Player 1") {
      nextPlayerName = "Player 2";
      player1SumOfNumbers = player1SumOfNumbers + Number(numberString);
    } else {
      nextPlayerName = "Player 1";
      player2SumOfNumbers = player2SumOfNumbers + Number(numberString);
    }

    if (player1SumOfNumbers > player2SumOfNumbers && gameLogic == "highest") {
      scoreDisplay = `Player 1: ${player1SumOfNumbers},<br>Player 2: ${player2SumOfNumbers}`;
    } else if (
      player2SumOfNumbers > player1SumOfNumbers &&
      gameLogic == "highest"
    ) {
      scoreDisplay = `Player 2: ${player2SumOfNumbers},<br>Player 1: ${player1SumOfNumbers}`;
    } else if (
      player1SumOfNumbers < player2SumOfNumbers &&
      gameLogic == "lowest"
    ) {
      scoreDisplay = `Player 1: ${player1SumOfNumbers},<br>Player 2: ${player2SumOfNumbers}`;
    } else if (
      player2SumOfNumbers < player1SumOfNumbers &&
      gameLogic == "lowest"
    ) {
      scoreDisplay = `Player 2: ${player2SumOfNumbers},<br>Player 1: ${player1SumOfNumbers}`;
    } else if (player1SumOfNumbers == player2SumOfNumbers) {
      scoreDisplay = `Player 1: ${player1SumOfNumbers} - Player 2: ${player2SumOfNumbers} -- TIED`;
    }

    var message2 = `${playerName}, <br> your number is ${numberString} (Dices rolled: ${dice1}, ${dice2}). <br><br>Leaderboard after ${gameCount} games:<br> ${scoreDisplay}.
                         <br><br>It is now ${nextPlayerName}'s turn.`;

    if (player == "player 1") {
      player = "player 2";
      playerName = `Player 2`;
    } else {
      player = "player 1";
      playerName = `Player 1`;
    }

    gameMode = "pickDiceOrder";
  } else {
    message2 = `${playerName}, please only:<br> 1) click the submit button, or<br> 2) type in "lowest", or, <br>3) type in "highest".`;
  }

  console.log("End of 2nd Half, Player =" + player);
  console.log("Next Mode = " + gameMode);
  console.log("------End of Game " + gameCount + " ------");

  return gameLogicDisplay + message2;
};

var gameMode = "pickDiceOrder";
var player = "player 1";

var main = function (input) {
  var myOutputValue = "";
  if (gameMode == `pickDiceOrder` && player.toLowerCase() == "player 1") {
    playerName = "Player 1";
    myOutputValue = pickDiceOrder(input);
  } else if (gameMode == `arrangeDice` && player.toLowerCase() == "player 1") {
    myOutputValue = arrangeDice(input);
  } else if (
    gameMode == `pickDiceOrder` &&
    player.toLowerCase() == "player 2"
  ) {
    playerName = "Player 2";
    myOutputValue = pickDiceOrder(input);
  } else if (gameMode == `arrangeDice` && player.toLowerCase() == "player 2") {
    myOutputValue = arrangeDice(input);
  }

  return myOutputValue;
}; */

//==================================================================================================================================

/* var CodeBelow02 = `how to sort elements in arrays <br>
                   how to convert integer arrays into string arrays <br>
                   how to concatenate all elements in a string array`;

var numberTank = [];
var diceRollHistory = [];
var numberRolled = "";
var prevRolled = "empty";

var main2 = function (input) {
  numberRolled = diceRoll();

  numberTank.push(numberRolled);
  numberTankSorted = numberTank.sort((a, b) => b - a);
  numberTankString = numberTank.map(String);
  testString = numberTankString.join("");

  diceRollHistory.push(numberRolled);
  prevRolled = numberRolled;

  var myOutputValue = ` Currect Dice Roll = ${numberRolled} <br><br>NumberTank Sorted = [${numberTankSorted} ] <br><br> Dice Roll History = ${diceRollHistory} `;

  console.log("Test String Concatenate Index 0 and 1 = " + testString);
  return myOutputValue;
};
 */
//==================================================================================================================================

var Code02 =
  " Beat That- with Variable Number of Dice - 2 Fixed Players, p1 and p2";
/* 
//Helper Functions
var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  return randomInteger + 1;
};

//GLOBAL Definitions.
var myOutputValue = "";
var diceNumberRolled = 0;
var playerName = "";
var gameCount = 0;
var player1SumOfNumbers = 0;
var player2SumOfNumbers = 0;
var gameLogic = "highest";
var qtyOfDice = 0;

//Game Logic and Service parts
var inputQtyOfDice = function (numberOfDice) {
  console.log("First Half Mode=" + gameMode);
  qtyOfDice = numberOfDice;

  // Player assignment contrik
  if (player == "player 1") {
    playerName = "Player 1";
  } else if (player == "player 2") {
    playerName = "Player 2";
  }
  // Message Output Definition
  var message1 = `Welcome ${playerName}<br><br>
                  All players have agreed to have  ${numberOfDice} dices rowed for this round.
                  <br><br>Please click 'Submit' to proceed.
                  `;

  // <br><br>Please hit submit again to generate the ${gameLogic.toUpperCase()} combined number
  // <br> Or key in "lowest" or "highest" to switch game logic`;
  gameMode = `arrangeDice`;
  console.log("End of 1st Half, Player =" + player);
  return message1;
};

//Game Logic
var arrangeDice = function (orderSpecified) {
  var scoreDisplay = "";
  var gameLogicDisplay = "";

  if (
    orderSpecified.toLowerCase() == "" ||
    orderSpecified.toLowerCase() == "highest" ||
    orderSpecified.toLowerCase() == "lowest"
  ) {
    gameCount = gameCount + 1;

    console.log("Start of 2nd Half Mode = " + gameMode);
    var nextPlayerName = "Blank";

    //GAME LOGIC AND GAME LOGIC CONTROL
    if (
      (gameLogic == "highest" && orderSpecified.toLowerCase() == "highest") ||
      (gameLogic == "highest" && orderSpecified.toLowerCase() == "") ||
      (gameLogic == "lowest" && orderSpecified.toLowerCase() == "highest")
    ) {
      gameLogic = "highest";
      gameLogicDisplay = `Game Logic: ${gameLogic.toUpperCase()} Combined Number<br><br>`;
    } else if (
      (gameLogic == "lowest" && orderSpecified.toLowerCase() == "lowest") ||
      (gameLogic == "lowest" && orderSpecified.toLowerCase() == "") ||
      (gameLogic == "highest" && orderSpecified.toLowerCase() == "lowest")
    ) {
      gameLogic = "lowest";
      gameLogicDisplay = `Game Logic: ${gameLogic.toUpperCase()} Combined Number<br><br>`;
    }

    // Local Variables for arrangeDice Function.
    // To Generate the Combined number based on putting together N number dice rolls.
    var diceRollsArray = [];
    var diceRollHistory = [];
    var combinedNumberString = "";
    var combinedNumber = 0;
    var count = 0;
    while (count < qtyOfDice) {
      diceNumberRolled = diceRoll();
      diceRollsArray.push(diceNumberRolled);
      diceRollHistory.push(diceNumberRolled);
      count = count + 1;
    }

    if (gameLogic == "highest") {
      diceRollArraySorted = diceRollsArray.sort((a, b) => b - a);
      diceRollsArraySortedString = diceRollArraySorted.map(String);
    } else if (gameLogic == "lowest") {
      diceRollArraySorted = diceRollsArray.sort((a, b) => a - b);
      diceRollsArraySortedString = diceRollArraySorted.map(String);
    }

    combinedNumberString = diceRollsArraySortedString.join("");
    combinedNumber = Number(combinedNumberString);

    // for Score Tracking
    if (playerName == "Player 1") {
      nextPlayerName = "Player 2";
      player1SumOfNumbers = player1SumOfNumbers + combinedNumber;
    } else {
      nextPlayerName = "Player 1";
      player2SumOfNumbers = player2SumOfNumbers + combinedNumber;
    }

    // for LEADER Board display in output
    if (player1SumOfNumbers > player2SumOfNumbers && gameLogic == "highest") {
      scoreDisplay = `Player 1: ${player1SumOfNumbers},<br>Player 2: ${player2SumOfNumbers}`;
    } else if (
      player2SumOfNumbers > player1SumOfNumbers &&
      gameLogic == "highest"
    ) {
      scoreDisplay = `Player 2: ${player2SumOfNumbers},<br>Player 1: ${player1SumOfNumbers}`;
    } else if (
      player1SumOfNumbers < player2SumOfNumbers &&
      gameLogic == "lowest"
    ) {
      scoreDisplay = `Player 1: ${player1SumOfNumbers},<br>Player 2: ${player2SumOfNumbers}`;
    } else if (
      player2SumOfNumbers < player1SumOfNumbers &&
      gameLogic == "lowest"
    ) {
      scoreDisplay = `Player 2: ${player2SumOfNumbers},<br>Player 1: ${player1SumOfNumbers}`;
    } else if (player1SumOfNumbers == player2SumOfNumbers) {
      scoreDisplay = `Player 1: ${player1SumOfNumbers} - Player 2: ${player2SumOfNumbers} -- TIED`;
    }

    // For Output template
    var message2 = `${playerName}, <br> your number is ${combinedNumber} (Dices rolled: ${diceRollHistory}). <br><br>Leaderboard after ${gameCount} games:<br> ${scoreDisplay}.
                         <br><br>It is now ${nextPlayerName}'s turn to roll the ${qtyOfDice} dices.`;

    //for Player Name display
    if (player == "player 1") {
      player = "player 2";
      playerName = `Player 2`;
    } else {
      player = "player 1";
      playerName = `Player 1`;
    }

    gameMode = "arrangeDice";
  } else {
    message2 = `${playerName}, please only:<br> 1) click the submit button, or<br> 2) type in "lowest", or, <br>3) type in "highest".`;
  }

  console.log("End of 2nd Half, Player =" + player);
  console.log("Next Mode = " + gameMode);
  console.log("------End of Game " + gameCount + " ------");

  return gameLogicDisplay + message2;
};

//GLOBAL DEFINITIONS for MAIN FUCNTION
var gameMode = "inputQtyOfDice";
var player = "player 1";

var main = function (input) {
  var myOutputValue = "";
  if (gameMode == `inputQtyOfDice` && player.toLowerCase() == "player 1") {
    playerName = "Player 1";
    myOutputValue = inputQtyOfDice(input);
  } else if (gameMode == `arrangeDice` && player.toLowerCase() == "player 1") {
    myOutputValue = arrangeDice(input);
  } else if (
    gameMode == `inputQtyOfDice` &&
    player.toLowerCase() == "player 2"
  ) {
    playerName = "Player 2";
    myOutputValue = inputQtyOfDice(input);
  } else if (gameMode == `arrangeDice` && player.toLowerCase() == "player 2") {
    myOutputValue = arrangeDice(input);
  }

  return myOutputValue;
}; */

//==================================================================================================================================

var Code03 = " Beat That- with N Number of Dice and N number of Players";
/* 
//Helper Functions
var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  return randomInteger + 1;
};

//GLOBAL Definitions.
var myOutputValue = "";
var diceNumberRolled = 0;
var numberOfPlayers = 0;
var playerIndexNmbr = 0;
var playerName = "";
var gameCount = 0;
var currentPlayerSumOfNumbers = 0;
var gameLogic = "highest";
var gameLogicDisplay = "";
var qtyOfDice = 0;
var leaderBoardArray = [];

//Game Logic and Service parts

var getNumberOfPlayers = function (qtyOfPlayers) {
  // use over arcing "IF /ELSE " to control for highest or lowest mode and return error messages
  if (qtyOfPlayers > 2 && isNaN(qtyOfPlayers) == false) {
    numberOfPlayers = qtyOfPlayers;
    var message0 = `Number of Players = ${qtyOfPlayers}
                  <br><br>Please input how many dices to use: `;
    gameMode = `inputQtyOfDice`;
  } else {
    message0 = `xxxx INPUT ERROR xxxx :<br>Please key in only numerals (> 2)`;
    gameMode = "getNumberOfPlayers";
  }

  gameLogicDisplay = ` Game Logic: ${gameLogic.toUpperCase()} combined number wins<br><br>`;

  return gameLogicDisplay + message0;
};

var inputQtyOfDice = function (numberOfDice) {
  qtyOfDice = numberOfDice; // use over arcing "IF /ELSE " to control for highest or lowest mode and return error messages

  // Player assignment control

  // Message Output Definition
  var message1 = `All players have agreed to have  ${numberOfDice} dices rolled for this round.
                  <br><br>Please click 'Submit' to proceed.
                  `;

  // <br><br>Please hit submit again to generate the ${gameLogic.toUpperCase()} combined number
  // <br> Or key in "lowest" or "highest" to switch game logic`;
  gameMode = `arrangeDice`;

  gameLogicDisplay = ` Game Logic: ${gameLogic.toUpperCase()} combined number wins<br><br>`;

  return gameLogicDisplay + message1;
};

//Game Logic
var arrangeDice = function (orderSpecified) {
  var scoreDisplay = "";

  //control for highest or lowest mode toggle
  if (
    orderSpecified.toLowerCase() == "" ||
    orderSpecified.toLowerCase() == "highest" ||
    orderSpecified.toLowerCase() == "lowest"
  ) {
    gameCount = gameCount + 1;

    console.log("Start of 2nd Half Mode = " + gameMode);

    //GAME LOGIC AND GAME LOGIC CONTROL
    if (
      (gameLogic == "highest" && orderSpecified.toLowerCase() == "highest") ||
      (gameLogic == "highest" && orderSpecified.toLowerCase() == "") ||
      (gameLogic == "lowest" && orderSpecified.toLowerCase() == "highest")
    ) {
      gameLogic = "highest";
      gameLogicDisplay = `Game Logic: ${gameLogic.toUpperCase()} Combined Number<br><br>`;
    } else if (
      (gameLogic == "lowest" && orderSpecified.toLowerCase() == "lowest") ||
      (gameLogic == "lowest" && orderSpecified.toLowerCase() == "") ||
      (gameLogic == "highest" && orderSpecified.toLowerCase() == "lowest")
    ) {
      gameLogic = "lowest";
      gameLogicDisplay = `Game Logic: ${gameLogic.toUpperCase()} Combined Number<br><br>`;
    }

    // Local Variables for arrangeDice Function.
    // To Generate the Combined number based on putting together N number dice rolls.

    var diceRollHistory = [];
    var diceRollsArraySorted = [];
    var diceRollsArraySortedString = [];
    var combinedNumberString = "";
    var combinedNumber = 0;

    // Loop to run through number of players and get their rolls automatically
    while (playerIndexNmbr < numberOfPlayers) {
      var diceRollsArray = [];
      var count = 0;
      //Current Player Assignment
      playerName = "Player " + (playerIndexNmbr + 1);
      leaderBoardArray.push("Player " + (playerIndexNmbr + 1) + ": ");
      diceNumberRolled = 0;

      while (count < qtyOfDice) {
        diceNumberRolled = diceRoll();
        diceRollsArray.push(diceNumberRolled);
        diceRollHistory.push(diceNumberRolled);
        count = count + 1;

        //formation of the combined numbers based on random dice rolls
        if (gameLogic == "highest") {
          diceRollsArraySorted = diceRollsArray.sort((a, b) => b - a);
          diceRollsArraySortedString = diceRollsArraySorted.map(String);
        } else if (gameLogic == "lowest") {
          diceRollsArraySorted = diceRollsArray.sort((a, b) => a - b);
          diceRollsArraySortedString = diceRollsArraySorted.map(String);
        }
      }
      combinedNumberString = diceRollsArraySortedString.join("");
      combinedNumber = Number(combinedNumberString);
      leaderBoardArray.push(combinedNumber);
      leaderBoardArray.push("--|<br>");
      playerIndexNmbr = playerIndexNmbr + 1;
    }

    //for Player Name display
    gameMode = "waiting for input";
    playerName = "";

    // For Output template
    var message2 = `Dear Players, please find your numbers below:<br><br>
                    Combined Numbers of each player: <br>${leaderBoardArray}
                   <br><br>A new round will begin and all scores will reset on clicking "Submit" `;
  } // else below is for catching error inputs.
  else {
    message2 = `${playerName}, please only:<br> 1) click the submit button, or<br> 2) type in "lowest", or, <br>3) type in "highest".`;
  }

  return gameLogicDisplay + message2;
};

//GLOBAL DEFINITIONS for MAIN FUCNTION
var gameMode = "waiting for input";
var player = "player 1";

var main = function (input) {
  var myOutputValue = "";
  if (
    gameMode == `waiting for input` &&
    playerName == "" &&
    (input.toLowerCase() == "highest" || input == "")
  ) {
    gameLogic = "highest";
    myOutputValue = `Game Logic: ${gameLogic.toUpperCase()} combined number wins
                    <br><br>Please enter the number of players:`;
    gameMode = "getNumberOfPlayers";
  } else if (
    gameMode == `waiting for input` &&
    playerName == "" &&
    input.toLowerCase() == "lowest"
  ) {
    gameLogic = "lowest";
    myOutputValue = `Game Logic: ${gameLogic.toUpperCase()} combined number wins
                    <br><br>Please enter the number of players:`;
    gameMode = "getNumberOfPlayers";
    gameLogic = "lowest";
  } else if (gameMode == `getNumberOfPlayers` && playerName == "") {
    myOutputValue = getNumberOfPlayers(input);
  } else if (gameMode == `inputQtyOfDice`) {
    myOutputValue = inputQtyOfDice(input);
  } else if (gameMode == `arrangeDice`) {
    myOutputValue = arrangeDice(input);
  }

  return myOutputValue;
}; */

//==================================================================================================================================

var Code04 =
  " Beat That- with N Number of Dice, N number of Players and knockOut Mode";

//Helper Functions
var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  return randomInteger + 1;
};

//GLOBAL Definitions.
var myOutputValue = "";
var diceNumberRolled = 0;
var numberOfPlayers = 0;
var playerIndexNmbr = 0;
var playerName = "";
var gameCount = 0;
var currentPlayerSumOfNumbers = 0;
var gameLogic = "highest";
var gameLogicDisplay = "";
var qtyOfDice = 0;
var leaderBoardArray = [];

//Game Logic and Service parts

var getNumberOfPlayers = function (qtyOfPlayers) {
  // use over arcing "IF /ELSE " to control for highest or lowest mode and return error messages
  if (qtyOfPlayers > 1 && isNaN(qtyOfPlayers) == false) {
    numberOfPlayers = qtyOfPlayers;
    var message0 = `Number of Players = ${qtyOfPlayers}
                  <br><br>Please input how many dices to use: `;
    gameMode = `inputQtyOfDice`;
  } else {
    message0 = `xxxx INPUT ERROR xxxx :<br>Please key in only numerals (> 1)`;
    gameMode = "getNumberOfPlayers";
  }

  gameLogicDisplay = ` Game Logic: ${gameLogic.toUpperCase()} combined number wins<br><br>`;

  return gameLogicDisplay + message0;
};

var inputQtyOfDice = function (numberOfDice) {
  qtyOfDice = numberOfDice; // use over arcing "IF /ELSE " to control for highest or lowest mode and return error messages

  // Message Output Definition
  var message1 = `All players have agreed to have  ${numberOfDice} dices rolled for this round.
                  <br><br>Please type "knock out" or "multiplayer" in the input to determine whether players play in knockout fashion or all at once (multiplayer).
                  <br><br>Click 'Submit' to proceed when ready.
                  `;

  // <br><br>Please hit submit again to generate the ${gameLogic.toUpperCase()} combined number
  // <br> Or key in "lowest" or "highest" to switch game logic`;
  gameMode = `setMultiplayerOrKnockOut`;

  gameLogicDisplay = ` Game Logic: ${gameLogic.toUpperCase()} combined number wins<br><br>`;

  return gameLogicDisplay + message1;
};

var setMultiplayerOrKnockOut = function (playMode) {
  var displayPlayMode = "";
  var message2 = "";
  var normalMessage = `Game will be played in ${displayPlayMode} style.
                 <br>Please click "Submit" to proceed.`;
  var errorMessage = `XXX INPUT ERROR XXX
                      <br>Please input 'knock out' or 'multiplayer' only.`;

  if (playMode.toLowerCase() == "knock out") {
    gameMode = `arrangeDiceKnockOut`;
    displayPlayMode = "Knock Out";
    message2 = normalMessage;
  } else if (playMode.toLowerCase() == "multiplayer") {
    gameMode = `arrangeDiceMultiplayer`;
    displayPlayMode = "Multiplayer";
    message2 = normalMessage;
  } else {
    gameMode = `setMultiplayerOrKnockOut`;
    message2 = errorMessage;
  }

  gameLogicDisplay = ` Game Logic: ${gameLogic.toUpperCase()} combined number wins<br><br>`;

  return gameLogicDisplay + message2;
};

//Game Logic for Multiplayer Mode
var arrangeDiceMultiplayer = function (input) {
  leaderBoardArray = [];

  //control for highest or lowest mode toggle
  if (
    input.toLowerCase() == "" ||
    input.toLowerCase() == "highest" ||
    input.toLowerCase() == "lowest"
  ) {
    gameCount = gameCount + 1;

    //GAME LOGIC AND GAME LOGIC CONTROL
    if (
      (gameLogic == "highest" && input.toLowerCase() == "highest") ||
      (gameLogic == "highest" && input.toLowerCase() == "") ||
      (gameLogic == "lowest" && input.toLowerCase() == "highest")
    ) {
      gameLogic = "highest";
      gameLogicDisplay = `Game Logic: ${gameLogic.toUpperCase()} Combined Number<br><br>`;
    } else if (
      (gameLogic == "lowest" && input.toLowerCase() == "lowest") ||
      (gameLogic == "lowest" && input.toLowerCase() == "") ||
      (gameLogic == "highest" && input.toLowerCase() == "lowest")
    ) {
      gameLogic = "lowest";
      gameLogicDisplay = `Game Logic: ${gameLogic.toUpperCase()} Combined Number<br><br>`;
    }

    // Local Variables for arrangeDice Function.
    // To Generate the Combined number based on putting together N number dice rolls.

    var diceRollHistory = [];
    var diceRollsArraySorted = [];
    var diceRollsArraySortedString = [];
    var combinedNumberString = "";
    var combinedNumber = 0;
    var incumbentIndex = "";
    var incumbentCombinedNumber = 0;
    var winnerThisRound = "";
    var leaderBoardArray = [];
    var roundHistoryDisplay = [];
    var playerAisplay = ""; // just using a "previous winner" or incumbent holder isn't enough, the playerA- playerB needs a whole assignment
    var playerBdisplay = ""; // on its own.

    // Loop to run through number of players and get their rolls automatically
    while (playerIndexNmbr < numberOfPlayers) {
      var diceRollsArray = [];
      var count = 0;

      diceNumberRolled = 0;

      while (count < qtyOfDice) {
        diceNumberRolled = diceRoll();
        diceRollsArray.push(diceNumberRolled);
        diceRollHistory.push(diceNumberRolled);
        count = count + 1;

        //sorting the diceRoll Array
        if (gameLogic == "highest") {
          diceRollsArraySorted = diceRollsArray.sort((a, b) => b - a);
          diceRollsArraySortedString = diceRollsArraySorted.map(String);
        } else if (gameLogic == "lowest") {
          diceRollsArraySorted = diceRollsArray.sort((a, b) => a - b);
          diceRollsArraySortedString = diceRollsArraySorted.map(String);
        }
      }
      //combining the diceRoll array to form number
      combinedNumberString = diceRollsArraySortedString.join("");
      combinedNumber = Number(combinedNumberString);

      //Current Player Assignment + their scores
      playerName = "Player " + (playerIndexNmbr + 1);
      leaderBoardArray.push(
        "<br>" + "Player " + (playerIndexNmbr + 1) + ": " + combinedNumber
      );
      playerIndexNmbr = playerIndexNmbr + 1;
    }

    // For Output template
    var message2 = `Dear Players, please find your numbers below:
                    <br><br>Combined Numbers of each player: <br>${leaderBoardArray}
                    <br><br>A new round will begin and all scores will reset on clicking "Submit" 
                    <br><br>If you wish to change "Highest/Lowest" wins game logic, please refresh the page. `;
  } else {
    //else here to catch wrong inputs
    message2 = `${playerName}, please only:
                    <br> 1) click the submit button, or
                    <br> 2) type in "lowest", or, 
                    <br>3) type in "highest".`;
  }

  //for restarting next game.
  playerIndexNmbr = 0;
  incumbentIndex = 0;
  playerName = "";
  gameMode = `waiting for input`;
  return gameLogicDisplay + message2;
};

//Game Logic for KnockOut Mode
var arrangeDiceKnockOut = function (orderSpecified) {
  leaderBoardArray = [];

  //control for highest or lowest mode toggle
  if (
    orderSpecified.toLowerCase() == "" ||
    orderSpecified.toLowerCase() == "highest" ||
    orderSpecified.toLowerCase() == "lowest"
  ) {
    gameCount = gameCount + 1;

    //GAME LOGIC AND GAME LOGIC CONTROL
    if (
      (gameLogic == "highest" && orderSpecified.toLowerCase() == "highest") ||
      (gameLogic == "highest" && orderSpecified.toLowerCase() == "") ||
      (gameLogic == "lowest" && orderSpecified.toLowerCase() == "highest")
    ) {
      gameLogic = "highest";
      gameLogicDisplay = `Game Logic: ${gameLogic.toUpperCase()} Combined Number<br><br>`;
    } else if (
      (gameLogic == "lowest" && orderSpecified.toLowerCase() == "lowest") ||
      (gameLogic == "lowest" && orderSpecified.toLowerCase() == "") ||
      (gameLogic == "highest" && orderSpecified.toLowerCase() == "lowest")
    ) {
      gameLogic = "lowest";
      gameLogicDisplay = `Game Logic: ${gameLogic.toUpperCase()} Combined Number<br><br>`;
    }

    // Local Variables for arrangeDice Function.
    // To Generate the Combined number based on putting together N number dice rolls.

    var diceRollHistory = [];
    var diceRollsArraySorted = [];
    var diceRollsArraySortedString = [];
    var combinedNumberString = "";
    var combinedNumber = 0;
    var incumbentIndex = "";
    var incumbentCombinedNumber = 0;
    var winnerThisRound = "";
    var leaderBoardArray = [];
    var roundHistoryDisplay = [];
    var playerAisplay = ""; // just using a "previous winner" or incumbent holder isn't enough, the playerA- playerB needs a whole assignment
    var playerBdisplay = ""; // on its own.

    // Loop to run through number of players and get their rolls automatically
    while (playerIndexNmbr < numberOfPlayers) {
      var diceRollsArray = [];
      var count = 0;

      diceNumberRolled = 0;

      while (count < qtyOfDice) {
        diceNumberRolled = diceRoll();
        diceRollsArray.push(diceNumberRolled);
        diceRollHistory.push(diceNumberRolled);
        count = count + 1;

        //sorting the diceRoll Array
        if (gameLogic == "highest") {
          diceRollsArraySorted = diceRollsArray.sort((a, b) => b - a);
          diceRollsArraySortedString = diceRollsArraySorted.map(String);
        } else if (gameLogic == "lowest") {
          diceRollsArraySorted = diceRollsArray.sort((a, b) => a - b);
          diceRollsArraySortedString = diceRollsArraySorted.map(String);
        }
      }
      //combining the diceRoll array to form number
      combinedNumberString = diceRollsArraySortedString.join("");
      combinedNumber = Number(combinedNumberString);

      //Current Player Assignment + their scores
      playerName = "Player " + (playerIndexNmbr + 1);
      leaderBoardArray.push(
        "<br>" + "Player " + (playerIndexNmbr + 1) + ": " + combinedNumber
      );
      playerIndexNmbr = playerIndexNmbr + 1;

      // nested IF/ELSE for divergent situation rather than sequential IF/ELSE
      if (incumbentIndex == 0) {
        incumbentIndex = playerIndexNmbr;
        incumbentCombinedNumber = combinedNumber; // need to repeat? How to repeat?
      } else if (incumbentIndex > 0) {
        if (
          (gameLogic == "highest" &&
            combinedNumber < incumbentCombinedNumber) ||
          (gameLogic == "lowest" && combinedNumber > incumbentCombinedNumber)
        ) {
          playerAisplay = incumbentIndex; //always assigning the incumbent first, to player A Display position,
          playerBdisplay = playerIndexNmbr; //always assigning the next challenger to player B Display position.
          winnerThisRound = `Player ${incumbentIndex}`; //need more actions here, can't figure out
        } else if (
          (gameLogic == "highest" &&
            combinedNumber > incumbentCombinedNumber) ||
          (gameLogic == "lowest" && combinedNumber < incumbentCombinedNumber)
        ) {
          playerAisplay = incumbentIndex; //always assigning the incumbent first, to player A Display position,
          playerBdisplay = playerIndexNmbr; //always assigning the next challenger to player B Display position.
          winnerThisRound = `Player ${playerIndexNmbr}`;
          incumbentIndex = playerIndexNmbr;
          incumbentCombinedNumber = combinedNumber; // need more actions here, can't figure out yet.
        } else if (
          (gameLogic == "highest" || gameLogic == "lowest") &&
          combinedNumber == incumbentCombinedNumber
        ) {
          playerAisplay = incumbentIndex;
          playerBdisplay = playerIndexNmbr;
          winnerThisRound = `Player ${incumbentIndex}`; //incumbent wins incase of TIE/draw
        }
      }

      if (playerIndexNmbr > 1) {
        roundHistoryDisplay.push(
          "<br>" +
            "Round " +
            (playerIndexNmbr - 1) +
            " : " +
            " Player " +
            playerAisplay +
            " vs " +
            "Player " +
            playerBdisplay +
            " ----> " +
            winnerThisRound +
            " wins"
        );
      }
      console.log("Round: " + (playerIndexNmbr - 1));
      console.log("Incumbent = Player " + incumbentIndex);
      console.log("Current Challenger = Player " + playerIndexNmbr);
      console.log("============================");
    }

    // For Output template
    var message2 = `Dear Players, please find your numbers below:
                    <br><br>Combined Numbers of each player: <br>${leaderBoardArray}
                    <br><br> Winner of KnockOut: ${winnerThisRound}.
                    <br><br> Round History: ${roundHistoryDisplay}
                        <br><i>in event of a draw, previous winner always wins.</i>
                    <br><br>A new round will begin and all scores will reset on clicking "Submit" 
                    <br><br>If you wish to change "Highest/Lowest" wins game logic, please refresh the page. `;
  } else {
    message2 = `${playerName}, please only:<br> 1) click the submit button, or<br> 2) type in "lowest", or, <br>3) type in "highest".`; //for catching error in inputs
  }

  //for restarting next game.
  playerIndexNmbr = 0;
  incumbentIndex = 0;
  playerName = "";
  gameMode = `waiting for input`;
  return gameLogicDisplay + message2;
};

var arrangeDiceKnockOut = function (orderSpecified) {
  leaderBoardArray = [];

  //control for highest or lowest mode toggle
  if (
    orderSpecified.toLowerCase() == "" ||
    orderSpecified.toLowerCase() == "highest" ||
    orderSpecified.toLowerCase() == "lowest"
  ) {
    gameCount = gameCount + 1;

    //GAME LOGIC AND GAME LOGIC CONTROL
    if (
      (gameLogic == "highest" && orderSpecified.toLowerCase() == "highest") ||
      (gameLogic == "highest" && orderSpecified.toLowerCase() == "") ||
      (gameLogic == "lowest" && orderSpecified.toLowerCase() == "highest")
    ) {
      gameLogic = "highest";
      gameLogicDisplay = `Game Logic: ${gameLogic.toUpperCase()} Combined Number<br><br>`;
    } else if (
      (gameLogic == "lowest" && orderSpecified.toLowerCase() == "lowest") ||
      (gameLogic == "lowest" && orderSpecified.toLowerCase() == "") ||
      (gameLogic == "highest" && orderSpecified.toLowerCase() == "lowest")
    ) {
      gameLogic = "lowest";
      gameLogicDisplay = `Game Logic: ${gameLogic.toUpperCase()} Combined Number<br><br>`;
    }

    // Local Variables for arrangeDice Function.
    // To Generate the Combined number based on putting together N number dice rolls.

    var diceRollHistory = [];
    var diceRollsArraySorted = [];
    var diceRollsArraySortedString = [];
    var combinedNumberString = "";
    var combinedNumber = 0;
    var incumbentIndex = "";
    var incumbentCombinedNumber = 0;
    var winnerThisRound = "";
    var leaderBoardArray = [];
    var roundHistoryDisplay = [];
    var playerAisplay = ""; // just using a "previous winner" or incumbent holder isn't enough, the playerA- playerB needs a whole assignment
    var playerBdisplay = ""; // on its own.

    // Loop to run through number of players and get their rolls automatically
    while (playerIndexNmbr < numberOfPlayers) {
      var diceRollsArray = [];
      var count = 0;

      diceNumberRolled = 0;

      while (count < qtyOfDice) {
        diceNumberRolled = diceRoll();
        diceRollsArray.push(diceNumberRolled);
        diceRollHistory.push(diceNumberRolled);
        count = count + 1;

        //sorting the diceRoll Array
        if (gameLogic == "highest") {
          diceRollsArraySorted = diceRollsArray.sort((a, b) => b - a);
          diceRollsArraySortedString = diceRollsArraySorted.map(String);
        } else if (gameLogic == "lowest") {
          diceRollsArraySorted = diceRollsArray.sort((a, b) => a - b);
          diceRollsArraySortedString = diceRollsArraySorted.map(String);
        }
      }
      //combining the diceRoll array to form number
      combinedNumberString = diceRollsArraySortedString.join("");
      combinedNumber = Number(combinedNumberString);

      //Current Player Assignment + their scores
      playerName = "Player " + (playerIndexNmbr + 1);
      leaderBoardArray.push(
        "<br>" + "Player " + (playerIndexNmbr + 1) + ": " + combinedNumber
      );
      playerIndexNmbr = playerIndexNmbr + 1;

      // nested IF/ELSE for divergent situation rather than sequential IF/ELSE
      if (incumbentIndex == 0) {
        incumbentIndex = playerIndexNmbr;
        incumbentCombinedNumber = combinedNumber; // need to repeat? How to repeat?
      } else if (incumbentIndex > 0) {
        if (
          (gameLogic == "highest" &&
            combinedNumber < incumbentCombinedNumber) ||
          (gameLogic == "lowest" && combinedNumber > incumbentCombinedNumber)
        ) {
          playerAisplay = incumbentIndex; //always assigning the incumbent first, to player A Display position,
          playerBdisplay = playerIndexNmbr; //always assigning the next challenger to player B Display position.
          winnerThisRound = `Player ${incumbentIndex}`; //need more actions here, can't figure out
        } else if (
          (gameLogic == "highest" &&
            combinedNumber > incumbentCombinedNumber) ||
          (gameLogic == "lowest" && combinedNumber < incumbentCombinedNumber)
        ) {
          playerAisplay = incumbentIndex; //always assigning the incumbent first, to player A Display position,
          playerBdisplay = playerIndexNmbr; //always assigning the next challenger to player B Display position.
          winnerThisRound = `Player ${playerIndexNmbr}`;
          incumbentIndex = playerIndexNmbr;
          incumbentCombinedNumber = combinedNumber; // need more actions here, can't figure out yet.
        } else if (
          (gameLogic == "highest" || gameLogic == "lowest") &&
          combinedNumber == incumbentCombinedNumber
        ) {
          playerAisplay = incumbentIndex;
          playerBdisplay = playerIndexNmbr;
          winnerThisRound = `Player ${incumbentIndex}`; //incumbent wins incase of TIE/draw
        }
      }
      // for display Round win lose History
      if (playerIndexNmbr > 1) {
        roundHistoryDisplay.push(
          "<br>" +
            "Round " +
            (playerIndexNmbr - 1) +
            " : " +
            " Player " +
            playerAisplay +
            " vs " +
            "Player " +
            playerBdisplay +
            " ----> " +
            winnerThisRound +
            " wins"
        );
      }
      console.log("Round: " + (playerIndexNmbr - 1));
      console.log("Incumbent = Player " + incumbentIndex);
      console.log("Current Challenger = Player " + playerIndexNmbr);
      console.log("============================");
    }

    // For Output template
    var message2 = `Dear Players, please find your numbers below:
                    <br><br>Combined Numbers of each player: <br>${leaderBoardArray}
                    <br><br> Winner of KnockOut: ${winnerThisRound}.
                    <br><br> Round History: ${roundHistoryDisplay}
                        <br><i>in event of a draw, previous winner always wins.</i>
                    <br><br>A new round will begin and all scores will reset on clicking "Submit" 
                    <br><br>If you wish to change modes, please refresh the page. `;
  } // else below is for catching error inputs.
  else {
    message2 = `${playerName}, please only:<br> 1) click the submit button, or<br> 2) type in "lowest", or, <br>3) type in "highest".`;
  }
  //for restarting next game.
  playerIndexNmbr = 0;
  incumbentIndex = 0;
  playerName = "";
  gameMode = `waiting for input`;
  return gameLogicDisplay + message2;
};

//GLOBAL DEFINITIONS for MAIN FUCNTION
var gameMode = "waiting for input";

var main = function (input) {
  var myOutputValue = "";
  var waitingForInputMsg = ` HOME OUTPUT SCREEN:
                           <br><br>Game Logic: ${gameLogic.toUpperCase()} combined number wins
                           <br><br>Please enter the number of players:`;
  if (
    gameMode == `waiting for input` &&
    playerName == "" &&
    (input.toLowerCase() == "highest" || input == "") // if user keys in "highest" or not, logic = highest wins
  ) {
    gameLogic = "highest";
    myOutputValue = waitingForInputMsg;
    gameMode = "getNumberOfPlayers";
  } else if (
    gameMode == `waiting for input` &&
    playerName == "" &&
    input.toLowerCase() == "lowest"
  ) {
    gameLogic = "lowest";
    myOutputValue = waitingForInputMsg;
    gameMode = "getNumberOfPlayers";
    gameLogic = "lowest";
  } else if (gameMode == `getNumberOfPlayers` && playerName == "") {
    myOutputValue = getNumberOfPlayers(input);
  } else if (gameMode == `inputQtyOfDice`) {
    myOutputValue = inputQtyOfDice(input);
  } else if (gameMode == `setMultiplayerOrKnockOut`) {
    myOutputValue = setMultiplayerOrKnockOut(input);
  } else if (gameMode == `arrangeDiceMultiplayer`) {
    myOutputValue = arrangeDiceMultiplayer(input);
  } else if (gameMode == `arrangeDiceKnockOut`) {
    myOutputValue = arrangeDiceKnockOut(input);
  }

  return myOutputValue;
};
