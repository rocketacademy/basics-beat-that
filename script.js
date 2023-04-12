// Variable Number of Dice
// Create a new version of Beat That that rolls two or more dice per player.
// At the beginning of each round, ask the players how many dice they would like to play with. Both players will roll the same number of dice each round.
// Store each player's dice rolls in an array. When each player rolls dice, use a loop to place n dice roll values in that player's array, where n is the number of dice the players specified at the beginning of the round. Output each player's dice roll values.
// Auto-generate the optimal combined number based on each player's dice rolls to determine the winner of that round.

let randomDiceNumberOfPlayer1inArray = [];
let randomDiceNumberOfPlayer2inArray = [];

let rollDice = function () {
  let randomDecimal = Math.random() * 6;
  let diceNumber = Math.floor(randomDecimal) + 1;
  return diceNumber;
};

//Create for loop to place n dice roll values in that player's array. Output each player's dice roll values.
let main = function (input) {
  let output = "";
  let gameState = "";
  for (let i = 0; i < input; i += 1) {
    let randomDiceNumberOfPlayer1 = rollDice();
    let randomDiceNumberOfPlayer2 = rollDice();
    randomDiceNumberOfPlayer1inArray.push(randomDiceNumberOfPlayer1);
    randomDiceNumberOfPlayer2inArray.push(randomDiceNumberOfPlayer2);
    console.log(
      "randomDiceNumberOfPlayer1inArray",
      randomDiceNumberOfPlayer1inArray
    );
    console.log(
      "randomDiceNumberOfPlayer2inArray",
      randomDiceNumberOfPlayer2inArray
    );
    output = `Hi, Player 1! Your dice number are: ${randomDiceNumberOfPlayer1inArray} <br> Player 2, your dice number are: ${randomDiceNumberOfPlayer2inArray} <br> Please enter "c" to determine which player is winner.`;
  }
  //when user enter "c", it will determine which player is winner.
  //Auto-generate the optimal combined number based on each player's dice rolls to determine the winner of that round.
  if (input == "c") {
    gameState =
      "GAME STATE_COMPARE THE COMBINED DICE NUMBER BETWEEN TWO PLAYER";
  }
  if (
    gameState ==
    "GAME STATE_COMPARE THE COMBINED DICE NUMBER BETWEEN TWO PLAYER"
  ) {
    //Sort array for dice no in descending order
    randomDiceNumberOfPlayer1inArray.sort((a, b) => b - a);
    randomDiceNumberOfPlayer2inArray.sort((a, b) => b - a);
    //Combine dice no into a single string using reduce method
    let combinedNoOfPlayer1InString = randomDiceNumberOfPlayer1inArray.reduce(
      (acc, curr) => acc + curr,
      ""
    );
    let combinedNoOfPlayer2InString = randomDiceNumberOfPlayer2inArray.reduce(
      (acc, curr) => acc + curr,
      ""
    );
    console.log("combinedNoOfPlayer1InString:", combinedNoOfPlayer1InString);
    console.log("combinedNoOfPlayer2InString:", combinedNoOfPlayer2InString);
    //Convert combined dice number in string to number
    //Create if.else statement to compare combined dice number btw 2 player
    let combinedNoOfPlayer1 = Number(combinedNoOfPlayer1InString);
    let combinedNoOfPlayer2 = Number(combinedNoOfPlayer2InString);
    console.log(combinedNoOfPlayer1);
    console.log(combinedNoOfPlayer2);
    if (combinedNoOfPlayer1 > combinedNoOfPlayer2) {
      output = `Player 1, you won!. Since Player 1's combined number is ${combinedNoOfPlayer1}, player 2's combined number is ${combinedNoOfPlayer2}.<br>Please click submit to reset the game.`;
    } else if (combinedNoOfPlayer2 > combinedNoOfPlayer1) {
      output = `Player 2, you won!. Since Player 1's combined number is ${combinedNoOfPlayer2}, player 2's combined number is ${combinedNoOfPlayer1}.<br>Please click submit to reset the game.`;
    }
  }
  //Create if statement for reset mode
  //ADD INPUT VALIDATION LATER
  return output;
};
