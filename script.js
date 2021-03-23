var main = function (input) {
  var dice = [];
  var player1Score = [];
  var player2Score = [];
  var mode = 0;

  // mode selection
  if (input == 'LargeMode') {
 		var mode = 0;
  }

  if (input == 'SmallMode') {
  	var mode = 1;
  }

  // if player 1 is going to start, player1's dice will roll for largemode
  if (input == 'Player1' && mode == 0) {
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
 		// pushing value into array
    dice.push(dice1);
    dice.push(dice2);
    // auto-generator (largest value)
    dice.sort((a, b) => b - a);

    const player1Result = +dice.join('');
    player1Score.push(player1Result);
    // clear dice array
    var dice = [];
    return player1Result;
  }

  // if player 2 is going to start, player1's dice will roll for largemode
  if (input == 'Player2' && mode == 0) {
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
 		// pushing value into array
    dice.push(dice1);
    dice.push(dice2);
    // auto-generator (largest value)
    dice.sort((a, b) => b - a);

    const player2Result = +dice.join('');
    player1Score.push(player2Result);
    // clear dice array
    var dice = [];
    return player2Result;
  }

  // if player 1 is going to start, player1's dice will roll for smallmode
  if (input == 'Player1' && mode == 1) {
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
 		// pushing value into array
    dice.push(dice1);
    dice.push(dice2);
    // auto-generator (smallest value)
    dice.sort((a, b) => a - b);

    const player1Result = +dice.join('');
    player1Score.push(player1Result);
    // clear dice array
    var dice = [];
    return player1Result;
  }

 	// if player 2 is going to start, player1's dice will roll for smallmode
  if (input == 'Player2' && mode == 1) {
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
 		// pushing value into array
    dice.push(dice1);
    dice.push(dice2);
    // auto-generator (smallest value)
    dice.sort((a, b) => a - b);

    const player2Result = +dice.join('');
    player1Score.push(player2Result);
    // clear dice array
    var dice = [];
    return player2Result;
  }
};
