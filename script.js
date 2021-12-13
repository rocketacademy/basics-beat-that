/* 
There are 2 players and players take turns.
When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
After both players have rolled and chosen dice order, the player with the higher combined number wins.
*/

// Global Var
player1diceResults = []
player2diceResults = []
player1 = ""
player2 = ""
player1Number = 1
player2Number = 2
// 


var rollDice = function(){
  // Create a dice rolling from 1 - 6
  var randomDice = Math.floor(Math.random() * 6) + 1
  console.log(`Dice roll: ${randomDice}`)
  return randomDice
}

var roll2Dice = function(array){
  firstDice = rollDice()
  secondDice = rollDice()
  array.push(firstDice)
  array.push(secondDice)
  console.log(`roll2Dice: ${firstDice}, ${secondDice}`)
  console.log(`array: ${array}`)
  console.log(`player1diceResults: ${player1diceResults}`)
  console.log(`player2diceResults: ${player2diceResults}`)
  return array
}

var playerTurn = function(playerNumber,choice,playerArray){
  if (playerNumber == 1 && choice == null){
    player1diceResults = roll2Dice(player1diceResults)
    myOutputValue = `Player ${playerNumber}, Here is your rolled dice result: <br><br>
    dice 1 : ${player1diceResults[0]} <br><br>
    dice 2 : ${player1diceResults[1]} <br><br>
    Please choose the order of desired dice result. <br>
    Type 1 and click enter if you wish for dice 1 to be the first number <br>
    Type 2 and click enter if you wish for dice 2 to be the first number`;
    return myOutputValue
  }
  else if (playerNumber == 2 && choice == null){
    player2diceResults = roll2Dice(player2diceResults)
    myOutputValue = `Player ${playerNumber}, Here is your rolled dice result: <br><br>
    dice 1 : ${player2diceResults[0]} <br><br>
    dice 2 : ${player2diceResults[1]} <br><br>
    Please choose the order of desired dice result. <br>
    Type 1 and click enter if you wish for dice 1 to be the first number <br>
    Type 2 and click enter if you wish for dice 2 to be the first number`;
    return myOutputValue
  }
  else if (choice == 1){
    myOutputValue = `${playerNumber} have chose dice 1 to be the first in order, your result is ${playerArray[0]}${playerArray[1]} <br><br>
    Click enter for next.`;

    console.log(`player ${playerNumber} dice results: ${playerArray[0]}${playerArray[1]}`);
    console.log(`user dice order: ${choice}`);
    return myOutputValue
  }
  else if (choice == 2){
    myOutputValue = `${playerNumber} have chose dice 2 to be the first in order, your result is ${playerArray[1]}${playerArray[0]} <br><br>
    Click enter for next.`;

    console.log(`player ${playerNumber} dice results: ${playerArray[1]}${playerArray[0]}`);
    console.log(`user dice order: ${choice}`);
    return myOutputValue
  }
}

// 3 conditions: 
// a > b
// b < a
// a == b
var gameOutcome = function () {
  if (Number(player1diceResults.join("")) > Number(player2diceResults.join(""))) {
    myOutputValue = `Congratulations ${player1} for winning!!! <br><br>
    ${player1} BEATS ${player2} with a score of ${Number(player1diceResults.join(""))} against ${Number(player2diceResults.join(""))} <br><br>
    Click enter to start another new game`;
    return myOutputValue;
  } 
  else if (Number(player2diceResults.join("")) > Number(player1diceResults.join(""))) {
    myOutputValue = `Congratulations ${player2} for winning!!! <br><br>
     ${player2} BEATS ${player1} with a score of ${Number(player2diceResults.join(""))} against ${Number(player1diceResults.join(""))}<br><br>
    Click enter to start another new game`;
    return myOutputValue;
  }
  else if (Number(player2diceResults.join("")) == Number(player1diceResults.join(""))){
    myOutputValue = `Issa Draw lubba dubba dub dub <br><br>
    Click enter to start another new game`;
    return myOutputValue;
  }
};




