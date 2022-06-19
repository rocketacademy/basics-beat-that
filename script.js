var playerResults = [];
var clickCount = 0;
var tempNum = [];
var playerNumber = 1;
var playerGroupNumber = [];

// clickCount is to control the mode:
// When clickCount equal to even number, it's "Dice-roll mode":
// Generate 2 random numbers and show to players
// When clickCount equal to odd number, it's "Push mode":
// Finalise the number according to the order player choose, and push the number into array "playerResults"

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

  // Dice-roll mode: clickCount equal to even number
  if (clickCount % 2 == 0) {
    rollDice1 = getRandomIndex();
    rollDice2 = getRandomIndex();

    // if those 2 random numbers equal to each other then just the "Push mode" and push the number into array directly.
    if (rollDice1 == rollDice2) {
      currentNumber = rollDice1 * 10 + rollDice2;
      myOutputValue = `The number of the First Dice is ${rollDice1}; <br>The number of the Second Dice is ${rollDice2}. <br><br>The number for player ${playerNumber} is ${currentNumber}. <br><br>Next player please click "Submit" to roll the dice.`;
      playerResults.push(currentNumber);
      playerGroupNumber.push(playerNumber);
      playerNumber++;
      clickCount++;
    } else {
      myOutputValue = `The number of the First Dice is ${rollDice1}; <br>The number of the Second Dice is ${rollDice2}. <br><br>Press "1" for choosing "First dice number + Second dice number"; or <br>Press "2" for choosing "Second dice number + First dice number".`;

      // the generated random numbers are temporarily stored in array "tempNum"
      tempNum = [rollDice1, rollDice2];
    }

    // Push mode: clickCount equal to odd number
  } else {
    //When player choose "1":
    if (input == 1) {
      currentNumber = tempNum[0] * 10 + tempNum[1];
      playerResults.push(currentNumber);
      myOutputValue = `The number player ${playerNumber} choose is ${currentNumber}. <br><br>Next player please click "Submit" to roll the dice. `;
      playerGroupNumber.push(playerNumber);
      playerNumber++;

      //When player choose "2":
    } else if (input == 2) {
      currentNumber = tempNum[1] * 10 + tempNum[0];
      playerResults.push(currentNumber);
      myOutputValue = `The number player ${playerNumber} choose is ${currentNumber}. <br><br>Next player please click "Submit" to roll the dice.`;
      playerGroupNumber.push(playerNumber);
      playerNumber++;

      //When the input is neither "1" nor "2"
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

// Another function for button "Results" which is to show the winner and list out all the numbers
var main01 = function () {
  var outputValue = "";
  var resultsReport = "";
  var resultList = [];

  var maxNumber = Math.max(...playerResults);

  outputValue = `🏆  The winner is player ${
    playerGroupNumber[playerResults.indexOf(maxNumber)]
  } <br><br>The numbers of each playes are shown as below:<br>`;

  // Put the player number and their results into a sentence and push the sentence into array "resultList"
  for (var i = 0; i < playerResults.length; i++) {
    resultsReport = `The number of player ${playerGroupNumber[i]} is ${playerResults[i]}.<br>`;
    resultList.push(resultsReport);
  }

  console.log(maxNumber);
  console.log(outputValue);
  console.log(playerResults);
  console.log(playerResults.indexOf(maxNumber) + 1);
  return outputValue + resultList;
};
