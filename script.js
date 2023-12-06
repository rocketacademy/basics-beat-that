var stage = "starting";
var PlayerOneFinalNumber = "";
var PlayerTwoFinalNumber = "";

var ScoreOne = "0";
var ScoreTwo = "0";

var counterOne = 0;
var counterTwo = 0;

var PlayerOneArr = [];
var PlayerTwoArr = [];
var numberDice = "";

var Dice = function () {
    myOutputValue = Math.floor(Math.random()*6)+1;
    return myOutputValue;
    };




var main = function (input) {
    if (stage == "starting"){
        var noDice = Number(input.trim())
        numberDice = noDice
        if(noDice == 2){
            stage = "PlayerRollDice"
            var user = "Player 1";
            return `<b>${user}</b>: Rolled ${input} dice. Press Submit to Roll Dice.`;
        } else if (noDice == 3){
          stage = "PlayerRoll3Dice";
          var user = "Player 1";
            return `<b>${user}</b>: Rolled ${input} dice. Press Submit to Roll Dice.`;
        } else{
            return "If you want to play 2 Dice or 3 Dice Game, Press 2 or 3 then submit.";
        }
    } else if (stage == "PlayerRollDice") {
        
        var user = "Player 1";

        while (counterOne < numberDice) {
          var DiceRoll = Dice();
          PlayerOneArr.push(DiceRoll);
          counterOne++;
        }
        console.log("Player 1: "+ PlayerOneArr);
        stage = "TwoDicePlayer1Input";
        return `<b>${user}</b>: Rolled ${numberDice} dice. Results <b>${PlayerOneArr}</b>. <br>Input rearranged number for bigger value.`;

    } else if (stage == "TwoDicePlayer1Input"){
        var PlayerOneInput = Number(input.trim());
        console.log("line 50" + stage);
        var FirstDigitONETWO = Math.floor(PlayerOneInput/10)%10;
        var LastDigitONETWO = Math.floor(PlayerOneInput)%10;

        var WishONEONE = function(){
            var PlayerOneFinalNumber = PlayerOneArr[0]*10 + PlayerOneArr[1];
            return PlayerOneFinalNumber;
            };

        if ((FirstDigitONETWO == PlayerOneArr[0] || FirstDigitONETWO == PlayerOneArr[1]) && 
            (LastDigitONETWO == PlayerOneArr[0] || LastDigitONETWO == PlayerOneArr[1])) {
            if(FirstDigitONETWO == PlayerOneArr[0]){
                PlayerOneFinalNumber = WishONEONE();
            } else if (FirstDigitONETWO == PlayerOneArr[1]){
                [PlayerOneArr[0], PlayerOneArr[1]] = [PlayerOneArr[1], PlayerOneArr[0]];
                PlayerOneFinalNumber = WishONEONE();
            } 
            stage = "TwoDicePlayer2";
            return `<b>Player 1</b> Selected Number: <b>${PlayerOneFinalNumber}</b> <br> <b>Player 2</b> Please press <b>Submit</b> to roll ${numberDice} Dice.`;
        } else {
            return `Kindly Check the result number <b>${PlayerOneArr}</b> and input which order you want to`;
        };

    } else if (stage == "TwoDicePlayer2") {
        var user = "Player 2";
        console.log("Stage3")
        while (counterTwo < numberDice) {
            var DiceRoll = Dice();
            PlayerTwoArr.push(DiceRoll);
            counterTwo++;
        }
            console.log("Player 2: "+ PlayerTwoArr);
            console.log(stage);
                
            stage = "TwoDicePlayer2Input";
            return `<b>${user}</b>: Rolled ${numberDice} dice. Results <b>${PlayerTwoArr}</b>.<br>
            Input rearranged number for bigger value.`;

    } else if (stage == "TwoDicePlayer2Input"){
        
        var PlayerTwoInput = Number(input.trim());
    
        var FirstDigitTWOTWO = Math.floor(PlayerTwoInput/10)%10;
        var LastDigitTWOTWO = Math.floor(PlayerTwoInput)%10;

        var WishONETWO = function(){
            var PlayerTwoFinalNumber = (PlayerTwoArr[0]*10)+(PlayerTwoArr[1]);
            return PlayerTwoFinalNumber;
        }

        if ((FirstDigitTWOTWO == PlayerTwoArr[0] || FirstDigitTWOTWO == PlayerTwoArr[1]) && (LastDigitTWOTWO == PlayerTwoArr[0] || LastDigitTWOTWO == PlayerTwoArr[1])) {
            if(FirstDigitTWOTWO == PlayerTwoArr[0]){
                PlayerTwoFinalNumber = WishONETWO();
            } else if (FirstDigitTWOTWO == PlayerTwoArr[1]){
                [PlayerTwoArr[0], PlayerTwoArr[1]] = [PlayerTwoArr[1], PlayerTwoArr[0]];
                PlayerTwoFinalNumber = WishONETWO();
            }
         
            stage = "Totality";
            return `<b>Player 2</b> Selected Number: <b>${PlayerTwoFinalNumber}</b>`;
        } else {
            return `Kindly Check the result number <b>${PlayerTwoArr}</b> and input which order you want to`;
        };

    } else if (stage == "Totality") {
            if (PlayerOneFinalNumber > PlayerTwoFinalNumber) {
                ScoreOne++;
                return `Player1 is the winner (Player1 : <b>${PlayerOneFinalNumber}</b>, Player2 : <b>${PlayerTwoFinalNumber})</b><br> Player1 Score: <b>${ScoreOne}</b> Player2 Score: <b>${ScoreTwo}</b>`;
            } else if (PlayerOneFinalNumber === PlayerTwoFinalNumber) {
                return `It's a Tie!! (Player1 : <b>${PlayerOneFinalNumber}</b>, Player2 : <b>${PlayerTwoFinalNumber}</b>`;
            } else {
                ScoreTwo++;
                return `Player2 is the winner (Player1 : <b>${PlayerOneFinalNumber}</b>, Player2 : <b>${PlayerTwoFinalNumber})</b><br> Player1 Score: <b>${ScoreOne}</b> Player2 Score: <b>${ScoreTwo}</b>`;
            }
        } else if (stage == "PlayerRollDice") {
        
        var user = "Player 1";

        while (counterOne < numberDice) {
          var DiceRoll = Dice();
          PlayerOneArr.push(DiceRoll);
          counterOne++;
        }
        console.log("Player 1: "+ PlayerOneArr);
        stage = "TwoDicePlayer1Input";
        return `<b>${user}</b>: Rolled ${numberDice} dice. Results <b>${PlayerOneArr}</b>. <br>Input rearranged number for bigger value.`;

    } else if (stage == "TwoDicePlayer1Input"){
        var PlayerOneInput = Number(input.trim());
        console.log("line 50" + stage);
        var FirstDigitONETWO = Math.floor(PlayerOneInput/10)%10;
        var LastDigitONETWO = Math.floor(PlayerOneInput)%10;

        var WishONEONE = function(){
            var PlayerOneFinalNumber = PlayerOneArr[0]*10 + PlayerOneArr[1];
            return PlayerOneFinalNumber;
            };

        if ((FirstDigitONETWO == PlayerOneArr[0] || FirstDigitONETWO == PlayerOneArr[1]) && 
            (LastDigitONETWO == PlayerOneArr[0] || LastDigitONETWO == PlayerOneArr[1])) {
            if(FirstDigitONETWO == PlayerOneArr[0]){
                PlayerOneFinalNumber = WishONEONE();
            } else if (FirstDigitONETWO == PlayerOneArr[1]){
                [PlayerOneArr[0], PlayerOneArr[1]] = [PlayerOneArr[1], PlayerOneArr[0]];
                PlayerOneFinalNumber = WishONEONE();
            } 
            stage = "TwoDicePlayer2";
            return `<b>Player 1</b> Selected Number: <b>${PlayerOneFinalNumber}</b> <br> <b>Player 2</b> Please press <b>Submit</b> to roll ${numberDice} Dice.`;
        } else {
            return `Kindly Check the result number <b>${PlayerOneArr}</b> and input which order you want to`;
        };

    } else if (stage == "TwoDicePlayer2") {
        var user = "Player 2";
        console.log("Stage3")
        while (counterTwo < numberDice) {
            var DiceRoll = Dice();
            PlayerTwoArr.push(DiceRoll);
            counterTwo++;
        }
            console.log("Player 2: "+ PlayerTwoArr);
            console.log(stage);
                
            stage = "TwoDicePlayer2Input";
            return `<b>${user}</b>: Rolled ${numberDice} dice. Results <b>${PlayerTwoArr}</b>.<br>
            Input rearranged number for bigger value.`;

    } else if (stage == "TwoDicePlayer2Input"){
        
        var PlayerTwoInput = Number(input.trim());
    
        var FirstDigitTWOTWO = Math.floor(PlayerTwoInput/10)%10;
        var LastDigitTWOTWO = Math.floor(PlayerTwoInput)%10;

        var WishONETWO = function(){
            var PlayerTwoFinalNumber = (PlayerTwoArr[0]*10)+(PlayerTwoArr[1]);
            return PlayerTwoFinalNumber;
        }

        if ((FirstDigitTWOTWO == PlayerTwoArr[0] || FirstDigitTWOTWO == PlayerTwoArr[1]) && (LastDigitTWOTWO == PlayerTwoArr[0] || LastDigitTWOTWO == PlayerTwoArr[1])) {
            if(FirstDigitTWOTWO == PlayerTwoArr[0]){
                PlayerTwoFinalNumber = WishONETWO();
            } else if (FirstDigitTWOTWO == PlayerTwoArr[1]){
                [PlayerTwoArr[0], PlayerTwoArr[1]] = [PlayerTwoArr[1], PlayerTwoArr[0]];
                PlayerTwoFinalNumber = WishONETWO();
            }
         
            stage = "Totality";
            return `<b>Player 2</b> Selected Number: <b>${PlayerTwoFinalNumber}</b>`;
        } else {
            return `Kindly Check the result number <b>${PlayerTwoArr}</b> and input which order you want to`;
        };
// ************************
    } else if (stage == "PlayerRoll3Dice") {
        
      var user = "Player 1";
 
      while (counterOne < numberDice) {
        var DiceRoll = Dice();
        PlayerOneArr.push(DiceRoll);
        counterOne++;
      }
      console.log("Player 1: "+ PlayerOneArr);
      stage = "ThreeDicePlayer1Input";
      return `<b>${user}</b>: Rolled ${numberDice} dice. Results <b>${PlayerOneArr}</b>. <br>Input rearranged number for bigger value.`;

  } else if (stage == "ThreeDicePlayer1Input"){
      var PlayerOneInputThree = Number(input.trim());
      console.log("line 221 " + stage);

      var FirstOneDigit = Math.floor(PlayerOneInputThree/100)%10;
      var SecondOneDigit = Math.floor(PlayerOneInputThree/10)%10;
      var LastOneDigit = Math.floor(PlayerOneInputThree)%10;
      console.log(LastOneDigit);

      var WishOneThree = function(){
        var PlayerOneFinalNumber = (PlayerOneArr[0]*100)+(PlayerOneArr[1]*10)+(PlayerOneArr[2]);
        console.log(PlayerOneFinalNumber);
        return PlayerOneFinalNumber;
      };

      if ( (FirstOneDigit == PlayerOneArr[0] || FirstOneDigit == PlayerOneArr[1] || FirstOneDigit == PlayerOneArr[2]) &&
          (SecondOneDigit == PlayerOneArr[0] || SecondOneDigit == PlayerOneArr[1] || SecondOneDigit == PlayerOneArr[2]) &&
          (LastOneDigit == PlayerOneArr[0] || LastOneDigit == PlayerOneArr[1] || LastOneDigit == PlayerOneArr[2])) {
            if (FirstOneDigit == PlayerOneArr[0]) {
              if (SecondOneDigit == PlayerOneArr[1]) {
                PlayerOneFinalNumber = WishOneThree();
              } else if (SecondOneDigit == PlayerOneArr[2]) {
                [PlayerOneArr[1], PlayerOneArr[2]] = [PlayerOneArr[2], PlayerOneArr[1]];
                PlayerOneFinalNumber = WishOneThree();
              }
            } else if (FirstOneDigit == PlayerOneArr[1]) {
              if (SecondOneDigit == PlayerOneArr[0]) {
                [PlayerOneArr[0], PlayerOneArr[1]] = [PlayerOneArr[1], PlayerOneArr[0]];
                PlayerOneFinalNumber = WishOneThree();
              } else if (SecondOneDigit == PlayerOneArr[2]) {
                [PlayerOneArr[0], PlayerOneArr[1], PlayerOneArr[2]] = [PlayerOneArr[2], PlayerOneArr[0], PlayerOneArr[1]];
                PlayerOneFinalNumber = WishOneThree();}
                                                                                                                                                              
            } else if (FirstOneDigit == PlayerOneArr[2]) {
              if (SecondOneDigit == PlayerOneArr[1]) {
                [PlayerOneArr[0], PlayerOneArr[2]] = [PlayerOneArr[2], PlayerOneArr[0]];
                PlayerOneFinalNumber = WishOneThree();
              } else if (SecondOneDigit == PlayerOneArr[0]) {
                [PlayerOneArr[0], PlayerOneArr[1], PlayerOneArr[2]] = [PlayerOneArr[1], PlayerOneArr[2], PlayerOneArr[0]];
                PlayerOneFinalNumber = WishOneThree();
              }
            }
            stage = "ThreeDicePlayer2";
            return `<b>Player 1</b> Selected Number: <b>${PlayerOneFinalNumber}</b>`;
        } else {
          return `Kindly Check the result number <b>${PlayerOneArr}</b> and input which order you want to.`;
    
        };


  } else if (stage == "ThreeDicePlayer2") {
      var user = "Player 2";
      console.log("line 268" + stage)
      while (counterTwo < numberDice) {
          var DiceRoll = Dice();
          PlayerTwoArr.push(DiceRoll);
          counterTwo++;
      }
          console.log("Player 2: "+ PlayerTwoArr);
          console.log("line 277" + stage);
              
          stage = "ThreeDicePlayer2Input";
          return `<b>${user}</b>: Rolled ${numberDice} dice. Results <b>${PlayerTwoArr}</b>.<br>
          Input rearranged number for bigger value.`;

  } else if (stage == "ThreeDicePlayer2Input"){
      
      var PlayerTwoInputThree = Number(input.trim());
  
      var FirstTwoDigit = Math.floor(PlayerTwoInputThree/100)%10;
      var SecondTwoDigit = Math.floor(PlayerTwoInputThree/10)%10;
      var LastTwoDigit = Math.floor(PlayerTwoInputThree)%10;
      console.log(LastTwoDigit);

      var WishTwoThree = function(){
        var PlayerTwoFinalNumber = (PlayerTwoArr[0]*100)+(PlayerTwoArr[1]*10)+(PlayerTwoArr[2]);
        return PlayerTwoFinalNumber;
      };

      if ( (FirstTwoDigit == PlayerTwoArr[0] || FirstTwoDigit == PlayerTwoArr[1] || FirstTwoDigit == PlayerTwoArr[2]) &&
          (SecondTwoDigit == PlayerTwoArr[0] || SecondTwoDigit == PlayerTwoArr[1] || SecondTwoDigit == PlayerTwoArr[2]) &&
          (LastTwoDigit == PlayerTwoArr[0] || LastTwoDigit == PlayerTwoArr[1] || LastTwoDigit == PlayerTwoArr[2])) {
            
            if (FirstTwoDigit == PlayerTwoArr[0]) {
              if (SecondTwoDigit == PlayerTwoArr[1]) {
                PlayerTwoFinalNumber = WishTwoThree();
              } else if (SecondTwoDigit == PlayerTwoArr[2]) {
                [PlayerTwoArr[1], PlayerTwoArr[2]] = [PlayerTwoArr[2], PlayerTwoArr[1]];
                PlayerTwoFinalNumber = WishTwoThree();
              }
            } else if (FirstTwoDigit == PlayerTwoArr[1]) {
              if (SecondTwoDigit == PlayerTwoArr[0]) {
                [PlayerTwoArr[0], PlayerTwoArr[1]] = [PlayerTwoArr[1], PlayerTwoArr[0]];
                PlayerTwoFinalNumber = WishTwoThree();
              } else if (SecondTwoDigit == PlayerTwoArr[2]) {
                [PlayerTwoArr[0], PlayerTwoArr[1], PlayerTwoArr[2]] = [PlayerTwoArr[2], PlayerTwoArr[0], PlayerTwoArr[1]];
                PlayerTwoFinalNumber = WishTwoThree();}

            } else if (FirstTwoDigit == PlayerTwoArr[2]) {
              if (SecondTwoDigit == PlayerTwoArr[1]) {
                [PlayerTwoArr[0], PlayerTwoArr[2]] = [PlayerTwoArr[2], PlayerTwoArr[0]];
                PlayerTwoFinalNumber = WishTwoThree();
              } else if (SecondTwoDigit == PlayerTwoArr[0]) {
                [PlayerTwoArr[0], PlayerTwoArr[1], PlayerTwoArr[2]] = [PlayerTwoArr[1], PlayerTwoArr[2], PlayerTwoArr[0]];
                PlayerTwoFinalNumber = WishTwoThree();
              }
            }
            stage = "Totality";
            return `<b>Player 2</b> Selected Number: <b>${PlayerTwoFinalNumber}</b>`;
      } else {
        return `Kindly Check the result number <b>${PlayerTwoArr}</b> and input which order you want to.`;
    
      };

  
    } else if (stage == "Totality") {
          if (PlayerOneFinalNumber > PlayerTwoFinalNumber) {
                ScoreOne++;
                return `Player1 is the winner (Player1 : <b>${PlayerOneFinalNumber}</b>, Player2 : <b>${PlayerTwoFinalNumber})</b><br> Player1 Score: <b>${ScoreOne}</b> Player2 Score: <b>${ScoreTwo}</b>`;
            } else if (PlayerOneFinalNumber === PlayerTwoFinalNumber) {
                return `It's a Tie!! (Player1 : <b>${PlayerOneFinalNumber}</b>, Player2 : <b>${PlayerTwoFinalNumber}</b>`;
            } else {
                ScoreTwo++;
                return `Player2 is the winner (Player1 : <b>${PlayerOneFinalNumber}</b>, Player2 : <b>${PlayerTwoFinalNumber})</b><br> Player1 Score: <b>${ScoreOne}</b> Player2 Score: <b>${ScoreTwo}</b>`;
            }
        }
    
        
          
          
    }; 