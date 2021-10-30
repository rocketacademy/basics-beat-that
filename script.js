/*There are 2 players and players take turns.

When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.

The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.

After both players have rolled and chosen dice order, the player with the higher combined number wins.*/

//generate empty arrays to store dice values
var player1List = [];
var player2List = [];

//num of wins
var player1Wins = 0;
var player2Wins = 0;

//default game mode start w player 1
currentGameMode = `player 1 roll dice`;

//generate random number 1-6
var rollDice = function () {
  return Math.floor(Math.random() * 6) + 1;
};

var beatThat = function (input) {
  //start with player 1 rolling dice
  if (currentGameMode == `player 1 roll dice`) {
    //add rolled dice to player 1 array
    var dice1 = rollDice();
    var dice2 = rollDice();
    player1List.push(dice1, dice2);
    console.log(player1List);

    currentGameMode = `player 1 choose dice order`;
    return `Welcome Player 1. <br><br> You rolled ${player1List[0]} for Dice 1 and ${player1List[1]} for Dice 2. <br><br> Please choose the order of the dice`;

    //switch to player 1 choosing dice order to make combined number
  } else if (currentGameMode == `player 1 choose dice order`) {
    if (input == 1) {
      var player1Num = player1List[0].toString() + player1List[1].toString();
      player1List.push(player1Num);
    } else if (input == 2) {
      var player1Num = player1List[1].toString() + player1List[0].toString();
      player1List.push(player1Num);
    }
    console.log(`player 1 number is ${player1Num}`);

    currentGameMode = `player 2 roll dice`;
    return `Player 1 chose Dice ${input} first. <br><br> Your number is ${player1Num}. <br><br> Player 2, please click submit to roll the dice.`;

    //switch to player 2 rolling dice mode
  } else if (currentGameMode == `player 2 roll dice`) {
    //add 2 rolled dice to player 2 array
    var dice1 = rollDice();
    var dice2 = rollDice();
    player2List.push(dice1, dice2);
    console.log(player2List);

    currentGameMode = "player 2 choose dice order";
    return `Welcome Player 2. <br><br> You rolled ${player2List[0]} for Dice 1 and ${player2List[1]} for Dice 2. <br><br> Please choose the order of the dice`;

    //swtich to player 2 choosing dice order for combined number
  } else if (currentGameMode == `player 2 choose dice order`) {
    if (input == 1) {
      var player2Num = player2List[0].toString() + player2List[1].toString();
      player2List.push(player2Num);
    } else if (input == 2) {
      var player2Num = player2List[1].toString() + player2List[0].toString();
      player2List.push(player2Num);
    }

    console.log(`player 2 number is ${player2Num}`);
    currentGameMode = `compare numbers`;
    return `Player 2 chose Dice ${input} first. <br><br> Your number is ${player2Num}. <br><br> Click submit to see who wins`;

    //compare player 1 number and player 2 number
    //scenario : player 1 wins
  } else if (currentGameMode == `compare numbers`) {
    var player1Index = player1List.length - 1;
    var player2Index = player2List.length - 1;

    var player1Num = player1List[player1Index];
    var player2Num = player2List[player2Index];

    console.log(`player 1 list is ${player1List}`);
    console.log(`player 2 list is ${player2List}`);

    if (Number(player1Num) > Number(player2Num)) {
      return `Player 1 wins! <br><br> Player 1's number is ${player1Num} and Player 2's number is ${player2Num}.`;

      //scenario : when its a draw
    } else if (Number(player1Num) == Number(player2Num)) {
      return `Its a draw! <br><br> Player 1's number is ${player1Num} and Player 2's number is ${player2Num}.`;

      //scenario : player 2 wins
    } else {
      return `Player 2 wins! <br><br> Player 1's number is ${player1Num} and Player 2's number is ${player2Num}.`;
    }
    currentGameMode = `player 1 roll dice`;
  }
};

var main = function (input) {
  var myOutputValue = beatThat(input);
  return myOutputValue;
};
