// default mode, default player is 1
gameMode = 'input player' ; 
var playerNumber = 1; 
var player1Roll1;
var player1Roll2; 
var player2Roll1;
var player2Roll2; 
var player1Number = '';
var player2Number = '';
var chooseDiceOrder; 
var chooseDiceOrder2; 

// player: inputs player number and rolls 2 dice

var main = function (input) {
  var myOutputValue = ''; 

  console.log ('game mode')
  console.log (gameMode)
  console.log ('player number')
  console.log (playerNumber) 
  
  if (gameMode == 'input player' && playerNumber == '1') {
    gameMode = "roll dice" ; 
    player1Roll1 = Roll() ;
    player1Roll2 = Roll() ;
    return 'Welcome player '+playerNumber+'<br><br>'
    + 'Your first roll: '+player1Roll1+'. Second roll: '+player1Roll2+
    '<br><br>'+'Choose dice order: 1 or 2.';
  } 

  else if (gameMode == 'input player' && playerNumber == '2'){
    gameMode = "roll dice" ; 
    player2Roll1 = Roll() ;
    player2Roll2 = Roll() ;
    return myOutputValue = 'Welcome player '+playerNumber+'<br><br>'
    + 'Your first roll: '+player2Roll1+'. Second roll: '+player2Roll2;
  }


// player 1 picks order of dice 
  if (gameMode == 'roll dice' && playerNumber == '1') {
    var chooseDiceOrder = Number(input) ;
    if (chooseDiceOrder !== 1 && chooseDiceOrder !== 2) {
      return message = 'Please choose 1 or 2 as the first numeral index for your dice rolls';
    }
    else if (chooseDiceOrder == '1' && playerNumber == '1') {
        player1Number = Number(String(player1Roll1) + String(player1Roll2)) ;
        playerNumber = 2 ;
        gameMode = 'input player' ;
        return message = 'You have chosen '+player1Number+'<br><br>'
        +"Player 2's turn. Please click submit.";
      }
    else if (chooseDiceOrder == '2' && playerNumber == '1') {
        player1Number = Number(String(player1Roll2) + String(player1Roll1)) ;
        playerNumber = 2 ;
        gameMode = 'input player' ;
        return message = 'You have chosen '+player1Number+'<br><br>'
        +"Player 2's turn. Please click submit." ;
      }
    }
      console.log ('p1 number')
      console.log (player1Number)
      console.log ('p2 number')
      console.log (player2Number)

      // player 2 picks order of dice  
  if (gameMode == 'roll dice' && playerNumber == '2') {
    var chooseDiceOrder2 = Number(input) ;
    if (chooseDiceOrder2 !== 1 && chooseDiceOrder2 !== 2) {
     return message = 'Please choose 1 or 2 as the first numeral index for your dice rolls';
  }
    else if (chooseDiceOrder2 == '1' && playerNumber == '2') {
        player2Number = Number(String(player2Roll1) + String(player2Roll2)) ;
        gameMode = 'compare' ;
      return message = 'You have chosen '+player2Number+
      '<br><br>'+'Click submit to see who wins.' ;
      }
    else if (chooseDiceOrder2 == '2' && playerNumber == '2') {
        player2Number = Number(String(player2Roll2) + String(player2Roll1)) ;
        gameMode = 'compare' ;
       return message = 'You have chosen '+player2Number+
       '<br><br>'+'Click submit to see who wins.'
      }

    }
   
    // to compare whose number is bigger 
   if (gameMode =='compare' && Number(player1Number) > Number(player2Number)) {
     return 'Player 1 wins.' ; 
   } 
   else if (gameMode == 'compare' && Number(player2Number) > Number(player1Number)) {
     return 'Player 2 wins.' ; 
   }
  }; 


// dice roll function 
var Roll = function () {
  var RandDec = Math.random() ;
  var RandNumb = RandDec * 6 ;
  var DiceResult = Math.ceil(RandNumb) ;
  return DiceResult; 
};