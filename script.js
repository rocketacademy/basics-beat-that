//project 2

/* There are 2 players and players take turns.
When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
After both players have rolled and chosen dice order, the player with the higher combined number wins.*/

//set global variables to game mode
var GAMEMODE_WAITING_FOR_NAME1 = "waiting for player 1 to key in name";
var GAMEMODE_WAITING_FOR_NAME2 = "waiting for player 2 to key in name";
var GAMEMODE_PLAYER1 = "Player 1 mode";
var GAMEMODE_PLAYER2 = "Player 2 mode";
var GAMEMODE_T0_CHOOSE_ORDER = "For player to choose order of dice";
var TO_CHOOSE_WINNER = "Compare player 1 and player dice results";
var GAMEMODE_T0_CHOOSE_PLAYER = "either player 1 or 2";

var GAME_STATE = GAMEMODE_WAITING_FOR_NAME1;
var GAMEPLAYER = GAMEMODE_PLAYER1;
var player1CombinedNumber = 0;
var player2CombinedNumber = 0;

//-----------------------------------------------------------------------------------
//diceroll1 and diceroll2 corresponds to player 1 dice roll results
var diceRoll1 = 0;
var diceRoll2 = 0;

const rollDice = () => (randomNumber = Math.floor(Math.random() * 6 + 1));

//output to show the results of 2 dice roll
const showsDiceRollsResult = () => {
  let diceRollsresult = [];
  for (let i = 0; i < 2; i++) {
    var singleDiceRollresult = rollDice();
    diceRollsresult.push(singleDiceRollresult);
  }

  //diceRollsresult --> store an array with 2 diceroll result
  diceRoll1 = diceRollsresult[0];
  diceRoll2 = diceRollsresult[1];

  return `This is the result of your dice rolls <br> ------------------------------------ <br> DiceRoll 1: ${diceRoll1} <br> DiceRoll 2: ${diceRoll2} `;
};

//function to show game player 1 or game player 2 choice
const showGamePlayerChoice = (GAMEPLAYER, userChoiceOrder) => {
  GAME_STATE = GAMEMODE_WAITING_FOR_NAME2;

  if (GAMEPLAYER == GAMEMODE_PLAYER1) {
    if (userChoiceOrder == 1) {
      player1CombinedNumber = Number(`${diceRoll1}${diceRoll2}`);
      return `Your number is ${player1CombinedNumber}. It's now player 2's turn. Player 2 please enter your name. `;
    }
    if (userChoiceOrder == 2) {
      player1CombinedNumber = Number(`${diceRoll2}${diceRoll1}`);
      return `Your number is ${player1CombinedNumber}. It's now player 2's turn. Player 2 please enter your name.`;
    }
  }

  if (GAMEPLAYER == GAMEMODE_PLAYER2) {
    GAME_STATE = TO_CHOOSE_WINNER;
    if (userChoiceOrder == 1) {
      player2CombinedNumber = Number(`${diceRoll1}${diceRoll2}`);
      return `Player 2: Your number is ${player2CombinedNumber} Now let's see who wins!.Please click submit to see the result`;
    }
    if (userChoiceOrder == 2) {
      player2CombinedNumber = Number(`${diceRoll2}${diceRoll1}`);
      return `Player 2: Your number is ${player2CombinedNumber}.Now let's see who wins! Please click submit to see the result`;
    }
  }
};

const toCompareNumber = (player1number, player2number) => {
  return player1number == player2number
    ? "It is a draw"
    : player1number > player2number
    ? "Player 1 wins"
    : "Player 2 wins";
};

//to change game mode: default is waiting for user to key in name
const changeGameMode = (userInput) => {
  //input for user to key in name
  if (GAME_STATE == GAMEMODE_WAITING_FOR_NAME1) {
    if (Number.isNaN(Number(userInput)) == false) {
      return "This is not a valid input, please key in your name.";
    } else {
      var player1Name = userInput;
      //to choose game player and to choose game state; now Player 1 mode and to choose player
      GAMEPLAYER = GAMEMODE_PLAYER1;
      GAME_STATE = GAMEMODE_T0_CHOOSE_PLAYER;
      return `PLAYER 1<br> ------------------------ <br> Hi ${player1Name}. You are first! <br> Please click submit to roll the dice.`;
    }
  }

  // now game state is to choose player

  if (GAME_STATE == GAMEMODE_T0_CHOOSE_PLAYER) {
    if (GAMEPLAYER == GAMEMODE_PLAYER1 || GAMEPLAYER == GAMEMODE_PLAYER2) {
      if (userInput == "") {
        var playerdiceRollresult = showsDiceRollsResult();
        // To output the results of the dice roll and for user to input 1/2 for order of dice roll
        GAME_STATE = GAMEMODE_T0_CHOOSE_ORDER;
        return (
          playerdiceRollresult +
          `<br> <br>Please key in <1> or <2> to choose the order of your dice: <br> <1>: For number corresponding on dice 1 to go first.<br> <2>: For number corresponding on dice 2 to go first.<br><br> Please note the higher combined number will win.`
        );
      }
    }
  }

  // now game state is to choose order
  if (GAME_STATE == GAMEMODE_T0_CHOOSE_ORDER) {
    return showGamePlayerChoice(GAMEPLAYER, userInput);
  }

  //game state for player 2 to key in name
  if (GAME_STATE == GAMEMODE_WAITING_FOR_NAME2) {
    var player2Name = userInput;
    GAME_STATE = GAMEMODE_T0_CHOOSE_PLAYER;
    GAMEPLAYER = GAMEMODE_PLAYER2;
    return `PLAYER 2<br> ------------------------ <br> Hi ${player2Name}. You are next <br> Please click submit to roll the dice.`;
  }

  if (GAME_STATE == TO_CHOOSE_WINNER) {
    GAME_STATE = GAMEMODE_T0_CHOOSE_PLAYER;
    GAMEPLAYER = GAMEMODE_PLAYER1;
    if (userInput == "") {
      return `${toCompareNumber(
        player1CombinedNumber,
        player2CombinedNumber
      )} <br> Player 1's number is ${player1CombinedNumber}.<br>
      Player 2's number is ${player2CombinedNumber}.<br><br> Please click submit for player 1 to roll the dice again `;
    }
  }
  player2CombinedNumber = 0;
  player1CombinedNumber = 0;
  //to restart the game again back to player 1
};
var main = function (input) {
  var result = changeGameMode(input);
  return result;
};
