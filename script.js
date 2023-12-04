/*
There are 2 players and players take turns.
When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
After both players have rolled and chosen dice order, the player with the higher combined number wins.
*/
var gameTurn = "player_one";
var player_one_order = 0;
var player_two_order = 0;
// player win count
var player_one_win = 0;
var player_two_win = 0;
var player_tie = 0;
// player rolls
var player_one_first = 0;
var player_one_second = 0;
var player_two_first = 0;
var player_two_second = 0;
// state
var game_mode = "NORMAL";

// how do we reset this after use?

var rollDice = function () {
  var randomDigits = Math.floor(Math.random() * 6) + 1;
  console.log(`Dice rolled ${randomDigits}`);
  return randomDigits;
};
// var leaderBoardMain = function () {
//   console.log(`current game turn: ${gameTurn}`);
//   if (input.toLowerCase() == "board") {
//     gameTurn = "player_one";
//     return `<br><center>LEADER BOARD</center><br>Player One<br>Total Wins: ${player_one_win}<br><br>Player Two<br>Total Wins: ${player_two_win}<br><br>Total Ties: ${player_tie}<br>Click "Play" to continue`;
//   }
// };

var main = function (input) {
  //change to lowest number
  if (input == "lowest") {
    game_mode = "LOWEST";
    gameTurn = "player_one";
    return "Game Mode is now Lowest Combined Number";
  }
  if (gameTurn == "player_one") {
    gameTurn = "player_two";
    player_one_first = rollDice();
    player_one_second = rollDice();
    if (game_mode == "NORMAL") {
      return `Welcome PLAYER ONE.<br> You rolled ${player_one_first} for Dice 1 and ${player_one_second} for Dice 2. <br>Choose the order of the dice and key it in the box above.`;
    }
    if (game_mode == "LOWEST") {
      return `Welcome PLAYER ONE.<br> You rolled ${Math.min(
        player_one_first + player_one_second,
        player_one_second + player_one_first
      )}<br>Lowest combined number is the winner!.`;
    }
  }
  if (gameTurn == "player_two" || gameTurn == "player_one_retry") {
    if (game_mode == "NORMAL") {
      player_one_order = input;
      if (
        player_one_order ==
          String(player_one_first) + String(player_one_second) ||
        player_one_order == String(player_one_second) + String(player_one_first)
      ) {
        console.log("player one order is: " + player_one_order);
        gameTurn = "player_two";
      } else {
        gameTurn = "player_one_retry";
        return `PLAYER ONE please try again. <br> You rolled ${player_one_first} for Dice 1 and ${player_one_second} for Dice 2. <br>Choose the order of the dice and key it in the box above`;
      }
    }
    if (game_mode == "LOWEST") {
      player_one_order = Math.min(
        player_one_first + player_one_second,
        player_one_second + player_one_first
      );
    }
  }
  if (gameTurn == "player_two") {
    gameTurn = "compare_order";
    player_two_first = rollDice();
    player_two_second = rollDice();
    if (game_mode == "NORMAL") {
      return `Welcome PLAYER TWO.<br> You rolled ${player_two_first} for Dice 1 and ${player_two_second} for Dice 2. <br>Choose the order of the dice and key it in the box above.`;
    }
    if (game_mode == "LOWEST") {
      return `Welcome PLAYER TWO.<br> You rolled ${Math.min(
        player_two_first + player_two_second,
        player_two_second + player_two_first
      )}<br>Lowest combined number is the winner!.`;
    }
  }
  if (gameTurn == "compare_order" || gameTurn == "player_two_retry") {
    if (game_mode == "NORMAL") {
      player_two_order = input;
      if (
        player_two_order ==
          String(player_two_first) + String(player_two_second) ||
        player_two_order == String(player_two_second) + String(player_two_first)
      ) {
        console.log("player one order is: " + player_two_order);
        gameTurn = "compare_order";
      } else {
        gameTurn = "player_two_retry";
        return `PLAYER ONE please try again. <br> You rolled ${player_two_first} for Dice 1 and ${player_two_second} for Dice 2. <br>Choose the order of the dice and key it in the box above`;
      }
    }
    if (game_mode == "LOWEST") {
      player_one_order = Math.min(
        player_two_first + player_two_second,
        player_two_second + player_two_first
      );
    }
  }
  if (gameTurn == "compare_order") {
    console.log(`player 2 roll: ` + player_two_first);
    console.log(`player 2 roll 2: ` + player_two_second);
    player_two_order = input;
  }

  if (gameTurn == "compare_order") {
    gameTurn = "player_one";
    if (player_one_order > player_two_order) {
      player_one_win += 1;
      myOutputValue = `<center>PLAYER ONE WINS!</center><br>Player One<br>Total Wins: ${player_one_win}<br><br>Player Two<br>Total Wins: ${player_two_win}<br><br>Total Ties: ${player_tie}<br><br>Click "Play" to continue!<br>`;
    } else if (player_one_order < player_two_order) {
      player_two_win += 1;
      myOutputValue = `<center>PLAYER TWO WINS!</center><br>Player One<br>Total Wins: ${player_one_win}<br><br>Player Two<br>Total Wins: ${player_two_win}<br><br>Total Ties: ${player_tie}<br><br>Click "Play" to continue!<br>`;
    } else if (player_one_order == player_two_order) {
      player_tie += 1;
      myOutputValue = `<center>TIE!</center><br>Player One<br>Total Wins: ${player_one_win}<br><br>Player Two<br>Total Wins: ${player_two_win}<br><br>Total Ties: ${player_tie}<br><br>Click "Play" to continue!<br>`;
    }
    // create a logic where there is an additional output string of player 1 is leading the score with <score> wins! While player 2 is trailing behind with <score> wins!
    if (player_one_win != 0 || player_two_win != 0) {
      counter_string = `<center><br>LEADERBOARD<br>1st: PLAYER ONE<br>2nd: PLAYER TWO</center>`;
    }
    if (player_two_win > player_one_win) {
      counter_string = `<center><br>LEADERBOARD<br>1st: PLAYER TWO<br>2nd: PLAYER ONE</center>`;
    }
    if (player_two_win == player_one_win) {
      counter_string = `<center><br>LEADERBOARD<br>Tie: PLAYER ONE<br>Tie: PLAYER TWO</center>`;
    }
    return myOutputValue + counter_string;
  }
  if (gameTurn == "leaderboard") {
    gameTurn = "player_one";
  }
};
