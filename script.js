var gameMode = prompt(
  " Welcome to a game of Beat that! Please enter your game mode, i.e og, reversed"
);

var currentMode ='New Game';
var p1DiceResult =[];
var p2DiceResult =[];
var p1DiceResultOrdered =0;
var p2DiceResultOrdered =0;
var p1DiceResultOrderedHistory =[];
var p2DiceResultOrderedHistory =[];
var p1WinCount =0;
var p2WinCount =0;
var p1LoseCount =0;
var p2LoseCount =0;
var p1ScoreHistory =[];
var p2ScoreHistory =[];

//main function
var main = function(input){
  if (gameMode == 'og'){
    return og(input);
    
  }
  if (gameMode =='reversed'){
    return reversed(input);
  }
}

// Dice Roll Function
var rollDice = function(){
  ranInt = Math.floor(Math.random() * 6) +1;
  console.log(ranInt);
  return ranInt;
}

//OG game
var og = function(input){
  if (currentMode == 'New Game'){
    var p1dice1 = rollDice();
    var p1dice2 = rollDice();
     //Store dice results in global array
     p1DiceResult = [p1dice1,p1dice2];
     console.log(p1DiceResult);
     currentMode = 'p1 pick order';
    return `Player 1, you rolled ${p1dice1} for dice 1 and ${p1dice2} for dice 2. <br> Please choose the order of dice 1 or 2 being the first!`
  }

  if(currentMode == 'p1 pick order'){
    if (input ==1){
    //Store result
    p1DiceResultOrdered = p1DiceResult[0] + "" + p1DiceResult[1];
    console.log(p1DiceResultOrdered)
    p1ScoreHistory.push(p1DiceResultOrdered);
    console.log(p1ScoreHistory)
    //change current mode
    currentMode = 'p2 turn'
      return `Player 1, you chose dice 1 first.<br> Your number is ${p1DiceResult[0]}${p1DiceResult[1]}.<br> Player 2, press submit and roll the dice!`;
      }
    else if (input ==2){
      p1DiceResultOrdered = p1DiceResult[1] + "" + p1DiceResult[0];
      console.log(p1DiceResultOrdered)
      p1ScoreHistory.push(p1DiceResultOrdered);
      console.log(p1ScoreHistory)
      currentMode = 'p2 turn'
      return `Player 1, you chose dice 2 first.<br> Your number is ${p1DiceResult[1]}${p1DiceResult[0]}.<br> Player 2, press submit and roll the dice!`;
    } 
    else {
      p1ScoreHistory.push(p1DiceResultOrdered);
      console.log(p1ScoreHistory)
      currentMode = 'New Game';
      return 'Invalid input.<br> Please only input choices 1 or 2.<br> Press submit and roll the dice again!'
    }
  }

  if (currentMode == 'p2 turn'){
    var p2Dice1 = rollDice();
    var p2Dice2 = rollDice();
    console.log(p2Dice1);
    console.log(p2Dice2);
    //Store fice results in global array
    p2DiceResult = [p2Dice1,p2Dice2];
    currentMode = 'p2 pick order';
    return `Player 2, you rolled ${p2Dice1} for dice 1 and ${p2Dice2} for dice 2.<br> Please choose the order of dice 1 or 2 being the first.`;
    }

   if (currentMode == 'p2 pick order'){
     if (input ==1){
       //store result
       p2DiceResultOrdered = p2DiceResult[0] + "" + p2DiceResult[1];
       p2ScoreHistory.push(p2DiceResultOrdered);
       console.log(p2ScoreHistory)
       currentMode ='Determine Winner'
       return `Player 2, you chose dice 1 first.<br> Your number is ${p2DiceResult[0]}${p2DiceResult[1]}.<br> Press submit to determine winner!`;
     }
     else if(input ==2){
      p2DiceResultOrdered = p2DiceResult[1] + "" + p2DiceResult[0];
      p2ScoreHistory.push(p2DiceResultOrdered);
      console.log(p2ScoreHistory)
      currentMode ='Determine Winner';
       return `Player 2, you chose dice 2 first.<br> Your number is ${p2DiceResult[1]}${p2DiceResult[0]}.<br> Press submit to determine winner!`;
     } 
     else
     {
      p2ScoreHistory.push(p2DiceResultOrdered);
      console.log(p2ScoreHistory)
      currentMode = 'p2 pick order';
      return `Invalid response.<br> Your rolled numbers are ${p2DiceResult[0]} and ${p2DiceResult[1]}.<br> Please only input choices 1 or 2.`
    }
   }

   if (currentMode == 'Determine Winner'){
     if (p1DiceResultOrdered>p2DiceResultOrdered){
       p1WinCount+=1;
       p2LoseCount +=1;
       currentMode = 'New Game';
       return `Congratulations to Player 1, chosen number is ${p1DiceResultOrdered} and Player 2 chosen number is ${p2DiceResultOrdered}.<br>Player 1's previous numbers were ${p1ScoreHistory} and <br> Player 2's previous numbers were ${p2ScoreHistory}.<br> Player 1 won ${p1WinCount} round(s) and Player 2 lost ${p2LoseCount} round(s).<br> Please press submit to start new game! `;
     }
     if (p2DiceResultOrdered >p1DiceResultOrdered){
       p2WinCount+=1;
       p1LoseCount +=1;
       currentMode = 'New Game';
       return `Congratulations to Player 2, chosen number is ${p2DiceResultOrdered} and Player 1 chosen number is ${p1DiceResultOrdered}. <br> Player 1's previous numbers were ${p1ScoreHistory} and <br> Player 2's previous numbers were ${p2ScoreHistory}.<br> Player 2 won ${p2WinCount} round(s) and Player 1 lost ${p1LoseCount} round(s).<br> Please press submit to start new game!`;
     }
     if (p1DiceResultOrdered == p2DiceResultOrdered){
       currentMode = 'New Game';
       return `It is a tie! Both Player 1 and Player 2 chose ${p1DiceResultOrdered}.<br>Player 1's previous numbers were ${p1ScoreHistory} and <br> Player 2's previous numbers were ${p2ScoreHistory}. <br> Please press submit to start new game! `
       ;
     }
   }

}

