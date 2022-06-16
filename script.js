//Project 2: Beat that!
//1. There are 2 players and players take turns.
//2. When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
//3. The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
//4. After both players have rolled and chosen dice order, the player with the higher combined number wins.

//Comfortable
//HTML and CSS styling (done)

//More Comfortable
//1. Scoring (done)
//2. Leaderboard (done)
//3. Lowest-Combined Mode (done)
//4. Auto-generated combination (done)
//5. Varied number of players (done)
//6. Varied number of dice (done)
//7. Knockout (not started)

var numOfPlayers = 0;
var numOfDice = 0;
var gameMode = "Set-up"
var currentPlayer = 1
var playerRolls = []
var playerScore = []
var winner = 0;
const selection = "Please choose your mode. Key in the number to select what you mode you want to play \n\n1. Highest Combined \n2. Lowest Combined"
//mode control
var main = function (input) {
  var myOutputValue;
  switch (gameMode) {
    case "Set-up":
      setUp()
      myOutputValue = `This is ${numOfPlayers} players game. Each player will roll ${numOfDice} dice. Press play to continue.`;
      gameMode = "Select Mode"
      break;
    case "Select Mode":
      modeDisplay();
      myOutputValue = `You have choosen ${gameMode}. Player ${currentPlayer} click play button to play`
      break;
    case "Highest Combined Mode":
      myOutputValue = gameStart()
      break;
    case "Lowest Combined Mode":
      myOutputValue = gameStart()
      break;
  }
  return myOutputValue;
};
//Random dice roll
var randomDiceRoll = function(){
  return (Math.floor(Math.random() * 6) + 1)
}
//Set-up
var setUp = function(){
  do{
    numOfPlayers = Number(prompt("How many players are playing?", ""))
  } while(isNaN(numOfPlayers) == true && Number.isInteger(numOfPlayers) == false || numOfPlayers == "" || numOfPlayers == 1)
  do{
    numOfDice = Number(prompt("How dice are we rolling?", ""))
  } while(isNaN(numOfDice) == true && Number.isInteger(numOfDice) == false || numOfDice == "" || numOfDice == 1)
  //Initialise player's score
  for(let i = 0; i < numOfPlayers; i++)
  {
    playerScore.push([i, 0])
  }
  console.table(playerScore)
}
//Display modes
var modeDisplay = function(){
  let userChoice = Number(prompt(selection, ""));
  while(userChoice != 1 && userChoice != 2)
  {
    userChoice = Number(prompt(selection, ""));
  }
  if(userChoice == 1)
   gameMode = "Highest Combined Mode"
  else
   gameMode = "Lowest Combined Mode"
}
//Main game function
var gameStart = function(){
  let playerDiceRoll = []
  var outputNum = "";
  var output = ""
  for(let i = 0; i < numOfDice; i++)
  { 
    var output;
    let diceRoll = randomDiceRoll();
    output += `Dice ${i + 1} rolled ${diceRoll} <br>`;
    playerDiceRoll.push(diceRoll);
  }
  playerDiceRoll.sort((a,b) => a - b);
  if(gameMode == "Lowest Combined Mode")
  {
    for(let j = 0; j < playerDiceRoll.length; j++)
    {
      outputNum += playerDiceRoll[j].toString()
   }
   output = output + `<br>Player ${currentPlayer} your number is ${outputNum}. `
  }
  if(gameMode == "Highest Combined Mode")
  {
    for(let j = playerDiceRoll.length; j > 0; j--)
    {
      outputNum += playerDiceRoll[j-1].toString()
    }
    output = output + `<br>Player ${currentPlayer} your number is ${outputNum}. `
  }
  playerRolls.push([currentPlayer, outputNum])
  if(currentPlayer == numOfPlayers){
    output += winCondition()
    gameMode = "Select Mode"
    return output;
  }
  currentPlayer++;
  output = output + `Player ${currentPlayer} click play button to play`
  return output
}
//sorting function
function sortIncreasingOrder(a, b) {
  if (a[1] === b[1]) {
      return 0;
  }
  else {
      return (a[1] < b[1]) ? -1 : 1;
  }
}
//winCondition
var winCondition = function(){
  var output = "";
  playerRolls.sort(sortIncreasingOrder); //Sorting rolls in increasing order
  if(gameMode == "Lowest Combined Mode")
   winner = playerRolls[0][0]
  else if(gameMode == "Highest Combined Mode")
   winner = playerRolls[playerRolls.length-1][0]
  playerScore[winner - 1][1] += 1;
  output += `Player ${winner} wins. Click play button to replay. <br><br><br>${leaderboard()}`
  reset();
  return output;
}
//reset function
var reset = function()
{
  gameMode = "Select Mode"
  currentPlayer = 1;
  playerRolls = []
}
//Leaderboard function
var leaderboard = function()
{
  var ranking = []
  var output = ""
  //copy playerScore array to ranking array
  ranking = playerScore.slice(0)
  ranking.sort(sortIncreasingOrder)
  for(i = ranking.length; i > 0; i--)
  {
    output += `${i}. Player ${ranking[i-1][0] + 1}'s Score: ${ranking[i-1][1]}<br>`
  }
  return output
}