//Roll the dice and put them in order to make the highest number possible. If you roll a 4 and an 6, for example, your best answer would be 64. Using 3 dice, a roll of 3, 5 and 2 should give you 532, and so on. Write down your answer, pass the dice, and challenge the next player to Beat That!

//Game mode (playerSelection, diceGuess, checkWinner) and player number
var gameMode = "playerSelection";
var playerNumber = 0;

//Game state for highest or lowest combined score
var gameState =''

//Global List for recording player rolls
var playerOneList = [];
var playerTwoList = [];

//Global Player Number sum & score
var playerScore = [Number(0), Number(0)];
var playerOneSum = 0;
var playerTwoSum = 0;

//Number of rounds players played
var roundsPlayer= [Number(0),Number(0)];

var main = function (input) {
  if (gameState ==''){
    var output = ''
    gameState = input.toLowerCase();
    if(gameState !='highest'&&gameState!='lowest'){
      return `Please choose highest or lowest number mode`
    }
    else{
    return `You have selected ${input} number mode, Enter Player Number to start`
    }
  }
  if (gameMode == "playerSelection") {
    playerNumber = input;
    output = checkInput(input)
    
    if (input =='check'){
      gameMode='checkWinner'
    }

    if (playerNumber == 1) {
      playerOneList = [diceRoll(), diceRoll()];
      return playerRoll(playerNumber, playerOneList);
    }
    if (playerNumber == 2) {
      playerTwoList = [diceRoll(), diceRoll()];

      return playerRoll(playerNumber, playerTwoList);
    }
  }

  //If Dice rolled, add two numbers and return
  if (gameMode == "diceGuess") {
    // output = checkInput(input);
    // if(input == 'check'){
    //   gameMode='checkWinner'
    // }
    if (playerNumber == 1) {
      //Reset game to run for playerTwo
      gameMode = "playerSelection";
      playerOneSum = checkOrder(playerOneList);
      playerScore[0] += Number(playerOneSum);
      roundsPlayer[0] +=1
      gameMode = 'checkWinner'
      return `Player ${playerNumber}, you chose Dice ${input} first.<br>Your number is ${playerOneSum}<br>Your current total is ${playerScore[0]}<br>Enter check to see current results`;
    }
    if (playerNumber == 2) {
      gameMode = "playerSelection";
      playerTwoSum = checkOrder(playerTwoList);
      playerScore[1] += Number(playerTwoSum);
      roundsPlayer[1] +=1
      return `Player ${playerNumber}, you chose Dice ${input} first.<br>Your number is ${playerTwoSum}<br>Your current total is ${playerScore[1]}<br>Enter check to see current results`;
    }
  }

  if (gameMode == "checkWinner") {
    var winner = checkWinner(playerScore[0], playerScore[1]);
    gameMode = "playerSelection";
    return `${winner}`;
  }
  return output;
};



//Check input
function checkInput(input) {
  if (input != 1 && input != 2&&input!='check') {
    return `Please enter 1 or 2<br>Enter check to see current results`;
  }
}
//Check Winner & Prints leaderboard in decreasing order
function checkWinner(input1, input2) {
  if(gameState=='highest'){
    if (input1 > input2) {
      return `Player 1 Wins!<br>*Current LeaderBoard*<br>Player One: ${input1} (Rounds Played: ${roundsPlayer[0]})<br>Player Two: ${input2} (Rounds Played: ${roundsPlayer[1]})`;
    } else if (input2 > input1) {
      return `Player 2 Wins!<br>*Current LeaderBoard*<br>Player Two: ${input2} (Rounds Played: ${roundsPlayer[1]})<br>Player One: ${input1} (Rounds Played: ${roundsPlayer[0]})`;
    } else {
      return `Draw!<br>LeaderBoard<br>Player One & Player Two: ${input1} Rounds Played: <br>Player One: ${roundsPlayer[0]}<br>Player Two: ${roundsPlayer[1]}`;
    }
  }else{
    if (input1 < input2) {
      return `Player 1 Wins!<br>*Current LeaderBoard*<br>Player One: ${input1} (Rounds Played: ${roundsPlayer[0]})<br>Player Two: ${input2} (Rounds Played: ${roundsPlayer[1]})`;
    } else if (input2 < input1) {
      return `Player 2 Wins!<br>*Current LeaderBoard*<br>Player Two: ${input2} (Rounds Played: ${roundsPlayer[1]})<br>Player One: ${input1} (Rounds Played: ${roundsPlayer[0]})`;
    } else {
      return `Draw!<br>LeaderBoard<br>Player One & Player Two: ${input1} Rounds Played: <br>Player One: ${roundsPlayer[0]}<br>Player Two: ${roundsPlayer[1]}`;
    }
  }
  
}

//Check Order automatically by game mode
function checkOrder(playerList){
  if(gameState=='highest'){
    if(playerList[0]>=playerList[1]){
      return addTwoNumbers(playerList[0],playList[1])
    }
    else{
      return addTwoNumbers(playerList[1],playList[0])
    }
  }
  if(gameState=='lowest'){
    if(playerList[0]<=playerList[1]){
      return addTwoNumbers(playerList[0],playList[1])
    }
    else{
      return addTwoNumbers(playerList[1],playList[0])
    }
  }
}


//Check Order input by user
// function checkOrder(input, playerList) {
//   if (input == "1") {
//     return addTwoNumbers(playerList[0], playerList[1]);
//   }
//   if (input == "2") {
//     return addTwoNumbers(playerList[1], playerList[0]);
//   }
// }

//Adding Function
function addTwoNumbers(numberOne, numberTwo) {
  return numberOne + "" + numberTwo;
}

function playerRoll(playerNumber, playerList) {
  gameMode = "diceGuess";
  return `Hi Player ${playerNumber}.<br>You rolled ${playerList[0]} for Dice 1 and ${playerList[1]} for Dice 2.<br>Please choose the order of the dice.`;
}

//Dice roll function
function diceRoll() {
  return Math.floor(Math.random() * 6) + 1;
}
