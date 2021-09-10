//generate function for  rollDiceNum
function rollDiceNum(){
  random = Math.random()*6
  roundDn = Math.floor(random)
  integerEl = roundDn +1
  return integerEl
}
//create function for 2 Dices numbers
function diceNumEl(){
  if(mode == `rollDice`){
    diceRollNumEl.push(rollDiceNum(), rollDiceNum())
    myOutputValue = `${userListEl[0]}, your Dice 1 is ${diceRollNumEl[0]}. Dice 2 is ${diceRollNumEl[1]}. please choose "ab" or "ba"`
    mode = `pick dice num`
  }
  return myOutputValue
}
//create function for diceOrderNum
function number(input){
  var myOutputValue = ``
  // mode = `pick dice num`
  if(mode == `pick dice num`){
    myOutputValue = `you number is ${parseInt(diceRollNumEl[0])}${parseInt(diceRollNumEl[1])}. Now is next player's turn. Please press "Submit Button`
    mode = `user input`
  }else if(input == `ba`){
    myOutputValue = `you number is ${parseInt(diceRollNumEl[1])}${parseInt(diceRollNumEl[0])}  Now is next player's trun. Please press "Submit Button` 
    mode = `user input`
  }
  return myOutputValue
}




//glocal variable
var userListEl = []
var diceRollNumEl = []
var user = ``
var mode = `rollDice`
var mode = `pick dice num`
var mode = `user input`
//Main function
function main(input){
  var myOutputValue =``
  if(mode == `user input`){
    user = input
    userListEl.push(user)
    mode = `rollDice`
    myOutputValue = `Hello ${userListEl[0]}, welcome to the game. Please press "Submit Button" to roll dices`
  }else if (mode == `rollDice`){
    myOutputValue = diceNumEl()
  }else if (mode == `pick dice num`){
    myOutputValue = number()
  }

  return myOutputValue
}
