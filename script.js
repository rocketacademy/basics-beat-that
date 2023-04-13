let GAME_ROLL_DICE = "GAME_ROLL_DICE";
let GAME_CHOSE_DICE = "GAME_CHOSE_DICE";
let game = GAME_ROLL_DICE;

let player1Dice = [];
let player2Dice = [];
let currentPlayer = 0;

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
    player1Dice.push(diceRoll());
    console.log(player1Dice);
  }
  return `Welcome Player 1.<br/> You rolled (${player1Dice[0]}) for 🎲 Dice 1 and (${player1Dice[1]}) for 🎲Dice 2.<br/> Choose the order of the dice.`;
};

let main = function (input) {
  if (game == GAME_ROLL_DICE) {
    output = playerRollDice();
    game = GAME_CHOSE_DICE;
    return output;
  }
  if (game == GAME_CHOSE_DICE) {
    if (input != 1 && input != 2) {
      return `Please input only 1 or 2`;
    }
    if (input == 1) {
      let choice1 = `${player1Dice[0]}${player1Dice[1]}`;
      Number(choice1);
      return `Player 1, you chose Dice 1 first. <br/> Your number is ${choice1}.<br/>It is now Player 2's turn.`;
    }
    if (input == 2) {
      let choice1 = `${player1Dice[1]}${player1Dice[0]}`;
      Number(choice1);
      return `Player 1, you chose Dice 1 first. <br/> Your number is ${choice1}.<br/>It is now Player 2's turn.`;
    }
  }

  //+++++Player 2 code++++++++
  currentPlayer = 2;
  if (currentPlayer == 2) {
    for (let i = 0; i < 2; i += 1) {
      player2Dice.push(diceRoll());
      console.log(player2Dice);
      dice1 = player2Dice[0];
      dice2 = player2Dice[1];
      console.log(dice1);
      console.log(dice2);
    }
    return `Welcome Player 2.<br/> You rolled (${dice1}) for 🎲 Dice 1 and (${dice2}) for 🎲Dice 2.<br/> Choose the order of the dice.`;
  }
  console.log(player2Dice);
  dice1 = player2Dice[0];
  dice2 = player2Dice[1];
  if (input == 1) {
    let choice2 = `${dice1}${dice2}`;
    Number(choice2);
    return `Player 2, you chose Dice 1 first. <br/> Your number is ${choice2}.<br/>`;
  }

  if (input == 2) {
    let choice2 = `${dice2}${dice1}`;
    Number(choice2);
    return `Player 2, you chose Dice 1 first. <br/> Your number is ${choice2}.<br/>`;
  }
  let myOutputValue = `Do not enter any value and click submit to play the game 🎲`;
  return myOutputValue;
};
