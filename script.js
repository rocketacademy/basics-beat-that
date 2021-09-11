var main = function (input) {


var Playerresult = Ruesult1();
console.log ('resulUser'+Playerresult)
var CompResult = Result2 ();
console.log ('resulComputer'+CompResult)
if (Playerresult>CompResult) {

  return "You win";

}
else {
  return "You Lose"
}


};

var Ruesult1 = function () {
  var randomDiceNumber1 = rollDice();

  console.log ('randomnumber'+randomDiceNumber1)

  var randomDiceNumber2 = rollDice();

  console.log ('randomnumber'+randomDiceNumber2)


  if (randomDiceNumber2>randomDiceNumber1)
  {

var value1 = +[randomDiceNumber2] +[randomDiceNumber1];
      return value1;
  }
else {
  value1 = +[randomDiceNumber1] +[randomDiceNumber2];
      return value1;
}

};

var Result2 = function () {
  var randomDiceNumber1 = rollDice();

  console.log ('randomnumber'+randomDiceNumber1)

  var randomDiceNumber2 = rollDice();

  console.log ('randomnumber'+randomDiceNumber2)


  if (randomDiceNumber2>randomDiceNumber1)
  {

var value2 = +[randomDiceNumber2] +[randomDiceNumber1];
      return value2;
  }
else {
  value2 = +[randomDiceNumber1] +[randomDiceNumber2];
      return value2;
}

};



var rollDice = function () {
  var randomInteger = (Math.floor(Math.random() * 6));
var diceNumber = randomInteger + 1;

  return diceNumber;

};

