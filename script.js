/* 
Player 1 rolls two dice. 
Store both dice to a list. 

Ask player for input: first or second number. 
if first: 
  Number(String(list[0]) + String(list[1]))
if second: 
  Number(String(list[1]) + String(list[0]))

Save number. 

Player 2 rolls two dice. 
Store both dice to a list. 

Ask player for input: first or second number. 
if first: 
  Number(String(list[0]) + String(list[1]))
if second: 
  Number(String(list[1]) + String(list[0]))

Save number. 

Compare the two numbers. 
Bigger number wins. 

*/

// game states for rolling dice.
let P1_ROLL = "P1 ROLL";
let P2_ROLL = "P2 ROLL";

// can I make this a counter for user number instead?
// and ask the user for the number of players (>2, <5 maybe?)
let numOfPlayers = 2;
let playerTurn = 1;
// can increment player turn one by one?
// so that I don't have to write the same function numOfPlayers times to change the number of players in the game.
// so instead of P1/P2_ROLL and P1/P2_CHOOSE,
// it'll just become ROLL and CHOOSE modes,
// with the player number / counter increasing for each turn.
// until playerTurn == numOfPlayers, then switch to RESULT.

// game states for picking number order.
let P1_CHOOSE = "P1 CHOOSE";
let P2_CHOOSE = "P2 CHOOSE";

// game state to return result and winner.
let GAME_RESULT = "RESULT";

let RESTART = "RESTART";

// initialised game state.
var gameState = P1_ROLL;

// variables to store player numbers.
let p1Dice = [];
let p2Dice = [];

let p1Number = "";
let p2Number = "";

// variables to store total player score.
let p1Score = 0;
let p2Score = 0;

// dice rolling function. rounds up to the nearest integer.
var rollDice = function () {
  var output = Math.ceil(Math.random() * 6);
  console.log(output);
  return output;
};

// function to convert two separate numbers into single number.
var joinNumber = function (array, index) {
  var output = "";

  if (index == 1) {
    // convert each number in the array to a string
    // then concatenate them and turn the resulting
    // string back into a number.
    output = Number(String(array[0]) + String(array[1]));
    return output;
  }

  if (index == 2) {
    output = Number(String(array[1]) + String(array[0]));
    return output;
  }
};

// comparison function to see if player 1 is bigger than player 2.
var compareNumbers = function (number1, number2) {
  return number1 > number2;
};

// main function for game to play.
var main = function (input) {
  let output = "";

  // states for rolling dice, and presenting dice.
  if (gameState == P1_ROLL) {
    // roll two dice, and push them to the p1Dice array.
    let firstDie = rollDice();
    p1Dice.push(firstDie);
    let secondDie = rollDice();
    p1Dice.push(secondDie);

    // switch modes for player 1 choose the order.
    gameState = P1_CHOOSE;

    // inform player of the two numbers, and ask for order.
    output = `Player 1, you rolled <b>${firstDie}</b> and <b>${secondDie}</b>. 
    </br> </br> 
    Please type in '1' or '2' to indicate which number you want to be the first.`;
    return output;
  }

  if (gameState == P2_ROLL) {
    output = "";

    let firstDie = rollDice();
    p2Dice.push(firstDie);
    let secondDie = rollDice();
    p2Dice.push(secondDie);

    gameState = P2_CHOOSE;

    output = `Player 2, you rolled <b>${firstDie}</b> and <b>${secondDie}</b>. 
    </br> </br> 
    Please type in '1' or '2' to indicate which number you want to be the first.`;
    return output;
  }

  // states for choosing dice order, and presenting the final number.
  if (gameState == P1_CHOOSE) {
    // input validation to make sure the user only chooses 1 or 2.
    if (input != "1" && input != "2") {
      output = "Please enter either 1 or 2.";
      return output;
    }

    // convert the two numbers into a single number.
    p1Number = joinNumber(p1Dice, input);
    p1Score += p1Number;

    // switch over to player 2.
    gameState = P2_ROLL;

    // ask second player to roll his dice.
    output = `Player 1, you have indicated ${input} as your choice. 
    </br> </br> 
    Your final number is: <b>${p1Number}</b>. 
    </br> </br> 
    It's Player 2's turn now. Please click submit to roll the dice. `;
    return output;
  }

  if (gameState == P2_CHOOSE) {
    if (input != "1" && input != "2") {
      output = "Please enter either 1 or 2.";
      return output;
    }

    p2Number = joinNumber(p2Dice, input);
    p2Score += p2Number;

    // switch over to final result.
    gameState = GAME_RESULT;

    // ask second player to roll his dice.
    output = `Player 2, you have indicated ${input} as your choice. 
    </br> </br> 
    Your final number is: <b>${p2Number}</b>. 
    </br> </br> 
    It's time to reveal the winner. Click submit to find out who had the bigger number. `;
    return output;
  }

  // state for comparing numbers and presenting game result.
  if (gameState == GAME_RESULT) {
    // if p1Number > p2Number, this variable will be true.
    let p1Win = compareNumbers(p1Number, p2Number);

    // if p1Win is true, this code runs.
    if (p1Win) {
      output = `Player 1 rolled <b>${p1Number}</b>, which is bigger than <b>${p2Number}</b>. Player 1 won!
      </br> </br> 
      SCORES: 
      </br> 
      Player 1: <b>${p1Score}</b> 
      </br> 
      Player 2: <b>${p2Score}</b> 
      </br> </br> 
      Please type "RESTART" to play again. `;

      gameState = RESTART;

      return output;
    }

    // if p1Win is false, then !false = true, so this code runs.
    if (!p1Win) {
      output = `Player 2 rolled <b>${p2Number}</b>, which is bigger than <b>${p1Number}</b>. Player 2 won! 
      </br> </br> 
      SCORES: 
      </br> 
      Player 1: <b>${p1Score}</b> 
      </br> 
      Player 2: <b>${p2Score}</b> 
      </br> </br> 
      Please type "RESTART" to play again. `;

      gameState = RESTART;

      return output;
    }
  }

  // state for restarting the game.
  if (gameState == RESTART) {
    // tell user to what to type in, if they did not type it in.
    output = `Please type in "RESTART" to play again!`;

    // if user types in "RESTART", game begins again, starts at P1.
    if (input == "RESTART" || input == "restart" || input == "Restart") {
      output = `Let's play again! </br> </br> Player 1, press submit to start rolling the dice. `;

      gameState = P1_ROLL;

      // re-initialise the dice storage variables
      // so that it doesn't still read the previous round's values.
      p1Dice = [];
      p2Dice = [];

      return output;
    }

    return output;
  }

  return output;
};
