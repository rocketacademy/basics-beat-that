// Beat-That Game
// 2 players, each player rolls 2 dice, pick order of dice result
// higher number wins

// global vars
var modes = ["p1Roll", "p1Choose", "p2Roll", "p2Choose", "eval"];
var mode = modes[0];
var p1Choices = [];
var p2Choices = [];
var p1 = 0;
var p2 = 0;

// random dice value generator, where n is the number of rolls
var generateDiceVal = (n) => {
  diceVals = [];
  for (var i = 0; i < n; i++) {
    var result = Math.floor(Math.random() * 6) + 1;
    diceVals.push(result);
  }
  return diceVals;
};

// concat dice rolls and store them in array
var concatDiceResults = (nums) => {
  var choices = [];
  if (nums.length != 0) {
    var a = "" + nums[0] + nums[1];
    var b = "" + nums[1] + nums[0];
    choices.push(a);
    choices.push(b);
  }
  return choices;
};

// evaluation logic for which player will win the game
var beatThatLogic = (scores) => {
  if (scores[0] > scores[1]) {
    return `player1 wins! p1 rolled ${scores[0]} while p2 rolled ${scores[1]}`;
  } else if (scores[1] > scores[0]) {
    return `player2 wins! p2 rolled ${scores[1]} while p1 rolled ${scores[0]}`;
  } else {
    return "draw";
  }
};

// reset global vars
var reset = () => {
  mode = modes[0];
  p1Choices = [];
  p2Choices = [];
  p1 = 0;
  p2 = 0;
};

// main function of beat-that game flow
var gameFlow = (input) => {
  console.log(mode);
  switch (mode) {
    case modes[0]:
      mode = modes[1];
      return "P1 has rolled the dice ..., press submit to continue";
    case modes[1]:
      mode = modes[2];
      var diceResult = generateDiceVal(2);
      var diceChoices = concatDiceResults(diceResult);
      p1Choices = diceChoices;
      return `
      P1, you have rolled a ${diceResult[0]} and ${diceResult[1]}
      <br>
      Enter 'a' to choose ${diceChoices[0]} or b to choose ${diceChoices[1]}
      <br>
      `;
    case modes[2]:
      mode = modes[3];
      p1 = input == "a" ? p1Choices[0] : p1Choices[1];
      return "P1 has chosen, P1 turn ends, P2 press submit to roll the dice";
    case modes[3]:
      mode = modes[4];
      var diceResult = generateDiceVal(2);
      var diceChoices = concatDiceResults(diceResult);
      p2Choices = diceChoices;
      return `
      P2, you have rolled a ${diceResult[0]} and ${diceResult[1]}
      <br>
      Enter 'a' to choose ${diceChoices[0]} or b to choose ${diceChoices[1]}
      <br>
      `;
    case modes[4]:
      mode = modes[0];
      p2 = input == "a" ? p2Choices[0] : p2Choices[1];
      var scores = [p1, p2];
      var outputString = beatThatLogic(scores);
      reset();
      return outputString;
  }
};

var main = (input) => {
  return gameFlow(input);
};
