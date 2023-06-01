// modes with decimal places are for Auto Mode
// mode  0        = usernames
// mode  1        = number of dice
// mode 2         = choosing between Manual or Auto modes
// modes 2.5, 4.5 = generate Players' dice rolls
// modes 3.5, 5.5 = generate Players' largest number
// modes 3,4,6,7  = Players' rolls and selections
// modes 5,8      = selection confirmation
// mode 9         = results
// mode 10         = restart game

var numberOfDice = 0;
var playerNames = ["Player 1", "Player 2"];
var tempNumbers = [];
var playerNumbers = [0, 0];
var playerTotal = [0, 0];
var player1Wins = 0;
var player2Wins = 0;
var mode = 0;
var increment = 0;
var gameMode = `normal`;
var manAuto = "";

//-------Helper Functions--------
//-------RNG--------
function diceRoll() {
  return Math.floor(Math.random() * 6) + 1;
}
//-------RNG--------

//-------Leaderboard--------
function leaderboard() {
  var leader = [];
  var leadOutput = `<br><br><b>${playerNames[0]} is the Leader🏆</b>`;
  for (i = 0; i < playerNames.length; i++) {
    leader.push(playerNames[i] + ":  " + playerTotal[i] + "<br>");
  }
  if (playerTotal[1] > playerTotal[0]) {
    leadOutput = `<br><br><b>${playerNames[1]} is the Leader🏆</b>`;
  }
  if (playerTotal[1] == playerTotal[0]) {
    leadOutput = `<br><br>There is currently no Leader.`;
  }
  return leader.join(" ") + leadOutput;
}
//-------Leader--------

//-----Greatest Number-----
function greatestNumber() {
  var comGreatest = 0;
  var numCheck = tempNumbers;
  numCheck.sort();
  for (var i = numCheck.length - 1; i >= 0; i--) {
    comGreatest = comGreatest + Math.pow(10, i) * numCheck[i];
  }
  return comGreatest;
}
//-----Greatest Number-----

//-----Dice Emojis-----
function diceEmojis() {
  var dicePics = [];
  for (d = 0; d < numberOfDice; d++) {
    dicePics.push("🎲");
  }
  return dicePics;
}
//-------Helper Functions--------

//-------Mode 0 or New Game--------
function usernames(playerInput) {
  output = "";
  if (increment < 2) {
    if (playerInput.trim() == "") {
      output = `Input <strong>Player ${
        increment + 1
      }'s</strong> name to continue.`;
    } else if (Number(playerInput)) {
      output = `Hmm.. Using a name with only numbers might be cofusing..😕<br>
            Maybe try something else?`;
    } else {
      playerNames[increment] = playerInput;
      output = `Hello <strong>${playerNames[increment]}</strong> 🙂`;
      increment++;
    }
  }
  if (increment == 2 || mode == `New Game`) {
    mode = 1;
    increment = 0;
    console.log(mode);
    output = `Hello <strong>${playerNames[1]}</strong> and <strong>${playerNames[0]}</strong>🙂.<br> How many dice would you like to play with?`;
  }
  console.log(mode);
  return output;
}
//-------Mode 0 or New Game--------

//-------Mode 1--------
function numberOfRolls(playerInput) {
  numberOfDice = playerInput;
  if (mode === 1) {
    if (!Number(playerInput)) {
      console.log(mode);
      return `That's not a number...<br>How many dice would you like to play with?`;
    }
    if (playerInput < 2) {
      console.log(mode);
      return `You have to play with at least 2 dice🎲🎲`;
    }
    mode++;
    console.log(mode);
    return `Nice! We'll play with ${numberOfDice} dice${diceEmojis()}<br><br>
          Now, would you like to play in <b>Manual Mode</b> or <b>Auto Mode</b>?<br><br>In <b>Manual Mode</b> you'll to use your rolled digits to create your own greatest number.<br><br>In <b>Auto Mode</b>, I'll generate your greatest number for you. 🙂<br><br>Type in <b>"Manual"</b> or <b>"Auto"</b> to make your choice`;
  }
}
//-------Mode 1--------

//-------Mode 2--------
function manualOrAuto(playerInput) {
  var p1Roll = `<br><b>${
    playerNames[0]
  }</b>, go ahead and roll your dice.${diceEmojis()}`;

  if (playerInput.toLowerCase().trim() == "auto") {
    manAuto = "auto";
    mode = 2.5;
    return `Nice! I'll generate your numbers for you.${p1Roll}`;
  } else if (playerInput.toLowerCase().trim() == "manual") {
    manAuto = "manual";
    mode = 3;
    console.log(mode);
    return `Nice! You choose your own destiny.${p1Roll}`;
  } else {
    return `Sorry I don't understand...😕<br>Please type in either "Manual" or "Auto" to start your game.`;
  }
}
//-------Mode 2--------

