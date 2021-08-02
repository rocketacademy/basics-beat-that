// 2 Players take turns
// Keep track variables for player 1
var diceVal1 = 0;

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
      //console.log(diceValue);

      counter = counter + 1;
      }
     
      
    };

 //Function to concetenate number from the dice rolls after the player choose order

var combineVal = function (input){
  var firstIndex = (input - 1);
  var firstDigit = (diceValue[firstIndex]);
  diceValue.splice(firstIndex,1);
  var secondDigit = (diceValue.pop());
  return Number (`${firstDigit}${secondDigit}`);
  };
 
// Function to decide the winner

var decideWinner = function (){
  if (diceVal1 > diceVal2){
  return 1;
}
  return 2;
};


var main = function (input){
var myOutputValue = "";
 console.log (gameMode);
  if (gameMode == 'DICE ROLL'){
    roll2Dice()
   
    gameMode = 'CHOOSE ORDER';
    counter = 0;
    return 'Welcome Player '+ currentPlayer + ' ! <br> You rolled:<br> Dice 1 = ' + diceValue[0] + '<br> Dice 2 = ' + diceValue[1] + '<br> Choose the order of the dice please!. <br> Choose: <br> 1 - for Dice 1 <br> 2 - for Dice 2. ';
  
  } if (gameMode == 'CHOOSE ORDER' ){
        if (currentPlayer == 1) {    
        
        diceVal1 = combineVal(input);
        console.log ('dice value');
        console.log (diceVal1);
        gameMode = 'DICE ROLL';
        currentPlayer = 2;
        

        myOutputValue = 'Player 1, your dice value is ' + diceVal1 + '<br> Now, it is player 2 turn. Please press the submit button.';

      }  else { 
      diceVal2 = combineVal(input);
      
      gameMode = 'CHOOSE WINNER';
      
    
      myOutputValue = 'Player 2, your dice Value is '+ diceVal2;
      }
  if (gameMode == 'CHOOSE WINNER'){
      myOutputValue = 'Player ' + decideWinner() + ' won!'
      gameMode = 'DICE ROLL'
      currentPlayer = 1;
  }



   return myOutputValue;
}
};
  
  
  
  
  // currentPlayer == 1){
  //   combineVal ();
  //   diceVal1 = playerOutput;
  //   myOutputValue = diceVal1;
  
  // } else (gameMode = 'CHOOSE ORDER' && currentPlayer == 2){

  // }






//   console.log (gameMode);
//   //if (currentPlayer == 1 || currentPlayer == 2){
//      if (gameMode == 'DICE ROLL'){
//       roll2Dice()
//       console.log ('dice');
//       console.log (roll2Dice);
  
//       //player1Score = diceValue[0] + diceValue;
//       gameMode = 'CHOOSE ORDER';

//       
//     }
    
//     else if (gameMode == 'CHOOSE ORDER' && currentPlayer == 1){
      
//       console.log (gameMode);
//       var playerDiceNum = combineVal (input);

//       myOutputValue = 'Player ' + currentPlayer + ' dice value is '+ playerDiceNum;
//       diceVal1 = playerDiceNum;
//       currentPlayer = 2;
//       gameMode = 'DICE ROLL';
//       console.log (gameMode);


//     }
    
//     return myOutputValue;
//   //}
// };










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


