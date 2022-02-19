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

P1_ROLL = "P1 ROLL";
P2_ROLL = "P2 ROLL";
GAME_RESULT = "RESULT";

var gameState = P1_ROLL;

// dice rolling function. rounds up to the nearest integer.
var rollDice = function () {
  var output = Math.ceil(Math.random() * 6);
  return output;
};

// main function for game to play
var main = function (input) {
  p1Dice = [];
  p2Dice = [];

  if (gameState == P1_ROLL) {
    p1Dice.push(rollDice());
    p1Dice.push(rollDice());
  }
  return rollDice();
};
