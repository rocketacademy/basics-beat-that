var gameMode = "numberOfRounds";
var roundNumber = 1;
var button = document.getElementById("submit-button");
var d1Roll;
var d2Roll;
var chosenNumber1;
var chosenNumber2;
var outputMsg = ``;
var p1Score = 0;
var p2Score = 0;
var totalRounds = 0;
var scoreMsg;
var winMsg;

function getDiceRoll() {
  var rolledDice = Math.floor(Math.random() * 6 + 1);
  return rolledDice;
}

function main(input) {
  //number of rounds

  if (gameMode == "numberOfRounds") {
    if (isNaN(input) || input == "") {
      outputMsg = "Invalid input. Enter the number of rounds you wish to play.";
    } else {
      totalRounds = Number(input);
      gameMode = "gameStart";
      outputMsg = "Press Play to begin.";
      button.innerText = "Play";
    }
  }

  //start game
  else if (gameMode == "gameStart") {
    button.innerText = "Roll";
    outputMsg = `Round ${roundNumber} is starting. Player 1 press roll to begin.`;
    gameMode = "p1Roll";
  }

  //Player1 rolls dice
  else if (gameMode == "p1Roll") {
    d1Roll = getDiceRoll().toString(); //making rolls a string to allow concatenation of rolls to combine dice rolls into a number.
    d2Roll = getDiceRoll().toString();

    if (d1Roll == d2Roll) {
      chosenNumber1 = Number(d1Roll + d2Roll);
      outputMsg = `PLayer 1. You rolled ${d1Roll} for both dices. Your number is: ${chosenNumber1}.<br>Player 2. Press Roll to roll your dice.`;
      button.innerText = "Roll";
      gameMode = "p2Roll";
    } else {
      gameMode = "p1Choose";
      outputMsg = `You rolled:<br> Dice One: ${d1Roll}<br> Dice Two: ${d2Roll}<br>Choose which dice goes first:<br>Enter 1 for Dice One, Enter 2 for Dice Two.`;
      button.innerText = "Choose";
    }
  }

  //Player 1 decides which dice to use first
  else if (gameMode == "p1Choose") {
    if (input != 1 && input != 2) {
      outputMsg = "Invalid input. Enter 1 for Dice One, Enter 2 for Dice Two.";
    } else {
      if (input == 1) {
        chosenNumber1 = Number(d1Roll + d2Roll);
        button.innerText = "Roll";
        outputMsg = `Player 1. Your number is ${chosenNumber1}.<br>Player 2. Press Roll to roll your dice.`;
      } else if (input == 2) {
        chosenNumber1 = Number(d2Roll + d1Roll);
        button.innerText = "Roll";
        outputMsg = `Player 1. Your number is ${chosenNumber1}.<br>Player 2. Press Roll to roll your dice.`;
      }
      gameMode = "p2Roll";
    }
  }
  //   //Player 2 rolls dice
  else if (gameMode == "p2Roll") {
    d1Roll = getDiceRoll().toString();
    d2Roll = getDiceRoll().toString();

    if (d1Roll == d2Roll) {
      chosenNumber2 = Number(d1Roll + d2Roll);
      outputMsg = `Player 2. You rolled ${d1Roll} for both dices. Your number is: ${chosenNumber2}<br> Press Results to continue.`;
      button.innerText = "Results";
      gameMode = "results";
    } else {
      gameMode = "p2Choose";
      outputMsg = `You rolled:<br> Dice One: ${d1Roll}<br> Dice Two: ${d2Roll}<br>Choose which dice goes first:<br>Enter 1 for Dice One, Enter 2 for Dice Two.`;
      button.innerText = "Choose";
    }
  }

  //   //Player 2 decides which dice to use first
  else if (gameMode == "p2Choose") {
    if (input != 1 && input != 2) {
      outputMsg = "Invalid input. Enter 1 for Dice One, Enter 2 for Dice Two.";
    } else {
      if (input == 1) {
        chosenNumber2 = Number(d1Roll + d2Roll);
        button.innerText = "Results";
        outputMsg = `Player 2. Your number is ${chosenNumber2}.<br> Press Results to continue.`;
      } else if (input == 2) {
        chosenNumber2 = Number(d2Roll + d1Roll);
        button.innerText = "Results";
        outputMsg = `Player 2. Your number is ${chosenNumber2}.<br> Press Results to continue.`;
      }
      gameMode = "results";
    }
  }
  //   //Winner
  else if (gameMode == "results") {
    p1Score = p1Score + chosenNumber1;
    p2Score = p2Score + chosenNumber2;
    if (chosenNumber1 == chosenNumber2) {
      outputMsg = `Player 1 played ${chosenNumber1}, Player 2 played ${chosenNumber2}.<br>
  Its a tie!`;
    } else if (chosenNumber1 > chosenNumber2) {
      outputMsg = `Player 1 played ${chosenNumber1}, Player 2 played ${chosenNumber2}.<br>
  Player 1 wins this round.`;
    } else {
      outputMsg = `Player 1 played ${chosenNumber1}, Player 2 played ${chosenNumber2}.<br>
  Player 2 wins this round.`;
    }
    button.innerText = "View Scores";
    gameMode = "score";
  }
  //Score
  else if (gameMode == "score") {
    if (p1Score > p2Score) {
      winMsg = "Player 1 Wins!";
      scoreMsg = `Total Score as of Round ${roundNumber}!<br>
    Player 1: ${p1Score}<br>Player 2: ${p2Score}`;
      button.innerText = `Play Round ${roundNumber + 1}`;
    } else if (p2Score > p1Score) {
      winMsg = "Player 2 Wins!";
      scoreMsg = `Total Score as of Round ${roundNumber}!<br>
    Player 2: ${p2Score}<br>Player 1: ${p1Score}`;
      button.innerText = `Play Round ${roundNumber + 1}`;
    } else {
      scoreMsg = `Total Score as of Round ${roundNumber}!<br>
    Player 1: ${p1Score}<br>Player 2: ${p2Score}<br>Its a tie!`;
    }
    if (roundNumber == totalRounds) {
      outputMsg = `Game Over!<br>${scoreMsg}<br>${winMsg}`;
      button.innerText = "Restart Game";
      button.addEventListener("click", function () {
        location.reload(); // function to refresh page and restart game.
      });
    } else {
      gameMode = "gameStart";
      roundNumber++;
      outputMsg = scoreMsg;
    }
  }

  return outputMsg;
}
