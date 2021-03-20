// both players names are blank

var main = function (input){

  var player1sRolls = [];
  mode = 'game mode locked in';
  // i want to express the numbers rolled into an array
  var configurationFrDiceNumber1 = function(){
    var displayFirstRoll = yourRandomRoll1();
    var display2ndRoll = yourRandomRoll2();
    console.log('rolled both dice time to facilitate the switched arrangement')
    mode = 'dice rolled for player 1';
    player1sRolls.push(displayFirstRoll);
    player1sRolls.push(display2ndRoll);
    // push both numbers into the array
    
  
    
    var changePositionForP1 = function () {
      mode = 'change configuration of both numbers for player 1';
      player1sRolls.pop(displayFirstRoll);
      player1sRolls.push(displayFirstRoll);
      console.log('arrangement changed')
      // remove the first number, then add it back to the end of the array
    }
  

    var bothCases = function(){
        if (mode = 'dice rolled for player 1' && input == 'yes') {
        mode == 'change configuration of both numbers for player 1';
        var callChangePositioningFunc = changePosition1();
            return 'hello,your rolls are ' + player1sRolls;
        } else if (input == 'no') {
            mode == 'want to keep these numbers the same for player 1';
            player1sRolls = [displayFirstRoll, display2ndRoll];
            return 'hello,your rolls are ' + player1sRolls;
          }
        }
      }
      

      // repeat lines 38-69 again for player 2
      var configurationFrDiceNumber2 = function () {
        player2sRolls = [];
        var displayFirstRoll = opponentRoll1();
        var display2ndRoll = opponentRoll2();
        // call both functions
        player2sRolls.push(computerRandomGenNumber1);
        player2sRolls.push(computerRandomGenNumber2);
        // push both numbers into the array

        mode = 'change configuration of both numbers for player 2';
        // text for when the mode is about to switch

        player2sRolls.pop(computerRandomGenNumber1);
        player2sRolls.push(computerRandomGenNumber1);
        // remove the first number, then add it back to the end of the array
        mode = 'dice rolled for player 2';
        
        // pretext1 is for when the mode is about to switch
        var changePosition2 = function () {
          player2sRolls.pop(displayFirstRoll);
          player2sRolls.push(displayFirstRoll);
        };
        // remove the first number, then add it back to the end of the array

        

        if (mode = 'dice rolled for player 2' && input == 'yes') {
          mode == 'change configuration of both numbers for player 2';
          var callChangePositioningFunc = changePositionForP1();
          return 'your rolls are ' + player1sRolls;
        } else if (input == 'no') {
          mode == 'want to keep these numbers the same for player 2';
          player2sRolls = [computerRandomGenNumber1, computerRandomGenNumber2];
          return 'your rolls are ' + player2sRolls;
        }
      }
    
    // my final 'number' is that array
  
 
  var comparisonOfBothNumbers = function () {
    if (player1sRolls > player2sRolls) {
      return 'player 1 you win! you rolled ' + player1sRolls + 'while player 2 rolled ' + player2sRolls;
    } else if (player2sRolls > player1sRolls) {
      return 'player 2 you win!! you rolled ' + player2sRolls + 'while player 1 rolled ' + player1sRolls;
    }
  }
};
  

  var gameSystem = function () {
  // encapsulate the whole game mechanics in this 1 function, makes it convenient
    var yourRandomRoll1 = function () {
      var randomGenNumber = Math.floor(Math.random() * 6) + 1;
      return randomGenNumber;
    }
    var yourRandomRoll2 = function () {
      var randomGenNumber2 = Math.floor(Math.random() * 6) + 1;
      return randomGenNumber2;
    }
    var opponentRoll1 = function () {
      var computerRandomGenNumber1 = Math.floor(Math.random() * 6) + 1;
      return computerRandomGenNumber1;
    }
    var opponentRoll2 = function () {
      var computerRandomGenNumber2 = Math.floor(Math.random() * 6) + 1;
      return computerRandomGenNumber2;
    }
  }

