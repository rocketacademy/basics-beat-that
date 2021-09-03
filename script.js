// create global variable for whose turn it is, individual player turn, player 1 combineddicenum, player 2 combineddicenum
var inputPlayerTurn = "";
var p1ChoiceMade = "";
var p2ChoiceMade = "";
var p1DiceRoll1 = "";
var p1DiceRoll2 = "";
var p2DiceRoll1 = "";
var p2DiceRoll2 = "";
var player1CombinedDiceNum = "";
var player2CombinedDiceNum = "";
var gameEnd = "";

// generate random number for dice roll function
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

var main = function (input) {
  var myOutputValue = "";
  var p1RandomDiceNumber1 = rollDice();
  var p1RandomDiceNumber2 = rollDice();
  var p2RandomDiceNumber1 = rollDice();
  var p2RandomDiceNumber2 = rollDice();

  // default state is player 1
  if (inputPlayerTurn == "") {
    inputPlayerTurn = 1;
    return `Welcome Player 1. <br> Let's play beat that! <br><br> Click on submit to roll 2 dice numbers. `;
    if (input == "") {
      myOutputValue = `Please key in which player you are.`;
      return myOutputValue;
    }
    inputPlayerTurn = input;
    myOutputValue = `Welcome Player ${input}. <br> Let's play beat that! <br> Click on submit to roll 2 dice numbers.`;
    return myOutputValue;
  }

  // show player 1 their dice rolls and ask to choose order
  if (inputPlayerTurn == 1 && input == "") {
    console.log("p1 dice number1");
    console.log(p1RandomDiceNumber1);
    console.log("p1 dice number2");
    console.log(p1RandomDiceNumber2);
    p1DiceRoll1 = p1RandomDiceNumber1.toString();
    p1DiceRoll2 = p1RandomDiceNumber2.toString();
    p1ChoiceMade = 1;
    myOutputValue = `You've rolled a ${p1DiceRoll1} and a ${p1RandomDiceNumber2}. <br><br> Type in 'a' if you want the order of your dice rolls to be ${p1RandomDiceNumber1}${p1RandomDiceNumber2}. <br><br> Type in 'b' if you want the order of your dice rolls to be ${p1RandomDiceNumber2}${p1RandomDiceNumber1}.`;
    return myOutputValue;
  }

  // if player 1 selects order to be: dice roll 1, dice roll 2
  if (p1ChoiceMade == 1 && input == "a") {
    player1CombinedDiceNum = p1DiceRoll1 + p1DiceRoll2;
    console.log("p1 combined num");
    console.log(player1CombinedDiceNum);
    inputPlayerTurn = 2;
    myOutputValue = `You have chosen to go with <b>${player1CombinedDiceNum}</b>. <br> Now it's Player 2's turn!`;
    return myOutputValue;
  }

  // if player 1 selects order to be: dice roll 2, dice roll 1
  if (p1ChoiceMade == 1 && input == "b") {
    player1CombinedDiceNum = p1DiceRoll2 + p1DiceRoll1;
    console.log("p1 combined num");
    console.log(player1CombinedDiceNum);
    inputPlayerTurn = 2;
    myOutputValue = `You have chosen to go with <b>${player1CombinedDiceNum}</b>. <br> Now it's Player 2's turn!`;
    return myOutputValue;
  }

  // show player 2 their dice rolls and ask to choose order
  if (inputPlayerTurn == 2 && input == "") {
    console.log("p2 dice number1");
    console.log(p2RandomDiceNumber1);
    console.log("p2 dice number2");
    console.log(p2RandomDiceNumber2);
    p2DiceRoll1 = p2RandomDiceNumber1.toString();
    p2DiceRoll2 = p2RandomDiceNumber2.toString();
    p1ChoiceMade = "";
    p2ChoiceMade = 1;
    myOutputValue = `Welcome Player 2! <br> You've rolled a ${p2RandomDiceNumber1} and a ${p2RandomDiceNumber2}. <br><br> Type in 'a' if you want the order of your dice rolls to be ${p2RandomDiceNumber1}${p2RandomDiceNumber2}. <br><br> Type in 'b' if you want the order of your dice rolls to be ${p2RandomDiceNumber2}${p2RandomDiceNumber1}.`;
    return myOutputValue;
  }

  // if player 2 selects order to be: dice roll 1, dice roll 2
  if (p2ChoiceMade == 1 && input == "a") {
    player2CombinedDiceNum = p2DiceRoll1 + p2DiceRoll2;
    console.log("p2 combined num");
    console.log(player2CombinedDiceNum);
    gameEnd = 1;
    inputPlayerTurn = 3;
    myOutputValue = `You have chosen to go with <b>${player2CombinedDiceNum}</b>. <br> Hit submit to see who won!`;
    return myOutputValue;
  }

  // if player 2 selects order to be: dice roll 2, dice roll 1
  if (p2ChoiceMade == 1 && input == "b") {
    player2CombinedDiceNum = p2DiceRoll2 + p2DiceRoll1;
    console.log("p2 combined num");
    console.log(player2CombinedDiceNum);
    gameEnd = 1;
    inputPlayerTurn = 3;
    myOutputValue = `You have chosen to go with <b>${player2CombinedDiceNum}</b>. <br> Now let's see who won!`;
    return myOutputValue;
  }

  // game ends when both players have chosen the order of their dice rolls
  if (gameEnd == 1) {
    console.log("player 1 combined num");
    console.log(player1CombinedDiceNum);
    console.log("player 2 combined num");
    console.log(player2CombinedDiceNum);

    // if player 1's combined number > player 2's -> player 1 wins
    if (Number(player1CombinedDiceNum) > Number(player2CombinedDiceNum)) {
      inputPlayerTurn = "";
      myOutputValue = `Congratulations Player 1, you won! <br> Your score was <b>${player1CombinedDiceNum}</b>, Player 2's score was <b>${player2CombinedDiceNum}</b>. <br><br> Click submit to restart the game. Player 1 goes first again!`;
      return myOutputValue;
    }
    // if player 2's combined number > player 1's -> player 2 wins
    if (Number(player2CombinedDiceNum) > Number(player1CombinedDiceNum)) {
      inputPlayerTurn = "";
      myOutputValue = `Congratulations Player 2, you won! <br> Your score was <b>${player2CombinedDiceNum}</b>, Player 1's score was <b>${player1CombinedDiceNum}</b>. <br><br> Click submit to restart the game. Player 1 goes first again!`;
      return myOutputValue;
    }
  }
  return myOutputValue;
};