//-------Mode 2.5 and Mode 4.5--------
function autoRoll() {
  console.log(mode);
  if (mode === 2.5 || mode === 4.5) {
    if (tempNumbers == 0) {
      for (i = 0; i < numberOfDice; i++) {
        tempNumbers.push(diceRoll());
      }
    }
    if (tempNumbers != 0) {
      if (mode === 2.5) {
        increment = 0;
        mode = 3.5;
      }
      if (mode === 4.5) {
        increment = 1;
        mode = 5.5;
      }
    }
    console.log(mode);
    console.log(tempNumbers);
    return `<strong>${playerNames[increment]}'s</strong> numbers are ${tempNumbers}.<br>Press Enter to generate your greatest possible number.`;
  }
}

//-------Mode 3.5 and Mode 5.5--------
function autoNumbers() {
  if (mode === 3.5 || mode === 5.5) {
    console.log(mode);
    var output1 = `Using the numbers ${tempNumbers},<br><b>${playerNames[increment]}'s</b> greatest number is<br>`;
    playerNumbers[increment] = playerNumbers[increment] + greatestNumber();
    tempNumbers = [];
    var output2 = `<b>${playerNumbers[increment]}</><br><br>`;
    var output3 = ``;
    if (mode === 3.5) {
      increment = 0;
      output3 = `Press Enter to pass the dice to <b>${playerNames[1]}</b>`;
      mode += 1;
    }
    if (mode === 5.5) {
      increment = 1;
      output3 = `Press Enter to move on to the results</b>`;
      mode = 9;
    }
  }
  return output1 + output2 + output3;
}
//-------Mode 3.5 and Mode 5.5--------

//-------Modes 3,4,6,7--------
function playerRolls(playerInput) {
  if (mode === 3 || mode === 6) {
    if (tempNumbers == 0) {
      for (i = 0; i < numberOfDice; i++) {
        tempNumbers.push(diceRoll());
      }
    }
    if (tempNumbers != 0) {
      mode++;
      console.log(mode);
      console.log(tempNumbers);
      return `<strong>${playerNames[increment]}'s</strong> numbers are ${tempNumbers}.<br>Type in your biggest number.`;
    }
  }
  if (mode === 4 || mode === 7) {
    var comGreatest = 0;
    var playerGreatest = 0;
    if (playerInput.length != numberOfDice) {
      return `That's not the right number of digits...<br>Your answer must only include the digits ${tempNumbers}.`;
    }
    if (playerInput.length == numberOfDice) {
      var inputCheck = [];
      var numCheck = tempNumbers;
      numCheck.sort();
      for (var j = 0; j < playerInput.length; j++) {
        console.log(`playerInput is ` + Number(playerInput));
        inputCheck.push(Number(playerInput[j]));
        inputCheck.sort();
      }
      for (var i = numCheck.length - 1; i >= 0; i--) {
        comGreatest = comGreatest + Math.pow(10, i) * numCheck[i];
        playerGreatest = playerGreatest + Math.pow(10, i) * inputCheck[i];
        console.log(`comGreatest is ` + comGreatest);
        console.log(`playerGreatest is ` + playerGreatest);
      }
      if (comGreatest !== playerGreatest) {
        return `You cant enter ${playerInput}.<br>Your answer must only include the digits ${tempNumbers}.`;
      }
    }
    if (comGreatest < playerGreatest) {
      return `Your input of ${playerInput} is way too big.<br>Your answer must only include the digits ${tempNumbers}.`;
    }
    if (comGreatest >= playerGreatest) {
      console.log(increment);
      console.log(playerNumbers[increment]);
      console.log(comGreatest);
      console.log(playerGreatest);
      playerNumbers[increment] =
        Number(playerInput) + Number(playerNumbers[increment]);

      if (increment === 0) {
        console.log;
        console.log(`current player number is ${playerNumbers[increment]}`);
        console.log(`player input as an integer is ${Number(playerInput)}`);
        console.log(mode);
        var output = `Type "Yes" to pass the dice to ${playerNames[1]}.`;
      } else {
        output = `Type "Yes" to move on to the results.`;
      }
    }
    console.log(`playerNumbers are ${playerNumbers}`);
    mode++;
    var finalOutput = `You have entered <strong>${playerInput}</strong>. Is this  your final answer?<br>${output}<br>Type "No" to try again.`;
    console.log(mode);
    console.log(increment);
    return finalOutput;
  }
}
//-------Modes 3,4,6,7--------

