var plays = 1; // Number of plays
var internal_counter = 0; // Rotate back and forth first and second condition
var player_dice = ""; // Variable used to store the 2 dice

var number_of_players = 0; // Used to get the number of players
var list_of_numbers = [];
var winner = "";

var main = function (input) {
  var myOutputValue = "";
  // Key in the number of players as long as below 2. Cannot proceed
  if (number_of_players < 2) {
    console.log(!input);
    if (!input) {
      myOutputValue =
        "Please fill number of players. Minimum 2! Don't leave it blank!";
    } else if (Number.isNaN(Number(input))) {
      myOutputValue =
        "Please fill number of players. Minimum 2! Don't fill in letters!";
    } else {
      number_of_players = Number(input);
      if (number_of_players < 2) {
        myOutputValue = `The number of players is: ${number_of_players}. It is insufficient. Minimum 2!`;
      } else {
        myOutputValue = `The number of players is: ${number_of_players}. <br> Let's begin.<br><br> Player 1 starts. <br> Click 'Submit' to roll 2 dices.`;
      }
    }
    return myOutputValue;
  }

  while (plays < number_of_players + 1) {
    if (internal_counter % 2 == 0) {
      var dice_holder = [];
      var dice1 = diceRoll();
      var dice2 = diceRoll();
      // Append into the list
      dice_holder.push(dice1, dice2);
      player_dice = dice_holder;
      console.log(`Player rolled: ${player_dice}`);

      myOutputValue = `Welcome Player ${plays}. <br> You rolled:<br> Dice 1: ${dice1}. <br> Dice 2: ${dice2}. <br> Choose the order of the dice. <br><br> Choose '1' for dice 1 first<br> Choose '2' for dice 2 first `;

      internal_counter += 1;
      return myOutputValue;
    } else {
      if (Number(input) != 1 && Number(input) != 2) {
        myOutputValue = `Please select '1' or '2' to choose dices 1 or 2 respectively.<br><br> You rolled:<br> Dice 1: ${player_dice[0]}.<br> Dice 2: ${player_dice[1]}.`;
        return myOutputValue;
      }

      internal_counter += 1;
      var player_select = Number(input);
      if (player_select == 1) {
        // if player selected first dice, extract out first dice from array.
        first_digit = player_dice[player_select - 1];
        second_digit = player_dice[player_select];
      } else {
        // if player selected second dice, extract out second dice from array
        first_digit = player_dice[player_select - 1];
        second_digit = player_dice[player_select - 2];
      }
      value = first_digit.toString() + second_digit.toString();
      list_of_numbers.push(Number(value));
      console.log(list_of_numbers);
      // Let users know what is their actual value after selection
      myOutputValue = `Player ${plays}, you chose Dice ${player_select} first. <br> Your number is: ${value}.`;
      plays += 1;

      // Adds the next player statement only if there is a next player.
      if (plays <= number_of_players) {
        myOutputValue += `<br> It is now Player ${plays}'s turn. <br><br> Click 'Submit' to roll 2 dices. ${winner}`;
      }
      if (plays == number_of_players + 1) {
        location_of_index = list_of_numbers.indexOf(
          Math.max(...list_of_numbers)
        );
        winner = `<br><br> The winner is Player ${location_of_index + 1}`;
      }
      myOutputValue += winner;
      return myOutputValue;
    }
  }

  myOutputValue = `The game is completed! ${winner}! Congratulations!`;
  return myOutputValue;
};

var diceRoll = function () {
  randomDecimal = Math.random() * 6;
  randomInteger = Math.floor(randomDecimal);
  dice = randomInteger + 1;
  return dice;
};
