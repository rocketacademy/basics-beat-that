/* 

Player 1 rolls two dices
Display to Player 1 result of 2 dices, and ask player to choose DICE 1 or DICE2 go first. 
Player 1 input the order e.g. 63 by indicating "dice 1" or "dice 2"
Then system said, your number is 63. It is now Player 2's turn
Player 2 input the a command to roll 2 dices 
Display to Player 1 result of 2 dices, and ask player to choose DICE 1 or DICE2 go first.
Player 2 input the order e.g. 89 by indicating "dice 1" or "dice 2"
Once it is done, the system display who has won.

------ breaking down ------
1. A helper function that can roll a dice and return a number from 1-6
2. An array each to store the dice order the was chosen by player 1 and player 2 respectively
3. Compare the combined number
4. Output who is the winner
5. Reset the game. Player 1 again to start clicking the submit button.
6. Keeping track the score - using two arrays, player 1 has 1 array, player 2 has 2nd array to keep track of the score

--- hardest ---
Player can choose how many players to play with how many die in each game. 
Player can choose whether highest combined number will win or lowest combined number will win.
Player can also see the leader board for accumulated numbers
Player can see the current game dice roll and the sum of game dice now.

---- breaking down what we need ---

Player's array - 1 dimentional array 
1 array - [accumulated game score, 1st game score, 2nd game score, always the last game score]

Roll Dice Array needs to be extendable to provide player the ability to specify how many times they want to roll the dice 

set the variable for times of rolling dice, 
Use that variable to create a rolling dice array that can be reused by any player
the helper function can be rolling dice 1 function, and store the number of dice roll through push function. After use, it should be reset to zero. using = []

gameInit = 0 (ask for number of players, then set it to 1)
gameInit = 1 (ask for number of game piece in dice rolling, then set it to 2)
gameInit = 2 (complete initialisation) then use default Game mode 1 and win mode 1.

gameMode = 1 compete all (can be set by input "compete with all")
gameMode = 2 knock out (can be set by input "knock out")

winMode = 1 Highest Combined (default or when user input "highest")
winMode = 2 Lowest Combined (user input "lowest")

Instructions to player:
"allplayers" = play against all players in each game
"knockout" = play in a knock out manner
"highestwin" = winner is the one with highest combined dice number
"lowestwin" = winner is the one with lowest combined dice number

Question:
How many players you have? 2 or more
How many dice you want to play? 2 or more
Choose a winning mode: high, low. High = highest combined numbers win; low = lowest combined numbe win; 

Program: e.g 3 players, 3 dice game piece
each game
- player will have to receive 3 dice numbers
- next player 
- next player
then compare with each other

So it is better to have helper function to return the no. of dice that we need
1 helper function to pass in number of dice, within there is a for loop, and chunk out an array?
return array of all the dice values

Player then received an array of that game, find out the largest combination using sort. then 


const points = [40, 100, 1, 5, 25, 10];
// Sort the numbers in descending order
points.sort(function(a, b){return b-a});
// Sort the numbers in ascending order
points.sort(function(a, b){return a-b});

once the array stored with descending value, it is easily do a array.reverse() to reverse the order


// to retrieve the value from a sorted array to an variable
Get a for loop to pop the sorted array and concatenate them into 
var diceResult = diceResult + array[i]
when it is done, convert the diceResult into Number and store it back to diceResult

using this value, we can then insert into each player's array to keep track of 
player 1 array should have index 0 that keep accumulating while, the rest of the element in the array indicate the new game result.
e.g. array [0] = array [0] + new game result
     array.push (new game result)



*/

var numberOfPlayers = 2;
// To store the no. of players input by user. Default is 2.

var gameInit = 0;
// gameInit = 0 (ask for number of players, then set it to 1)
// gameInit = 1 (ask for number of game piece in dice rolling, then set it to 2)
// gameInit = 2 (complete initialisation) then use default Game mode 1 and win mode 1.

// ---- future enhancement ----
// gameMode = 1 compete all (can be set by input "compete with all")
// gameMode = 2 knock out (can be set by input "knock out")

var winMode = 1;
// winMode = 1 Highest Combined (default or when user input "highest")
// winMode = 2 Lowest Combined (user input "lowest")

var numberOfDice = 2;
// the game has to have 2 more more dice to work

var rounds = 0;
// count the rounds of the game

var myOutputValue = "";
// set output value as a global var to keep concatenate the string

var leaderBoardArray = [];
// keep track of leaderboard

