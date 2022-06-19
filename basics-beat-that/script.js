// 1) random dice roll function
// 2) player 1 roll: call function twice on click
// 3) player 2 roll: call function twice on click
// 4) sort player roll according to state
// 5) call winner function to compare both player rolls

let currentPlayer1Score = 0;
let currentPlayer2Score = 0;
let player1choice = [];
let player2choice = [];
let player1final = [];
let player2final = [];
let holdingArray = [];
let winner = "";
let toggled = false;
const player1button = document.getElementById("roll-button-player-1");
const player2button = document.getElementById("roll-button-player-2");

//CHECK TOGGLE GAME STATE
function toggle() {
  if (!toggled) {
    toggled = true;
    document.getElementById("toggle-button").innerHTML = "Bigger Number Wins";
    return;
  }
  if (toggled) {
    toggled = false;
    document.getElementById("toggle-button").innerHTML = "Smaller Number Wins";
    return;
  }
}

setupListeners();
changeButtonColour();

function setupListeners() {
  player1button.addEventListener("click", () => {
    player1click();
  });
  player2button.addEventListener("click", () => {
    player2click();
  });
  document.getElementById("results").addEventListener("click", () => {
    gameCheckReset();
  });
}

// CHANGE BUTTON COLOUR ON CLICK
function changeButtonColour() {
  player1button.addEventListener("click", function onClick() {
    if (player1choice.length != 0) {
      this.style.backgroundColor = "darksalmon";
    } else {
      this.style.backgroundColor = "bisque";
    }
  });
  player2button.addEventListener("click", function onClick() {
    if (player2choice.length != 0) {
      this.style.backgroundColor = "darksalmon";
    } else {
      this.style.backgroundColor = "bisque";
    }
  });
  console.log("CHANGE COLOR");
}

function playGame() {
  let toggled = document.querySelector("#toggle-button").innerHTML;
  if (toggled == "Bigger Number Wins") {
    findingWinnerDesc();
  } else {
    findingWinnerAsc();
  }
  if (player1final == player2final) {
    document.getElementById("output-div").innerHTML = `It's a tie!`;
  }
  updateUI(currentPlayer1Score, currentPlayer2Score, winner);
  player1choice = [];
  player2choice = [];
  player1final = [];
  player2final = [];
}

function player1click() {
  rollDice();
  player1choice.push(...holdingArray);
  holdingArray = [];
  if (player1choice.length > 2) {
    player1choice = [];
    document.getElementById(
      "output-div"
    ).innerHTML = `Player 1 double rolled! Both of you roll again`;
    console.log("player 1 double roll");
  }
  console.log("this is player 1 array:", player1choice);
}

function player2click() {
  rollDice();
  player2choice.push(...holdingArray);
  holdingArray = [];
  if (player2choice.length > 2) {
    player2choice = [];
    document.getElementById(
      "output-div"
    ).innerHTML = `Player 2 double rolled! Both of you roll again`;
    console.log("player 2 double roll");
  }
  console.log("this is player 2 array:", player2choice);
}

function gameCheckReset() {
  if (player1choice.length != 0 && player2choice.length != 0) {
    playGame();
  } else {
    player1choice = [];
    player2choice = [];
    player1button.style.backgroundColor = "bisque";
    player2button.style.backgroundColor = "bisque";
    document.getElementById(
      "output-div"
    ).innerHTML = `Hey, someone forgot to roll! Both of you roll again`;
  }
}

function rollDice() {
  for (var i = 0; i < 2; i++) {
    var randomDecimal = Math.random() * 6;
    var diceRoll = Math.ceil(randomDecimal);
    holdingArray.push(diceRoll);
    console.log(
      "player roll activated, this is the holding array:",
      holdingArray
    );
  }
  return diceRoll;
}

function findingWinnerDesc() {
  player1choice.sort((a, b) => b - a);
  player1final = player1choice[0] * 10 + player1choice[1];
  player2choice.sort((a, b) => b - a);
  player2final = player2choice[0] * 10 + player2choice[1];
  if (player1final > player2final) {
    currentPlayer1Score++;
    console.log("player 1 wins");
    winner = "Player 1";
  } else if (player1final < player2final) {
    currentPlayer2Score++;
    console.log("player 2 wins");
    winner = "Player 2";
  } else {
    console.log("its a tie");
    winner = "no one, it's a tie!";
  }
  console.log(
    `The winner is ${winner} and the player rolls are ${player1final} and ${player2final}`
  );
  return (
    winner, player1final, player2final, currentPlayer1Score, currentPlayer2Score
  );
}

function findingWinnerAsc() {
  player1choice.sort((a, b) => a - b);
  player1final = player1choice[0] * 10 + player1choice[1];
  player2choice.sort((a, b) => a - b);
  player2final = player2choice[0] * 10 + player2choice[1];
  if (player1final < player2final) {
    currentPlayer1Score++;
    console.log("player 1 wins");
    winner = "Player 1";
  } else if (player1final > player2final) {
    currentPlayer2Score++;
    console.log("player 2 wins");
    winner = "Player 2";
  } else {
    console.log("its a tie");
    winner = "no one, it's a tie!";
  }
  console.log(
    `The winner is ${winner} and the player rolls are ${player1final} and ${player2final}`
  );
  return (
    winner, player1final, player2final, currentPlayer1Score, currentPlayer2Score
  );
}

function updateUI(currentPlayer1Score, currentPlayer2Score, winner) {
  document.querySelector("#player-1-final").innerHTML = currentPlayer1Score;
  document.querySelector("#player-2-final").innerHTML = currentPlayer2Score;
  document.getElementById("output-div").innerHTML = `The winner is ${winner}!`;
  document.getElementById(
    "player-1-roll"
  ).innerHTML = `Player 1 rolled ${player1final}.`;
  document.getElementById(
    "player-2-roll"
  ).innerHTML = `Player 2 rolled ${player2final}.`;
  console.log("UI updated");
  player1button.style.backgroundColor = "bisque";
  player2button.style.backgroundColor = "bisque";
}

//RULES DROP DOWN LIST
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}
window.onclick = function (event) {
  if (!event.target.matches(".rules-dropdown")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
