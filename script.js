var playerList = [];
var gameStatus = 'register';
// var numOfDice = 0;
// var numOfGame = 0;
var gameMode = 'default'
var scoreR1 =[];
var playerCounter = 0;
var winnerCounter = 1;
var winnerNum = 0;
var myOutputValue = '';

var main = function (input) {
  if (gameStatus == 'register'){
    if (!input){
      myOutputValue = `Welcome to 🎲 Beat That 🎲 <br><br>
                      Please submit player ${playerList.length + 1} name.`
    }
    if (input && input.toLowerCase() != 'start'){
      playerList.push(input);
      console.log (`'registered players :${playerList}`); 
      myOutputValue = `Welcome Player ${playerList.length}: ${input}! <br><br>
                      Please submit player ${playerList.length + 1} name <br><br>
                      OR <br><br>
                      Enter "start" to kick start the game!`
    }  
    if (input.toLowerCase() == 'start'){
      gameStatus = 'select mode';
      myOutputValue = `The registered player(s) in the game are: <br>
                      ${playerList} <br><br>
                      Please select the game mode: <br>
                      [ 1 ] Bigger number wins<br>
                      [ 2 ] Smaller number wins`;
    }
  }

    if (gameStatus == 'select mode'){
      if (input == 1){
      gameMode = 'big';
      gameStatus = 'start';
    }
    if (input == 2){
      gameMode = 'small';
      gameStatus = 'start';
    }
    if (!input){
      myOutputValue =`Please select the game mode: <br>
                      [ 1 ] Bigger number wins<br>
                      [ 2 ] Smaller number wins`;
    }
  }
    console.log (`game status = ${gameStatus}`);
    console.log (`game mode = ${gameMode}`);


  if (gameStatus == 'start'){
      if (input){
      myOutputValue = `The game has started. <br><br>
                      Please click on the "Submit" button to start rolling the dice for player # ${playerCounter+1}: ${playerList[playerCounter]}!`;
      }
      
      if (!input && playerCounter < playerList.length){             
        dice1 = rollDice();
        dice2 = rollDice();
        result = 0;
        if ((gameMode == 'big' && dice1 > dice2)||
            (gameMode == 'small' && dice1 < dice2)||
            dice1 == dice2){
              result = Number('' + dice1 + dice2);
        }
        if ((gameMode == 'big' && dice2 > dice1)||
            (gameMode == 'small' && dice2 < dice1)){
              result = Number('' + dice2 + dice1);
            }
        console.log(`No of player ${playerList.length}`)
        console.log(`player # ${playerCounter+1}: ${playerList[playerCounter]}`);
        console.log(`result = ${result}`);
        scoreR1.push(result);
        console.log (`score in player# seq: ${scoreR1}`)
        myOutputValue = `Player ${playerCounter+1}: ${playerList[playerCounter]} has rolled <br>
                        ${dice1} for dice one <br>
                        ${dice2} for dice two <br>
                        The result is ${result}.`;
      playerCounter += 1;   
      }

      if (input=='' && playerCounter == playerList.length){        
        while (winnerCounter <= playerList.length){
          if((gameMode == 'big' && scoreR1[winnerCounter] < scoreR1[winnerNum])||
            (gameMode == 'small' && scoreR1[winnerCounter] > scoreR1[winnerNum])){
            winnerNum += 0;
          }
          if((gameMode == 'big' && scoreR1[winnerCounter] > scoreR1[winnerNum])||
            (gameMode == 'small' && scoreR1[winnerCounter] < scoreR1[winnerNum])){
            winnerNum += 1;
          }
          winnerCounter +=1;            
          console.log(`winner is player #${winnerNum+1}`);
        }
        myOutputValue = `The winner is player #${winnerNum+1}: ${playerList[winnerNum]}, with winning result of ${scoreR1[winnerNum]}`;
        gameStatus = 'register';
        gameMode = 'default';
        playerCounter = 0;
        playerList = [];
        winnerCounter = 1;
        winnerNum = 1;
        scoreR1 =[];
      }
    }
    
  return myOutputValue;
}



var rollDice = function () {
  var randomNumber = Math.floor(Math.random() * 6) + 1;
  return randomNumber;
}
