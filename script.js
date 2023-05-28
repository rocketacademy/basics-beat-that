var main = function (input) { 
  var myOutputValue = gameFlow(input);
  return myOutputValue;
};
let diceRoll = function () {
  return Math.floor(Math.random() * 6 + 1);
};

//to store the dice numbers, and other global variables 
let numOfPlayers = 0; 
let currentPlayer = 0; 

let round = 1;

let rolledNums = []; // for each player
let playerNum;
let playerNumCombo = []; 
let playerScore = [0,0,0,0]; //store player scores. 
let playerNames =[];
let gameState = "start";

document.getElementById("output-div").innerHTML = "please tell me how many players (2-4)";

let gameFlow = function (input){
  if (gameState == "start"){
    return initiate(input)
  }
  else if (input == "quit"){
    gameState = "start"
	playerScore =[0,0,0,0];
	playerNames =[];
	playerNumCombo = [];
	currentPlayer = 0;
	round =1;
    return `please tell me how many players (2-42)`;
  }
  else if (gameState == "input name"){
    return storeNames(input);
  }
  else if (gameState == "roll"){
    console.log("round:",round)
    console.log(playerNames) // want to check if player names are properly registered. 
    console.log("currentPlayer:",currentPlayer)
    return roll2Dice(input)
  }
  else if (gameState == "player choose"){
    return decideDiceOrder(input)
  }
  else if (gameState == "turn end"){
    return endOfTurn();
  }
  else if (gameState == "round end"){
    return endOfRound();
  }
}

let initiate = function (input){
  input = Number(input)
  if (input >= 2 && input <= 4){
  numOfPlayers = input;
  gameState = "input name"
  return `You have chosen a ${numOfPlayers}-player game. Please input player 1's name.`
  }
  else{
    return `Please input a number between 2-4`
  }
}

let storeNames = function (input){
 playerNames.push(input);
 currentPlayer++;
 if (currentPlayer == numOfPlayers){
  gameState = "roll"
  currentPlayer = 0
  return `Everyone has entered their names. ${playerNames[currentPlayer]} press the submit button to roll the dice.`
 }
 else{return `Player ${currentPlayer+1} please enter your name.`}
}


let roll2Dice = function(input){
  rolledNums = [];
  for (let j = 0; j < 2; j++) {
    rolledNums.push(diceRoll());
    console.log(rolledNums);
  }
  gameState = "player choose";
  document.getElementById("submit-button").innerHTML = "Submit";
  return `The numbers you rolled are ${rolledNums[0]} and ${rolledNums[1]} 
  <br> Choose which of the numbers is to go first`
 }  
let decideDiceOrder = function (input){
  input = Number(input);
  if (input == 2 && currentPlayer != numOfPlayers) {
    playerNum = [rolledNums[1], rolledNums[0]].join("");//FLIP
    console.log(playerNum)
    playerNumCombo.push(playerNum);
    console.log("playernumcombo:",playerNumCombo)
    currentPlayer++
    gameState = "turn end"
    return `${playerNames[currentPlayer-1]}'s number for this round is ${playerNum}.`;
  } else if (input == 1 && currentPlayer != numOfPlayers) {
    playerNum = rolledNums.join("");
    console.log(playerNum);
    playerNumCombo.push(playerNum);
    console.log("playernumcombo:",playerNumCombo);
    currentPlayer++
    gameState = "turn end"
    return `${playerNames[currentPlayer-1]}'s number for this round is ${playerNum}.`; //NO FLIP
  } 
  else if (currentPlayer == numOfPlayers){
    gameState = "end";
    console.log("playernumcombo:",playerNumCombo)
    return `${playerNames[currentPlayer-1]}'s number for this round is ${playerNum}.`
  }
  else {
    return `That is not a valid input, please choose a number either 1 or 2`;
  }
}

let endOfTurn = function (){
  if (currentPlayer != numOfPlayers){
    gameState = "roll"
    return `${playerNames[currentPlayer]}'s turn. hit submit to roll.`
  }
  else if (currentPlayer == numOfPlayers){
    gameState = "round end"
	let indexOfWinner = playerNumCombo.lastIndexOf(String(Math.max(...playerNumCombo))) //takes the index of the max number, so i can find it's index equivalent in playerNames, and playerScore, to declare winner of round and modify the score.
	console.log("indexOfWinner:", indexOfWinner)
    let winner = playerNames[indexOfWinner]	
	playerScore[indexOfWinner]++
    return `the winner is ${winner}, hit submit to end this round`
  }
}

let endOfRound = function(){
  playerNumCombo = [];
  currentPlayer = 0;
  gameState = "roll"
  round++ 
  return `The scores are: <br><br>To play the next round, hit Submit`
}


