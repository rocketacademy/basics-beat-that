var winCounts = 0;
var playCounts = 0;
var diceCounts = 0;
var state = 'begin';
var numberOfRemainingPlays = '';


var diceRoll = function(){
  var randomDecimal = Math.random()* 6;
  var ranNumber = Math.ceil(randomDecimal);
  return ranNumber;
}

var valueFormed = function(firstDigit,secondDigit){
  var number = '';
  if (firstDigit>secondDigit){
    number = Number(firstDigit) * 10 + Number(secondDigit);
  }else {
    number = Number(secondDigit) * 10 + Number(firstDigit);
  }
   return number;
}

var main = function(input){
var numberofplays = input;
var player1NumberList = [];
var compNumberList = [];
var myOutputValue = '';

if (state == 'begin'){
  myOutputValue = 'Please enter the number of times you would like to play Beat That!';
  state == 'Entered number of rounds';
  return myOutputValue;
} if (state =='Entered number of rounds'){
  return myOutputValue = 'please click submit once to form a number';
} if (state =='please click submit once to form a number'){
  while (diceCounts < Number(input) + 1){
  var firstDiceRollNumber = diceRoll();
  console.log(diceRoll)
  var secondDiceRollNumber = diceRoll();
  var playersNumber = valueFormed(firstDiceRollNumber,secondDiceRollNumber);
   
  console.log('playersNumber')
  console.log(playersNumber)
  player1NumberList.push(playersNumber);
  
  var firstCompDiceRollNumber = diceRoll();
  var secondCompDiceRollNumber = diceRoll();
  var computersNumber = valueFormed(firstCompDiceRollNumber,secondCompDiceRollNumber);

  compNumberList.push(computersNumber);
  diceCounts = Number(diceCounts) + 1;
  numberOfRemainingPlays = Number(input) - Number(diceCounts);
  return myOutputValue = `You formed ${playersNumber} and computer formed ${computersNumber}.
    Click submit again to form another number, you have ${numberOfRemainingPlays} remaining Plays left.`
  } state == 'compute win Counts';
  return myOutputValue = 'Lets find out the number of times you won!'
}
if(state == 'compute win Counts' && diceCounts == input){
   while (playCounts < Number(numberofplays) - 1);
    if (compNumberList[numberofplays] > player1NumberList[numberofplays]){
    winCounts = winCounts;
    numberofplays = Number(numberofplays) - 1;
   }if(compNumberList[numberofplays] < player1NumberList[numberofplays]){
    winCounts = Number(winCounts) + 1;
    numberofplays = Number(numberofplays) - 1;
   }else{numberofplays = Number(numberofplays) - 1}
  }
  return myOutputValue = `You have won ${winCounts} times.`
}

