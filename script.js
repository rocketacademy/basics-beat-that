let GAME_ROLL_DICE = "GAME_ROLL_DICE";
let GAME_CHOSE_DICE = "GAME_CHOSE_DICE";
let GAME_COMPARE = "GAME_COMPARE";
let game = GAME_ROLL_DICE;
let choice1 = "";
let playerDice = [];

let currentPlayer = 1;
let allPlayerScore = [];
let output = "";

//Dice roll function
let diceRoll = function () {
  let randomNumber = Math.random() * 6;
  let randomInterger = Math.floor(randomNumber);
  let diceNumber = randomInterger + 1;
  console.log("dice rolled " + diceNumber);
  return diceNumber;
};

//Player roll dice function

let playerRollDice = function () {
  for (let i = 0; i < 2; i += 1) {
    playerDice.push(diceRoll());
    console.log(playerDice);
  }
  return `Welcome Player ${currentPlayer}.<br/> You rolled (${playerDice[0]}) for 🎲 Dice 1 and (${playerDice[1]}) for 🎲Dice 2.<br/> Choose the order of the dice.`;
};

// Get player score

let getPlayerScore = function (playerinput) {
  let choice1;
  if (playerinput != 1 && playerinput != 2) {
    return `Please input only 1 or 2`;
  }
  if (playerinput == 1) {
    choice1 = `${playerDice[0]}${playerDice[1]}`;
    Number(choice1);
  }
  if (playerinput == 2) {
    choice1 = `${playerDice[1]}${playerDice[0]}`;
    Number(choice1);
  }
  allPlayerScore.push(choice1);
  playerDice = [];
  return `Player ${currentPlayer}, yr score is ${choice1}`;
};

//Compare results
let compareResult = function () {
  let compare = `Player 1 score = ${allPlayerScore[0]} <br>Player 2 score = ${allPlayerScore[1]}<br><br>`;
  //Player 1 win
  if (allPlayerScore[0] > allPlayerScore[1]) {
    compare = compare + "Player 1 wins";
    console.log(compare);
  }

  //Player 2 win
  if (allPlayerScore[0] < allPlayerScore[1]) {
    compare = compare + "Player 2 wins";
    console.log(compare);
  }

  //Tie
  if (allPlayerScore[0] == allPlayerScore[1]) {
    compare = compare + `Tie`;
    console.log(compare);
  }
  return compare;
};

let main = function (input) {
  if (game == GAME_ROLL_DICE) {
    output = playerRollDice();
    game = GAME_CHOSE_DICE;
    console.log(output);
    return output;
  }
  if (game == GAME_CHOSE_DICE) {
    output = getPlayerScore(input);
    console.log(output);
    if (currentPlayer == 1) {
      currentPlayer = 2;
      game = GAME_ROLL_DICE;
      console.log(output);
      return output + ` <br><br>It is now Player 2 turn`;
    }
    if (currentPlayer == 2) {
      game = GAME_COMPARE;
      return output + `<br><br>Tabulating score, Click submit`;
    }
  }

  if (game == GAME_COMPARE) {
    output = compareResult();
    return output;
  }
};
