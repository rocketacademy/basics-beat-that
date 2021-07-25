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
    
    if(input !='highest'&&input!='lowest'){
      return `Please choose highest or lowest number mode`
    }
    else{
    gameState = input.toLowerCase();
    return `You have selected ${input} number mode, Enter Player Number to start`
    }
  }

  //User enter player number to start dice roll 
  if (gameMode == "playerSelection") {
    
    playerNumber = input;

    //Option for user to change game mode halfway
    if(input =='change'){
      gameState = ''
      return `Change Mode! Please choose highest or lowest`
    }
    //Check if input is within options
    output = checkInput(input)

    //Allow user to check results at any point of time 
    if (input =='check'){
      gameMode='checkWinner'
    }

    //If user is player 1, roll dice and check order depending on game mode, add to sum and rounds played
    if (playerNumber == 1) {
      playerOneList = [diceRoll(), diceRoll()];
      playerOneSum = checkOrder(playerOneList);
      playerScore[0] += Number(playerOneSum);
      roundsPlayer[0] +=1
      return `${playerRoll(playerNumber, playerOneList)} Auto Mode! Your number is ${playerOneSum} as the game mode is ${gameState} number wins<br>Enter check to see results`;
    }
    //If user is player 2, roll dice and check order depending on game mode, add to sum and rounds played
    if (playerNumber == 2) {
      playerTwoList = [diceRoll(), diceRoll()];
      playerTwoSum = checkOrder(playerTwoList)
      playerScore[1] += Number(playerTwoSum);
      roundsPlayer[1] +=1
      return `${playerRoll(playerNumber, playerTwoList)} Auto Mode! Your number is ${playerTwoSum} as the game mode is ${gameState} number wins<br>Enter check to see results`;
    }
  }

  //If Dice rolled, add two numbers and return (manual mode)
  // if (gameMode == "diceGuess") {
  //   output = checkInput(input);
  //   if(input == 'check'){
  //     gameMode='checkWinner'
  //   }
  //   if (playerNumber == 1) {
  //     //Reset game to run for playerTwo
  //     gameMode = "playerSelection";
  //     playerOneSum = checkOrder(playerOneList);
  //     playerScore[0] += Number(playerOneSum);
  //     roundsPlayer[0] +=1
  //     return `Player ${playerNumber}, you chose Dice ${input} first.<br>Your number is ${playerOneSum}<br>Your current total is ${playerScore[0]}<br>Enter check to see current results`;
  //   }
  //   if (playerNumber == 2) {
  //     gameMode = "playerSelection";
  //     playerTwoSum = checkOrder(playerTwoList);
  //     playerScore[1] += Number(playerTwoSum);
  //     roundsPlayer[1] +=1
  //     return `Player ${playerNumber}, you chose Dice ${input} first.<br>Your number is ${playerTwoSum}<br>Your current total is ${playerScore[1]}<br>Enter check to see current results`;
  //   }
  // }

  //Game mode to check for winner
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

// Check Order automatically by game mode
function checkOrder(playerList){
  if(gameState=='highest'){
    if(playerList[0]>=playerList[1]){
      return addTwoNumbers(playerList[0],playerList[1])
    }
    else{
      return addTwoNumbers(playerList[1],playerList[0])
    }
  }
  if(gameState=='lowest'){
    if(playerList[0]<=playerList[1]){
      return addTwoNumbers(playerList[0],playerList[1])
    }
    else{
      return addTwoNumbers(playerList[1],playerList[0])
    }
  }
}


// Check Order input by user
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

//Function to print player number and dice number rolled
function playerRoll(playerNumber, playerList) {
  // gameMode = "diceGuess";
  return `Hi Player ${playerNumber}.<br>You rolled ${playerList[0]} for Dice 1 and ${playerList[1]} for Dice 2.`;
}

//Dice roll function
function diceRoll() {
  return Math.floor(Math.random() * 6) + 1;
}