//reversed game
var reversed = function(input){
  if (currentMode == 'New Game'){
    var p1dice1 = rollDice();
    var p1dice2 = rollDice();
     //Store dice results in global array
     p1DiceResult = [p1dice1,p1dice2];
     console.log(p1DiceResult);
     currentMode = 'p1 pick order';
    return `Player 1, you rolled ${p1dice1} for dice 1 and ${p1dice2} for dice 2. <br> Please choose the order of dice 1 or 2 being the first!`
  }

  if(currentMode == 'p1 pick order'){
    if (input ==1){
    //Store result
    p1DiceResultOrdered = p1DiceResult[0] + "" + p1DiceResult[1];
    console.log(p1DiceResultOrdered)
    p1ScoreHistory.push(p1DiceResultOrdered);
    console.log(p1ScoreHistory)
    //change current mode
    currentMode = 'p2 turn'
      return `Player 1, you chose dice 1 first.<br> Your number is ${p1DiceResult[0]}${p1DiceResult[1]}.<br> Player 2, press submit and roll the dice!`;
      }
    else if (input ==2){
      p1DiceResultOrdered = p1DiceResult[1] + "" + p1DiceResult[0];
      console.log(p1DiceResultOrdered)
      p1ScoreHistory.push(p1DiceResultOrdered);
      console.log(p1ScoreHistory)
      currentMode = 'p2 turn'
      return `Player 1, you chose dice 2 first.<br> Your number is ${p1DiceResult[1]}${p1DiceResult[0]}.<br> Player 2, press submit and roll the dice!`;
    } 
    else {
      p1ScoreHistory.push(p1DiceResultOrdered);
      console.log(p1ScoreHistory)
      currentMode = 'New Game';
      return 'Invalid input.<br> Please only input choices 1 or 2.<br> Press submit and roll the dice again!'
    }
  }

  if (currentMode == 'p2 turn'){
    var p2Dice1 = rollDice();
    var p2Dice2 = rollDice();
    console.log(p2Dice1);
    console.log(p2Dice2);
    //Store fice results in global array
    p2DiceResult = [p2Dice1,p2Dice2];
    currentMode = 'p2 pick order';
    return `Player 2, you rolled ${p2Dice1} for dice 1 and ${p2Dice2} for dice 2.<br> Please choose the order of dice 1 or 2 being the first`;
    }

   if (currentMode == 'p2 pick order'){
     if (input ==1){
       //store result
       p2DiceResultOrdered = p2DiceResult[0] + "" + p2DiceResult[1];
       p2ScoreHistory.push(p2DiceResultOrdered);
       console.log(p2ScoreHistory)
       currentMode ='Determine Winner'
       return `Player 2, you chose dice 1 first.<br> Your number is ${p2DiceResult[0]}${p2DiceResult[1]}.<br> Press submit to determine winner!`;
     }
     else if(input ==2){
      p2DiceResultOrdered = p2DiceResult[1] + "" + p2DiceResult[0];
      p2ScoreHistory.push(p2DiceResultOrdered);
      console.log(p2ScoreHistory)
      currentMode ='Determine Winner';
       return `Player 2, you chose dice 2 first.<br> Your number is ${p2DiceResult[1]}${p2DiceResult[0]}.<br> Press submit to determine winner!`;
     } 
     else
     {
      p2ScoreHistory.push(p2DiceResultOrdered);
      console.log(p2ScoreHistory)
      currentMode = 'p2 pick order';
      return `Invalid response.<br> Your rolled numbers are ${p2DiceResult[0]} and ${p2DiceResult[1]}.<br> Please only input choices 1 or 2.`
    }
   }

   if (currentMode == 'Determine Winner'){
     if (p1DiceResultOrdered<p2DiceResultOrdered){
       p1WinCount+=1;
       p2LoseCount +=1;
       currentMode = 'New Game';
       return `Congratulations to Player 1, chosen number is ${p1DiceResultOrdered} and Player 2 chosen number is ${p2DiceResultOrdered}.<br>Player 1's previous numbers were ${p1ScoreHistory} and <br> Player 2's previous numbers were ${p2ScoreHistory}.<br> Player 1 won ${p1WinCount} round(s) and Player 2 lost ${p2LoseCount} round(s).<br> Please press submit to start new game! `;
     }
     if (p2DiceResultOrdered <p1DiceResultOrdered){
       p2WinCount+=1;
       p1LoseCount +=1;
       currentMode = 'New Game';
       return `Congratulations to Player 2, chosen number is ${p2DiceResultOrdered} and Player 1 chosen number is ${p1DiceResultOrdered}. <br> Player 1's previous numbers were ${p1ScoreHistory} and <br> Player 2's previous numbers were ${p2ScoreHistory}.<br> Player 2 won ${p2WinCount} round(s) and Player 1 lost ${p1LoseCount} round(s).<br> Please press submit to start new game!`;
     }
     if (p1DiceResultOrdered == p2DiceResultOrdered){
       currentMode = 'New Game';
       return `It is a tie! Both Player 1 and Player 2 chose ${p1DiceResultOrdered}.<br>Player 1's previous numbers were ${p1ScoreHistory} and <br> Player 2's previous numbers were ${p2ScoreHistory}. <br> Please press submit to start new game! `
       ;
     }
   }

}

