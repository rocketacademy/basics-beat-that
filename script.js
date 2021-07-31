// 2 dice rolls

var player1Dice = [];
var player2Dice = [];
var player1Choice = [];
var player2Choice = [];
var player1Win = 0;
var player2Win = 0;

// player gets to pick which dice order they want

var currentGameMode = "start game";

// player with highest combo of dice wins

var main = function (input) {
  var diceRoll1 = diceRoll();
  var diceRoll2 = diceRoll();
  var diceRoll1Low = diceRoll();
  var diceRoll2Low = diceRoll();

  var myOutputValue = "me no work sum1 halp";
  var counter = 0;

  if (currentGameMode == "start game") {
    currentGameMode = "choose";
    return (myOutputValue =
      "welcome to the game! Choose your mode: 1. Normal 2. Lowest");
  }

  if (currentGameMode == "choose") {
    if (input == "1") {
      currentGameMode = "normal";
      return (myOutputValue = "you have chosen normal mode");
    }
    if (input == "2") {
      currentGameMode = "lowest";
      return (myOutputValue = "you have chosen lowest mode");
    }
  }
  console.log(currentGameMode);
  // NORMAL MODE

  if (currentGameMode == "normal") {
    console.log(`normal ran`);
    myOutputValue = `Welcome Player 1.<br>dice 1: ${diceRoll1}, dice 2: ${diceRoll2}.<br>Choose the order of the dice as: 1 or 2.`;
    player1Dice = [diceRoll1, diceRoll2];
    currentGameMode = "player 1 chose";
  }
  // NORMAL PLAYER 1 CHOSE
  else if (currentGameMode == "player 1 chose") {
    console.log(`player 1 chose`);
    currentGameMode = `player 2`;
    if (input == 1) {
      myOutputValue = `Player 1, you chose Dice 1 first. <br> Your number is ${player1Dice[0]}${player1Dice[1]}.<br> It is now player 2's turn.`;
      player1Choice = `${player1Dice[0]}${player1Dice[1]}`;
    }
    if (input == 2) {
      myOutputValue = `Player 1, you chose Dice 2 first. <br> Your number is ${player1Dice[1]}${player1Dice[0]}.<br> It is now player 2's turn.`;
      player1Choice = `${player1Dice[1]}${player1Dice[0]}`;
    }
  }
  // NORMAL PLAYER 2 CHOSE
  else if (currentGameMode == "player 2") {
    console.log(`player 2 chose`);
    currentGameMode = "player 2 chose";
    myOutputValue = `Welcome Player 2.<br>dice 1: ${diceRoll1}, dice 2: ${diceRoll2}.<br>Choose the order of the dice as: 1,2 or 2,1.`;
    player2Dice = [diceRoll1, diceRoll2];
  } else if (currentGameMode == "player 2 chose") {
    currentGameMode = "decide winner";
    if (input == 1) {
      myOutputValue = `Player 2, you chose Dice 1 first. <br> Your number is ${player2Dice[0]}${player2Dice[1]}.<br> It is time to announce the winner.`;
      player2Choice = `${player2Dice[0]}${player2Dice[1]}`;
    }
    if (input == 2) {
      myOutputValue = `Player 1, you chose Dice 2 first. <br> Your number is ${player2Dice[1]}${player2Dice[0]}.<br> It is time to announce the winnner.`;
      player2Choice = `${player2Dice[1]}${player2Dice[0]}`;
    }
  }
  // NORMAL DECIDE WINNER
  else if (currentGameMode == "decide winner") {
    console.log(`decide winner`);
    if (player1Choice > player2Choice) {
      player1Win++;
      if ((player1Win) => player2Win) {
        myOutputValue = `Congrats Player 1, you have won! Your number: ${player1Choice}. Player 2's number: ${player2Choice}. <br> Leaderboard: Player 1: ${player1Win}. Player 2: ${player2Win}`;
      }

      if (player1Win <= player2Win) {
        myOutputValue = `Congrats Player 1, you have won! Your number: ${player1Choice}. Player 2's number: ${player2Choice}. <br> Leaderboard: Player 2: ${player2Win}. Player 1: ${player1Win}`;
      }
    } else if (player1Choice < player2Choice) {
      player2Win++;
      if ((player1Win) => player2Win) {
        myOutputValue = `Congrats Player 2, you have won! Your number: ${player2Choice}. Player 1's number: ${player1Choice}. <br> Leaderboard: Player 1: ${player1Win}. Player 2: ${player2Win}`;
      }

      if (player1Win <= player2Win) {
        myOutputValue = `Congrats Player 2, you have won! Your number: ${player2Choice}. Player 1's number: ${player1Choice}. <br> Leaderboard: Player 2: ${player2Win}. Player 1: ${player1Win}`;
      }
    } else if (player1Choice == player2Choice) {
      myOutputValue = `TIE!! NO CHANGE IN SCORE. Player 1 win rate: ${player1Win}. Player 2 win rate: ${player2Win}`;
    }
    currentGameMode = "normal";
  }

  // LOWEST MODE
  if (currentGameMode == "lowest") {
    console.log(`lowest ran`);
    myOutputValue = `Welcome Player 1.<br>dice 1: ${diceRoll1}, dice 2: ${diceRoll2}.<br>Choose the order of the dice as: 1 or 2.`;
    player1Dice = [diceRoll1, diceRoll2];
    currentGameMode = "lowest player 1 chose";
  }
  // LOWEST MODE PLAYER 1 CHOSE
  else if (currentGameMode == "lowest player 1 chose") {
    currentGameMode = `lowest player 2`;
    if (input == 1) {
      myOutputValue = `Player 1, you chose Dice 1 first. <br> Your number is ${player1Dice[0]}${player1Dice[1]}.<br> It is now player 2's turn.`;
      player1Choice = `${player1Dice[0]}${player1Dice[1]}`;
    }
    if (input == 2) {
      myOutputValue = `Player 1, you chose Dice 2 first. <br> Your number is ${player1Dice[1]}${player1Dice[0]}.<br> It is now player 2's turn.`;
      player1Choice = `${player1Dice[1]}${player1Dice[0]}`;
    }
  }
  // LOWEST PLAYER 2 CHOSE
  else if (currentGameMode == "lowest player 2") {
    console.log(`lowest player 2 chose`);
    currentGameMode = "lowest player 2 chose";
    myOutputValue = `Welcome Player 2.<br>dice 1: ${diceRoll1}, dice 2: ${diceRoll2}.<br>Choose the order of the dice as: 1,2 or 2,1.`;
    player2Dice = [diceRoll1, diceRoll2];
  } else if (currentGameMode == "lowest player 2 chose") {
    currentGameMode = "lowest decide winner";
    if (input == 1) {
      myOutputValue = `Player 2, you chose Dice 1 first. <br> Your number is ${player2Dice[0]}${player2Dice[1]}.<br> It is time to announce the winner.`;
      player2Choice = `${player2Dice[0]}${player2Dice[1]}`;
    }
    if (input == 2) {
      myOutputValue = `Player 1, you chose Dice 2 first. <br> Your number is ${player2Dice[1]}${player2Dice[0]}.<br> It is time to announce the winnner.`;
      player2Choice = `${player2Dice[1]}${player2Dice[0]}`;
    }
  }
  // LOWEST DECIDE WINNER
  else if (currentGameMode == "lowest decide winner") {
    console.log(`lowest decide winner`);
    if (player1Choice < player2Choice) {
      player1Win++;
      if (player1Win <= player2Win) {
        myOutputValue = `Congrats Player 1, you have won! Your number: ${player1Choice}. Player 2's number: ${player2Choice}. <br> Leaderboard: Player 1: ${player1Win}. Player 2: ${player2Win}`;
      }

      if ((player1Win) => player2Win) {
        myOutputValue = `Congrats Player 1, you have won! Your number: ${player1Choice}. Player 2's number: ${player2Choice}. <br> Leaderboard: Player 2: ${player2Win}. Player 1: ${player1Win}`;
      }
    } else if (player1Choice > player2Choice) {
      player2Win++;
      if (player1Win <= player2Win) {
        myOutputValue = `Congrats Player 2, you have won! Your number: ${player2Choice}. Player 1's number: ${player1Choice}. <br> Leaderboard: Player 1: ${player1Win}. Player 2: ${player2Win}`;
      }

      if ((player1Win) => player2Win) {
        myOutputValue = `Congrats Player 2, you have won! Your number: ${player2Choice}. Player 1's number: ${player1Choice}. <br> Leaderboard: Player 2: ${player2Win}. Player 1: ${player1Win}`;
      }
    } else if (player1Choice == player2Choice) {
      myOutputValue = `TIE!! NO CHANGE IN SCORE. Player 1 win rate: ${player1Win}. Player 2 win rate: ${player2Win}`;
    }
    currentGameMode = "lowest";
  }

  return myOutputValue;
};

var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var ActualDiceNumber = randomInteger + 1;
  return ActualDiceNumber;
};
