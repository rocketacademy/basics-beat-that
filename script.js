/*There are 2 players and players take turns.

When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.

The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.

After both players have rolled and chosen dice order, the player with the higher combined number wins.

Keep score for each player. The score is the running sum of all numbers that player has generated so far. This means there is no permanent winner, only a temporary leader.*/

//generate empty arrays to store dice values
var player1List = [];
var player2List = [];

//array to store all combined numbers
var player1Score = [];
var player2Score = [];

//add up total scores
var player1ScoreSum = 0;
var player2ScoreSum = 0;

//num of wins
var player1Wins = 0;
var player2Wins = 0;

//default game mode start w player 1
currentGameMode = `player 1 roll dice`;

//keep track of player's numbers
var player1Num;
var player2Num;

//generate random number 1-6
var rollDice = function () {
  var playerRollDice = Math.floor(Math.random() * 6) + 1;
  return playerRollDice.toString();
};

var beatThat = function (input) {
  //start with player 1 rolling dice
  if (currentGameMode == `player 1 roll dice`) {
    //add rolled dice to player 1 array
    var dice1 = rollDice();
    var dice2 = rollDice();
    player1List[0] = dice1;
    player1List[1] = dice2;
    console.log(player1List);

    currentGameMode = `player 1 choose dice order`;
    return `Welcome Player 1. <br><br> You rolled ${dice1} for Dice 1 and ${dice2} for Dice 2. <br><br> Please input 1 or 2 to choose the order of the dice`;

    //switch to player 1 choosing dice order to make combined number
  } else if (currentGameMode == `player 1 choose dice order`) {
    if (input == 1) {
      player1Num = player1List[0].toString() + player1List[1].toString();
      player1Score.push(player1Num);
    } else if (input == 2) {
      player1Num = player1List[1].toString() + player1List[0].toString();
      player1Score.push(player1Num);
    }
    player1ScoreSum += Number(player1Num);
    console.log(`player 1 number is ${player1Num}`);

    currentGameMode = `player 2 roll dice`;
    return `Player 1 chose Dice ${input} first. <br><br> Your number is ${player1Num}. <br><br> Player 2, please click submit to roll the dice.`;

    //switch to player 2 rolling dice mode
  } else if (currentGameMode == `player 2 roll dice`) {
    //add 2 rolled dice to player 2 array
    var dice1 = rollDice();
    var dice2 = rollDice();
    player2List[0] = dice1;
    player2List[1] = dice2;
    console.log(player2List);

    currentGameMode = "player 2 choose dice order";
    return `Welcome Player 2. <br><br> You rolled ${player2List[0]} for Dice 1 and ${player2List[1]} for Dice 2. <br><br> Please input 1 or 2 to choose the order of the dice`;

    //swtich to player 2 choosing dice order for combined number
  } else if (currentGameMode == `player 2 choose dice order`) {
    if (input == 1) {
      var player2Num = player2List[0].toString() + player2List[1].toString();
      player2Score.push(player2Num);
    } else if (input == 2) {
      var player2Num = player2List[1].toString() + player2List[0].toString();
      player2Score.push(player2Num);
    }

    player2ScoreSum += Number(player2Num);
    console.log(`player 2 number is ${player2Num}`);
    currentGameMode = `compare numbers`;
    return `Player 2 chose Dice ${input} first. <br><br> Your number is ${player2Num}. <br><br> Click submit to see who wins`;

    //compare player 1 number and player 2 number
    //scenario : player 1 wins
  } else if (currentGameMode == `compare numbers`) {
    var player1Num = player1Score[player1Score.length - 1];
    var player2Num = player2Score[player2Score.length - 1];

    console.log(`player 1 list is ${player1List}`);
    console.log(`player 2 list is ${player2List}`);

    console.log(`player 1 list of scores is ${player1Score}`);
    console.log(`player 2 list of scores is ${player2Score}`);

    //reset game mode
    currentGameMode = `player 1 roll dice`;
    if (Number(player1Num) > Number(player2Num)) {
      player1Wins += 1;
      return `Player 1 wins! <br><br> Player 1's number is ${player1Num} and Player 2's number is ${player2Num}. <br><br> Player 1 has won ${player1Wins} times with a total score of ${player1ScoreSum} <br><br> Click submit to play again`;

      //scenario : when its a draw
    } else if (Number(player1Num) == Number(player2Num)) {
      return `Its a draw! <br><br> Player 1's number is ${player1Num} and Player 2's number is ${player2Num}. <br><br> Click submit to play again`;

      //scenario : player 2 wins
    } else {
      player2Wins += 1;
      return `Player 2 wins! <br><br> Player 1's number is ${player1Num} and Player 2's number is ${player2Num}. <br><br> Player 2 has won ${player2Wins} times with a total score of ${player2ScoreSum} <br><br> Click submit to play again`;
    }
  }
};

var main = function (input) {
  var myOutputValue = beatThat(input);
  return myOutputValue;
};
