var gameMode='dice roll'
var diceNumberPlayer1=[]
var diceNumberPlayer2=[]
var currPlayer=1
var concastenateNumber1=``
var concastenateNumber2=``
var concastenateNumberPlayer1=[]
var concastenateNumberPlayer2=[]
var main = function (input) {
  // diceNumberPlayer1=[]
  // diceNumberPlayer2=[]
  // concastenateNumberPlayer1=[]
  // concastenateNumberPlayer2=[]
  if(gameMode=='dice roll'){
    gameMode='concastenate'
    return diceRollMode()
  }
  if(gameMode=='concastenate'){
  return concastenateMode(input)
  }
  if(gameMode=='result'){
    return result()
  }
};
var diceRoll=function(){
  var randomInteger=Math.ceil(Math.random()*6)
  return randomInteger
}
var diceRollMode=function(){
  var counter=0
  if(currPlayer==1){
  while(counter<2){
    diceNumberPlayer1.push(diceRoll())
    counter+=1
  }
   return `Welcome Player ${currPlayer}.
<br>You rolled ${diceNumberPlayer1[0]} for Dice 1 and ${diceNumberPlayer1[1]} for Dice 2.
<br>Choose the order of the dice by inputting either 1 or 2.`
}
if(currPlayer==2){
  while(counter<2){
    diceNumberPlayer2.push(diceRoll())
    counter+=1
  }
   return `Welcome Player ${currPlayer}.
<br>You rolled ${diceNumberPlayer2[0]} for Dice 1 and ${diceNumberPlayer2[1]} for Dice 2.
<br>Choose the order of the dice by inputting either 1 or 2.`
}
 
}
var concastenateMode=function(input){
  concastenateNumber1= Number(String(diceNumberPlayer1[0])+String(diceNumberPlayer1[1]))
  concastenateNumber2= Number(String(diceNumberPlayer1[1])+String(diceNumberPlayer1[0]))
  concastenateNumber3= Number(String(diceNumberPlayer2[0])+String(diceNumberPlayer2[1]))
  concastenateNumber4= Number(String(diceNumberPlayer2[1])+String(diceNumberPlayer2[0]))
  var userPick=Number(input)
if(currPlayer==1){
  currPlayer=2
  gameMode='dice roll'
  if(userPick==1){
    concastenateNumberPlayer1.push(concastenateNumber1)
    return `Player 1, you chose Dice 1 first.<br>Your number is ${concastenateNumberPlayer1[0]}.<br>It is now Player 2's turn`
}
  if(userPick==2){
     concastenateNumberPlayer1.push(concastenateNumber2)
    return `Player 1, you chose Dice 2 first.<br>Your number is ${concastenateNumberPlayer1[0]}.<br>It is now Player 2's turn`
}
}
if(currPlayer==2){
  gameMode='result'
  if(userPick==1){
    concastenateNumberPlayer2.push(concastenateNumber3)
    return `Player 2, you chose Dice 1 first.<br>Your number is ${concastenateNumberPlayer2[0]}.Click submit to determine the result`
}
  if(userPick==2){
    concastenateNumberPlayer2.push(concastenateNumber4)
    return `Player 2, you chose Dice 2 first.<br>Your number is ${concastenateNumberPlayer2[0]}.Click submit to determine the result`
}
}
}
var result = function(){
  gameMode='dice roll'
  currPlayer=1
  console.log(concastenateNumberPlayer1,concastenateNumberPlayer2)
  if(concastenateNumberPlayer1[0]>concastenateNumberPlayer2[0]){
    diceNumberPlayer1=[]
    diceNumberPlayer2=[]
    concastenateNumberPlayer1=[]
    concastenateNumberPlayer2=[]
    return `player 1 win yay`
  }
  if(concastenateNumberPlayer1[0]<concastenateNumberPlayer2[0]){
    diceNumberPlayer1=[]
    diceNumberPlayer2=[]
    concastenateNumberPlayer1=[]
    concastenateNumberPlayer2=[]
    return `player 2 win yay`
  }
    diceNumberPlayer1=[]
    diceNumberPlayer2=[]
    concastenateNumberPlayer1=[]
    concastenateNumberPlayer2=[]
  return `draw`
}
