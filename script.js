var players = 0;
var playerNum = 0;
var playerArray = [];
console.log(playerArray);
var playerResult = [];
var score = [];
var playerWinOrder = []
var numOfDice = 2;
var step = 0;
var round = 0;
var displayPlayer = []
var displayScore = []
var workingScore = []

var main = function (input) {
  if (input == 0 && players == 0) {
    return "Player count : 0 <br> Please enter number of Players";
  } else if (input > 0 && players == 0) {
    players = input; //Store number of players
    console.log("players: " + players);
    console.log("playerArray: " + playerArray);
    for (var counter = 0; counter < players; counter += 1) {
      //create the Arrays
      playerArray.push(generateDiceArray(numOfDice));
      playerResult.push(0);
      score.push(0);
      playerWinOrder.push(0)
    }
    console.log("A " + playerArray);
    console.log("B " + playerResult);
  }

  // Loop to display dice result and select order and input into result array
  while (playerNum < players) {
    if (playerResult[playerNum] == 0 && step == 0) {
      console.log(playerArray[0]);
      console.log(playerArray[1]);
      console.log(playerArray.length);
      var dice1 = playerArray[playerNum][0];
      var dice2 = playerArray[playerNum][1];
      step = step + 1;
      return (
        "Hello Player " +
        (playerNum + 1) +
        "<br> You rolled " +
        dice1 +
        " for Dice 1 and " +
        dice2 +
        " for Dice 2 <br> Choose order of the dice"
      );
    } else if (step == 1) {
      if (input == 1) {
        playerResult[playerNum] = Number(
          String(playerArray[playerNum][0]) + String(playerArray[playerNum][1])
        );
        console.log("C " + playerResult);
        step = 0;
      } else if (input == 2) {
        playerResult[playerNum] = Number(
          String(playerArray[playerNum][1]) + String(playerArray[playerNum][0])
        );
        console.log("D " + playerResult);
        step = 0;
      } else {
        return "Please enter 1 or 2";
      }
      score[playerNum] = score[playerNum] + playerResult[playerNum];
    }
    playerNum = playerNum + 1;
  }

  //Output Result
  console.log("Math.max " + Math.max(...score));
  playerWin = score.indexOf(Math.max(...score)); // Player number -1
  var output = "";
  for (var counter = 0; counter < players; counter += 1) {
    output =
      output +
      "Player " +
      (counter + 1) +
      " selected " +
      playerResult[counter] +
      "<br>";
  }
  //Reset the variables at the end of every round and recreate dice roll and reset result
  playerNum = 0;
  playerArray = [];
  playerResult = [];

  for (var counter = 0; counter < players; counter += 1) {
    playerArray.push(generateDiceArray(numOfDice));
    playerResult.push(0);
  }
  
  //Take Score array, and add player number next to it
  displayScore = []
  displayPlayer = []
  workingScore = []
  workingPlayer = []
  for (var x = 0; x < score.length; x+= 1){
    workingScore.push(score[x])
    workingPlayer.push(x+1)
  }
  
  while(displayPlayer.length != players){
    workingScore.sort((a,b) => a-b)
    var highestNum = workingScore.pop()
    displayScore.push(highestNum)
    displayPlayer.push(score.indexOf(highestNum)+1)
  }



  //Total Score Output
  var scoreOutput = "";
  for (var counter = 0; counter < players; counter += 1) {
    scoreOutput =
      scoreOutput +
      "Total score of player " +
      displayPlayer[counter] +
      " is " +
      displayScore[counter] +
      "<br>";
  }

  return (
    scoreOutput +
    "<br><br>" +
    output +
    "<br>Player " +
    (playerWin + 1) +
    " is in the Lead! <br> Press submit to play again"
  );
};

// Function to roll 2 dice and return as array of length 2
var generateDiceArray = function (numofDice) {
  var diceArray = [];
  for (var counter = 0; counter < numofDice; counter += 1) {
    randNum = Math.floor(Math.random() * 6 + 1);
    diceArray.push(randNum);
  }
  console.log(diceArray);
  return diceArray;
};
