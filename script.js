//Global Variables

//Toggle gamemodes
stateManager = "instructions";
//Store first player's dice rolls
playerOneResults = [];
//Store first player's score
playerOneScore = 0;

var main = function (input) {
  //Local Variable to output instructions of the game upon first click of submit
  var myOutputValue = `🎲<strong>WELCOME TO THE BEAT THAT DICE GAME!</strong>🎲<br><br>
  
  Rules:<br>
    1. There are 2 players and players take turns.<br><br>
    2. When a player clicks Submit, the game rolls 2 dice and shows the dice rolls,<br>for example 3 and 6.<br><br>
    3. The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first.<br><br>
    4. After both players have rolled and chosen dice order, the player with the higher combined number wins.<br><br>
    
    Please click submit to roll the dice`;

  //if block to give instruction to player and change the mode to player one
  if (stateManager == "instructions") {
    stateManager = "playerOne";
    return myOutputValue;
  }
  //if block to roll dice 2 times and save it to playerOneResults global variable
  else if (stateManager == "playerOne") {
    stateManager = "playerOneOrder";
    for (counter = 0; counter < 2; counter += 1) {
      rollDice = diceRoll();
      playerOneResults.push(rollDice);
    }
    myOutputValue = `🎲<strong>WELCOME PLAYER 1</strong>🎲<br><br>
    You rolled ${playerOneResults[0]} for dice one and ${playerOneResults[1]} for dice two.<br><br>
    Enter "1" or "2" for the respective dice roll to be the first number of your score.<br><br>
    Hint:<br>
    Choose the bigger roll for a higher winning chance!`;
    return myOutputValue;
  } else if (stateManager == "playerOneOrder") {
    if (input == 1) {
      playerOneScore = playerOneResults[0] * 10 + playerOneResults[1];
      myOutputValue = `🎲 PLAYER 1 🎲<br><br>
          
      You chose Dice 1 first. Your score is ${playerOneScore}.<br><br>

      It is now Player 2's turn.`;
      return myOutputValue;
    }
    if (input == 2) {
      playerOneScore = playerOneResults[1] * 10 + playerOneResults[0];
      myOutputValue = `🎲 PLAYER 1 🎲<br><br>
          
      You chose Dice 2 first. Your score is ${playerOneScore}.<br><br>

      It is now Player 2's turn.`;
      return myOutputValue;
    }
  }
};

//Function to simulate dice rolling
//Input not required
var diceRoll = function () {
  //Library command to generate random decimal from 0 to 5.999999
  var randomDec = Math.random() * 6;
  //Library command to round down the decimal to an integer
  var randomInt = Math.floor(randomDec);
  //For random result to be min 1 and max 6
  var diceNum = randomInt + 1;
  return diceNum;
};
