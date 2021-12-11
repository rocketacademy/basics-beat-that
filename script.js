// There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.
//--------

//Declare global variables and game mode (2 - one to roll and one to choose order)
var gameMode = "roll dice"; // initial game mode
var gameMode_rollDice = "roll dice"; //assign var to different game mode
var gameMode_order = "pick dice order";
var gameMode_reset = "reset";
var diceNumber1 = "";
var diceNumber2 = "";
var numberList = [];
var counter = 0;

// main function
var main = function (input) {
  //Loop will cut after 2 rounds. Can change number as more players join.
  if (counter < 2) {
    //---When gameMode = "roll dice"
    if (gameMode == gameMode_rollDice) {
      //Input validation
      if (input !== "") {
        console.log("This is test");
        return "click submit to start";
      }
      //Generate 2 dice numbers
      else {
        gameMode = gameMode_order; // go to next state

        diceNumber1 = generateDiceNumber();
        console.log("This is diceNumber1", diceNumber1);
        diceNumber2 = generateDiceNumber();
        console.log("This is diceNumber2", diceNumber2);

        //If both numbers are the same, it gets pushed intto array straight
        if (diceNumber1 == diceNumber2) {
          var number1 = parseInt("" + diceNumber2 + diceNumber1);
          console.log("This is number", number1);
          //Storing number chosen into the array for comparions
          numberList.push(number1);
          // numberList1 = [number1];
          console.log("This is numberList array", numberList);
          //Add 1 to the counter
          counter = counter + 1;
          //Switch game mode back to roll dice
          gameMode = gameMode_rollDice; // go back to roll dice mode
          return `You have rolled ${diceNumber1} and ${diceNumber2} The combined number is ${number1} `;
        }

        //Return asking user to choose
        return `You have rolled ${diceNumber1} and ${diceNumber2} Please pick order 1 or order 2`;
      }

      //---When gameMode = "Choose order"
    } else if (gameMode == gameMode_order) {
      //Combining numbers by switching them to string and then back to interger
      if (input == "1") {
        var number1 = parseInt("" + diceNumber1 + diceNumber2);
        console.log("This is number", number1);
        //Storing number chosen into the array for comparions
        numberList.push(number1);
        // numberList1 = [number1];
        console.log("This is numberList array", numberList);
        //Add 1 to the counter
        counter = counter + 1;
        //Switch game mode back to roll dice
        gameMode = gameMode_rollDice; // go back to roll dice mode
        return `This is the combined number: ${number1}  <br>Please click Submit to proceed.`;
      }
      //Similar logic as when input == 1
      else if (input == "2") {
        var number1 = parseInt("" + diceNumber2 + diceNumber1);
        console.log("This is number", number1);
        numberList.push(number1);
        console.log("This is numberList array", numberList);
        counter = counter + 1;
        gameMode = gameMode_rollDice;
        return `This is the combined number: ${number1}  <br>Please click Submit to proceed.`;
      } else {
        //If user did not key in 1 or 2
        return "Please key in only 1 or 2.";
      }
    }

    //---When counter reaches 2 and the above function is cut, now comparing the two values
  } else {
    // At the end of 2 loops, compare number in array to get winner
    // If both numbers are the same, its a tie
    if (numberList[0] == numberList[1]) {
      return "Its a tie, please try again";
    }
    //If both numbers are not the same, compare and pick out the bigger value
    else {
      var higherCombinedNumber = Math.max.apply(null, numberList);
      console.log("This is the higher combined Number" + higherCombinedNumber);

      //get array position of max number to determine if it's player 1 or 2 who wins
      var highestNumberPlayer = numberList.indexOf(higherCombinedNumber) + 1;
      console.log("This is the index of higher value" + highestNumberPlayer) +
        "<br>.Please click Submit to proceed.";
      myOutputValue = `The two numbers we are comparing are ${numberList}. <br> The winner is Player Number  ${highestNumberPlayer}!
    <br><br><br><I>Click submit to start a new game<I>`;
      resetGame();
      console.log("This is game state", gameMode);
      console.log("This is number List after reset", numberList);
      return myOutputValue;
    }
  }
};

//Helper function to generate random dice number
var generateDiceNumber = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

var resetGame = function () {
  gameMode == gameMode_rollDice;
  numberList = [];
  counter = 0;
};
