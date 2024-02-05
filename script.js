// Assigning variables
let gameState = "Nil";
let player1Roll = [];
let player2Roll = [];

let player1num = "";
let player2num = "";
let p1largestNum = "";
let p2largestNum = "";

let player1Score = 0;
let player2Score = 0;

let roundResults = "";

let dice1 = "";
let dice2 = "";
let statement = "";

let player1list = [];
let player2list = [];

let leaderboard = [player1Score, player2Score];

//messsage
let ErrorMessage = "Error: Please enter 'normal' or 'special' only.";

// Set up dice function
let genDiceRoll = function () {
  return Math.ceil(Math.random() * 6);
};

let main = function (input) {
  console.log("main function");
  console.log(gameState);
  let selectMode = input;
  //Return with an error message if no input at the start. Users need to select game mode.
  if (!selectMode.trim() && gameState == "Nil") {
    return ErrorMessage;
  }
  //If users select NORMAL game, normal roll of 1 player each will proceed.
  if (selectMode == "normal") {
    gameState = "Player 1 roll";
  }
  //If users select SPECIAL game, special rolls for both players at once will proceed.
  if (selectMode == "special") {
    gameState = "Special";
  }

  //NORMAL game mode starts here. Dice will roll twice. Computer output a message for Player 1 to select the order of number.
  if (input == "normal" || gameState == "Player 1 roll") {
    for (counter = 0; counter < 2; counter += 1) {
      let diceResult = genDiceRoll();
      player1Roll.push(diceResult);
    }
    dice1 = player1Roll[0];
    dice2 = player1Roll[1];
    gameState = "Player 1 choice";
    return `Welcome Player 1. You rolled ${dice1} for Dice 1 and ${dice2} for Dice 2.<br><br>
Choose the order of the dice by entering 1 or 2.`;
  }
  // Return with error message if no input when asked to select order.
  if (!input.trim() && gameState == "Player 1 choice") {
    return "Error: Please enter 1 or 2 only.";
  }

  // Now input is read as Player 1's choice
  if (gameState == "Player 1 choice") {
    console.log("inside player 1 choice");
    console.log(gameState);

    let player1Choice = input;

    // Output a message to summarise what Player 1's choice is and invite Player 2 to play
    if (player1Choice == 1) {
      player1num = player1Roll[0] * 10 + player1Roll[1];
      gameState = "Player 2 roll";
      console.log(player1num);
      console.log("end of player 1 choice - 1");
      return `Player 1, you chose Dice 1 first. Your number is ${player1num}.<br><br>It is now Player 2's turn.`;
    } else {
      player1num = player1Roll[1] * 10 + player1Roll[0];
      gameState = "Player 2 roll";
      console.log("end of player 1 choice - 2");
      return `Player 1, you chose Dice 2 first. Your number is ${player1num}.<br><br>It is now Player 2's turn.`;
    }
  }

  // Player 2's turn. Dice will roll twice. Computer output a message for Player 2 to select the order of number.
  if (gameState == `Player 2 roll`) {
    for (counter = 0; counter < 2; counter += 1) {
      let diceResult = genDiceRoll();
      player2Roll.push(diceResult);
    }
    dice1 = player2Roll[0];
    dice2 = player2Roll[1];
    gameState = "Player 2 choice";
    return `Welcome Player 2. You rolled ${dice1} for Dice 1 and ${dice2} for Dice 2.<br><br>Choose the order of the dice by entering 1 or 2.`;
  }

  // Return with error message if no input when asked to select order.
  if (!input.trim() && gameState == "Player 2 choice") {
    return "Error: Please 1 or 2 only.";
  }

  // Output a message to summarise what Player 2's choice is and to bring players to final results
  if (gameState == "Player 2 choice") {
    let player2Choice = input;

    if (player2Choice == 1) {
      player2num = player2Roll[0] * 10 + player2Roll[1];
      gameState = "Comparison";
      return `Player 2, you chose Dice 1 first. Your number is ${player2num}. <br><br>Let's compare!`;
    }
    if (player2Choice == 2) {
      player2num = player2Roll[1] * 10 + player2Roll[0];
      gameState = "Comparison";
      return `Player 2, you chose Dice 2 first. Your number is ${player2num}. <br><br>Let's compare!`;
    }
  }
  //SPECIAL game mode starts here. Dice will roll twice for both players Computer output a message for both players to hit submit once to reach comparison state.
  if (gameState == "Special") {
    console.log(gameState);
    //Player 1 auto rolls twice and highest possible combination is stored
    for (counter = 0; counter < 2; counter += 1) {
      console.log("1" + player1list);
      let diceResult = genDiceRoll();
      player1Roll.push(diceResult);
      console.log("Dice result" + player1Roll);
      console.log("2" + player1list);
      player1num1 = player1Roll[0] * 10 + player1Roll[1];
      player1num2 = player1Roll[1] * 10 + player1Roll[0];
      player1list.push(player1num1, player1num2);
      console.log("3" + player1list);
    }
    //Player 2 auto rolls twice and highest possible combination is stored
    for (counter = 0; counter < 2; counter += 1) {
      let diceResult = genDiceRoll();
      player2Roll.push(diceResult);
      player2num1 = player2Roll[0] * 10 + player2Roll[1];
      player2num2 = player2Roll[1] * 10 + player2Roll[0];
      player2list.push(player2num1, player2num2);
    }
    let array1WithoutNaN = player1list.filter((value) => !isNaN(value));
    let array2WithoutNaN = player2list.filter((value) => !isNaN(value));
    p1largestNum = Math.max(...array1WithoutNaN);
    p2largestNum = Math.max(...array2WithoutNaN);
    gameState = "Special-results";
    console.log("Player 1 list:", player1list);
    console.log("Player 2 list:", player2list);
    return "Press again to see results!";
  }

  // Comparing the final numbers of both players
  if (gameState == "Special-results" || gameState == "Comparison") {
    console.log("Comparing results and scoring");

    // NORMAL mode - If Player 1 has the greater number, he wins. Game state to remain at NORMAL and invite Player 1 to start again
    if (gameState == "Comparison") {
      if (player1num > player2num) {
        leaderboard[0] += 1;
        player1Score += 1;
        roundResults = "Player 1 wins";
      } else {
        leaderboard[1] += 1;
        player2Score += 1;
        roundResults = "Player 2 wins";
      }
    }
    // SPECIAL mode - If Player 1 has the greater number, he wins. Game state to remain at SPECIAL and invite both to start again
    if (gameState == "Special-results") {
      if (p1largestNum > p2largestNum) {
        leaderboard[0] += 1;
        player1Score += 1;
        console.log("player1win" + leaderboard);
        roundResults = "Player 1 wins";
        // SPECIAL mode - If Player 2 has the greater number, he wins. Game state to remain at SPECIAL and invite both to start again
      } else leaderboard[1] += 1;
      player2Score += 1;
      console.log("player2win" + leaderboard);
      roundResults = "Player 2 wins";
    }

    // Reading the leaderboard array and sort the scores in descending order
    let order = [...leaderboard].sort((a, b) => b - a);
    console.log(order);
    console.log(leaderboard);

    // Choosing the output. If Player 1 scores is greater than Player 2, then the statement starts with Player 1. Vice versa.
    if (player1Score > player2Score) {
      console.log("player 1 winning");
      statement = "Player 1 is leading! <br>Score: ";
    }
    if (player1Score < player2Score) {
      console.log("player 2 winning");
      statement = "Player 2 is leading! <br>Score: ";
    }
    // Output if both players draw
    if (player1Score == player2Score) {
      console.log("draw");
      statement = "It's a draw!<br>Score: ";
    }
    // Winning announcement messages
    let NormalComparison = `Player 1: ${player1num}<br>Player 2: ${player2num}<br><br>`;
    let SpecialComparison = `Player 1: ${p1largestNum}<br>Player 2: ${p2largestNum}<br><br>`;
    let StandardStatement = `<br><br>${statement}${order}`;
    let P1Win = `${NormalComparison}Player 1 wins!${StandardStatement}`;
    let P2Win = `${NormalComparison}Player 2 wins!${StandardStatement}`;
    let P1WinSpecial = `${SpecialComparison}Player 1 wins! ${StandardStatement}`;
    let P2WinSpecial = `${SpecialComparison}Player 2 wins! ${StandardStatement}`;

    // SPECIAL MODE -  If player 1 wins, arrays reset
    if (gameState == "Special-results") {
      if (roundResults == "Player 1 wins") {
        myOutputValue = P1WinSpecial;
        roundResults = "";
        gameState = "Special";
        player1num = "";
        player2num = "";
        player1Roll = [];
        player2Roll = [];
        player1list = [];
        player2list = [];
        console.log("Output:", myOutputValue);
        return myOutputValue;
      }
      // SPECIAL MODE -  If player 2 wins, arrays reset
      if (roundResults == "Player 2 wins") {
        myOutputValue = P2WinSpecial;
        roundResults = "";
        gameState = "Special";
        player1num = "";
        player2num = "";
        player1Roll = [];
        player2Roll = [];
        player1list = [];
        player2list = [];
        console.log("Output:", myOutputValue);
        return myOutputValue;
      }
    }

    // NORMAL MODE -  If player 1 wins, game mode resets
    if (roundResults == "Player 1 wins") {
      myOutputValue = P1Win;
      roundResults = "";
      gameState = "Player 1 roll";
      return myOutputValue;
    }
    // NORMAL MODE -  If player 2 wins, game mode resets
    if (roundResults == "Player 2 wins") {
      myOutputValue = P2Win;
      roundResults = "";
      gameState = "Player 1 roll";
      return myOutputValue;
    }
  }
};
