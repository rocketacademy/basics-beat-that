

var main = function (input) {
  const player1RanRolls = [];
  const player2RanRolls = [];
  player1RanRolls.sort(function(a, b) {
  return a - b;});
  player2RanRolls.sort(function(a, b) {
  return a - b;});
  

  if (input== "Player1") {
    var player1Dice1 = Math.floor(Math.random() * 6) + 1;
    var player1Dice2 = Math.floor(Math.random() * 6) + 1;
    console.log(player1Dice1);
    console.log(player1Dice2);
  player1RanRolls.push(player1Dice1)
  player1RanRolls.push(player1Dice2)
  console.log(player1RanRolls);
  return player1RanRolls;
  }

  if (input== "Player2") {
    var player2dice1 = Math.floor(Math.random() * 6) + 1;
    var player2dice2 = Math.floor(Math.random() * 6) + 1;
    console.log(player2dice1);
    console.log(player2dice2);
  player2RanRolls.push(player2dice1)
  player2RanRolls.push(player2dice2)
  console.log(player2RanRolls);
  return player2RanRolls;
  }

  if (player1Dice1 > player2Dice1 || player1Dice1 == player2Dice1 && player1Dice2 > player2Dice2) {
    return "player1 wins"
  };

  if (player1Dice1 < player2Dice1 || player1Dice1 == player2Dice1 && player1Dice2 < player2Dice2) {
    return "player2 wins"
  };

  if (player1Dice1 == player2Dice1 && player1Dice2 == player2Dice2) {
    return "draw"
  };
};



