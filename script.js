var PLAYERTURN = 0;
var PLAYER1DICESARRAY = [];
var PLAYER2DICESARRAY = [];
var PLAYERCHOICESARRAY = [];

var rollDice = function () {
  // Generate a decimal from 0 through 6, inclusive of 0 and exclusive of 6.
  var randomDecimal = Math.random() * 6;

  // Remove the decimal with the floor operation.
  // This will be an integer from 0 to 5 inclusive.
  var randomInteger = Math.floor(randomDecimal);

  // Add 1 to get valid dice rolls of 1 through 6 inclusive.
  var diceNumber = randomInteger + 1;

  return diceNumber;
};

var main = function (input) {
  var myOutputValue = "";
  var whoWin = "";

  switch (PLAYERTURN) {
    case 0:
      PLAYERTURN = 1;
      PLAYER1DICESARRAY.push(rollDice());
      PLAYER1DICESARRAY.push(rollDice());

      myOutputValue = `🎲 WELCOME, PLAYER 1 🎲<br><br>
                      You rolled ${PLAYER1DICESARRAY[0]} for dice one and ${PLAYER1DICESARRAY[1]} for dice two.<br><br>
                      Choose the order of the dice by entering "1" or "2".
                      `;
      break;

    case 1:
      PLAYERTURN = 2;
      if (input == 1) {
        PLAYERCHOICESARRAY.push(
          PLAYER1DICESARRAY[0] + "" + PLAYER1DICESARRAY[1]
        );
      } else if (input == 2) {
        PLAYERCHOICESARRAY.push(
          PLAYER1DICESARRAY[1] + "" + PLAYER1DICESARRAY[0]
        );
      } else {
        PLAYERTURN = 1; //reset playerturn back to 1
        myOutputValue = `Oops, Player 1, please enter a valid number (1 or 2).`;
        return myOutputValue;
      }

      myOutputValue = `Player 1, you chose Dice ${input} first. Your number is ${PLAYERCHOICESARRAY[0]}.<br><br>
                      It is now Player 2's turn.<br>
                      Click Submit to continue.
                      `;
      break;

    case 2:
      PLAYERTURN = 3;

      PLAYER2DICESARRAY.push(rollDice());
      PLAYER2DICESARRAY.push(rollDice());

      myOutputValue = `🎲 WELCOME, PLAYER 2 🎲<br><br>
                      You rolled ${PLAYER2DICESARRAY[0]} for dice one and ${PLAYER2DICESARRAY[1]} for dice two.<br><br>
                      Choose the order of the dice by entering "1" or "2".
                      `;
      break;

    case 3:
      PLAYERTURN = 4;
      if (input == 1) {
        PLAYERCHOICESARRAY.push(
          PLAYER2DICESARRAY[0] + "" + PLAYER2DICESARRAY[1]
        );
      } else if (input == 2) {
        PLAYERCHOICESARRAY.push(
          PLAYER2DICESARRAY[1] + "" + PLAYER2DICESARRAY[0]
        );
      } else {
        PLAYERTURN = 3; //reset playerturn back to 3
        myOutputValue = `Oops, Player 2, please enter a valid number (1 or 2).`;
        return myOutputValue;
      }

      myOutputValue = `You chose Dice ${input} first. Your number is ${PLAYERCHOICESARRAY[1]}.<br><br>
                      Click Submit to see who won.
                      `;
      break;

    case 4:
      PLAYERTURN = 0; //reset game to player1
      if (PLAYERCHOICESARRAY[0] == PLAYERCHOICESARRAY[1]) {
        whoWin = `No player win<br>
                Click Submit to play again!`;
      } else if (PLAYERCHOICESARRAY[0] < PLAYERCHOICESARRAY[1]) {
        whoWin = `Player 2 is the winner`;
      } else {
        //if (PLAYERCHOICESARRAY[0] > PLAYERCHOICESARRAY[1])
        whoWin = `Player 1 is the winner`;
      }

      myOutputValue = `Player 1's number is ${PLAYERCHOICESARRAY[0]}.<br>
                      Player 2's number is ${PLAYERCHOICESARRAY[1]}.<br>
                      ${whoWin}<br><br>
                      Click Submit to play again!`;
      break;
  }

  return myOutputValue;
};
