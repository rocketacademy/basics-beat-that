var mode1 = 'Player 1 Step 1';
var mode2 = 'Player 1 Step 2';
var mode3 = 'Player 2 Step 1';
var mode4 = 'Player 2 Step 2';
var gameMode = mode1;
var player1 = [];
var player2 = [];
var player1Number = 0;


var main = function (input) {

  //Game mode
  if(gameMode == mode1){
    var bothDiceRolls = bothDices();
    gameMode = mode2;
    return `Hello, Player 1! You rolled ${bothDiceRolls[0]} for Dice 1 and ${bothDiceRolls[1]} for Dice 2! <br> Please enter which dice you would like to be the first dice (1 or 2).`;
  }

  if(gameMode == mode2){
    player1Number = Number(playersNumber(input));
    gameMode = mode3;
    return `Your number is ${player1Number}. Now it's Player 2's turn to roll!`;
  }

  if(gameMode == mode3){
    var bothDiceRolls = bothDices();
    gameMode = mode4;
    return `Hello, Player 2! You rolled ${bothDiceRolls[0]} for Dice 1 and ${bothDiceRolls[1]} for Dice 2! <br> Please enter which dice you would like to be the first dice (1 or 2).`;
  }

  if(gameMode == mode4){
    var player2Number = Number(playersNumber(input));
    //Show who wins
    if(player1Number > player2Number){
      return `Player 1 rolled ${player1Number}, Player 2 rolled ${player2Number}. Player 1 wins!`;
    }else if(player2Number > player1Number){
      return `Player 1 rolled ${player1Number}, Player 2 rolled ${player2Number}. Player 2 wins!`;
    }else{
      return `Player 1 rolled ${player1Number}, Player 2 rolled ${player2Number}. It's a tie!`;
    }
  }
};



//Generate computer to pick random dice number
var diceRoll = function(){
  var diceNumber = Math.floor(Math.random() * 6);
  return diceNumber;
}

//Dice rolls for both dices
var bothDices = function(){
  var bothDiceRolls = [diceRoll(), diceRoll()];

  if(gameMode == mode1){
    player1 = bothDiceRolls;
  }else{
    player2 = bothDiceRolls;
  }
  return bothDiceRolls;
}

//Player chooses order of their 2 dices
//Will return rearranged dice value
var playersNumber = function (choice){
  if(choice == `1` && gameMode == mode2){
    return `${player1[0]}${player1[1]}`;
  }
  else if(choice == `1` && gameMode == mode4){
    return `${player2[0]}${player2[1]}`;
  }
  else if(choice == '2' && gameMode == mode2){
    return `${player1[1]}${player1[0]}`;
  }
  else if(choice == `2` && gameMode == mode4){
    return `${player2[1]}${player2[0]}`;
  }

}



