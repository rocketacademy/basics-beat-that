var players = 0;
var playerNum = 0;
playerArray = [];
console.log(playerArray);
var playerResult = [];
var score = [];
var playerWinOrder = []
var numOfDice = 0;
var step = 0;
var round = 0;
var displayPlayer = []
var displayScore = []
var workingScore = []
var mode = 0
var modeName = 0
var diceOutput = 0
var numString = ""

var main = function (input) {
  if (input == "reset"){
  playerNum = 0;
  playerArray = [];
  playerResult = [];
  step = 0;
  diceOutput = 0
  console.log("players: " + players);
  console.log("playerArray: " + playerArray);
    for (var counter = 0; counter < players; counter += 1) {
      //create the Arrays
      playerArray.push(generateDiceArray(numOfDice));
      playerResult.push(0);
    }
  console.log("A " + playerArray);
  console.log("B " + playerResult);
  console.log("C " + score)
  return "Next round starting, press submit to continue"
  }

  //check input is a number
  if (Number.isNaN(Number(input)) == true) {
    return 'sorry please enter a number.';
  }

  if (input == 0 && players == 0) {
    return "Player count : 0 <br> Please enter number of Players";
  } else if (input > 0 && players == 0) {
    players = input; //Store number of players
    return "Please select game mode <br> 1: Normal <br> 2: lower number wins"
  } else if (input > 0 && mode == 0){
    if (input == 1){
      mode = 1
      modeName = "Normal"
      return"Normal mode selected <br>Please enter number of dices "
    }else if (input == 2){
      mode = 2
      modeName = "Reversed"
      return "Reversed mode selected, lower number wins <br> Please enter number of dices"
    }else {
      return "Please select game mode <br> 1: Normal <br> 2: lower number wins"
    }
  } else if (input > 0 && numOfDice == 0){
    numOfDice = input
    console.log("players: " + players);
    console.log("playerArray: " + playerArray);
    for (var counter = 0; counter < players; counter += 1) {
      //create the Arrays
      playerArray.push(generateDiceArray(numOfDice));
      playerResult.push(0);
      score.push(0);
    }
    console.log("A " + playerArray);
    console.log("B " + playerResult);
    console.log("C " + score)
    return "Number of Players: " + players + "<br>Mode: "+modeName +"<br>Number of Dice: "+numOfDice+"<br> Player 1 starts, press submit to begin"
  }

  // Loop to display dice result and select order and input into result array
  while (playerNum < players) {
    if (playerResult[playerNum] == 0 && step == 0) {
      //var dice1 = playerArray[playerNum][0];
      //var dice2 = playerArray[playerNum][1];
      diceOutput = "Hello Player " + (playerNum + 1) +"<br> Your Dice rolls are "
      for (var counter = 0;counter < numOfDice; counter+=1){
        diceOutput = diceOutput + "<br> Dice "+(counter+1)+" : "+playerArray[playerNum][counter]
      }
      step = step + 1;
      inputArray = []
      return (
        diceOutput + "<br> Player " + (playerNum+1)+ " Please choose order of dice"
      );
    } else if (step == 1 && input <= numOfDice && input != 0) {
      while ((inputArray.length) != numOfDice){
        if (inputArray.indexOf(input) != -1){
          return "Dice already chosen, please choose other dice<br>Dice already chosen: " + inputArray +"<br><br>" +diceOutput + "<br> Player " + (playerNum+1)+ " Please choose next order of dice"    // check if Dice already chose
        }else if(inputArray.length == 0){
          inputArray.push(input)
          numString = String(playerArray[playerNum][input-1])
          console.log("NumString A " + numString)
          console.log("String(playerArray[playerNum][input]) "+String(playerArray[playerNum][input-1]))
        }else{
        inputArray.push(input)
        numString = String(numString) + String(playerArray[playerNum][input-1])
        console.log("NumString B" + numString)
        console.log("String(playerArray[playerNum][input]) "+String(playerArray[playerNum][input-1]))
        }
        if (inputArray.length == numOfDice){
          break
        }
        return "Dice chosen: " + inputArray +"<br><br>" +diceOutput + "<br> Player " + (playerNum+1)+ " Please choose next order of dice"
      }
      playerResult[playerNum] = Number(numString)
      // if (input > 0) {
      //   playerResult[playerNum] = Number(
      //     String(playerArray[playerNum][0]) + String(playerArray[playerNum][1])
      //   );
      //   console.log("C " + playerResult);
      //   step = 0;
      // } else if (input == 2) {
      //   playerResult[playerNum] = Number(
      //     String(playerArray[playerNum][1]) + String(playerArray[playerNum][0])
      //   );
      //   console.log("D " + playerResult);
      //   step = 0;
      // } else {
      //   return "Please enter 1 or 2";
      // }
      score[playerNum] = score[playerNum] + playerResult[playerNum];
      step =0
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
  // playerNum = 0;
  // playerArray = [];
  // playerResult = [];

  // for (var counter = 0; counter < players; counter += 1) {
  //   playerArray.push(generateDiceArray(numOfDice));
  //   playerResult.push(0);
  // }
  
  //Take Score array, and add player number next to it
  displayScore = []
  displayPlayer = []
  workingScore = []
  workingPlayer = []
  for (var x = 0; x < score.length; x+= 1){
    workingScore.push(score[x])
    workingPlayer.push(x+1)
  }
  
  if (mode == 1){
    while(displayPlayer.length != players){
      workingScore.sort((a,b) => a-b)
      var highestNum = workingScore.pop()
      displayScore.push(highestNum)
      displayPlayer.push(score.indexOf(highestNum)+1)
    }
  } else if (mode == 2){
    while(displayPlayer.length != players){
      workingScore.sort((a,b) => b-a)
      var lowestNum = workingScore.pop()
      displayScore.push(lowestNum)
      displayPlayer.push(score.indexOf(lowestNum)+1)
    }
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
  //Recreate arrays

  return (
    scoreOutput +
    "<br><br>" +
    output +
    "<br>Player " +
    (playerWin + 1) +
    " is in the Lead! <br> Enter 'reset' to play again"
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
