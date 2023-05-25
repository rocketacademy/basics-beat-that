var main = function (input) {
  var myOutputValue = initiate(input);
  return myOutputValue;
};
let diceRoll = function () {
  return Math.floor(Math.random() * 6 + 1);
};
//to store the dice numbers, and other global variables 
let rolledNums1 = [];
let player1Num;
let player1Score;

let rolledNums2 = [];
let player2Num;
let player2Score;

let gameState = "";

document.getElementById("output-div").innerHTML = "Player 1, roll the dice";
document.getElementById("submit-button").innerHTML = "ROLL";
document.getElementById("input-field").disabled = true;

let initiate = function(input){
  document.getElementById("input-field").disabled = false;
  if(gameState == ""){
  for (i = 0; i < 2; i++){
    rolledNums1.push(diceRoll())
    console.log(rolledNums1)
  }
  let rolledNums1Index0 = rolledNums1[0];
  let rolledNums1Index1 = rolledNums1[1];
  gameState = "player1 choose" 
  document.getElementById("submit-button").innerHTML = "Submit";
  return `The numbers you rolled are ${rolledNums1[0]} and ${rolledNums1[1]} 
  <br> Choose which of the numbers is to go first`;
  }
  else if (gameState == "player1 choose"){
    gameState = "player2 roll"
    document.getElementById("submit-button").innerHTML = "Continue";
    document.getElementById("input-field").disabled = true;
    input = Number(input)
    if (input == 2){
      player1Num = [rolledNums1[1], rolledNums1[0]].join(""); //FLIP
      return`Your rolls combined is ${player1Num}.`
    }
    else if (input == 1){
      player1Num = rolledNums1.join("");
      return `Your rolls combined is ${player1Num}.`;//NO FLIP
    }
    else{ return `That is not a valid input`}
  }
  else if (gameState == "player2 roll"){
    document.getElementById("input-field").disabled = true;
    document.getElementById("submit-button").innerHTML = "ROLL";
    return `roll time baby`
  }
}

let winnerOfRound = function (){
  if (player1Num == player2Num) {
    return `your numbers are the same, it's a draw`
  }
  else if (player1Num > player2Num) {
    player1Score++
    return `Player 1 wins`
  }
  else{
    player2Score++
    return `Player 2 wins`
  }
}

