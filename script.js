var players = [
  ["player1", 0],
  ["player2", 0],
];
var count = 1;
var dice1 = 0;
var dice2 = 0;
var index = 0;

//Random integer < 6
var rollDice = function () {
  return Math.floor(Math.random() * 6);
};

//Add 2 numbers in the right order according to the user's choice
var resultNumber = function (choice, firstDice, secondDice) {
  if (choice == 1) {
    var finalNumber = firstDice.toString() + secondDice.toString();
    return finalNumber;
  } else if (choice == 2) {
    var finalNumber = secondDice.toString() + firstDice.toString();
    return finalNumber;
  }
};

var main = function (input) {
  if (input != "Result") {
    while (index < players.length) {
      if (count == 1) {
        console.log(players);
        dice1 = rollDice();
        dice2 = rollDice();
        count += 1;
        return `Welcome ${players[index][0]}.<br>You rolled ${dice1} for Dice 1 and ${dice2} for Dice 2.<br>Choose the order of the dice.`;
      } else if (count == 2) {
        //&& index < players.length - 1
        playerResult = resultNumber(input, dice1, dice2);
        players.push([players[index][0], parseInt(playerResult)]);

        count = 1;
        index += 1;
        return `${
          players[index - 1][0]
        }, you chose Dice ${input} first.<br>Your number is ${
          players[index - 1][1]
        }.<br>It is now ${players[index][0]} turn.`;
      }
      // if (players[0] > players[1]) {
      //   return `End of the game,${players[0]} wins`;
      // } else {
      //   return `End of the game,${players[1]} wins`;
      // }
    }
  } else {
    players.sort((a, b) => b[1] - a[1]);

    console.table(players);
    console.log(index);

    var result = "";
    for (counter = 0; counter < players.length; counter += 1) {
      result =
        result +
        players[counter][0] +
        "   " +
        players[counter][1].toString() +
        "<br>";
    }
    return `Current score :<br>${result}`;
  }
};
