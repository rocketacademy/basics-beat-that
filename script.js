//Global Variables
var step = 1;
var playerOne = [];
var playerOneNumber = 0;
var playerTwo = []; 
var playerTwoNumber = 0;
var messageRollDice = "";
var messageCombinedNumbers = "";
var messageCompareNumbers = "";

var button = document.querySelector("#submit-button");
button.addEventListener("click", function () {
  var input = document.querySelector("#input-field");
  var result = main(input.value);
  var output = document.querySelector("#output-div");
  output.innerHTML = result;
  input.value = "";
});

var main = function (input) {
  if (step == 0){
    step++; 
    return "Press 'Submit' for Player 1 to start rolling the dice!";
  } else if (step == 1){
    rollDice(1, playerOne);
    step++;
    return messageRollDice; 
  } else if (step == 2){
    playerOneNumber = combineNumbers(1, input, playerOne)
    step++;
    return messageCombinedNumbers; 
  } else if (step == 3){
    rollDice(2, playerTwo);
    step++;
    return messageRollDice; 
  } else if (step == 4){
    playerTwoNumber = combineNumbers(2, input, playerTwo);
    step++;
    return messageCombinedNumbers;
  } else if (step == 5){
    messageCompareNumbers = compareNumbers(playerOneNumber, playerTwoNumber);
    restartGame();
    return messageCompareNumbers + "<br><br> Press 'Submit' to restart the game."; 
  }
};

var rollDice = function (playerNum, playerArr) {
  playerArr[0] = Math.floor(Math.random() * 6) + 1;
  playerArr[1] = Math.floor(Math.random() * 6) + 1;
  messageRollDice = `WELCOME, PLAYER ${playerNum} <br><br>
                    You rolled ${playerArr[0]} for dice one and ${playerArr[1]} for dice two. <br><br>
                    Choose the order of the dice by entering "1" or "2".`; 
};

var combineNumbers = function (playerNum, combineNum, playerArr){
  let combinedString = "";
  let combinedValue = 0;
  let strDice1 = playerArr[0].toString();
  let strDice2 = playerArr[1].toString();

  if(combineNum == 1){
    combinedString = strDice1 + strDice2;
    combinedValue = parseInt(combinedString);
  } else if (combineNum == 2){
    combinedString = strDice2 + strDice1;
    combinedValue = parseInt(combinedString);
  }
  messageCombinedNumbers = `PLAYER ${playerNum} <br><br>
                            You chose Dice ${combineNum} first. Your number is ${combinedValue}. <br><br>
                            It is now Player 2's turn. <br><br>
                            Please press "Submit" to continue.`                        
  return combinedValue; 
}

var compareNumbers = function (playerOne, playerTwo) {
  if(playerOne > playerTwo){
    return `Player 1's number is ${playerOne}. <br>
            Player 2's number is ${playerTwo}. <br><br>
            Player 1 wins!`
  } else if (playerOne < playerTwo) {
    return `Player 1's number is ${playerOne}. <br>
            Player 2's number is ${playerTwo}. <br><br>
            Player 2 wins!`
  } else {
    return `Player 1's number is ${playerOne}. <br><br>
            Player 2's number is ${playerTwo}. <br><br>
            It is a draw!`
  }
}

var restartGame = function(){
  step = 0;
  playerOne = [];
  playerTwo = []; 
}