var WAITPLAYER1 = "waiting for Player 1";
var SELECTPLAYER1 = "selecting dice position for Player 1";
var WAITPLAYER2 = "waiting for Player 2";
var SELECTPLAYER2 = "selecting dice position for Player 2";
var COMPARE = "compare Player 1 & Player 2 numbers";
var mode = WAITPLAYER1;
var randomNum1 = 0;
var randomNum2 = 0;
var finalNum1 = 0;
var finalNum2 = 0;
var name1 = "";
var name2 = "";

var main = function (input) {
  if (input == "" && mode == WAITPLAYER1) {
    return "Hey there! You are Player 1, type your name to begin.";
  } else if (input != "" && mode == WAITPLAYER1) {
    name1 = input;
    mode = SELECTPLAYER1;
    randomNum1 = getRandomNum();
    randomNum2 = getRandomNum();
    return `${name1}! You rolled ${randomNum1} & ${randomNum2}. <br> Type 1 or 2 to select dice 1 or dice 2 as your 1st digit!`;
  }

  if (input == 1 && mode == SELECTPLAYER1) {
    mode = WAITPLAYER2;
    finalNum1 = "" + randomNum1 + randomNum2;
    return `${name1}! Your number is ${finalNum1}! Press Submit to continue!`;
  } else if (input == 2 && mode == SELECTPLAYER1) {
    mode = WAITPLAYER2;
    finalNum1 = "" + randomNum2 + randomNum1;
    return `${name1}! Your number is ${finalNum1}! Press Submit to continue`;
  } else if (mode == SELECTPLAYER1) {
    return "Uh Oh! Select 1 or 2 only.";
  }

  if (input == "" && mode == WAITPLAYER2) {
    return "Hey there! You are Player 2, type your name to begin.";
  } else if (input != "" && mode == WAITPLAYER2) {
    name2 = input;
    mode = SELECTPLAYER2;
    randomNum1 = getRandomNum();
    randomNum2 = getRandomNum();
    return `${name2}! You rolled ${randomNum1} & ${randomNum2}. <br> Type 1 or 2 to select dice 1 or dice 2 as your 1st digit!`;
  }

  if (input == 1 && mode == SELECTPLAYER2) {
    mode = COMPARE;
    finalNum2 = "" + randomNum1 + randomNum2;
    return `${name2}! Your number is ${finalNum2}! Press Submit to continue!`;
  } else if (input == 2 && mode == SELECTPLAYER2) {
    mode = COMPARE;
    finalNum2 = "" + randomNum2 + randomNum1;
    return `${name2}! Your number is ${finalNum2}! Press Submit to continue!`;
  } else if (mode == SELECTPLAYER2) {
    return "Uh Oh! Select 1 or 2 only.";
  }

  if (mode == COMPARE) {
    mode = WAITPLAYER1;
    if (finalNum1 > finalNum2) {
      return `${name1} has beaten ${name2} with ${finalNum1} against ${finalNum2}. Congrats ${name1}!`;
    } else if (finalNum1 < finalNum2) {
      return `${name2} has beaten ${name1} with ${finalNum2} against ${finalNum1}. Congrats ${name2}!`;
    } else {
      return `Too bad! That's a tie. ${finalNum1} = ${finalNum2}.`;
    }
  }
};

// get Random Number from 1 to 6
var getRandomNum = function () {
  return Math.floor(Math.random() * 5) + 1;
};
