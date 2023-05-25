var main = function (input) { 
  var myOutputValue = initiate(input);
  return myOutputValue;
};
let diceRoll = function () {
  return Math.floor(Math.random() * 6 + 1);
};

//to store the dice numbers, and other global variables 
let numOfPlayers = 2; // min num of players 
let currentPlayer; 

let turns; 
let rounds; 

let rolledNums = []; // for each player
let playerNum;
let playerNumCombo = []; // index 0 and 1 reserved for player 1, 2. use push to add player 3 or 4
let playerScore = []; //store player scores. 

let gameState = "";

document.getElementById("output-div").innerHTML = "Player 1, roll the dice";
document.getElementById("submit-button").innerHTML = "ROLL";
document.getElementById("input-field").disabled = true;

let initiate = function(input){
  document.getElementById("input-field").disabled = false;
  if (gameState == "") {
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
  else if (gameState == "player choose") {
    gameState = "";
    document.getElementById("submit-button").innerHTML = "Continue";
    input = Number(input);
    if (input == 2) {
      playerNum = [rolledNums[1], rolledNums[0]].join("");
      console.log(playerNum)
      playerNumCombo.push(playerNum);
      console.log(playerNumCombo)
      return `Your rolls combined is ${playerNum}.`;
    } else if (input == 1) {
      playerNum = rolledNums.join("");
      console.log(playerNum);
      playerNumCombo.push(playerNum);
      console.log("playernumcombo:",playerNumCombo);
      return `Your rolls combined is ${playerNum}.`; //NO FLIP
    } else {
      return `That is not a valid input, please choose a number either 1 or 2`;
    }
  } // need to move this to the beginning of the if statement
  return `1 round has finished`
  }


// will need a while = True loop to keep store of highscores, and stats of each player
// within that while loop, will do a for loop to loop each iteration of the game for each player and store data for each iteration. Will need to store data for names as well for the sake of the leader board 
// need to make a for loop for all the players stats as they need to be generative, according to numbers of players input at the start 

