// Player 1 rolls 2 dice =>
// - game mode in dice roll
// - create 2 random dice roll numbers
// - game mode changes to choose order of dice number
// - output = Dice 1 rolled A and Dice 2 rolled B, please indicate "Dice 1" or "Dice 2" to be the first numeral of the combined number
// Player 1 chooses order of dice number =>
// - game mode is in choose order of dice number
// - input to be "Dice 1" or "Dice 2"
// - output = You have chosen Dice X to be the first numeral of the combined number. Your combined number is XX
// Player 2 repeat steps. Put game logic into a loop
// If Player 1 combined > Player 2 combined, Player 1 wins. If Player 1 combined < Player 2 combined, Player 2 wins. If Player 1 combined = Player 2 combined, they draw. Restart game.
// Player 1 roll dice -> Player 1 choose dice order -> Player 2 roll dice -> Player 2 choose dice order. Store choices and compare to determine winner.
var gameMode = 'instructions';
var counter = 0;
var diceRoll1 = 0;
var diceRoll2 = 0;
var combinedNum = '';
var player1CombiArray = [];
var player2CombiArray = [];
var diceRoll = function () {
  console.log("hello world!")
	var randomDecimal = Math.random() * 6;
	var randomInteger = Math.floor(randomDecimal) + 1;
	return randomInteger;
};
var playTheGame = function (input) {
	var myOutputValue = 'hello...';
	console.log(gameMode);
	if (gameMode == 'dice roll') {
		diceRoll1 = diceRoll();
		diceRoll2 = diceRoll();
		console.log('dice roll 1', diceRoll1);
		console.log('dice roll 2', diceRoll2);
		gameMode = 'choose order of dice number';
		myOutputValue =
			'Welcome Player 1!<br>' +
			'<br>' +
			'Dice 1 rolled ' +
			diceRoll1 +
			'. <br>' +
			'Dice 2 rolled ' +
			diceRoll2 +
			'.<br>' +
			'<br>' +
			"Please indicate 'Dice 1' or 'Dice 2' to be the first numeral of the combined number";
		//Player 1 choose dice order
	} else if (gameMode == 'choose order of dice number') {
		console.log('im running');
		if (input == 'Dice 1') {
			combinedNum = diceRoll1.toString() + diceRoll2.toString(); // convert the number type to string as we dont want the sum of the numbers but rather the concatenated values of it: e.g Dice Roll 1 = 4 Dice Roll 2 = 6, we want it to be 46 not 10.
			player1CombiArray.push(combinedNum);
			myOutputValue =
				'You have chosen ' +
				input +
				'to be the first numeral. <br>' +
				'Your combined number is ' +
				combinedNum +
				'<br>' +
				'<br>' +
				'Player 1 - ' +
				player1CombiArray[0];
		}
		if (input == 'Dice 2') {
			combinedNum = diceRoll2.toString() + diceRoll1.toString();
			player1CombiArray.push(combinedNum);
			myOutputValue =
				'You have chosen ' +
				input +
				' to be the first numeral. <br>' +
				'Your combined number is ' +
				combinedNum +
				'<br>' +
				'<br>' +
				'Player 1 - ' +
				player1CombiArray[0];
		}
			gameMode = 'player 2 dice roll';

		//Player 2 dice roll
	} else if (gameMode == 'player 2 dice roll') {
		diceRoll1 = diceRoll();
		diceRoll2 = diceRoll();
		console.log('dice roll 1', diceRoll1);
		console.log('dice roll 2', diceRoll2);
		gameMode = 'player 2 choose order of dice number';
		myOutputValue =
			'Welcome Player 2!<br>' +
			'<br>' +
			'Dice 1 rolled ' +
			diceRoll1 +
			'. <br>' +
			'Dice 2 rolled ' +
			diceRoll2 +
			'.<br>' +
			'<br>' +
			"Please indicate 'Dice 1' or 'Dice 2' to be the first numeral of the combined number";
		//Player 2 choose dice order
	} else if (gameMode == 'player 2 choose order of dice number') {
		if (input == 'Dice 1') {
			combinedNum = diceRoll1.toString() + diceRoll2.toString();
			console.log('combined num', combinedNum);
			player2CombiArray.push(combinedNum);
			myOutputValue =
				'You have chosen ' +
				input +
				'to be the first numeral. <br>' +
				'Your combined number is ' +
				combinedNum +
				'<br>' +
				'<br>' +
				'Player 2' +
				'- ' +
				player2CombiArray[0];
		}
		if (input == 'Dice 2') {
			combinedNum = diceRoll1.toString() + diceRoll2.toString();
			player2CombiArray.push(combinedNum);
			myOutputValue =
				'You have chosen ' +
				input +
				' to be the first numeral. <br>' +
				'Your combined number is ' +
				diceRoll2 +
				diceRoll1 +
				'<br>' +
				'<br>' +
				'Player 2 - ' +
				player2CombiArray[0];
		}
		gameMode = 'choose winner';
	} else if (gameMode == 'choose winner') {
		if (Number(player1CombiArray[0]) > Number(player2CombiArray[0])) {
			myOutputValue = 'Player 1 wins this round!';
		}
		if (Number(player2CombiArray[0]) > Number(player1CombiArray[0])) {
			myOutputValue = 'Player 2 wins this round!';
		}
	}
	return myOutputValue;
};
var main = function (input) {
	var myOutputValue = '';
	if (gameMode == 'instructions') {
		gameMode = 'dice roll'; // "play the game" mode is not very necessary so we update directly to "dice roll"
		myOutputValue =
			'Welcome to the game of Beat That!' +
			' Please click submit to begin rolling the dice!';
	} else {
		// removed the else if condition as we want the conditonal to default here if its not equal to "instructions"
		myOutputValue = playTheGame(input);
	}
	return myOutputValue;
};