//-------Modes 5,8--------
function movingOn(playerInput) {
  if (mode === 5 || mode === 8) {
    if (playerInput.toLowerCase() === "no") {
      mode--;
      playerNumbers[increment] = 0;
      console.log(mode);
      console.log(`increment is ${increment}`);
      return `Try again using the digits ${tempNumbers}`;
    }

    if (playerInput.toLowerCase() === "yes") {
      mode++;
      tempNumbers = [];
      if (increment === 0) {
        increment++;
        console.log(mode);
        console.log(`increment is ${increment}`);
        return `I'll pass the dice to <strong>Player 2</strong> now.<br>
              <strong>${playerNames[1]}</strong>, click "Roll" to get your numbers.`;
      }
      if (increment === 1) {
        increment = 0;
        console.log(mode);
        console.log(`increment is ${increment}`);
        return `We'll move on to the results now.<br>Click "Roll" to find out who won.`;
      }
    }
    if (
      playerInput.toLowerCase() !== "yes" ||
      playerInput.toLowerCase() !== "no"
    ) {
      console.log(mode);
      return `Sorry I don't understand..<br>
              You have entered <strong>${playerNumbers[increment]}</strong>. Is this  your final answer?<br><br>Type "Yes" to move on to the next stage.<br>Type "No" to try again.`;
    }
  }
}
//-------Modes 5,8--------

//-------Modes 9,10--------
function results() {
  if (mode === 9) {
    var result = `🎊<b>${playerNames[0]} WINS!</b>🎊`;
    console.log(playerTotal);
    console.log(playerNumbers);
    playerTotal[0] = playerTotal[0] + Number(playerNumbers[0]);
    playerTotal[1] = playerTotal[1] + Number(playerNumbers[1]);
    console.log(playerTotal);
    var leader = `<u>TOTAL SCORES</u><br>
                <b>${playerNames[0]}:  ${playerTotal[0]}     🏆LEADER🏆</b><br>
                ${playerNames[1]}:  ${playerTotal[1]}`;
    if (playerTotal[1] > playerTotal[0]) {
      leader = `<u>TOTAL SCORES</u><br>
              <b>${playerNames[1]}:  ${playerTotal[1]}     🏆LEADER🏆</b><br>
              ${playerNames[0]}:  ${playerTotal[0]}`;
    }
    if (playerNumbers[0] > playerNumbers[1]) {
      player1Wins++;
    } else {
      player2Wins++;
      result = `🎊<b>${playerNames[1]} WINS!</b>🎊`;
    }
    var stats = `<br><br><u>Stats<u>:<br><b>${playerNames[0]}</b> wins: <b>${player1Wins}</b><br>
              <br><b>${playerNames[1]}</b> wins: <b>${player2Wins}</b><br><br>`;
    mode++;
    return `<b>${playerNames[0]}</b> rolled <b>${playerNumbers[0]}</b>.<br>
        <b>${playerNames[1]}</b> rolled <b>${playerNumbers[1]}</b>.<br><br>
        ${result}${stats}${leader}`;
  }
  if (mode === 10) {
    playerNumbers = [0, 0];
    mode = `New Game`;
    console.log(mode);
    return `If you would like to play another round with the same Players, click the Roll button. You can choose how many dice you want to play with next round.<br>If you want to play with different players, refresh this page. 🙂`;
  }
}
//-------Modes 8,9--------

//-------MAIN FUNCTION--------
var main = function (input) {
  if (mode === 0 || mode === `New Game`) {
    return usernames(input);
  }

  if (mode === 1) {
    return numberOfRolls(input);
  }

  if (mode === 2) {
    return manualOrAuto(input);
  }

  if (mode === 2.5 || mode === 4.5) {
    return autoRoll();
  }

  if (mode === 3.5 || mode === 5.5) {
    return autoNumbers();
  }

  if (mode > 2 && mode < 8 && mode !== 5) {
    return playerRolls(input);
  }

  if (mode === 5 || mode === 8) {
    return movingOn(input);
  }

  if (mode === 9 || mode === 10) {
    return results();
  }
};
//-------MAIN FUNCTION--------
