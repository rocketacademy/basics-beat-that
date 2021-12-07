// const SCRIPT = `Welcome Player ${playernum}.
// You rolled ${dicevalue1} for Dice 1 and ${dicevalue2} for Dice 2.
// Choose the order of the dice.`;

var numberofplayers = 2;
var numberofdice = 2;
var currentGameMode = "dice roll";
var dicevalue = [];
var gameplay = "Highest Combined Number";
var playerscore = [];

var rollmsg = "";
var playerstate = 1;

// creating a new object - player and their values
// maybe object does not work
const player = new Object();

// creat function that shows the score they got
// var players = function (dicevalue) {
//   for (let i = 0; i < numberofplayers; i++) {
//     // const element = array[index];

//     playerscore[i] = dicevalue
//   return ;
// };

// auto load
var autoload = function (dicevalue) {
  var output = "";
  dicevalue.forEach((element) => {
    var elementstr = "" + element;
    output = output + elementstr;
  });
  // var selecteddice = dicevalue1 > dicevalue2 ? 1 : 2;
  // var one = "" + dicevalue1;
  // var two = "" + dicevalue2;
  // var output = selecteddice == 1 ? Number(one + two) : Number(two + one);
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

// find out if the rolled dices are the same - 2 dice
var ditto = function (dicevalue) {
  var output =
    dicevalue[0] == dicevalue[1]
      ? `Your number is ${dicevalue[0]}${dicevalue[1]}`
      : `You rolled ${dicevalue[0]} for Dice 1 and ${dicevalue[1]} for Dice 2.`;
  // console.log(dicevalue);
  return output;
};

//dice values into array
var rolleddice = function () {
  for (let i = 0; i < numberofdice; i += 1) {
    dicevalue.push(diceRoll());
    rollmsg = rollmsg + `You rolled ${dicevalue[0]} for Dice ${i + 1}. `;
  }
  // console.log(dicevalue);
  return rollmsg;
};

// rolling dice values
var diceRoll = function () {
  return Math.floor(Math.random() * 6 + 1);
};

//concatinate the dice values - 2 dices
var concatinate = function (dicevalue, selecteddice) {
  var one = "" + dicevalue[0];
  var two = "" + dicevalue[1];
  var output = selecteddice == 1 ? Number(one + two) : Number(two + one);
  return output;
};

// find the winner or winners from the game via array scores
var scorecard = function (arr) {
  // const max = Math.max(...arr);
  const max = Math.max.apply(null, arr);
  const indexes = [];
  for (let index = 0; index < arr.length; index++) {
    if (arr[index === max]) {
      indexes.push(index);
    }
  }
  // const index = arr.indexof(max);
  return indexes;
};

var main = function (input) {
  // var myOutputValue = 'hello world';
  myOutputValue = "";
  //dice roll to produce dicevalue array, roll msg
  if (currentGameMode == "dice roll") {
    // get player score as array within array
    for (let i = 0; i < numberofplayers; i++) {
      // var dicevalue = [];
      myOutputValue = myOutputValue + `Welcome Player ${i + 1}<br>`;
      myOutputValue = myOutputValue + rolleddice(); //creates msg and dicevalue arr
      console.log(dicevalue);
      console.log(dicevalue.length);
      console.log(playerscore);
      console.log(playerscore.length);
      playerscore[i] = dicevalue;
      if (numberofdice == 2) {
        myOutputValue = `Welcome Player ${i + 1}<br>` + ditto(playerscore[i]);
        myOutputValue = myOutputValue + `<br>Choose order of the dice.`;
      }
    }
    // console.log(playerscore);
    currentGameMode = "compare roll";
  }

  return myOutputValue;
};
