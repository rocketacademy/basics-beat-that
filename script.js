/*There are 2 players and players take turns.

When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.

The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.

After both players have rolled and chosen dice order, the player with the higher combined number wins.*/

/* Pseudo code for basic project 2
when click submit, roll 2 dice, output the 2 dice roll.

player pick 1st dice order by inputting 1 or 2

concat the player guess + remaining as dice roll result

next player

repeat dice roll and order

compare results, higher result win
*/

// GLOBAL VARIBLES
var MODE = "player 1 init"; // init and order
var PLAYER1 = [];
var PLAYER2 = [];
var resultPlayer1 = "";
var resultPlayer2 = "";

var rollDice = function () {
  var diceValue = Math.floor(Math.random() * 6) + 1; // return 1 to 6 inclusive
  console.log(`running function rollDice: ${diceValue}`);
  console.log("====================");
  return diceValue;
};

var main = function (input) {
  // first load = init, player 1 starts first
  if (MODE === "player 1 init") {
    // when submit, roll 2 dice
    PLAYER1[0] = rollDice();
    PLAYER1[1] = rollDice();
    MODE = "player 1 order";
    return `Welcome Player 1.
    <br>
    You rolled ${PLAYER1[0]} for Dice 1 and ${PLAYER1[1]} for Dice 2
    <br>
    Choose the order of the dice.
    <br>
    Input "12" or "21" for your dice order.`;
  }

  // mode = order, player 1 choose dice order '12' or '21'
  if (MODE === "player 1 order") {
    // check if input is '12' or '21'
    // TODO user input verification
    if (input === "12") {
      resultPlayer1 = String(PLAYER1[0]) + String(PLAYER1[1]);
      console.log(`running input '12': ${resultPlayer1}`);
      console.log("====================");
      MODE = "player 2 init";
      return `Player 1, you chose Dice 1 first.
      <br>
      Your number is ${resultPlayer1}.
      <br>
      It is now Player 2's turn.
      <br>
      Click Submit`;
    }
    if (input === "21") {
      resultPlayer1 = String(PLAYER1[1]) + String(PLAYER1[0]);
      console.log(`running input '21': ${resultPlayer1}`);
      console.log("====================");
      MODE = "player 2 init";
      return `Player 1, you chose Dice 2 first.
      <br>
      Your number is ${resultPlayer1}.
      <br>
      It is now Player 2's turn.
      <br>
      Click Submit`;
    }
  }

  // Repeat for Player 2
  if (MODE === "player 2 init") {
    // when submit, roll 2 dice
    PLAYER2[0] = rollDice();
    PLAYER2[1] = rollDice();
    MODE = "player 2 order";
    return `Welcome Player 2.
    <br>
    You rolled ${PLAYER2[0]} for Dice 1 and ${PLAYER2[1]} for Dice 2
    <br>
    Choose the order of the dice.
    <br>
    Input "12" or "21" for your dice order.`;
  }

  // mode = order, player 2 choose dice order '12' or '21'
  if (MODE === "player 2 order") {
    // check if input is '12' or '21'
    // TODO user input verification
    if (input === "12") {
      resultPlayer2 = String(PLAYER2[0]) + String(PLAYER2[1]);
      console.log(`running input '12': ${resultPlayer2}`);
      console.log("====================");
      MODE = "compare";
      return `Player 2, you chose Dice 1 first.
      <br>
      Your number is ${resultPlayer2}.`;
    }
    if (input === "21") {
      resultPlayer2 = String(PLAYER2[1]) + String(PLAYER2[0]);
      console.log(`running input '21': ${resultPlayer2}`);
      console.log("====================");
      MODE = "compare";
      return `Player 2, you chose Dice 2 first.
      <br>
      Your number is ${resultPlayer2}.`;
    }
  }

  if (MODE === "compare") {
    // assume no draw
    if (Number(resultPlayer1) > Number(resultPlayer2)) {
      MODE = "player 1 init";
      return `Player 1 wins`;
    } else {
      MODE = "player 1 init";
      return `Player 2 wins`;
    }
  }
  // TO DO - REFACTOR
  var myOutputValue = "hello world";
  return myOutputValue;
};
