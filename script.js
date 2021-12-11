/* === REQUIREMENTS ====

1.1) 2 players
1.2) players take turns 

2.1) click Submit
2.2) game rolls 2 dice 

3.1) input 1 or 2 to choose order

4.1) both players rolled & chosen, player with higher number wins

*/



let dice1 = ``;
let dice2 = ``;
let diceTotal1 = ``;
let diceTotal2 = ``;
let message = ``;
let output = ``;
let mode = `first`;
let order1 = ``;
let order2 = ``;

let main = function (input) {
  if (mode == `first`){
    mode = `next1`;
    dice1 = Math.floor(Math.random() * 6 + 1);
    dice2 = Math.floor(Math.random() * 6 + 1);
    message = `welcome player 1 <br><br> your dice 1 is: ${dice1} <br><br> your dice 2 is: ${dice2} <br><br> choose dice order, 1 or 2`;
    return output = message;
  }
  if (mode == `next1` && input == 1){
    diceTotal1 = `${dice1}${dice2}`
    order1 = `your dice combi is ${diceTotal1} <br><br> press Submit for player 2 to play`;
    mode = `next2`;
    return output = order1;
  }
  if (mode == `next1` && input == 2){
    diceTotal1 = `${dice2}${dice1}`
    order1 = `your dice combi is ${diceTotal1} <br><br> press Submit for player 2 to play`;
    mode = `next2`;
    return output = order1;
  }
  if (mode == `next1` && input !== 1 && input !== 2){
    message = `please choose 1 or 2 only`;
    return output = message;
  }
  if (mode == `next2`){
    mode = `next3`
    dice1 = Math.floor(Math.random() * 6 + 1);
    dice2 = Math.floor(Math.random() * 6 + 1);
    message = `welcome player 2 <br><br> your dice 1 is: ${dice1} <br><br> your dice 2 is: ${dice2} <br><br> choose dice order, 1 or 2`;
    return output = message;
  }
  if (mode == `next3` && input == 1){
    diceTotal2 = `${dice1}${dice2}`
    order2 = `your dice combi is ${diceTotal2} <br><br> press Submit to compare scores`;
    mode = `next4`;
    return output = order2;
  }
  if (mode == `next3` && input == 2){
    diceTotal2 = `${dice2}${dice1}`
    order2 = `your dice combi is ${diceTotal2} <br><br> press Submit to compare scores`;
    mode = `next4`;
    return output = order2;
  }
  if (mode == `next3` && input !== 1 && input !== 2){
    message = `please choose 1 or 2 only`;
    return output = message;
  }
  if (mode = `next4`){
    if (diceTotal1 > diceTotal2){
      message = `player 1 dice combi is ${diceTotal1} <br><br> player 2 dice combi is ${diceTotal2} <br><br> player 1 won <br><br> press Submit to reset`;
      mode = `first`;
      return output = message;
    }
    if (diceTotal2 > diceTotal1){
      message = `player 2 dice combi is ${diceTotal2} <br><br> player 1 dice combi is ${diceTotal1} <br><br> player 2 won <br><br> press Submit to reset`;
      mode = `first`;
      return output = message;
    }
    if (diceTotal1 == diceTotal2){
      message = `player 1 dice combi is ${diceTotal1} while player 2 dice combi is ${diceTotal2} <br><br> it is a draw <br><br> press Submit to reset`;
      mode = `first`;
      return output = message;
    }
  }
};
