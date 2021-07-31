// 2 Players take turns
// Keep track variables for player 1
var diceVal1 = [];

// Keep track variables for player 2
var diceVal2 = [];
// Other variables
var counter = 0;
var currentPlayer = 1;
var outputValue = ''
var diceValue = []
var gameMode = "DICE ROLL"
var player1Score = 0;
var player2Score = 0;
//Dice rolls function
var rollDice = function () {
  var randomNum = Math.floor (Math.random ()*6)+1;
  return randomNum;
};

// Rolling two dices function
var roll2Dice = function (){
  
      while (counter <2) {
      var twoDiceRolls = rollDice ();
      diceValue.push (Number(twoDiceRolls));
      console.log(diceValue);

      counter = counter + 1;
      }
     
      
    };

  // joinValue = function (){
  //   playerOneValueString = diceValueOne.join ('');
  //   //   var playerOneValueNum = Number (diceValueOne.join (''));
  //   //   return playerOneValueNum;
  // }
var main = function (input){
  var myOutputValue = "";
  console.log (gameMode);
  if (currentPlayer == 1){
    if (gameMode == 'DICE ROLL'){
      roll2Dice()
  
      player1Score = diceValue[0] + diceValue[1];
      gameMode = 'CHOOSE ORDER';

      return 'Welcome Player '+ currentPlayer + ' ! <br> You rolled:<br> Dice 1 = ' + diceValue[0] + '<br> Dice 2 = ' + diceValue[1] + '<br> Choose the order of the dice please!. <br> Choose: <br> 1 - for Dice 1 <br> 2 - for Dice 2. Player one score ' + player1Score;
    }
    
    else if (gameMode == 'CHOOSE ORDER'){
      
      console.log (gameMode);
      myOutputValue = combineVal(input);

    }
    
    return myOutputValue;
  }
};
 //if gamemode = dice roll => run the rollTwoDice function

var combineVal = function (input){
  var firstIndex = (input - 1);
  var firstDigit = (diceValue[firstIndex]);
  diceValue.splice(firstIndex,1);
  var secondDigit = (diceValue.pop());
  return Number(`${firstDigit}${secondDigit}`);

  }









 // if gamemode = choose order => run combine value function
// if gamemode = select winner => run choose winner function

  //       }
        
  //   gameMode = 'Player one choose dice order';
  //   console.log('gamemode' + gameMode);        
    
  //   return outputPlayerOne;
  //   }
  // };
  
  //     // Player one choose dice number order
  //     // The following code assume that CHOOSE DICE ORDER game mode
  // //var main = function (){  
   
  //   else if (gameMode == 'Player one choose dice order' && playerOneInput == 2){
  //       diceValueOne.move(1,0); 
  //       outputPlayerOne = Number(diveValueOne.join('')); 
  //       console.log ('output one' + outputPlayerOne);  
  //   } else {
  //      outputPlayerOne = Number(diceValueOne.join(''));
  //   }
    
  //   return outputPlayerOne;
  
  //   };





    
    // }
     

    
          
    
  //   // // // Player one choose dice number order
    
  //   // if (input = 2){
  //   //     diceValueOne.move(1,0);    
  //   //   } 
  //   //    outputPlayerOne = Number(diceValueOne.join(''));
    
  //   // return outputPlayerOne;
  
  //   // };


