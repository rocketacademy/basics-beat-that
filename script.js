diceOneNumbers = [1, 2, 3, 4, 5, 6];
diceTwoNumbers = [1, 2, 3, 4, 5, 6];

playerOneRolls = [];
playerTwoRolls = [];

currentMode = 1;

/*Modes:
1 - Number rolling
2 - Display results. Player one rearranges if needed
3 - Player two rearranges if needed
4 - Converting array into actual numbers, then choosing winner
*/

//Generate a pair of numbers for player one. Push into playerOneRolls[] array
//Generate a pair of numbers for player two. Push into playerTwoRolls[] array

var main = function (input) {
  console.log(`>>>>Running game.`);
  console.log(`Current mode: ${currentMode}.`);
  if (input == "") {
    var myOutputValue = `Hi! You get two dice each. After rolling, we will put both dice side-by-side to see who comes up with the biggest numerical combination!<br/>Each player can choose the order in which the dice are placed.<br/>To roll, please enter "Roll"!`;
  }
  if (currentMode == 3) {
    var myOutputValue = playerTwoShifting(input); //Mode changed to 4 in this function
  }
  if (currentMode == 2) {
    var myOutputValue = playerOneShifting(input); //Mode changed to 3 in this function
  }
  if (input == "Roll" && currentMode == 1) {
    rollingPlayerOne();
    rollingPlayerTwo();
    currentMode = 2;
    var myOutputValue = `Player one's numbers: ${playerOneRolls}<br/>Player two's numbers: ${playerTwoRolls}<br/><br/>Now, decide whether you wish to rearrange the numbers, or wish to keep them as is!<br/><br/>Player one, please decide first.<br/>Type "Keep" to keep the order, or type "Rearrange" to swap the numbers.`;
    console.log(`Current mode: ${currentMode}.`);
  }
  return myOutputValue;
};

//P1 numbers rolling
var rollingPlayerOne = function () {
  counter = 0;
  while (counter < 2) {
    var rNG = randomNumberGenerator();
    playerOneRolls.push(rNG); //Stores numbers
    console.log(`Rolling P1 number. P1 number(s) pushed: ${playerOneRolls}`);
    counter += 1;
  }
};

//P2 numbers rolling
var rollingPlayerTwo = function () {
  counter = 0;
  while (counter < 2) {
    var rNG = randomNumberGenerator();
    playerTwoRolls.push(rNG); //Stores numbers
    console.log(`Rolling P2 number. P2 number(s) pushed: ${playerTwoRolls}`);
    counter += 1;
  }
};

//RNG function.
var randomNumberGenerator = function () {
  var randomNumber = Math.random() * 6;
  console.log(`Initial number: ${randomNumber}.`);
  var numberCleanedUp = Math.floor(randomNumber) + 1; //+1 to ensure that a '0' isn't rolled
  console.log(`RNG working. Number generated: ${numberCleanedUp}`);
  return numberCleanedUp;
};

//P1 Changing dice order
var playerOneShifting = function (input) {
  console.log(
    `P1 original order: ${playerOneRolls}. Current mode: ${currentMode}.`
  );
  if (currentMode == 2 && input == "Keep") {
    var myOutputValue = `Player one has chosen to keep the order of ${playerOneRolls}!<br/><br/>Player two, please type "Rearrange" or "Keep" to proceed.`;
    console.log(`P1 keeping numbers.`);
  }
  if (currentMode == 2 && input == "Rearrange") {
    console.log(`P1 numbers changed to ${playerOneRolls}.`);
    var myOutputValue = "Cool";
  }
  currentMode = 3;
  console.log(`Current mode: ${currentMode}.`);
  return myOutputValue;
};

//P2 Changing dice order
var playerTwoShifting = function (input) {
  console.log(
    `P2 original order: ${playerTwoRolls}. Current mode: ${currentMode}.`
  );
  if (currentMode == 3 && input == "Keep") {
    var myOutputValue = `Player two has chosen to keep the order of ${playerTwoRolls}`;
    console.log(`P2 keeping numbers.`);
  }
  if (currentMode == 3 && input == "Rearrange") {
    currentMode = 4;
    console.log(`P2 numbers changed to ${playerTwoRolls}.`);
    var myOutputValue = "cool";
  }
  console.log(`Current mode: ${currentMode}.`);
  return myOutputValue;
};
