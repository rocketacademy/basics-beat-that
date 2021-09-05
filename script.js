var gameStep = "inputNumberPlayers";
var listPlayerNames = [];
var listPlayersOptimal = [];
var diceNumbersThrown = [];
var sortedDiceNumbers = [];
var numberOfPlayers = 0;
var numberOfDices = 0;
var playerTurn = 0;
var counter = 0;

var main = function (input) {
  // this step is to choose number of players
  if (gameStep == "inputNumberPlayers") {
    var setNumberPlayers = settingNumberPlayers(input);
    return setNumberPlayers;
  }
  // this step is to set the names for all the players
  if (gameStep == "inputPlayersName" && input != "") {
    var setPlayersNames = settingPlayerNames(input);
    return setPlayersNames;
  }
  if (gameStep == "inputNumberDices") {
    var setNumberDices = settingNumberDices(input);
    return setNumberDices;
  }
  if (gameStep == "diceThrowing") {
    return diceThrows(numberOfDices);
  }
  if (gameStep == "compareResults") {
    return resultsTime(listPlayersOptimal, listPlayerNames);
  }
  return `Why like that?! Spoil the game sia...`;
};

var settingNumberPlayers = function (input) {
  numberOfPlayers = Number(input);
  if (
    (input =
      "" || isNaN(numberOfPlayers) == true || Number(numberOfPlayers) == 0)
  ) {
    return `Walao! Read the instructions leh. Please key in a number can.`;
  }
  gameStep = "inputPlayersName";
  console.log("gameStep1");
  console.log(gameStep);
  console.log("numberOfPlayers");
  console.log(numberOfPlayers);
  return `You have chosen ${numberOfPlayers} players. Now Player 1, please type in your name.`;
};

var settingPlayerNames = function (input) {
  while (counter < numberOfPlayers - 1) {
    listPlayerNames.push(input.bold());
    counter += 1;
    console.log("counter");
    console.log(counter);
    console.log("gameStep2");
    console.log(gameStep);
    console.log("listPlayerNames");
    console.log(listPlayerNames);
    return `Player ${counter} name is ${input.bold()}. <br><br> List of names so far: ${listPlayerNames}.<br><br> Player ${
      counter + 1
    }, it's your turn to key in your name.`;
  }
  // to let the players know all players have set their names, now its time to start the game. Anymore keying of names will throw an error
  if (counter == numberOfPlayers - 1) {
    counter += 1;
    listPlayerNames.push(input.bold());
    console.log("counter");
    console.log(counter);
    console.log("gameStep2");
    console.log(gameStep);
    gameStep = "inputNumberDices";
    return `Final player ${counter} name is ${input.bold()}. <br><br> List of names so far: ${listPlayerNames}.<br><br> Steady lah, everyone set their names liao. Now choose how many dices you all want to throw.`;
  }
};

var settingNumberDices = function (input) {
  numberOfDices = Number(input);
  if (
    (input = "" || isNaN(numberOfDices) == true || Number(numberOfDices) == 0)
  ) {
    return `Walao! Read the instructions leh. Please key in a number can. No zero horh.`;
  }
  console.log("gameStep3");
  console.log(gameStep);
  gameStep = "diceThrowing";
  console.log("numberOfDices");
  console.log(numberOfDices);
  return `You have chosen ${numberOfDices} dices. Now ${listPlayerNames[0]}, please throw your dice(s).`;
};

var diceThrows = function (numberOfDices) {
  diceNumbersThrown = [];
  console.log("gameStep4");
  console.log(gameStep);
  if (playerTurn < numberOfPlayers) {
    playerTurn += 1;
    for (i = 0; i < numberOfDices; i++) {
      var rollingDice = diceRoll();
      diceNumbersThrown.push(rollingDice);
      console.log("diceNumbersThrown");
      console.log(diceNumbersThrown);
    }
    for (var i of diceNumbersThrown) {
      sortedDiceNumbers.push(i);
    }
    counter = 0;
    sortedDiceNumbers.sort();
    console.log("sortedDiceNumbers");
    console.log(sortedDiceNumbers);
    var createOptimalValue = "";
    while (counter < numberOfDices) {
      createOptimalValue = createOptimalValue + String(sortedDiceNumbers.pop());
      counter += 1;
      console.log("createOptimalValue");
      console.log(createOptimalValue);
    }
    console.log("createOptimalValue");
    console.log(createOptimalValue);
    listPlayersOptimal.push(Number(createOptimalValue));
    console.log("listPlayersOptimal");
    console.log(listPlayersOptimal);
    return `${
      listPlayerNames[playerTurn - 1]
    } dice numbers thrown were ${diceNumbersThrown} and your optimal value is ${createOptimalValue}!`;
  }
  gameStep = "compareResults";
  return `Now, let's see who is the winner!!`;
};

var resultsTime = function (listPlayersOptimal, listPlayerNames) {
  var highestOptimal = Math.max(...listPlayersOptimal);
  console.log("highestOptimal");
  console.log(highestOptimal);
  var highestOptimalIndex = listPlayersOptimal.indexOf(highestOptimal);
  return `The winner is ${listPlayerNames[highestOptimalIndex]} with a score of ${highestOptimal}. Here =0-re the optimal numbers for every player...<br><br> ${listPlayerNames}<b0-r>${listPlayersOptimal} <br><br> To replay the game, please refresh the page!`;
};

// dice throw of values 1-6
var diceRoll = function () {
  // random number between 0-1 then multiple by 3
  var randomDecimal = Math.random() * 6;
  // rounding down the value to the nearest integer
  var randomInteger = Math.floor(randomDecimal);
  // creating a range from 1-3
  var finalThrow = randomInteger + 1;
  return finalThrow;
};
