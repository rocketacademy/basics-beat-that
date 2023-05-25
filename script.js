var main = function (input) {
  var myOutputValue = initiate(input);
  return myOutputValue;
};
let diceRoll = function () {
  return Math.floor(Math.random() * 6 + 1);
};
//to store the dice numbers, and other global variables 
let rolledNums = [];
let playerNum;
let playerScore;


let gameState = "";

document.getElementById("output-div").innerHTML = "Player 1, roll the dice";
document.getElementById("submit-button").innerHTML = "ROLL";
document.getElementById("input-field").disabled = true;

let initiate = function(input){
  document.getElementById("input-field").disabled = false;
  if(gameState == ""){
  for (i = 0; i < 2; i++){
    rolledNums.push(diceRoll())
    console.log(rolledNums)
  }
  let rolledNums1Index0 = rolledNums[0];
  let rolledNums1Index1 = rolledNums[1];
  gameState = "player choose" 
  document.getElementById("submit-button").innerHTML = "Submit";
  return `The numbers you rolled are ${rolledNums[0]} and ${rolledNums[1]} 
  <br> Choose which of the numbers is to go first`;
  }
  else if (gameState == "player choose"){
    gameState = "player2 roll"
    document.getElementById("submit-button").innerHTML = "Continue";
    document.getElementById("input-field").disabled = true;
    input = Number(input)
    if (input == 2){
      playerNum = [rolledNums[1], rolledNums[0]].join(""); //FLIP
      return`Your rolls combined is ${playerNum}.`
    }
    else if (input == 1){
      playerNum = rolledNums.join("");
      return `Your rolls combined is ${playerNum}.`;//NO FLIP
    }
    else{ return `That is not a valid input`}
  }
}


// will need a while = True loop to keep store of highscores, and stats of each player
// within that while loop, will do a for loop to loop each iteration of the game and store data for each iteration. Will need to store data for names as well for the sake of the leader board 
