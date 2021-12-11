//project 2

/* There are 2 players and players take turns.
When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
After both players have rolled and chosen dice order, the player with the higher combined number wins.*/

//set global variables to game mode
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
var main = function (input) {
  var myOutputValue = "hello world";
  return myOutputValue;
};
