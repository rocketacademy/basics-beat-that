var PlayerOneFinal = "";
var PlayerTwoFinal = "";
var myOutputValue = "";
var stage = "PlayerOne2";
var stage = "PlayerOne3";

var ScoreOne = "0";
var ScoreTwo = "0";

var counterOne = 0;
var counterTwo = 0;


var Dice = function () {
  myOutputValue = Math.floor(Math.random()*6)+1;
  return myOutputValue;
  }



var main = function (input) {
  var PlayerInput = Number(input.trim());

  var whileOne = function(){
    while (counterOne < PlayerInput) {
            var DiceRoll = Dice();
            PlayerOneArr.push(DiceRoll);
            counterOne++;
          }
           console.log(PlayerOneArr);
           console.log(stage);
    }
    
    var whileTwo = function () {
    while (counterTwo < PlayerInput) {
            var DiceRoll = Dice();
            PlayerTwoArr.push(DiceRoll);
            counterTwo++;
          }
            console.log(PlayerTwoArr);
            console.log(stage);
    }
  

  if (PlayerInput == 2 || PlayerInput == 3) {
    
    var PlayerOneArr = [];
    var PlayerTwoArr = [];
    stage ="PlayerOne2";

    if (PlayerInput == 2) {
      whileOne();

      PlayerOneFinal = PlayerOneArr[0]+PlayerOneArr[1];

      myOutputValue = `Player 1: Rolled dice result <b>${PlayerOneArr}</b>.<br> Arrange the order to compete with another Player,
      <br> <b>1</b> for first Dice Number. <b>2</b> for Second Dice Number.<br> Player 2 just press <b>SUBMIT</b>`;

      stage = "PlayerTwo2";
      return myOutputValue;

    }else if (PlayerInput == 3) {

      stage = "PlayerOne3";
      whileOne();

      PlayerTwoFinal = PlayerOneArr[0]+PlayerOneArr[1]+PlayerOneArr[2];

      myOutputValue = `Rolled dice result <b>${PlayerOneArr}</b>.<br> Arrange the order to compete with another Player,
      <br> <b>1</b> for first Dice Number. <b>2</b> for Second Dice Number. <b>3</b> for Third Dice Number.<br>Player 2 just press <b>SUBMIT</b>`;
      stage = "PlayerTwo3";
      return myOutputValue;
    }
    if (stage == "PlayerTwo2") {
      whileTwo();

      PlayerTwoFinal = PlayerTwoArr[0]+PlayerTwoArr[1];

      myOutputValue = `Player 2: Rolled dice result <b>${PlayerTwoArr}</b>.<br> Arrange the order to compete with another Player,
      <br> <b>1</b> for first Dice Number. <b>2</b> for Second Dice Number.`;
      stage = "Totality";
      return myOutputValue;}


    if (stage == "PlayerTwo3") {
      whileTwo();

      PlayerTwoFinal = PlayerTwoArr[0]+PlayerTwoArr[1]+PlayerTwoArr[2];

      myOutputValue = `Player 2: Rolled dice result <b>${PlayerTwoArr}</b>.<br> Arrange the order to compete with another Player,
      <br> <b>1</b> for first Dice Number. <b>2</b> for Second Dice Number.`;
      stage = "Totality";
      return myOutputValue;
      }
        

    if (stage == "Totality" && PlayerOneFinal > PlayerTwoFinal){
      myOutputValue = `Player One Won!! Score ${ScoreOne}`;
      ScoreOne++;
      return myOutputValue;
    } else if (stage == "Totality" && PlayerOneFinal < PlayerTwoFinal){
      myOutputValue = `Player Two Won!! Score ${ScoreTwo}`;
      ScoreTwo++;
      return myOutputValue;}





    } else {
      myOutputValue = "If you want to play 2 Dice or 3 Dice Game, Press 2 or 3 then submit.";
    return myOutputValue;
  };


};




