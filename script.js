// Variable Number of Dice
// Create a new version of Beat That that rolls two or more dice per player.
// At the beginning of each round, ask the players how many dice they would like to play with. Both players will roll the same number of dice each round.
// Store each player's dice rolls in an array. When each player rolls dice, use a loop to place n dice roll values in that player's array, where n is the number of dice the players specified at the beginning of the round. Output each player's dice roll values.
// Auto-generate the optimal combined number based on each player's dice rolls to determine the winner of that round.

let randomDiceNumberOfPlayer1inArray = [];
let randomDiceNumberOfPlayer2inArray = [];
let gameState = "PLAYER ENTER THE NUMBER OF DICE.";

let rollDice = function () {
  let randomDecimal = Math.random() * 6;
  let diceNumber = Math.floor(randomDecimal) + 1;
  return diceNumber;
};

//Create for loop to place n dice roll values in that player's array. Output each player's dice roll values.

let main = function (input) {
  let output = "";

  if (gameState == "PLAYER ENTER THE NUMBER OF DICE.") {
    //ADD INPUT VALIDATION
    if (Number.isNaN(Number(input))) {
      output = `Sorry, please enter a number.`;
    } else {
      for (let i = 0; i < input; i += 1) {
        let randomDiceNumberOfPlayer1 = rollDice();
        let randomDiceNumberOfPlayer2 = rollDice();
        randomDiceNumberOfPlayer1inArray.push(randomDiceNumberOfPlayer1);
        randomDiceNumberOfPlayer2inArray.push(randomDiceNumberOfPlayer2);
        console.log(
          "randomDiceNumberOfPlayer1inArray",
          randomDiceNumberOfPlayer1inArray
        );
        console.log(
          "randomDiceNumberOfPlayer2inArray",
          randomDiceNumberOfPlayer2inArray
        );
        output = `Hi, Player 1! Your dice number are: ${randomDiceNumberOfPlayer1inArray} <br> Player 2, your dice number are: ${randomDiceNumberOfPlayer2inArray} <br> Please click submit to determine which player is winner.`;
      }
      gameState =
        "GAME STATE_COMPARE THE COMBINED DICE NUMBER BETWEEN TWO PLAYER";
    }
  }

  //Auto-generate the optimal combined number based on each player's dice rolls to determine the winner of that round.
  else if (
    gameState ==
    "GAME STATE_COMPARE THE COMBINED DICE NUMBER BETWEEN TWO PLAYER"
  ) {
    //Sort array for dice no in descending order
    randomDiceNumberOfPlayer1inArray.sort((a, b) => b - a);
    randomDiceNumberOfPlayer2inArray.sort((a, b) => b - a);
    //Combine dice no into a single string using reduce method
    // reduce() method is being used to sum all the elements in an array. The first argument passed to reduce() is a function that takes two arguments: the accumulator acc and the current element curr.
    //In this case, the function adds the current element curr to the accumulator acc. The second argument passed to reduce() is the initial value of the accumulator, which in this case is an empty string "".
    //So, this line will iterate over all elements in an array, add them up, and return the sum as a single value. In this specific case, since the initial value of the accumulator is an empty string "", the method will concatenate all elements in the array into a single string.
    let combinedNoOfPlayer1InString = randomDiceNumberOfPlayer1inArray.reduce(
      (acc, curr) => acc + curr,
      ""
    );
    let combinedNoOfPlayer2InString = randomDiceNumberOfPlayer2inArray.reduce(
      (acc, curr) => acc + curr,
      ""
    );
    console.log("combinedNoOfPlayer1InString:", combinedNoOfPlayer1InString);
    console.log("combinedNoOfPlayer2InString:", combinedNoOfPlayer2InString);
    //Convert combined dice number in string to number
    //Create if.else statement to compare combined dice number btw 2 player
    let combinedNoOfPlayer1 = Number(combinedNoOfPlayer1InString);
    let combinedNoOfPlayer2 = Number(combinedNoOfPlayer2InString);
    console.log(combinedNoOfPlayer1);
    console.log(combinedNoOfPlayer2);
    if (combinedNoOfPlayer1 > combinedNoOfPlayer2) {
      output = `Player 1, you won!. Since Player 1's combined number is ${combinedNoOfPlayer1}, player 2's combined number is ${combinedNoOfPlayer2}.<br>Please click submit to reset the game.`;
    } else if (combinedNoOfPlayer2 > combinedNoOfPlayer1) {
      output = `Player 2, you won!. Since Player 1's combined number is ${combinedNoOfPlayer1}, player 2's combined number is ${combinedNoOfPlayer2}.<br>Please click submit to reset the game.`;
    }
    gameState = "RESET MODE";
  }

  //Create if statement for reset mode
  else if (gameState == "RESET MODE") {
    randomDiceNumberOfPlayer1inArray.length = 0;
    randomDiceNumberOfPlayer2inArray.length = 0;
    gameState = "PLAYER ENTER THE NUMBER OF DICE.";
    output = `Hi, Player! Please enter the number of dice you want to
        play with.<br />
        This game will auto-generate the optimal combined number.<br />
        The player with the highest combined number wins! Good luck!`;
  }
  return output;
};
