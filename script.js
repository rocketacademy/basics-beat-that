// There are 2 players and players take turns.
// on clicking submit, the game rolls two dices
// and shows the dice rolls, eg 3,6
// the player picks the order of the dice they want
// if 63,they specify the second dice goes first
// choose how the player specifies the dice order
// both playes roll dices
// the player with the highest combined the dice number wins

// =====problem breakdown====
// ver1. rolls 2 dice and turns the output for player 1. that player chooses the dice order andget the correct return output
// 2. refactored code to include player2
// 3. Implement compring dice scores and declare winner
// 4. reset the game so that players can play continually without refreshing the browser page

var diceRoll = "roll dice";
var chooseDiceOrder = " choose dice order";
var gameState = diceRoll;

var play1rolls = [];

// helper function
var rollDice = function () {
  // random decimal betweeen 0 and 6
  var randomDecimal = Math.random() * 6;
  // random integer from 1-6
  var randomInteger = Math.floor(randomDecimal) + 1;
  console.log("rollDice output, random integer", randomInteger);
  return randomInteger;
};
var rollDiceForPlayer = function(){
var counter = 0
while(counter < 2){
  playerRolls.push(rollDice)
  counter = counter +1
}
}
var main = function (input) {
  var myOutputmessage = ""
  if(gameState == diceRoll){
// display dice rolled as output message
    myOutputmessage = rollDiceForPlayer()
// change the game gamestate
gameState = chooseDiceOrder
return myOutputmessage

if(gameState == chooseDiceOrder){

  // input validations
if( input != 1 && input != 2)

  // input == 1
  if(input == 1){
    var playerScore = playerRolls[0] + playerRolls[1])
    return "your chosen value is" + playerScore
  }
  // input == 02

}
  }
  
};

