var playerResults = [];
var clickCount = 0;
var tempNum = [];
var playerNumber = 1;
var playerGroupNumber = [];

var getRandomIndex = function () {
  // create a random number from zero to array length minus one.
  // this number is in the range from the first
  // index (zero) to the last index (array length minus one)
  var randomIndex = Math.floor(Math.random() * 6) + 1;
  return randomIndex;
};

var main = function (input) {
  var myOutputValue = "";
  var currentNumber;
  var rollDice1;
  var rollDice2;

  if (clickCount % 2 == 0) {
    rollDice1 = getRandomIndex();
    rollDice2 = getRandomIndex();

    if (rollDice1 == rollDice2) {
      currentNumber = rollDice1 * 10 + rollDice2;
      myOutputValue = `The number of the First Dice is ${rollDice1}; <br>The number of the Second Dice is ${rollDice2}. <br><br>The number for player ${playerNumber} is ${currentNumber}. <br><br>Next player please click "Submit" to roll the dice.`;
      playerResults.push(currentNumber);
      playerGroupNumber.push(playerNumber);
      playerNumber++;
      clickCount++;
    } else {
      myOutputValue = `The number of the First Dice is ${rollDice1}; <br>The number of the Second Dice is ${rollDice2}. <br><br>Press "1" for choosing "First dice number + Second dice number"; or <br>Press "2" for choosing "Second dice number + First dice number".`;
      tempNum = [rollDice1, rollDice2];
    }
  } else {
    if (input == 1) {
      playerNember = clickCount;
      currentNumber = tempNum[0] * 10 + tempNum[1];
      playerResults.push(currentNumber);
      myOutputValue = `The number player ${playerNumber} choose is ${currentNumber}. <br><br>Next player please click "Submit" to roll the dice. `;
      playerGroupNumber.push(playerNumber);
      playerNumber++;
    } else if (input == 2) {
      playerNember = clickCount;
      currentNumber = tempNum[1] * 10 + tempNum[0];
      playerResults.push(currentNumber);
      myOutputValue = `The number player ${playerNumber} choose is ${currentNumber}. <br><br>Next player please click "Submit" to roll the dice.`;
      playerGroupNumber.push(playerNumber);
      playerNumber++;
    } else {
      myOutputValue = `Please insert "1" or "2" for choosing the oeder of numbers:<br><br>Press "1" for choosing "First dice number + Second dice number"; or <br>Press "2" for choosing "Second dice number + First dice number". <br><br>First Dice number: ${tempNum[0]}; <br>Second Dice number: ${tempNum[1]}`;
      clickCount--;
    }
  }

  console.log("Dice 1 number: ", rollDice1);
  console.log("Dice 2 number: ", rollDice2);
  console.log("Click count: ", clickCount);
  console.log(tempNum);
  console.log(playerResults);
  clickCount++;
  return myOutputValue;
};

var main01 = function () {
  var outputValue = "";

  var maxNumber = Math.max(...playerResults);

  outputValue = `🏆  The winner is player ${
    playerGroupNumber[playerResults.indexOf(maxNumber)]
  }`;

  console.log(maxNumber);
  console.log(outputValue);
  console.log(playerResults);
  console.log(playerResults.indexOf(maxNumber) + 1);
  return outputValue;
};
