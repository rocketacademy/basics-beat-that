// Base  (v1 9:20am - 10:20am)

let mode = "preGame";
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

// Get the winner and display
let main = function (input) {
  if (mode == "preGame") {
    mode = "Player one";
    return `Please click "Submit" to roll the dice.`;
  }

  // get two dice number
  if (diceNum1 == "" && diceNum2 == "") {
    diceNum1 = rollDice();
    diceNum2 = rollDice();
    return `Hello ${mode}! Your dice 1 is: ${diceNum1}, dice 2 is: ${diceNum2}. 
      <br>Which dice goes first, "1" or "2" ?`;
  }

  if (mode == "Player one") {
    // Validate player input
    if (input != "1" && input != "2")
      return `Your dice 1 is: ${diceNum1}, dice 2 is: ${diceNum2}.
      <br>Please enter "1" or "2" to get your number.`;
    num_p1 = getOrder(input, diceNum1, diceNum2);
    mode = "Player two";
    diceNum1 = rollDice();
    diceNum2 = rollDice();
    return `Hey Player 1, <br>Your number is ${num_p1}. 
    <br><br>Player 2, it's your turn now! Your dice 1 is: ${diceNum1}, dice 2 is: ${diceNum2}.
    <br>Which dice goes first, "1" or "2"?`;
  }

  if (mode == "Player two") {
    // Validate player input
    if (input != "1" && input != "2")
      return `your dice 1 is: ${diceNum1}, dice 2 is: ${diceNum2}
      <br>Which dice goes first, "1" or "2"`;
    num_p2 = getOrder(input, diceNum1, diceNum2);

    // Check winner
    if (num_p1 == num_p2) return `Hey! It's a tie!`;
    if (num_p1 > num_p2) {
      let displayMessage = `Hey Player 2, <br> Your Dice 1 is: ${diceNum1}, Dice 2 is: ${diceNum2} 
      <br>Your number is ${num_p2}, player 1's number is ${num_p1}
      <hr>Player 1, you are the winner!`;
      diceNum1 = "";
      diceNum2 = "";
      mode = "Player one";
      return displayMessage;
    } else {
      let displayMessage = `Hey Player 2, <br> Your Dice 1 is: ${diceNum1}, Dice 2 is: ${diceNum2} 
      <br>Your number is ${num_p2}, player 1's number is ${num_p1}
      <hr>Player 2, you are the winner!`;
      diceNum1 = "";
      diceNum2 = "";
      mode = "Player one";
      return displayMessage;
    }
  }
};
