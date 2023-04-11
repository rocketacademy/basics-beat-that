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
    output = `Hi, Player 1! Your dice number are: ${randomDiceNumberOfPlayer1inArray} <br> Player 2, your dice number are: ${randomDiceNumberOfPlayer2inArray} <br> Please click submit.`;
  }

  //Auto-generate the optimal combined number based on each player's dice rolls to determine the winner of that round.

  return output;
};
