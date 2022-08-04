var gameTurn = 'start'
var arrPlayer1Score = [];
var player1Score = 0;
var arrPlayer2 = [];




var main = function (input) {
  var myOutputValue = '';
  if (gameTurn == 'start') {
    gameTurn = 'player1'
    return "Enter the number of dices"    
  }

  if (gameTurn == 'player1') {
    gameTurn = 'player2'
    arrPlayer1Score = playGame(input);
    player1Score = convertNum(arrPlayer1Score);
  }
  


  return arrPlayer1Score;
};


var playGame = function (input) {
  var arrInput = [];
  var i = 0;
  while (i < input) {
    arrInput.push(diceRoll());
    i += 1;
  }
  arrSortScore = arrInput.sort(function(a, b){return b-a});
  return arrSortScore;
}

var convertNum = function (arrInput) {
  var concatString = ''
  var i = 0;
  while (i < arrInput.length) {
    console.log(arrInput[i]);
    concatString += String(arrInput[i]);
    i += 1;
  }
  return Number(concatString);
}



var diceRoll = function () {
  return Math.ceil(Math.random() * 6);
};

