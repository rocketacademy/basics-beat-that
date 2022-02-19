// Base  (v1 9:20am - 10:20am)

let mode = "Player one";
let diceNum1 = "";
let diceNum2 = "";
let num_p1, num_p2;

// Generate a random dice number
function rollDice() {
  let diceNum = Math.floor(Math.random() * 6) + 1;
  return diceNum;
}
