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

// Get the order your two dice numbers
function getOrder(order, num1, num2) {
  let orderedNum;
  if (order == "1") orderedNum = num1 * 10 + num2;
  if (order == "2") orderedNum = num2 * 10 + num1;
  return orderedNum;
}
