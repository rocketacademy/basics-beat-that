var gameMode = gameRoll;
var gameRoll = 'Game mode dice roll';
var gameChoose = 'Game mode choose dice roll';
var curPlayer = 1;
var player1Dice = [];
var player2Dice = [];
var player1;
var player2;

var diceRoll = function () {
    return Math.ceil(Math.random() * 6);
  };

var diceRoll = function() {
    var newDice = [diceRoll(), diceRoll()];

    if (curPlayer === 1) {
        player1Dice = newDice;
      }
      else {
        player2Dice = newDice;
      }
      return newDice;
};

 /** 
  *@param {number} num1
  *@param {number} num2
 */
var concatenate2Numbers = function (num1, num2) {
    return Number(String(num1) + String(num2));
  };
  /**
   * @param {number} firstNumeralIndex
*/
var getPlayerNumber = function (firstNumeralIndex) {
    var diceArray = curPlayer === 1 ? player1Dice : player2Dice;
    var playerNum;

    if (firstNumeralIndex === 1) {
        playerNum = concatenate2Numbers(diceArray[0], diceArray[1]);
    }

    else {
        playerNum = concatenate2Numbers(diceArray[1], diceArray[0]);
      }

      if (curPlayer === 1) {
        player1 = playerNum;
      } else {
        player2 = playerNum;
      }
      return playerNum;
};

var Winner = function(){
    if (player1 > player2) {
        return 1;
      }
      return 2;
    };
/** 
 * @param {string} input
*/
    

var main = function(input){

    if (gameMode === gameRoll){
        var newDice = diceRoll();
        gameMode = gameChoose
        return `Welcome Player ${curPlayer}. <br>
      You rolled Dice 1: ${newDice[0]} and Dice 2: ${newDice[1]} <br>
      Choose the order of the dice by entering 1 or 2 .`;

    }

    if (gameMode === gameChoose){
        var firstNumeralIndex = Number(input)
        if (firstNumeralIndex !== 1 && firstNumeralIndex !== 2) {
            return 'Please choose 1 or 2 as the first number';
        }

    var playerNum = getPlayerNumber(firstNumeralIndex);
    var playerNumResponse = `Player ${curPlayer}, You chose Dice ${firstNumeralIndex} first. <br>
    Your number is ${playerNum}.`;

    if (currPlayer === 1) {
        currPlayer = 2;
        gameMode = gameRoll;
        return `${playerNumResponse} <br>
        It is now Player 2's turn. Press Submit to roll.`;
    }
    
    var winningPlayer = Winner();
    curPlayer =1;
    gameMode = gameRoll;
    return `${playerNumResponse} <br>
    Player ${winningPlayer} has won. <br>
    Player 1's number: ${player1Num} | Player 2's number: ${player2Num} <br> <br>
    Press Submit to play again.`;
};
}