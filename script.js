// variable assignments
var scissors = "scissors";
var paper = "paper";
var stone = "stone";
var reversedScissors = "reversed scissors";
var reversedPaper = "reversed paper";
var reversedStone = "reversed stone";
var instructions =
  'Type in "scissors" "paper" or "stone" to throw as your next hand. Good luck! <br>(Psst. You can add reversed before your hand to do inverted scissors papers stone!)';
// RNG into computer response
var randomHand = function () {
  var randomNum = Math.floor(Math.random() * 3);
  if (randomNum == 0) {
    return scissors;
  }
  if (randomNum == 1) {
    return paper;
  }
  if (randomNum == 2) {
    return stone;
  }
};
// game rules. surely room for improvement in efficiency?
function matchOutcome(computerHand, userHand) {
  if (
    userHand == computerHand ||
    (userHand == reversedStone && computerHand == stone) ||
    (userHand == reversedPaper && computerHand == paper) ||
    (userHand == reversedScissors && computerHand == scissors)
  ) {
    return "Draw!";
  }
  if (
    (userHand == scissors && computerHand == paper) ||
    (userHand == paper && computerHand == stone) ||
    (userHand == stone && computerHand == scissors) ||
    (userHand == reversedPaper && computerHand == scissors) ||
    (userHand == reversedScissors && computerHand == stone) ||
    (userHand == reversedStone && computerHand == paper)
  ) {
    return "You Win!";
  }
  if (
    (userHand == scissors && computerHand == stone) ||
    (userHand == paper && computerHand == scissors) ||
    (userHand == stone && computerHand == paper) ||
    (userHand == reversedPaper && computerHand == stone) ||
    (userHand == reversedScissors && computerHand == paper) ||
    (userHand == reversedStone && computerHand == scissors)
  ) {
    return "You Lost!";
  }
}
// looked for missing brackets here for half the assignment time
// result message output, included with every successful loop
var resultMessage = function (computerHand, userHand) {
  return (
    "The computer chose " + computerHand + ". <br> You chose " + userHand + "."
  );
};
// error message for unexpected inputs
var main = function (input) {
  if (
    input != scissors &&
    input != paper &&
    input != stone &&
    input != reversedScissors &&
    input != reversedPaper &&
    input != reversedStone
  ) {
    return "Invalid input! Please select scissors, paper, or stone as your next hand.";
  }
  // did a mistake where I put || instead of &&
  // rounding up variables from functions. make sure the functions work independently first
  var userHand = input;
  var computerHand = randomHand();
  var results = resultMessage(computerHand, userHand);
  var winOrLose = matchOutcome(computerHand, userHand);
  return results + "<br><br>" + winOrLose + "<br><br>" + instructions;
};