var main = function (input) {
  // Starting of the game, ask for number of players
  if (gameInit == 0) {
    if (input >= 2) {
      numberOfPlayers = input;
      gameInit = 1;
      myOutputValue = `Great! You have selected ${numberOfPlayers} players for this game. <p><h3> Please enter the number of game piece for each round of dice roll.</h3> <br> Note: The game requires more than 1 die to start.`;
    } else {
      myOutputValue = `Please indicate the number of players first!`;
    }
  } else if (gameInit == 1) {
    // after entering no. of player, next question is number of game piece in dice rolling
    if (input >= 2) {
      // correct input, so save the value next
      numberOfDice = input;
      // completed the game initiation, set the gameInit status to 2
      gameInit = 2;
      myOutputValue = `
      You have chosen the ${numberOfPlayers} players with ${numberOfDice} dice in each roll. <p>  
      Game rule: <br>Each round, the player wins if the player has largest combined number of dice. <br> Leader board will show the sum of each round to show the final winner! <p><h3> Are you ready? Press "Submit" button to start the game! </h3>`;

      // initialise leader board array with zero, as each player starts from zero
      // only initiate once
      for (let i = 0; i < numberOfPlayers; i++) {
        leaderBoardArray.push(Number(0));
      }
    } else {
      // incorrect input for number of dice, return error message and guidance to user
      myOutputValue = `Please enter 2 or more for the number of game pieces for each dice roll.`;
    }
  } else if (gameInit == 2) {
    // User completed the initiation. Start of the game now.
    rounds++;
    // counter for game rounds

    var diceArray = []; // to store each player dice roll
    var result = Number(0);
    var currentGameArray = []; // for each round, we store all dice rolls from all players into an array

    // to store all values that rolled by players into the current game array
    // this array will be reused for each round of game
    for (let i = 1; i <= numberOfPlayers; i++) {
      // roll the dice based on number of die and create an unsorted array
      diceArray = getDiceRollArray(numberOfDice);
      // convert it to sorted array by descending order
      sortedArray = sortArrayDescending(diceArray);
      // combine all the numbers in an array to a number
      result = convertArrayToNumber(sortedArray);
      currentGameArray.push(result);
    }

    // sum up all the current games with same structure of player 1, player 2, etc
    for (let i = 0; i < numberOfPlayers; i++) {
      var existingValue = Number(leaderBoardArray[i]);
      var newGameScore = Number(currentGameArray[i]);
      var sum = existingValue + newGameScore;
      leaderBoardArray[i] = sum;
    }

    // if the highest number wins, we need to get the highest number using Math.max.apply function
    winningDiceRollNum = Math.max.apply(null, currentGameArray);
    // We need to find out which player is the winning one. The index no. of array of the max number is the player number.
    var winningPlayerNumber = currentGameArray.indexOf(winningDiceRollNum) + 1; // as the array index starts with zero, Player 1 is in index 0. So we need to +1 to get the right player no.

    myOutputValue = `<H4> Game round: ${rounds}: </h4>`;
    // Try to display the player 1, player 2, etc till player n (n is the number of players indicated by user)
    for (let i = 1; i <= numberOfPlayers; i++) {
      if (i == 1) {
        myOutputValue = myOutputValue + "Player " + i + "(me)";
      } else {
        myOutputValue = myOutputValue + "," + "Player " + i;
      }
    }

    myOutputValue =
      myOutputValue +
      `<br>${currentGameArray}<br><br> The winner for this round is player ${winningPlayerNumber}`;

    myOutputValue = myOutputValue + `<H4> The Leader Board </H4>`;

    for (let i = 1; i <= numberOfPlayers; i++) {
      if (i == 1) {
        myOutputValue = myOutputValue + "Player " + i + "(me)";
      } else {
        myOutputValue = myOutputValue + "," + "Player " + i;
      }
    }

    myOutputValue = myOutputValue + `<p> ${leaderBoardArray}`;
  }

  return myOutputValue;
};

// Pass in the number of die to roll, and save it into an array
var getDiceRollArray = function (input) {
  // input is the number of game piece for each dice roll
  var noGamePiece = input;
  var diceRollArray = [];

  // roll the dice by number of times defined by input and insert into a single array
  for (let i = 0; i < input; i++) {
    diceRollArray.push(rollDice());
  }
  return diceRollArray;
};

// dice roll function for each die
var rollDice = function () {
  // produces a decimal starting from 0 and ending BEFORE 6 (5.999999...)
  var randomDecimal = Math.random() * 6;

  // take off the decimal -> 0 to 5
  var randomInteger = Math.floor(randomDecimal);

  // it's a number from 0 - 5 ... add 1 -> 1 to 6
  var diceNumber = randomInteger + 1;

  return diceNumber;
};

// Pass in an array with numbers, and sort it in descending order
var sortArrayDescending = function (input) {
  var diceArray = [];
  diceArray = input;
  // Sort the numbers in the array in descending order
  diceArray.sort(function (a, b) {
    return b - a;
  });

  return diceArray;
};

// Pass in an array with numbers, combine all the numbers and output a single number
var convertArrayToNumber = function (input) {
  var numberArray = [];
  numberArray = input;

  var numberInText = "";
  for (let i = 0; i < numberArray.length; i++) {
    numberInText = numberInText + numberArray[i];
  }
  // convert the text to number
  numberInText = Number(numberInText);
  return numberInText;
};
