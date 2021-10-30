var player = 1;
var mode = "result of dice";
var rollDiceMode = "roll dice";
// var orderOfDice = "dice order"
var dice1 = "";
var dice2 = "";
var winner = [];
var cumulativeScore = [0, 0];

//if input==1, dice1 then dice2
//if input==2, dice2 then dice1

var main = function (input) {
  if (mode == "determine winner") {
    // winner = [44, 44];
    mode = "result of dice";
    if (winner[0] > winner[1]) {
      return (
        "Player 1 got " +
        winner[0] +
        ", Player 2 got " +
        winner[1] +
        ", Player 1 Wins this round. <br><br> CUMULATIVE SCORES<br>Player 1 - " +
        cumulativeScore[0] +
        "<br>Player 2 - " +
        cumulativeScore[1]
      );
    }
    if (winner[1] > winner[0]) {
      return (
        "Player 1 got " +
        winner[0] +
        ", Player 2 got " +
        winner[1] +
        ", Player 2 Wins this round. <br><br> CUMULATIVE SCORES<br>Player 1 - " +
        cumulativeScore[0] +
        "<br>Player 2 - " +
        cumulativeScore[1]
      );
    }
    if (winner[0] == winner[1]) {
      return (
        "Player 1 got " +
        winner[0] +
        ", Player 2 got " +
        winner[1] +
        ", what were the odds of that happening?! Go buy 4D!"
      );
    }

    //in my array which one biiger that player is winner.
    //if p1score > p2score, p1 win
    //if p2score > p1score p2 win
  } else if (player == 1) {
    winner = [];
    if (mode == "result of dice") {
      dice1 = rollDice();
      dice2 = rollDice();
      console.log(dice1 + "dice1");
      console.log(dice2 + "dice2");
      mode = "order of dice";
      return (
        "Hi Player 1, your dice numbers were " +
        dice1 +
        " and " +
        dice2 +
        ". <br>Please enter '1' or '2' to input the order of your dice to make the biggest number"
      );
    } else if (mode == "order of dice") {
      player = 2;
      mode = "result of dice";
      if (input == "1") {
        var str = String(dice1) + String(dice2);
        var num = Number(str);
        winner.push(num);
        cumulativeScore[0] = cumulativeScore[0] + num;
        return "Your number is " + num + ".";
      } else if (input == "2") {
        var str = String(dice2) + String(dice1);
        var num = Number(str);
        winner.push(num);
        cumulativeScore[0] = cumulativeScore[0] + num;
        return "Your number is " + num + ".";
      }
    }
  } else if (player == 2) {
    if (mode == "result of dice") {
      dice1 = rollDice();
      dice2 = rollDice();
      console.log(dice1 + "dice1");
      console.log(dice2 + "dice2");
      mode = "order of dice";
      return (
        "Hi Player 2, your dice numbers were " +
        dice1 +
        " and " +
        dice2 +
        ". <br>Please enter '1' or '2' to input the order of your dice to make the biggest number"
      );
    } else if (mode == "order of dice") {
      //adjusted back to player1 so that can keep playing - restarts game
      player = 1;
      mode = "determine winner";
      if (input == "1") {
        var str = String(dice1) + String(dice2);
        var num = Number(str);
        winner.push(num);
        cumulativeScore[1] = cumulativeScore[1] + num;
        return "Your number is " + num + ".";
      } else if (input == "2") {
        var str = String(dice2) + String(dice1);
        var num = Number(str);
        winner.push(num);
        cumulativeScore[1] = cumulativeScore[1] + num;
        return "Your number is " + num + ".";
      }
    }
  }
};

var rollDice = function () {
  // Generate a decimal from 0 through 6, inclusive of 0 and exclusive of 6.
  var randomDecimal = Math.random() * 6;

  // Remove the decimal with the floor operation.
  // This will be an integer from 0 to 5 inclusive.
  var randomInteger = Math.floor(randomDecimal);

  // Add 1 to get valid dice rolls of 1 through 6 inclusive.
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

//Add the string for cumulative score later