/* Work in progress

//If player picked two dice for random no. and want to change the placement.
// Player 1 Dice 2
var WishOneTWO = function(){
  var WishOneTWOInput = Number(input.trim());
  var WishNumberONETWO = WishOneTWOInput;

  var FirstDigitONETWO = (Math.floor(WishNumberONETWO/10)%10);
  var LastDigitONETWO = (Math.floor(WishNumberONETWO)%10);

  var WishONEONE = function(){
    var PlayerOneFinalNumber = (PlayerOneArr[0]*10)+(PlayerOneArr[1]);
    return PlayerOneFinalNumber;
}

  if (FirstTwoDigit == PlayerOneArr[0] || FirstTwoDigit == PlayerOneArr[1] && 
    SecondTwoDigit == PlayerOneArr[0] || SecondTwoDigit == PlayerOneArr[1]) {
        if(FirstDigitONETWO == PlayerOneArr[0]){  
          WishONEONE();                                                          //permutation 12/ 21
        } else if (FirstDigitONETWO == PlayerOneArr[1]){
          [PlayerOneArr[0], PlayerOneArr[1]] = [PlayerOneArr[1], PlayerOneArr[0]];
          WishONEONE();
          
        }
      } else {
        `Kindly Check the result number <b.${PlayerOneArr}</b> and input which order you want to`
    };
   }


   //Player 2 Dice 2

   var WishTwoTWO = function(){
    var WishTWOTWOInput = Number(input.trim());
    var WishNumberTWOTWO = WishTWOTWOInput;

    var FirstDigitTWOTWO = (Math.floor(WishNumberTWOTWO/10)%10);
    var LastDigitTWOTWO = (Math.floor(WishNumberTWOTWO)%10);

    var WishONETWO = function(){
      var PlayerTwoFinalNumber = (PlayerTwoArr[0]*10)+(PlayerTwoArr[1]);
      return PlayerTwoFinalNumber;
  }

    if (FirstDigitTWOTWO == PlayerTwoArr[0] || FirstDigitTWOTWO == PlayerTwoArr[1] && 
      LastDigitTWOTWO == PlayerTwoArr[0] || LastDigitTWOTWO == PlayerTwoArr[1]) {
          if(FirstDigitTWOTWO == PlayerTwoArr[0]){  
            WishONETWO();                                                          //permutation 12/ 21
          } else if (FirstDigitTWOTWO == PlayerTwoArr[1]){
            [PlayerTwoArr[0], PlayerTwoArr[1]] = [PlayerTwoArr[1], PlayerTwoArr[0]];
            WishONETWO();
            
          }
        } else {
          `Kindly Check the result number <b>${PlayerTwoArr}</b> and input which order you want to`
      };
     }


//Player 1 Dice 3 (Total 6 combination of placement, 123 213 312 132 231 321)

var WishOneThree = function(){

var WishOneInput = Number(input.trim());
var WishOneNumber = WishOneInput;

var FirstOneDigit = (Math.floor(WishOneNumber/100)%10);
var SecondOneDigit = (Math.floor(WishOneNumber/10)%10);
var LastOneDigit = (Math.floor(WishOneNumber)%10);


var WishoutputOne = function(){
    var PlayerOneFinalNumber = (PlayerOneArr[0]*100)+(PlayerOneArr[1]*10)+(PlayerOneArr[2]);
    return PlayerOneFinalNumber;
}

if (FirstOneDigit == PlayerOneArr[0] || FirstOneDigit == PlayerOneArr[1] || FirstOneDigit == PlayerOneArr[2] && 
    SecondOneDigit == PlayerOneArr[0] || SecondOneDigit == PlayerOneArr[1] || SecondOneDigit == PlayerOneArr[2] &&
    LastOneDigit == PlayerOneArr[0] || LastOneDigit == PlayerOneArr[1] || LastOneDigit == PlayerOneArr[2] ) {
        if(FirstOneDigit == PlayerOneArr[0]){                                                            //permutation 123/132
            if (SecondOneDigit == PlayerOneArr[1]) {
                WishoutputOne();
                } else if (SecondOneDigit == PlayerOneArr[2]) {
                    [PlayerOneArr[1], PlayerOneArr[2]] = [PlayerOneArr[2], PlayerOneArr[1]];
                    WishoutputOne();
                }
        } else if (FirstOneDigit == PlayerOneArr[1]) {                                                   //permutation 312/213
            if (SecondOneDigit == PlayerOneArr[0]) {
                [PlayerOneArr[0], PlayerOneArr[1]] = [PlayerOneArr[1], PlayerOneArr[0]];
                WishoutputOne();
            } else if (SecondOneDigit == PlayerOneArr[2]){
              [PlayerOneArr[0], PlayerOneArr[1], PlayerOneArr[2]]=[PlayerOneArr[2], PlayerOneArr[0], PlayerOneArr[1]];
              WishoutputOne();
            }
        } else if (FirstOneDigit == PlayerOneArr[2]){                                                      //permutation 231/321
            if(SecondOneDigit == PlayerOneArr[1]){
              [PlayerOneArr[0], PlayerOneArr[2]] = [PlayerOneArr[2], PlayerOneArr[0]];
              WishoutputOne();
            } else if (SecondOneDigit == PlayerOneArr[0]){
              [PlayerOneArr[0], PlayerOneArr[1], PlayerOneArr[2]] = [PlayerOneArr[1], PlayerOneArr[2], PlayerOneArr[0]]
              WishoutputOne();
            }

        }


} else {
    `Kindly Check the result number <b>${PlayerOneArr}</b> and input which order you want to`
};

};


//Player 2 Dice 3

var WishTwoThree = function(){

    var WishTwoInput = Number(input.trim());
    var WishTwoNumber = WishTwoInput;
    
    var FirstTwoDigit = (Math.floor(WishTwoNumber/100)%10);
    var SecondTwoDigit = (Math.floor(WishTwoNumber/10)%10);
    var LastTwoDigit = (Math.floor(WishTwoNumber)%10);
    
      
    var WishoutputTwo = function(){
        var PlayerTwoFinalNumber = (PlayerTwoArr[0]*100)+(PlayerTwoArr[1]*10)+(PlayerTwoArr[2]);
        return PlayerTwoFinalNumber;
    }
    
    if (FirstTwoDigit == PlayerTwoArr[0] || FirstTwoDigit == PlayerTwoArr[1] || FirstTwoDigit == PlayerTwoArr[2] && 
        SecondTwoDigit == PlayerTwoArr[0] || SecondTwoDigit == PlayerTwoArr[1] || SecondTwoDigit == PlayerTwoArr[2] &&
        LastTwoDigit == PlayerTwoArr[0] || LastTwoDigit == PlayerTwoArr[1] || LastTwoDigit == PlayerTwoArr[2] ) {
            if(FirstTwoDigit == PlayerTwoArr[0]){                                                            //permutation 123/132
                if (SecondTwoDigit == PlayerTwoArr[1]) {
                    WishoutputTwo();
                    } else if (SecondTwoDigit == PlayerTwoArr[2]) {
                        [PlayerTwoArr[1], PlayerTwoArr[2]] = [PlayerTwoArr[2], PlayerTwoArr[1]];
                        WishoutputTwo();
                    }
            } else if (FirstTwoDigit == PlayerTwoArr[1]) {                                                   //permutation 312/213
                if (SecondTwoDigit == PlayerTwoArr[0]) {
                    [PlayerTwoArr[0], PlayerTwoArr[1]] = [PlayerTwoArr[1], PlayerTwoArr[0]];
                    WishoutputTwo();
                } else if (SecondTwoDigit == PlayerTwoArr[2]){
                  [PlayerTwoArr[0], PlayerTwoArr[1], PlayerTwoArr[2]]=[PlayerTwoArr[2], PlayerTwoArr[0], PlayerTwoArr[1]];
                  WishoutputTwo();
                }
            } else if (FirstTwoDigit == PlayerTwoArr[2]){                                                      //permutation 231/321
                if(SecondTwoDigit == PlayerTwoArr[1]){
                  [PlayerTwoArr[0], PlayerTwoArr[2]] = [PlayerTwoArr[2], PlayerTwoArr[0]];
                  WishoutputTwo();
                } else if (SecondTwoDigit == PlayerTwoArr[0]){
                  [PlayerTwoArr[0], PlayerTwoArr[1], PlayerTwoArr[2]] = [PlayerTwoArr[1], PlayerTwoArr[2], PlayerTwoArr[0]]
                  WishoutputTwo();
                }
    
            } 
    } else {
        `Kindly Check the result number <b>${PlayerTwoArr}</b> and input which order you want to`
    };
    };

    */