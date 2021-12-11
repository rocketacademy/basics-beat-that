// 2 players: player 1 and player 2
// 3 game modes:
// dice roll: is to click submit & show dice rolls.
// dice order: is to input order of dice & show combined number.
// show result: is to show which player wins

user = "Player 1";
gameMode = "dice roll";
diceThrowsP1 = [];
diceThrowsP2 = [];
combinedThrows = [];

var main = function (input) {
  var myOutputValue = "";
  // P1 throwing dice
  if (user == "Player 1" && gameMode == "dice roll") {
    var randomDice1 = getRandomDice();
    var randomDice2 = getRandomDice();
    var showDiceRoll = `${user} threw 2 dices. <br> Specifically, <br> Dice 1: ${randomDice1} <br> Dice 2: ${randomDice2} <br> Now, please select which dice should come first: <br> "1" or "2" `;
    gameMode = "dice order";
    diceThrowsP1.push(randomDice1);
    diceThrowsP1.push(randomDice2);
    return showDiceRoll;
  }
  // P1 choosing dice
  if (user == "Player 1" && gameMode == "dice order") {
    // check if input is a number
    if (Number.isNaN(Number(input)) == true) {
      var indicateError = `Please enter a number.`;
      return indicateError;
    }
    // check if input is 1 or 2
    if (Number(input) < 1 || Number(input) > 2) {
      var redirectResponse = `Please indicate "1" or "2".`;
      return redirectResponse;
    }
    // go ahead with dice order, and switch to player 2, and switch gameMode back to dice roll
    else {
      if (Number(input) == 1) {
        console.log(diceThrowsP1[0]);
        console.log(diceThrowsP1[1]);
        var combinedNumP1 = "" + diceThrowsP1[0] + diceThrowsP1[1];
        console.log(combinedNumP1);
        var combinedNumberP1 = `${user}, you chose dice 1 first. Your combined number is ${combinedNumP1}. it's now player 2's turn.`;
        combinedThrows.push(combinedNumP1);
        user = "Player 2";
        gameMode = "dice roll";
        return combinedNumberP1;
      }
      if (Number(input) == 2) {
        var combinedNumP1 = "" + diceThrowsP1[1] + diceThrowsP1[0];
        var combinedNumberP1 = `${user}, you chose dice 1 first.Your combined number is ${combinedNumP1}. it's now player 2's turn.`;
        combinedThrows.push(combinedNumP1);
        user = "Player 2";
        gameMode = "dice roll";
        return combinedNumberP1;
      }
    }
  }
  // P2 throwing dice
  if (user == "Player 2" && gameMode == "dice roll") {
    var randomDice1 = getRandomDice();
    var randomDice2 = getRandomDice();
    var showDiceRoll = `${user} threw 2 dices. <br> Specifically, <br> Dice 1: ${randomDice1} <br> Dice 2: ${randomDice2} <br> Now, please select which dice should come first: <br> "1" or "2" `;
    gameMode = "dice order";
    diceThrowsP2.push(randomDice1);
    diceThrowsP2.push(randomDice2);
    return showDiceRoll;
  }
  // P2 choosing dice
  if (user == "Player 2" && gameMode == "dice order") {
    // check if input is a number
    if (Number.isNaN(Number(input)) == true) {
      var indicateError = `Please enter a number.`;
      return indicateError;
    }
    // check if input is 1 or 2
    if (Number(input) !== 1 && Number(input) !== 2) {
      var redirectResponse = `Please indicate "1" or "2".`;
      return redirectResponse;
    }
    // go ahead with dice order, and switch gameMode to show result
    else {
      if (Number(input) == 1) {
        var combinedNumP2 = "" + diceThrowsP2[0] + diceThrowsP2[1];
        var combinedNumberP2 = `${user}, you chose dice 1 first. Your combined number is ${combinedNumP2}. let's see the results now. click "submit".`;
        combinedThrows.push(combinedNumP2);
        gameMode = "show result";
        console.log(gameMode);
        return combinedNumberP2;
      }
      if (Number(input) == 2) {
        var combinedNumP2 = "" + diceThrowsP2[1] + diceThrowsP2[0];
        var combinedNumberP2 = `${user}, you chose dice 2 first.Your combined number is ${combinedNumP2}. let's see the results now. click "submit".`;
        combinedThrows.push(combinedNumP2);
        gameMode = "show result";
        console.log(gameMode);
        return combinedNumberP2;
      }
    }
  }
  // show results. 3 possibilities: Player 1 wins, Player 2 wns, draw.
  if (gameMode == "show result") {
    var P1score = combinedThrows[0];
    var P2score = combinedThrows[1];
    if (Number(P1score) > Number(P2score)) {
      var result = `Since Player 1 scored ${P1score} and Player 2 scored ${P2score}, Player 1 wins!🏆 `;
    } else if (Number(P2score) > Number(P1score)) {
      var result = `Since Player 1 scored ${P1score} and Player 2 scored ${P2score}, Player 2 wins!🏆 `;
    } else if (Number(P1score) == Number(P2score)) {
      var result = `Since Player 1 scored ${P1score} and Player 2 scored ${P2score}, it is a draw! `;
    }
    return result;
  }
  return myOutputValue;
};

// random dice function
var getRandomDice = function () {
  // get random decimal between 0 to 1, multiplied by 6.
  var randomDecimal = Math.random() * 6;
  // get lowest integer then add 1 so that random integer is from 1 to 6.
  var randomInteger = Math.floor(randomDecimal) + 1;
  return randomInteger;
};
