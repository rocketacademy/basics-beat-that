var numOfDice = 2;
var currPlayer = 1;
var currGameMode = "enterName";
var dice1 = 0;
var dice2 = 0;
var names = 0;
var scoreBoard = 0;
var p1Name = "Player 1"
var p2Name = "Player 2"
//Arrays
var player1Number = [];
var player2Number = [];
var totalScores = [];


// Helper functions
// var hello = function(name){
//   return 'Welcome ' + name + ' You are Player ' + currPlayer + ' Click "Submit" to roll your dice';
// }

//Generate dice number & Convert to string
var generateDiceNumber = function () {
  var diceNumber = Math.floor(Math.random() * 6) + 1;
  return diceNumber
};



// Check if Dice are the same
var sameDice = function (){
  if (dice1 == dice2){
    return true;
  }
  return false;
}
// If input is NOT empty, return string
var inputNotEmpty = function (playerInput){
  
  if (playerInput == "" ){
    return true;
  }
}

// Rolls 2 numbers > make to for loop
var diceRoll2 = function (){
  for (let counter = 0; counter < 2; counter+=1) {
    player1Number.push(generateDiceNumber());
  }
  return  "Your Dice One is " + player1Number[0]+ ". <br> Your Dice Two is " + player1Number[1];

}

var playerRollDice = function (){
  return `Welcome Player ${currPlayer}.
  <br> 
  <br> ${diceRoll2()}
  <br>
  <br>Choose your Number position. 
  <br>Enter 1: ` +  player1Number[0]+ player1Number[1] + '<br>Enter 2: ' +  player1Number[1] + player1Number[0];
}
//loop function for player number

// Choose order of numbers

var combineDice = function (playerChoice){
  console.log(player1Number[0]+ player1Number[1]);
  if (playerChoice == 1){
    return "You Chose " + player1Number[0]+ player1Number[1];
  }
  if (playerChoice == 2){
    return "You Chose " + player1Number[1]+ player1Number[0];
  }
}


var scoreBoard = function () {
  myOutputValue =
    "Player 1 score:" +
    totalScores[0] +
    "<br><br> Player 2 score:" +
    totalScores[1];
  // Player 1 Wins
  if (totalScores[0] > totalScores[1]) {
    return myOutputValue + "<br><br>Player 1 Wins!";
  }
  // Player 2 Wins
  if (totalScores[1] > totalScores[0]) {
    return myOutputValue + "<br><br>Player 2 Wins!";
  }
  // Tie Scenario
  if (totalScores[0] == totalScores[1]) {
    return myOutputValue + "<br><br>It's a Draw.";
  }
}


//   for (let index = 0; index < array.length; index++) {
  //     const element = array[index];
  
  //MAIN FUNCTION - calling all the functions
  var main = function (input){
  
    // handle initial load of game
    if (currGameMode == "enterName"){
      diceRoll2()
      names = input;
      currPlayer = 1
      currGameMode = "gameStart"
      console.log(currGameMode);
      return playerRollDice();
    }
    
    //check if no chosen number
    if (inputNotEmpty(input)){
      return `Choose your Number position. 
      <br>Enter 1: ` + player1Number[0]+ player1Number[1] + '<br>Enter 2: ' + player1Number[1]+ player1Number[0];
    }
    
    // to change gameMode to chooseNumPosition
    //Players their number position
    // gameplay logic
    if (currGameMode = "gameStart") {
      // check user input
      if (input != 1 && input != 2){
        return "please enter 1 or 2"
      }
      currGameMode = "chooseNumPosition";
    }

      // check if currGameMode changed
      console.log(currGameMode);
      return combineDice(input)
    }

  //   if (input == 1 || input == 2){
  //     currGameMode = "enterName"
  //     return (combineDice(input));
  //   }
  //   console.log(currGameMode);
  // // ;
  
  //   if (currPlayer === 2){
  //     currGameMode = "enterName";
  //     return scoreBoard()
  //   }
  

  
    // for (let index = 0; index < numOfPLayers.length; index++) {
    //   const element = numOfPLayers[index];
      
    // }
  
  console.log(currGameMode);
  
  console.log(combineDice);
  // if (input == 1 || input ==2){
  //     return inputNotEmpty();