currentGameMode = "Welcome to Beat That"
var main = function (input) {
  if (currentGameMode == "Welcome to Beat That"){
    myOutputValue = `Welcome to BEAT THAT!<br><br>
     Player 1 please enter your name and click ENTER, followed by player 2 name and click ENTER to start the game. <br><br>
      Game Rules: <br>
      1. This is a 2 person, player vs player game. <br>
      2. The game will roll 2 dice and show the dice rolls result. For example, dice 1 rolled 3 and dice 2 rolled 4. <br>
      3. The player that rolled the dice will pick the order of the dice.(If they wanted the number 43, they would specify that the 2nd dice goes first.) <br>
      4. After both players have rolled and chosen their dice order, the player with the higher combined number wins.  `;

    currentGameMode = "Enter Player 1 name";
    console.log(`currentGameMode: ${currentGameMode}`);

    return myOutputValue;
  }
  // Take in player 1 and 2 names
  if (currentGameMode == "Enter Player 1 name"){
    player1 = input
    currentGameMode = "Enter Player 2 name"
    console.log(`Player 1: ${player1}`);
    myOutputValue = `Welcome ${player1}. <br> Player 2, please enter your name click enter. `;
    console.log(`currentGameMode: ${currentGameMode}`);
    return myOutputValue
  }
  if (currentGameMode == "Enter Player 2 name"){
    player2 = input
    currentGameMode = "Player 1 turn"
    console.log(`Player 2: ${player1}`);
    myOutputValue = `Welcome ${player2}. <br> Player 1, press enter to start your roll `;
    console.log(`currentGameMode: ${currentGameMode}`);
    return myOutputValue
  }
  // 
  var choiceErrorMsg = function(playerNum){
    if(playerNum == 1){
      return `Please enter your choice. <br><br> 
      dice 1 : ${player1diceResults[0]} <br><br>
      dice 2 : ${player1diceResults[1]} <br><br>
      Please choose the order of desired dice result. <br>
      Type 1 and click enter if you wish for dice 1 to be the first number <br>
      Type 2 and click enter if you wish for dice 2 to be the first number`}
    else if (playerNum == 2){
      return `Please enter your choice. <br><br> 
      dice 1 : ${player2diceResults[0]} <br><br>
      dice 2 : ${player2diceResults[1]} <br><br>
      Please choose the order of desired dice result. <br>
      Type 1 and click enter if you wish for dice 1 to be the first number <br>
      Type 2 and click enter if you wish for dice 2 to be the first number`
    }
  }

  // Start player's turn
  // Player will output dice result
  // Player will choose which dice to put first
  // ^Create shared function to do 2 things to be reused for player 2
  if(currentGameMode == "Player 1 turn"){
    myOutputValue = playerTurn(1)
    currentGameMode = "Player 1 choice"
    console.log(`currentGameMode: ${currentGameMode}`);
    return myOutputValue
  }
  if(currentGameMode == "Player 1 choice" && input != ""){
    player1DiceOrder = input
    myOutputValue = playerTurn(1, player1DiceOrder,player1diceResults)
    currentGameMode = "Player 2 turn"
    console.log(`currentGameMode: ${currentGameMode}`);
    return myOutputValue
  }
  else if(currentGameMode == "Player 1 choice" && input == ""){
    currentGameMode = "Player 1 choice"
    return choiceErrorMsg(1)
  }
  if(currentGameMode == "Player 2 turn"){
    myOutputValue = playerTurn(2)
    currentGameMode = "Player 2 choice"
    console.log(`currentGameMode: ${currentGameMode}`);
    return myOutputValue
  }
  if(currentGameMode == "Player 2 choice" && input != ""){
    player2DiceOrder = input
    myOutputValue = playerTurn(2, player2DiceOrder,player2diceResults)
    currentGameMode = "Game Outcome"
    console.log(`currentGameMode: ${currentGameMode}`);
    return myOutputValue
  }
  else if(currentGameMode == "Player 2 choice" && input == ""){
    currentGameMode = "Player 2 choice"
    return choiceErrorMsg(2)
  }
  if (currentGameMode == "Game Outcome"){
    myOutputValue = gameOutcome()
    console.log(`currentGameMode: ${currentGameMode}`);
    currentGameMode = "Player 1 turn"
    // reinitialise array data
    player1diceResults = []
    player2diceResults = []
    return myOutputValue
  }
};
