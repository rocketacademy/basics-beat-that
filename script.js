var gameState = "Init"; //Game States
var pTotal = []; //Array storage for totals
var noPlayers = 5; //Placeholder for constant
var roll1 = 0; //Generic roll number 1st
var roll2 = 0; //Generic roll number 2nd
var pCount = 1; //Player counter for while loop

var main = function (input) {
  var myOutputValue = diceGame(input);
  return myOutputValue;
};

//Function 0: Main Game Alogrithm
var diceGame = function (userInput) {
  var message = ""; //generic message
  while (pCount <= noPlayers) {
    console.log("i:", pCount);
    if (gameState == "Init") {
      //State 0: Request for number of players
      userInput = Number(userInput);
      if (Number.isInteger(userInput) && userInput > 1) {
        noPlayers = userInput;
        gameState = "Start";
        return `You have selected ${noPlayers} number of players to join this game. 
        <br><br> 
        Let's start! 
        <br><br> 
        Press "Submit" to proceed.`;
      } else {
        return `Error! Please enter an integer of more than 1 to proceed. <br> We need real number of players, don't we?`;
      }
    }
    if (gameState == "Start") {
      //State 1: Initial
      [message, roll1, roll2] = welcomeMsg(pCount);
      gameState = "Order";
      return message;
    }
    if (gameState == "Order") {
      console.log(userInput);
      if (["Dice 1", "Dice 2"].includes(userInput)) {
        gameState = "Start"; //reset state to next player
        var userOrder = Number(userInput[5]); //extract number
        console.log(userOrder);
        pTotal.push(orderSelect(roll1, roll2, userOrder));
        console.log("Total Array:", pTotal);
        if (pCount == noPlayers) {
          var winNumber = Math.max(...pTotal); //Get max value amongst players
          const isLargeNumber = (element) => element == winNumber;
          var playerNoWin = pTotal.findIndex(isLargeNumber) + 1;
          var pTotal2 = pTotal; //Assign temp. storage number before reset for prints.
          pCount = 1; //reset
          pTotal = []; //reset total
          gameState = "Init";
          return `End-game! Player ${playerNoWin} wins with number: ${winNumber}. <br> <br> Please select the number of players for the next game. <br> Goodbye!
          <br>
          <br>
          ${recNumber(pTotal2)}`;
        } else {
          pCount++;
          return `Player ${pCount - 1}, you chose Dice ${userOrder} first.<br>
          Your number is ${pTotal[pCount - 2]}.<br>
          It is now Player ${pCount}'s turn. Press "Submit"
          <br>
          <br>
          ${recNumber(pTotal)}`;
        }
      } else {
        return `Error! Please choose numeral order by typing in 'Dice 1' or 'Dice 2' as the first numeral.
        <br>
        <br>
        ${recNumber(pTotal)}`;
      }
    }
  }
};

//Function 1: Geneerating Random Number
var diceRoll = function () {
  var randInt = Math.floor(Math.random() * 6);
  randInt = randInt + 1;
  return randInt;
};

//Function 2: Giving the total number based on order
var orderSelect = function (diceOne, diceTwo, userSel) {
  if (userSel == 1) {
    return Number(diceOne + diceTwo);
  }
  if (userSel == 2) {
    return Number(diceTwo + diceOne);
  }
};

//Function 3: Welcoming Message with Rolling
var welcomeMsg = function (pArray) {
  p1DiceRoll1 = diceRoll().toString();
  p1DiceRoll2 = diceRoll().toString();
  return [
    `Welcome Player ${pArray}. <br><br> You rolled ${p1DiceRoll1} for Dice 1 and ${p1DiceRoll2} for Dice 2. <br><br> Choose the order of the dice.`,
    p1DiceRoll1,
    p1DiceRoll2,
  ];
};

var recNumber = function (arrayz) {
  var textMessage = "";
  var count = 0;
  while (count < arrayz.length) {
    textMessage = textMessage + ", " + arrayz[count];
    count++;
  }
  return "Value Records: " + textMessage.substring(2);
};
