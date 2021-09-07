//global Var
var counter = 0;
var gamestate = 0;
var player1Name = "";
var player2Name = "";
var playerName = [];
var gameMode = "Knockout";
var playerThrew = 1;
var dice1 = 0;
var dice2 = 0;
var dice3 = 0;
var dice4 = 0;
var autodice = [];
var autodice2 = [];
var player1Result = 0;
var player2Result = 0;
var player1Score = 0;
var player2Score = 0;
var winningMethod = "high";
var noOfPlayer = "";
var noOfDice = 0;
var allNumber = [];
var possibleWinningNumber = 0;
var index = 0;
var counterIndex = 0;
var scoring = [];
var counterchallenger = 1;
var counterPlayer = 0;
var realNumber = 0;
var winningIndex = 0;
var winningStage = 0;
var winningNumber = 0;
var winningFinal = 0;
var counterLastWinning = 0;
var extraNumber = 0;
//random number
var randomDice = function () {
  var diceRandom = Math.random() * 6;
  var diceIntergal = Math.floor(diceRandom) + 1;
  return diceIntergal;
};
//game selection
var userManualSelection = function (randomNo1, randomNo2, input) {
  if (input == "low") {
    winningMethod = "low";
    return "Current mode have change to <b>low</b>";
  }
  if (input == "high") {
    winningMethod = "high";
    return "Current mode have change to <b>high</b>";
  }
  var string1Number = "";
  var string2Number = "";
  if (playerThrew == 1) {
    playerThrew = 2;
    dice1 = randomNo1;
    dice2 = randomNo2;

    return `Welcome ${player1Name}<br> You have rolled <b>${dice1} </b>for dice 1 and <b>${dice2} </b>for dice 2<br> choose the order of your dice:<b> select "1" for dice 1 or <br>select "2" for dice 2</b> `;
  }
  if (playerThrew == 2 && input == 1) {
    playerThrew = 3;
    string1Number = dice1.toString();
    string2Number = dice2.toString();
    player1Result = Number(string1Number + string2Number);

    return `${player1Name} have choose dice 1 so the number will be <b>${player1Result}</b><br>${player2Name}, <br> Please press submit button to roll the dice`;
  } else if (playerThrew == 2 && input == 2) {
    playerThrew = 3;
    string1Number = dice1.toString();
    string2Number = dice2.toString();
    player1Result = Number(string2Number + string1Number);

    return `${player1Name} have choose dice 2 so the number will be <b>${player1Result}</b><br>${player2Name}, <br> Please press submit button to roll the dice`;
  }
  if (playerThrew == 3) {
    playerThrew = 4;
    dice3 = randomNo1;
    dice4 = randomNo2;
    return `Welcome ${player2Name}<br> You have rolled <b>${dice3} </b>for dice 1 and <b>${dice4}</b> for dice 2<br> choose the order of your dice: <b> select "1" for dice 1 or <br>select "2" for dice 2</b> `;
  }
  if (playerThrew == 4 && input == 1) {
    playerThrew = 5;
    var string3Number = dice3.toString();
    var string4Number = dice4.toString();
    player2Result = Number(string3Number + string4Number);
    return `${player2Name} have choose dice 1 so the number will be <b>${player2Result}</b><br>${player2Name}, <br> Please press submit button to see who win`;
  } else if (playerThrew == 4 && input == 2) {
    playerThrew = 5;
    var string3Number = dice3.toString();
    var string4Number = dice4.toString();
    player2Result = Number(string4Number + string3Number);
    return `${player2Name} have choose dice 2 so the number will be <b>${player2Result}</b><br>${player2Name}, <br> Please press submit button to see who win.`;
  }
  if (playerThrew == 5 && player1Result > player2Result) {
    playerThrew = 1;
    if (winningMethod == "high") {
      player1Score = player1Score + 1;
      var result = leaderBoard();
      return `${player1Name} number is<b> ${player1Result} </b>while ${player2Name} number is <b>${player2Result}</b><br><b>${player1Name} Win</b><br><br> ${player1Name}, Please press submit to start the dice rolling<br><br><b>${result}</b>`;
    } else if (winningMethod == "low") {
      player2Score = player2Score + 1;
      var result = leaderBoard();
      return `${player1Name} number is<b> ${player1Result} </b>while ${player2Name} number is <b>${player2Result}</b><br><b>${player2Name} Win</b><br><br> ${player1Name}, Please press submit to start the dice rolling<br><br><b>${result}</b>`;
    }
  } else if (playerThrew == 5 && player2Result > player1Result) {
    playerThrew = 1;
    if ((winningMethod = "high")) {
      player2Score = player2Score + 1;
      var result = leaderBoard();
      return `${player1Name} number is<b> ${player1Result} </b>while ${player2Name} number is<b> ${player2Result}</b><br><b>${player2Name} Win</b><br><br> ${player2Name}, Please press submit to start the dice rolling<br><br><b>${result}</b>`;
    } else if (winningMethod == "low") {
      player1Score = player1Score + 1;
      var result = leaderBoard();
      return `${player1Name} number is<b> ${player1Result} </b>while ${player2Name} number is <b>${player2Result}</b><br><b>${player1Name} Win</b><br><br> ${player1Name}, Please press submit to start the dice rolling<br><br><b>${result}</b>`;
    }
  } else if (playerThrew == 5 && player2Result == player1Result) {
    playerThrew = 1;
    var result = leaderBoard();
    return `${player1Name} number is<b> ${player1Result} </b>while ${player2Name} number is<b> ${player2Result}</b><br><b>It a draw</b><br><br> ${player2Name}, Please press submit to start the dice rolling<br><br><b>${result}</b>`;
  }
  return `Please key in '1' for dice 1 or '2' for dice 2`;
};
var userAutoSelection = function (randomNo1, input) {
  if (input == "low" && winningMethod == "high") {
    winningMethod = "low";
    possibleWinningNumber = 0;
    playerThrew = 1;
    return `Current mode have change to <b>low</b>, <br> Press Submit to re-roll the dice`;
  }
  if (input == "high" && winningMethod == "low") {
    winningMethod = "high";
    possibleWinningNumber = 0;
    playerThrew = 1;
    return `Current mode have change to <b>high</b>, <br> Press Submit to re-roll the dice`;
  }
  if (playerThrew == 1) {
    possibleWinningNumber = 0;
    allNumber = [];
    counterIndex = 0;
  }
  if (playerThrew <= noOfPlayer) {
    autodice = [];

    while (counter < noOfDice) {
      randomNo1 = randomDice();
      counter += 1;
      autodice.push(randomNo1);
    }

    if (winningMethod == "high") {
      autodice.sort(function (a, b) {
        return b - a;
      });
    }
    if (winningMethod == "low") {
      autodice.sort(function (a, b) {
        return a - b;
      });
    }
    counter = 0;
    console.log(winningMethod);
    playerResult = autodice.toString();
    var number1 = "";

    while (counter < noOfDice) {
      number1 = number1 + autodice[counter];
      counter = counter + 1;
    }

    playerThrew = playerThrew + 1;
    realNumber = Number(number1);
    console.log("before if max");
    if (possibleWinningNumber < realNumber && winningMethod == "high") {
      possibleWinningNumber = realNumber;
      index = counterIndex;
      console.log("high", possibleWinningNumber);
      console.log("index", index);
    }
    if (winningMethod == "low") {
      if (possibleWinningNumber == 0) {
        possibleWinningNumber = realNumber;
        index = counterIndex;
      }
      if (possibleWinningNumber >= realNumber && possibleWinningNumber != 0) {
        possibleWinningNumber = realNumber;
        index = counterIndex;
        console.log("low", possibleWinningNumber);
        console.log("index", index);
      }
    }
    counterIndex = counterIndex + 1;
    allNumber.push(realNumber);
    console.log(allNumber);

    return `${playerName[playerThrew - 2]} number is ${realNumber};`;
  }

  if (playerThrew > noOfPlayer) {
    playerThrew = 1;
    scoring[index] = scoring[index] + 1;
    leaderBoardResult = leaderBoard();
    return `winner is ${playerName[index]} and ${possibleWinningNumber} and ${leaderBoardResult}`;
  }
};
//Knockout Mode
var userKnockOutSelection = function (randomNo1, input) {
  console.log("knock out)");
  if (input == "low" && winningMethod == "high") {
    winningMethod = "low";
    possibleWinningNumber = 0;
    playerThrew = 1;
    counterIndex = 0;
    allNumber = [];
    counterPlayer = 0;
    counterLastWinning = 0;

    winningIndex = 0;

    return `Current mode have change to <b>low</b>, <br> Press Submit to re-roll the dice`;
  }
  if (input == "high" && winningMethod == "low") {
    winningMethod = "high";
    possibleWinningNumber = 0;
    playerThrew = 1;
    counterIndex = 0;
    allNumber = [];
    counterPlayer = 0;
    counterLastWinning = 0;

    winningIndex = 0;
    return `Current mode have change to <b>high</b>, <br> Press Submit to re-roll the dice`;
  }
  if (playerThrew == 1) {
    possibleWinningNumber = 0;
    allNumber = [];
  }
  if (playerThrew <= noOfPlayer) {
    autodice = [];

    if (counterPlayer < 2) {
      console.log("counterPlayer", counterPlayer);
      while (counter < noOfDice) {
        randomNo1 = randomDice();
        counter += 1;
        autodice.push(randomNo1);
      }

      if (winningMethod == "high") {
        autodice.sort(function (a, b) {
          return b - a;
        });
      }
      if (winningMethod == "low") {
        autodice.sort(function (a, b) {
          return a - b;
        });
      }
      counter = 0;
      console.log(winningMethod);
      playerResult = autodice.toString();
      var number1 = "";

      while (counter < noOfDice) {
        number1 = number1 + autodice[counter];
        counter = counter + 1;
      }

      realNumber = Number(number1);
      console.log("before if max");

      if (winningMethod == "high") {
        if (possibleWinningNumber <= realNumber) {
          if (possibleWinningNumber == realNumber) {
            extraNumber = possibleWinningNumber;
            console.log(extraNumber, "extraNumber");
          } else {
            possibleWinningNumber = realNumber;
            index = counterIndex;
            console.log("high", possibleWinningNumber);
            console.log("index", index);
          }
        }
      }
      if (winningMethod == "low") {
        if (possibleWinningNumber == 0) {
          possibleWinningNumber = realNumber;
          index = counterIndex;
          console.log(index, "when possible number =0");
        } else if (possibleWinningNumber >= realNumber) {
          if (possibleWinningNumber == realNumber) {
            extraNumber = realNumber;
            console.log(extraNumber, "extraNumber");
          } else {
            possibleWinningNumber = realNumber;
            index = counterIndex;
            console.log(index, "when possible number !=0");
          }
        }
      }

      counterPlayer = counterPlayer + 1;

      allNumber.push(realNumber);

      if (winningStage == 0) {
        if (playerThrew == 1) {
          playerThrew = playerThrew + 1;
          winningStage = 1;
          counterIndex = counterIndex + 1;
          console.log("stage1");

          return `${playerName[playerThrew - 2]} number is ${realNumber}`;
        }
        if (playerThrew != 1) {
          winningStage = 1;
          counterIndex = counterLastWinning;
          console.log("stage1");
          return `${playerName[winningIndex]} number is ${realNumber}`;
        }
      }
      if (winningStage == 1) {
        winningStage = 0;
        playerThrew = playerThrew + 1;
        counterIndex = counterIndex + 1;
        console.log("stage2");
        console.log(playerName);

        return `${playerName[playerThrew - 2]} number is ${realNumber}`;
      }
    }
  }
  if (counterPlayer == 2) {
    console.log(extraNumber, "extraNumber");
    console.log(possibleWinningNumber, "Possible Winning Number");
    if (playerThrew <= noOfPlayer) {
      if (possibleWinningNumber != extraNumber) {
        counterPlayer = 0;
        counterLastWinning = counterIndex;
        counterIndex = index;
        winningIndex = index;
        winningNumber = possibleWinningNumber;
        possibleWinningNumber = 0;
        extraNumber = 0;
        allNumber = [];
        return `${
          playerName[winningIndex]
        } Win, <b>The Winning number is ${winningNumber}<br><br> ${
          playerName[winningIndex]
        }, Please throw again to continue challenger ${
          playerName[playerThrew - 1]
        }`;
      } else {
        counterPlayer = 0;
        counterLastWinning = 0;
        counterIndex = 0;
        winningIndex = 0;
        playerThrew = playerThrew - 1;
        winningNumber = possibleWinningNumber;
        possibleWinningNumber = 0;
        extraNumber = 0;
        allNumber = [];
        return ` <b>It's a draw</b>, please throw again`;
      }
    }

    if (playerThrew > noOfPlayer) {
      if (possibleWinningNumber != extraNumber) {
        winningIndex = index;
        scoring[winningIndex] = scoring[winningIndex] + 1;
        playerThrew = 1;
        counterPlayer = 0;
        console.log("winningindex", winningIndex);
        winningNumber = possibleWinningNumber;

        possibleWinningNumber = 0;
        allNumber = [];
        counterIndex = 0;
        leaderBoardResult = leaderBoard();
        return `winner is ${playerName[winningIndex]} and ${winningNumber} and ${leaderBoardResult}`;
      } else {
        counterPlayer = 0;

        possibleWinningNumber = 0;
        extraNumber = 0;
        allNumber = [];
        playerThrew = playerThrew - 1;
        return ` <b>It's a draw</b>, please throw again`;
      }
    }
  }
};
var leaderBoard = function () {
  var resultoutput = "<br>";
  counter = 0;
  console.log("before while");
  var scoringResult = scoring;
  console.log(scoringResult, "scoringResult");

  while (counter < noOfPlayer) {
    resultoutput =
      resultoutput +
      playerName[counter] +
      "'s score : " +
      scoring[counter] +
      "<br>";
    console.log("result");
    counter += 1;
  }
  return resultoutput;
};
var main = function (input) {
  var randomNumber1 = randomDice();
  if (gamestate == 0) {
    if (input == "" || isNaN(input)) {
      return `Please key in number of players`;
      // if (input == "" && gamestate == 0) {
      //   return "Player 1, Please input your name.";
    }
    noOfPlayer = input;
    gamestate = 1;
    return `There are total of ${noOfPlayer} player, <br>Please Key in your Name`;
  }

  if (input == "" && gamestate == 1 && counter < noOfPlayer) {
    return `Please key in your name`;
  }
  if (input != "" && gamestate == 1) {
    if (gamestate == 1 && counter < noOfPlayer - 1) {
      counter = counter + 1;
      var name = input;
      var nameOfAllPlayer = playerName.push(input);
      scoring.push(0);
      return `Player${nameOfAllPlayer} = ${name}<br><br> Key in next player Name<br><br>`;
    } else {
      counter = counter + 1;
      scoring.push(0);

      var name = input;
      var nameOfAllPlayer = playerName.push(input);
      counter = 0;
      gamestate = 2;
      return `Welcome all players <br><b>${playerName}<br><br>Please select the number of dices you want to throw at the time`;
    }
  }

  if (gamestate == 2) {
    if (input == "" || isNaN(input)) {
      return `Please key the number of dices you want to play`;
    }
    noOfDice = input;
    gamestate = 3;
    return `You will throw ${noOfDice} dices at one time<br>There are 4 mode:<b> high and low mode & Auto and Knockout mode.<br> high(default)</b>: Highest number win <br> <b>low</b>: Lowest number win<br><br> <br> Auto(default)</b>: All Players will throw dice together in 1 game <br> <b>Knockout</b>: 1st 2 player will start 1st, while loser out and replace by 3rd player and so on<br><br>Let the game start rolling<br>`;
  }

  //   if (gameMode == "Normal" && gamestate == 2) {
  //     return userManualSelection(randomNumber1, randomNumber2, input);
  //   }
  if (gameMode == "Auto" && gamestate == 3) {
    if (input == "Knockout") {
      gameMode = "Knockout";
      return `Game mode will now change to Knockout mode`;
    }
    counter = 0;
    return userAutoSelection(randomNumber1, input);
  }
  if (gameMode == "Knockout" && gamestate == 3) {
    if (input == "Auto") {
      gameMode = "Auto";
      return `Game mode will now change to Auto mode`;
    }
    counter = 0;
    return userKnockOutSelection(randomNumber1, input);
  }
};
