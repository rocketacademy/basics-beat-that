var numberofplayers = 2;
var numberofdice = 2;
var currentGameMode = "input values";
var gameplay = "Highest Combined Number";
var playerscore = [];

var players = [];
var currentplayer = 1;

// auto load concat from array
var autoload = function (dicevalue) {
  var output = "";
  dicevalue.forEach((element) => {
    var elementstr = "" + element;
    output = output + elementstr;
  });
  return Number(output);
};

//sort dice values desc
var sortdown = function (points) {
  return points.sort(function (a, b) {
    return b - a;
  });
};

//sort dice values asc
var sortup = function (points) {
  return points.sort(function (a, b) {
    return a - b;
  });
};

//dice values into array
var rolleddice = function (numberofdice) {
  var dicevalue = [];
  for (let i = 0; i < numberofdice; i += 1) {
    dicevalue.push(diceRoll());
    // rollmsg = rollmsg + `You rolled ${dicevalue[i]} for Dice ${i + 1}. `;
  }
  return dicevalue;
};

// find out if the rolled dices are the same - 2 dice
var ditto = function (dicevalue) {
  var output =
    dicevalue[0] == dicevalue[1]
      ? `Your number is ${dicevalue[0]}${dicevalue[1]}`
      : `You rolled ${dicevalue[0]} for Dice 1 and ${dicevalue[1]} for Dice 2.`;
  // console.log(dicevalue);
  return output;
};

// rolling dice values
function diceRoll() {
  return Math.floor(Math.random() * 6 + 1);
}

//concatinate the dice values - 2 dices
var concatinate = function (dicevalue, selecteddice) {
  var one = "" + dicevalue[0];
  var two = "" + dicevalue[1];
  var output = selecteddice == 1 ? Number(one + two) : Number(two + one);
  return output;
};

// find the winner or winners from the game via array scores only using the index of the array returned
// var scorecard = function (arr) {
//   // const max = Math.max(...arr);
//   const max = Math.max.apply(null, arr);
//   const indexes = [];
//   for (let index = 0; index < arr.length; index++) {
//     if (arr[index === max]) {
//       indexes.push(index);
//     }
//   }
//   // const index = arr.indexof(max);
//   return indexes;
// };

var main = function (input) {
  myOutputValue = "";

  if (!isNaN(input) && input != "" && currentGameMode == "input values") {
    var inputSplit = input.split("");

    if (inputSplit.length == 3 && (inputSplit[2] == 1 || inputSplit[2] == 2)) {
      numberofplayers = inputSplit[0];
      numberofdice = inputSplit[1];
      gameplay =
        inputSplit[2] == 1
          ? "Highest Combined Number"
          : "Lowest Combined Number";
      // Create object players
      for (let i = 0; i < numberofplayers; i++) {
        players.push({ player: i + 1, dice: 0, score: [] });
      }
      currentGameMode = "dice roll";
      myOutputValue = `You chose ${inputSplit[0]} players, ${inputSplit[1]} dices for a ${gameplay} game<br>`;
    } else {
      myOutputValue = `Please input correct values without spacing: players,dice,gameplay<br>Gameplay:<br>1 - Highest Combined Number<br>2 - Lowest Combine Number<br>`;
    }
  } else if (
    (input === "" || isNaN(input)) &&
    currentGameMode == "input values"
  ) {
    myOutputValue = `Please input numbered values`;
  } else if (
    currentGameMode == "dice roll" &&
    currentplayer <= numberofplayers
  ) {
    // sequence and value of each dice
    var tempDiceValues = rolleddice(numberofdice);
    if (gameplay == "Highest Combined Number") {
      sortdown(tempDiceValues);
    } else if (gameplay == "Lowest Combined Number") {
      sortup(tempDiceValues);
    }
    // values based on game loaded
    var numbervalue = autoload(tempDiceValues);
    // players.find((x) => x.player == currentplayer).dice.push(tempDiceValues);
    players.find((x) => x.player == currentplayer).dice += numbervalue;
    players.find((x) => x.player == currentplayer).score.push(numbervalue);
    console.log(players);
    myOutputValue = `Player ${currentplayer} got ${tempDiceValues} with a score of ${numbervalue}<br>`;
    // to prevent STP
    currentplayer += 1;
    if (currentplayer > numberofplayers && input != "quit") {
      currentplayer = 1;
      myOutputValue += `<br>You can quit by typing 'quit' or continue..<br>`;
    } else if (currentplayer > numberofplayers && input == "quit") {
      currentGameMode = "end";
    }
  } else {
    myOutputValue = `Game Over<br>`;
  }

  // output values visual
  const score = players.map((x) => {
    return x.dice;
  });
  for (let i = 0; i < score.length; i++) {
    myOutputValue += `<br>Player ${i + 1}: ${score[i]}`;
  }
  if (gameplay == "Highest Combined Number") {
    var win = Math.max.apply(null, score);
  } else if (gameplay == "Lowest Combined Number") {
    var win = Math.min.apply(null, score);
  }
  const winner = players.find((x) => {
    return x.dice == win;
  });
  myOutputValue =
    myOutputValue + `<br><br>The current leader is Player ${winner.player}`;

  console.log(win);
  console.log(winner);
  console.log(score);
  return myOutputValue;
};

// checks if the array contains the element
// const includestwo = items.includes(2)

// cumulatively operation for the elements in an Array
// const total = itesm.reduce((currenttotal, item) => {
//   return item.price + currenttotal
// }, 0)

// checks the array for a cumulative boolean value
// const itemexpensive = items.every((item) => {
//   return item.price <= 100
// })

// checks the array for a boolean value
// const itemexpensive = items.some((item) => {
//   return item.price <= 100
// })

// does a function for each element in an Array
// items.foreach((item) => {
//   console.log(item.price)
// })

// find returns the first item in the array
// const foundItem = item.find((item) => {
//   return item.name === 'Album'
// })

// filter produces all that matches the said function
// const filteredItems = items.filter((item) => {
//   return item.price <= 100
// })

// bring out the values using key
// const itemNames = items.map((item) => {
//   return item.name
// })
