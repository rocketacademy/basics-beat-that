var mode = "player1mode";
var myOutputValue = "";
var p1Results = "";
var p2Results = "";
var dice1 = "";
var dice2 = "";

var main = function (input) {
  //player 1
  //when player 1 clicks submit
  if (mode == `player1mode`) {
    // generate random dice number
    dice1 = random();
    dice2 = random();
    console.log(dice1);
    console.log(dice2);

    myOutputValue = `Welcome Player 1. <br> You rolled ${dice1} for Dice 1 and ${dice2} for Dice 2. <br> Choose the order of the dice. <br>
    Enter A to select ${dice1}${dice2} or B to select ${dice2}${dice1}.`;
    // change to choice mode
    mode = `player1Choicemode`;
  }
  // player 1 choses order
  else if (mode == "player1Choicemode") {
    // if player 1 chooses A
    if (input == "A" || input == "a") {
      p1Results = dice1 * 10 + dice2;
      console.log("Player 1 chose A");
      myOutputValue = `Player 1, you have selected option A: ${p1Results}. Your Current score is ${p1Results}. <br> Player 2's turn now.`;
      mode = `player2mode`;
    }
    // if player 1 chooses B
    else if (input == "B" || input == "b") {
      p1Results = dice2 * 10 + dice1;
      console.log("Player 1 chose B");
      myOutputValue = `Player 2, you have selected option B: ${p1Results}. Your Current score is ${p1Results}. Player 2's turn now.`;
      mode = `player2mode`;
    }
  }
  // player 2 mode
  else if (mode == "player2mode") {
    // generate random dice number
    dice1 = random();
    dice2 = random();
    console.log(dice1);
    console.log(dice2);

    myOutputValue = `Welcome Player 2. <br> You rolled ${dice1} for Dice 1 and ${dice2} for Dice 2. <br> Choose the order of the dice. <br>
    Enter A to select ${dice1}${dice2} or B to select ${dice2}${dice1}.`;
    mode = `player2Choicemode`;
  }
  // player 2 selects
  else if (mode == "player2Choicemode") {
    // if player 2 chooses A
    if (input == "A" || input == "a") {
      p2Results = dice1 * 10 + dice2;
      console.log("Player 2 chose A");
      myOutputValue = `Player 2, you have selected option A: ${p2Results}. Your Current score is ${p2Results}`;
      mode = `results`;
    }
    // if player 2 chooses B
    else if (input == "B" || input == "b") {
      p2Results = dice2 * 10 + dice1;
      console.log("Player 1 chose B");
      myOutputValue = `Player 2, you have selected option B: ${p2Results}. Your Current score is ${p2Results}`;

      //change to results mode
      mode = `results`;
    }

    // showcase results
    if (mode == `results`) {
      // if player 2 is winning
      if (p1Results < p2Results) {
        myOutputValue = `Congratulations Player 2! You are winning with a score of ${p2Results}, while Player 1 scored ${p1Results}.  <br> Type "restart" to play again.`;
      }
      // if player 1 is winning
      else if (p1Results > p2Results) {
        myOutputValue = `Congratulations Player 1! You are winning with a score of ${p1Results}, while Player 2 scored ${p2Results}. <br> Type "restart" to play again.`;
      }
    }
    // restart the game
    if (input == "restart") {
      mode = "player1mode";
    }
  }
  return myOutputValue;
};

var random = function () {
  // Generate a decimal from 0 through 3. inclusive of 0 and exclusive of 6
  var randomDecimal = Math.random() * 6;

  // Remove the decimal with the floor operation.
  // This will be an integer from 1 to 6 inclusive.
  var randomInteger = Math.floor(randomDecimal) + 1;

  return randomInteger;
};

//// ============ More comfortable: Score ===============
