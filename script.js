var mode = "waiting for click";
var isANewPlayer1Round = true;
var isANewPlayer2Round = true;
var player1Num1 = 0;
var player1Num2 = 0;
var player2Num1 = 0;
var player2Num2 = 0;
var player1FinalNum = [];
var player2FinalNum = [];

var getRandomInteger = function () {
  return Math.floor(Math.random() * 6) + 1;
};

var main = function (input) {
  var myOutputValue;
  // player 1
  if (mode == "waiting for click") {
    if (input) {
      myOutputValue = 'Please hit the "Submit" button to continue.';
    } else {
      mode = "player1 roll";
    }
  }
  if (mode == "player1 roll") {
    if (isANewPlayer1Round) {
      player1Num1 = getRandomInteger();
      player1Num2 = getRandomInteger();
      player1FinalNum.push(player1Num1, player1Num2);
      myOutputValue = `Player 1's turn: <br> 
    You rolled ${player1Num1} for Dice 1 and ${player1Num2} for Dice 2. <br>
    You are about to concatenate the two digits rolled to create the largest possible number. <br>
    Enter '1' if you would like the digit in Dice 1 to be in the tens place. <br>
    Enter '2' if you would like the digit in Dice 2 to be in the tens place. <br>`;
      mode = "player1 choose dice";
      isANewPlayer1Round = false;
    }
  } else if (mode == "player1 choose dice") {
    var player1Choice = input;
    if (player1Choice == 1) {
      player1FinalNum = String(player1FinalNum[0]) + String(player1FinalNum[1]);
      myOutputValue = `Player 1, you choose Dice 1 first. <br>
      Your number is ${player1FinalNum}. <br>
      Player 2's turn now! <br>
      Please hit the "Submit" button to continue.`;
    } else if (player1Choice == 2) {
      player1FinalNum = String(player1FinalNum[1]) + String(player1FinalNum[0]);
      myOutputValue = `Player 1, you choose Dice 2 first. <br>
      Your number is ${player1FinalNum}. <br>
      Player 2's turn now! <br>
      Please hit the "Submit" button to continue.`;
    } else {
      myOutputValue = `Please enter '1' if you want ${player1Num1} or enter '2' if you want ${player1Num2} to be in the tens place.`;
    }
    if (player1Choice == 1 || player1Choice == 2) {
      mode = "waiting for click 2";
    }
  }

  // player 2
  else if (mode == "waiting for click 2") {
    if (input) {
      myOutputValue = `Player 2's turn now! Please hit the "Submit" button to continue.`;
    } else {
      mode = "player2 roll";
    }
  }
  if (mode == "player2 roll") {
    if (isANewPlayer2Round) {
      player2Num1 = getRandomInteger();
      player2Num2 = getRandomInteger();
      player2FinalNum.push(player2Num1, player2Num2);
      myOutputValue = `Player 2's turn: <br> 
    You rolled ${player2Num1} for Dice 1 and ${player2Num2} for Dice 2. <br>
    You are about to concatenate the two digits rolled to create the largest possible number. <br>
    Enter '1' if you would like the digit in Dice 1 to be in the tens place. <br>
    Enter '2' if you would like the digit in Dice 2 to be in the tens place. <br>`;
      mode = "player2 choose dice";
      isANewPlayer2Round = false;
    }
  } else if (mode == "player2 choose dice") {
    var player2Choice = input;
    if (player2Choice == 1) {
      player2FinalNum = String(player2FinalNum[0]) + String(player2FinalNum[1]);
      myOutputValue = `Player 2, you choose Dice 1 first. <br>
      Your number is ${player2Num1}${player2Num2}.; <br> 
      Please hit the "Submit" button to see the result.`;
    } else if (player2Choice == 2) {
      player2FinalNum = String(player2FinalNum[1]) + String(player2FinalNum[0]);
      myOutputValue = `Player 2, you choose Dice 2 first.  <br>
      Your number is ${player2Num2}${player2Num1}. <br> 
      Please hit the "Submit" button to see the result.`;
    } else {
      myOutputValue = `Please enter '1' if you want ${player2Num1} or enter '2' if you want ${player2Num2} to be in the tens place.`;
    }
    if (player2Choice == 1 || player2Choice == 2) {
      mode = "waiting for click 3";
    }
  }

  // result
  else if (mode == "waiting for click 3") {
    if (input) {
      myOutputValue = `End of the game! Please hit the "Submit" button to see the result.`;
    } else {
      mode = "result";
    }
  }
  if (mode == "result") {
    if (player1FinalNum > player2FinalNum) {
      myOutputValue = `Player 1 has won. <br>
      Player 1's number: ${player1FinalNum} | Player 2's number: ${player2FinalNum} <br>
      Press Submit to play again.`;
    } else {
      myOutputValue = `Player 2 has won. <br>
      Player 1's number: ${player1FinalNum} | Player 2's number: ${player2FinalNum} <br>
      Press Submit to play again.`;
    }
    mode = "waiting for click";
  }
  return myOutputValue;
};
